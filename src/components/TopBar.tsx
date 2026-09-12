import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Droplets, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Heart,
  Search,
  X
} from 'lucide-react';
import { PUNE_AREAS } from '../data/dairyProducts';

interface TopBarProps {
  onNavigateSection: (sectionId: string) => void;
  selectedPuneArea: string;
  onSelectPuneArea: (area: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNavigateSection,
  selectedPuneArea,
  onSelectPuneArea,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery = '',
  onSearchChange,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'categories', 'bestsellers', 'shop', 'offers', 'journey', 'why-bepure', 'reviews'];
      const scrollPosition = window.scrollY + 130;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop Dairy', icon: ShoppingBag },
    { id: 'bestsellers', label: 'Bestsellers', icon: Sparkles },
    { id: 'offers', label: 'Offers', icon: Tag, badge: 'Deals' },
    { id: 'journey', label: 'Our Process', icon: Droplets },
    { id: 'why-bepure', label: 'Why BePure', icon: ShieldCheck },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Brand Logo, Search / Delivery Area, and Action Controls */}
        <div className="flex items-center justify-between py-2.5 sm:py-3 gap-3">
          
          {/* Left: Brand Identity & Pune Delivery Selector */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
              aria-label="BePure Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#184A2C] text-[#E5A83B] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="shrink-0">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#183622] block leading-none">
                  BePure
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#687C71] mt-0.5 block">
                  Farm Dairy • Pune
                </span>
              </div>
            </button>

            {/* Pune Locality Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white border border-[#DDD5C7] rounded-xl px-2.5 py-1.5 text-xs shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#E5A83B] shrink-0" />
              <span className="text-[#697C72] text-[11px] font-medium hidden md:inline">Deliver to:</span>
              <select
                value={selectedPuneArea}
                onChange={(e) => onSelectPuneArea(e.target.value)}
                className="font-bold text-[#182620] bg-transparent focus:outline-none cursor-pointer text-xs pr-1"
                aria-label="Select Pune delivery area"
              >
                {PUNE_AREAS.map((area) => (
                  <option key={area} value={area}>{area}, Pune</option>
                ))}
              </select>
            </div>
          </div>

          {/* Center: Search Bar (expands nicely on desktop) */}
          {onSearchChange && (
            <div className="flex-1 max-w-md mx-2 hidden md:block">
              <div className="relative flex items-center bg-white border border-[#DDD5C7] focus-within:border-[#184A2C] rounded-xl px-3 py-1.5 transition-colors shadow-2xs">
                <Search className="w-4 h-4 text-[#7B8E83] shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search pure milk, ghee, paneer, curd..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#182620] placeholder-[#8B9C92] focus:outline-none"
                  aria-label="Search dairy products"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-[#8B9C92] hover:text-[#182620] ml-1.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right: Saved Items & Cart Buttons (Always completely visible!) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile locality select */}
            <div className="sm:hidden flex items-center bg-white border border-[#DDD5C7] rounded-lg px-2 py-1 text-[11px] shadow-2xs">
              <MapPin className="w-3 h-3 text-[#E5A83B] mr-1 shrink-0" />
              <select
                value={selectedPuneArea}
                onChange={(e) => onSelectPuneArea(e.target.value)}
                className="font-bold text-[#182620] bg-transparent focus:outline-none text-[11px] max-w-[85px] truncate"
              >
                {PUNE_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Saved Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 bg-white hover:bg-[#FAF7F2] border border-[#DDD5C7] text-[#182620] rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-semibold shadow-2xs transition-colors"
              title="View Saved Items"
              aria-label="View Saved Items"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#D9534F] fill-[#D9534F]' : 'text-[#718279]'}`} />
              <span className="hidden sm:inline">Saved</span>
              {wishlistCount > 0 && (
                <span className="bg-[#FAF0EE] text-[#D9534F] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#184A2C] hover:bg-[#123922] text-white rounded-xl px-3 sm:px-4 py-1.5 text-xs font-bold shadow-xs transition-colors shrink-0"
              id="topbar-cart-btn"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5A83B]" />
              <span>Cart ({cartCount})</span>
              {cartTotal > 0 && (
                <span className="pl-1.5 border-l border-white/20 text-[#E5A83B] font-semibold">
                  ₹{cartTotal}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Clean, Non-crowded Navigation Options Bar */}
        <div className="flex items-center justify-between sm:justify-center border-t border-[#EAE3D6] py-1.5 overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive 
                    ? 'text-[#184A2C] font-bold bg-[#E4EDE6] shadow-2xs' 
                    : 'text-[#4A5D53] hover:text-[#184A2C] hover:bg-[#F2ECE1]'
                }`}
                id={`nav-link-${item.id}`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#184A2C]' : 'text-[#718279]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-[#D9534F] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
