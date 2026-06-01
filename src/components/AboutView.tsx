import React from 'react';
import { ShieldCheck, Flame, Compass, HelpCircle, History, Landmark } from 'lucide-react';

export default function AboutView() {
  const pillars = [
    {
      title: 'TRUST & PROVENANCE',
      desc: 'All luxury imports undergo exhaustive checks to confirm legal import customs duties, clear title registration documents, and verified chassis markings. True luxury starts with complete legal peace of mind.',
      icon: ShieldCheck
    },
    {
      title: 'UNRESTRICTED INSPECTIONS',
      desc: 'Every vehicle in our catalog undergoes an exhaustive 150-point diagnostic inspection. We welcome third-party mechanic inspection reviews anytime for absolute transparency.',
      icon: Flame
    },
    {
      title: 'PREMIUM CUSTOMER EXPERIENCE',
      desc: 'We assist with administrative luxury registration processes, licensing transfers, and insurance bookings in Myanmar. Your purchase experience is as smooth as the drive.',
      icon: Landmark
    }
  ];

  return (
    <div className="bg-[#F8F8F8] text-[#1A1A1A] font-sans pb-16">
      
      {/* Editorial Header Banner */}
      <section className="bg-[#111111] text-white py-24 text-center border-b border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#A0A0A0] uppercase block mb-3">
            ESTABLISHED STANDARDS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            YMT Auto Trading Profile
          </h1>
          <div className="w-12 h-[1px] bg-white mx-auto mb-6" />
          <p className="text-[#888888] text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Myanmar's leading boutique importer of luxurious sedans and rugged family vehicles. We bridge the gap between premium international automotive standards and high-fidelity local requirements.
          </p>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase block">OUR MISSION</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Cultivating Luxury, Ensuring Perfect Provenance.
          </h2>
          
          <div className="w-10 h-[2px] bg-black" />
          
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            At YMT Auto Trading, we reject the high-pressure, budget-dealership blueprint. We believe selecting a vehicle should feel like checking into a luxury hotel. Since our establishment, we have meticulously built our network to import high-quality, select models representing Mercedes-Benz, BMW, and Ford Everest.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Each car is handled as an individual asset, thoroughly detailed, mechanically polished, and custom-presented to the buyer with complete diagnostics reports.
          </p>
        </div>

        {/* Dynamic Styled Block */}
        <div className="bg-white border border-neutral-200 p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-45 h-32 w-32 bg-[#F8F8F8]" />
          <h3 className="text-xs font-bold tracking-widest text-neutral-950 uppercase">THE COVENANT</h3>
          <p className="text-xs font-mono text-neutral-500 leading-relaxed italic">
            "We do not broker volume. We curate quality. Every engine, panel margin, and leather grain must meet the standard before we stamp our brand onto it."
          </p>
          <div className="pt-4 border-t border-neutral-100 flex items-center space-x-3">
            <div className="p-2.5 bg-neutral-900 text-white font-bold text-xs tracking-wider">YMT</div>
            <div>
              <span className="text-xs font-bold block text-neutral-900 font-sans">Ko Ye Myint</span>
              <span className="text-[9px] font-mono tracking-wider text-[#888888]">FOUNDING DIRECTOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">OPERATIONAL FOCUS</span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight mt-1">Our Core Pillars of Conduct</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, index) => (
            <div key={index} className="bg-white border border-neutral-200 p-8 hover:shadow-xs transition-shadow">
              <div className="bg-[#111111] text-white h-10 w-10 flex items-center justify-center mb-6">
                <p.icon className="h-5 w-5" />
              </div>
              <h4 className="text-xs font-bold tracking-wider text-neutral-950 mb-3 font-sans uppercase">
                {p.title}
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Client reassurance */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
        <div className="bg-neutral-900 text-white p-8 sm:p-12">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-4">WANT TO CONSULT AN EXPERT?</h4>
          <p className="text-xs text-[#BCBCBC] max-w-xl mx-auto leading-relaxed mb-6">
            We provide specialized consultation regarding imported luxury car duties, customized chassis procurement files, and long-term fleet pricing. Talk with Ko Ye Myint directly.
          </p>
          <a 
            href="tel:+9595088827"
            className="inline-block px-8 py-3 bg-white text-black text-xs font-mono tracking-widest uppercase font-black hover:bg-neutral-200 transition-colors"
            id="about-hotline-btn"
          >
            CALL +95 95088827
          </a>
        </div>
      </section>

    </div>
  );
}
