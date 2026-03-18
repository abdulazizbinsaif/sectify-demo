import type { Metadata } from "next";
import { Almarai, Geist_Mono } from "next/font/google";
import "./globals.css";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sectify Demo in Next.js",
  description: "A Sectify landing page with an embedded MacBook-style demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${almarai.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
