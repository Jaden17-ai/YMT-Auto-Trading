import React, { useState } from 'react';
import { Vehicle, Inquiry, SiteSettings, WebhookLog } from '../types';
import { SANITY_SCHEMAS, DEPLOYMENT_GUIDE_MARKDOWN } from '../data/initialData';
import { 
  FileSpreadsheet, Database, Cpu, Plus, Code, BookOpen, Send, Check, Trash2, 
  ExternalLink, Layers, Play, AlertCircle, FileCode, CheckCircle 
} from 'lucide-react';

interface CmsAdminViewProps {
  vehicles: Vehicle[];
  inquiries: Inquiry[];
  siteSettings: SiteSettings;
  onAddVehicle: (newVehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onUpdateVehicleStatus: (id: string, isSold: boolean) => void;
  onClearInquiries: () => void;
}

export default function CmsAdminView({ 
  vehicles, inquiries, siteSettings, onAddVehicle, onDeleteVehicle, onUpdateVehicleStatus, onClearInquiries 
}: CmsAdminViewProps) {
  
  const [activeTab, setActiveTab] = useState<'leads' | 'catalog' | 'schemas' | 'deploy'>('leads');
  const [selectedSchema, setSelectedSchema] = useState<'vehicle' | 'inquiry' | 'siteSettings'>('vehicle');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Custom Webhook Configuration
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('ymt_webhook_url') || '');
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [isSendingWebhook, setIsSendingWebhook] = useState<string | null>(null);

  // New Vehicle Form State
  const [brand, setBrand] = useState('Toyota');
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2022);
  const [price, setPrice] = useState(75000);
  const [priceLabel, setPriceLabel] = useState('$75,000');
  const [mileage, setMileage] = useState(15000);
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'Octane'>('Petrol');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [engineSize, setEngineSize] = useState('2.5L Hybrid');
  const [exteriorColor, setExteriorColor] = useState('Metallic Silver');
  const [interiorColor, setInteriorColor] = useState('Black Premium Nappa');
  const [description, setDescription] = useState('Pristine imported luxury SUV with complete original import paperwork.');
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(selectedSchema);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !model) return;

    const id = `${brand.toLowerCase()}-${model.toLowerCase()}-${Date.now()}`;
    const newCar: Vehicle = {
      id,
      title,
      brand,
      model,
      year: Number(year),
      price: Number(price),
      priceLabel,
      mileage: Number(mileage),
      fuelType,
      transmission,
      description,
      featured: false,
      soldStatus: 'Available',
      mainImage,
      galleryImages: [mainImage],
      engineSize,
      exteriorColor,
      interiorColor
    };

    onAddVehicle(newCar);
    
    // Clear Form
    setTitle('');
    setModel('');
    setDescription('Pristine imported luxury SUV.');
    alert(`Vehicle "${title}" successfully cataloged into active local state! Check the INVENTORY tab to browse it.`);
  };

  // Perform a real Hook POST dispatch to Make.com / PowerAutomate or mirror to local log terminal
  const handleTriggerWebhook = async (inquiry: Inquiry) => {
    setIsSendingWebhook(inquiry.id);
    const targetUrl = webhookUrl || 'https://hooks.make.com/simulated-ymt-catcher';
    
    const payload = {
      source: 'YMT Auto Trading CMS Studio',
      webhookType: 'Dealership inquiry Booking',
      name: inquiry.customerName,
      phone: inquiry.phoneNumber,
      vehicle: inquiry.interestedVehicleTitle || 'General Information Inquiry',
      message: inquiry.message,
      submittedDate: inquiry.date,
      leadId: inquiry.id
    };

    const newLog: WebhookLog = {
      timestamp: new Date().toLocaleTimeString(),
      url: targetUrl,
      payload,
      status: 'success',
      responseMessage: 'Local Simulation Ok'
    };

    try {
      if (webhookUrl) {
        // Real outbound fetch call respecting No-Mock rules
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          newLog.status = 'success';
          newLog.responseMessage = `Status: ${response.status} (Dispatched Webhook successfully to Maker integrations)`;
        } else {
          newLog.status = 'failure';
          newLog.responseMessage = `Status Error: ${response.status} ${response.statusText}`;
        }
      } else {
        // Simulation delay for clean user experience
        await new Promise(resolve => setTimeout(resolve, 800));
        newLog.responseMessage = 'Dispatched to simulated sandbox logger. Update Webhook URL above to send active data!';
      }
    } catch (err: any) {
      newLog.status = 'failure';
      newLog.responseMessage = `Network error: ${err.message || 'Call failed'}`;
    }

    setWebhookLogs(prev => [newLog, ...prev]);
    setIsSendingWebhook(null);
  };

  const handleSaveWebhookSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ymt_webhook_url', webhookUrl);
    alert('Active webhook URL stored securely in client state!');
  };

  return (
    <div className="bg-[#FAFADA] min-h-screen text-[#1A1A1A] font-sans">
      
      {/* Studio Banner */}
      <div className="bg-[#111111] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-white text-black p-2.5 font-black text-sm tracking-widest">
              YMTS
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Sanity CMS Studio & Webhooks Admin</h1>
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                Developer Sandboxed Workspace • Active State Controllers
              </p>
            </div>
          </div>

          <div className="flex bg-[#1A1A1A] p-1 border border-neutral-800 font-mono text-[10px] tracking-widest">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-2 ${activeTab === 'leads' ? 'bg-white text-black' : 'text-neutral-400'}`}
              id="admin-tab-leads"
            >
              📥 LEADS ({inquiries.length})
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-2 ${activeTab === 'catalog' ? 'bg-white text-black' : 'text-neutral-400'}`}
              id="admin-tab-catalog"
            >
              🚗 MANAGE INVENTORY
            </button>
            <button 
              onClick={() => setActiveTab('schemas')}
              className={`px-3 py-2 ${activeTab === 'schemas' ? 'bg-white text-black' : 'text-neutral-400'}`}
              id="admin-tab-schemas"
            >
              ⚙️ CMS SCHEMAS
            </button>
            <button 
              onClick={() => setActiveTab('deploy')}
              className={`px-3 py-2 ${activeTab === 'deploy' ? 'bg-white text-black' : 'text-neutral-400'}`}
              id="admin-tab-deploy"
            >
              🚀 DEPLOY GUIDE
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== TAB 1: LEADS INBOX & WEBHOOK DISPATCH ==================== */}
        {activeTab === 'leads' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Real Webhook config */}
            <div className="bg-white border border-neutral-200 p-6 md:p-8">
              <div className="flex items-center space-x-3 pb-4 border-b border-neutral-150 mb-6">
                <FileSpreadsheet className="h-5 w-5 text-neutral-800" />
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  ACTIVE WEBHOOK SETUP: MAKE.COM ➔ INTEGRATIONS ➔ EXCEL
                </h3>
              </div>

              <form onSubmit={handleSaveWebhookSettings} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
                <div className="md:col-span-3">
                  <label className="block text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                    Custom Webhook Endpoint URL (Vercel, Make, Power Automate)
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://hooks.make.com/xxxxxxxxxxxxxxxxxxxxxxxx"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-neutral-200 py-3 px-4 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-400"
                    id="admin-webhook-url-input"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full h-[46px] bg-[#111111] hover:bg-black text-white font-bold text-[10px] tracking-widest uppercase rounded-none"
                    id="admin-save-webhook-btn"
                  >
                    SAVE WEBHOOK
                  </button>
                </div>
              </form>
              <p className="text-[10px] text-neutral-500 font-sans mt-3 leading-relaxed">
                * Note: Paste your active Make.com webhook URL here. When customers file inquiries, you can trigger data flow directly to Excel! If left blank, dispatches are simulated safely.
              </p>
            </div>

            {/* General Lead Inquiry Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Leady Table */}
              <div className="lg:col-span-2 bg-white border border-neutral-200 p-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                    CUSTOMER LEADS INBOX ({inquiries.length})
                  </h3>
                  {inquiries.length > 0 && (
                    <button
                      onClick={onClearInquiries}
                      className="text-[9px] font-mono tracking-widest text-[#990000] hover:underline uppercase"
                      id="clear-inquiries-btn"
                    >
                      FLUSH INBOX
                    </button>
                  )}
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-16 text-neutral-400">
                    <Database className="h-10 w-10 mx-auto opacity-30 mb-3" />
                    <p className="text-xs font-semibold uppercase tracking-widest">No Active Inquiries Currently Cached</p>
                    <p className="text-[10px] text-neutral-500 font-serif leading-relaxed mt-2 max-w-xs mx-auto">
                      Go to the HOME page or VEHICLE DETAILS tab, fill out an inquiry form, and witness data captured instantly here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2" id="leads-list">
                    {inquiries.map((inquiry) => (
                      <div 
                        key={inquiry.id} 
                        className="border border-neutral-200 p-5 space-y-3 bg-[#FCFCFC] relative"
                        id={`lead-item-${inquiry.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-sans font-bold text-xs text-neutral-900">
                              {inquiry.customerName}
                            </span>
                            <span className="block font-mono text-[9px] text-[#888888] mt-0.5">
                              {inquiry.phoneNumber}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-neutral-400">{inquiry.date}</span>
                        </div>

                        {inquiry.interestedVehicleTitle && (
                          <div className="bg-neutral-100 px-3 py-1.5 text-[10px] font-mono text-neutral-700">
                            Vehicle Name: <span className="font-bold text-neutral-950">{inquiry.interestedVehicleTitle}</span>
                          </div>
                        )}

                        <p className="text-xs text-neutral-600 italic leading-relaxed font-sans border-l-2 border-neutral-300 pl-3">
                          "{inquiry.message}"
                        </p>

                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <span className="text-[9px] font-mono bg-green-50 text-green-700 rounded-none px-2 py-0.5 font-bold">
                            SIMULATED IN SANITY
                          </span>
                          
                          <button
                            onClick={() => handleTriggerWebhook(inquiry)}
                            disabled={isSendingWebhook === inquiry.id}
                            className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-[9px] tracking-widest font-mono uppercase font-bold flex items-center space-x-1 border-none disabled:opacity-40"
                            id={`webhook-trigger-btn-${inquiry.id}`}
                          >
                            <Send className="h-3 w-3 shrink-0" />
                            <span>
                              {isSendingWebhook === inquiry.id 
                                ? 'TRANSMITTING...' 
                                : 'TRIGGER TEST WEBHOOK (MAKE)'}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Webhook Execution Log Terminal */}
              <div className="bg-neutral-950 text-neutral-400 p-6 border border-neutral-900 font-mono text-xs flex flex-col justify-between h-[582px]">
                <div>
                  <div className="flex items-center space-x-2 pb-3 border-b border-neutral-900 mb-4">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                    <span className="text-[10px] text-white tracking-widest uppercase font-black">
                      WEBHOOK SENT RESPONSE TERMINAL
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                    {webhookLogs.length === 0 ? (
                      <div className="text-center py-20 text-neutral-600 font-sans text-[11px] leading-relaxed">
                        <Play className="h-8 w-8 mx-auto opacity-20 mb-3 text-neutral-500" />
                        Awaiting Webhook triggers.<br/> Click "TRIGGER TEST WEBHOOK" on any customer block to output outbound tracking records.
                      </div>
                    ) : (
                      webhookLogs.map((log, index) => (
                        <div key={index} className="border-b border-neutral-900 pb-4 space-y-2">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-neutral-500">{log.timestamp}</span>
                            <span className={`${log.status === 'success' ? 'text-green-500' : 'text-red-500'} font-bold`}>
                              [{log.status.toUpperCase()}]
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-neutral-400 font-mono truncate">
                            URL: <span className="text-white">{log.url}</span>
                          </p>
                          
                          <div className="bg-[#111111] p-3 text-[9px] text-[#A6E22E] rounded-none overflow-x-auto">
                            <pre>{JSON.stringify(log.payload, null, 2)}</pre>
                          </div>
                          
                          <p className="text-[10px] font-sans text-neutral-400">
                            Result: <span className="text-neutral-300 font-semibold">{log.responseMessage}</span>
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-900 text-[10px] text-neutral-500 font-mono">
                  PAYLOAD DISPATCH: ACTIVE • RE-TRY CAPABILITY
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: LIVE CATALOG EDITOR ==================== */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in" id="catalog-tab-content">
            
            {/* Create Car Form */}
            <div className="bg-white border border-neutral-200 p-6 md:p-8" id="add-vehicle-section">
              <div className="flex items-center space-x-3 pb-4 border-b border-neutral-100 mb-6">
                <Plus className="h-5 w-5 text-neutral-900" />
                <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                  ADD NEW VEHICLE TO ACTIVE COLLECTION
                </h3>
              </div>

              <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs font-sans text-[#555555]">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Brand</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none"
                    >
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="BMW">BMW</option>
                      <option value="Ford">Ford</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Nissan">Nissan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Model Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Prado TX-L"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs focus:outline-none focus:border-neutral-500 rounded-none text-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Visible Showcase Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Toyota LC Prado TX-L Deluxe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs focus:outline-none focus:border-neutral-500 rounded-none text-neutral-950"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Year</label>
                    <input
                      required
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none text-neutral-955"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Price (USD)</label>
                    <input
                      required
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none text-neutral-955"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Label Text</label>
                    <input
                      required
                      type="text"
                      value={priceLabel}
                      onChange={(e) => setPriceLabel(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs focus:outline-none focus:border-neutral-500 rounded-none text-neutral-955"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Mileage (KM)</label>
                    <input
                      required
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none text-neutral-955"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Fuel</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value as any)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                      <option value="Octane">Octane</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Gearbox</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as any)}
                      className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Main Image Photo URL</label>
                  <input
                    required
                    type="text"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs font-mono focus:outline-none focus:border-neutral-500 rounded-none text-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-mono tracking-widest uppercase text-[#999999] mb-1">Short Narrative Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-neutral-200 p-2 text-xs focus:outline-none focus:border-neutral-500 rounded-none text-neutral-955"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#111111] hover:bg-black text-white font-extrabold text-[10px] tracking-widest uppercase transition-all rounded-none"
                  id="admin-submit-new-car-btn"
                >
                  SAVE CAR TO CATALOG
                </button>
              </form>
            </div>

            {/* Catalog Grid status toggling and row list */}
            <div className="lg:col-span-2 bg-white border border-neutral-200 p-6 md:p-8 space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111] pb-4 border-b border-neutral-100">
                ACTIVE VEHICLES CATALOG RECORDS ({vehicles.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs" id="admin-catalog-table">
                  <thead>
                    <tr className="border-b border-neutral-250 text-neutral-500 uppercase tracking-widest text-[9px] font-mono">
                      <th className="py-3 pr-2">Vehicle Specification</th>
                      <th className="py-3">Details</th>
                      <th className="py-3 text-center">Status</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((car) => (
                      <tr key={car.id} className="border-b border-neutral-100 hover:bg-[#F9F9F9]" id={`admin-table-item-${car.id}`}>
                        <td className="py-4 pr-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={car.mainImage}
                              alt={car.title}
                              className="h-10 w-14 object-cover border border-neutral-200"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="font-bold text-neutral-900 block truncate max-w-[150px]">{car.title}</span>
                              <span className="text-[10px] font-mono text-neutral-400 block">{car.brand} • {car.year}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="block font-semibold text-neutral-900">{car.priceLabel}</span>
                          <span className="block font-mono text-[10px] text-neutral-500">{car.mileage.toLocaleString()} KM</span>
                        </td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => onUpdateVehicleStatus(car.id, car.soldStatus === 'Available')}
                            className={`px-2.5 py-1 text-[9px] font-bold rounded-none uppercase transition-colors ${
                              car.soldStatus === 'Available'
                                ? 'bg-green-50 text-green-700 border border-green-250 hover:bg-green-100'
                                : 'bg-red-50 text-red-700 border border-red-250 hover:bg-red-100'
                            }`}
                            id={`status-toggle-btn-${car.id}`}
                          >
                            {car.soldStatus === 'Available' ? 'AVAILABLE' : 'SOLD OUT'}
                          </button>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => onDeleteVehicle(car.id)}
                            className="p-2 text-neutral-400 hover:text-red-650 transition"
                            title="Delete car"
                            id={`delete-catalog-btn-${car.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: COPYABLE SANITY SCHEMAS ==================== */}
        {activeTab === 'schemas' && (
          <div className="bg-white border border-neutral-200 p-6 md:p-8 space-y-6 animate-fade-in" id="schemas-tab-content">
            <div className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Code className="h-5 w-5 text-neutral-900" />
                <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                  DEVELOPER SANITY CMS SCHEMAS
                </h3>
              </div>

              <div className="flex space-x-2 font-mono text-[9px] tracking-wider uppercase">
                <button
                  onClick={() => setSelectedSchema('vehicle')}
                  className={`px-3 py-1.5 border transition ${
                    selectedSchema === 'vehicle' ? 'bg-black text-white border-black' : 'border-neutral-250 text-neutral-600 hover:bg-[#F9F9F9]'
                  }`}
                  id="schema-select-vehicle-btn"
                >
                  vehicle.js
                </button>
                <button
                  onClick={() => setSelectedSchema('inquiry')}
                  className={`px-3 py-1.5 border transition ${
                    selectedSchema === 'inquiry' ? 'bg-black text-white border-black' : 'border-neutral-250 text-neutral-600 hover:bg-[#F9F9F9]'
                  }`}
                  id="schema-select-inquiry-btn"
                >
                  inquiry.js
                </button>
                <button
                  onClick={() => setSelectedSchema('siteSettings')}
                  className={`px-3 py-1.5 border transition ${
                    selectedSchema === 'siteSettings' ? 'bg-black text-white border-black' : 'border-neutral-250 text-neutral-600 hover:bg-[#F9F9F9]'
                  }`}
                  id="schema-select-settings-btn"
                >
                  siteSettings.js
                </button>
              </div>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed max-w-3xl">
              These schemas define the fields inside the live Sanity CMS. Place them in your Sanity studio's <code className="bg-neutral-100 px-1 py-0.5 font-mono text-[11px]">/schemas</code> folder. The React app is constructed to handle queries matching these field constraints precisely.
            </p>

            <div className="relative">
              <button
                onClick={() => handleCopyCode(SANITY_SCHEMAS[selectedSchema])}
                className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white font-mono text-[9px] tracking-widest px-3 py-1.5 border border-neutral-700 flex items-center space-x-1.5"
                id="copy-schema-code-btn"
              >
                {copiedText === selectedSchema ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    <span>COPIED SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <FileCode className="h-3.5 w-3.5" />
                    <span>COPY SCHEMAs CODE</span>
                  </>
                )}
              </button>

              <pre className="bg-[#1E1E1E] text-[#D4D4D4] p-6 text-xs font-mono overflow-auto rounded-none max-h-[500px] border border-neutral-900 leading-relaxed shadow-inner">
                <code>{SANITY_SCHEMAS[selectedSchema]}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: DEPLOY GUIDE ==================== */}
        {activeTab === 'deploy' && (
          <div className="bg-white border border-neutral-200 p-8 sm:p-10 space-y-6 animate-fade-in" id="deploy-tab-content">
            <div className="flex items-center space-x-3 pb-4 border-b border-neutral-100">
              <BookOpen className="h-5 w-5 text-neutral-950" />
              <h3 className="text-xs font-bold tracking-widest uppercase">
                YMT AUTO TRADING DEPLOYMENT & PIPELINE CONFIGURATION
              </h3>
            </div>

            {/* Render formatted markdown guide */}
            <div className="prose prose-sm prose-neutral max-w-3xl font-sans text-xs text-[#444444] leading-relaxed space-y-5">
              
              <div className="bg-[#FAF9F5] border-l-4 border-amber-500 p-4 mb-6">
                <div className="flex space-x-2">
                  <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-900 font-sans leading-relaxed">
                    <strong>Architectural Note:</strong> While our dev playground compiles in clean Single Page Mode for instant, frictionless testing, we are fully loaded with structured schemas and outbound webhook managers enabling real Sanity CMS + Excel production delivery.
                  </p>
                </div>
              </div>

              {/* Step By Steps */}
              <div className="space-y-6">
                
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm tracking-wide mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neutral-400 shrink-0" />
                    <span>1. Build & Serve locally inside AI Studio Container</span>
                  </h4>
                  <p className="pl-6">
                    Our environment runs a rapid build using Tailwind CSS v4 on Port 3000. Any modifications compile instantly for immediate evaluation on both phone sizes and laptop views.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 text-sm tracking-wide mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neutral-400 shrink-0" />
                    <span>2. Establishing Sanity Studio schemas</span>
                  </h4>
                  <p className="pl-6">
                    Create a new folder or connect to your existing account. Copy the exact JS schemas found in the **CMS SCHEMAS** tab into your schemas directory. Run <code className="bg-neutral-100 text-neutral-800 px-1 font-mono">sanity deploy</code> to publish your database cloud.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 text-sm tracking-wide mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neutral-400 shrink-0" />
                    <span>3. Setting Webhook flows in Make.com</span>
                  </h4>
                  <p className="pl-6">
                    Follow standard Make webhook hooks. Choose a Webhook trigger, copy the issued URL into the settings panel on this dashboard, and map incoming attributes directly to Microsoft Excel rows. Trigger test inquiries to confirm logs run 100% green.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 text-sm tracking-wide mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4.5 w-4.5 text-neutral-400 shrink-0" />
                    <span>4. Production Deployment to Vercel</span>
                  </h4>
                  <p className="pl-6">
                    Run <code className="bg-neutral-100 text-neutral-800 px-1 font-mono">npm run build</code> locally to produce standard build assets, then push or link your repository to Vercel for high-performance serverless edge deployment with immediate Global CDNs.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
