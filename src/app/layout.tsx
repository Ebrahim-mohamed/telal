import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تلال - جدة هايتس",
  description: "تلال - جدة هايتس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
