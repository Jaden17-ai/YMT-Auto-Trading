import React, { useState } from 'react';
import { SiteSettings, Inquiry } from '../types';
import { Phone, MessageSquare, Mail, Facebook, MapPin, Send, Check } from 'lucide-react';

interface ContactViewProps {
  siteSettings: SiteSettings;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status' | 'webhookSent'>) => void;
}

export default function ContactView({ siteSettings, onSubmitInquiry }: ContactViewProps) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) return;

    onSubmitInquiry({
      customerName,
      phoneNumber,
      message
    });

    setIsSuccess(true);
    setCustomerName('');
    setPhoneNumber('');
    setMessage('');
  };

  return (
    <div className="bg-[#F8F8F8] text-[#1A1A1A] font-sans pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#222222] text-center">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#A0A0A0] uppercase block">CONNECT WITH US</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">Contact YMT Auto Trading</h1>
        <p className="text-xs text-neutral-400 mt-2 max-w-lg mx-auto">Get in touch with our sales representatives via direct hotlines, Viber, or online form dispatch.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: DIRECT CONTACT DETAILS */}
          <div className="space-y-8">
            <div className="bg-white border border-neutral-200 p-8 sm:p-10 space-y-6">
              <h3 className="text-xs font-bold tracking-widest text-[#111111] uppercase border-b border-neutral-100 pb-4">
                COMMUNICATION CHANNELS
              </h3>

              <div className="space-y-6">
                
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-neutral-100 h-10 w-10 flex items-center justify-center shrink-0">
                    <Phone className="h-4.5 w-4.5 text-neutral-850" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">SALES HOTLINE</h4>
                    <a href={`tel:${siteSettings.phoneRaw}`} className="text-sm font-bold text-neutral-900 font-sans hover:underline block mt-1">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                {/* Viber */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#6F3E97]/10 h-10 w-10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-4.5 w-4.5 text-[#6F3E97]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">VIBER ACCOUNT</h4>
                    <a href={`viber://chat?number=${siteSettings.phoneRaw}`} className="text-sm font-bold text-[#6F3E97] font-mono hover:underline block mt-1">
                      {siteSettings.viber}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-neutral-100 h-10 w-10 flex items-center justify-center shrink-0">
                    <Mail className="h-4.5 w-4.5 text-neutral-850" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase font-semibold">EMAIL CORRESPONDENCE</h4>
                    <a href={`mailto:${siteSettings.email}`} className="text-sm font-bold text-neutral-900 font-sans hover:underline block mt-1">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#1877F2]/10 h-10 w-10 flex items-center justify-center shrink-0">
                    <Facebook className="h-4.5 w-4.5 text-[#1877F2]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">FACEBOOK PAGE</h4>
                    <a href={siteSettings.facebookUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#1877F2] font-sans hover:underline block mt-1">
                      YMT Auto Trading Myanmar
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-neutral-100 h-10 w-10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4.5 w-4.5 text-neutral-850" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">SHOWROOM LOCATION</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      {siteSettings.address}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="text-xs bg-neutral-100 p-6 border border-neutral-200">
              <h4 className="font-bold text-neutral-900 tracking-widest uppercase text-center mb-2">QUICK TIP</h4>
              <p className="text-neutral-500 leading-relaxed text-center font-sans">
                Viber inquiries are typically answered within 15 minutes during standard showroom hours (9:00 AM – 6:00 PM).
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="bg-white border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#111111] uppercase border-b border-neutral-100 pb-4 mb-6">
                ONLINE PROMPT CALLBACK DISPATCH
              </h3>

              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex h-12 w-12 bg-neutral-100 text-[#111111] items-center justify-center rounded-none text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-xs font-mono tracking-widest text-neutral-800 uppercase">Information Captured</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, Ko/Ma. Your callback ticket has been formatted and submitted directly to the CRM dashboard logs. Our representatives will phone or Viber you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2 border border-neutral-300 text-xs tracking-widest font-bold uppercase hover:bg-neutral-50 transition"
                    id="contact-form-success-reset-btn"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs text-neutral-600">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ko Aung"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-sans text-neutral-900 focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-400"
                      id="contact-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. +95 95088827"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-400"
                      id="contact-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                      Your Message or Vehicle of Interest
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Specify if you require Mercedes-Benz, BMW, or Ford Everest information..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-sans text-neutral-900 focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-400 leading-relaxed"
                      id="contact-msg-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-[10px] tracking-widest uppercase transition-colors rounded-none flex items-center justify-center space-x-2"
                    id="contact-page-submit-btn"
                  >
                    <Send className="h-3 w-3" />
                    <span>DISPATCH SECURE INQUIRY</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Embedded Google Web Map */}
        <div className="mt-16 bg-white p-4 border border-neutral-200">
          <div className="h-[400px] w-full">
            <iframe 
              src={siteSettings.googleMapsEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="YMT Auto Trading Showroom Map"
              id="contact-maps-iframe"
              className="grayscale contrast-125"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
