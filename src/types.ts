export enum AppView {
  Home = 'home',
  Inventory = 'inventory',
  VehicleDetails = 'vehicle-details',
  About = 'about',
  Contact = 'contact',
  CmsAdmin = 'cms-admin'
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number; // USD or lakh MMK
  priceLabel: string; // e.g., "Negotiable" or dynamic currency formatted
  mileage: number; // in km or miles
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'Octane';
  transmission: 'Automatic' | 'Manual';
  description: string;
  featured: boolean;
  soldStatus: 'Available' | 'Sold';
  mainImage: string;
  galleryImages: string[];
  engineSize?: string;
  exteriorColor?: string;
  interiorColor?: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  phoneNumber: string;
  interestedVehicleId?: string;
  interestedVehicleTitle?: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
  webhookSent?: boolean;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  phoneRaw: string; // no spaces for tel: protocol
  viber: string;
  email: string;
  facebookUrl: string;
  address: string;
  googleMapsEmbedUrl: string;
  googleMapsShareUrl: string;
}

export interface WebhookLog {
  timestamp: string;
  url: string;
  payload: any;
  status: 'success' | 'failure';
  responseMessage: string;
}
