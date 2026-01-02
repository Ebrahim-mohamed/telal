"use server";

import { join } from "path";
import fs from "fs/promises";
import sharp from "sharp";
import getGridFSBucket from "@/lib/mongodb/gridfs";
import { ObjectId } from "mongodb";
import Unit from "@/models/unit_allocation_modal";
import { getAllImagesByType } from "@/lib/mongodb/imageUpload";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { unitTypeAllData } from "@/schema/unitAllocation.schema";

export async function generateUnitPdf(
  unitNumber: number,
  modelType: string
): Promise<Buffer> {
  try {
    const unit = await Unit.findOne({ unitNumber })
      .select("-createdAt -updatedAt -shapes")
      .lean<unitTypeAllData>();

    if (!unit) throw new Error("Unit not found");

    // Create a PDF document with pdf-lib
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Load fonts
    const standardFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const arabicFontPath = join(
      process.cwd(),
      "public/fonts/Amiri-Regular.ttf"
    );
    const arabicFontBytes = await fs.readFile(arabicFontPath);

    // Embed Arabic font with appropriate features
    const amiriFont = await pdfDoc.embedFont(arabicFontBytes, {
      subset: false,
      features: {
        liga: true, // Enable ligatures
        rlig: true, // Required ligatures
        calt: true, // Contextual alternates
        ccmp: true, // Glyph composition/decomposition
      },
    });

    const pageWidth = 600;
    const pageHeight = 800;
    const infoPage = pdfDoc.addPage([pageWidth, pageHeight]);

    // Logo handling
    const logoMarginTop = 40;
    const logoWidth = 80;

    // Add Telal logo
    try {
      const telalPath = join(
        process.cwd(),
        "public/assets/dashboard/telal.png"
      );
      const telalBuffer = await fs.readFile(telalPath);
      const telalImage = await pdfDoc.embedPng(telalBuffer);
      const telalHeight = (telalImage.height / telalImage.width) * logoWidth;

      infoPage.drawImage(telalImage, {
        x: 40,
        y: pageHeight - telalHeight - logoMarginTop,
        width: logoWidth,
        height: telalHeight,
      });
    } catch (error) {
      console.error("Error embedding telal logo:", error);
    }

    // Add Jeddah Heights logo
    try {
      const jeddahPath = join(
        process.cwd(),
        "public/assets/Jeddah_Heights_light.png"
      );
      const jeddahBuffer = await fs.readFile(jeddahPath);
      const jeddahImage = await pdfDoc.embedPng(jeddahBuffer);
      const jeddahHeight = (jeddahImage.height / jeddahImage.width) * logoWidth;

      infoPage.drawImage(jeddahImage, {
        x: pageWidth - logoWidth - 40,
        y: pageHeight - jeddahHeight - logoMarginTop,
        width: logoWidth,
        height: jeddahHeight,
      });
    } catch (error) {
      console.error("Error embedding jeddah logo:", error);
    }

    let currentY = pageHeight - logoMarginTop - 100;

    // Function to convert text to SVG image (better for Arabic text rendering)
    async function textToSvgBuffer(
      text: string,
      fontSize: number,
      width: number
    ): Promise<Buffer> {
      const fontBase64 = arabicFontBytes.toString("base64");
      const svgContent = `
  <svg width="${width}" height="${
        fontSize * 1.5
      }" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: 'Amiri';
        src: url('data:application/font-ttf;charset=utf-8;base64,${fontBase64}');
      }
      text {
        font-family: 'Amiri', serif;
        font-size: ${fontSize}px;
        direction: rtl;
      }
    </style>
    <text x="${width - 10}" y="${fontSize}" fill="black">${text}</text>
  </svg>
`;
      // Convert SVG to PNG using sharp
      return await sharp(Buffer.from(svgContent)).png().toBuffer();
    }

    // Arabic welcome message
    const arabicMessage =
      "عميلنا الكريم، نشكرك علي اهتمامك بمشروع تلال هوادي، ويشرفنا التعامل معك";

    // Use SVG method for better Arabic rendering
    try {
      const arabicSvgBuffer = await textToSvgBuffer(arabicMessage, 16, 500);
      const arabicImage = await pdfDoc.embedPng(arabicSvgBuffer);

      infoPage.drawImage(arabicImage, {
        x: (pageWidth - 500) / 2,
        y: currentY,
        width: 500,
        height: 24,
      });
    } catch (error) {
      console.error("Error rendering Arabic text as SVG:", error);

      // Fallback to direct text rendering if SVG approach fails
      const arabicWidth = amiriFont.widthOfTextAtSize(arabicMessage, 14);
      infoPage.drawText(arabicMessage, {
        x: pageWidth - arabicWidth - 50,
        y: currentY,
        size: 14,
        font: amiriFont,
        color: rgb(0, 0, 0),
      });
    }

    currentY -= 40;

    // English title
    infoPage.drawText("Unit Information", {
      x:
        (pageWidth - standardFont.widthOfTextAtSize("Unit Information", 20)) /
        2,
      y: currentY,
      size: 20,
      font: standardFont,
      color: rgb(0, 0, 0),
    });

    currentY -= 40;

    // Table data with English and Arabic
    const tableData = [
      ["Unit Number", unit.unitNumber, "رقم الوحدة"],
      ["Unit Model", unit.unitType, "نموذج الوحدة"],
      ["Unit Block", unit.unitBlock, "بلوك الوحدة"],
      ["Unit Area", `${unit.unitArea} m²`, "مساحة الوحدة"],
      [
        "Market Price",
        `${unit.marketPrice.toLocaleString()} SAR`,
        "القيمة الاجمالية قبل الدعم",
      ],
      [
        "MOH Price",
        `${unit.MOHPrice.toLocaleString()} SAR`,
        "القيمة الاجمالية بعد الدعم",
      ],
      ["Unit Type", "Villa", "نوع الوحدة"],
      ["Bathrooms", "8", "عدد الحمامات"],
      ["Bedrooms", "4", "عدد غرف النوم"],
    ];

    // INCREASED ROW HEIGHT to accommodate larger text
    const rowHeight = 35; // Increased from 25
    const col1Width = 180; // English label - Increased from 150
    const col2Width = 180; // English value - Increased from 150
    const col3Width = 180; // Arabic text - Increased from 150
    const tableWidth = col1Width + col2Width + col3Width;
    const tableX = (pageWidth - tableWidth) / 2;

    // Draw table rows with INCREASED FONT SIZE
    for (const [label, value, arabicText] of tableData) {
      // Draw cell borders
      infoPage.drawRectangle({
        x: tableX,
        y: currentY - 5,
        width: col1Width,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      infoPage.drawRectangle({
        x: tableX + col1Width,
        y: currentY - 5,
        width: col2Width,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      infoPage.drawRectangle({
        x: tableX + col1Width + col2Width,
        y: currentY - 5,
        width: col3Width,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      // English label (first column) with INCREASED FONT SIZE
      infoPage.drawText(label, {
        x: tableX + 10,
        y: currentY + 10, // Adjusted position for better vertical alignment
        size: 14, // Increased from 10
        font: standardFont,
        color: rgb(0, 0, 0),
      });

      // English value (second column) - CENTERED now with INCREASED FONT SIZE
      const valueWidth = standardFont.widthOfTextAtSize(String(value), 14); // Increased from 10
      infoPage.drawText(String(value), {
        x: tableX + col1Width + (col2Width - valueWidth) / 2,
        y: currentY + 10, // Adjusted position for better vertical alignment
        size: 14, // Increased from 10
        font: standardFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Arabic text (third column) using SVG approach with INCREASED FONT SIZE
      try {
        const svgBuffer = await textToSvgBuffer(arabicText, 14, col3Width - 20); // Increased from 10
        const arabicImage = await pdfDoc.embedPng(svgBuffer);

        infoPage.drawImage(arabicImage, {
          x: tableX + col1Width + col2Width + 10,
          y: currentY + 2, // Adjusted position for better vertical alignment
          width: col3Width - 20,
          height: 21, // Increased from 15
        });
      } catch (error) {
        console.error(
          `Error rendering Arabic text '${arabicText}' as SVG:`,
          error
        );

        // Fallback to direct text rendering with INCREASED FONT SIZE
        const arabicTextWidth = amiriFont.widthOfTextAtSize(arabicText, 14); // Increased from 10
        infoPage.drawText(arabicText, {
          x: tableX + col1Width + col2Width + col3Width - arabicTextWidth - 10,
          y: currentY + 10, // Adjusted position for better vertical alignment
          size: 14, // Increased from 10
          font: amiriFont,
          color: rgb(0.2, 0.2, 0.2),
        });
      }

      currentY -= rowHeight;
    }

    // Floor plan page
    try {
      const floorPlanPath = join(
        process.cwd(),
        `public/assets/floor_plans/${unit.unitType}-hoz.avif`
      );

      const floorPlanBuffer = await fs.readFile(floorPlanPath);
      const converted = await sharp(floorPlanBuffer).png().toBuffer();
      const floorImage = await pdfDoc.embedPng(converted);
      const floorPage = pdfDoc.addPage([pageWidth, pageHeight]);

      const maxWidth = 500;
      const scaleFactor = maxWidth / floorImage.width;

      floorPage.drawText("Floor Plan", {
        x: (pageWidth - standardFont.widthOfTextAtSize("Floor Plan", 20)) / 2,
        y: pageHeight - 60,
        size: 20,
        font: standardFont,
        color: rgb(0, 0, 0),
      });

      floorPage.drawImage(floorImage, {
        x: (pageWidth - floorImage.width * scaleFactor) / 2,
        y: pageHeight - 60 - 40 - floorImage.height * scaleFactor,
        width: floorImage.width * scaleFactor,
        height: floorImage.height * scaleFactor,
      });
    } catch (error) {
      console.error("Error processing floor plan:", error);
    }
    // Gallery images
    try {
      const bucket = await getGridFSBucket();
      const normalizedModelType = modelType
        ?.replace(/^"(.*)"$/, "$1") // Remove literal double quotes
        .normalize("NFKC") // Normalize hidden Unicode stuff
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Strip zero-width
        .trim()
        .toLowerCase();

      const imageType =
        normalizedModelType === "model-1"
          ? "MODEL_1"
          : normalizedModelType === "model-2"
          ? "MODEL_2"
          : normalizedModelType === "model-3"
          ? "MODEL_3"
          : normalizedModelType === "model-4"
          ? "MODEL_4"
          : "GALLERY";
      const galleryImages = await getAllImagesByType(imageType);

      if (galleryImages?.length > 0) {
        const imagesPerPage = 3;
        const imageWidth = 400;
        const imageHeight = 200;
        const spacing = 40;
        const totalHeight =
          imagesPerPage * imageHeight + (imagesPerPage - 1) * spacing;
        const startX = (pageWidth - imageWidth) / 2;
        const startY = (pageHeight - totalHeight) / 2;

        for (
          let pageIndex = 0;
          pageIndex < Math.ceil(galleryImages.length / imagesPerPage);
          pageIndex++
        ) {
          const page = pdfDoc.addPage([pageWidth, pageHeight]);

          // Add page title
          page.drawText("Gallery Images", {
            x:
              (pageWidth -
                standardFont.widthOfTextAtSize("Gallery Images", 20)) /
              2,
            y: pageHeight - 40,
            size: 20,
            font: standardFont,
            color: rgb(0, 0, 0),
          });

          for (let i = 0; i < imagesPerPage; i++) {
            const imageIndex = pageIndex * imagesPerPage + i;
            if (imageIndex >= galleryImages.length) break;

            const image = galleryImages[imageIndex];
            try {
              const fileId = new ObjectId(image.fileId);
              const stream = bucket.openDownloadStream(fileId);
              const chunks: Uint8Array[] = [];
              const avifBuffer = await new Promise<Buffer>(
                (resolve, reject) => {
                  stream.on("data", (chunk) => chunks.push(chunk));
                  stream.on("error", reject);
                  stream.on("end", () => resolve(Buffer.concat(chunks)));
                }
              );

              const pngBuffer = await sharp(avifBuffer)
                .resize({
                  width: imageWidth,
                  height: imageHeight,
                  fit: "cover",
                })
                .png()
                .toBuffer();

              const embedded = await pdfDoc.embedPng(pngBuffer);
              const y =
                startY + (imagesPerPage - 1 - i) * (imageHeight + spacing);

              page.drawImage(embedded, {
                x: startX,
                y,
                width: imageWidth,
                height: imageHeight,
              });

              // Add image caption with index
              page.drawText(`Image ${imageIndex + 1}`, {
                x: startX + imageWidth / 2 - 25,
                y: y - 20,
                size: 12,
                font: standardFont,
                color: rgb(0, 0, 0),
              });
            } catch (error) {
              console.error(
                `Failed to embed gallery image ${imageIndex + 1}:`,
                error
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error processing gallery images:", error);
    }

    // Add footer to all pages
    const pageCount = pdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      page.drawText(`Page ${i + 1} of ${pageCount}`, {
        x: pageWidth / 2 - 30,
        y: 30,
        size: 10,
        font: standardFont,
        color: rgb(0, 0, 0),
      });

      // Add date
      const now = new Date();
      const dateString = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      page.drawText(`Generated on: ${dateString}`, {
        x: 50,
        y: 30,
        size: 8,
        font: standardFont,
        color: rgb(0.4, 0.4, 0.4),
      });
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw new Error("Failed to generate PDF");
  }
}
