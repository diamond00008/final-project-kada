"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase"; // 👈 อย่าลืมตรวจสอบ path ให้ตรงกับโฟลเดอร์ของคุณ
import { useState } from "react"; // 👈 เพิ่ม useState

export default function BasketPage() {
  const router = useRouter();
  
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // 👈 เพิ่ม state สำหรับตอนกำลังโหลด

  // 🚨 เอา shipping ออก แล้วตั้ง grandTotal ให้เท่ากับ cartTotal เลย
  const grandTotal = cartItems.length > 0 ? cartTotal : 0;

  // 🔴 อัปเดตฟังก์ชัน handleCheckout ให้ตัดสต็อกใน Supabase
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true); // เปิดสถานะกำลังประมวลผล

    try {
      for (const item of cartItems) {
        // 1. เช็คสต็อกล่าสุดก่อน
        const { data: currentBook } = await supabase
          .from('books')
          .select('stock')
          .eq('id', item.id)
          .single();

        if (currentBook) {
          // 2. คำนวณสต็อกใหม่
          const newStock = currentBook.stock - item.quantity;
          
          // 3. อัปเดตกลับไปที่ Supabase
          await supabase
            .from('books')
            .update({ stock: newStock >= 0 ? newStock : 0 }) // กันสต็อกติดลบ
            .eq('id', item.id);
        }
      }
      
      alert("🎉 ยืนยันการสั่งซื้อสำเร็จ! ขอบคุณที่อุดหนุนครับ");
      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("❌ เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่");
    } finally {
      setIsCheckingOut(false); // ปิดสถานะกำลังประมวลผล
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag className="text-blue-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">Your Basket</h1>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition mb-8">
          <ArrowLeft size={20} />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --- ฝั่งซ้าย: รายการสินค้า --- */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
                <p className="text-gray-400 text-lg mb-4">ตะกร้าของคุณยังว่างเปล่า</p>
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                  ไปเลือกหนังสือกันเลย
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-gray-900 border border-gray-800 p-4 rounded-2xl relative">
                    <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{item.author}</p>
                      <p className="text-blue-400 font-bold text-lg">฿{item.price}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-black border border-gray-800 rounded-lg p-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white transition"><Minus size={18} /></button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white transition"><Plus size={18} /></button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 sm:static sm:ml-4 text-gray-500 hover:text-red-500 transition p-2 bg-black sm:bg-transparent rounded-full">
                      <Trash2 size={22} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- ฝั่งขวา: สรุปยอด --- */}
          <div className="w-full lg:w-[350px]">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">฿{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 mb-8 flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-bold text-blue-500">฿{grandTotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isCheckingOut} // 👈 ปิดปุ่มถ้าตะกร้าว่างหรือกำลังประมวลผล
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg 
                  ${cartItems.length === 0 || isCheckingOut ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98] shadow-blue-600/30'}
                `}
              >
                <CheckCircle size={24} />
                {isCheckingOut ? "Processing..." : "Confirm Purchase"} {/* 👈 เปลี่ยนข้อความตอนกำลังโหลด */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}