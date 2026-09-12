import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { DairyProduct, ProductVariant, DairyCategory } from '../types';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';

interface ShopCatalogueProps {
  products: DairyProduct[];
  selectedCategory: DairyCategory;
  onSelectCategory: (category: DairyCategory) => void;
  cartItemsMap: Record<string, number>;
  wishlistIds: Set<string>;
  onAddToCart: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  onUpdateCartQty: (product: DairyProduct, variant: ProductVariant, delta: number) => void;
  onToggleWishlist: (product: DairyProduct) => void;
  onSelectProduct: (product: DairyProduct) => void;
  searchQuery: string;
}

export const ShopCatalogue: React.FC<ShopCatalogueProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  cartItemsMap,
  wishlistIds,
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  onSelectProduct,
  searchQuery,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'today' | 'preorder'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dietaryOptions = [
    { id: 'a2', label: 'Desi A2 Cow Milk' },
    { id: 'bilona', label: 'Vedic Cultured Bilona' },
    { id: 'probiotic', label: 'Live Probiotics' },
    { id: 'glass', label: 'Delivered in Glass' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'milk', label: 'Milk' },
    { id: 'paneer', label: 'Paneer' },
    { id: 'ghee', label: 'Ghee' },
    { id: 'curd', label: 'Curd' },
    { id: 'butter', label: 'Butter' },
    { id: 'buttermilk', label: 'Buttermilk' },
  ];

  const toggleDietary = (id: string) => {
    setSelectedDietary(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      const defaultPrice = product.variants[product.defaultVariantIndex].price;
      if (defaultPrice > maxPrice) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants[a.defaultVariantIndex].price;
      const priceB = b.variants[b.defaultVariantIndex].price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0; // recommended
    });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setMaxPrice(1000);
    setSelectedDietary([]);
    setAvailabilityFilter('all');
    setMinRating(0);
    setSortBy('recommended');
  };

  return (
    <section className="py-12 bg-[#FAF7F2] border-t border-[#EAE3D6]" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E8E1D4] gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight">
              Explore Farm Dairy
            </h2>
            <p className="text-xs sm:text-sm text-[#617369] mt-0.5">
              Showing <span className="font-bold text-[#184A2C]">{filteredProducts.length}</span> fresh products sourced near Pune
            </p>
          </div>

          {/* Controls bar: Mobile Filter Button & Sort Dropdown */}
          <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#D5CCC0] text-xs font-semibold text-[#184A2C] shadow-xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#718279] font-medium hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white text-xs font-semibold text-[#182620] pl-3 pr-8 py-2 rounded-xl border border-[#D5CCC0] focus:outline-none focus:border-[#184A2C] shadow-xs cursor-pointer"
                  id="shop-sort-select"
                >
                  <option value="recommended">Recommended</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated (★ 4.8+)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#718279] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-xs sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE2]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#183622]">
                <SlidersHorizontal className="w-4 h-4 text-[#184A2C]" />
                <span>Filter By</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#C26E23] hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter Checkboxes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#182620] uppercase tracking-wider">
                Category
              </h4>
              <div className="space-y-1.5 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id as DairyCategory)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#E4EDE6] text-[#184A2C] font-bold'
                        : 'text-[#485A50] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <Check className="w-3.5 h-3.5 text-[#184A2C]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE2]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#182620] uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-[#184A2C]">
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#184A2C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86978E]">
                <span>₹35 (Chaas)</span>
                <span>₹1000 (Pure Ghee)</span>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE2]">
              <h4 className="text-xs font-bold text-[#182620] uppercase tracking-wider">
                Availability
              </h4>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-[#3E5146] cursor-pointer">
                  <input
                    type="radio"
                    name="avail"
                    checked={availabilityFilter === 'all'}
                    onChange={() => setAvailabilityFilter('all')}
                    className="accent-[#184A2C]"
                  />
                  <span>All Items</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[#3E5146] cursor-pointer">
                  <input
                    type="radio"
                    name="avail"
                    checked={availabilityFilter === 'today'}
                    onChange={() => setAvailabilityFilter('today')}
                    className="accent-[#184A2C]"
                  />
                  <span>Available Today in Pune</span>
                </label>
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE2]">
              <h4 className="text-xs font-bold text-[#182620] uppercase tracking-wider">
                Dairy Quality
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dietaryOptions.map((opt) => {
                  const isChecked = selectedDietary.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleDietary(opt.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        isChecked
                          ? 'bg-[#184A2C] border-[#184A2C] text-white font-medium'
                          : 'bg-[#FAF7F2] border-[#E2DDD2] text-[#4F6056] hover:border-[#184A2C]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-12 text-center space-y-3">
                <p className="text-3xl">🥛</p>
                <h3 className="font-serif text-lg font-bold text-[#183622]">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-[#63756B] max-w-sm mx-auto">
                  Try adjusting the maximum price, clearing the search query, or selecting another dairy category.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#184A2C] text-white text-xs font-semibold rounded-xl hover:bg-[#133D24]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const qty = cartItemsMap[product.id] || 0;
                  const isWishlisted = wishlistIds.has(product.id);

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      cartQuantity={qty}
                      isWishlisted={isWishlisted}
                      onAddToCart={onAddToCart}
                      onUpdateCartQty={onUpdateCartQty}
                      onToggleWishlist={onToggleWishlist}
                      onSelectProduct={onSelectProduct}
                    />
                  );
                })}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <h3 className="font-bold text-sm text-[#182620]">Filter Products</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#718279]" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#718279] uppercase mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCategory(c.id as DairyCategory);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                        selectedCategory === c.id
                          ? 'bg-[#184A2C] text-white font-bold'
                          : 'text-[#2D3E35] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#718279] uppercase mb-2">
                  Max Price: ₹{maxPrice}
                </h4>
                <input
                  type="range"
                  min="35"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#184A2C]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 rounded-xl border border-[#D5CCC0] text-xs font-bold text-[#184A2C]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-xl bg-[#184A2C] text-xs font-bold text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
