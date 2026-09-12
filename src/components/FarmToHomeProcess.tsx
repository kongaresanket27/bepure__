import React from 'react';
import { ShieldCheck, Truck, Droplets, CheckCircle, Sunrise, ArrowRight } from 'lucide-react';

export const FarmToHomeProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Local Pune Farms',
      desc: 'Free-range Gir cows and Murrah buffaloes raised on organic green fodder in Junnar & Daund.',
      icon: Sunrise,
      badge: 'Certified Gaushalas',
    },
    {
      num: '02',
      title: 'Morning Milking',
      desc: 'Milked at 4:30 AM in untouched stainless steel containers and chilled to 3°C instantly.',
      icon: Droplets,
      badge: '< 45 Mins Chill',
    },
    {
      num: '03',
      title: '8-Point Lab Testing',
      desc: 'Automated digital infrared scan for zero urea, starch, detergent, or water tampering.',
      icon: ShieldCheck,
      badge: 'Zero Adulteration',
    },
    {
      num: '04',
      title: 'Hygienic Cold Packing',
      desc: 'Sterilized glass bottles sealed under UV-filtered air without chemical preservatives.',
      icon: CheckCircle,
      badge: '100% Food-Grade Glass',
    },
    {
      num: '05',
      title: 'Delivered by 7:00 AM',
      desc: 'Insulated cooler vans dispatch bottles to Pune apartments before your morning tea.',
      icon: Truck,
      badge: 'Within 18 Hours',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-[#EAE3D6]" id="journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C26E23]">
            Purity In Every Drop
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight mt-1">
            Farm to Doorstep Within 18 Hours
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E64] mt-1.5">
            How we bring raw, unadulterated farm milk straight from Pune countryside to your morning kettle.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="relative bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#EAE3D6] flex flex-col justify-between group hover:border-[#184A2C] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-lg font-bold text-[#C26E23]">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#E4EDE6] text-[#184A2C] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#183622] leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#5C6E64] mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#EAE3D6]/70">
                  <span className="text-[10px] font-bold text-[#184A2C] bg-[#E8F3EB] px-2 py-0.5 rounded-full inline-block">
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
