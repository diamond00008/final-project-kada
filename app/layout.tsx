import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-200 antialiased relative overflow-x-hidden`}>
        <CartProvider>
          {/* 1. แยกพื้นหลังให้อยู่เดี่ยวๆ และล็อคไว้ด้านหลัง (-z-10) */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,#1e293b_0%,#0f172a_100%)]" />
          
          {/* 2. สร้าง Container หลักที่ยืดหยุ่น (flex-col, min-h-screen) เพื่อให้เนื้อหาดัน Footer ลงไปข้างล่างสุดและ Scroll ได้ */}
          <div className="flex flex-col min-h-screen">
            <Header />
            
            {/* ส่วนเนื้อหาหลัก */}
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}