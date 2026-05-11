import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import panniyaachu machi
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://w2w-backend-k76m.onrender.com';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("Machi, ellaa fields-aiyum fill pannu da! 📋");
      return;
    }

    try {
      // Backend Register API call - 5000 port-la irukka route-ku request anupuroam
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);

      // Success aana backend-lendhu vara success message-ah kaatuvoam
      alert(res.data.msg || "Account created successfully! ✅");
      
      // Register aanavudane login page-ku kootitu poairuvom
      navigate('/login');
    } catch (err) {
      // User already exist-ah irundhaalo illa vera error vandhaalo inga catch aagum
      alert(err.response?.data?.msg || "Registration failed machi! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 transition-all duration-500">
        
        {/* W2W Branding */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-2 text-gray-950 tracking-tighter uppercase italic">
            Join <span className="text-green-600">W2W</span> ♻️
          </h2>
          <div className="h-1.5 w-12 bg-green-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
            Start your upcycling journey
          </p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2 ml-1">
              Full Name
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 font-bold text-gray-800 outline-none" 
              placeholder="Your Full Name" 
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 font-bold text-gray-800 outline-none" 
              placeholder="name@example.com" 
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2 ml-1">
              Create Password
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 font-bold text-gray-800 outline-none" 
              placeholder="••••••••" 
              required
            />
          </div>

          {/* Sign Up Button */}
          <button 
            type="submit"
            className="w-full bg-gray-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 shadow-xl hover:shadow-green-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
          >
            Create My Account ✨
          </button>
        </form>
        
        {/* Footer Link */}
        <div className="mt-10 pt-6 border-t border-gray-50 text-center">
          <p className="text-gray-400 font-bold text-sm">
            Already a member? 
            <Link to="/login" className="ml-2 text-green-600 font-black hover:text-orange-500 transition-colors uppercase tracking-tighter">
              Login Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;