import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { DEALER_INFO } from '../data';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
  onMetalSelect: (metal: string) => void;
  selectedCategory: string;
  onGoToAbout?: () => void;
  onGoToHome?: () => void;
}

export default function OverlayMenu({
  isOpen,
  onClose,
  onCategorySelect,
  onMetalSelect,
  selectedCategory,
  onGoToAbout,
  onGoToHome
}: OverlayMenuProps) {

  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const goldOrnaments = [
    { label: 'All Gold Ornaments', category: 'All' },
    { label: 'Gold Necklaces', category: 'Necklaces' },
    { label: 'Gold Earrings', category: 'Earrings' },
    { label: 'Gold Chains', category: 'Chains' },
    { label: 'Gold Bangles & Bracelets', category: 'Bracelets' },
    { label: 'Gold Rings', category: 'Rings' },
    { label: 'Gold Mangalsutra', category: 'Mangalsutra' },
    { label: 'Gold Pendants', category: 'Pendants' },
    { label: 'Garhwali Nath', category: 'Nath' }
  ];

  const silverOrnaments = [
    { label: 'All Silver Ornaments', category: 'All' },
    { label: 'Silver Necklaces', category: 'Necklaces' },
    { label: 'Silver Earrings', category: 'Earrings' },
    { label: 'Silver Chains', category: 'Chains' },
    { label: 'Silver Bangles & Bracelets', category: 'Bracelets' },
    { label: 'Silver Rings', category: 'Rings' }
  ];

  const houseLinks = [
    { label: 'Brand Legacy', action: 'about' },
    { label: 'Craftsmanship', action: 'about' },
    { label: 'Bespoke Services', action: 'about' },
    { label: 'Showroom Appointments', action: 'about' },
    { label: 'Contact Us', action: 'about' }
  ];

  // Staggered children variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans overflow-hidden"
          initial={{ x: '-100%', y: 0 }}
          animate={{ x: 0, y: 0 }}
          exit={{ x: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Coming Soon Overlay */}
          <AnimatePresence>
            {showComingSoon && (
              <motion.div
                className="fixed inset-0 z-[200] bg-[#1A1A1A]/85 backdrop-blur-sm flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowComingSoon(false)}
              >
                <motion.div
                  className="bg-[#FAF8F5] border border-[#D4AF37]/30 max-w-md w-full p-10 text-center space-y-6 relative"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#1A1A1A] flex items-center justify-center">
                      <Sparkles size={28} className="text-[#D4AF37]" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#D4AF37] uppercase block">
                        Sterling Silver Collection
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-wide uppercase">
                        Coming Soon
                      </h3>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                      Our exclusive sterling silver ornament collection is being carefully curated and will be available shortly. Stay tuned for exquisite silver pieces crafted with the same hallmark trust.
                    </p>
                    <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto" />
                  </div>

                  <button
                    onClick={() => setShowComingSoon(false)}
                    className="cursor-pointer py-3 px-8 bg-[#1A1A1A] hover:bg-black text-[#FAF7F2] font-bold text-xs tracking-widest uppercase transition-colors"
                  >
                    BACK TO MENU
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header area of overlay */}
          <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-[#1A1A1A]/10">
            <button 
              onClick={() => {
                if (onGoToHome) onGoToHome();
                onClose();
              }}
              className="text-left font-serif text-lg font-bold tracking-wider hover:text-[#D4AF37] transition-colors uppercase"
            >
              {DEALER_INFO.name.toUpperCase()}
            </button>
            
            <button 
              onClick={onClose}
              className="p-2 hover:text-[#D4AF37] transition-colors group flex items-center space-x-2"
            >
              <span className="text-xs font-bold tracking-widest uppercase hidden md:inline">CLOSE</span>
              <X size={28} className="group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.5} />
            </button>
          </div>

          {/* Main Structured Menu Content */}
          <div className="flex-1 overflow-y-auto w-full px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              
              {/* Column 1: Gold Ornaments */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  Gold Ornaments
                </h3>
                <ul className="space-y-4">
                  {goldOrnaments.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <button
                        onClick={() => {
                          onCategorySelect(item.category);
                          onMetalSelect('Gold');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          onClose();
                        }}
                        className="text-[20px] md:text-[22px] font-serif text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group flex items-center text-left"
                      >
                        {item.label}
                        <ChevronRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2: Silver Ornaments - Coming Soon */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  Silver Ornaments
                </h3>
                <ul className="space-y-4">
                  {silverOrnaments.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <button
                        onClick={() => setShowComingSoon(true)}
                        className="text-[20px] md:text-[22px] font-serif text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group flex items-center text-left"
                      >
                        {item.label}
                        <ChevronRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 3: House of Shyam */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  House of Swarn Ganga
                </h3>
                <ul className="space-y-4">
                  {houseLinks.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <button
                        onClick={() => {
                          if (onGoToAbout) onGoToAbout();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          onClose();
                        }}
                        className="text-[20px] md:text-[22px] font-serif text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group flex items-center text-left"
                      >
                        {item.label}
                        <ChevronRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 4: Featured Image Card */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  Featured
                </h3>
                <div className="group block bg-white p-5 border border-[#1A1A1A]/10 rounded-none shadow-md hover:shadow-xl cursor-pointer transition-all duration-300" onClick={() => {
                  onCategorySelect('Necklaces');
                  onMetalSelect('All');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}>
                  <div className="overflow-hidden mb-4 aspect-[4/3] relative bg-stone-100 border border-[#1A1A1A]/5">
                    <img 
                      src={`${import.meta.env.BASE_URL}catalog/necklaces-earrings/2ed68b5a-a473-4a4a-b1eb-f5190157eae5 (Edit with AI).webp`} 
                      alt="Featured Heritage Choker" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h4 className="font-serif text-base font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">
                    The Royal Heritage Choker
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    A signature piece. Designed for a bold appearance with timeless gold craftsmanship.
                  </p>
                  <button className="border border-[#1A1A1A] py-2 px-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors w-full md:w-auto cursor-pointer">
                    Discover Highlights
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Bottom Row / Extra Links */}
            <motion.div 
              className="mt-16 pt-8 border-t border-[#1A1A1A]/10 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div>
                © {new Date().getFullYear()} {DEALER_INFO.name}. Bhuchadi Fatak.
              </div>
              <div className="mt-4 md:mt-0 font-bold">
                Mob. +91 {DEALER_INFO.phone}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
