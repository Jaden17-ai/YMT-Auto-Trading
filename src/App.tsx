import React, { useState, useEffect } from 'react';
import { AppView, Vehicle, Inquiry, SiteSettings } from './types';
import { INITIAL_VEHICLES, INITIAL_SITE_SETTINGS } from './data/initialData';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import InventoryView from './components/InventoryView';
import VehicleDetailsView from './components/VehicleDetailsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import CmsAdminView from './components/CmsAdminView';
import { Facebook, Clock, Phone, Mail, Compass } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);
  
  // Persisted state loading
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('ymt_vehicles_catalog');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('ymt_customer_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [passedFilters, setPassedFilters] = useState<{ brand: string, type: string, maxPrice: number } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ymt_vehicles_catalog', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('ymt_customer_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // View state modification handlers
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    setCurrentView(AppView.VehicleDetails);
    window.scrollTo(0, 0);
  };

  const handleNavigateToInventory = (filters: { brand: string, type: string, maxPrice: number }) => {
    setPassedFilters(filters);
    setCurrentView(AppView.Inventory);
    window.scrollTo(0, 0);
  };

  const handleClearPassedFilters = () => {
    setPassedFilters(null);
  };

  // State actions on data schemas
  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const handleUpdateVehicleStatus = (id: string, isSold: boolean) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, soldStatus: isSold ? 'Sold' : 'Available' };
      }
      return v;
    }));
  };

  const handleClearInquiries = () => {
    setInquiries([]);
  };

  const handleSubmitInquiry = (rawInquiry: Omit<Inquiry, 'id' | 'date' | 'status' | 'webhookSent'>) => {
    const newInquiry: Inquiry = {
      ...rawInquiry,
      id: `inquiry-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New'
    };

    setInquiries(prev => [newInquiry, ...prev]);
  };

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] text-[#1A1A1A] font-sans selection:bg-neutral-800 selection:text-white">
      
      {/* Universal Sticky Luxury Header */}
      <Navigation 
        currentView={currentView} 
        onViewChange={handleNavigate} 
        siteSettings={INITIAL_SITE_SETTINGS} 
      />

      {/* Main Dynamic View Routing Router viewport */}
      <main className="flex-grow">
        {currentView === AppView.Home && (
          <HomeView
            vehicles={vehicles}
            siteSettings={INITIAL_SITE_SETTINGS}
            onNavigateToInventory={handleNavigateToInventory}
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === AppView.Inventory && (
          <InventoryView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            passedFilters={passedFilters}
            onClearPassedFilters={handleClearPassedFilters}
          />
        )}

        {currentView === AppView.VehicleDetails && (
          <VehicleDetailsView
            vehicle={selectedVehicle}
            siteSettings={INITIAL_SITE_SETTINGS}
            onBackToInventory={() => handleNavigate(AppView.Inventory)}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {currentView === AppView.About && (
          <AboutView />
        )}

        {currentView === AppView.Contact && (
          <ContactView
            siteSettings={INITIAL_SITE_SETTINGS}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {currentView === AppView.CmsAdmin && (
          <CmsAdminView
            vehicles={vehicles}
            inquiries={inquiries}
            siteSettings={INITIAL_SITE_SETTINGS}
            onAddVehicle={handleAddVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onUpdateVehicleStatus={handleUpdateVehicleStatus}
            onClearInquiries={handleClearInquiries}
          />
        )}
      </main>

      {/* Robust Premium Footnotes Footer */}
      <footer className="bg-[#111111] text-white pt-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans text-xs text-[#8E8E8E]">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white text-black flex items-center justify-center font-bold text-xs tracking-widest">
                YMT
              </div>
              <span className="font-sans font-bold text-sm tracking-widest text-white">
                AUTO TRADING
              </span>
            </div>
            <p className="leading-relaxed">
              Myanmar’s supreme boutique importer specializing in premium-tier Mercedes-Benz, BMW, and Ford Everest sedans and multi-row family SUVs.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">DIRECT ACCESS</h4>
            <ul className="space-y-2.5 font-sans font-semibold">
              <li><button onClick={() => handleNavigate(AppView.Home)} className="hover:text-white transition">HAVE A HOME PAGE</button></li>
              <li><button onClick={() => handleNavigate(AppView.Inventory)} className="hover:text-white transition">BROWSE COLLECTION</button></li>
              <li><button onClick={() => handleNavigate(AppView.About)} className="hover:text-white transition">COMPANY PHILOSOPHY</button></li>
              <li><button onClick={() => handleNavigate(AppView.CmsAdmin)} className="hover:text-white transition">SANITY STUDIO CONFIG</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">SHOWROOM TIMES</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-neutral-500" />
                <span>MON - SAT: 9:00 AM - 6:00 PM</span>
              </div>
              <p className="text-[11px] text-neutral-500">Sunday open by appointments only</p>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">CORPORATE REGISTER</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-neutral-500" />
                <a href={`tel:${INITIAL_SITE_SETTINGS.phoneRaw}`} className="hover:text-white transition">{INITIAL_SITE_SETTINGS.phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-neutral-500" />
                <a href={`mailto:${INITIAL_SITE_SETTINGS.email}`} className="hover:text-white transition">{INITIAL_SITE_SETTINGS.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Facebook className="h-4 w-4 text-neutral-500" />
                <a href={INITIAL_SITE_SETTINGS.facebookUrl} className="hover:text-white transition">FaceBook Official</a>
              </div>
            </div>
          </div>

        </div>

        {/* Footnote Trademark Block */}
        <div className="bg-[#0A0A0A] py-6 border-t border-neutral-950 font-mono text-[9px] tracking-widest text-[#555555]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left space-y-3 sm:space-y-0">
            <span>© {new Date().getFullYear()} YMT AUTO TRADING • ALL REGISTERED RIGHTS DESIGNED SECURE</span>
            <span className="text-[8px] text-neutral-600 block">CONNECTED AUTOMATIONS • SANITY STUDIO INTEGRATION V1</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
