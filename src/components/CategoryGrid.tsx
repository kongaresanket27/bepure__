import React from 'react';
import { CATEGORIES_LIST } from '../data/dairyProducts';
import { DairyCategory } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: DairyCategory;
  onSelectCategory: (categoryId: DairyCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="categories">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold text-[#E5A83B] uppercase tracking-wider">
            Curated Pantry
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight mt-0.5">
            Shop by Category
          </h2>
        </div>
        <p className="hidden sm:block text-xs text-[#6F8076]">
          Direct from certified gaushalas and dairy farms around Pune
        </p>
      </div>

      {/* Grid of 6 categories (excluding 'all' or with 'all') */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES_LIST.filter(c => c.id !== 'all').map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as DairyCategory)}
              className={`group text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#184A2C] shadow-md ring-2 ring-[#184A2C]/10'
                  : 'bg-white hover:bg-[#FAF7F2] border-[#E8E2D8] hover:border-[#C4BAAB] shadow-sm hover:shadow-md'
              }`}
              id={`cat-card-${cat.id}`}
            >
              {/* Category Image Circle/Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#F4EFEA] border border-[#EBE5DC]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-sm shadow-xs">
                  {cat.icon}
                </div>
              </div>

              {/* Text info */}
              <div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isSelected ? 'text-[#184A2C]' : 'text-[#1A2621] group-hover:text-[#184A2C]'
                }`}>
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#6F8076] mt-0.5 line-clamp-1">
                  {cat.label}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#F0EBE3]">
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#184A2C]' : 'text-[#7A8C82]'}`}>
                  {isSelected ? 'Selected' : 'Explore'}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                  isSelected ? 'text-[#184A2C]' : 'text-[#7A8C82]'
                }`} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
