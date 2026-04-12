import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kocono - Kobo Highlights to Apple Notes",
  description: "Preserve your Kobo Colour highlights when exporting to Apple Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
