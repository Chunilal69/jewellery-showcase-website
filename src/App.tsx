import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import InquiryModal from './components/InquiryModal';
import InquiryBag from './components/InquiryBag';
import StatsDashboard from './components/StatsDashboard';
import OverlayMenu from './components/OverlayMenu';
import MagneticButton from './components/MagneticButton';
import TextReveal from './components/TextReveal';
import Hero from './components/Hero';
import { CATALOG, DEALER_INFO, METAL_RATES } from './data';
import { JewelleryItem, Inquiry } from './types';
import { Sparkles, Calendar, Search, Star, Clock, MapPin, CheckCircle, RefreshCw, X } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Reveal from './components/Reveal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [selectedItemForModal, setSelectedItemForModal] = useState<JewelleryItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isInquiryBagOpen, setIsInquiryBagOpen] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);

  // Close zoom modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedImageSrc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // State for inquiry bag persistence
  const [itemsInBag, setItemsInBag] = useState<JewelleryItem[]>([]);
  const [showWhatsapp, setShowWhatsapp] = useState(true);

  // Track scroll position to hide WhatsApp button when touching the footer
  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (!footerElement) return;

      const rect = footerElement.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        setShowWhatsapp(false);
      } else {
        setShowWhatsapp(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // State to toggle between 'home' catalog and 'legacy' story pages
  const [activeTab, setActiveTab] = useState<'home' | 'legacy'>('home');

  // Local state to keep track of logged customer inquiries (perfect for demonstration to dealer)
  const [loggedInquiries, setLoggedInquiries] = useState<Inquiry[]>([]);

  // Show a premium floating toast for custom notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load bag from localStorage on startup
  useEffect(() => {
    const savedBag = localStorage.getItem('roorkee_jewellers_bag');
    if (savedBag) {
      try {
        setItemsInBag(JSON.parse(savedBag));
      } catch (e) {
        console.error('Error parsing localStorage bag data', e);
      }
    }
    
    const savedInquiries = localStorage.getItem('roorkee_jewellers_inquiries');
    if (savedInquiries) {
      try {
        setLoggedInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        console.error('Error parsing localStorage inquiries', e);
      }
    }
  }, []);

  // Save bag on modification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddToBag = (item: JewelleryItem) => {
    const isAlreadyInBag = itemsInBag.some((i) => i.id === item.id);
    let updatedBag: JewelleryItem[];

    if (isAlreadyInBag) {
      // Remove
      updatedBag = itemsInBag.filter((i) => i.id !== item.id);
      triggerToast(`Removed "${item.name}" from your inquiry bag.`);
    } else {
      // Add
      updatedBag = [...itemsInBag, item];
      triggerToast(`Added "${item.name}" to your inquiry bag!`);
    }

    setItemsInBag(updatedBag);
    localStorage.setItem('roorkee_jewellers_bag', JSON.stringify(updatedBag));
  };

  const handleRemoveFromBag = (id: string) => {
    const updatedBag = itemsInBag.filter((item) => item.id !== id);
    setItemsInBag(updatedBag);
    localStorage.setItem('roorkee_jewellers_bag', JSON.stringify(updatedBag));
    triggerToast('Item removed from inquiry selection.');
  };

  const handleClearBag = () => {
    setItemsInBag([]);
    localStorage.removeItem('roorkee_jewellers_bag');
  };

  const handleOpenSingleInquiryModal = (item: JewelleryItem) => {
    setSelectedItemForModal(item);
    setIsInquiryModalOpen(true);
  };

  // Submit handers to save to simulated local database (state-persisted)
  const handleSingleInquirySubmit = (formData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    preferredContact: 'WhatsApp' | 'Phone' | 'Email';
    notes: string;
    isCustomWeight: boolean;
    customWeightValue: string;
  }) => {
    if (!selectedItemForModal) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      items: [selectedItemForModal],
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      preferredContact: formData.preferredContact,
      notes: formData.isCustomWeight 
        ? `${formData.notes} | Requested customization size: ${formData.customWeightValue}` 
        : formData.notes,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending'
    };

    const nextInquiries = [newInquiry, ...loggedInquiries];
    setLoggedInquiries(nextInquiries);
    localStorage.setItem('roorkee_jewellers_inquiries', JSON.stringify(nextInquiries));
    triggerToast(`Bespoke inquiry for "${selectedItemForModal.name}" logged successfully!`);
  };

  const handleBulkInquirySubmit = (formData: {
    customerName: string;
    customerPhone: string;
    notes: string;
  }) => {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      items: [...itemsInBag],
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: '',
      preferredContact: 'WhatsApp',
      notes: formData.notes,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending'
    };

    const nextInquiries = [newInquiry, ...loggedInquiries];
    setLoggedInquiries(nextInquiries);
    localStorage.setItem('roorkee_jewellers_inquiries', JSON.stringify(nextInquiries));
    triggerToast(`Consolidated bulk inquiry logged for ${itemsInBag.length} pieces!`);
  };

  // Filter Catalog by Category & Material selection
  const filteredCatalog = CATALOG.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.metal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesMetal = selectedMetal === 'All' || item.metal.toLowerCase() === selectedMetal.toLowerCase();

    return matchesSearch && matchesCategory && matchesMetal;
  });

  const isHomeView = selectedCategory === 'All' && selectedMetal === 'All' && searchQuery === '';
  const displayedCatalog = isHomeView
    ? filteredCatalog.filter(item => item.isFeatured || item.isTrending).slice(0, 8)
    : filteredCatalog;

  return (
    <div className="min-h-screen text-stone-800 flex flex-col font-sans relative selection:bg-amber-600/20 antialiased selection:text-amber-900">
      
      {/* Floating interactive toast notifications */}
      {toastMessage && (
        <div className="fixed bottom-28 right-8 z-50 bg-[#1A1A1A] text-[#FAF7F2] py-3.5 px-6 rounded-none shadow-2xl border border-white/10 max-w-sm flex items-center space-x-3 text-xs font-semibold tracking-wide animate-slideIn">
          <Sparkles className="text-[#D4AF37] animate-pulse flex-shrink-0" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Wrapper to overlay the parallax footer */}
      <div className="relative z-10 bg-[#FAF7F2] flex-1 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {/* Structured Header */}
      <Header
        onSearchChange={setSearchQuery}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onMetalSelect={(metal) => {
          setSelectedMetal(metal);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedMetal={selectedMetal}
        bagCount={itemsInBag.length}
        onBagClick={() => setIsInquiryBagOpen(true)}
        onGoToAbout={() => {
          setActiveTab('legacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToHome={() => {
          setActiveTab('home');
          setSelectedCategory('All');
          setSelectedMetal('All');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Contents layout */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'home' ? (
          <>
            <Hero
              onInquireClick={handleOpenSingleInquiryModal}
              onAddToBag={handleAddToBag}
              itemsInBag={itemsInBag}
              setSelectedCategory={setSelectedCategory}
              setSelectedMetal={setSelectedMetal}
              onImageClick={setZoomedImageSrc}
            />

            {/* Catalog Grid Section with interactive filter summary */}
            <section className="w-full px-6 md:px-12 xl:px-24 pb-16 space-y-8 flex-1">
              
              {/* Category Active filters banner */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-6 bg-white border border-[#1A1A1A]/10 rounded-none select-none">
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-bold text-stone-900 tracking-wider uppercase">
                    Bespoke Showcase Catalog
                  </h2>
                  <p className="text-[10px] text-stone-400 font-mono">
                    {isHomeView 
                      ? `Showing Curated Highlights (${displayedCatalog.length} of ${CATALOG.length} premium articles)` 
                      : `Showing ${filteredCatalog.length} of ${CATALOG.length} premium articles`
                    }
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0 text-xs text-stone-500 font-semibold font-sans">
                  {/* Applied Filters indicator tags */}
                  {selectedCategory !== 'All' && (
                    <span className="bg-[#1A1A1A]/5 text-[#1A1A1A] py-1 px-3 rounded-none border border-[#1A1A1A]/10 flex items-center">
                      Category: {selectedCategory.toUpperCase()}
                      <button onClick={() => setSelectedCategory('All')} className="ml-1.5 text-stone-400 hover:text-stone-700">×</button>
                    </span>
                  )}
                  {selectedMetal !== 'All' && (
                    <span className="bg-[#F9F7F2] text-[#D4AF37] py-1 px-3 rounded-none border border-[#D4AF37]/20 flex items-center">
                      Material: {selectedMetal.toUpperCase()}
                      <button onClick={() => setSelectedMetal('All')} className="ml-1.5 text-stone-400 hover:text-stone-700">×</button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-stone-100 text-stone-700 py-1 px-3 rounded-none border border-[#1A1A1A]/10 flex items-center">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="ml-1.5 text-stone-400 hover:text-stone-700">×</button>
                    </span>
                  )}
                  {isHomeView && (
                    <span className="text-stone-400 italic text-[11px] font-normal font-sans">
                      Showing curated collections. Select a category from Menu to view full collections.
                    </span>
                  )}
                </div>
              </div>

              {/* Infinite Products Grid representation */}
              {displayedCatalog.length > 0 ? (
                <div id="catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 pb-16">
                  {displayedCatalog.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`transition-all duration-700 ${
                        index % 2 === 1 ? 'md:translate-y-12 lg:translate-y-16' : ''
                      }`}
                    >
                      <Reveal delay={(index % 4) * 0.15}>
                        <ProductCard
                          item={item}
                          onInquireClick={handleOpenSingleInquiryModal}
                          onAddToBag={handleAddToBag}
                          isInBag={itemsInBag.some((i) => i.id === item.id)}
                          onImageClick={setZoomedImageSrc}
                        />
                      </Reveal>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border border-[#1A1A1A]/10 rounded-none space-y-4 select-none">
                  <div className="text-[#D4AF37] flex justify-center">
                    <Search size={40} className="stroke-1 text-stone-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-[#1A1A1A] text-base font-bold uppercase tracking-wider">No Matches Found</h4>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto">
                      There are currently no catalog entries matching your query. Try clearing filters or resetting the search input.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedMetal('All');
                      setSearchQuery('');
                    }}
                    className="cursor-pointer text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-4"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              )}
            </section>

            {/* Daily metallic rates, trust pillars and calculator */}
            <section className="w-full">
              <StatsDashboard />
            </section>
          </>
        ) : (
          /* Our Elegant Legacy Chronicle Screen view */
          <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-12 animate-fadeIn flex-1">
            <div className="text-center space-y-3">
              <span className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase block">SHYAM JEWELLERS</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-extrabold tracking-wide uppercase">
                Chronicle of Timeless Brilliance
              </h2>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                For generations, we have crafted ornaments not merely as visual accessories, but as sacred physical records of love, vow, and family heritage.
              </p>
              <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto select-none" />
            </div>

            {/* Interactive Timeline layout */}
            <div className="relative border-l-2 border-[#1A1A1A]/10 pl-6 md:pl-10 space-y-10 ml-4 max-w-2xl mx-auto text-xs text-stone-600 pb-10">
              {/* timeline point 1 */}
              <div className="relative space-y-1.5">
                <span className="absolute -left-[35px] md:-left-[51px] top-1 w-6 h-6 bg-[#1A1A1A] text-[#FAF7F2] font-serif font-black flex items-center justify-center rounded-none border border-[#D4AF37] shadow-none text-[10px]">
                  ✓
                </span>
                <span className="font-mono text-[#D4AF37] font-extrabold text-[12px] tracking-wider block">1984 — FOUNDATION</span>
                <h4 className="font-serif text-sm font-bold text-[#1A1A1A] tracking-wider uppercase">Humble Beginnings</h4>
                <p className="leading-relaxed text-stone-500 text-xs font-sans">
                  Founded by Late Shri Kundan Lal Sharma, carving out customized bridal jewelry with flawless manual goldsmithing under pure trust guidelines.
                </p>
              </div>

              {/* timeline point 2 */}
              <div className="relative space-y-1.5">
                <span className="absolute -left-[35px] md:-left-[51px] top-1 w-6 h-6 bg-[#1A1A1A] text-[#FAF7F2] font-serif font-black flex items-center justify-center rounded-none border border-[#D4AF37] shadow-none text-[10px]">
                  ✓
                </span>
                <span className="font-mono text-[#D4AF37] font-extrabold text-[12px] tracking-wider block">2002 — THE SCIENTIFIC ACCREDITATION</span>
                <h4 className="font-serif text-sm font-bold text-[#1A1A1A] tracking-wider uppercase">Introducing Computerized Karatmeter</h4>
                <p className="leading-relaxed text-stone-500 text-xs font-sans">
                  We became the very first jewelers across the entire Garhwal region of Uttarakhand to host computerized Karatmeter testing technology inside the showroom to empower local consumers with absolute transparency.
                </p>
              </div>

              {/* timeline point 3 */}
              <div className="relative space-y-1.5">
                <span className="absolute -left-[35px] md:-left-[51px] top-1 w-6 h-6 bg-[#1A1A1A] text-[#FAF7F2] font-serif font-black flex items-center justify-center rounded-none border border-[#D4AF37] shadow-none text-[10px]">
                  ✓
                </span>
                <span className="font-mono text-[#D4AF37] font-extrabold text-[12px] tracking-wider block">2015 — THE MODERN LOUNGE REVAMP</span>
                <h4 className="font-serif text-sm font-bold text-[#1A1A1A] tracking-wider uppercase">Civil Lines Lounge Launch</h4>
                <p className="leading-relaxed text-stone-500 text-xs font-sans">
                  Expanded into a majestic multi-story luxury boutique outlet in Civil Lines near Malviya Chowk, launching dedicated solitaire selection chambers, and certification logs registry.
                </p>
              </div>

              {/* timeline point 4 */}
              <div className="relative space-y-1.5">
                <span className="absolute -left-[35px] md:-left-[51px] top-1 w-6 h-6 bg-[#1A1A1A] text-[#FAF7F2] font-serif font-black flex items-center justify-center rounded-none border border-[#D4AF37] shadow-none text-[10px]">
                  ★
                </span>
                <span className="font-mono text-[#D4AF37] font-extrabold text-[12px] tracking-wider block">2026 — DIGITAL INQUIRY PORTAL</span>
                <h4 className="font-serif text-sm font-bold text-[#1A1A1A] tracking-wider uppercase">Pioneering Hybrid Retail Workspace</h4>
                <p className="leading-relaxed text-stone-500 text-xs font-sans">
                  Launching this interactive showcase catalog, allowing bridal parties to discover, pre-select, and custom-specify bespoke jewelry parameters before coming for physical lounge inspections.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="cursor-pointer py-3.5 px-8 bg-[#1A1A1A] hover:bg-black text-[#FAF7F2] font-bold text-xs tracking-widest uppercase rounded-none shadow-none"
              >
                RETURN TO PRODUCTS CATALOGBOARD
              </button>
            </div>
          </section>
        )}

        {/* Private Inquiries Logged list (Admin preview specifically for the local dealer) */}
        {loggedInquiries.length > 0 && (
          <section className="bg-stone-50 border-t border-[#1A1A1A]/10 py-8 px-4 select-none">
            <div className="max-w-4xl mx-auto space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
                <div className="flex items-center space-x-2 text-[#1A1A1A]">
                  <CheckCircle size={16} className="text-[#D4AF37]" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Showroom Assistant Panel: Captured Customer Inquiries ({loggedInquiries.length})
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setLoggedInquiries([]);
                    localStorage.removeItem('roorkee_jewellers_inquiries');
                    triggerToast('Inquiry logs cleared.');
                  }}
                  className="text-[10px] text-red-600 font-bold hover:underline"
                >
                  CLEAR LOCAL DEMO LOGS
                </button>
              </div>

              <p className="text-stone-400 text-[10px] italic">
                *This client-side panel demonstration is specifically designed to let the dealer experience custom inquiry flows immediately.
              </p>

              <div className="space-y-3">
                {loggedInquiries.map((inq) => (
                  <div key={inq.id} className="bg-white p-4 rounded-none border border-[#1A1A1A]/10 space-y-3 shadow-none">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-stone-800 text-[11px]">
                        Customer: <span className="text-[#1A1A1A] font-semibold">{inq.customerName}</span> ({inq.customerPhone})
                      </span>
                      <span className="font-mono text-stone-400 text-[10px]">{inq.createdAt}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-bold text-[#D4AF37] mr-2 uppercase">Requested Items:</span>
                      {inq.items.map((item) => (
                        <span key={item.id} className="bg-[#1A1A1A]/5 text-[#1A1A1A] px-2 py-0.5 rounded-none font-mono border border-[#1A1A1A]/10">
                          {item.sku} • {item.name} ({item.weight})
                        </span>
                      ))}
                    </div>

                    {inq.notes && (
                      <p className="bg-stone-50 p-2 text-[10.5px] rounded-none italic text-stone-500 border-l-2 border-[#D4AF37]">
                        " {inq.notes} "
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      </div>

      {/* Styled Tanishq-inspired Footer */}
      <Footer
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedMetal('All');
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToAbout={() => {
          setActiveTab('legacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToHome={() => {
          setActiveTab('home');
          setSelectedCategory('All');
          setSelectedMetal('All');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Single Product Inquiry Details Modal Form pop */}
      <InquiryModal
        item={selectedItemForModal}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        onSubmitInquiry={handleSingleInquirySubmit}
      />

      {/* Multi item Inquiry bag Sidebar drawer pop */}
      <InquiryBag
        isOpen={isInquiryBagOpen}
        onClose={() => setIsInquiryBagOpen(false)}
        itemsInBag={itemsInBag}
        onRemoveItem={handleRemoveFromBag}
        onSubmitBulkInquiry={handleBulkInquirySubmit}
        onClearBag={handleClearBag}
      />

      {/* Floating WhatsApp Chat Button */}
      <a
        href={DEALER_INFO.whatsappDirectLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-[90] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg cursor-pointer group hover:bg-[#20ba56] ${
          showWhatsapp ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          opacity: showWhatsapp ? 1 : 0,
          transform: showWhatsapp ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
          transition: 'opacity 500ms cubic-bezier(0.76, 0, 0.24, 1), transform 500ms cubic-bezier(0.76, 0, 0.24, 1), background-color 300ms, box-shadow 300ms',
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring background */}
        <span className={`absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:opacity-60 duration-1000 ${
          showWhatsapp ? 'block' : 'hidden'
        }`} />
        
        {/* WhatsApp Icon */}
        <svg
          className="w-8 h-8 fill-current relative z-10 group-hover:rotate-[10deg] transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.512 2.016 14.153 1.01 11.609 1.01c-5.41 0-9.813 4.358-9.817 9.771-.002 1.83.5 3.613 1.453 5.17l-1.004 3.666 3.806-.983zm13.152-7.514c-.267-.134-1.58-.78-1.822-.868-.243-.09-.419-.134-.596.134-.176.268-.68.868-.834 1.046-.153.178-.307.2-.574.065-.267-.134-1.127-.416-2.148-1.328-.794-.708-1.33-1.582-1.486-1.85-.156-.268-.017-.413.117-.546.12-.12.267-.312.4-.468.134-.156.178-.268.267-.446.09-.178.045-.335-.022-.469-.068-.134-.596-1.434-.817-1.968-.215-.518-.432-.447-.596-.456-.153-.008-.33-.008-.507-.008-.178 0-.469.067-.714.335-.245.268-.938.917-.938 2.233 0 1.316.957 2.585 1.09 2.763.134.178 1.884 2.876 4.564 4.032.638.275 1.135.439 1.524.563.64.203 1.222.174 1.682.106.513-.076 1.58-.646 1.802-1.268.221-.623.221-1.159.155-1.268-.067-.107-.244-.196-.511-.33z" />
        </svg>
      </a>

      {/* Global Centered Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImageSrc(null)}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] bg-stone-900 border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center"
            >
              <img
                src={zoomedImageSrc}
                alt="Zoomed product inspection"
                className="max-w-full max-h-[85vh] object-contain select-none"
              />
              <button
                onClick={() => setZoomedImageSrc(null)}
                className="absolute top-4 right-4 bg-black/60 border border-white/10 hover:border-white/30 text-white p-2 rounded-full cursor-pointer hover:bg-black transition-colors"
                aria-label="Close zoom inspection"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
