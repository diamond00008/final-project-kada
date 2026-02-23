"use client";
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import CategoryBar from './CategoryBar';
import { supabase } from '../lib/supabase'; // นำเข้า supabase

export default function BookList() {
  const [activeCategory, setActiveCategory] = useState("All Books");
  const [allBooks, setAllBooks] = useState<any[]>([]); // เก็บหนังสือทั้งหมดจาก DB
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Supabase เมื่อโหลด Component
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books').select('*');
      if (data) {
        setAllBooks(data);
        setFilteredBooks(data);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // กรองตามหมวดหมู่
  useEffect(() => {
    if (activeCategory === "All Books") {
      setFilteredBooks(allBooks);
    } else {
      setFilteredBooks(allBooks.filter(book => book.category === activeCategory));
    }
  }, [activeCategory, allBooks]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">Explore Our Collection</h2>
      <CategoryBar onSelectCategory={setActiveCategory} activeCategory={activeCategory} />

      {loading ? (
        <p className="text-center text-white mt-10">กำลังโหลดข้อมูลหนังสือ...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-14 px-4 py-10">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <p className="text-gray-400 text-lg col-span-full text-center">No books found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}