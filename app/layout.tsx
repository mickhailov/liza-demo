import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FloatingCart from "@/components/FloatingCart";
import { CartProvider } from "@/contexts/CartContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Liza Pozhydaeva — Permanent Makeup",
  description: "Permanent makeup courses, products and booking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#1a1a1a]">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <FloatingCart />
        </CartProvider>
        <footer className="border-t border-[#e5ddd4] py-8 text-center text-sm text-[#8a8a8a]">
          © 2025 Liza Pozhydaeva. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
