import Link from "next/link";
import { ArrowLeft, Star, BookOpen, Globe } from "lucide-react";
import { supabase } from "../../lib/supabase"; // นำเข้า supabase
import AddToCartButton from "../../components/AddToCartButton"; // นำเข้าปุ่มที่เพิ่งสร้าง

// แปลงเป็น async component เพื่อดึงข้อมูลแบบ Server-Side
export default async function BookDetailPage({ params }: { params: { id: string } }) {
  // ค้นหาหนังสือจาก Supabase โดยใช้ ID
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', params.id)
    .single(); // คืนค่ามาแค่ object เดียว

  // ถ้าไม่เจอหนังสือ
  if (!book || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Book not found</h1>
        <Link href="/" className="ml-4 text-blue-400 underline">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition mb-10">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                {book.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-400 mb-6">by {book.author}</p>

            <div className="flex items-center gap-2 text-yellow-400 mb-8">
              <Star fill="currentColor" size={20} />
              <span className="text-lg font-medium text-white">{book.rating}</span>
              <span className="text-gray-500 text-sm">({book.reviews || 0} Reviews)</span>
            </div>

            {/* ส่วนแสดงราคาและสต็อกที่แก้ไขวงเล็บ </div> แล้ว */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-blue-500">
                ฿{book.price}
              </div>
              
              {book.stock > 0 ? (
                <div className="text-sm px-3 py-1 bg-gray-800 rounded-lg text-gray-300">
                  In Stock: {book.stock}
                </div>
              ) : (
                <div className="text-sm px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg font-bold animate-pulse">
                  ⚠️ สินค้าหมดชั่วคราว
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-400 leading-relaxed">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl border border-gray-800">
                <BookOpen className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-semibold">{book.pages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl border border-gray-800">
                <Globe className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-semibold">{book.language}</p>
                </div>
              </div>
            </div>

            {/* 🔴 เรียกใช้ Component ปุ่มที่เราสร้างไว้ตรงนี้! */}
            <AddToCartButton book={book} />

          </div>
        </div>
      </div>
    </div>
  );
}