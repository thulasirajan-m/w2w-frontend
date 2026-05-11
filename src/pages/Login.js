import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://w2w-backend-k76m.onrender.com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password must be filled machi! 🛑");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      // Storage-la details-ah vachikidalam
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('userName', res.data.user.name);

      window.dispatchEvent(new Event("storage"));
      loginUser(); 

      alert(`Welcome back ${res.data.user.name} ✅`);

      // --- MACHI: THE AUTO-NAVIGATE LOGIC ---
      // Check if the logged-in user is YOU (The Admin)
      if (res.data.user.email === 'thulasirajan663@gmail.com') {
        console.log("Admin detected! Navigating to Command Center...");
        navigate('/admin'); 
      } else {
        // Normal users go to shop as usual
        navigate('/shop');
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed! Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-10 -mt-10"></div>
        
        <div className="relative text-center mb-10">
          
          <Link to="/" className="inline-flex flex-col items-center gap-2 mb-6 group hover:scale-110 transition-transform duration-300">
            <div className="bg-green-600 text-white p-4 rounded-2xl shadow-xl group-hover:bg-gray-950 transition-colors">
              <span className="text-4xl">♻️</span>
            </div>
            <div className="flex flex-col leading-none mt-2">
              <span className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic">W2W</span>
              <span className="text-[10px] font-black text-green-600 tracking-[0.4em] uppercase">Waste To Worth</span>
            </div>
          </Link>

          <h2 className="text-4xl font-black mb-2 text-gray-950 tracking-tighter uppercase italic">
            User <span className="text-green-600">Login</span>
          </h2>
          <div className="h-1.5 w-10 bg-orange-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">
            Sustainable Living Starts Here
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 relative">
          <div>
            <label className="block text-gray-400 font-black uppercase text-[9px] tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 font-bold text-gray-800 outline-none" 
              placeholder="name@example.com" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 font-black uppercase text-[9px] tracking-widest mb-2 ml-1">
              Secret Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 font-bold text-gray-800 outline-none" 
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-950 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-green-600 shadow-xl hover:shadow-green-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            Access My Account ⚡
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-tight">
            New to the W2W family? 
            <Link to="/register" className="ml-2 text-green-600 font-black hover:text-orange-500 transition-colors uppercase italic underline decoration-2 underline-offset-4">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;