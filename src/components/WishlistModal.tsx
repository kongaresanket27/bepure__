import React from 'react';
import { DairyProduct, ProductVariant } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: DairyProduct[];
  onRemoveWishlist: (product: DairyProduct) => void;
  onAddToCart: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  onSelectProduct: (product: DairyProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden z-10 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#F0EBE2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D9534F] fill-[#D9534F]" />
            <h2 className="font-serif text-lg font-bold text-[#182620]">
              Saved Products ({wishlistProducts.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D8] text-[#718279] hover:text-[#182620] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-5 flex-1 divide-y divide-[#F0EBE2]">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E8E1D4] flex items-center justify-center mx-auto text-xl text-[#8E9F96]">
                ♡
              </div>
              <h3 className="font-serif text-base font-bold text-[#182620]">
                No items saved yet
              </h3>
              <p className="text-xs text-[#63756A] max-w-xs mx-auto">
                Tap the heart icon on any dairy product to save it for your next order.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const defaultVariant = product.variants[product.defaultVariantIndex] || product.variants[0];

              return (
                <div key={product.id} className="py-3.5 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D8] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-left font-bold text-xs text-[#182620] hover:text-[#184A2C] line-clamp-1"
                    >
                      {product.name}
                    </button>
                    <p className="text-[11px] text-[#63756A] mt-0.5">
                      {defaultVariant.size} • ₹{defaultVariant.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product, defaultVariant, 1);
                          onRemoveWishlist(product);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#184A2C] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#123922]"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#E5A83B]" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="p-1.5 text-[#9AA8A0] hover:text-[#D9534F] rounded"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
