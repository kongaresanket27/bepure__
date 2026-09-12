import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/dairyProducts';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-[#EAE3D6]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C26E23] uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-[#C26E23]" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183622] tracking-tight">
              Loved by Families Across Pune
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E64] mt-0.5">
              Over 12,000 Pune households trust BePure for unadulterated morning milk and dairy.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#184A2C] bg-[#E8F3EB] px-3 py-1.5 rounded-full self-start sm:self-auto">
            <span className="font-bold text-sm">4.9 / 5</span>
            <span>Based on 1,420+ Verified Pune Deliveries</span>
          </div>
        </div>

        {/* Reviews 4-card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EAE3D6] flex flex-col justify-between hover:border-[#D0C5B5] transition-colors"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-[#E5A83B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                    ))}
                  </div>

                  {review.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#2E7D46] bg-[#E2EDE5] px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-[#3E5045] leading-relaxed italic">
                  "{review.reviewText}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE3D6]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#182620]">
                    {review.name}
                  </h4>
                  <span className="text-[10px] text-[#7A8C82]">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#5C6E64] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#E5A83B]" />
                  <span>{review.location}</span>
                </div>
                <div className="text-[10px] text-[#184A2C] font-semibold mt-1 truncate">
                  Ordered: {review.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
