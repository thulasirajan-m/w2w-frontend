import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-16">
        
        {/* --- HERO SECTION --- */}
        <div className="bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase italic">
            About Waste to Worth <span className="text-yellow-300 block not-italic mt-2 text-2xl md:text-3xl font-bold tracking-widest">(W2W) ♻️</span>
          </h1>
          <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed font-medium">
            At W2W, we believe that sustainability shouldn't be a luxury. Our mission is to redefine waste by transforming discarded materials into premium, functional products for your home and lifestyle.
          </p>
        </div>

        {/* --- MISSION & VISION SECTION (PURE LAYOUT CLEAN COUPLING) --- */}
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800 transition-colors">
          <div className="max-w-3xl mx-auto space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-4 border-green-500 inline-block pb-1">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
              Waste to Worth is more than just an e-commerce platform; it's a movement toward a circular economy. We specialize in upcycling glass, fabric, and metal waste—diverting them from landfills and giving them a second life as high-quality decor and accessories.
            </p>
            <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
              Every product you purchase helps reduce the global carbon footprint and supports a cleaner, greener planet for future generations.
            </p>
          </div>
        </div>

        {/* --- WHY CHOOSE W2W TILES SECTION (NO IMAGES - PURE EMOJI GRID) --- */}
        <div className="bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-[2rem] border border-transparent dark:border-zinc-800">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white uppercase tracking-tight mb-16">
            Why Choose W2W?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fair Value */}
            <div className="text-center group bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-md">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform select-none">💰</div>
              <h3 className="font-black text-xl mb-3 text-green-700 dark:text-green-400 uppercase tracking-tight">Fair Value for Waste</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                We collect your waste products and provide an equivalent monetary value in return, ensuring that recycling is rewarding for everyone.
              </p>
            </div>

            {/* Environment */}
            <div className="text-center group bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-md">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform select-none">🛡️</div>
              <h3 className="font-black text-xl mb-3 text-green-700 dark:text-green-400 uppercase tracking-tight">Environmental Protection</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                By systematically collecting and upcycling waste, we actively protect our environment from pollution and landfill overflow.
              </p>
            </div>

            {/* Future India */}
            <div className="text-center group bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-md">
              <div className="text-5xl mb-4 group-hover:animate-bounce cursor-default transition-transform select-none">🇮🇳</div>
              <h3 className="font-black text-xl mb-3 text-green-700 dark:text-green-400 uppercase tracking-tight">Building Future India</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                Our mission is to build a sustainable and waste-free Future India through innovative technology and community participation.
              </p>
            </div>
          </div>
        </div>

        {/* --- SLOGAN FOOTER --- */}
        <div className="text-center py-10 border-t border-gray-100 dark:border-zinc-800 transition-colors">
          <p className="text-xl md:text-2xl font-black text-green-800 dark:text-green-400 italic tracking-wide uppercase">
            "Transforming what you consider waste into something worthy"
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;