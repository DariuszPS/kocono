import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const playfair = localFont({
  src: [
    {
      path: "./fonts/PlayfairDisplay-Variable.ttf",
      style: "normal",
    },
    {
      path: "./fonts/PlayfairDisplay-Italic-Variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = localFont({
  src: [
    {
      path: "./fonts/SourceSans3-Variable.ttf",
      style: "normal",
    },
    {
      path: "./fonts/SourceSans3-Italic-Variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
});

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
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
