import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// MACHI: Backend link direct-ah kuduthudalam
const API_URL = 'https://w2w-backend-k76m.onrender.com';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP & Reset
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Step 1: Request OTP ---
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      alert(res.data.msg);
      setStep(2); // Move to OTP step
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong machi! ❌");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Reset Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/reset-password`, { 
        email, 
        otp, 
        newPassword 
      });
      alert(res.data.msg);
      navigate('/login'); // Redirect to login
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP or error machi! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        
        {/* Branding */}
        <div className="relative text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center gap-2 mb-6 group">
            <div className="bg-green-600 text-white p-4 rounded-2xl shadow-xl group-hover:bg-gray-950 transition-colors">
              <span className="text-4xl">🔑</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black mb-2 text-gray-950 tracking-tighter uppercase italic">
            Reset <span className="text-green-600">Password</span>
          </h2>
          <div className="h-1.5 w-10 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {step === 1 ? (
          /* STEP 1 FORM */
          <form onSubmit={handleRequestOTP} className="space-y-6">
            <p className="text-gray-500 text-center text-sm font-bold mb-6">
              Enter your registered email to receive a 6-digit OTP.
            </p>
            <div>
              <label className="block text-gray-400 font-black uppercase text-[9px] tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all font-bold text-gray-800" 
                placeholder="machi@example.com" 
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gray-950 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-green-600 shadow-xl transition-all active:scale-95"
            >
              {loading ? "Sending..." : "Send OTP ⚡"}
            </button>
          </form>
        ) : (
          /* STEP 2 FORM */
          <form onSubmit={handleResetPassword} className="space-y-6">
            <p className="text-green-600 text-center text-sm font-bold mb-6">
              OTP sent! Check your email machi. ✅
            </p>
            <div>
              <label className="block text-gray-400 font-black uppercase text-[9px] tracking-widest mb-2 ml-1">
                Enter 6-Digit OTP
              </label>
              <input 
                type="text" 
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all font-bold text-center text-2xl tracking-[0.5em]" 
                placeholder="000000" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 font-black uppercase text-[9px] tracking-widest mb-2 ml-1">
                New Password
              </label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all font-bold" 
                placeholder="••••••••" 
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-gray-950 shadow-xl transition-all active:scale-95"
            >
              {loading ? "Updating..." : "Reset Password 🚀"}
            </button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <Link to="/login" className="text-gray-400 font-black hover:text-green-600 transition-colors uppercase italic text-xs underline underline-offset-4">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;