import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; 

const GlassCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [glassType, setGlassType] = useState('clear');
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(CartContext);

  const rates = {
    clear: 5,   
    colored: 3, 
    broken: 2   
  };

  const calculateAmount = () => {
    let weightInKg = unit === 'tons' ? weight * 1000 : weight;
    let total = weightInKg * rates[glassType];
    return total; // Numeric value for calculation and state
  };

  const handlePickupNavigation = () => {
    if (!isLoggedIn) {
      alert("First, please login to schedule a Glass waste pickup 🔒");
      navigate('/login'); 
      return;
    }

    if (weight <= 0) {
      alert("Enter a valid weight!");
      return;
    }

    // --- MUKKIYAM: OrderType and Items format update ---
    navigate('/pickup', { 
      state: { 
        type: `Glass (${glassType})`, 
        estimatedValue: calculateAmount(),
        // Distinction logic for History Tab
        orderType: 'pickup',
        items: [{
          name: `Glass Waste: ${glassType}`,
          price: rates[glassType],
          quantity: parseFloat(weight)
        }]
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-[2.5rem] my-10 border border-green-50 font-sans text-gray-900">
      <h2 className="text-3xl font-black text-green-800 mb-6 text-center uppercase tracking-tighter italic">
        W2W Glass Value Calculator 🍾
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
            Type of Glass Waste
          </label>
          <select 
            onChange={(e) => setGlassType(e.target.value)} 
            className="w-full p-4 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none transition font-bold text-gray-700 bg-green-50/30"
          >
            <option value="clear">Clear Glass (Bottles/Jars)</option>
            <option value="colored">Colored Glass (Green/Brown)</option>
            <option value="broken">Mixed/Broken Glass Cullet</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-[2]">
            <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
              Quantity / Weight
            </label>
            <input 
              type="number" 
              placeholder="Enter weight"
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              className="w-full p-4 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none font-black text-gray-800" 
            />
          </div>
          <div className="flex-1">
            <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
              Unit
            </label>
            <select 
              onChange={(e) => setUnit(e.target.value)} 
              className="w-full p-4 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none font-black text-gray-700"
            >
              <option value="kg">Kilograms (KG)</option>
              <option value="tons">Tons</option>
            </select>
          </div>
        </div>

        <div className="bg-green-600 p-10 rounded-[3rem] text-center shadow-xl transform hover:scale-105 transition-all duration-300">
          <p className="text-green-100 font-black uppercase tracking-[0.2em] mb-2 text-xs text-center">Estimated Payout Amount</p>
          <h3 className="text-6xl font-black text-white">INR {calculateAmount().toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-green-100 mt-4 font-bold uppercase tracking-widest italic opacity-80 text-center">
            *Price based on current market recycling rates for {glassType} glass.
          </p>
        </div>

        <button 
          onClick={handlePickupNavigation}
          className="w-full bg-gray-950 text-white font-black py-5 rounded-3xl hover:bg-green-700 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm"
        >
          Book a Pickup & Get Paid ⚡
        </button>
      </div>
    </div>
  );
};

export default GlassCalculator;