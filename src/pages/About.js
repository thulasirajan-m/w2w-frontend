import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12">
      {/* Hero Section */}
      <div className="bg-green-700 text-white p-12 rounded-[2rem] shadow-2xl mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6">About Waste to Worth (W2W) ♻️</h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          At W2W, we believe that sustainability shouldn't be a luxury. Our mission is to redefine waste by transforming discarded materials into premium, functional products for your home and lifestyle.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 inline-block">
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Waste to Worth is more than just an e-commerce platform; it's a movement toward a circular economy. We specialize in upcycling glass, fabric, and metal waste—diverting them from landfills and giving them a second life as high-quality decor and accessories.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every product you purchase helps reduce the global carbon footprint and supports a cleaner, greener planet for future generations.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-green-50 h-80 rounded-[2.5rem] flex items-center justify-center text-8xl shadow-inner">
          🌍
        </div>
      </div>

      {/* Why Choose W2W Section */}
      <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose W2W?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Fair Value */}
          <div className="text-center group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform cursor-default">💰</div>
            <h3 className="font-bold text-xl mb-3 text-green-700">Fair Value for Waste</h3>
            <p className="text-gray-500">
              We collect your waste products and provide an equivalent monetary value in return, ensuring that recycling is rewarding for everyone.
            </p>
          </div>
          {/* Environment */}
          <div className="text-center group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform cursor-default">🛡️</div>
            <h3 className="font-bold text-xl mb-3 text-green-700">Environmental Protection</h3>
            <p className="text-gray-500">
              By systematically collecting and upcycling waste, we actively protect our environment from pollution and landfill overflow.
            </p>
          </div>
          {/* Future India */}
          <div className="text-center group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform cursor-default">🇮🇳</div>
            <h3 className="font-bold text-xl mb-3 text-green-700">Building Future India</h3>
            <p className="text-gray-600">
              Our mission is to build a sustainable and waste-free Future India through innovative technology and community participation.
            </p>
          </div>
        </div>
      </div>

      {/* Slogan Footer */}
      <div className="text-center py-10 border-t border-gray-100">
        <p className="text-2xl font-bold text-green-800 italic">
          "Transforming what you consider waste into something worthy"
        </p>
      </div>
    </div>
  );
};

export default About;