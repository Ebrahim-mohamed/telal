// route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/connection";
import GeneralImageModel from "@/models/generalGallery";
import mongoose from "mongoose";
import { getImageById } from "@/lib/mongodb/imageUpload"; // Assuming this function gets the binary data

export async function GET(
    request: Request,
) {
    try {
        await dbConnect();

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {error: "Image ID is required"},
                {status: 400}
            );
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid image ID format" },
                { status: 400 }
            );
        }

        const image = await GeneralImageModel.findOne({fileId: id}).exec();
        //
        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Get the binary image data using the fileId
        if (!image.fileId) {
            return NextResponse.json({ error: "No file associated with this image" }, { status: 404 });
        }
        console.log("getting image data")

        const imageData = await getImageById(id);

        if (!imageData) {
            return NextResponse.json({ error: "Image data not found" }, { status: 404 });
        }

        // Create a Buffer from the base64 string (assuming getImageById returns base64)
        const buffer = Buffer.from(imageData, 'base64');

        // Return the binary data with appropriate Content-Type
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': image.contentType, // Adjust based on your image type
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            },
        });
    } catch (error) {
        console.error("Error fetching image:", error);
        return NextResponse.json(
            { error: "Failed to fetch image" },
            { status: 500 }
        );
    }
}