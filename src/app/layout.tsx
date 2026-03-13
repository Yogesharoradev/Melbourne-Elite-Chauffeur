import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { WhatsAppFloat } from "@/components/floatingWhatsapp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} | Supreme Luxury Car Rentals`,
  description: `Experience elegance and comfort with our premium fleet. Your ultimate luxury drive awaits with ${process.env.NEXT_PUBLIC_APP_NAME}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${syne.variable} font-sans antialiased`}
      >
        {children}

      </body>
    </html>
  );
}
