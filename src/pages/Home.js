import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
            Waste to Worth (W2W) ♻️
          </h1>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Transforming what you consider waste into something worthy! Join our mission for a cleaner planet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <button className="bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Browse Products
              </button>
            </Link>
            <Link to="/e-waste-calculator">
              <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Recycle & Get Paid 📱
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-green-500 rounded-full opacity-20"></div>
      </section>

      {/* Collection Categories Grid */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Collection Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Glass Collection - Hyperlinked */}
          <Link to="/glass-calculator" className="bg-green-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-shadow text-center group">
            <div className="text-5xl mb-4 group-hover:animate-bounce">🍾</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Glass Collection</h3>
            <p className="text-gray-600">Give us your waste glass bottles and jars. We collect and pay you the fair market value based on weight.</p>
          </Link>

          {/* Fabric Collection - Hyperlinked */}
          <Link to="/fabric-calculator" className="bg-green-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-shadow text-center group">
            <div className="text-5xl mb-4 group-hover:animate-bounce">👖</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Fabric Materials</h3>
            <p className="text-gray-600">Provide your good condition old fabrics and denim. We recycle them responsibly and reward you per kg.</p>
          </Link>

          {/* Metal Collection - Hyperlinked */}
          <Link to="/metal-calculator" className="bg-green-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-shadow text-center group">
            <div className="text-5xl mb-4 group-hover:animate-bounce">⚙️</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Metal Scraps</h3>
            <p className="text-gray-600">Gather your household or industrial metal waste. We weigh it and pay you instantly for the scrap value.</p>
          </Link>
          
          {/* E-Waste Category - Hyperlinked */}
          <Link to="/e-waste-calculator" className="bg-yellow-50 p-8 rounded-3xl border border-yellow-200 hover:shadow-xl transition-shadow text-center group">
            <div className="text-5xl mb-4 group-hover:animate-bounce">📱</div>
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">E-Waste Metals</h3>
            <p className="text-gray-600">Old smartphones and tablets are valuable! We extract precious metals like gold and copper for cash.</p>
          </Link>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Core Process ♻️</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We don't just sell; we collect! Our primary goal is to gather waste directly from the public. 
            By providing your waste materials—be it glass, fabric, or metal—you help protect the environment, 
            and in return, we provide the equivalent monetary amount for every kilogram collected.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;