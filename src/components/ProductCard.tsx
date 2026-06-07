import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, MessageCircle, Info, Bookmark, BookmarkCheck, PhoneCall } from 'lucide-react';
import { JewelleryItem } from '../types';
import { DEALER_INFO } from '../data';

interface ProductCardProps {
  key?: string;
  item: JewelleryItem;
  onInquireClick: (item: JewelleryItem) => void;
  onAddToBag: (item: JewelleryItem) => void;
  isInBag: boolean;
}

export default function ProductCard({ item, onInquireClick, onAddToBag, isInBag }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Prefilled WhatsApp link specific to this jewelry piece
  const generateWhatsAppLink = (item: JewelleryItem) => {
    const text = `Hello Shyam Jewellers, I am interested in inquiring about:
- *Item:* ${item.name}
- *SKU:* ${item.sku}
- *Metal/Purity:* ${item.metal} (${item.purity})
- *Weight/Size:* ${item.weight}
- *Estimate Range:* ${item.priceEstimate || 'N/A'}

Please let me know the availability and current custom pricing for today's gold rate. Thank you!`;
    
    return `${DEALER_INFO.whatsappDirectLink}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="bg-white rounded-none border border-[#1A1A1A]/10 shadow-none overflow-hidden flex flex-col hover:border-[#1A1A1A]/30 transition-all duration-300 transform font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Relative Image Display Box */}
      <div ref={imageContainerRef} className="relative aspect-[4/3] w-full bg-[#FAF8F5] overflow-hidden select-none border-b border-[#1A1A1A]/10">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {item.isNewArrival && (
            <span className="bg-[#1A1A1A] text-[#F9F7F2] text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-none shadow-xs">
              NEW ARRIVAL
            </span>
          )}
          {item.isTrending && (
            <span className="bg-[#D4AF37] text-white text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-none shadow-xs flex items-center">
              <Sparkles size={12} className="mr-1 fill-white" />
              TRENDING
            </span>
          )}
        </div>

        {/* Metal Tag Badge, e.g., Gold 22K */}
        <span className="absolute bottom-3 right-3 z-10 bg-[#FAF8F5] text-[#1A1A1A] font-serif font-extrabold text-xs tracking-wide px-3 py-1.5 rounded-none border border-[#1A1A1A]/20 shadow-xs">
          {item.metal} ({item.purity.split(' ')[0]})
        </span>

        {/* Realistic image rendering with Parallax */}
        <motion.div
          style={{ y, height: '130%', top: '-15%' }}
          className="absolute inset-0 w-full"
        >
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Image overlay with prompt info or quick action */}
        <div
          className={`absolute inset-0 bg-[#1A1A1A]/5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Card Contents Area */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & SKU row */}
        <div className="flex items-center justify-between mb-2 select-none">
          <span className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase">
            {item.category}
          </span>
          <span className="font-mono text-[11px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded-none border border-[#1A1A1A]/10 uppercase">
            {item.sku}
          </span>
        </div>

        {/* Jewelry Title */}
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] tracking-normal line-clamp-2 mb-2 leading-snug">
          {item.name}
        </h3>

        {/* Item short description */}
        <p className="text-sm text-stone-500 leading-relaxed font-normal flex-1 line-clamp-3 mb-5">
          {item.description}
        </p>

        {/* Metal/Specs summary table */}
        <div className="grid grid-cols-2 gap-2 py-3 px-3 bg-[#FAF8F5] rounded-none border border-[#1A1A1A]/10 text-xs mb-5 select-none">
          <div>
            <span className="text-stone-400 block font-normal">Metal & Purity</span>
            <span className="text-[#1A1A1A] font-bold block truncate">{item.purity}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-normal">Weight Indicator</span>
            <span className="text-[#1A1A1A] font-bold block truncate">{item.weight}</span>
          </div>
        </div>

        {/* Indicative Estimate Range Row */}
        {item.priceEstimate && (
          <div className="mb-5 flex items-baseline justify-between select-none">
            <span className="text-[11px] text-stone-400 font-normal uppercase">Indicative Range:</span>
            <span className="font-serif text-lg font-bold text-[#D4AF37]">
              {item.priceEstimate}
            </span>
          </div>
        )}

        {/* Bottom CTA Actions */}
        <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/10 text-xs">
          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Quick Digital Inquiry Form trigger */}
            <button
              onClick={() => onInquireClick(item)}
              className="flex items-center justify-center space-x-1 py-2.5 px-2 border border-[#1A1A1A] text-[#1A1A1A] font-bold tracking-widest rounded-none hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer text-[11px]"
            >
              <Info size={14} />
              <span>CUSTOM SPEC</span>
            </button>

            {/* Direct WhatsApp Action Button */}
            <a
              href={generateWhatsAppLink(item)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-1 py-2.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold tracking-widest rounded-none transition-all text-[11px] shadow-none"
            >
              <MessageCircle size={14} className="fill-white/20" />
              <span>WHATSAPP</span>
            </a>
          </div>

          {/* Inquiry Bag Add Indicator */}
          <button
            onClick={() => onAddToBag(item)}
            className={`w-full mt-3 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-none text-xs font-bold tracking-widest uppercase transition-all border ${
              isInBag
                ? 'bg-[#F9F7F2] text-[#D4AF37] border-[#D4AF37]'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
            }`}
          >
            {isInBag ? (
              <>
                <BookmarkCheck size={14} className="text-[#D4AF37]" />
                <span>ADDED TO INQUIRY BAG</span>
              </>
            ) : (
              <>
                <Bookmark size={14} className="text-stone-500" />
                <span>ADD TO INQUIRY BAG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
