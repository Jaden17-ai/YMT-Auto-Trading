import React, { useState } from 'react';
import { AppView, SiteSettings } from '../types';
import { Phone, Calendar, Menu, X, ShieldCheck, FileSpreadsheet, Compass } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  siteSettings: SiteSettings;
}

export default function Navigation({ currentView, onViewChange, siteSettings }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', view: AppView.Home },
    { label: 'INVENTORY', view: AppView.Inventory },
    { label: 'ABOUT US', view: AppView.About },
    { label: 'CONTACT', view: AppView.Contact },
    { label: 'CMS SANITY STUDIO', view: AppView.CmsAdmin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111111] text-white border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => onViewChange(AppView.Home)} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo-btn"
          >
            <div className="h-10 w-10 bg-white text-black flex items-center justify-center font-bold text-lg tracking-wider transition-all duration-300 group-hover:bg-neutral-200">
              YMT
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-widest text-white group-hover:text-neutral-300 transition-colors">
                AUTO TRADING
              </span>
              <p className="font-mono text-[9px] tracking-widest text-[#888888]">
                MYANMAR • LUXURY & QUALITY
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12" id="desktop-nav-menu">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-item-${item.view}`}
                  onClick={() => onViewChange(item.view)}
                  className={`relative py-2 text-xs ltr tracking-widest font-medium transition-all duration-300 hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-[#A0A0A0]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={`tel:${siteSettings.phoneRaw}`}
              className="flex items-center space-x-2 px-4 py-2 border border-[#333333] hover:border-neutral-500 rounded-none bg-[#1A1A1A] text-xs font-mono tracking-widest transition-all duration-300"
              id="cta-tel-button"
            >
              <Phone className="h-3 w-3" />
              <span>{siteSettings.phone}</span>
            </a>
            <button 
              onClick={() => onViewChange(AppView.Contact)}
              className="px-5 py-2.5 bg-white text-black text-xs tracking-widest font-semibold hover:bg-neutral-200 transition-all duration-300"
              id="cta-contact-button"
            >
              BOOK CALLBACK
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#161616] border-b border-[#262626]" id="mobile-menu-drawer">
          <div className="px-2 pt-3 pb-6 space-y-2 sm:px-3 text-center">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`mobile-nav-item-${item.view}`}
                  onClick={() => {
                    onViewChange(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full py-3.5 text-center text-xs tracking-widest font-medium transition-all duration-300 ${
                    isActive ? 'bg-[#222222] text-white font-semibold' : 'text-[#999999] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-[#262626] flex flex-col space-y-3 px-4">
              <a 
                href={`tel:${siteSettings.phoneRaw}`}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#1F1F1F] text-xs font-mono tracking-widest text-[#CCCCCC]"
                id="mobile-tel-link"
              >
                <Phone className="h-3 w-3" />
                <span>CALL: {siteSettings.phone}</span>
              </a>
              <button 
                onClick={() => {
                  onViewChange(AppView.Contact);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-white text-black text-xs font-semibold tracking-widest hover:bg-neutral-200 transition-all duration-300"
                id="mobile-callback-btn"
              >
                BOOK CALLBACK
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
