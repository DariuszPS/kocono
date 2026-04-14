import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://kocono.com"),
  title: "Kocono - Kobo Highlights to Apple Notes",
  description: "Export color-coded highlights from your Kobo e-reader to Apple Notes. Preserves your highlight colors.",
  openGraph: {
    title: "Kocono - Kobo Highlights to Apple Notes",
    description: "Export color-coded highlights from your Kobo e-reader to Apple Notes. Preserves your highlight colors.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kocono - Kobo Highlights to Apple Notes",
    description: "Export color-coded highlights from your Kobo e-reader to Apple Notes. Preserves your highlight colors.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
