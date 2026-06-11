export interface JewelleryItem {
  id: string;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Chains' | 'Bracelets' | 'Mangalsutra' | 'Pendants' | 'Nath';
  sku: string;
  description: string;
  image: string;
  metal: 'Gold' | 'Silver';
  purity: string; // e.g., "22K, 916", "925 Sterling"
  weight: string; // e.g., "12.5 grams"
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  priceEstimate?: string; // e.g., "₹45,000 - ₹50,000" or similar
}

export interface Inquiry {
  id: string;
  items: JewelleryItem[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Responded' | 'Completed';
}

export interface MetalRate {
  metal: string;
  purity: string;
  ratePerGram: number;
  change: string; // e.g. "+₹50"
  isUp: boolean;
}
