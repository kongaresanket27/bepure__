import React, { useState } from 'react';
import { Heart, Star, Plus, Minus, Check, ShoppingBag, Eye } from 'lucide-react';
import { DairyProduct, ProductVariant } from '../types';

interface ProductCardProps {
  product: DairyProduct;
  cartQuantity: number;
  isWishlisted: boolean;
  onAddToCart: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  onUpdateCartQty: (product: DairyProduct, variant: ProductVariant, delta: number) => void;
  onToggleWishlist: (product: DairyProduct) => void;
  onSelectProduct: (product: DairyProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  isWishlisted,
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(product.defaultVariantIndex);
  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1200);
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#D0C7B8] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Top Media Area */}
      <div className="relative aspect-[4/3] bg-[#F5F2EB] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider ${
              product.badge === 'Best Seller'
                ? 'bg-[#E5A83B] text-[#183622]'
                : product.badge === 'Fresh Today'
                ? 'bg-[#184A2C] text-white'
                : product.badge === 'Popular'
                ? 'bg-[#2A6540] text-white'
                : 'bg-[#E4EDE6] text-[#184A2C]'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart & Quick View buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs ${
              isWishlisted
                ? 'bg-[#D9534F] text-white'
                : 'bg-white/90 text-[#6B7B72] hover:text-[#D9534F] hover:bg-white'
            }`}
            title="Save to Wishlist"
            id={`wishlist-toggle-${product.id}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#6B7B72] hover:text-[#184A2C] flex items-center justify-center transition-colors shadow-xs opacity-0 group-hover:opacity-100"
            title="Quick Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Milking Time / Freshness Overlay Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 text-white flex items-center justify-between text-[10px]">
          <span className="truncate max-w-[170px] font-medium text-white/90">
            📍 {product.farmSource.location.split(',')[0]}
          </span>
          <span className="bg-[#184A2C]/90 text-white px-1.5 py-0.2 rounded text-[9px] font-semibold">
            Chilled 3°C
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1.5 text-xs mb-1.5">
            <div className="flex items-center text-[#E5A83B]">
              <Star className="w-3.5 h-3.5 fill-[#E5A83B]" />
              <span className="font-bold text-[#182620] ml-1 text-xs">{product.rating}</span>
            </div>
            <span className="text-[11px] text-[#788880]">({product.reviewCount} reviews)</span>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] text-[#2E7D46] font-medium">Pune Farm</span>
          </div>

          {/* Product Title */}
          <button 
            onClick={() => onSelectProduct(product)}
            className="text-left font-serif text-base sm:text-lg font-bold text-[#173021] hover:text-[#25663D] transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </button>

          {/* Short Description */}
          <p className="text-xs text-[#5E6F66] mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Size / Variant Options */}
        <div className="mt-3.5 pt-3 border-t border-[#F0EBE2]">
          <div className="text-[11px] font-semibold text-[#76877F] uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Select Pack Size:</span>
            {selectedVariant.discountPercent && selectedVariant.discountPercent > 0 && (
              <span className="text-[#C26E23] font-bold">
                {selectedVariant.discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((variant, index) => {
              const isSelected = index === selectedVariantIndex;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#184A2C] text-white shadow-xs'
                      : 'bg-[#F4F0E8] text-[#33463C] hover:bg-[#EAE4D9]'
                  }`}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>

          {/* Price Row & Add to Cart button */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-bold text-[#183622]">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-xs text-[#8A9A92] line-through">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#718279] block">Inclusive of all taxes</span>
            </div>

            {/* Add to Cart / Quantity Controller */}
            {cartQuantity > 0 ? (
              <div className="flex items-center bg-[#184A2C] text-white rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => onUpdateCartQty(product, selectedVariant, -1)}
                  className="px-2.5 py-2 hover:bg-[#123922] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onUpdateCartQty(product, selectedVariant, 1)}
                  className="px-2.5 py-2 hover:bg-[#123922] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                  isAddedFeedback
                    ? 'bg-[#2E7D46] text-white'
                    : 'bg-[#184A2C] hover:bg-[#133D24] text-white'
                }`}
                id={`add-btn-${product.id}`}
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E5A83B]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
