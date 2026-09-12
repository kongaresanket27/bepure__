import React, { useState } from 'react';
import { CartItem, CheckoutFormData, PlacedOrder } from '../types';
import { PUNE_AREAS, DELIVERY_SLOTS } from '../data/dairyProducts';
import { X, Check, MapPin, Clock, CreditCard, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  selectedPuneArea: string;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  selectedPuneArea,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Rahul Deshmukh',
    mobile: '9822014589',
    flat: 'Flat 402, Rohan Viti',
    street: 'Baner-Pashan Link Road',
    area: selectedPuneArea || 'Baner',
    pincode: '411045',
    city: 'Pune',
    deliverySlot: 'morning',
    paymentMethod: 'upi',
    upiId: 'rahul@okhdfcbank',
    deliveryInstructions: 'Ring bell or leave in doorstep milk bag',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your name';
    if (!formData.mobile.trim() || formData.mobile.length < 10) errors.mobile = 'Enter a valid 10-digit mobile number';
    if (!formData.flat.trim()) errors.flat = 'Enter Flat / House number';
    if (!formData.street.trim()) errors.street = 'Enter Street / Society name';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = 'Enter 6-digit Pune pincode';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `BP-${Math.floor(100000 + Math.random() * 900000)}`;
      const slotObj = DELIVERY_SLOTS.find(s => s.id === formData.deliverySlot);
      const estimatedDelivery = `Tomorrow ${slotObj ? slotObj.timeRange : '6:00 AM – 9:00 AM'}`;

      const newOrder: PlacedOrder = {
        orderId,
        orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items,
        subtotal,
        discount,
        deliveryFee,
        total,
        customerDetails: formData,
        estimatedDelivery,
        status: 'Confirmed',
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#F0EBE2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-xl font-bold text-[#182620]">
              Checkout &amp; Delivery
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#184A2C] bg-[#E8F3EB] px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D46]" />
              <span>100% Safe &amp; Direct Farm Fresh</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D8] text-[#718279] hover:text-[#182620] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tracker */}
        <div className="px-6 py-3 bg-white border-b border-[#F0EBE2] flex items-center justify-between text-xs">
          {[
            { num: 1, label: 'Delivery Address' },
            { num: 2, label: 'Delivery Slot' },
            { num: 3, label: 'Payment Method' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= s.num ? 'bg-[#184A2C] text-white' : 'bg-[#EAE4D9] text-[#718279]'
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`font-semibold hidden sm:inline ${
                step === s.num ? 'text-[#184A2C]' : 'text-[#718279]'
              }`}>
                {s.label}
              </span>
              {idx < 2 && <span className="text-[#D8D0C3] mx-1 sm:mx-3">→</span>}
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="overflow-y-auto p-6 sm:p-7 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Delivery Address */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE2]">
                    <h3 className="font-serif text-lg font-bold text-[#182620]">
                      Pune Delivery Address
                    </h3>
                    <span className="text-xs text-[#2E7D46] font-semibold">Step 1 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                        placeholder="e.g. Rahul Deshmukh"
                      />
                      {formErrors.fullName && (
                        <p className="text-[10px] text-[#D9534F] mt-0.5">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Mobile Number * (For delivery SMS)
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-[#D5CCC0] bg-[#FAF7F2] text-xs font-semibold text-[#617369]">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-r-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                          placeholder="98XXXXXXXX"
                          maxLength={10}
                        />
                      </div>
                      {formErrors.mobile && (
                        <p className="text-[10px] text-[#D9534F] mt-0.5">{formErrors.mobile}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Flat / House / Wing No. *
                      </label>
                      <input
                        type="text"
                        value={formData.flat}
                        onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                        placeholder="e.g. Flat 402, Building A"
                      />
                      {formErrors.flat && (
                        <p className="text-[10px] text-[#D9534F] mt-0.5">{formErrors.flat}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Street / Society Name *
                      </label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                        placeholder="e.g. Rohan Viti, Baner Link Road"
                      />
                      {formErrors.street && (
                        <p className="text-[10px] text-[#D9534F] mt-0.5">{formErrors.street}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Pune Locality *
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] bg-white focus:border-[#184A2C] focus:outline-none"
                      >
                        {PUNE_AREAS.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Pune, MH"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] bg-[#FAF7F2] text-[#55665D] font-medium"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-bold text-[#182620] mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                        placeholder="411045"
                        maxLength={6}
                      />
                      {formErrors.pincode && (
                        <p className="text-[10px] text-[#D9534F] mt-0.5">{formErrors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#182620] mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryInstructions}
                      onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D5CCC0] focus:border-[#184A2C] focus:outline-none"
                      placeholder="e.g. Ring doorbell, or leave inside doorstep cooler bag"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery Slot Selection */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE2]">
                    <h3 className="font-serif text-lg font-bold text-[#182620]">
                      Select Delivery Slot for Pune
                    </h3>
                    <span className="text-xs text-[#2E7D46] font-semibold">Step 2 of 3</span>
                  </div>

                  <p className="text-xs text-[#5C6E64]">
                    Our temperature-controlled cold vans make three daily rounds across Pune. 
                    Morning slots are dispatched within 12 hours of evening milking.
                  </p>

                  <div className="space-y-3">
                    {DELIVERY_SLOTS.map((slot) => {
                      const isSelected = formData.deliverySlot === slot.id;

                      return (
                        <button
                          key={slot.id}
                          onClick={() => setFormData({ ...formData, deliverySlot: slot.id })}
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-[#184A2C] bg-[#E8F3EB] ring-2 ring-[#184A2C]/10'
                              : 'border-[#E2DDD2] bg-white hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mt-0.5 ${
                              isSelected ? 'bg-[#184A2C] text-white' : 'bg-[#FAF7F2] text-[#718279]'
                            }`}>
                              <Clock className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-[#182620]">
                                  {slot.title}
                                </h4>
                                <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-[#184A2C] border border-[#D5CCC0]">
                                  {slot.timeRange}
                                </span>
                              </div>
                              <p className="text-xs text-[#5C6E64] mt-1">
                                {slot.description}
                              </p>
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#184A2C] bg-[#184A2C]' : 'border-[#C2B8AA]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Payment Method */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE2]">
                    <h3 className="font-serif text-lg font-bold text-[#182620]">
                      Select Payment Method
                    </h3>
                    <span className="text-xs text-[#2E7D46] font-semibold">Step 3 of 3</span>
                  </div>

                  <div className="space-y-3">
                    {/* UPI Option */}
                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        formData.paymentMethod === 'upi'
                          ? 'border-[#184A2C] bg-[#E8F3EB] ring-2 ring-[#184A2C]/10'
                          : 'border-[#E2DDD2] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#182620]">
                            UPI (Google Pay, PhonePe, Paytm, BHIM)
                          </span>
                          <span className="bg-[#2E7D46] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Fastest
                          </span>
                        </div>
                        <p className="text-xs text-[#5C6E64]">
                          Instant payment with zero transaction fee.
                        </p>
                        {formData.paymentMethod === 'upi' && (
                          <div className="pt-2 flex items-center gap-2">
                            <input
                              type="text"
                              value={formData.upiId}
                              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                              placeholder="yourname@okhdfcbank"
                              className="text-xs p-2 rounded-lg border border-[#D5CCC0] bg-white"
                            />
                            <span className="text-[11px] text-[#2E7D46] font-bold">QR / UPI Verified</span>
                          </div>
                        )}
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.paymentMethod === 'upi' ? 'border-[#184A2C] bg-[#184A2C]' : 'border-[#C2B8AA]'
                      }`}>
                        {formData.paymentMethod === 'upi' && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>

                    {/* Card Option */}
                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#184A2C] bg-[#E8F3EB] ring-2 ring-[#184A2C]/10'
                          : 'border-[#E2DDD2] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm text-[#182620] block">
                          Credit / Debit Card / Netbanking
                        </span>
                        <p className="text-xs text-[#5C6E64] mt-0.5">
                          Visa, Mastercard, RuPay, Amex accepted securely via Indian gateway.
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.paymentMethod === 'card' ? 'border-[#184A2C] bg-[#184A2C]' : 'border-[#C2B8AA]'
                      }`}>
                        {formData.paymentMethod === 'card' && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>

                    {/* COD Option */}
                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#184A2C] bg-[#E8F3EB] ring-2 ring-[#184A2C]/10'
                          : 'border-[#E2DDD2] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm text-[#182620] block">
                          Cash on Delivery / Doorstep UPI
                        </span>
                        <p className="text-xs text-[#5C6E64] mt-0.5">
                          Pay by cash or scan delivery agent’s QR code when cold bag arrives.
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.paymentMethod === 'cod' ? 'border-[#184A2C] bg-[#184A2C]' : 'border-[#C2B8AA]'
                      }`}>
                        {formData.paymentMethod === 'cod' && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE2]">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((step - 1) as any)}
                    className="px-4 py-2 text-xs font-bold text-[#184A2C] hover:bg-[#FAF7F2] rounded-xl flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-[#184A2C] hover:bg-[#123922] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl bg-[#2E7D46] hover:bg-[#236337] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md active:scale-98 disabled:opacity-50"
                    id="place-order-final-btn"
                  >
                    {isSubmitting ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Place Order • ₹{total}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

            {/* Right Side: Order Summary Card */}
            <div className="lg:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#182620] pb-2 border-b border-[#E8E1D5]">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#EBE4D8]">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E0D8CB] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#182620] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#63756A]">
                        {item.quantity} × {item.variant.size}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#184A2C]">
                      ₹{item.variant.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-1.5 pt-3 border-t border-[#E8E1D5] text-xs text-[#5C6E64]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#182620]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D46] font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pune Doorstep Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#2E7D46] font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8E1D5] text-sm font-bold text-[#182620]">
                  <span>Total Due</span>
                  <span className="text-base text-[#184A2C]">₹{total}</span>
                </div>
              </div>

              {/* Delivery destination preview */}
              <div className="bg-white p-3 rounded-xl border border-[#E0D7C8] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#184A2C] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A83B]" />
                  <span>Delivering to {formData.area}, Pune</span>
                </div>
                <p className="text-[11px] text-[#617369] pl-5">
                  {formData.flat}, {formData.street} ({formData.pincode})
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
