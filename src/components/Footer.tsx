import React from 'react';
import { Leaf, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { PUNE_AREAS } from '../data/dairyProducts';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#183622] text-[#E8EDE9] pt-12 pb-8 border-t border-[#132B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#234A31]">
          
          {/* Col 1: Brand & Pune Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#24613C] text-[#E5A83B] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  BePure
                </span>
                <span className="text-[10px] uppercase tracking-wider block text-white/70">
                  Farm-Fresh Dairy • Pune
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B2C4B9] leading-relaxed max-w-sm">
              BePure brings raw, unadulterated cow &amp; buffalo milk, handcrafted malai paneer, and slow-churned bilona ghee directly from native Maharashtra gaushalas to Pune families within 18 hours of milking.
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs">
              <span className="bg-[#24613C] px-2.5 py-1 rounded text-white font-semibold">
                FSSAI Lic. 11522036000412
              </span>
              <span className="text-white/70">
                100% Recyclable Glass
              </span>
            </div>
          </div>

          {/* Col 2: Quick Shop Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A83B]">
              Dairy Pantry
            </h4>
            <ul className="space-y-2 text-xs text-[#D1DDD5]">
              <li>
                <button onClick={() => onSelectCategory('milk')} className="hover:text-white transition-colors">
                  Fresh A2 Desi Cow Milk
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('paneer')} className="hover:text-white transition-colors">
                  Fresh Homemade Paneer
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ghee')} className="hover:text-white transition-colors">
                  Desi Cow Vedic Bilona Ghee
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('curd')} className="hover:text-white transition-colors">
                  Fresh Probiotic Dahi (Curd)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('butter')} className="hover:text-white transition-colors">
                  Fresh Farm Safed Makkhan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('buttermilk')} className="hover:text-white transition-colors">
                  Masala Chaas (Buttermilk)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Pune Delivery Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A83B]">
              Pune Delivery Hubs
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-[#CBD8D0]">
              {PUNE_AREAS.slice(0, 10).map((area) => (
                <span key={area} className="bg-[#234A31] px-2 py-0.5 rounded">
                  {area}
                </span>
              ))}
              <span className="bg-[#234A31] px-2 py-0.5 rounded text-[#E5A83B]">
                + More Pune Areas
              </span>
            </div>
            <p className="text-[11px] text-[#A6BBAE] pt-1">
              Morning deliveries reach Pune apartments between 6:00 AM – 7:30 AM daily.
            </p>
          </div>

          {/* Col 4: Pune Contact & Help */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#D1DDD5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A83B]">
              Customer Care &amp; Gaushala
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5A83B] shrink-0 mt-0.5" />
                <span>
                  BePure Dairy Hub, Survey No. 48, Baner Main Road, Pune, Maharashtra 411045
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A83B] shrink-0" />
                <span>+91 82758 41327 / 020-25894102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5A83B] shrink-0" />
                <span>care@bepuredairy.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E5A83B] shrink-0" />
                <span>Dispatch Support: 5:30 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#95AAA0] gap-4">
          <p>© {new Date().getFullYear()} BePure Dairy Private Limited. All rights reserved. Made fresh in Pune.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Secure UPI &amp; Cards</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D46]" />
            </span>
            <span>•</span>
            <span>Zero Plastic Policy</span>
            <span>•</span>
            <span>FSSAI Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
