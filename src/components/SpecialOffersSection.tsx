import React, { useState } from 'react';
import { SPECIAL_OFFERS } from '../data/dairyProducts';
import { Tag, Check, ArrowRight, Copy } from 'lucide-react';

interface SpecialOffersSectionProps {
  onApplyCoupon: (code: string) => void;
  onOpenCart: () => void;
  appliedCoupon: string | null;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onApplyCoupon,
  onOpenCart,
  appliedCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    onApplyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-12 bg-[#F6F1E8] border-y border-[#E8E0D2]" id="offers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C26E23] uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Special Offers &amp; Combos</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight">
              Freshness Worth Sharing
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E64] mt-0.5">
              Verified promo codes and bundled packages for Pune homes.
            </p>
          </div>

          <span className="text-xs text-[#184A2C] font-semibold bg-[#E4EDE6] px-3 py-1 rounded-full self-start sm:self-auto">
            ⚡ Applies instantly in cart
          </span>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SPECIAL_OFFERS.map((offer) => {
            const isApplied = appliedCoupon === offer.code;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-[#E4DCD0] shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Pill Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FBF2E7] text-[#C26E23] px-2.5 py-0.5 rounded-full border border-[#F6DCBF]">
                    {offer.pillBadge}
                  </span>
                  <span className="text-xs font-bold text-[#184A2C]">
                    {offer.discountLabel}
                  </span>
                </div>

                {/* Offer Visual & Title */}
                <div className="flex gap-4 items-center mb-3">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D8] shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#182620] leading-snug">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-[#63756A] mt-1 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                </div>

                {/* Promo Code & Action */}
                <div className="mt-4 pt-3 border-t border-[#F0EBE2] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-dashed border-[#D3C7B6] px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold text-[#183622]">
                    <span>{offer.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopyAndApply(offer.code)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-[#2E7D46] text-white'
                        : 'bg-[#184A2C] hover:bg-[#123922] text-white'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied in Cart</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Coupon</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
