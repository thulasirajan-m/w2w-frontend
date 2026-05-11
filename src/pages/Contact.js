import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'https://w2w-backend-k76m.onrender.com';
const Contact = () => {
  // --- Form State Machi ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '' // Subject field-um sethukalaam
  });
  const [loading, setLoading] = useState(false);

  // Login aagi irundha email auto-ah varum
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend-ku data anupuroam (Namma seththa Nodemailer logic-ku pōgum)
      const res = await axios.post(`${API_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "W2W General Doubt", 
        message: formData.message
      });

      if (res.status === 201) {
        alert("Message saved & Mail sent successfully machi! ✅ Check your inbox.");
        // Form-ah clear panroam (email-ah thavira)
        setFormData({ ...formData, name: '', message: '', subject: '' });
      }
    } catch (err) {
      console.error("Contact error:", err);
      alert("Mail anupa mudiyala! Backend App Password check pannu machi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase tracking-tight italic">
          Contact Us 📞
        </h2>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
          Any feedback or queries, please contact our team!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100 shadow-sm">
            <h3 className="text-xl font-black text-green-800 mb-2 uppercase text-[10px] tracking-[0.2em]">Office Address</h3>
            <p className="text-gray-700 font-medium leading-relaxed">
              W2W Headquarters, 22/88 Anna New Street, Kalugumalai, Thoothukudi district, Tamil Nadu.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100 shadow-sm">
            <h3 className="text-xl font-black text-green-800 mb-2 uppercase text-[10px] tracking-[0.2em]">Email & Phone</h3>
            <p className="text-gray-700 font-bold">thulasirajan663@gmail.com</p>
            <p className="text-gray-700 font-bold">+91 63691 26900</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-[2.5rem] p-8 border border-gray-100 space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all font-bold text-gray-800" 
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all font-bold text-gray-800" 
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Query Topic (Optional)" 
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all font-bold text-gray-800" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4" 
              placeholder="Your Message..." 
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all font-bold text-gray-800"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white font-black py-5 rounded-2xl hover:bg-gray-950 transition-all shadow-xl shadow-green-100 uppercase text-xs tracking-[0.2em] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Sending Mail..." : "Send Message ⚡"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;