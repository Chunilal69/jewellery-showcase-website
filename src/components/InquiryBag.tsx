import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Send, CreditCard, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { JewelleryItem } from '../types';
import { DEALER_INFO } from '../data';

interface InquiryBagProps {
  isOpen: boolean;
  onClose: () => void;
  itemsInBag: JewelleryItem[];
  onRemoveItem: (id: string) => void;
  onSubmitBulkInquiry: (inquiryData: {
    customerName: string;
    customerPhone: string;
    notes: string;
  }) => void;
  onClearBag: () => void;
}

export default function InquiryBag({
  isOpen,
  onClose,
  itemsInBag,
  onRemoveItem,
  onSubmitBulkInquiry,
  onClearBag,
}: InquiryBagProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please fill out your Name and WhatsApp phone number.');
      return;
    }

    const waLink = getBulkWhatsAppInquiryMessage();
    window.open(waLink, '_blank');

    onSubmitBulkInquiry({
      customerName,
      customerPhone,
      notes,
    });

    handleDone();
  };

  const getBulkWhatsAppInquiryMessage = () => {
    const itemList = itemsInBag
      .map((item, idx) => `${idx + 1}. *${item.name}* (${item.sku}) - ${item.metal}, ${item.weight}`)
      .join('\n');

    const customText = `Hello Shyam Jewellers, I would like to make a consolidated jewelry showcase inquiry:

*Selected Items:*
${itemList}

*Customer Details:*
- *Name:* ${customerName}
- *Phone:* ${customerPhone}
- *General Note:* ${notes || 'No special customization'}

Kindly verify availability and pricing. Thank you!`;

    return `${DEALER_INFO.whatsappDirectLink}?text=${encodeURIComponent(customText)}`;
  };

  const handleDone = () => {
    setBulkSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    onClearBag();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar element wrapper */}
          <motion.div 
            className="bg-[#FAF8F5] border-l border-[#1A1A1A]/10 w-full max-w-md h-full shadow-2xl flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%', y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header bar of Drawer */}
            <div className="bg-[#1A1A1A] text-[#F9F7F2] py-5 px-6 flex items-center justify-between select-none border-b border-[#D4AF37]/40">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-[#D4AF37]" />
            <h3 className="font-serif text-sm font-bold tracking-widest uppercase">
              YOUR INQUIRY COLLECTION ({itemsInBag.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white transition-all cursor-pointer p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {bulkSubmitted ? (
            <div className="text-center py-10 px-4 space-y-6 animate-scaleIn">
              <div className="flex flex-col items-center select-none">
                <CheckCircle size={60} className="text-emerald-700 mb-4 animate-bounce" />
                <h4 className="font-serif text-lg font-bold text-[#1A1A1A] tracking-wider uppercase">
                  Consolidated Inquiry Logged!
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed mt-2 max-w-xs mx-auto">
                  Your bulk request has been registered in the database state successfully. Tap the button below to text all elements to the dealer instantly on WhatsApp.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href={getBulkWhatsAppInquiryMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-[#FAF7F2] font-semibold tracking-wider text-xs rounded-none transition-all shadow-none"
                >
                  <Send size={15} />
                  <span>TRANSMIT BULK CATALOG via WHATSAPP</span>
                </a>

                <button
                  onClick={handleDone}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold tracking-widest uppercase rounded-none transition-all border border-stone-200"
                >
                  DONE / RESET BAG
                </button>
              </div>
            </div>
          ) : itemsInBag.length === 0 ? (
            <div className="text-center py-20 px-4 space-y-4 select-none">
              <ShoppingBag size={48} className="mx-auto text-stone-300 stroke-1" />
              <div className="space-y-1">
                <p className="font-serif text-sm font-bold text-stone-705 uppercase tracking-widest text-[#1A1A1A]">
                  Your Inquiry Bag is Empty
                </p>
                <p className="text-xs text-stone-400">
                  Browse our high-heritage gold and sterling silver collections to add pieces layout.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Added Items List */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase border-b border-[#1A1A1A]/10 pb-1">
                  ITEMS FOR INQUIRY
                </p>
                {itemsInBag.map((item) => (
                  <div
                    key={item.id}
                    className="flex bg-white p-3 rounded-none border border-[#1A1A1A]/10 space-x-3 items-center group relative overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-12 object-cover rounded-none border border-[#1A1A1A]/10"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-extrabold text-[#1A1A1A] tracking-wider truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono tracking-wide uppercase">
                        {item.sku} • {item.weight}
                      </p>
                      <p className="text-[10px] text-[#D4AF37] font-bold">
                        {item.metal} ({item.purity})
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-700 transition-colors cursor-pointer p-1.5 rounded-none hover:bg-stone-50"
                      title="Remove Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Utility disclaimer block */}
              <div className="p-3 bg-[#F9F7F2] border border-[#1A1A1A]/10 text-ambient-700 rounded-none text-[10.5px] leading-relaxed flex items-start space-x-2 select-none">
                <AlertCircle size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Today's Gold Rate lock:</strong> Upon submitting, our customer manager will compute final pricing matching the BIS standard gold rate update in Uttarakhand.
                </span>
              </div>

              {/* Unified Bulk Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-[#1A1A1A]/10 text-xs text-stone-700">
                <p className="text-[10px] font-black text-stone-400 tracking-widest uppercase">
                  CUSTOMER DETAILS
                </p>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Shreya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    WhatsApp or Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 99xxxxxxxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Special Inquiries or Request Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide specific ring sizes, customization like 18K white gold instead of yellow gold, etc..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold tracking-wider text-xs rounded-none transition-all cursor-pointer shadow-none"
                  >
                    <Send size={14} />
                    <span>SEND INQUIRY VIA WHATSAPP</span>
                  </button>
                </div>
              </form>
            </div>
          )}
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
