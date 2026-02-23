import React from 'react';

interface CategoryBarProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

const categories = ["All Books", "Fiction", "Business", "Technology", "History", "Science", "Self-Help", "Comics", "Biography", "Fantasy"];

export default function CategoryBar({ onSelectCategory, activeCategory }: CategoryBarProps) {
  return (
    // กรอบนอกสุด: ใส่ overflow-x-auto และ no-scrollbar เพื่อให้เลื่อนได้แต่ไม่เห็นแถบ
    <div className="w-full overflow-x-auto no-scrollbar py-4 mb-6 border-b border-gray-800/50">
      
      {/* กรอบด้านใน: จัดเรียงปุ่มเป็นแนวนอน */}
      <div className="flex items-center gap-3 w-max px-2">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              whitespace-nowrap px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-500 
              ${activeCategory === category 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-800/30 text-slate-500 border border-slate-700/50 hover:border-slate-500 hover:text-slate-300'}
            `}
          >
            {category}
          </button>
        ))}
      </div>
      
    </div>
  );
}