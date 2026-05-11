import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://w2w-backend-k76m.onrender.com';
const PickupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // MACHI: Inga dhaan email logic-ah fix panrom
  // Local storage-la 'userEmail' irukkandhu check pannunga. Login-la enna key kudutheengalo adhey key-ah inga use pannanum.
  const storedEmail = localStorage.getItem('userEmail') || ''; 

  const wasteType = location.state?.type || "General Waste";
  const estimatedValue = location.state?.estimatedValue || 0;
  const orderType = location.state?.orderType || 'pickup';
  const calculatorItems = location.state?.items || [];

  const [formData, setFormData] = useState({
    name: '',
    email: storedEmail, 
    phone: '',
    address: '',
    pickupDate: '',
    pickupTime: 'morning'
  });

  // Email state-ah auto-fill panna indha useEffect
  useEffect(() => {
    if (storedEmail) {
      setFormData(prev => ({ ...prev, email: storedEmail }));
    }
  }, [storedEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety Check: Email illama store panna history-la pakka mudiyadhu
    if (!formData.email) {
      alert("Machi, Email ID illa! Login pannittu vaa da.");
      return;
    }

    try {
      const pickupData = {
        email: formData.email, // IDHU THAAN HISTORY FILTER KEY
        description: `${wasteType} Calculator Pickup`,
        amount: parseFloat(estimatedValue),
        address: `${formData.address} | Date: ${formData.pickupDate} | Time: ${formData.pickupTime} | Ph: ${formData.phone}`,
        paymentMethod: "Cash on Collection",
        orderType: orderType, 
        items: calculatorItems.length > 0 ? calculatorItems : [{
          name: wasteType,
          price: parseFloat(estimatedValue),
          quantity: 1
        }]
      };

      // Backend call
      await axios.post(`${API_URL}/api/orders`, pickupData);

      alert(`Machi! Pickup Scheduled for ${wasteType} ✅\nData stored for: ${formData.email}`);
      
      // History-ku redirect aagumbodhu logic refresh aagum
      navigate('/history');
    } catch (err) {
      console.error("Pickup Save Error:", err);
      alert("Database-la store aaga maattiku machi! Backend terminal-ah paaru.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        <div className="bg-green-600 py-8 px-8 text-center text-white">
          <h2 className="text-3xl font-black tracking-tight uppercase italic">Pickup Details 🚛</h2>
          <div className="mt-2 inline-block bg-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {wasteType} Collection
          </div>
          {estimatedValue !== 0 && (
            <p className="mt-3 text-green-100 font-medium">Payout Value: <span className="text-white font-black text-xl">INR {estimatedValue}</span></p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
            <input 
              type="text" required placeholder="Enter your name"
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Email ID (Must match login email)</label>
            <input 
              type="email" required placeholder="name@example.com"
              value={formData.email}
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Phone Number</label>
            <input 
              type="tel" required placeholder="+91 XXXXX XXXXX"
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Address</label>
            <textarea 
              required rows="2" placeholder="Where should we pick up?"
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Date</label>
              <input 
                type="date" required
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold text-xs"
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Slot</label>
              <select 
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white outline-none transition-all font-bold text-xs"
                onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-950 hover:bg-green-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all active:scale-95 mt-4 uppercase tracking-[0.2em] text-xs"
          >
            Confirm Pickup ⚡
          </button>
        </form>
      </div>
    </div>
  );
};

export default PickupForm;