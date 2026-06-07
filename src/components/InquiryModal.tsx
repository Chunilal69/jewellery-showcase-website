import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { JewelleryItem, Inquiry } from '../types';
import { DEALER_INFO } from '../data';

interface InquiryModalProps {
  item: JewelleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiryData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    preferredContact: 'WhatsApp' | 'Phone' | 'Email';
    notes: string;
    isCustomWeight: boolean;
    customWeightValue: string;
  }) => void;
}

export default function InquiryModal({ item, isOpen, onClose, onSubmitInquiry }: InquiryModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [notes, setNotes] = useState('');
  const [isCustomWeight, setIsCustomWeight] = useState(false);
  const [customWeightValue, setCustomWeightValue] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please fill at least your Name and Phone Number to submit an inquiry.');
      return;
    }

    const waLink = getDirectWhatsAppInquiryMessage();
    window.open(waLink, '_blank');

    onSubmitInquiry({
      customerName,
      customerPhone,
      customerEmail,
      preferredContact,
      notes,
      isCustomWeight,
      customWeightValue: isCustomWeight ? customWeightValue : '',
    });

    resetFormStateAndClose();
  };

  const resetFormStateAndClose = () => {
    setFormSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setPreferredContact('WhatsApp');
    setNotes('');
    setIsCustomWeight(false);
    setCustomWeightValue('');
    onClose();
  };

  const getDirectWhatsAppInquiryMessage = () => {
    let customText = `Hello Shyam Jewellers, I am interested in inquiring about a piece of jewelry. My details are as follows:

- *Customer:* ${customerName}
- *Contact:* ${customerPhone}
- *Preffered Choice:* ${preferredContact}
- *Selected Piece:* ${item.name} (${item.sku})
- *Weight Option:* ${isCustomWeight ? `Customized Weight to ${customWeightValue}` : `Standard Weight (${item.weight})`}
- *Notes/Requests:* ${notes || 'None'}`;

    return `${DEALER_INFO.whatsappDirectLink}?text=${encodeURIComponent(customText)}`;
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] rounded-none border border-[#1A1A1A]/10 shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1A1A1A] text-[#F9F7F2] py-4 px-6 flex items-center justify-between select-none border-b border-[#D4AF37]/40">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
            <h3 className="font-serif text-base font-bold tracking-wider uppercase">
              Bespoke Jewelry Custom Inquiry
            </h3>
          </div>
          <button
            onClick={resetFormStateAndClose}
            className="text-stone-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Section */}
        <div className="overflow-y-auto p-6 space-y-5">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
              {/* Product Brief Summary Card */}
              <div className="flex bg-white p-3 rounded-none border border-[#1A1A1A]/10 space-x-4 select-none">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-16 object-cover rounded-none border border-[#1A1A1A]/10"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest block uppercase">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm font-extrabold text-[#1A1A1A] tracking-wider truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 font-medium">
                    SKU: {item.sku} • Standard Specs: {item.purity} ({item.weight})
                  </p>
                </div>
              </div>

              {/* Form Input fields */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mrs. Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    WhatsApp or Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 91xxxxxxxxxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Email Address <span className="text-stone-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g., sharma@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Customized weight option */}
              <div className="bg-stone-50 p-3 rounded-none border border-[#1A1A1A]/10 space-y-2">
                <label className="flex items-center space-x-2 font-bold text-stone-800 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCustomWeight}
                    onChange={(e) => setIsCustomWeight(e.target.checked)}
                    className="rounded-none text-stone-700 border-[#1A1A1A]/20 focus:ring-0"
                  />
                  <span>I need a customized weight / diamond carat</span>
                </label>
                {isCustomWeight && (
                  <div className="animate-fadeIn">
                    <input
                      type="text"
                      placeholder="e.g. Please make this ring in 12 grams instead of standard"
                      value={customWeightValue}
                      onChange={(e) => setCustomWeightValue(e.target.value)}
                      className="w-full border border-[#1A1A1A]/25 bg-white rounded-none px-3 py-1.5 text-stone-800 text-xs focus:ring-0 focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Preferred method of contact */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1.5 uppercase tracking-wider select-none">
                  Preferred Contact Channel
                </label>
                <div className="flex space-x-3 select-none">
                  {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                    <label
                      key={method}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 border rounded-none cursor-pointer font-bold tracking-wider ${
                        preferredContact === method
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-600 border-[#1A1A1A]/10 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={preferredContact === method}
                        onChange={() => setPreferredContact(method)}
                        className="sr-only"
                      />
                      <span>{method.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Inquiry message box */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1 uppercase tracking-wider">
                  Specific Requirements or Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about ring size, available gemstone colors, hallmarked certifications, or gold rate locking discount..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-[#1A1A1A]/20 bg-white rounded-none px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={resetFormStateAndClose}
                  className="flex-1 py-3 border border-stone-300 rounded-none font-bold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer text-center text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold tracking-wider rounded-none transition-all cursor-pointer text-center text-xs"
                >
                  SEND VIA WHATSAPP
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 px-4 space-y-6 animate-scaleIn">
              <div className="flex flex-col items-center select-none">
                <CheckCircle size={56} className="text-emerald-600 mb-3 animate-pulse" />
                <h4 className="font-serif text-lg font-bold text-stone-900 tracking-wide">
                  Formal Inquiry Submitted Successfully
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-sm mt-1">
                  Thank you! The showroom assistant at Shastri Nagar has been notified.
                </p>
              </div>

              {/* Direct Next Step Action to maximize responsiveness */}
              <div className="bg-stone-50 border border-[#1A1A1A]/10 p-4 rounded-none text-xs font-serif italic text-stone-600">
                "Instant Connection: To receive a high-definition video of the jewelry block and immediate estimations, please tap the button below."
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={getDirectWhatsAppInquiryMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-[#FAF7F2] font-extrabold tracking-widest rounded-none shadow-none transition-all"
                >
                  <MessageCircle size={18} className="fill-white/20" />
                  <span>LAUNCH REGISTERED WHATSAPP</span>
                </a>

                <button
                  onClick={resetFormStateAndClose}
                  className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-[11px] font-bold tracking-widest uppercase transition-colors"
                >
                  Return to Catalogue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
