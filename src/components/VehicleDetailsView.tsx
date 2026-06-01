import React, { useState } from 'react';
import { Vehicle, SiteSettings, Inquiry } from '../types';
import { Share2, Phone, MessageSquare, Facebook, Calendar, Milestone, Compass, Cpu, Palette, Info, Check, Undo2, Settings2 } from 'lucide-react';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  siteSettings: SiteSettings;
  onBackToInventory: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status' | 'webhookSent'>) => void;
}

export default function VehicleDetailsView({ vehicle, siteSettings, onBackToInventory, onSubmitInquiry }: VehicleDetailsProps) {
  const [activeImage, setActiveImage] = useState(vehicle.mainImage);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState(`Hello YMT Auto Trading, I am interested in the ${vehicle.title} (${vehicle.year}). Please let me know its availability and the final demand terms.`);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) return;

    onSubmitInquiry({
      customerName,
      phoneNumber,
      interestedVehicleId: vehicle.id,
      interestedVehicleTitle: vehicle.title,
      message
    });

    setIsSuccess(true);
    setCustomerName('');
    setPhoneNumber('');
  };

  const specsList = [
    { label: 'Year', value: vehicle.year, icon: Calendar },
    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} KM`, icon: Milestone },
    { label: 'Engine Size', value: vehicle.engineSize || 'N/A', icon: Cpu },
    { label: 'Fuel Type', value: vehicle.fuelType, icon: Compass },
    { label: 'Transmission', value: vehicle.transmission, icon: Settings2 },
    { label: 'Exterior Color', value: vehicle.exteriorColor || 'N/A', icon: Palette },
    { label: 'Interior Color', value: vehicle.interiorColor || 'N/A', icon: Palette },
  ];

  const shareText = `Check out this pristine ${vehicle.title} at YMT Auto Trading Myanmar!`;

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#1A1A1A] font-sans pb-24 md:pb-12">
      
      {/* Top Banner Context Navigation */}
      <div className="bg-white border-b border-neutral-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToInventory}
            className="flex items-center space-x-2 text-xs font-mono text-[#666666] hover:text-black uppercase tracking-widest transition-colors duration-300"
            id="back-to-inventory-btn"
          >
            <Undo2 className="h-4 w-4" />
            <span>RETURN TO CATALOG</span>
          </button>
          
          <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
            YMT AUTO CATALOG • {vehicle.brand.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT & CENTER PANEL: LARGE IMAGE VIEWER & GALLERY */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-neutral-200 p-3 shadow-xs">
              
              {/* Main Expanded View */}
              <div className="relative overflow-hidden aspect-[16/10] bg-neutral-900 border border-neutral-100">
                <img
                  src={activeImage}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-[9px] font-mono tracking-widest text-white uppercase font-bold">
                  {vehicle.soldStatus === 'Available' ? 'AVAILABLE NOW' : 'SOLD OUT'}
                </div>
              </div>

              {/* Gallery Miniatures */}
              {vehicle.galleryImages && vehicle.galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 pt-3" id="gallery-grid">
                  {vehicle.galleryImages.map((img, idx) => {
                    const isActive = activeImage === img;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`aspect-[4/3] bg-neutral-100 overflow-hidden relative cursor-pointer outline-none transition-all duration-300 ${
                          isActive ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'
                        }`}
                        id={`gallery-thumb-${idx}`}
                      >
                        <img
                          src={img}
                          alt={`${vehicle.title} Gallery ${idx}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Description Card */}
            <div className="bg-white border border-neutral-200 p-8 sm:p-10 space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-neutral-800 uppercase flex items-center space-x-2">
                <Info className="h-4 w-4 text-neutral-600" />
                <span>Executive Overview</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#444444] font-sans leading-relaxed pt-2">
                {vehicle.description}
              </p>
              
              <div className="pt-6 border-t border-neutral-100">
                <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4">SPECIFICATIONS CHECKS</h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs text-[#555555]">
                  <span className="flex items-center space-x-1"><Check className="h-4.5 w-4.5 text-neutral-400 shrink-0" /> <span>Original Papers Verified</span></span>
                  <span className="flex items-center space-x-1"><Check className="h-4.5 w-4.5 text-neutral-400 shrink-0" /> <span>Clean Service Log History</span></span>
                  <span className="flex items-center space-x-1"><Check className="h-4.5 w-4.5 text-neutral-400 shrink-0" /> <span>Multi-Point Mechanic Checked</span></span>
                  <span className="flex items-center space-x-1"><Check className="h-4.5 w-4.5 text-neutral-400 shrink-0" /> <span>Luxury Condition Standards</span></span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: PRICING, DETAILED mechanical grid, LEAD CAPTURE INFO */}
          <div className="space-y-6">
            
            {/* Title & Pricing Card */}
            <div className="bg-white border border-neutral-200 p-8">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase block mb-1">
                {vehicle.brand} MODEL SERIES
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight mb-2">
                {vehicle.title}
              </h1>

              <div className="py-4 border-t border-b border-neutral-100 my-4 flex items-baseline justify-between">
                <span className="text-xs font-mono text-neutral-400 tracking-wider">DEMAND PRICE</span>
                <span className="text-lg sm:text-xl font-bold text-neutral-950 font-sans">
                  {vehicle.priceLabel}
                </span>
              </div>

              {/* General Technical specs grid */}
              <div className="space-y-3 pt-2">
                {specsList.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center text-xs py-1.5 border-b border-dashed border-neutral-100">
                    <span className="text-neutral-500 font-medium flex items-center space-x-2">
                      <spec.icon className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{spec.label}</span>
                    </span>
                    <span className="font-mono text-neutral-900 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquire Booking Box */}
            <div className="bg-[#111111] text-white p-8">
              <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase pb-4 border-b border-neutral-800">
                PROSECUTE SECURE INQUIRY
              </h3>

              {isSuccess ? (
                <div className="pt-6 text-center space-y-4">
                  <div className="inline-flex h-10 w-10 bg-white text-black items-center justify-center rounded-none font-bold">
                    ✓
                  </div>
                  <h4 className="text-xs font-mono tracking-widest text-[#EAEAEA] uppercase">Inquiry Filed</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                    Thank you. Your request for the **{vehicle.title}** is logged in the CRM Sandbox and queued for Viber alerts!
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setMessage(`Hello YMT Auto Trading... interested in the ${vehicle.title}`);
                    }}
                    className="w-full py-2.5 bg-neutral-800 border border-neutral-700 text-[10px] tracking-widest text-white hover:bg-neutral-700 uppercase font-mono mt-4"
                    id="submit-another-inquiry-btn"
                  >
                    SUBMIT ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-6 text-xs text-[#CCCCCC]">
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-400 mb-2 uppercase">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ko Ye Myint"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-600"
                      id="details-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-400 mb-2 uppercase">
                      Phone / Viber Number *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. +95 95088827"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-600"
                      id="details-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-400 mb-2 uppercase">
                      Message Reference
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-neutral-500 rounded-none leading-relaxed"
                      id="details-msg-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-extrabold text-[10px] tracking-widest uppercase transition-colors"
                    id="inquiry-form-submit-btn"
                  >
                    SUBMIT TO CRM
                  </button>
                </form>
              )}
            </div>

            {/* Direct Connect Buttons (Viber, Phone, Facebook) */}
            <div className="bg-white border border-neutral-200 p-6 space-y-3">
              <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase text-center mb-3">
                DIRECT SALES ASSOCIATE HOTLINES
              </h4>

              <a 
                href={`tel:${siteSettings.phoneRaw}`}
                className="flex items-center justify-center space-x-3 w-full py-3 border border-neutral-300 text-neutral-800 text-xs tracking-widest font-bold uppercase hover:bg-neutral-50 transition duration-300"
                id="details-call-btn"
              >
                <Phone className="h-4 w-4 text-neutral-700" />
                <span>CALL DEALER DIRECT</span>
              </a>

              <a 
                href={`viber://chat?number=${siteSettings.phoneRaw}`}
                className="flex items-center justify-center space-x-3 w-full py-3 bg-[#6F3E97] hover:bg-[#5E2B85] text-white text-xs tracking-widest font-bold uppercase transition duration-300"
                id="details-viber-btn"
              >
                <MessageSquare className="h-4 w-4" />
                <span>VIBER CHAT ASSIST</span>
              </a>

              <a 
                href={siteSettings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-3 w-full py-3 bg-[#1877F2] hover:bg-[#165EBF] text-white text-xs tracking-widest font-bold uppercase transition duration-300"
                id="details-fb-btn"
              >
                <Facebook className="h-4 w-4" />
                <span>MESSAGE ON FACEBOOK</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* 7. MOB STICKY ACTION DRAWER (MOBILE VIEWPORT SPECIALIST) */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 px-4 py-3 flex items-center justify-between shadow-lg"
        id="mobile-sticky-action-bar"
      >
        <div className="flex-1 mr-3 text-left">
          <span className="block text-[8px] font-mono text-neutral-400 tracking-widest uppercase truncate">{vehicle.title}</span>
          <span className="text-xs font-bold font-sans text-neutral-950 block truncate">{vehicle.priceLabel}</span>
        </div>
        
        <div className="flex space-x-2 shrink-0">
          <a 
            href={`tel:${siteSettings.phoneRaw}`}
            className="flex items-center justify-center h-10 w-10 bg-neutral-900 text-white hover:bg-neutral-800 rounded-none transition"
            id="mobile-sticky-tel-link"
            aria-label="Call Dealer"
          >
            <Phone className="h-4.5 w-4.5" />
          </a>
          <a 
            href={`viber://chat?number=${siteSettings.phoneRaw}`}
            className="flex items-center justify-center h-10 w-10 bg-[#6F3E97] text-white rounded-none transition"
            id="mobile-sticky-viber-link"
            aria-label="Viber Chat"
          >
            <MessageSquare className="h-4.5 w-4.5" />
          </a>
          <a 
            href={siteSettings.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center h-10 w-10 bg-[#1877F2] text-white rounded-none transition"
            id="mobile-sticky-fb-link"
            aria-label="Facebook Page"
          >
            <Facebook className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
