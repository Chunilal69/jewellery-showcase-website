import React, { useState, useEffect } from 'react';
import { CATALOG } from '../data';
import { JewelleryItem } from '../types';
import Reveal from './Reveal';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { Star, ChevronLeft, ChevronRight, Sparkles, Info, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onInquireClick: (item: JewelleryItem) => void;
  onAddToBag: (item: JewelleryItem) => void;
  itemsInBag: JewelleryItem[];
  setSelectedCategory: (category: string) => void;
  setSelectedMetal: (metal: string) => void;
  onImageClick: (imageSrc: string) => void;
}

export default function Hero({
  onInquireClick,
  onAddToBag,
  itemsInBag,
  setSelectedCategory,
  setSelectedMetal,
  onImageClick
}: HeroProps) {
  // Get all featured items
  const featuredItems = CATALOG.filter(item => item.isFeatured);
  
  // State for active slide index in featured items showcase
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-play the featured slideshow
  useEffect(() => {
    if (featuredItems.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuredItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % featuredItems.length);
  };

  const activeItem = featuredItems[activeIdx];

  const isInBag = activeItem ? itemsInBag.some(i => i.id === activeItem.id) : false;

  return (
    <section className="relative overflow-hidden w-full select-none border-b border-[#1A1A1A]/5 bg-[#FAF7F2]">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200&blur=8"
          alt="Aesthetic Background Blur"
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Brand Chronicle & Navigation */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <Reveal delay={0.1} direction="down">
            <div className="inline-flex items-center space-x-2 border border-[#1A1A1A]/10 bg-transparent px-4 py-1.5 rounded-none text-[9px] tracking-[4px] text-[#1A1A1A] font-extrabold uppercase shadow-none">
              <Star size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
              <span>PRESTIGIOUS HEIRLOOM SHOWCASE</span>
              <Star size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
            </div>
          </Reveal>

          <div className="space-y-4">
            <TextReveal 
              delay={0.2} 
              text="Legacy of Absolute Purity & Exquisite Craftsmanship"
              className="font-serif text-3xl md:text-5xl lg:text-5xl xl:text-6xl text-stone-900 font-extrabold leading-[1.15] tracking-tight max-w-2xl"
            />
            <Reveal delay={0.4}>
              <p className="text-xs md:text-sm text-stone-600 font-normal tracking-wide max-w-xl leading-relaxed">
                Step into an exclusive world of certified 22 Karat gold ornaments and pristine sterling silver collections. Handcoded with precision matching standard Hallmarking parameters.
              </p>
            </Reveal>
          </div>

          {/* Quick Categories Navigation */}
          <Reveal delay={0.6}>
            <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-bold tracking-widest uppercase">
              <MagneticButton>
                <button
                  onClick={() => {
                    setSelectedCategory('Necklaces');
                    setSelectedMetal('All');
                    // Scroll to products grid
                    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer py-3.5 px-6 bg-[#1A1A1A] hover:bg-black text-[#FAF7F2] rounded-none shadow-none transition-all"
                >
                  EXPLORE ROYAL CHOKERS
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => {
                    setSelectedCategory('Bracelets');
                    setSelectedMetal('All');
                    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer py-3.5 px-6 bg-white hover:bg-stone-50 text-[#1A1A1A] border border-[#1A1A1A] rounded-none transition-all"
                >
                  BESPOKE BANGLES
                </button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Featured Products Highlights Slider */}
        <div className="lg:col-span-5 flex justify-center w-full">
          {activeItem && (
            <Reveal delay={0.3} direction="up" width="100%">
              <div className="relative w-full max-w-md bg-white border border-[#1A1A1A]/10 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col group/slider">
                
                {/* Header info */}
                <div className="flex items-center justify-between mb-3 border-b border-[#1A1A1A]/5 pb-2.5">
                  <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-[#D4AF37] flex items-center">
                    <Sparkles size={11} className="mr-1 fill-[#D4AF37]" />
                    Featured Highlight
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-stone-400 bg-stone-50 px-2 py-0.5 border border-[#1A1A1A]/5">
                    {activeIdx + 1} / {featuredItems.length}
                  </span>
                </div>

                {/* Sliding product image */}
                <div 
                  onClick={() => onImageClick && onImageClick(activeItem.image)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50 border border-[#1A1A1A]/5 cursor-zoom-in"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.image}
                      alt={activeItem.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </AnimatePresence>
                  
                  {/* Metal specs badge */}
                  <div className="absolute bottom-3 right-3 z-10 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1A1A1A] font-serif font-black text-[10px] tracking-wider px-2.5 py-1 border border-[#1A1A1A]/10">
                    {activeItem.metal} ({activeItem.purity.split(' ')[0]})
                  </div>
                </div>

                {/* Slider Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug line-clamp-1">
                      {activeItem.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Micro Specs Table */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/5 text-[11px]">
                    <div>
                      <span className="text-stone-400 block">Weight</span>
                      <span className="text-[#1A1A1A] font-bold block truncate">{activeItem.weight}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Est. Range</span>
                      <span className="text-[#D4AF37] font-bold block truncate">{activeItem.priceEstimate}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]/5 text-[10px] font-bold tracking-widest uppercase">
                    <button
                      onClick={() => onInquireClick(activeItem)}
                      className="flex items-center justify-center space-x-1.5 py-2 px-1 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                    >
                      <Info size={12} />
                      <span>CUSTOM SPEC</span>
                    </button>
                    <button
                      onClick={() => onAddToBag(activeItem)}
                      className={`flex items-center justify-center space-x-1.5 py-2 px-1 border transition-colors cursor-pointer ${
                        isInBag 
                          ? 'bg-[#F9F7F2] text-[#D4AF37] border-[#D4AF37]' 
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                      }`}
                    >
                      <ShoppingBag size={12} />
                      <span>{isInBag ? 'ADDED' : 'ADD TO BAG'}</span>
                    </button>
                  </div>
                </div>

                {/* Arrow Controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs border border-[#1A1A1A]/10 flex items-center justify-center text-stone-600 hover:text-stone-900 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer z-20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs border border-[#1A1A1A]/10 flex items-center justify-center text-stone-600 hover:text-stone-900 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer z-20"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>

              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
