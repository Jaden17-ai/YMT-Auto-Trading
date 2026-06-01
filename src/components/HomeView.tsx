import React, { useState } from 'react';
import { Vehicle, SiteSettings, AppView } from '../types';
import { Star, Shield, Award, Sparkles, SlidersHorizontal, ArrowRight, Phone, MessageSquare, MapPin } from 'lucide-react';

interface HomeViewProps {
  vehicles: Vehicle[];
  siteSettings: SiteSettings;
  onNavigateToInventory: (filters: { brand: string, type: string, maxPrice: number }) => void;
  onSelectVehicle: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

export default function HomeView({ vehicles, siteSettings, onNavigateToInventory, onSelectVehicle, onNavigate }: HomeViewProps) {
  // Quick Search state
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(150000);

  // Filter lists derived from initial vehicles
  const brands = Array.from(new Set(vehicles.map(v => v.brand)));
  const types = ['SUV', 'Sedan'];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToInventory({
      brand: selectedBrand,
      type: selectedType,
      maxPrice: selectedBudget
    });
  };

  // Only display featured vehicles
  const featuredVehicles = vehicles.filter(v => v.featured);

  return (
    <div className="bg-[#F8F8F8] text-[#1A1A1A] font-sans">
      
      {/* 1. HERO SECTION WITH IMAGE-GENERATED BACKGROUND */}
      <section className="relative h-[85vh] sm:h-[90vh] bg-neutral-900 overflow-hidden" id="hero-section">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/dealer_hero_1780309707741.png"
            alt="YMT Auto Trading Luxury Showroom"
            className="w-full h-full object-cover opacity-65 transform scale-105 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Luxury dark subtle ambient vertical & horizontal gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-[#111111]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-transparent to-[#111111]/30" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E5E5E5] uppercase font-semibold">
                Myanmar's Premier Car Importer
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Premium New & <br/>
              <span className="text-neutral-400">Used Vehicles</span> in Myanmar
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-[#D0D0D0] max-w-xl font-normal leading-relaxed">
              Discover quality vehicles from trusted brands at YMT Auto Trading. Experience uncompromising luxury, complete transaction transparency, and reliable client service.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={() => onNavigate(AppView.Inventory)}
                className="px-8 py-4 bg-white text-[#111111] font-semibold text-xs tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center space-x-2"
                id="btn-browse-inventory-hero"
              >
                <span>BROWSE INVENTORY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate(AppView.Contact)}
                className="px-8 py-4 bg-transparent border border-white/50 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                id="btn-contact-us-hero"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 hidden lg:block p-8 text-right bg-[#111111] border-t border-l border-neutral-800 text-white font-mono text-[10px] tracking-widest">
          ESTABLISHED PLATFORM • ACTIVE INTEGRATION
        </div>
      </section>

      {/* 2. QUICK SEARCH BAR FLOATING OVERLAY */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 z-10">
        <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 shadow-xl border border-neutral-100 rounded-none">
          <div className="flex items-center space-x-3 pb-6 border-b border-neutral-100">
            <SlidersHorizontal className="h-4 w-4 text-neutral-800" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-800">
              FAST VEHICLE SCOUT
            </h3>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Brand / Make
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="quick-brand-select"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Body Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="quick-type-select"
              >
                <option value="">All Types</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Max Budget (USD)
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="quick-budget-select"
              >
                <option value="200000">Up to $200,000</option>
                <option value="120000">Up to $120,000</option>
                <option value="100000">Up to $100,000</option>
                <option value="90000">Up to $90,000</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#2A2A2A] text-white py-3 px-4 font-bold text-xs tracking-widest uppercase transition-colors rounded-none flex items-center justify-center space-x-2 h-[46px]"
                id="quick-search-submit-btn"
              >
                <span>SEARCH VEHICLES</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. FEATURED SHOWCASE VEHICLES (ONLY REAL VEHICLES CAPTURED WITH GENERATE_IMAGE) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-vehicles-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#888888] uppercase block mb-2">
              EXCLUSIVE HIGHLIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] font-sans">
              Dealership Showcase Vehicles
            </h2>
          </div>
          <button
            onClick={() => onNavigate(AppView.Inventory)}
            className="mt-4 md:mt-0 text-xs font-bold tracking-widest uppercase border-b-2 border-[#111111] py-1 hover:text-[#555555] hover:border-neutral-400 transition-colors"
            id="btn-view-all-featured"
          >
            VIEW ALL INVENTORY
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredVehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              id={`featured-card-${vehicle.id}`}
              className="bg-white border border-neutral-100 group overflow-hidden flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100">
                <img
                  src={vehicle.mainImage}
                  alt={vehicle.title}
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#111111] text-white px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase">
                  {vehicle.year} MODEL
                </div>
                {vehicle.soldStatus === 'Sold' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                    <span className="text-white border-2 border-white px-6 py-2 tracking-widest text-sm font-bold uppercase">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
                      {vehicle.brand}
                    </span>
                    <span className="font-mono text-xs text-[#666666]">
                      {vehicle.mileage.toLocaleString()} KM
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 font-sans group-hover:text-neutral-600 transition-colors">
                    {vehicle.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans line-clamp-2 leading-relaxed mb-6">
                    {vehicle.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                      DEMAND PRICE
                    </span>
                    <span className="text-base font-extrabold text-[#111111]">
                      {vehicle.priceLabel}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="px-5 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase font-semibold hover:bg-neutral-800 transition-colors rounded-none"
                    id={`view-details-featured-${vehicle.id}`}
                  >
                    VIEW SPECIFICATIONS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE YMT AUTO TRADING */}
      <section className="bg-[#111111] text-white py-24 px-4 sm:px-6 lg:px-8" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#CCCCCC] uppercase block mb-3">
              THE BENCHMARK OF QUALITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Why Choose YMT Auto Trading
            </h2>
            <div className="w-12 h-[1px] bg-white mx-auto my-6" />
            <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-normal">
              For several years, we have served as the trusted advisor and prime source for elite automotive imports in Myanmar, ensuring immaculate provenance for every sedan and SUV in our catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#181818] p-8 border border-neutral-900 flex flex-col justify-between hover:border-neutral-800 transition-colors">
              <div>
                <div className="bg-[#222222] text-white h-12 w-12 flex items-center justify-center mb-6">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold tracking-widest uppercase mb-3 text-white">
                  Trusted Dealer
                </h4>
                <p className="text-xs text-[#8E8E8E] leading-relaxed">
                  We verify registration histories and maintenance records thoroughly so you buy with total peace of mind.
                </p>
              </div>
            </div>

            <div className="bg-[#181818] p-8 border border-neutral-900 flex flex-col justify-between hover:border-neutral-800 transition-colors">
              <div>
                <div className="bg-[#222222] text-white h-12 w-12 flex items-center justify-center mb-6">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold tracking-widest uppercase mb-3 text-white">
                  Quality Vehicles
                </h4>
                <p className="text-xs text-[#8E8E8E] leading-relaxed">
                  Strict multicl point inspection protocol before any car enters our collection. Only original quality accepted.
                </p>
              </div>
            </div>

            <div className="bg-[#181818] p-8 border border-neutral-900 flex flex-col justify-between hover:border-neutral-800 transition-colors">
              <div>
                <div className="bg-[#222222] text-white h-12 w-12 flex items-center justify-center mb-6">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold tracking-widest uppercase mb-3 text-white">
                  Premium Service
                </h4>
                <p className="text-xs text-[#8E8E8E] leading-relaxed">
                  Personalized advice, dynamic Viber support channels, and complete assistance with luxury license processing.
                </p>
              </div>
            </div>

            <div className="bg-[#181818] p-8 border border-neutral-900 flex flex-col justify-between hover:border-neutral-800 transition-colors">
              <div>
                <div className="bg-[#222222] text-white h-12 w-12 flex items-center justify-center mb-6">
                  <Star className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold tracking-widest uppercase mb-3 text-white">
                  Curated Catalog
                </h4>
                <p className="text-xs text-[#8E8E8E] leading-relaxed">
                  Featuring the most sought-after imports in Myanmar including Mercedes-Benz, BMW, and robust family-ready Everest SUVs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK CTAs FOR MOBILE FRIENDLY USERS */}
      <section className="bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg font-extrabold text-[#111111] uppercase tracking-wider">
              HAVE A SPECIFIC VEHICLE IN MIND?
            </h3>
            <p className="text-xs text-[#666666] mt-1">
              Contact our sales hotline via Viber or direct Phone call for swift personalized assistance.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href={`tel:${siteSettings.phoneRaw}`}
              className="flex items-center space-x-2 px-5 py-3 bg-[#111111] hover:bg-black text-white text-xs font-mono tracking-widest uppercase font-bold transition-all"
              id="cta-home-tel"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>CALL NOW</span>
            </a>
            <a 
              href={`viber://chat?number=${siteSettings.phoneRaw}`}
              className="flex items-center space-x-2 px-5 py-3 bg-[#6F3E97] hover:bg-[#5E2B85] text-white text-xs font-mono tracking-widest uppercase font-bold transition-all"
              id="cta-home-viber"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>VIBER CHAT</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. GOOGLE MAPS BLOCK */}
      <section className="py-16 bg-white" id="showroom-location-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:pr-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase block mb-2">
              OUR SHOWROOM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-6 font-sans">
              Visit YMT Auto Trading
            </h2>
            <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
              We welcome you to inspect our luxury vehicles in person. Come experience premium design, inspect vehicle condition logs, and conduct secure test drives with our sales associates.
            </p>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-800 tracking-wider">ADDRESS</h4>
                  <p className="text-[#666666] mt-1">{siteSettings.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <Phone className="h-4.5 w-4.5 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-800 tracking-wider">PHONE & VIBER</h4>
                  <p className="text-[#666666] mt-1">{siteSettings.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a 
                href={siteSettings.googleMapsShareUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 border border-neutral-300 text-xs tracking-widest font-bold uppercase text-neutral-800 hover:bg-[#F9F9F9] transition-colors"
                id="maps-share-btn-home"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 h-[350px] w-full bg-neutral-100 border border-neutral-200">
            <iframe 
              src={siteSettings.googleMapsEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="YMT Auto Trading Showroom Map"
              id="google-maps-iframe-home"
              className="grayscale contrast-125 opacity-90"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
