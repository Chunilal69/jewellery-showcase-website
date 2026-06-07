import React, { useState } from 'react';
import { Search, ShoppingBag, Phone, MapPin, Sparkles, Menu, X, Heart, Clock, Check } from 'lucide-react';
import { JewelleryItem } from '../types';
import { DEALER_INFO } from '../data';
import OverlayMenu from './OverlayMenu';

interface HeaderProps {
  onSearchChange: (searchQuery: string) => void;
  onCategorySelect: (category: any) => void;
  selectedCategory: string;
  onMetalSelect: (metal: any) => void;
  selectedMetal: string;
  bagCount: number;
  onBagClick: () => void;
  onGoToAbout: () => void;
  onGoToHome: () => void;
}

export default function Header({
  onSearchChange,
  onCategorySelect,
  selectedCategory,
  onMetalSelect,
  selectedMetal,
  bagCount,
  onBagClick,
  onGoToAbout,
  onGoToHome,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const MOST_SEARCHED_ITEMS = [
    'Rajputana Heritage Kundan Choker',
    'The Solitaire Grace',
    'Mayur Mandir Temple Jhumkas',
    'Solitaire Diamond Cascade Choker',
    'Royal Ganga-Jamuni Ruby Kada'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
    setIsFocused(false);
    setIsHovered(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchChange(searchValue);
      setIsFocused(false);
      setIsHovered(false);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearchChange('');
    setIsFocused(false);
    setIsHovered(false);
  };

  const handleSuggestionClick = (term: string) => {
    setSearchValue(term);
    onSearchChange(term);
    setIsFocused(false);
    setIsHovered(false);
  };

  return (
    <header className="w-full bg-[#F9F7F2] border-b border-[#1A1A1A]/10 text-[#1A1A1A] sticky top-0 z-50 shadow-none font-sans">
      {/* Upper Utility Bar */}
      <div className="w-full bg-[#1A1A1A] text-[#F9F7F2]/90 text-[11px] md:text-xs font-normal tracking-[0.2em] uppercase py-2.5 px-6 flex flex-col md:flex-row justify-between items-center space-y-1.5 md:space-y-0 select-none">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Sparkles size={11} className="mr-1.5 text-[#D4AF37] fill-[#D4AF37]" />
            100% BIS Hallmarked Pure Gold & Certified Diamonds
          </span>
          <span className="hidden lg:inline flex items-center text-[#F9F7F2]/60">
            <Clock size={11} className="mr-1.5" />
            {DEALER_INFO.timing}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <a
            href={DEALER_INFO.whatsappDirectLink}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center"
          >
            <Phone size={11} className="mr-1.5" />
            WhatsApp Inquiry Tracker
          </a>
          <span className="flex items-center text-[#F9F7F2]/60">
            <MapPin size={11} className="mr-1.5" />
            Shastri Nagar Experience Lounge
          </span>
        </div>
      </div>

      {/* Main Luxury Row */}
      <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Left Side: Menu Trigger & Search */}
        <div className="flex items-center space-x-4 md:space-x-8 flex-1">
          {/* Global menu trigger */}
          <button
            onClick={() => setIsOverlayMenuOpen(true)}
            className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors p-1 flex items-center space-x-2"
            aria-label="Open Menu"
          >
            <Menu size={28} strokeWidth={1.5} />
            <span className="text-xs tracking-widest font-bold uppercase hidden md:inline pt-1">MENU</span>
          </button>

          {/* Unified Responsive Animated Search */}
          <div
            className={`relative ${
              isHovered || isFocused || searchValue !== '' ? 'w-44 md:w-64 lg:w-72' : 'w-9 md:w-10'
            }`}
            style={{ transition: 'all 600ms cubic-bezier(0.76, 0, 0.24, 1)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full h-9 md:h-10 flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setTimeout(() => setIsFocused(false), 200);
                }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className={`w-full h-9 md:h-10 text-xs pl-3 md:pl-4 bg-white border text-[#1A1A1A] rounded-full focus:outline-none font-medium tracking-wide ${
                  isHovered || isFocused || searchValue !== ''
                    ? 'opacity-100 pr-12 md:pr-16 border-[#D4AF37] shadow-xs'
                    : 'opacity-0 pr-3 md:pr-4 border-transparent pointer-events-none'
                }`}
                style={{ transition: 'all 600ms cubic-bezier(0.76, 0, 0.24, 1)' }}
              />
              
              {(isHovered || isFocused || searchValue !== '') && searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-8 md:right-10 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}

              <button
                type="submit"
                className={`absolute flex items-center justify-center cursor-pointer ${
                  isHovered || isFocused || searchValue !== ''
                    ? 'right-2.5 md:right-3 w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A] hover:text-[#D4AF37]'
                    : 'right-0 w-9 h-9 md:w-10 md:h-10 border border-[#1A1A1A]/10 bg-transparent rounded-full text-[#1A1A1A] hover:border-[#D4AF37] hover:bg-[#1A1A1A]/5'
                }`}
                style={{ transition: 'all 600ms cubic-bezier(0.76, 0, 0.24, 1)' }}
              >
                <Search size={isHovered || isFocused || searchValue !== '' ? 15 : 18} strokeWidth={isHovered || isFocused || searchValue !== '' ? 2 : 1.5} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            <div
              className="absolute top-11 md:top-12 left-0 w-60 md:w-full bg-[#F9F7F2] border border-[#1A1A1A]/10 shadow-lg rounded-xl p-3 md:p-4 z-50 pointer-events-none"
              style={{
                opacity: (isHovered || isFocused) && searchValue === '' ? 1 : 0,
                transform: (isHovered || isFocused) && searchValue === '' ? 'translateY(0)' : 'translateY(-10px)',
                visibility: (isHovered || isFocused) && searchValue === '' ? 'visible' : 'hidden',
                pointerEvents: (isHovered || isFocused) && searchValue === '' ? 'auto' : 'none',
                transition: (isHovered || isFocused) && searchValue === ''
                  ? 'opacity 500ms cubic-bezier(0.76, 0, 0.24, 1) 550ms, transform 500ms cubic-bezier(0.76, 0, 0.24, 1) 550ms, visibility 500ms 550ms'
                  : 'opacity 200ms cubic-bezier(0.76, 0, 0.24, 1) 0ms, transform 200ms cubic-bezier(0.76, 0, 0.24, 1) 0ms, visibility 200ms 0ms',
              }}
            >
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-stone-500 font-bold mb-2 md:mb-2.5">
                Most Searched
              </p>
              <div className="flex flex-col space-y-1 md:space-y-1.5">
                {MOST_SEARCHED_ITEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(item);
                    }}
                    className="flex items-center space-x-2 text-[11px] md:text-xs text-[#1A1A1A]/80 hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-150 py-1 text-left w-full font-medium"
                  >
                    <Search size={10} className="text-[#D4AF37]" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Dynamic Brand Logo */}
        <div className="cursor-pointer select-none text-center flex-1 flex flex-col items-center justify-center" onClick={onGoToHome}>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1A1A1A] leading-none">
            Shyam<br className="md:hidden"/> Jewellers
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] mt-1.5 font-sans opacity-60 hidden md:block">
            Shastri Nagar, Roorkee
          </p>
        </div>

        {/* Right Side: Interaction Buttons */}
        <div className="flex items-center justify-end space-x-6 flex-1">
          <button
            onClick={onGoToAbout}
            className="text-xs font-bold tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-all hidden lg:inline uppercase pt-1"
          >
            OUR LEGACY
          </button>

          {/* Inquiry Cart Action Button */}
          <button
            onClick={onBagClick}
            className="relative flex items-center justify-center p-2 rounded-none hover:bg-stone-100 text-[#1A1A1A] transition-colors group cursor-pointer"
            title="View Inquiries"
          >
            <ShoppingBag size={24} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
            {bagCount > 0 ? (
              <span className="absolute top-0 -right-1 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {bagCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <OverlayMenu
        isOpen={isOverlayMenuOpen}
        onClose={() => setIsOverlayMenuOpen(false)}
        onCategorySelect={onCategorySelect}
        onMetalSelect={onMetalSelect}
        selectedCategory={selectedCategory}
      />
    </header>
  );
}
