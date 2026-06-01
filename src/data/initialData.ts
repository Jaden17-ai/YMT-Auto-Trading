import { Vehicle, SiteSettings } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'mercedes-s-class-black',
    title: 'Mercedes-Benz S-Class S450 L',
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2021,
    price: 185000,
    priceLabel: '$185,000 (Negotiable)',
    mileage: 18450,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mainImage: '/src/assets/images/mercedes_s_class_1780309724650.png',
    galleryImages: [
      '/src/assets/images/mercedes_s_class_1780309724650.png',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    soldStatus: 'Available',
    engineSize: '3.0L Inline-6 Turbo',
    exteriorColor: 'Obsidian Black Metallic',
    interiorColor: 'Nappa Exclusive Black Leather',
    description: 'A masterpiece of automotive luxury. This Obsidian Black Mercedes-Benz S450 L features the premium executive rear seating package, dynamic ambient lighting, Burmester® 3D surround sound system, and Mercedes-Benz driving assistance package. Maintained to pristine standards, single-owner with active service history.'
  },
  {
    id: 'ford-everest-black',
    title: 'Ford Everest Titanium+ 4x4',
    brand: 'Ford',
    model: 'Everest',
    year: 2022,
    price: 92000,
    priceLabel: '$92,000',
    mileage: 26000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mainImage: '/src/assets/images/ford_everest_black_1780309741383.png',
    galleryImages: [
      '/src/assets/images/ford_everest_black_1780309741383.png',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    soldStatus: 'Available',
    engineSize: '2.0L Bi-Turbo Diesel',
    exteriorColor: 'Absolute Black',
    interiorColor: 'Ebony Premium Sport Leather',
    description: 'Uncompromising power and spacious comfort. This top-of-the-line Black Ford Everest Titanium+ 4x4 offers intelligent terrain management system, panoramic sunroof, third-row power-folding seats, and an advanced 12-inch SYNC® 4A infotainment touchscreen. High road clearance makes it perfect for Myanmar terrains.'
  },
  {
    id: 'bmw-5-series-white',
    title: 'BMW 5 Series 530i M Sport',
    brand: 'BMW',
    model: '5 Series',
    year: 2021,
    price: 98000,
    priceLabel: '$98,000 (Viber to Offer)',
    mileage: 12500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mainImage: '/src/assets/images/bmw_5_series_1780309761507.png',
    galleryImages: [
      '/src/assets/images/bmw_5_series_1780309761507.png',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    soldStatus: 'Available',
    engineSize: '2.0L TwinPower Turbo I4',
    exteriorColor: 'Mineral White Metallic',
    interiorColor: 'Cognac Dakota Leather with Contrast Stitching',
    description: 'Exquisite dynamic handling meets executive refinement. Sporting the M Sport aerodynamic design package, 19-inch M light alloy wheels, BMW Live Cockpit Professional, heads-up display, and adaptive LED headlights. Mint condition with remarkably low mileage.'
  },
  {
    id: 'ford-everest-white',
    title: 'Ford Everest Titanium+ 4x2',
    brand: 'Ford',
    model: 'Everest',
    year: 2023,
    price: 87500,
    priceLabel: '$87,500',
    mileage: 9800,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mainImage: '/src/assets/images/ford_everest_white_1780309781988.png',
    galleryImages: [
      '/src/assets/images/ford_everest_white_1780309781988.png',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    soldStatus: 'Available',
    engineSize: '2.0L Single-Turbo Diesel',
    exteriorColor: 'Snowflake White Pearl',
    interiorColor: 'Premium Slate Charcoal Interior',
    description: 'Immaculate near-new condition. The Snowflake White Everest features a highly fuel-efficient single turbo engine, adaptive cruise control, 360-degree camera, wireless charging pad, and spacious smart luggage configurations. An ideal family SUV with premium ride quality.'
  },
  {
    id: 'toyota-land-cruiser-prado',
    title: 'Toyota Land Cruiser Prado TX-L',
    brand: 'Toyota',
    model: 'Prado',
    year: 2019,
    price: 110000,
    priceLabel: '$110,000 (Available Now)',
    mileage: 48000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    soldStatus: 'Available',
    engineSize: '2.7L VVT-i Petrol',
    exteriorColor: 'Super White II',
    interiorColor: 'Beige Premium Comfort Leather',
    description: 'Undisputed pedigree of reliability. This Toyota Vigo-Prado descendant is fully prepared for urban executive driving and rural adventures. Equipped with heated seats, multi-zone automatic climate control, and full-time 4WD.'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'YMT Auto Trading',
  phone: '+95 95088827',
  phoneRaw: '+9595088827',
  viber: '+95 95088827',
  email: 'yemyint88827@gmail.com',
  facebookUrl: 'https://www.facebook.com/share/1BFr9NPGVX/?mibextid=wwXIfr',
  address: 'No.14, Myanmar',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.112345678!2d96.123456789!3d16.812345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ4JzQ0LjQiTiA5NiswNyc0NC40IkU!5e0!3m2!1sen!2smm!4v1700000000000!5m2!1sen!2smm',
  googleMapsShareUrl: 'https://maps.app.goo.gl/96ZgEL7EVe3zzj9k6?g_st=com.google.maps.preview.copy'
};

// Sanity schemas as copyable templates
export const SANITY_SCHEMAS = {
  vehicle: `// schemas/vehicle.js
export default {
  name: 'vehicle',
  title: 'Vehicle Inventory',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Vehicle Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'brand',
      title: 'Brand / Make',
      type: 'string',
      options: {
        list: [
          {title: 'Mercedes-Benz', value: 'Mercedes-Benz'},
          {title: 'BMW', value: 'BMW'},
          {title: 'Ford', value: 'Ford'},
          {title: 'Toyota', value: 'Toyota'},
          {title: 'Honda', value: 'Honda'},
          {title: 'Nissan', value: 'Nissan'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(1990).max(new Date().getFullYear() + 1)
    },
    {
      name: 'price',
      title: 'Price (USD / Lakhs)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'priceLabel',
      title: 'Visible Price Label',
      type: 'string',
      description: 'e.g. "$185,000 (Negotiable)" or "1,200 Lakhs"'
    },
    {
      name: 'mileage',
      title: 'Mileage (Kilometers)',
      type: 'number'
    },
    {
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Octane']
      }
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: ['Automatic', 'Manual']
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'featured',
      title: 'Highlight on Homepage',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'soldStatus',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'Available'},
          {title: 'Sold Out', value: 'Sold'}
        ]
      },
      initialValue: 'Available'
    },
    {
      name: 'mainImage',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'galleryImages',
      title: 'More Photos (Gallery)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'engineSize',
      title: 'Engine Displacement',
      type: 'string',
      description: 'e.g., "3.0L twin-scroll turbo V6"'
    },
    {
      name: 'exteriorColor',
      title: 'Exterior Color',
      type: 'string'
    },
    {
      name: 'interiorColor',
      title: 'Interior Color / Trim',
      type: 'string'
    }
  ]
}`,

inquiry: `// schemas/inquiry.js
export default {
  name: 'inquiry',
  title: 'Customer Leads',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'phoneNumber',
      title: 'Phone / Viber Number',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'interestedVehicle',
      title: 'Interested Vehicle Name',
      type: 'string'
    },
    {
      name: 'interestedVehicleId',
      title: 'Interested Vehicle ID Reference',
      type: 'string'
    },
    {
      name: 'message',
      title: 'Customer Message',
      type: 'text'
    },
    {
      name: 'date',
      title: 'Inquiry Date & Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}`,

siteSettings: `// schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Dealership Settings',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Dealership Name',
      type: 'string',
      initialValue: 'YMT Auto Trading'
    },
    {
      name: 'phone',
      title: 'Display Contact Number',
      type: 'string'
    },
    {
      name: 'viber',
      title: 'Viber Number',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Corporate Email',
      type: 'string'
    },
    {
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Dealership Address',
      type: 'string'
    }
  ]
}`
};

export const DEPLOYMENT_GUIDE_MARKDOWN = `### YMT Auto Trading Production Setup Guide

This website is designed to synchronize effortlessly with **Sanity CMS** and **Make.com (Integromat)** to power a fully automated workflow:
\`\`\`text
Website Inquiry Form  ➔  Sanity Studio CMS  ➔  Make.com Webhook  ➔  Microsoft Excel / Google Sheets
\`\`\`

---

#### Step 1: Deploy Sanity CMS
1. Install Sanity CLI globally on your local machine:
   \`\`\`bash
   npm install -g @sanity/cli
   \`\`\`
2. Initialize your Sanity project in a new directory:
   \`\`\`bash
   sanity init
   \`\`\`
3. Select "Create new project", select default datasets, and write the custom schemas provided in the **CMS Schemas** tab inside your \`/schemas\` folder.
4. Deploy the studio live:
   \`\`\`bash
   sanity deploy
   \`\`\`

#### Step 2: Configure Environment Variables
On your production hosting provider (Vercel, Netlify, or Cloud Run), configure the following keys:
* \`NEXT_PUBLIC_SANITY_PROJECT_ID\`: Your unique project ID from sanity.io
* \`NEXT_PUBLIC_SANITY_DATASET\`: Defaults to \`"production"\`
* \`SANITY_API_WRITE_TOKEN\`: A secure token generated in Sanity Management Dashboard with write access to submit inquiries.
* \`MAKE_WEBHOOK_URL\`: Your target workflow catcher (Viber/SMS alerting, Excel database updates).

#### Step 3: Integrating Make.com (Integromat) to Microsoft Excel
1. Create a free account on **Make.com**.
2. Start a new scenario with two steps:
   * **Webhook (Custom Webhook)**: Copy the webhook URL issued. Fill it on your live site's administrative console or env file to route forms.
   * **Microsoft 365 Excel (Add a Row)**: Authenticate your Microsoft Account, select your workbook (e.g., \`YMT_Leads.xlsx\`), and map the webhook attributes:
     * \`Customer Name\` ➔ \`name\`
     * \`Phone Number\` ➔ \`phone\`
     * \`Vehicle Model\` ➔ \`vehicle\`
     * \`Message\` ➔ \`message\`
     * \`Date\` ➔ \`date\`
3. Set the Scenario to **Run Active**! All vehicle inquiries instantly log to Excel.
`;
