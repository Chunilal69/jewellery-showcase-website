import { JewelleryItem, MetalRate } from './types';

export const CATALOG: JewelleryItem[] = [
  {
    id: 'rhj-nck-001',
    name: 'Rajputana Heritage Kundan Choker',
    category: 'Necklaces',
    sku: 'RHJ-NCK-001',
    description: 'An exquisite hand-crafted kundan bridal choker. Standard setting inlaid with uncut diamonds (polki), bordered with certified south-sea drop pearls and matching royal green emerald beads. Designed specifically for the quintessential Indian wedding.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    metal: 'Kundan',
    purity: '22K Gold (916 Hallmark)',
    weight: '48.5 grams',
    isFeatured: true,
    isNewArrival: true,
    priceEstimate: '₹3,40,000 - ₹3,60,000'
  },
  {
    id: 'rhj-rng-001',
    name: 'The Solitaire Grace',
    category: 'Rings',
    sku: 'RHJ-RNG-001',
    description: 'A stellar brilliant-cut solitaire diamond ring featuring a clean GIA-certified diamond on an 18K rose gold comfort-fit band. A timeless choice for engagements, representing everlasting devotion.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    metal: 'Diamond',
    purity: '18K Rose Gold & VVS1 Diamond',
    weight: '1.5 Carats (Diamond weight)',
    isFeatured: true,
    isTrending: true,
    priceEstimate: '₹1,85,000 - ₹2,10,000'
  },
  {
    id: 'rhj-ear-001',
    name: 'Mayur Mandir Temple Jhumkas',
    category: 'Earrings',
    sku: 'RHJ-EAR-001',
    description: 'Traditional temple style jhumkas representing intricate antique goldsmithing. Embellished with classic peacock (mayur) motifs, red rubies, and premium micro pearls dangling beautifully along the bottom tier.',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600',
    metal: 'Gold',
    purity: '22K Gold (916 Hallmark)',
    weight: '26.8 grams',
    isFeatured: true,
    isTrending: true,
    priceEstimate: '₹1,90,000 - ₹2,05,000'
  },
  {
    id: 'rhj-nck-002',
    name: 'Solitaire Diamond Cascade Choker',
    category: 'Necklaces',
    sku: 'RHJ-NCK-002',
    description: 'An elegant statement draping necklace studded with a cascade of brilliant-cut diamonds. Secured tightly in an invisible platinum setting. Features a secure customized fold-over clasp with safety mechanisms.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    metal: 'Diamond',
    purity: 'Platinum 950 & VVS-VS, EF Color',
    weight: '8.4 Carats Total',
    isNewArrival: true,
    priceEstimate: '₹6,20,000 - ₹6,80,000'
  },
  {
    id: 'rhj-brc-001',
    name: 'Royal Ganga-Jamuni Ruby Kada',
    category: 'Bracelets',
    sku: 'RHJ-BRC-001',
    description: 'A masterpiece dual-tone bangle with delicate hand-carved floral motifs. Beautifully interspersed with bright red Burmese rubies and highly radiant micro diamond borders. Complete with a secure screw lock mechanism.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    metal: 'Gold',
    purity: '22K Yellow & White Gold',
    weight: '34.2 grams',
    isTrending: true,
    priceEstimate: '₹2,50,000 - ₹2,70,000'
  },
  {
    id: 'rhj-rng-002',
    name: 'Vedic Emerald Cocktail Ring',
    category: 'Rings',
    sku: 'RHJ-RNG-002',
    description: 'A bold, classic cocktail ring highlighting a rich green emerald center of Zambian origin, flanked with step-cut baguette diamonds. A powerful design highlighting traditional values and prestige.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    metal: 'Rose Gold',
    purity: '18K Yellow Gold & Emerald',
    weight: '8.5 grams (3.2 Carat Emerald)',
    isFeatured: false,
    priceEstimate: '₹1,20,000 - ₹1,35,000'
  },
  {
    id: 'rhj-brc-002',
    name: 'Elysian Diamond Eternity Bangles',
    category: 'Bracelets',
    sku: 'RHJ-BRC-002',
    description: 'A stunning set of 3 matching slender diamond bangles. Perfect to wear individually or stacked. Features micro-set brilliant cut diamonds reflecting standard fire from all visible angles.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600',
    metal: 'Gold',
    purity: '18K Hallmark Yellow Gold',
    weight: '31.5 grams (4.2 Carat Diamonds)',
    isNewArrival: true,
    priceEstimate: '₹2,95,000 - ₹3,20,000'
  },
  {
    id: 'rhj-ear-002',
    name: 'Imperial Pearl Drop Chandbalis',
    category: 'Earrings',
    sku: 'RHJ-EAR-002',
    description: 'Chrescent moon-shaped heavy chandbali statement earrings. Elegantly crafted with micro-engraving, ruby inclusions, and stunning premium pearls. Guaranteed to create an elegant aura at any festive reception or occasion.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600',
    metal: 'Gold',
    purity: '22K Gold (916 Hallmark)',
    weight: '19.4 grams',
    isFeatured: false,
    priceEstimate: '₹1,38,000 - ₹1,48,000'
  }
];

export const METAL_RATES: MetalRate[] = [
  {
    metal: 'Gold (24 Karat)',
    purity: '99.9% Pure',
    ratePerGram: 7250,
    change: '+₹45',
    isUp: true
  },
  {
    metal: 'Gold (22 Karat)',
    purity: '91.6% Pure (Standard)',
    ratePerGram: 6646,
    change: '+₹41',
    isUp: true
  },
  {
    metal: 'Gold (18 Karat)',
    purity: '75.0% Pure',
    ratePerGram: 5438,
    change: '-₹18',
    isUp: false
  },
  {
    metal: 'Silver',
    purity: '99.0% Sterling',
    ratePerGram: 88,
    change: '+₹0.80',
    isUp: true
  }
];

export const DEALER_INFO = {
  name: 'Shyam Jewellers',
  headline: 'Legacy of Trust, Purity & Exquisite Artistry',
  tagline: 'Crafting royal moments in gold & diamonds',
  address: 'Shastri Nagar, Roorkee',
  whatsappNumber: '+918147349242',
  whatsappDirectLink: 'https://wa.me/918147349242',
  phone: '01332-272424',
  timing: '10:30 AM - 8:30 PM (Closed on Tuesdays)',
  hallmarkInfo: '100% BIS Hallmarked Jewellery. GIA & IGI Certified Diamonds.'
};
