import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; 

const EWasteCalculator = () => {
  const [quantity, setQuantity] = useState(0);
  const [deviceType, setDeviceType] = useState('smartphone');
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(CartContext);

  const rates = {
    smartphone: 150, 
    laptop: 800,     
    battery: 40,     
    motherboard: 250 
  };

  const calculateAmount = () => {
    let total = quantity * rates[deviceType];
    return total; // Formatting ah inga panna venaam, calculation kaga number-ah vachukalaam
  };

  const handlePickupNavigation = () => {
    if (!isLoggedIn) {
      alert("First, please login to schedule an E-Waste pickup 🔒");
      navigate('/login'); 
      return;
    }

    if (quantity <= 0) {
      alert("Machi, atleast 1 item-aachum podu da!");
      return;
    }

    // --- MUKKIYAMANA UPDATE: orderType sethu anupuroam ---
    navigate('/pickup', { 
      state: { 
        type: `E-Waste (${deviceType})`, 
        estimatedValue: calculateAmount(),
        // Idhu dhaan History page-la pickups tab-kulla vara help pannum
        orderType: 'pickup', 
        items: [{
          name: `E-Waste: ${deviceType}`,
          price: rates[deviceType],
          quantity: parseInt(quantity)
        }]
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-[2.5rem] my-10 border border-purple-50 font-sans">
      <h2 className="text-3xl font-black text-purple-800 mb-6 text-center uppercase tracking-tighter italic">
        W2W E-Waste Value Calculator ⚡
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
            Category of Electronic Waste
          </label>
          <select 
            onChange={(e) => setDeviceType(e.target.value)} 
            className="w-full p-4 border-2 border-purple-100 rounded-2xl focus:border-purple-500 outline-none transition font-bold text-gray-700 bg-purple-50/30"
          >
            <option value="smartphone">Smartphones / Tablets</option>
            <option value="laptop">Laptops / CPU Towers</option>
            <option value="motherboard">Circuit Boards / RAM / Motherboards</option>
            <option value="battery">Li-ion / Lead Acid Batteries</option>
          </select>
        </div>

        <div>
          <label className="block font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-gray-400 ml-1">
            Number of Units
          </label>
          <input 
            type="number" 
            placeholder="Enter quantity"
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            className="w-full p-4 border-2 border-purple-100 rounded-2xl focus:border-purple-500 outline-none font-black text-gray-800" 
          />
        </div>

        <div className="bg-purple-600 p-10 rounded-[3rem] text-center shadow-xl transform hover:scale-105 transition-all duration-300">
          <p className="text-purple-100 font-black uppercase tracking-[0.2em] mb-2 text-xs">Estimated E-Waste Worth</p>
          <h3 className="text-6xl font-black text-white">INR {calculateAmount().toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-purple-100 mt-4 font-bold uppercase tracking-widest italic opacity-80">
            *Payout depends on component health and current rare metal market price.
          </p>
        </div>

        <button 
          onClick={handlePickupNavigation}
          className="w-full bg-gray-950 text-white font-black py-5 rounded-3xl hover:bg-purple-700 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm"
        >
          Book E-Waste Pickup ⚡
        </button>
      </div>
    </div>
  );
};

export default EWasteCalculator;