import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "PoopCare - Gut Health Analysis",
  description: "AI-powered gut health analysis and personalized recommendations.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PoopCare",
  },
};

export const viewport: Viewport = {
  themeColor: "#8c5d4f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lazywasabi/thai-font-resources@latest/th-sarabun-new.css" />
      </head>
      <body className="antialiased">
        <main className="mobile-container overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

