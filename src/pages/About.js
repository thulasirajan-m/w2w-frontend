import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* --- HERO SECTION WITH OVERLAY GRAPHICS --- */}
        <div className="relative bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl mb-20 text-center overflow-hidden group">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              alt="Green sustainable forest landscape pattern" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase italic">
              About Waste to Worth <span className="text-yellow-300 block not-italic mt-2 text-3xl md:text-4xl font-black tracking-widest">(W2W) ♻️</span>
            </h1>
            <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed font-medium">
              At W2W, we believe that sustainability shouldn't be a luxury. Our mission is to redefine waste by transforming discarded materials into premium, functional assets for your home and lifestyle.
            </p>
          </div>
        </div>

        {/* --- MISSION & VISION GRID WITH HIGH-QUALITY RECYCLING IMAGE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-4 border-green-500 inline-block pb-1">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
              Waste to Worth is more than just an e-commerce platform; it's an absolute movement toward a structural circular economy. We specialize in gathering glass configurations, fabric remnants, and industrial scrap metals—diverting them from landfill overflows and giving them a second life as high-quality infrastructure tools and accessories.
            </p>
            <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
              Every tracking query or request lifecycle you submit helps reduce the global carbon footprint and safeguards a cleaner, greener planet for future generations.
            </p>
          </div>
          
          {/* FIXED: DUMMY EMOJI BLOCK UPGRADED TO AN IMPACTFUL DESIGN IMAGE */}
          <div className="order-1 md:order-2 relative group w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600" 
              alt="Eco-friendly green sorting glass and plastic loop" 
              className="rounded-[2.5rem] shadow-xl border-4 border-gray-50 dark:border-zinc-800 w-full object-cover h-80 group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

        {/* --- WHY CHOOSE W2W CARD TILES SECTION --- */}
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800 shadow-sm mb-20 transition-colors duration-300">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white uppercase tracking-tight mb-16">Why Choose W2W?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Fair Value */}
            <div className="text-center group bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-100/50 dark:border-zinc-800/50 shadow-sm">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform">💰</div>
              <h3 className="font-black text-xl mb-3 text-green-600 dark:text-green-400 uppercase tracking-tight">Fair Value for Waste</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                We collect your waste products and provide an equivalent monetary value in return, ensuring that recycling is rewarding for everyone.
              </p>
            </div>
            
            {/* Environment */}
            <div className="text-center group bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-100/50 dark:border-zinc-800/50 shadow-sm">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform">🛡️</div>
              <h3 className="font-black text-xl mb-3 text-green-600 dark:text-green-400 uppercase tracking-tight">Environmental Protection</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                By systematically collecting and upcycling waste payloads, we actively protect our environment from pollution and landfill blocks.
              </p>
            </div>
            
            {/* Future India */}
            <div className="text-center group bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-100/50 dark:border-zinc-800/50 shadow-sm">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform">🇮🇳</div>
              <h3 className="font-black text-xl mb-3 text-green-600 dark:text-green-400 uppercase tracking-tight">Building Future India</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                Our mission is to build a highly sustainable and waste-free Future India through innovative software systems and citizen coordination.
              </p>
            </div>
          </div>
        </div>

        {/* --- BRAND SLOGAN FOOTER METRICS --- */}
        <div className="text-center py-10 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
          <p className="text-xl md:text-2xl font-black text-green-700 dark:text-green-400 italic tracking-wide uppercase">
            "Transforming what you consider waste into something worthy"
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default About;