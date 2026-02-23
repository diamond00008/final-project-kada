import Link from "next/link";
import { BookOpen, Globe, Users, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* --- 1. Hero Section --- */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Our Bookstore
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We believe that every book has a soul, and every reader deserves to find the perfect story. Welcome to your new favorite reading corner.
          </p>
        </div>

        {/* --- 2. Our Story (เลย์เอาต์ ซ้ายข้อความ-ขวารูป) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Founded in 2024, our bookstore started with a simple idea: to make knowledge and imagination accessible to everyone. What began as a small online catalog has grown into a community of passionate readers.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We carefully curate our collection to ensure that whether you are looking for the latest tech trends, a thrilling mystery, or a guide to self-improvement, you will find it here at the best price.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800">
            {/* รูปภาพบรรยากาศร้าน/ชั้นหนังสือ */}
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop" 
              alt="Bookstore Library" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* --- 3. Why Choose Us (การ์ดจุดเด่น 4 อัน) --- */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-colors duration-300 group text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Massive Collection</h3>
              <p className="text-gray-400 text-sm">Thousands of books across all genres waiting to be discovered.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-colors duration-300 group text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Worldwide Delivery</h3>
              <p className="text-gray-400 text-sm">We ship your favorite books safely and quickly across the globe.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-colors duration-300 group text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Reader Community</h3>
              <p className="text-gray-400 text-sm">Join a vibrant community of readers to review and discuss books.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-colors duration-300 group text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Best Quality</h3>
              <p className="text-gray-400 text-sm">We guarantee the quality of every physical and digital book we sell.</p>
            </div>

          </div>
        </div>

        {/* --- 4. Call to Action (ชวนให้กลับไปดูหนังสือ) --- */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to start reading?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Explore our curated collections and find the book that will change your perspective today.
          </p>
          <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-blue-600/30">
            Explore Books <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}