import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generateGreenHeroCertificate } from '../utils/SustainabilityCertificate';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://w2w-backend-k76m.onrender.com';
const History = () => {
  const [activeTab, setActiveTab] = useState('pickups');
  const [allOrders, setAllOrders] = useState([]); 
  const [loading, setLoading] = useState(true);

  // User details for default reference
  const userEmail = localStorage.getItem('userEmail') || 'thulasirajan663@gmail.com'; 

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const cleanEmail = userEmail.trim();
        const res = await axios.get(`${API_URL}/api/orders/${cleanEmail}`);
        setAllOrders(res.data);
      } catch (err) {
        console.error("Machi, backend route-la prechana iruku:", err.response?.status);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userEmail]);

  // --- MACHI: LIVE TRACKING STEPPER COMPONENT ---
  const OrderStepper = ({ status }) => {
    const steps = ['Pending Verification', 'Verified', 'On the Way', 'Completed'];
    const currentStepIndex = steps.indexOf(status);

    return (
      <div className="flex items-center w-full max-w-[200px] mx-auto mt-3 mb-1">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center">
              <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                index <= currentStepIndex 
                ? 'bg-green-600 border-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]' 
                : 'bg-white border-gray-200'
              }`}>
                {index <= currentStepIndex && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
              {/* Short label for mobile/table view */}
              <span className={`absolute -bottom-4 text-[6px] font-black uppercase tracking-tighter w-max ${
                index <= currentStepIndex ? 'text-green-700' : 'text-gray-300'
              }`}>
                {step.split(' ')[0]}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] transition-all duration-700 ${
                index < currentStepIndex ? 'bg-green-600' : 'bg-gray-100'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // --- MACHI: Handle Claim Certificate Logic ---
  const handleClaim = async (orderId, activityType) => {
    const fullName = prompt("Certificate-la enna name varanum machi? (E.g., THULASI RAJAN M)");

    if (fullName && fullName.trim() !== "") {
        try {
          const res = await axios.put(`${API_URL}/api/orders/claim-certificate/${orderId}`);
    
          if (res.status === 200) {
            generateGreenHeroCertificate(fullName.trim(), activityType);
    
            setAllOrders(prev => prev.map(order => 
              order._id === orderId ? { ...order, isCertificateClaimed: true } : order
            ));
    
            alert(`Congrats Green Hero! 🎖️ Certificate issued to ${fullName}.`);
          }
        } catch (err) {
          console.error("Claim update error machi:", err);
          alert("Database update failed machi!");
        }
    } else if (fullName === "") {
        alert("Machi, name type panna dhaan certificate generate aagum!");
    }
  };

  // Tab Filtering
  const pickupHistory = allOrders.filter(order => order.orderType === 'pickup');
  const shoppingHistory = allOrders.filter(order => order.orderType === 'shopping');

  // --- MACHI: Eco Impact Logic ---
  const calculateImpact = () => {
    const totalPickups = pickupHistory.length;
    const kgSaved = totalPickups * 5; 
    const treesSaved = (kgSaved * 0.2).toFixed(1); 
    return { kgSaved, treesSaved };
  };

  const { kgSaved, treesSaved } = calculateImpact();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight italic">
            Your W2W Journey 📜
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            Account: {userEmail}
          </p>
        </div>

        {/* Eco Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-green-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">Waste Diverted ♻️</h3>
              <p className="text-5xl font-black mb-1">{kgSaved} <span className="text-xl">KG</span></p>
              <p className="text-xs font-bold opacity-70 italic">Total materials sent for recycling</p>
            </div>
            <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:scale-110 transition-transform">♻️</div>
          </div>

          <div className="bg-gray-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-gray-300 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-green-500">Environmental Impact 🌳</h3>
              <p className="text-5xl font-black mb-1">{treesSaved} <span className="text-xl">Trees</span></p>
              <p className="text-xs font-bold opacity-70 italic">Estimated trees saved from your contributions</p>
            </div>
            <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:scale-110 transition-transform">🌳</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('pickups')}
            className={`px-8 py-4 rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 ${
              activeTab === 'pickups' 
                ? 'bg-green-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-400 hover:bg-gray-100 shadow-sm'
            }`}
          >
            🚛 Pickups ({pickupHistory.length})
          </button>
          <button 
            onClick={() => setActiveTab('shopping')}
            className={`px-8 py-4 rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 ${
              activeTab === 'shopping' 
                ? 'bg-blue-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-400 hover:bg-gray-100 shadow-sm'
            }`}
          >
            🛍️ Orders ({shoppingHistory.length})
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={activeTab === 'pickups' ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">ID / Live Tracking</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Details</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(activeTab === 'pickups' ? pickupHistory : shoppingHistory).map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/80 transition-all text-center">
                    <td className="p-6 w-64">
                        <p className="font-bold text-gray-400 text-[10px] uppercase mb-1">#{item._id.slice(-6)}</p>
                        {/* --- MACHI: THE LIVE STEPPER BAR --- */}
                        <OrderStepper status={item.status || 'Pending Verification'} />
                    </td>
                    <td className="p-6">
                        <p className="font-black text-gray-800 text-sm uppercase tracking-tight text-center">
                            {item.description}
                        </p>
                        <p className={`text-[9px] font-black italic mt-1 uppercase text-center ${activeTab === 'pickups' ? 'text-green-600' : 'text-blue-600'}`}>
                            INR {item.amount.toFixed(2)} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        item.status === 'Completed' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : item.status === 'On the Way' 
                          ? 'bg-blue-100 text-blue-700 border-blue-200' 
                          : 'bg-orange-100 text-orange-700 border-orange-200'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                        {item.status === 'Completed' ? (
                            item.isCertificateClaimed ? (
                              <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-green-100 inline-block">
                                Claimed ✅
                              </span>
                            ) : (
                              <button 
                                  onClick={() => handleClaim(item._id, item.orderType)}
                                  className="bg-gray-900 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
                              >
                                  Claim 🎖️
                              </button>
                            )
                        ) : (
                            <button disabled className="bg-gray-100 text-gray-300 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest cursor-not-allowed">
                                Locked 🔒
                            </button>
                        )}
                    </td>
                  </tr>
                ))}
                {(activeTab === 'pickups' ? pickupHistory : shoppingHistory).length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-20 text-center font-black text-gray-300 uppercase tracking-widest text-xs">
                      {loading ? "Syncing your impact..." : "No history found yet ♻️"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;