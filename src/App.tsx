import React, { useState, useEffect } from 'react';
import { DAIRY_PRODUCTS } from './data/dairyProducts';
import { 
  DairyProduct, 
  ProductVariant, 
  CartItem, 
  DairyCategory, 
  PlacedOrder 
} from './types';

import { TopBar } from './components/TopBar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { BestsellersSection } from './components/BestsellersSection';
import { ShopCatalogue } from './components/ShopCatalogue';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { FarmToHomeProcess } from './components/FarmToHomeProcess';
import { WhyChooseBePure } from './components/WhyChooseBePure';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistModal } from './components/WishlistModal';

import { Check, ShoppingBag, Heart, Home, Grid, Tag } from 'lucide-react';

export default function App() {
  // State: Cart Items (persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bepure_dairy_cart');
      if (saved) return JSON.parse(saved);
    } catch {}

    // Default sample items for instant delightful shopping experience
    const a2Milk = DAIRY_PRODUCTS[0];
    const paneer = DAIRY_PRODUCTS[1];
    return [
      {
        id: `${a2Milk.id}-${a2Milk.variants[1].id}`,
        productId: a2Milk.id,
        variantId: a2Milk.variants[1].id,
        product: a2Milk,
        variant: a2Milk.variants[1], // 1 Litre A2 milk
        quantity: 2,
      },
      {
        id: `${paneer.id}-${paneer.variants[0].id}`,
        productId: paneer.id,
        variantId: paneer.variants[0].id,
        product: paneer,
        variant: paneer.variants[0], // 250g paneer
        quantity: 1,
      },
    ];
  });

  // State: Wishlist (persisted)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bepure_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['desi-bilona-ghee']);
  });

  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState<DairyCategory>('all');
  const [selectedPuneArea, setSelectedPuneArea] = useState<string>('Baner');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeDetailProduct, setActiveDetailProduct] = useState<DairyProduct | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('MILK20');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bepure_dairy_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bepure_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch {}
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedCoupon === 'MILK20') discountAmount = 20;
  else if (appliedCoupon === 'COMBO15') discountAmount = Math.round(cartSubtotal * 0.15);
  else if (appliedCoupon === 'GHEE50') discountAmount = 50;

  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 30;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Cart Handlers
  const handleAddToCart = (product: DairyProduct, variant: ProductVariant, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingItemIndex > -1) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${variant.id}-${Date.now()}`,
          productId: product.id,
          variantId: variant.id,
          product,
          variant,
          quantity,
        },
      ];
    });

    showToast(`Added ${quantity}× ${product.name} (${variant.size}) to cart`);
  };

  const handleUpdateCartQty = (product: DairyProduct, variant: ProductVariant, delta: number) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingItemIndex === -1) {
        if (delta > 0) {
          return [
            ...prev,
            {
              id: `${product.id}-${variant.id}-${Date.now()}`,
              productId: product.id,
              variantId: variant.id,
              product,
              variant,
              quantity: delta,
            },
          ];
        }
        return prev;
      }

      const updated = [...prev];
      const newQty = updated[existingItemIndex].quantity + delta;

      if (newQty <= 0) {
        return updated.filter((_, idx) => idx !== existingItemIndex);
      }

      updated[existingItemIndex].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (item: CartItem) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Removed ${item.product.name} from basket`);
  };

  const handleUpdateItemQtyInCart = (item: CartItem, delta: number) => {
    handleUpdateCartQty(item.product, item.variant, delta);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: DairyProduct) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed ${product.name} from saved items`);
      } else {
        next.add(product.id);
        showToast(`Saved ${product.name} to wishlist`);
      }
      return next;
    });
  };

  const wishlistProducts = DAIRY_PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Cart item counts by product id for direct Card quantity display
  const cartItemsMap = cartItems.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  // Checkout and Order flows
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBuyNow = (product: DairyProduct, variant: ProductVariant, quantity: number) => {
    handleAddToCart(product, variant, quantity);
    setActiveDetailProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  // Section smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#182620] flex flex-col font-sans selection:bg-[#184A2C] selection:text-white pb-16 sm:pb-0">
      
      {/* 1. Sticky Top Navigation Bar with Home, Shop, Bestsellers, Offers, Process, Reviews, Location & Cart */}
      <TopBar
        onNavigateSection={scrollToSection}
        selectedPuneArea={selectedPuneArea}
        onSelectPuneArea={setSelectedPuneArea}
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* 2. Compact E-commerce Promotional Hero Banner */}
        <HeroBanner
          onShopClick={() => scrollToSection('shop')}
          onOffersClick={() => scrollToSection('offers')}
          selectedPuneArea={selectedPuneArea}
        />

        {/* 2. Shop by Category Grid */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection('shop');
          }}
        />

        {/* 3. Customer Favourites (Bestsellers) */}
        <BestsellersSection
          products={DAIRY_PRODUCTS}
          cartItemsMap={cartItemsMap}
          wishlistIds={wishlistIds}
          onAddToCart={handleAddToCart}
          onUpdateCartQty={handleUpdateCartQty}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={setActiveDetailProduct}
          onViewAllClick={() => {
            setSelectedCategory('all');
            scrollToSection('shop');
          }}
        />

        {/* 4. Complete Product Catalogue with Filters & Sorting */}
        <ShopCatalogue
          products={DAIRY_PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          cartItemsMap={cartItemsMap}
          wishlistIds={wishlistIds}
          onAddToCart={handleAddToCart}
          onUpdateCartQty={handleUpdateCartQty}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={setActiveDetailProduct}
          searchQuery={searchQuery}
        />

        {/* 5. Special Offers & Bundles */}
        <SpecialOffersSection
          onApplyCoupon={(code) => {
            setAppliedCoupon(code);
            showToast(`Coupon ${code} applied to your cart!`);
          }}
          onOpenCart={() => setIsCartOpen(true)}
          appliedCoupon={appliedCoupon}
        />

        {/* 6. Farm to Home Process */}
        <FarmToHomeProcess />

        {/* 7. Why Pune Families Choose BePure */}
        <WhyChooseBePure />

        {/* 8. Real Customer Testimonials */}
        <CustomerReviewsSection />
      </main>

      {/* 9. Professional E-commerce Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection('shop');
        }}
        onNavigateSection={scrollToSection}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={activeDetailProduct ? wishlistIds.has(activeDetailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        selectedPuneArea={selectedPuneArea}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateItemQtyInCart}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => {
          setAppliedCoupon(code);
          showToast(`Coupon ${code} applied!`);
        }}
        onRemoveCoupon={() => {
          setAppliedCoupon(null);
          showToast('Coupon removed');
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discount={discountAmount}
        deliveryFee={deliveryFee}
        total={cartFinalTotal}
        selectedPuneArea={selectedPuneArea}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
        onContinueShopping={() => {
          setPlacedOrder(null);
          scrollToSection('shop');
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setActiveDetailProduct(p)}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#184A2C] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#2A6540] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <div className="w-5 h-5 rounded-full bg-[#E5A83B] text-[#183622] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Bottom Sticky Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EAE3D6] px-4 py-2 flex items-center justify-around z-30 shadow-lg text-[10px] font-semibold text-[#5A6D63]">
        <button
          onClick={() => scrollToSection('hero')}
          className="flex flex-col items-center gap-1 hover:text-[#184A2C]"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => scrollToSection('shop')}
          className="flex flex-col items-center gap-1 hover:text-[#184A2C]"
        >
          <Grid className="w-4 h-4" />
          <span>Shop</span>
        </button>

        <button
          onClick={() => scrollToSection('offers')}
          className="flex flex-col items-center gap-1 hover:text-[#184A2C]"
        >
          <Tag className="w-4 h-4" />
          <span>Offers</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-[#184A2C] relative"
        >
          <Heart className="w-4 h-4" />
          {wishlistIds.size > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E5A83B] text-[#182620] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {wishlistIds.size}
            </span>
          )}
          <span>Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[#184A2C] font-bold relative"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#184A2C] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span>₹{cartSubtotal}</span>
        </button>
      </nav>

    </div>
  );
}
