import React, { useRef, useEffect, useState } from 'react';
import { Mail, MapPin, Landmark, ShieldCheck, Heart, Award, ArrowRight, CornerRightDown } from 'lucide-react';
import { DEALER_INFO } from '../data';
import Logo from './Logo';

interface FooterProps {
  onCategorySelect?: (category: any) => void;
  onGoToAbout?: () => void;
  onGoToHome?: () => void;
}

export default function Footer({ onCategorySelect, onGoToAbout, onGoToHome }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (window.innerWidth >= 768) {
          setFooterHeight(entry.target.getBoundingClientRect().height);
        } else {
          setFooterHeight(0);
        }
      }
    });
    observer.observe(footerRef.current);
    
    const handleResize = () => {
      if (window.innerWidth < 768) setFooterHeight(0);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer className="relative w-full" style={{ height: footerHeight > 0 ? `${footerHeight}px` : 'auto' }}>
      <div 
        ref={footerRef}
        className="relative md:fixed bottom-0 left-0 w-full z-0 md:-z-10"
      >
        <div className="w-full bg-[#1A1A1A] text-[#F9F7F2] relative font-sans select-none pt-12 border-t-2 border-[#D4AF37]">
      <div className="w-full px-6 md:px-12 xl:px-24 mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
        
        {/* Leftmost Col - App Download & QR representing the precise Tanishq asset layout */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Custom Royal Logo and Tagline */}
          <div className="mb-4 cursor-pointer flex items-center space-x-3" onClick={onGoToHome}>
            <Logo size={46} />
            <div>
              <span className="font-serif text-xl tracking-widest text-[#D4AF37] font-black block leading-none">
                SWARN GANGA
              </span>
              <span className="font-serif text-[13px] tracking-widest text-[#D4AF37] font-black block mt-1 leading-none">
                JEWELLERS
              </span>
              <span className="text-[8px] text-[#F9F7F2]/45 tracking-[3px] block mt-1.5 uppercase">
                THE SHOWROOM
              </span>
            </div>
          </div>

          <p className="text-[12px] text-[#F9F7F2]/90 leading-relaxed max-w-xs mb-5 italic font-serif">
            "Sourced ethically, crafted elegantly, certified universally."
          </p>

          <p className="text-xs text-[#D4AF37] font-bold tracking-wider mb-2 uppercase hidden md:block">
            Chat on WhatsApp
          </p>

          {/* Interactive Stylized SVG QR Code */}
          <a 
            href={DEALER_INFO.whatsappDirectLink} 
            target="_blank" 
            rel="noreferrer" 
            className="block group mb-4 hidden md:block"
            title="Scan or click to chat on WhatsApp"
          >
            <div className="bg-[#FAF8F5] p-2.5 w-32 h-32 flex flex-col items-center justify-center relative border border-[#D4AF37]/30 transition-all duration-300 group-hover:border-[#D4AF37] rounded-none">
              {/* Stylized QR Code SVG representing direct link */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1A1A1A]">
                {/* 3 outer squares (typical QR code anchor markers) */}
                <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="10" y="10" width="15" height="15" fill="currentColor" />
                
                <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="75" y="10" width="15" height="15" fill="currentColor" />
                
                <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="10" y="75" width="15" height="15" fill="currentColor" />

                {/* Center logo marker: small gold circle with SGJ */}
                <circle cx="50" cy="50" r="14" fill="#1A1A1A" />
                <circle cx="50" cy="50" r="12" fill="#FAF8F5" />
                <text x="50" y="53" fontFamily="Georgia, serif" fontSize="8" fontWeight="bold" fill="#D4AF37" textAnchor="middle">SGJ</text>

                {/* Simulated QR Code patterns/pixels */}
                <path d="M 40,5 H 45 V 10 H 40 Z M 50,5 H 55 V 15 H 50 Z M 60,5 H 65 V 10 H 60 Z" fill="currentColor" />
                <path d="M 40,20 H 50 V 25 H 40 Z M 55,20 H 65 V 25 H 55 Z" fill="currentColor" />
                <path d="M 5,40 H 15 V 45 H 5 Z M 20,40 H 30 V 50 H 20 Z" fill="currentColor" />
                <path d="M 70,40 H 80 V 45 H 70 Z M 85,45 H 95 V 50 H 85 Z" fill="currentColor" />
                <path d="M 40,70 H 45 V 80 H 40 Z M 50,75 H 60 V 85 H 50 Z M 60,70 H 65 V 75 H 60 Z" fill="currentColor" />
                <path d="M 70,80 H 85 V 85 H 70 Z M 90,70 H 95 V 85 H 90 Z" fill="currentColor" />
                <path d="M 35,35 H 40 V 45 H 35 Z M 60,35 H 65 V 45 H 60 Z M 45,45 H 55 V 50 H 45 Z" fill="currentColor" />
                <path d="M 35,55 H 40 V 65 H 35 Z M 60,55 H 65 V 65 H 60 Z" fill="currentColor" />
              </svg>
              {/* WhatsApp hover overlay indicator */}
              <div className="absolute inset-0 bg-[#25D366]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-1 text-white">
                <svg className="w-8 h-8 fill-current mb-1" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.512 2.016 14.153 1.01 11.609 1.01c-5.41 0-9.813 4.358-9.817 9.771-.002 1.83.5 3.613 1.453 5.17l-1.004 3.666 3.806-.983zm13.152-7.514c-.267-.134-1.58-.78-1.822-.868-.243-.09-.419-.134-.596.134-.176.268-.68.868-.834 1.046-.153.178-.307.2-.574.065-.267-.134-1.127-.416-2.148-1.328-.794-.708-1.33-1.582-1.486-1.85-.156-.268-.017-.413.117-.546.12-.12.267-.312.4-.468.134-.156.178-.268.267-.446.09-.178.045-.335-.022-.469-.068-.134-.596-1.434-.817-1.968-.215-.518-.432-.447-.596-.456-.153-.008-.33-.008-.507-.008-.178 0-.469.067-.714.335-.245.268-.938.917-.938 2.233 0 1.316.957 2.585 1.09 2.763.134.178 1.884 2.876 4.564 4.032.638.275 1.135.439 1.524.563.64.203 1.222.174 1.682.106.513-.076 1.58-.646 1.802-1.268.221-.623.221-1.159.155-1.268-.067-.107-.244-.196-.511-.33z" />
                </svg>
                <span className="text-[9px] font-bold tracking-widest uppercase">SCAN / CHAT</span>
              </div>
            </div>
          </a>
        </div>


        {/* Information Column */}
        <div className="hidden md:flex flex-col text-center lg:text-left">
          <h4 className="font-serif text-[#D4AF37] text-base font-semibold tracking-wider mb-6 pb-2 border-b border-white/10">
            Information
          </h4>
          <ul className="text-sm text-stone-300 space-y-3">

            <li>
              <span className="hover:text-[#D4AF37] cursor-pointer block">
                Today's Gold Rate & GST Breakdowns
              </span>
            </li>
            <li>
              <span className="hover:text-[#D4AF37] cursor-pointer block">
                FAQ on Custom Gold & Silver Orders
              </span>
            </li>
            <li>
              <span className="hover:text-[#D4AF37] cursor-pointer block">
                Investment in Sovereign Gold Bullion
              </span>
            </li>
            <li>
              <span className="hover:text-[#D4AF37] cursor-pointer block">
                BIS Hallmark Care App Information
              </span>
            </li>
            <li>
              <span className="hover:text-[#FAF7F2] text-stone-400 text-xs flex items-center justify-center lg:justify-start">
                <Landmark size={14} className="mr-1 text-[#D4AF37]" />
                Regulated by Indian Bullion Market Assc.
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Us & Chat Column (As seen exactly in image 2) */}
        <div className="flex flex-col text-center lg:text-left">
          <h4 className="font-serif text-[#D4AF37] text-base font-semibold tracking-wider mb-6 pb-2 border-b border-white/10">
            Contact Us
          </h4>
          <div className="text-stone-300 space-y-4 text-sm font-sans">
            {/* Chat With Us WhatsApp */}
            <div className="flex items-start justify-center lg:justify-start space-x-3">
              <svg
                className="w-5 h-5 text-green-400 fill-green-400 mt-1.5 flex-shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.512 2.016 14.153 1.01 11.609 1.01c-5.41 0-9.813 4.358-9.817 9.771-.002 1.83.5 3.613 1.453 5.17l-1.004 3.666 3.806-.983zm13.152-7.514c-.267-.134-1.58-.78-1.822-.868-.243-.09-.419-.134-.596.134-.176.268-.68.868-.834 1.046-.153.178-.307.2-.574.065-.267-.134-1.127-.416-2.148-1.328-.794-.708-1.33-1.582-1.486-1.85-.156-.268-.017-.413.117-.546.12-.12.267-.312.4-.468.134-.156.178-.268.267-.446.09-.178.045-.335-.022-.469-.068-.134-.596-1.434-.817-1.968-.215-.518-.432-.447-.596-.456-.153-.008-.33-.008-.507-.008-.178 0-.469.067-.714.335-.245.268-.938.917-.938 2.233 0 1.316.957 2.585 1.09 2.763.134.178 1.884 2.876 4.564 4.032.638.275 1.135.439 1.524.563.64.203 1.222.174 1.682.106.513-.076 1.58-.646 1.802-1.268.221-.623.221-1.159.155-1.268-.067-.107-.244-.196-.511-.33z" />
              </svg>
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase">Immediate WhatsApp Chat</p>
                <p className="font-mono text-[#4ade80] font-bold text-base hover:underline">
                  <a href={DEALER_INFO.whatsappDirectLink} target="_blank" rel="noreferrer">
                  +91 925 864 1425
                  </a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start justify-center lg:justify-start space-x-3 border-t border-white/5 pt-3">
              <MapPin size={18} className="text-[#D4AF37] mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase">Main Showroom Lounge</p>
                <p className="text-stone-200 mt-0.5 leading-relaxed text-xs">
                  {DEALER_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards & Payment Row */}
      <div className="w-full px-6 md:px-12 xl:px-24 py-8 flex flex-col items-center justify-center text-sm text-[#FAF7F2]/60">
        {/* Accepted Payment Cards */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['VISA', 'MASTERCARD', 'MAESTRO', 'RUPAY', 'AMEX', 'DINERS CLUB'].map((card) => (
            <span
              key={card}
              className="text-[9px] font-bold py-1 px-2.5 bg-black border border-white/10 rounded-none tracking-wider text-stone-300 font-mono"
            >
              {card}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Legal bar inside the Tanishq template style */}
      <div className="w-full bg-black py-5 px-6 select-none border-t border-white/5">
        <div className="w-full px-6 md:px-12 xl:px-24 flex flex-col md:flex-row justify-between items-center text-center space-y-2 md:space-y-0 text-xs text-[#FAF7F2]/60">
          <p>
            &copy; {currentYear} {DEALER_INFO.name} Private Limited. All Rights Registered. Gold rates indicative of local market tax inclusions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[#D4AF37]/80">
            <span className="hover:underline cursor-pointer">Cyber Security Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Hallmark Certifications Guide</span>
          </div>
        </div>
      </div>
        </div>
      </div>
    </footer>
  );
}
