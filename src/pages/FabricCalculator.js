import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; 

const FabricCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [fabricType, setFabricType] = useState('denim');
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(CartContext);

  const rates = {
    denim: 15,
    cotton: 10,
    mixed: 5,
    industrial: 8
  };

  const calculateAmount = () => {
    let weightInKg = unit === 'tons' ? weight * 1000 : weight;
    let total = weightInKg * rates[fabricType];
    return total; // Numeric value for state passing
  };

  const handlePickupNavigation = () => {
    if (!isLoggedIn) {
      alert("First, please login to schedule a Fabric waste pickup 🔒");
      navigate('/login'); 
      return;
    }

    if (weight <= 0) {
      alert("Machi, weight konjam enter pannu da!");
      return;
    }

    // --- MUKKIYAM: Pickup type and item details update ---
    navigate('/pickup', { 
      state: { 
        type: `Fabric (${fabricType})`, 
        estimatedValue: calculateAmount(),
        // Idhu dhaan History page separation-ku help pannum
        orderType: 'pickup',
        items: [{
          name: `Fabric Waste: ${fabricType}`,
          price: rates[fabricType],
          quantity: parseFloat(weight)
        }]
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-[2.5rem] my-10 border border-blue-50 font-sans">
      <h2 className="text-3xl font-black text-blue-800 mb-6 text-center uppercase tracking-tighter italic">
        W2W Fabric Value Calculator 👖
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
            Type of Fabric Waste
          </label>
          <select 
            onChange={(e) => setFabricType(e.target.value)} 
            className="w-full p-4 border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none transition font-bold text-gray-700 bg-blue-50/30"
          >
            <option value="denim">Old Denim / Jeans (Good Condition)</option>
            <option value="cotton">Pure Cotton Scrap</option>
            <option value="mixed">Mixed Textile Waste</option>
            <option value="industrial">Industrial Fabric Offcuts</option>
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
              className="w-full p-4 border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none font-black text-gray-800" 
            />
          </div>
          <div className="flex-1">
            <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
              Unit
            </label>
            <select 
              onChange={(e) => setUnit(e.target.value)} 
              className="w-full p-4 border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none font-black text-gray-700"
            >
              <option value="kg">Kilograms (KG)</option>
              <option value="tons">Tons</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-600 p-10 rounded-[3rem] text-center shadow-xl transform hover:scale-105 transition-all duration-300">
          <p className="text-blue-100 font-black uppercase tracking-[0.2em] mb-2 text-xs">Estimated Fabric Worth</p>
          <h3 className="text-6xl font-black text-white">INR {calculateAmount().toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-blue-100 mt-4 font-bold uppercase tracking-widest italic opacity-80">
            *Price provided based on material quality and recycling potential.
          </p>
        </div>

        <button 
          onClick={handlePickupNavigation}
          className="w-full bg-gray-950 text-white font-black py-5 rounded-3xl hover:bg-blue-900 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm"
        >
          Request Fabric Pickup ⚡
        </button>
      </div>
    </div>
  );
};

export default FabricCalculator;