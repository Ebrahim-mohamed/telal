// sendEmail.ts
"use server";

import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
  pdfBuffer: Buffer;
  pdfFilename: string;
}

export async function sendEmail({
  to,
  subject,
  body,
  pdfBuffer,
  pdfFilename,
}: SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for STARTTLS
    auth: {
      user: process.env.EMAIL_USER, // Your Office365 email
      pass: process.env.EMAIL_PASSWORD, // Your Office365 password or App Password
    },
    tls: {
      rejectUnauthorized: false, // Optional, helps with some TLS handshake issues
    },
  });

  const mailOptions = {
    from: `Tilal - Jeddah Heights <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: body,
    attachments: [
      {
        filename: pdfFilename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return { success: false, error: "Failed to send email" };
  }
}
