"use client"; // จำเป็นต้องใส่เพราะเราใช้ onClick และ Context

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ book }: { book: any }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(book)}
      disabled={book.stock <= 0}
      className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
        book.stock > 0
          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
    >
      <ShoppingCart size={24} />
      {book.stock > 0 ? "Add to Basket" : "Out of Stock"}
    </button>
  );
}