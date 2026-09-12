export type DairyCategory = 
  | 'all'
  | 'milk'
  | 'paneer'
  | 'ghee'
  | 'curd'
  | 'butter'
  | 'buttermilk';

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  inStock: boolean;
}

export interface DairyProduct {
  id: string;
  name: string;
  shortDescription: string;
  category: DairyCategory;
  categoryLabel: string;
  badge?: 'Best Seller' | 'Fresh Today' | 'Popular' | 'New' | 'Pure A2';
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  defaultVariantIndex: number;
  image: string;
  galleryImages: string[];
  description: string;
  farmSource: {
    farmName: string;
    location: string;
    milkingTime: string;
    breed: string;
  };
  qualityTesting: {
    fat: string;
    snf: string;
    labTested: string;
    adulterationFree: string;
  };
  nutritionalFacts: {
    servingSize: string;
    calories: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    calcium: string;
  };
  purityHighlights: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: DairyProduct;
  variant: ProductVariant;
  quantity: number;
  isSubscription?: boolean;
  frequency?: 'daily' | 'alternate' | 'weekly';
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountLabel: string;
  pillBadge: string;
  image: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  verifiedPurchase: boolean;
  reviewText: string;
  productName: string;
  date: string;
}

export interface DeliverySlot {
  id: 'morning' | 'afternoon' | 'evening';
  title: string;
  timeRange: string;
  description: string;
}

export interface CheckoutFormData {
  fullName: string;
  mobile: string;
  flat: string;
  street: string;
  area: string;
  pincode: string;
  city: string;
  deliverySlot: 'morning' | 'afternoon' | 'evening';
  paymentMethod: 'upi' | 'card' | 'cod';
  upiId?: string;
  deliveryInstructions?: string;
}

export interface PlacedOrder {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customerDetails: CheckoutFormData;
  estimatedDelivery: string;
  status: 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
}
