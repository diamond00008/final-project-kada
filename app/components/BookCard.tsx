"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }: any) {
  const { addToCart } = useCart();
  
  // เช็คว่าสินค้าหมดหรือไม่
  const isOutOfStock = book.stock <= 0;

  return (
    <Link href={`/book/${book.id}`} className={`block group h-full ${isOutOfStock ? 'opacity-80' : ''}`}>
      <div className={`relative flex flex-col h-full bg-slate-800/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 overflow-hidden transition-all duration-500 ${!isOutOfStock && 'group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50'}`}>
        
        {/* รูปหน้าปก */}
        <div className="relative h-80 overflow-hidden bg-slate-700">
          <img 
            src={book.image} 
            alt={book.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${!isOutOfStock && 'group-hover:scale-110 opacity-90 group-hover:opacity-100'} ${isOutOfStock && 'grayscale'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          
          <div className="absolute top-5 left-5">
            <span className="bg-cyan-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
              {book.category}
            </span>
          </div>

          {/* 🔴 ป้ายแจ้งเตือน OUT OF STOCK ทับรูปปก (จะโชว์เมื่อสต็อก <= 0) */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-red-600 text-white font-black px-6 py-2 rounded-xl transform -rotate-12 text-xl tracking-widest shadow-2xl border-2 border-red-800">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        {/* ข้อมูลหนังสือ */}
        <div className="p-7 flex flex-col flex-grow bg-white/[0.02]">
          <h3 className={`text-xl font-bold text-white mb-2 leading-tight transition-colors line-clamp-2 ${!isOutOfStock && 'group-hover:text-cyan-400'}`}>
            {book.title}
          </h3>
          <p className="text-slate-400 text-sm mb-6 font-medium italic">by {book.author}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Price</span>
              <span className={`text-2xl font-black ${isOutOfStock ? 'text-slate-500 line-through' : 'text-white'}`}>
                ฿{book.price.toFixed(2)}
              </span>
            </div>

            {/* ปุ่มใส่ตะกร้าแบบ Pop Color (Cyan) */}
            <button 
              onClick={(e) => {
                e.preventDefault(); // ป้องกันไม่ให้ทะลุ Link เข้าไปหน้า Detail
                if (!isOutOfStock) addToCart(book);
              }}
              disabled={isOutOfStock}
              className={`p-3.5 rounded-2xl transition-all duration-300 shadow-lg 
                ${isOutOfStock 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-90'
                }`}
            >
              <ShoppingCart size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}