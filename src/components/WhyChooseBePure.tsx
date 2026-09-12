import React from 'react';
import { Leaf, ShieldCheck, Droplets, Truck, CheckCircle2 } from 'lucide-react';

export const WhyChooseBePure: React.FC = () => {
  const benefits = [
    {
      title: 'Verified Local Farms',
      description: 'Sourced directly from native Gir cow gaushalas and traditional dairy farmers around Pune.',
      icon: Leaf,
      color: 'bg-[#E4EDE6] text-[#184A2C]',
    },
    {
      title: '8-Point Lab Tested',
      description: 'Zero adulteration. Daily digital testing for water, urea, starch, detergents, and synthetic fat.',
      icon: ShieldCheck,
      color: 'bg-[#E8F3EB] text-[#2E7D46]',
    },
    {
      title: '100% Pure & Unprocessed',
      description: 'Unadulterated whole milk packed in sterilized glass bottles within hours of morning milking.',
      icon: Droplets,
      color: 'bg-[#F4EFE6] text-[#C26E23]',
    },
    {
      title: 'Fast Morning Delivery',
      description: 'Delivered in temperature-controlled cooler bags across Pune before 7:00 AM every morning.',
      icon: Truck,
      color: 'bg-[#FAF3E8] text-[#D97706]',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-[#EAE3D6]" id="why-bepure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C26E23]">
            The BePure Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight mt-0.5">
            Why Pune Families Choose BePure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;

            return (
              <div
                key={i}
                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE3D6] flex flex-col justify-between hover:border-[#184A2C] transition-colors"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${b.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#182620]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#5C6E64] mt-1.5 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#EAE3D6] flex items-center gap-1.5 text-[11px] font-semibold text-[#184A2C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D46]" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
