import React from 'react';

interface CategoryBarProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

const categories = ["All Books", "Fiction", "Business", "Technology", "History", "Science", "Self-Help", "Comics", "Biography", "Fantasy"];

export default function CategoryBar({ onSelectCategory, activeCategory }: CategoryBarProps) {
  return (
    <div className="w-full mb-10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      <div className="flex items-center gap-2 sm:gap-3 w-max min-w-full py-4 px-3">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 
              ${activeCategory === category 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] scale-105' 
                : 'bg-slate-800/30 text-slate-400 border border-slate-700/50 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/60 hover:-translate-y-0.5'} 
            `}
          >
            {category}
          </button>
        ))}
      </div>
      
    </div>
  );
}