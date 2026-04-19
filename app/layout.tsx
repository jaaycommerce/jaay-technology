import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jaay Technology — Building the Future of Commerce & Services",
  description: "Jaay Technology builds intelligent platforms for commerce, travel, services, and more. Explore our suite of products powering businesses across India.",
  keywords: "Jaay, JaayCommerce, JaayTravel, JaayService, JaayVault, commerce, technology, India",
  openGraph: {
    title: "Jaay Technology",
    description: "Building the Future of Commerce & Services",
    type: "website",
    url: "https://jaaytechnology.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
