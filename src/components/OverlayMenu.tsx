import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
  onMetalSelect: (metal: string) => void;
  selectedCategory: string;
}

export default function OverlayMenu({
  isOpen,
  onClose,
  onCategorySelect,
  onMetalSelect,
  selectedCategory
}: OverlayMenuProps) {
  
  const productCategories = [
    { label: 'All Collections', value: 'All' },
    { label: 'Rings', value: 'Rings' },
    { label: 'Necklaces', value: 'Necklaces' },
    { label: 'Earrings', value: 'Earrings' },
    { label: 'Bracelets', value: 'Bracelets' },
    { label: 'Chrono Watches', value: 'Watches' }
  ];

  const collections = [
    { label: 'Women\'s High Jewelry', metal: 'All', value: 'All' },
    { label: 'Men\'s Royal Bands', metal: 'All', value: 'Rings' },
    { label: 'Lab-Grown Solitaires', metal: 'Diamond', value: 'All' },
    { label: 'Bespoke Engagement', metal: 'All', value: 'Rings' },
    { label: 'Heritage Chokers', metal: 'Gold', value: 'Necklaces' },
    { label: 'Kalyana Wedding Sets', metal: 'Gold', value: 'All' }
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
          {/* Header area of overlay */}
          <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-[#1A1A1A]/10">
            <div className="text-left select-none invisible">
              {/* Spacer to balance the close button */}
              <span className="text-xs font-bold tracking-widest uppercase">CLOSE</span>
            </div>
            
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
              
              {/* Column 1: Product Categories */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  Product Categories
                </h3>
                <ul className="space-y-4">
                  {productCategories.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <button
                        onClick={() => {
                          onCategorySelect(item.value);
                          onMetalSelect('All');
                          onClose();
                        }}
                        className="text-2xl md:text-3xl font-serif text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group flex items-center"
                      >
                        {item.label}
                        <ChevronRight size={20} className="ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2: Collections */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8">
                  Collections
                </h3>
                <ul className="space-y-4">
                  {collections.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <button
                        onClick={() => {
                          onCategorySelect(item.value);
                          onMetalSelect(item.metal);
                          onClose();
                        }}
                        className="text-2xl md:text-3xl font-serif text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group flex items-center"
                      >
                        {item.label}
                        <ChevronRight size={20} className="ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 3 & 4: Featured Image Card */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-8 md:hidden lg:block">
                  Featured
                </h3>
                <div className="group block bg-white p-6 border border-[#1A1A1A]/10 rounded-sm shadow-md hover:shadow-xl cursor-pointer transition-all duration-300" onClick={() => {
                  onCategorySelect('Necklaces');
                  onClose();
                }}>
                  <div className="overflow-hidden mb-6 aspect-[4/3] relative bg-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800" 
                      alt="Featured Heritage Choker" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h4 className="font-serif text-xl font-bold uppercase tracking-widest text-[#1A1A1A] mb-3">
                    The Royal Heritage Choker
                  </h4>
                  <p className="text-sm text-stone-500 leading-relaxed mb-6">
                    A signature piece that has become a statement. Designed for a bold appearance with timeless characteristics and pristine 22K gold.
                  </p>
                  <button className="border border-[#1A1A1A] py-3 px-6 text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors w-full md:w-auto">
                    Discover The Legacy
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Bottom Row / Extra Links */}
            <motion.div 
              className="mt-16 pt-8 border-t border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6">
                  House of Shyam
                </h3>
                <ul className="space-y-3 text-sm font-semibold text-stone-600">
                  <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Brand Legacy</li>
                  <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Craftsmanship</li>
                  <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Bespoke Services</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 invisible">
                  Connect
                </h3>
                <ul className="space-y-3 text-sm font-semibold text-stone-600">
                  <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Showroom Appointments</li>
                  <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Contact Us</li>
                </ul>
              </div>

              <div className="lg:col-span-2 flex items-end justify-start lg:justify-end text-sm font-semibold text-stone-500">
                T. +91 98765 43210
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
