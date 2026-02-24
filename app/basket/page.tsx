"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function BasketPage() {
  const router = useRouter();
  
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const grandTotal = cartItems.length > 0 ? cartTotal : 0;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);

    try {
      for (const item of cartItems) {
        const { data: currentBook } = await supabase
          .from('books')
          .select('stock')
          .eq('id', item.id)
          .single();

        if (currentBook) {
          const newStock = currentBook.stock - item.quantity;
          await supabase
            .from('books')
            .update({ stock: newStock >= 0 ? newStock : 0 })
            .eq('id', item.id);
        }
      }
      
    
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("❌ เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่");
    } finally {
      setIsCheckingOut(false);
    }
  };

  
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    clearCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag className="text-cyan-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">Your Basket</h1>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-8">
          <ArrowLeft size={20} />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --- ฝั่งซ้าย: รายการสินค้า --- */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-lg">
                <p className="text-slate-400 text-lg mb-6">ตะกร้าของคุณยังว่างเปล่า</p>
                <Link href="/" className="bg-cyan-500 text-slate-950 px-8 py-3.5 rounded-full font-bold hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  ไปเลือกหนังสือกันเลย
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900 border border-slate-800 p-4 rounded-[2rem] relative shadow-lg">
                    <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{item.author}</p>
                      {/* เปลี่ยนเป็น ₭ และ toLocaleString */}
                      <p className="text-cyan-400 font-bold text-lg">₭{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-full p-2 px-4">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-white transition"><Minus size={18} /></button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-white transition"><Plus size={18} /></button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 sm:static sm:ml-4 text-slate-500 hover:text-red-500 transition p-2 bg-slate-950 sm:bg-transparent rounded-full">
                      <Trash2 size={22} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- ฝั่งขวา: สรุปยอด --- */}
          <div className="w-full lg:w-[350px]">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-24 shadow-xl">
              <h2 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-slate-300">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">₭{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6 mb-8 flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-black text-cyan-400">₭{grandTotal.toLocaleString()}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isCheckingOut}
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg 
                  ${cartItems.length === 0 || isCheckingOut 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-[0.98]'
                  }
                `}
              >
                <CheckCircle size={24} />
                {isCheckingOut ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      </div>

  
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(6,182,212,0.2)] transform scale-100 animate-in zoom-in-95 duration-300">
            {/* ไอคอนติ๊กถูก */}
            <div className="mx-auto w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-2xl font-black text-white text-center mb-2"> Finish</h3>
            <p className="text-slate-400 text-center mb-8">thank you</p>
            
            <button 
              onClick={handleCloseModal}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-2xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              back to home
            </button>
          </div>
        </div>
      )}

    </div>
  );
}