"use client";

import { ShoppingCart, Home as HomeIcon, Info, User } from "lucide-react"; 
import Link from "next/link"; 
import { useCart } from "../context/CartContext";

export default function Header() {
    const { cartCount } = useCart();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 flex items-center justify-between py-4 px-6 md:px-12 text-white border-b border-slate-700 shadow-sm">
      
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
          Bookstore.
        </h1>
      </Link>

      <div className="flex items-center gap-8 relative ">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 group">
          <HomeIcon size={24} className="group-hover:-translate-y-1 transition-transform" />
          <span className="hidden md:block text-base font-medium">Home</span>
        </Link>
        
        <Link href="/about" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 group">
          <Info size={24} className="group-hover:-translate-y-1 transition-transform" />
          <span className="hidden md:block text-base font-medium">About</span>
        </Link>

        <Link href="/basket" className="relative text-slate-300 hover:text-indigo-400 transition-colors duration-300 group">
          <ShoppingCart size={26} className="group-hover:-translate-y-1 transition-transform" />
          
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              {cartCount}
            </span>
          )}
        </Link>

      <div className="h-6 w-[1px] bg-slate-600 hidden md:block mx-2"></div>

      {/* 🔴 แก้ไขตรงนี้: เปลี่ยนจาก <button> เป็น <Link href="/login"> */}
      <Link 
        href="/login" 
        className="flex items-center gap-2 bg-slate-800 hover:bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-indigo-500/30 border border-slate-600 hover:border-indigo-400"
      >
        <User size={18} />
        <span>Login</span>
      </Link>
      </div>
    </div>
  );
}