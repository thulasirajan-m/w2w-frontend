import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* --- HERO SECTION WITH VISUAL GRAPHICS --- */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-24 px-6 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200" 
            alt="Recycling loops background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10 w-full">
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight uppercase italic">
              Waste to Worth <span className="text-yellow-300 block not-italic mt-2">W2W ♻️</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-xl font-medium leading-relaxed">
              Transforming what you consider waste into something worthy! Provide your scrap materials and secure instant fair-market compensation. Join our mission for a cleaner, greener planet.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <button className="bg-white text-green-700 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:bg-gray-950 hover:text-white transition-all duration-300 active:scale-95">
                  Browse Products
                </button>
              </Link>
              <Link to="/pickup">
                <button className="bg-yellow-400 text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 hover:shadow-2xl transition-all duration-300 active:scale-95">
                  Recycle & Get Paid 💵
                </button>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-yellow-400 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600" 
                alt="Eco Sustainable Scrap Management Presentation" 
                className="rounded-[2.5rem] shadow-2xl border-4 border-white/10 w-full object-cover h-[350px] group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- COLLECTION CATEGORIES GRID WITH CORRECTED PRODUCTION IMAGES --- */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white uppercase tracking-tight">Our Collection Categories</h2>
        <p className="text-center text-gray-500 dark:text-zinc-400 mb-16 font-medium">Select a category to evaluate your structural metrics and generate immediate evaluations.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Glass Collection - FIXED IMAGE */}
          <Link to="/glass-calculator" className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1569075857556-6e707cccc11f?q=80&w=400&auto=format&fit=crop"
                alt="Broken glass shards and bottles recycling bin" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-2xl">🍾</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Glass Collection</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">Give us your waste glass bottles, jars, and broken glass fragments. We collect and pay you the fair market value based on strict weight indices.</p>
              </div>
              <span className="text-xs font-black uppercase text-green-600 dark:text-green-400 tracking-widest mt-6 group-hover:translate-x-2 transition-transform block">Calculate Impact &rarr;</span>
            </div>
          </Link>

          {/* Fabric Collection - FIXED IMAGE */}
          <Link to="/fabric-calculator" className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://plus.unsplash.com/premium_photo-1674719144083-444cfd29c520?q=80&w=400&auto=format&fit=crop"
                alt="Stacked denim fabrics and textile garments" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-2xl">👖</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Fabric Materials</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">Provide your clean old fabrics, worn-out garments, and denim rags. We recycle them responsibly into functional textiles and reward you per kg.</p>
              </div>
              <span className="text-xs font-black uppercase text-green-600 dark:text-green-400 tracking-widest mt-6 group-hover:translate-x-2 transition-transform block">Calculate Impact &rarr;</span>
            </div>
          </Link>

          {/* Metal Collection - FIXED IMAGE */}
          <Link to="/metal-calculator" className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400" 
                alt="Crushed sorted metal scrap wires and cylinders" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-2xl">⚙️</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Metal Scraps</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">Gather your household iron waste, aluminum cans, or industrial metal materials. We weigh it transparently and issue financial compensations instantly.</p>
              </div>
              <span className="text-xs font-black uppercase text-green-600 dark:text-green-400 tracking-widest mt-6 group-hover:translate-x-2 transition-transform block">Calculate Impact &rarr;</span>
            </div>
          </Link>
          
          {/* E-Waste Category - FIXED IMAGE AND LOGIC */}
          <Link to="/e-waste-calculator" className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1550009158-9ebf6d2d216c?auto=format&fit=crop&q=80&w=400" 
                alt="Electronic waste circuit boards and mobile chips components" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-2xl">📱</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">E-Waste Metals</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">Old smartphones, discarded circuit boards, and dead tablets are valuable. We safely process them to extract precious components like copper and gold.</p>
              </div>
              <span className="text-xs font-black uppercase text-green-600 dark:text-green-400 tracking-widest mt-6 group-hover:translate-x-2 transition-transform block">Calculate Impact &rarr;</span>
            </div>
          </Link>

        </div>
      </section>

      {/* --- PROCESS/IMPACT STATEMENT SECTION WITH ILLUSTRATION GRAPHIC --- */}
      <section className="bg-gray-50 dark:bg-zinc-900/50 py-20 px-6 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-sm">
            <img 
              src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&q=80&w=400" 
              alt="Hands holding green recycling symbol plant" 
              className="rounded-3xl shadow-lg border-2 border-white dark:border-zinc-800 w-full object-cover h-[280px]"
            />
          </div>
          <div className="flex-[2] text-left">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-gray-900 dark:text-white uppercase tracking-tight">Our Core Operational Flow ♻️</h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-zinc-400 mb-4 font-medium leading-relaxed">
              We do not just sell; we collect! Our primary mandate is to harvest sustainable waste payloads directly from public domains.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              By inputting your recyclable materials—whether glass configurations, raw fabrics, or industrial scrap metals—you actively mitigate landfill carbon overflows. In return, our software dynamically matches currency allocations to your accounts per kilogram collected.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;