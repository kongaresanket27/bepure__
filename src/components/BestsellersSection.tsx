import React from 'react';
import { ProductCard } from './ProductCard';
import { DairyProduct, ProductVariant } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BestsellersSectionProps {
  products: DairyProduct[];
  cartItemsMap: Record<string, number>;
  wishlistIds: Set<string>;
  onAddToCart: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  onUpdateCartQty: (product: DairyProduct, variant: ProductVariant, delta: number) => void;
  onToggleWishlist: (product: DairyProduct) => void;
  onSelectProduct: (product: DairyProduct) => void;
  onViewAllClick: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  cartItemsMap,
  wishlistIds,
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  onSelectProduct,
  onViewAllClick,
}) => {
  // Select top favourite products
  const bestsellers = products.slice(0, 4);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="bestsellers">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C26E23] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Dairy Picks</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#183622] tracking-tight">
            Customer Favourites
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E64] mt-1">
            Fresh products our Pune customers order again and again.
          </p>
        </div>

        <button
          onClick={onViewAllClick}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#184A2C] hover:text-[#0E2E1A] hover:underline self-start sm:self-auto"
          id="bestsellers-view-all-btn"
        >
          <span>View All 8 Fresh Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4-column product grid on desktop, 2-column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestsellers.map((product) => {
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
    </section>
  );
};
