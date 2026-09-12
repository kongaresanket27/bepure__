import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onShopClick: () => void;
  onOffersClick: () => void;
  selectedPuneArea: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopClick,
  onOffersClick,
  selectedPuneArea,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F3EEE5] py-8 sm:py-12 border-b border-[#E8E1D5]" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Commercial E-commerce Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4EDE6] border border-[#C9DCCF] text-xs font-semibold text-[#184A2C] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2E7D46]"></span>
              <span>Fresh From Local Farms • Pune</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#163622] leading-[1.15]">
                Pure Dairy. <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#24613C]">Delivered Fresh.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#4E6155] max-w-xl leading-relaxed">
              Farm-fresh dairy products sourced from verified local farms and delivered to your doorstep in <strong className="text-[#184A2C]">{selectedPuneArea}, Pune</strong> within 24 hours of morning milking. 100% pure, unadulterated, and lab tested.
            </p>

            {/* Shopping Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onShopClick}
                className="px-6 py-3 rounded-xl bg-[#184A2C] hover:bg-[#123922] text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-98"
                id="hero-shop-dairy-btn"
              >
                <span>Shop Dairy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOffersClick}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D5CCC0] text-[#184A2C] text-sm font-semibold transition-all shadow-sm hover:border-[#184A2C]"
                id="hero-view-offers-btn"
              >
                <span>View Offers (Save 15%)</span>
              </button>
            </div>

            {/* Trust Pills under hero */}
            <div className="pt-2 grid grid-cols-3 gap-3 max-w-lg border-t border-[#E6DED2] border-opacity-60">
              <div className="flex items-center gap-2 text-xs font-medium text-[#2E4035]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D46] shrink-0" />
                <span>Zero Adulteration</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#2E4035]">
                <Truck className="w-4 h-4 text-[#E5A83B] shrink-0" />
                <span>Before 7 AM Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#2E4035]">
                <Sparkles className="w-4 h-4 text-[#2E7D46] shrink-0" />
                <span>Cold Chain &lt;4°C</span>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Dairy Showcase Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              
              {/* Main Dairy Composition Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white">
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=900&auto=format&fit=crop"
                  alt="BePure Fresh Desi Milk in glass bottle"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                
                {/* Top Badges Inside Image */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-bold bg-[#184A2C]/95 text-white px-3 py-1 rounded-lg backdrop-blur-xs shadow-xs">
                    Raw A2 Gir Cow Milk
                  </span>
                  <div className="bg-white/95 backdrop-blur-xs rounded-lg px-2.5 py-1 shadow-xs border border-[#E8E2D8] flex items-center gap-1.5 text-left">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D46] shrink-0" />
                    <span className="text-[10px] font-bold text-[#182620]">Tested &amp; Packed Today</span>
                  </div>
                </div>

                {/* Bottom Overlay Info on image (Clean, readable gradient) */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs text-white/95 font-medium">Chilled immediately after morning milking</p>
                    <span className="text-[11px] text-emerald-300 font-semibold block mt-0.5">
                      ✓ 100% Pure • Zero Adulteration
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-stone-300 block uppercase font-medium">Starting at</span>
                    <span className="text-base sm:text-lg font-bold text-[#E5A83B] bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-xs inline-block">
                      ₹75 / L
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Specialty Cards Strip Under Main Image (Zero Overlap!) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl border border-[#E8E2D8] p-2.5 flex items-center gap-2.5 shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=200&auto=format&fit=crop"
                    alt="Fresh Malai Paneer"
                    className="w-10 h-10 rounded-lg object-cover border border-[#E8E2D8] shrink-0"
                  />
                  <div className="text-left min-w-0">
                    <span className="text-[10px] text-[#718279] uppercase font-bold tracking-wider block">Fresh Paneer</span>
                    <p className="text-xs font-bold text-[#184A2C] truncate">Daily Soft Batches</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8E2D8] p-2.5 flex items-center gap-2.5 shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=200&auto=format&fit=crop"
                    alt="Vedic Bilona Ghee"
                    className="w-10 h-10 rounded-lg object-cover border border-[#E8E2D8] shrink-0"
                  />
                  <div className="text-left min-w-0">
                    <span className="text-[10px] text-[#718279] uppercase font-bold tracking-wider block">Bilona Ghee</span>
                    <p className="text-xs font-bold text-[#184A2C] truncate">A2 Curd Churned</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
