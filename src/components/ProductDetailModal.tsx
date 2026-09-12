import React, { useState } from 'react';
import { DairyProduct, ProductVariant } from '../types';
import { 
  X, 
  Star, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Check, 
  ShoppingBag, 
  ChevronRight,
  Droplets,
  AlertCircle
} from 'lucide-react';

interface ProductDetailModalProps {
  product: DairyProduct | null;
  onClose: () => void;
  onAddToCart: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  onBuyNow: (product: DairyProduct, variant: ProductVariant, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: DairyProduct) => void;
  selectedPuneArea: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  selectedPuneArea,
}) => {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(product.defaultVariantIndex);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'quality' | 'nutrition'>('details');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1200);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedVariant, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#F0EBE2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#184A2C]">
            <span className="w-2 h-2 rounded-full bg-[#2E7D46]"></span>
            <span>{product.categoryLabel}</span>
            <span className="text-[#A2B1A8]">•</span>
            <span className="text-[#64766C]">Direct from {product.farmSource.farmName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D8] text-[#718279] hover:text-[#182620] transition-colors"
            id="close-product-detail-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left: Images Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F2EB] border border-[#E8E2D8]">
                <img
                  src={images[selectedImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#E5A83B] text-[#183622] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                    isWishlisted ? 'bg-[#D9534F] text-white' : 'bg-white/90 text-[#67776F] hover:text-[#D9534F]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#E5A83B]" />
                    <span>{product.farmSource.milkingTime}</span>
                  </span>
                  <span className="text-[10px] bg-[#2E7D46] px-1.5 py-0.5 rounded font-medium">
                    Raw & Unboiled
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#184A2C] ring-1 ring-[#184A2C]'
                          : 'border-[#E8E2D8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info, Price, Size selection, & Actions */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <div className="flex items-center text-[#E5A83B]">
                    <Star className="w-3.5 h-3.5 fill-[#E5A83B]" />
                    <span className="font-bold text-[#182620] ml-1">{product.rating}</span>
                  </div>
                  <span className="text-[#718279]">({product.reviewCount} customer ratings)</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#2E7D46] font-semibold text-xs">Fresh Today</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#182620] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#5C6E64] mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E1D5]">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#184A2C]">
                    ₹{selectedVariant.price}
                  </span>
                  {selectedVariant.originalPrice && (
                    <span className="text-sm text-[#87978E] line-through">
                      ₹{selectedVariant.originalPrice}
                    </span>
                  )}
                  {selectedVariant.discountPercent && (
                    <span className="text-xs font-bold text-[#C26E23] bg-[#FDF2E6] px-2 py-0.5 rounded-full border border-[#F8DCBC]">
                      Save {selectedVariant.discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#718279] mt-0.5">
                  Inclusive of all local taxes • Free glass bottle packaging
                </p>
              </div>

              {/* Size Selector Buttons */}
              <div>
                <label className="block text-xs font-bold text-[#182620] uppercase tracking-wider mb-2">
                  Choose Pack Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedVariantIndex === i
                          ? 'bg-[#184A2C] border-[#184A2C] text-white shadow-xs'
                          : 'bg-white border-[#DCD5C8] text-[#2F4237] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span>{v.size}</span>
                      <span className="ml-1.5 opacity-80">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D5CCC0] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-[#182620] hover:bg-[#FAF7F2] font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#182620] min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-[#182620] hover:bg-[#FAF7F2] font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 ${
                      isAddedFeedback
                        ? 'bg-[#2E7D46] text-white'
                        : 'bg-[#184A2C] hover:bg-[#123922] text-white'
                    }`}
                    id="modal-add-to-cart-btn"
                  >
                    {isAddedFeedback ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#E5A83B]" />
                        <span>Add to Cart (₹{selectedVariant.price * quantity})</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 rounded-xl bg-[#E5A83B] hover:bg-[#D4982F] text-[#183622] text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-98"
                  id="modal-buy-now-btn"
                >
                  Buy Now — Fast Checkout
                </button>
              </div>

              {/* Delivery Estimation Pill */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#E8F3EB] text-xs text-[#184A2C] font-medium">
                <Truck className="w-4 h-4 text-[#2E7D46] shrink-0" />
                <span>
                  Delivering to <strong>{selectedPuneArea}, Pune</strong> before 7:00 AM tomorrow
                </span>
              </div>

            </div>
          </div>

          {/* Deep Information Tabs: Details / Quality Testing / Nutritional Table */}
          <div className="pt-4 border-t border-[#E8E2D8]">
            <div className="flex border-b border-[#E8E2D8] gap-6 text-xs font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#184A2C] text-[#184A2C]'
                    : 'border-transparent text-[#718279] hover:text-[#182620]'
                }`}
              >
                Farm Source &amp; Purity
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  activeTab === 'quality'
                    ? 'border-[#184A2C] text-[#184A2C]'
                    : 'border-transparent text-[#718279] hover:text-[#182620]'
                }`}
              >
                Lab Quality Testing
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  activeTab === 'nutrition'
                    ? 'border-[#184A2C] text-[#184A2C]'
                    : 'border-transparent text-[#718279] hover:text-[#182620]'
                }`}
              >
                Nutritional Facts
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-4 text-xs">
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5]">
                    <h4 className="font-bold text-[#182620] uppercase tracking-wider text-[11px]">
                      Origin &amp; Milking Traceability
                    </h4>
                    <p className="text-[#5C6E64]">
                      <strong>Farm:</strong> {product.farmSource.farmName}
                    </p>
                    <p className="text-[#5C6E64]">
                      <strong>Location:</strong> {product.farmSource.location}
                    </p>
                    <p className="text-[#5C6E64]">
                      <strong>Cattle Breed:</strong> {product.farmSource.breed}
                    </p>
                  </div>

                  <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5]">
                    <h4 className="font-bold text-[#182620] uppercase tracking-wider text-[11px]">
                      Purity Guarantee Highlights
                    </h4>
                    <ul className="space-y-1 text-[#4F6056]">
                      {product.purityHighlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2E7D46] shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'quality' && (
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E1D5]">
                    <span className="font-bold text-[#182620]">FSSAI Standard Parameters Checked Daily</span>
                    <span className="text-[10px] bg-[#2E7D46] text-white px-2 py-0.5 rounded font-bold">100% Passed</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-2.5 rounded-lg border border-[#E0D8CC]">
                      <span className="text-[10px] text-[#718279] uppercase block font-semibold">Fat Content</span>
                      <span className="font-bold text-xs text-[#184A2C]">{product.qualityTesting.fat}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#E0D8CC]">
                      <span className="text-[10px] text-[#718279] uppercase block font-semibold">SNF Quality</span>
                      <span className="font-bold text-xs text-[#184A2C]">{product.qualityTesting.snf}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#E0D8CC]">
                      <span className="text-[10px] text-[#718279] uppercase block font-semibold">Laboratory Scan</span>
                      <span className="font-bold text-xs text-[#184A2C]">{product.qualityTesting.labTested}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#E0D8CC]">
                      <span className="text-[10px] text-[#718279] uppercase block font-semibold">Adulterants</span>
                      <span className="font-bold text-xs text-[#2E7D46]">Zero detected</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5]">
                  <h4 className="font-bold text-[#182620] uppercase tracking-wider text-[11px] mb-2">
                    Approx. Values per {product.nutritionalFacts.servingSize}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div className="bg-white p-2 rounded-lg border border-[#E0D8CC] text-center">
                      <span className="text-[10px] text-[#718279] block">Energy</span>
                      <span className="font-bold text-xs text-[#182620]">{product.nutritionalFacts.calories}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E0D8CC] text-center">
                      <span className="text-[10px] text-[#718279] block">Protein</span>
                      <span className="font-bold text-xs text-[#184A2C]">{product.nutritionalFacts.protein}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E0D8CC] text-center">
                      <span className="text-[10px] text-[#718279] block">Dairy Fat</span>
                      <span className="font-bold text-xs text-[#182620]">{product.nutritionalFacts.fat}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E0D8CC] text-center">
                      <span className="text-[10px] text-[#718279] block">Carbs</span>
                      <span className="font-bold text-xs text-[#182620]">{product.nutritionalFacts.carbohydrates}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E0D8CC] text-center">
                      <span className="text-[10px] text-[#718279] block">Calcium</span>
                      <span className="font-bold text-xs text-[#2E7D46]">{product.nutritionalFacts.calcium}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
