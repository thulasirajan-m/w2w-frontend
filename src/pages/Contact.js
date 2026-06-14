import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://w2w-backend-k76m.onrender.com';

const Contact = () => {
  // --- Form State Machi ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
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

      if (res.status === 201 || res.status === 200) {
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto p-2 sm:p-6 font-sans">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-4 uppercase tracking-tight italic">
            Contact Us 📞
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest">
            Any feedback or queries, please contact our team!
          </p>
        </div>

        {/* --- CORE CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* --- LEFT COLUMN: OFFICE CONTACT INFO & MICRO SOCIAL CHANNELS --- */}
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-zinc-900 p-6 rounded-[2rem] border border-green-100 dark:border-zinc-800 shadow-sm transition-colors">
              <h3 className="text-green-800 dark:text-green-400 font-black mb-3 uppercase text-[10px] tracking-[0.2em]">Office Address</h3>
              <p className="text-gray-700 dark:text-zinc-300 font-medium text-sm leading-relaxed">
                W2W Headquarters, 22/88 Anna New Street, Kalugumalai, Thoothukudi district, Tamil Nadu.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-zinc-900 p-6 rounded-[2rem] border border-green-100 dark:border-zinc-800 shadow-sm transition-colors">
              <h3 className="text-green-800 dark:text-green-400 font-black mb-3 uppercase text-[10px] tracking-[0.2em]">Email & Phone</h3>
              <p className="text-gray-700 dark:text-zinc-300 font-bold text-sm">thulasirajan663@gmail.com</p>
              <p className="text-gray-700 dark:text-zinc-300 font-bold text-sm">+91 63691 26900</p>
            </div>

            {/* FIXED: SLEEK MICRO COMMUNICATIONS CHANNELS GRID (SMALL SIZE) */}
            <div className="pt-4 space-y-3">
              <h4 className="text-[10px] font-black uppercase text-gray-400 dark:text-zinc-500 tracking-widest ml-1">Instant Support Channels</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/916369126900" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 p-2 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:scale-[1.02] transition-transform shadow-sm group"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                  <span className="text-[11px] font-black text-gray-700 dark:text-zinc-300 group-hover:text-green-600 transition-colors uppercase tracking-tight">WhatsApp</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 p-2 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:scale-[1.02] transition-transform shadow-sm group"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-4 h-4 object-contain" />
                  <span className="text-[11px] font-black text-gray-700 dark:text-zinc-300 group-hover:text-pink-600 transition-colors uppercase tracking-tight">Instagram</span>
                </a>

                {/* Email Direct */}
                <a 
                  href="mailto:thulasirajan663@gmail.com" 
                  className="flex items-center gap-2.5 p-2 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:scale-[1.02] transition-transform shadow-sm group"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-4 h-4 object-contain" />
                  <span className="text-[11px] font-black text-gray-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors uppercase tracking-tight">Email Admin</span>
                </a>

                {/* Hotline Call */}
                <a 
                  href="tel:+916369126900" 
                  className="flex items-center gap-2.5 p-2 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:scale-[1.02] transition-transform shadow-sm group"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" className="w-4 h-4 object-contain" />
                  <span className="text-[11px] font-black text-gray-700 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">Call Hotline</span>
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTACT INQUIRY FORM LAYOUT --- */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 shadow-2xl rounded-[2.5rem] p-8 border border-gray-100 dark:border-zinc-800 space-y-4 transition-colors">
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-950 border-2 border-transparent focus:border-green-500 dark:focus:border-green-400 outline-none transition-all font-bold text-gray-800 dark:text-zinc-100 text-sm" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-950 border-2 border-transparent focus:border-green-500 dark:focus:border-green-400 outline-none transition-all font-bold text-gray-800 dark:text-zinc-100 text-sm" 
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Query Topic (Optional)" 
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-950 border-2 border-transparent focus:border-green-500 dark:focus:border-green-400 outline-none transition-all font-bold text-gray-800 dark:text-zinc-100 text-sm" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="Your Message..." 
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-950 border-2 border-transparent focus:border-green-500 dark:focus:border-green-400 outline-none transition-all font-bold text-gray-800 dark:text-zinc-100 text-sm resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 text-white font-black py-5 rounded-2xl hover:bg-gray-950 dark:hover:bg-white dark:hover:text-zinc-950 transition-all shadow-xl dark:shadow-none uppercase text-xs tracking-[0.2em] active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending Mail..." : "Send Message ⚡"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;