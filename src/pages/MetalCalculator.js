import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; 

const MetalCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [metalType, setMetalType] = useState('iron');
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(CartContext);

  const rates = {
    iron: 28,      
    steel: 45,     
    aluminum: 120, 
    copper_scrap: 450 
  };

  const calculateAmount = () => {
    let weightInKg = unit === 'tons' ? weight * 1000 : weight;
    let total = weightInKg * rates[metalType];
    return total; // Numeric value calculation-kaga
  };

  const handlePickupNavigation = () => {
    if (!isLoggedIn) {
      alert("First, please login to schedule a Metal scrap pickup 🔒");
      navigate('/login'); 
      return;
    }

    if (weight <= 0) {
      alert("Enter a valid weight");
      return;
    }

    // --- MUKKIYAM: Distinction logic for History Page ---
    navigate('/pickup', { 
      state: { 
        type: `Metal Scraps (${metalType})`, 
        estimatedValue: calculateAmount(),
        // Idhu dhaan History.js-la pickups tab-kulla filter panna help pannum
        orderType: 'pickup',
        items: [{
          name: `Metal Scrap: ${metalType}`,
          price: rates[metalType],
          quantity: parseFloat(weight)
        }]
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-3xl my-10 border border-gray-100 font-sans text-gray-900">
      <h2 className="text-3xl font-black text-gray-800 mb-6 text-center uppercase tracking-tighter italic">
        W2W Metal Scrapyard ⚙️
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-black mb-2 text-gray-700 uppercase text-xs tracking-widest">Type of Metal Waste</label>
          <select 
            onChange={(e) => setMetalType(e.target.value)} 
            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition font-bold text-gray-700 bg-gray-50/30"
          >
            <option value="iron">Iron Scrap (Household/Industrial)</option>
            <option value="steel">Stainless Steel Waste</option>
            <option value="aluminum">Aluminum Utensils/Parts</option>
            <option value="copper_scrap">Heavy Copper Scrap</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-[2]">
            <label className="block font-black mb-2 text-gray-700 uppercase text-xs tracking-widest">Weight of Metal</label>
            <input 
              type="number" 
              placeholder="Enter weight"
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none font-bold text-gray-800" 
            />
          </div>
          <div className="flex-1">
            <label className="block font-black mb-2 text-gray-700 uppercase text-xs tracking-widest">Unit</label>
            <select 
              onChange={(e) => setUnit(e.target.value)} 
              className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none font-bold text-gray-700"
            >
              <option value="kg">Kilograms (KG)</option>
              <option value="tons">Tons</option>
            </select>
          </div>
        </div>

        <div className="bg-orange-600 p-10 rounded-[2.5rem] text-center shadow-lg transform hover:scale-105 transition-all duration-300">
          <p className="text-orange-100 font-black uppercase tracking-[0.2em] mb-2 text-xs">Estimated Scrap Worth</p>
          <h3 className="text-6xl font-black text-white">INR {calculateAmount().toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-orange-200 mt-4 font-bold uppercase tracking-widest italic opacity-80">
            *Market rates updated based on industrial standards.
          </p>
        </div>

        <button 
          onClick={handlePickupNavigation}
          className="w-full bg-gray-950 text-white font-black py-5 rounded-3xl hover:bg-orange-600 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm"
        >
          Schedule Collection ⚡
        </button>
      </div>
    </div>
  );
};

export default MetalCalculator;