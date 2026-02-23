import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"; // ใช้ Icon จาก lucide-react

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* ส่วนที่ 1: โลโก้และรายละเอียดร้าน */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-500 mb-4 hover:text-blue-400 transition cursor-pointer">
              Bookstore
            </h2>
            <p className="text-sm leading-relaxed max-w-md text-gray-500">
              Discover your next great adventure. We offer a wide range of books from thrilling fiction to insightful business strategies. Read, learn, and grow with us.
            </p>
            {/* โซเชียลมีเดียไอคอน */}
            <div className="flex gap-5 mt-6">
              <a href="#" className="text-gray-500 hover:text-blue-500 transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition"><Mail size={20} /></a>
            </div>
          </div>

          {/* ส่วนที่ 2: เมนู Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/basket" className="hover:text-blue-400 transition">Basket</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition">Login / Register</Link></li>
            </ul>
          </div>

          {/* ส่วนที่ 3: หมวดหมู่ยอดฮิต */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Top Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition">Technology</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Fiction</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Business</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Science</Link></li>
            </ul>
          </div>
        </div>

        {/* ส่วนล่างสุด: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Bookstore Project. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}