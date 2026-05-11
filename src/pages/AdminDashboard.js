import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://w2w-backend-k76m.onrender.com';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState({});

  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', category: 'Metal', imageUrl: '', stock: 10
  });

  const navigate = useNavigate();

  // --- 1. DATA FETCHING LOGIC ---
  const fetchData = useCallback(async () => {
    if (loading) return; 
    setLoading(true);
    try {
      const ordersRes = await axios.get(`${API_URL}/api/orders/admin/all-orders`);
      const messagesRes = await axios.get(`${API_URL}/api/admin/messages`).catch(() => ({ data: [] }));
      const productsRes = await axios.get(`${API_URL}/api/products`).catch(() => ({ data: [] }));
      
      setOrders(ordersRes.data);
      setMessages(messagesRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error("System Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== 'thulasirajan663@gmail.com') {
      alert("Unauthorized Access: Administrator privileges required! 🛑");
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate, fetchData]); 

  // --- 2. LIVE IMPACT ANALYTICS LOGIC ---
  const calculateDetailedImpact = () => {
    const completed = orders.filter(o => o.orderType === 'pickup' && o.status === 'Completed');
    const totalWaste = completed.length * 5;
    const breakdown = completed.reduce((acc, order) => {
      const cat = order.description || 'General Waste';
      acc[cat] = (acc[cat] || 0) + 5; 
      return acc;
    }, {});
    return {
      pickups: completed.length,
      waste: totalWaste,
      trees: (totalWaste * 0.2).toFixed(1),
      categoryData: Object.entries(breakdown) 
    };
  };

  const detailedImpact = calculateDetailedImpact();

  // --- 3. ADMINISTRATIVE ACTIONS ---
  const updateStatus = async (id, newStatus) => {
    if (!newStatus) return;
    try {
      await axios.put(`${API_URL}/api/orders/admin/update-status/${id}`, { status: newStatus });
      alert(`Status updated to ${newStatus}. User notified.`);
      fetchData(); 
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handleReply = async (msg) => {
    const text = replyText[msg._id];
    if (!text) return alert("Please enter a response.");

    try {
      const res = await axios.post(`${API_URL}/api/admin/reply-message`, {
        messageId: msg._id, 
        email: msg.email,
        name: msg.name,
        message: msg.message,
        replyText: text
      });
      
      if (res.status === 200) {
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isReplied: true } : m));
        alert("Response sent! Status: SENDED ✅");
        setReplyText(prev => ({ ...prev, [msg._id]: '' }));
      }
    } catch (err) {
      alert("System Error: Reply failed.");
    }
  };

  const deleteQuery = async (id) => {
    if(!window.confirm("Permanently delete this from storage?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/message/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
      alert("Purged from Database! ✅");
    } catch (err) {
      console.error(err);
      alert("Delete failed. Check backend connection.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/products/add`, productForm);
      alert("Product added successfully.");
      setProductForm({ name: '', description: '', price: '', category: 'Metal', imageUrl: '', stock: 10 });
      fetchData();
    } catch (err) {
      alert("Error adding product.");
    }
  };

  const deleteProduct = async (id) => {
    if(window.confirm("Permanently delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchData();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-10 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
          <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
            W2W <span className="text-green-600">Command Center</span> 🛠️
          </h1>
          <button onClick={fetchData} disabled={loading} className={`bg-gray-950 text-white px-6 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${loading ? 'opacity-50' : 'hover:bg-green-600'}`}>
            {loading ? 'Syncing...' : 'Sync Database 🔄'}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 bg-white p-3 rounded-[2rem] shadow-sm w-fit border border-gray-100">
          {['orders', 'queries', 'products', 'eco'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>
              {tab === 'orders' ? 'Orders' : tab === 'queries' ? 'User Queries' : tab === 'products' ? 'Inventory' : 'Eco Analytics'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-gray-50 min-h-[400px]">
            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400 tracking-widest font-black">
                      <th className="pb-6">Customer</th>
                      <th className="pb-6">Description</th>
                      <th className="pb-6 text-center">Type</th>
                      <th className="pb-6">Status</th>
                      <th className="pb-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold text-gray-700">
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-6 font-black text-[10px]">{order.email}</td>
                        <td className="py-6 uppercase">{order.description}</td>
                        <td className="py-6 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${order.orderType === 'pickup' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                            {order.orderType === 'pickup' ? '🚛 Pickup' : '🛍️ Shop'}
                          </span>
                        </td>
                        <td className="py-6">
                          <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase ${order.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6 text-right">
                          <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="bg-gray-950 text-white border-none rounded-xl p-2 text-[9px] font-black uppercase cursor-pointer hover:bg-green-600">
                            <option value="">Update</option>
                            <option value="Verified">Verified ✅</option>
                            <option value="On the Way">On the Way 🚛</option>
                            <option value="Completed">Completed 🎖️</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'queries' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {messages.length > 0 ? messages.map((msg) => (
                  <div key={msg._id} className={`p-8 rounded-[2.5rem] border-2 shadow-sm flex flex-col transition-all duration-300 ${msg.isReplied ? 'bg-green-50/40 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-gray-950 uppercase text-xs mb-1">{msg.name}</h4>
                        <p className="text-[10px] text-green-600 font-bold italic">{msg.email}</p>
                      </div>
                      <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-colors ${msg.isReplied ? 'bg-green-600 text-white' : 'bg-orange-100 text-orange-600'}`}>
                        {msg.isReplied ? 'Sended' : 'New Query'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 font-medium bg-white p-4 rounded-2xl mb-6 shadow-inner italic">"{msg.message}"</p>

                    <div className="mt-auto space-y-3">
                      {!msg.isReplied && (
                        <>
                          <textarea placeholder="Type your reply..." className="w-full p-4 rounded-2xl outline-none text-xs font-bold border-2 border-transparent focus:border-green-600 bg-white shadow-sm" value={replyText[msg._id] || ''} onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })} />
                          <button onClick={() => handleReply(msg)} className="w-full bg-gray-950 text-white py-4 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-green-600 transition-all active:scale-95 shadow-lg">Send Reply ⚡</button>
                        </>
                      )}
                      <button onClick={() => deleteQuery(msg._id)} className={`w-full py-3 rounded-xl font-black uppercase text-[8px] tracking-widest transition-all ${msg.isReplied ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-600'}`}>
                        🗑️ Delete Permanently
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center text-gray-300 font-black uppercase tracking-widest text-sm">No queries found! 🎯</div>
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                  <h3 className="font-black text-gray-950 uppercase text-sm mb-6 italic">Registration 📦</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <input type="text" placeholder="NAME" className="w-full p-4 rounded-2xl outline-none font-bold text-xs uppercase" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} required />
                    <textarea placeholder="DESCRIPTION" className="w-full p-4 rounded-2xl outline-none font-bold text-xs uppercase" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} required />
                    <div className="flex gap-4">
                      <input type="number" placeholder="PRICE" className="w-1/2 p-4 rounded-2xl outline-none font-bold text-xs" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} required />
                      <input type="number" placeholder="STOCK" className="w-1/2 p-4 rounded-2xl outline-none font-bold text-xs" value={productForm.stock} onChange={(e) => setProductForm({...productForm, stock: e.target.value})} required />
                    </div>
                    <select className="w-full p-4 rounded-2xl outline-none font-black text-[10px] uppercase bg-white" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                      <option value="Metal">Metal</option><option value="Glass">Glass</option><option value="Plastic">Plastic</option><option value="E-Waste">E-Waste</option><option value="Paper">Paper</option>
                    </select>
                    <input type="text" placeholder="IMAGE URL" className="w-full p-4 rounded-2xl outline-none font-bold text-xs" value={productForm.imageUrl} onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})} required />
                    <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase text-xs shadow-xl hover:bg-gray-950 transition-all">Publish Item 🚀</button>
                  </form>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] overflow-y-auto pr-2">
                  {products.map((p) => (
                    <div key={p._id} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-4 relative group">
                      <img src={p.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                      <div className="flex-1 truncate">
                        <h4 className="font-black text-gray-950 uppercase text-[10px]">{p.name}</h4>
                        <p className="text-[11px] font-black text-green-600">₹{p.price}</p>
                      </div>
                      <button onClick={() => deleteProduct(p._id)} className="bg-red-50 text-red-500 p-3 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ECO ANALYTICS - DESIGN FIXED */}
            {activeTab === 'eco' && (
              <div className="space-y-10 py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-10 bg-green-50 rounded-[3rem] border border-green-100 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md">
                    <span className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-4">Total Pickups 🚛</span>
                    <p className="text-6xl font-black text-green-600">{detailedImpact.pickups}</p>
                  </div>
                  <div className="p-10 bg-orange-50 rounded-[3rem] border border-orange-100 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md">
                    <span className="text-[10px] font-black text-orange-800 uppercase tracking-widest mb-4">Waste KG ⚖️</span>
                    <p className="text-6xl font-black text-orange-600">{detailedImpact.waste}</p>
                  </div>
                  <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md">
                    <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-4">Trees Saved 🌳</span>
                    <p className="text-6xl font-black text-blue-600">{detailedImpact.trees}</p>
                  </div>
                </div>
                {/* Visual Fillers to solve the empty space issue */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-green-400 italic">Carbon Footprint Analysis</h4>
                    <p className="text-xs opacity-70 leading-relaxed font-bold">W2W platform logic consistently monitors the reduction of landfill waste. Current metrics indicate a positive trend in regional recycling efficiency.</p>
                  </div>
                  <div className="bg-green-600 p-10 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 italic">Sustainability Goal</h4>
                    <p className="text-4xl font-black tracking-tighter uppercase italic opacity-20 absolute -right-4 -bottom-4 select-none">W2W 2026</p>
                    <p className="text-xs font-bold leading-relaxed">Every {detailedImpact.waste} KG of waste processed diverts harmful toxins from local ecosystems. Keep it up Admin!</p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;