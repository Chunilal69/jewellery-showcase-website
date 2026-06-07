import { useState } from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Scale, Landmark, ChevronDown, ChevronUp, Clock, HelpCircle, Calculator, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';
import TextReveal from './TextReveal';
import { METAL_RATES, DEALER_INFO } from '../data';

export default function StatsDashboard() {
  const [calculatorGram, setCalculatorGram] = useState<number>(10);
  const [selectedMetalRateIdx, setSelectedMetalRateIdx] = useState<number>(1); // default 22K
  const [makingChargesPercent, setMakingChargesPercent] = useState<number>(12); // default 12% making charges
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const selectedRate = METAL_RATES[selectedMetalRateIdx];
  const goldMetalCost = calculatorGram * selectedRate.ratePerGram;
  const makingCharges = (goldMetalCost * makingChargesPercent) / 100;
  const subtotal = goldMetalCost + makingCharges;
  const gstCost = subtotal * 0.03; // 3% standard GS for gold jewelry in India
  const totalCostEstimate = subtotal + gstCost;

  const faqs = [
    {
      q: 'Do you provide authentic Hallmark certifications?',
      a: 'Absolutely. Every single gold article sold at Shyam Jewellers is 100% BIS Hallmarked with HUID (Hallmark Unique Identification Number) laser engraved. Our diamonds are tested, validated and certified by international laboratories like GIA and IGI.'
    },
    {
      q: 'Can I exchange or upgrade my old gold jewelry at your store?',
      a: 'Yes, we offer a 100% Buyback and Exchange Guarantee. Your old gold jewelry will be melted and tested for purity right in front of you using our state-of-the-art computerized Karatmeter analyzer to secure the highest market valuations.'
    },
    {
      q: 'What is the standard time required for customized wedding jewelry?',
      a: 'Depending on the complexity, classical hand-made bridal Kundan sets take about 15-21 working days. Modern diamond rings or solitaire studs can be custom-made and ready for collection in-store within 7-10 working days.'
    },
    {
      q: 'Do you charge extra for making charges or customized designs?',
      a: 'Our making charges are highly competitive, starting from just 8% to 15% depending on the intricacy of the craftsmanship. We maintain 100% pricing transparency, detailing every single gram and stone weight on your final invoice.'
    }
  ];

  return (
    <div className="select-none font-sans flex flex-col">
      {/* Hero-like section for Brand Pillars */}
      <div 
        className="relative py-24 px-4 bg-[#FAF8F5]"
        style={{
          backgroundImage: 'url("/beige-palm-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
        
        <div className="relative w-full px-6 md:px-12 xl:px-24 space-y-12 z-10">
          <Reveal delay={0.2}>
            <div className="text-center space-y-3">
              <span className="text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase block">
                OUR BRAND COMMITMENTS
              </span>
              <TextReveal 
                delay={0.3}
                text="Pillars of Everlasting Trust"
                className="font-serif text-2xl md:text-3xl text-stone-900 font-extrabold tracking-wide uppercase justify-center"
              />
              <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto select-none" />
              <p className="text-xs text-stone-600 max-w-xl mx-auto leading-relaxed">
                Shyam Jewellers has been a trusted symbol of exceptional artistry, pristine purity, and transparent dealing in Uttarakhand.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <Reveal delay={0.3}>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-none border border-[#1A1A1A]/10 text-center space-y-3 shadow-none hover:bg-white/60 transition-colors duration-300 h-full">
                <div className="w-12 h-12 bg-white/60 flex items-center justify-center mx-auto border border-[#1A1A1A]/10">
                  <Award className="text-[#D4AF37]" size={22} />
                </div>
                <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-widest">
                  BIS Standard 100% Hallmarked
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Every jewelry item carries the government certified laser-stamped HUID, verifying the precise Gold purity and safety standard.
                </p>
              </div>
            </Reveal>

            {/* Pillar 2 */}
            <Reveal delay={0.4}>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-none border border-[#1A1A1A]/10 text-center space-y-3 shadow-none hover:bg-white/60 transition-colors duration-300 h-full">
                <div className="w-12 h-12 bg-white/60 flex items-center justify-center mx-auto border border-[#1A1A1A]/10">
                  <ShieldCheck className="text-stone-900" size={22} />
                </div>
                <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-widest">
                  Certified Diamond Registry
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  We exclusively use diamonds that are verified by GIA & IGI laboratories, cataloged with individual grading report dossiers.
                </p>
              </div>
            </Reveal>

            {/* Pillar 3 */}
            <Reveal delay={0.5}>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-none border border-[#1A1A1A]/10 text-center space-y-3 shadow-none hover:bg-white/60 transition-colors duration-300 h-full">
                <div className="w-12 h-12 bg-white/60 flex items-center justify-center mx-auto border border-[#1A1A1A]/10">
                  <Scale className="text-emerald-700" size={22} />
                </div>
                <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-widest">
                  Karats & Weight Genuinuity
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Our showroom features precision digital scales and computerised density testing technology to assert absolute correct carat counts.
                </p>
              </div>
            </Reveal>

            {/* Pillar 4 */}
            <Reveal delay={0.6}>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-none border border-[#1A1A1A]/10 text-center space-y-3 shadow-none hover:bg-white/60 transition-colors duration-300 h-full">
                <div className="w-12 h-12 bg-white/60 flex items-center justify-center mx-auto border border-[#1A1A1A]/10">
                  <Heart className="text-[#D4AF37]" size={22} />
                </div>
                <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-widest">
                  Lifetime Gaurantee & Exchange
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Exchange your heritage sets at 100% of the daily gold rate values. Complete reassurance for future generational upgrades.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8F5] py-12 px-4 border-b border-[#1A1A1A]/10">
        <div className="w-full px-6 md:px-12 xl:px-24 space-y-12">
          {/* Dynamic Calculator & Rates Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-stone-200">
          
          {/* Left panel: Daily Gold & Silver Rates tracker */}
          <div className="bg-white p-6 rounded-none border border-[#1A1A1A]/10 space-y-5 shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase block">
                  REGIONAL
                </span>
                <h3 className="font-serif text-base font-extrabold text-[#1A1A1A] tracking-wider uppercase">
                  Daily Bullion Rate Tracker
                </h3>
              </div>
              <span className="text-[10px] text-stone-400 bg-stone-100 px-3 py-1 rounded-none border border-[#1A1A1A]/10 font-mono">
                Updated: Today, 11:00 AM
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Daily metal pricing index tracked from Indian Bullion and Jewellers Assc (IBJA), inclusive of provincial market trends in Uttarakhand.
            </p>

            <div className="space-y-3 text-xs">
              {METAL_RATES.map((rate, idx) => (
                <div
                  key={rate.metal}
                  onClick={() => setSelectedMetalRateIdx(idx)}
                  className={`flex items-center justify-between p-3 rounded-none border cursor-pointer transition-all ${
                    selectedMetalRateIdx === idx
                      ? 'bg-[#FAF8F5] border-[#D4AF37] ring-1 ring-[#D4AF37]/30'
                      : 'bg-white border-[#1A1A1A]/10 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-2.5 h-2.5 rounded-none ${rate.isUp ? 'bg-emerald-600' : 'bg-rose-500'}`} />
                    <div>
                      <p className="font-serif font-extrabold text-stone-800">{rate.metal}</p>
                      <p className="text-[10px] text-stone-400">{rate.purity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-stone-900">₹{rate.ratePerGram.toLocaleString()}/g</p>
                    <span className={`text-[10px] font-mono font-bold ${rate.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {rate.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Calculator widget */}
          <div className="bg-[#1A1A1A] text-white p-6 rounded-none border border-[#1A1A1A] space-y-5 flex flex-col justify-between shadow-none">
            <div>
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <Landmark size={20} />
                <h3 className="font-serif text-base font-bold tracking-wider uppercase text-white">
                  Store Purity & Cost Calculator
                </h3>
              </div>
              <p className="text-xs text-[#FAF8F5]/80 mt-2 leading-relaxed">
                Estimate the approximate final cost of your jewelry pieces matching current metal rates, making charges, and Indian GST rules.
              </p>
            </div>

            {/* Inputs Group */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Weight in Grams slider or input */}
                <div>
                  <label className="block text-stone-300 mb-1 text-[10px] font-bold uppercase tracking-wider">
                    Weight of Gold (Grams)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={250}
                    value={calculatorGram}
                    onChange={(e) => setCalculatorGram(Number(e.target.value))}
                    className="w-full bg-white/10 text-white font-mono border border-white/20 rounded-none px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Selected Pure Metal dropdown */}
                <div>
                  <label className="block text-[#FAF8F5]/80 mb-1 text-[10px] font-bold uppercase tracking-wider">
                    Select Pure Material
                  </label>
                  <select
                    value={selectedMetalRateIdx}
                    onChange={(e) => setSelectedMetalRateIdx(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] text-white border border-white/20 rounded-none px-3 py-1.5 focus:outline-none focus:border-[#D4AF37] font-bold"
                  >
                    {METAL_RATES.map((rate, idx) => (
                      <option key={rate.metal} value={idx}>
                        {rate.metal.split(' ')[0]} ({rate.ratePerGram}/g)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Making Charges Slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-stone-300 text-[10px] font-bold uppercase">
                  <span>Making Charges (Workmanship):</span>
                  <span className="text-[#D4AF37]">{makingChargesPercent}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  value={makingChargesPercent}
                  onChange={(e) => setMakingChargesPercent(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-white/10 appearance-none"
                />
              </div>
            </div>

            {/* Price Calculations Output display */}
            <div className="bg-black/30 rounded-none p-4 border border-white/10 space-y-2 select-none text-[#FAF8F5]/80 text-xs leading-relaxed">
              <div className="flex justify-between">
                <span>Gold Value ({calculatorGram}g):</span>
                <span className="font-mono text-white">₹{goldMetalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Making Charges ({makingChargesPercent}%):</span>
                <span className="font-mono text-white">₹{makingCharges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard State GST in India (3%):</span>
                <span className="font-mono text-white">₹{gstCost.toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/15 my-2" />
              <div className="flex justify-between text-white font-extrabold uppercase">
                <span className="text-[#D4AF37] tracking-wider">Appx. Total Estimate:</span>
                <span className="font-serif text-base text-[#D4AF37]">₹{Math.round(totalCostEstimate).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ list for Localized Confidence Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-[#1A1A1A]/10">
          <div className="space-y-3">
            <span className="text-[#1A1A1A] text-xs font-bold tracking-widest uppercase flex items-center">
              <HelpCircle size={14} className="mr-1 text-[#D4AF37]" />
              CUSTOMER CORNER
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 tracking-wide uppercase">
              Showroom Inquiries & Buying Guide
            </h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              Review important policies regarding buybacks, hallmarking, and certified customization processes at our showroom.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3 select-none">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#1A1A1A]/10 rounded-sm overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full text-left py-4 px-6 flex items-center justify-between font-sans font-semibold text-stone-800 hover:bg-stone-50 transition-colors text-sm md:text-base cursor-pointer"
                >
                  <span className="tracking-wide text-[#1A1A1A] pr-4">{faq.q}</span>
                  {openFaqIdx === idx ? <ChevronUp size={16} className="text-[#D4AF37]" /> : <ChevronDown size={16} className="text-stone-400" />}
                </button>
                {openFaqIdx === idx && (
                  <div className="p-6 border-t border-stone-100 bg-stone-50 text-stone-600 text-sm leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
