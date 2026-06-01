import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, Fuel, Settings2, Eye, ShieldAlert } from 'lucide-react';

interface InventoryViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (id: string) => void;
  passedFilters?: { brand: string, type: string, maxPrice: number } | null;
  onClearPassedFilters?: () => void;
}

export default function InventoryView({ vehicles, onSelectVehicle, passedFilters, onClearPassedFilters }: InventoryViewProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-asc' | 'price-desc'

  // Load passed filters from Homepage
  useEffect(() => {
    if (passedFilters) {
      if (passedFilters.brand) setSelectedBrand(passedFilters.brand);
      if (passedFilters.maxPrice) setMaxPrice(passedFilters.maxPrice);
      // If type filter was supplied, we filter description or model roughly or match it
      if (passedFilters.type === 'Sedan') {
        setSearchQuery('Sedan');
      } else if (passedFilters.type === 'SUV') {
        setSearchQuery('SUV');
      }
      
      // Cleanup passed filters once loaded in state
      if (onClearPassedFilters) {
        onClearPassedFilters();
      }
    }
  }, [passedFilters, onClearPassedFilters]);

  // Extract unique options for dropdowns dynamically
  const brands = Array.from(new Set(vehicles.map(v => v.brand)));
  const years = Array.from(new Set(vehicles.map(v => v.year))).sort((a, b) => b - a);
  const fuels = ['Petrol', 'Diesel', 'Hybrid', 'Octane'];
  const transmissions = ['Automatic', 'Manual'];

  // Filter application pipeline
  const filteredVehicles = vehicles.filter(vehicle => {
    // Search text matches title, brand, model, description or engine
    const text = searchQuery.toLowerCase();
    const matchesSearch = !text || 
      vehicle.title.toLowerCase().includes(text) ||
      vehicle.brand.toLowerCase().includes(text) ||
      vehicle.model.toLowerCase().includes(text) ||
      vehicle.description.toLowerCase().includes(text) ||
      (vehicle.engineSize && vehicle.engineSize.toLowerCase().includes(text));

    const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;
    const matchesYear = !selectedYear || vehicle.year === Number(selectedYear);
    const matchesPrice = !maxPrice || vehicle.price <= maxPrice;
    const matchesFuel = !selectedFuel || vehicle.fuelType === selectedFuel;
    const matchesTransmission = !selectedTransmission || vehicle.transmission === selectedTransmission;

    return matchesSearch && matchesBrand && matchesYear && matchesPrice && matchesFuel && matchesTransmission;
  });

  // Sorting pipeline
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.year - a.year; // newest year model
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedYear('');
    setMaxPrice(250000);
    setSelectedFuel('');
    setSelectedTransmission('');
    setSortBy('newest');
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#1A1A1A] font-sans pb-16">
      
      {/* Search Header Banner */}
      <div className="bg-[#111111] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Dealership Catalog</h1>
            <p className="text-xs text-neutral-400 mt-1">Browse and filter luxurious new and pre-owned automobiles</p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex space-x-6 text-center text-xs font-mono">
            <div>
              <span className="block text-neutral-500 uppercase tracking-widest text-[9px]">INVENTORY STATUS</span>
              <span className="font-bold text-white text-sm">{vehicles.length} VEHICLES TOTAL</span>
            </div>
            <div className="w-[1px] bg-[#333333]" />
            <div>
              <span className="block text-neutral-500 uppercase tracking-widest text-[9px]">MATCHED HITS</span>
              <span className="font-bold text-white text-sm">{sortedVehicles.length} UNITS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* FILTER PANEL - SIDEBAR (Desktop) / TOP (Mobile) */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 border border-neutral-200" id="filter-sidebar">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <span className="text-xs font-bold tracking-widest uppercase flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>FILTER SUITE</span>
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-mono tracking-widest text-neutral-400 hover:text-black uppercase underline"
                id="reset-filters-btn"
              >
                RESET ALL
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="e.g. S-Class, SUV..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F9F9F9] border border-neutral-200 py-2.5 pl-9 pr-4 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none"
                  id="inventory-text-search-input"
                />
              </div>
            </div>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Brand / Make
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="filter-brand-select"
              >
                <option value="">All Brands</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-mono tracking-widest text-[#666666] uppercase">
                  Max Price Range
                </label>
                <span className="text-xs font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="250000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 appearance-none cursor-pointer accent-[#111111]"
                id="filter-price-slider"
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-400 pt-1">
                <span>$50,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Model Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="filter-year-select"
              >
                <option value="">Any Year</option>
                {years.map(y => (
                  <option key={y} value={y}>{y} Series</option>
                ))}
              </select>
            </div>

            {/* Fuel Type Dropdown */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Fuel Specification
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-500 rounded-none"
                id="filter-fuel-select"
              >
                <option value="">Any Fuel Type</option>
                {fuels.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                Gear Box
              </label>
              <div className="grid grid-cols-2 gap-2">
                {transmissions.map(tx => (
                  <button
                    key={tx}
                    type="button"
                    onClick={() => setSelectedTransmission(selectedTransmission === tx ? '' : tx)}
                    className={`py-2 px-3 border text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                      selectedTransmission === tx 
                        ? 'border-black bg-black text-white' 
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                    id={`filter-transmission-btn-${tx}`}
                  >
                    {tx}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* MAIN CATALOG CATALOG GRID */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sort Toolbar */}
            <div className="bg-white p-4 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between">
              <span className="text-[10px] font-mono text-[#666666] tracking-wider mb-3 sm:mb-0">
                DISPLAYING <span className="font-bold text-black">{sortedVehicles.length}</span> OF {vehicles.length} VEHICLES
              </span>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <ArrowUpDown className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-[#F9F9F9] border border-neutral-200 py-1.5 px-3 text-[10px] font-mono tracking-widest uppercase focus:outline-none focus:border-neutral-500 rounded-none"
                  id="catalog-sort-select"
                >
                  <option value="newest">Newest Model Model</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Cars Index */}
            {sortedVehicles.length === 0 ? (
              <div className="bg-white border border-neutral-200 py-16 px-4 text-center">
                <div className="inline-flex h-12 w-12 bg-neutral-100 items-center justify-center text-neutral-500 mb-4">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-850">No Cars Matched Filters</h3>
                <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
                  We currently do not have matching units in this budget or configuration. Reset filters to view all available luxury vehicles or call us to file a procurement file.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-5 py-2.5 bg-[#111111] text-white text-[10px] tracking-widest uppercase font-semibold hover:bg-neutral-800 transition-colors"
                  id="cards-no-hits-reset-btn"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="inventory-grid">
                {sortedVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    id={`inventory-card-${vehicle.id}`}
                    className="bg-white border border-neutral-200 group flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100">
                      <img
                        src={vehicle.mainImage}
                        alt={vehicle.title}
                        className="w-full h-full object-cover transform duration-500 group-hover:scale-104"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#111111] text-white px-2 py-0.5 text-[8px] font-bold tracking-widest">
                        {vehicle.year}
                      </div>
                      
                      {vehicle.soldStatus === 'Sold' && (
                        <div className="absolute inset-0 bg-[#111111]/70 flex items-center justify-center">
                          <span className="text-white border border-white px-5 py-1.5 tracking-widest text-xs font-extrabold uppercase">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-[9px] font-mono tracking-wider text-neutral-400">
                          <span>{vehicle.brand.toUpperCase()}</span>
                          <span>{vehicle.transmission.toUpperCase()}</span>
                        </div>
                        
                        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-tight mb-2">
                          {vehicle.title}
                        </h3>

                        {/* Specs row */}
                        <div className="flex flex-wrap gap-2 py-3 border-t border-b border-neutral-100 my-3 text-[10px] text-neutral-500 font-mono">
                          <span className="bg-[#F8F8F8] px-2 py-1 rounded-none flex items-center space-x-1 uppercase">
                            <Fuel className="h-3 w-3 inline shrink-0" />
                            <span>{vehicle.fuelType}</span>
                          </span>
                          <span className="bg-[#F8F8F8] px-2 py-1 rounded-none">
                            {vehicle.mileage.toLocaleString()} KM
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div>
                          <span className="block text-[8px] font-mono text-neutral-400 tracking-widest uppercase">ASKING PRICE</span>
                          <span className="text-sm font-black text-[#111111]">{vehicle.priceLabel}</span>
                        </div>
                        
                        <button
                          onClick={() => onSelectVehicle(vehicle.id)}
                          className="px-4 py-2 bg-neutral-900 text-white text-[9px] tracking-widest uppercase font-semibold hover:bg-neutral-700 transition"
                          id={`view-specs-btn-${vehicle.id}`}
                        >
                          SPECIFICATIONS
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
