"use client"; // จำเป็นต้องใส่เพราะเราใช้ State จัดการข้อมูลฝั่งผู้ใช้

import { createContext, useContext, useState, ReactNode } from "react";

// 1. กำหนดชนิดของข้อมูล
type Book = { id: string | number; title: string; author: string; price: number; image: string; category?: string };
type CartItem = Book & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

// 2. สร้าง Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. สร้าง Provider (ตัวกระจายข้อมูลให้ทั้งเว็บ)
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ฟังก์ชันเพิ่มสินค้า
  const addToCart = (book: Book) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === book.id);
      if (existingItem) {
        // ถ้ามีอยู่แล้วให้เพิ่มจำนวน (quantity)
        return prev.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      // ถ้ายังไม่มีให้เพิ่มเข้าไปใหม่ เริ่มที่ 1 ชิ้น
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  // ฟังก์ชันลบสินค้าออก
  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ฟังก์ชันปรับลด/เพิ่มจำนวน
  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  // ฟังก์ชันล้างตะกร้า (เวลากดยืนยันชำระเงิน)
  const clearCart = () => setCartItems([]);

  // ตัวแปรคำนวณอัตโนมัติ
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // รวมจำนวนชิ้นทั้งหมด
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); // รวมราคาทั้งหมด

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. ตัวช่วยสำหรับดึงข้อมูลไปใช้ง่ายๆ
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};