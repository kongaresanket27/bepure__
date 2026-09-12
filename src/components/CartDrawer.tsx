import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, Tag, ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (item: CartItem, delta: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  // Discount calculation
  let discount = 0;
  if (appliedCoupon === 'MILK20') discount = 20;
  else if (appliedCoupon === 'COMBO15') discount = Math.round(subtotal * 0.15);
  else if (appliedCoupon === 'SUBPUNE') discount = Math.round(subtotal * 0.10);

  const deliveryThreshold = 499;
  const isFreeDelivery = subtotal >= deliveryThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 30;
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / deliveryThreshold) * 100));

  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (['MILK20', 'COMBO15', 'SUBPUNE', 'FRESH10'].includes(code)) {
      onApplyCoupon(code);
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try MILK20 or COMBO15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#EAE3D6] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#184A2C]" />
            <h2 className="font-serif text-lg font-bold text-[#182620]">
              Your Fresh Dairy Basket
            </h2>
            <span className="bg-[#E4EDE6] text-[#184A2C] text-xs font-bold px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D8] text-[#718279] hover:text-[#182620] transition-colors"
            id="close-cart-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FAF4EB] px-5 py-2.5 border-b border-[#EBE3D6] text-xs">
          {subtotal >= deliveryThreshold ? (
            <div className="flex items-center gap-1.5 text-[#2E7D46] font-semibold">
              <Check className="w-4 h-4" />
              <span>You've unlocked FREE morning delivery in Pune!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-[#5C6E64] mb-1">
                <span>Add ₹{deliveryThreshold - subtotal} more for <strong>FREE Delivery</strong></span>
                <span className="font-semibold">{progressToFreeDelivery}%</span>
              </div>
              <div className="w-full bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#184A2C] h-full transition-all duration-300"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0EBE2]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E1D4] flex items-center justify-center text-2xl">
                🥛
              </div>
              <h3 className="font-serif text-lg font-bold text-[#182620]">
                Your basket is empty
              </h3>
              <p className="text-xs text-[#63756A] max-w-xs">
                Browse our farm-fresh A2 milk, soft homemade paneer, and authentic bilona ghee.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#184A2C] text-white text-xs font-bold rounded-xl hover:bg-[#133D24] shadow-xs"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-3.5 flex gap-3 items-start">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D8] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#182620] leading-snug truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item)}
                      className="text-[#9BAAA2] hover:text-[#D9534F] p-0.5"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#5C6E64] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E8E2D8]">
                      {item.variant.size}
                    </span>
                    {item.isSubscription && (
                      <span className="text-[10px] text-[#C26E23] font-semibold bg-[#FDF2E6] px-1.5 py-0.5 rounded">
                        Subscribed: {item.frequency}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#D5CCC0] rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQty(item, -1)}
                        className="px-2 py-1 text-[#182620] hover:bg-[#FAF7F2] text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#182620] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item, 1)}
                        className="px-2 py-1 text-[#182620] hover:bg-[#FAF7F2] text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#184A2C]">
                        ₹{item.variant.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Coupon, Subtotals, & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D6] bg-[#FAF7F2] space-y-3.5">
            
            {/* Coupon input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#E8F3EB] border border-[#C5DEC9] p-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-[#184A2C] font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#2E7D46]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> applied (-₹{discount})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-xs text-[#D9534F] hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter Coupon (e.g. MILK20)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D5CCC0] uppercase bg-white focus:outline-none focus:border-[#184A2C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-[#FAF7F2] border border-[#184A2C] text-[#184A2C] text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-[#D9534F] mt-1">{couponError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#52645B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#182620]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E7D46] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#2E7D46] font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5DDD0] text-sm font-bold text-[#182620]">
                <span>Total Amount</span>
                <span className="text-base text-[#184A2C]">₹{total}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-[#184A2C] hover:bg-[#123922] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              id="cart-proceed-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
