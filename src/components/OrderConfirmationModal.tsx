import React from 'react';
import { PlacedOrder } from '../types';
import { CheckCircle2, PackageCheck, MapPin, Clock, Truck, ShieldCheck, ArrowRight, Home } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Success Header banner */}
        <div className="bg-[#184A2C] text-white p-6 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#E5A83B] border border-white/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#E5A83B] bg-black/20 px-3 py-1 rounded-full">
            Order Placed Successfully
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2">
            Thank You, {order.customerDetails.fullName}!
          </h2>
          <p className="text-xs text-white/80 mt-1 max-w-sm mx-auto">
            Order ID: <strong className="text-white font-mono">{order.orderId}</strong> • Delivered fresh from Pune farms
          </p>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Estimated Delivery Banner */}
          <div className="bg-[#E8F3EB] p-4 rounded-2xl border border-[#C6DFC9] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#184A2C] text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#E5A83B]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#184A2C] uppercase tracking-wider block">
                Estimated Delivery
              </span>
              <p className="text-sm font-bold text-[#182620]">
                {order.estimatedDelivery}
              </p>
              <p className="text-xs text-[#52645B]">
                Insulated cold bag delivery to {order.customerDetails.area}, Pune
              </p>
            </div>
          </div>

          {/* Live Order Timeline */}
          <div>
            <h4 className="text-xs font-bold text-[#182620] uppercase tracking-wider mb-3">
              Order Dispatch Status
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="space-y-1">
                <div className="w-7 h-7 rounded-full bg-[#184A2C] text-white flex items-center justify-center mx-auto font-bold text-xs">
                  ✓
                </div>
                <span className="font-bold text-[#184A2C] block">Confirmed</span>
                <span className="text-[9px] text-[#718279]">Recorded in Pune Hub</span>
              </div>

              <div className="space-y-1">
                <div className="w-7 h-7 rounded-full bg-[#E5A83B] text-[#183622] flex items-center justify-center mx-auto font-bold text-xs animate-pulse">
                  2
                </div>
                <span className="font-bold text-[#182620] block">Farm Packing</span>
                <span className="text-[9px] text-[#718279]">Milked &amp; Chilled 3°C</span>
              </div>

              <div className="space-y-1 opacity-60">
                <div className="w-7 h-7 rounded-full bg-[#E8E2D8] text-[#718279] flex items-center justify-center mx-auto font-bold text-xs">
                  3
                </div>
                <span className="font-bold text-[#718279] block">Out for Delivery</span>
                <span className="text-[9px] text-[#718279]">Cold Van Dispatch</span>
              </div>

              <div className="space-y-1 opacity-60">
                <div className="w-7 h-7 rounded-full bg-[#E8E2D8] text-[#718279] flex items-center justify-center mx-auto font-bold text-xs">
                  4
                </div>
                <span className="font-bold text-[#718279] block">Delivered</span>
                <span className="text-[9px] text-[#718279]">Doorstep Handover</span>
              </div>
            </div>
          </div>

          {/* Items & Address Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Delivery address */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#182620]">
                <MapPin className="w-3.5 h-3.5 text-[#E5A83B]" />
                <span>Shipping Address</span>
              </div>
              <p className="font-semibold text-[#182620]">{order.customerDetails.fullName}</p>
              <p className="text-[#617369]">{order.customerDetails.flat}, {order.customerDetails.street}</p>
              <p className="text-[#617369]">{order.customerDetails.area}, Pune - {order.customerDetails.pincode}</p>
              <p className="text-[#617369]">Phone: +91 {order.customerDetails.mobile}</p>
            </div>

            {/* Payment & Total */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#182620]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D46]" />
                <span>Payment Details</span>
              </div>
              <p className="text-[#617369]">
                Method: <strong className="text-[#182620] uppercase">{order.customerDetails.paymentMethod}</strong>
              </p>
              <p className="text-[#617369]">
                Subtotal: ₹{order.subtotal}
              </p>
              {order.discount > 0 && (
                <p className="text-[#2E7D46] font-semibold">
                  Coupon Savings: -₹{order.discount}
                </p>
              )}
              <p className="font-bold text-[#184A2C] text-sm pt-1 border-t border-[#E8E1D5]">
                Amount Paid: ₹{order.total}
              </p>
            </div>

          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onContinueShopping}
              className="flex-1 py-3 rounded-xl bg-[#184A2C] hover:bg-[#123922] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Continue Dairy Shopping</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[#D5CCC0] hover:bg-[#FAF7F2] text-[#182620] text-xs font-bold transition-colors"
            >
              Close Receipt
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
