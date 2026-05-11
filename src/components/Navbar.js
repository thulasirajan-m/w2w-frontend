import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Navbar = () => {
  const { cartItems, logoutUser } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [profilePic, setProfilePic] = useState(localStorage.getItem('userProfilePic') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');

  useEffect(() => {
    const handleStorageChange = () => {
      setUserEmail(localStorage.getItem('userEmail'));
      setUserName(localStorage.getItem('userName'));
      setProfilePic(localStorage.getItem('userProfilePic') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    logoutUser(); 
    setUserEmail(null); 
    setUserName(null);
    alert("Logout Successful! See you soon👋");
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50 h-20 px-6 md:px-12">
      
      {/* --- W2W LOGO --- */}
      <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 group">
        <div className="bg-green-600 text-white p-2 rounded-xl shadow-lg group-hover:bg-gray-950 transition-colors">
          <span className="text-2xl">♻️</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic">W2W</span>
          <span className="text-[8px] font-bold text-green-600 tracking-[0.3em] uppercase">Waste To Worth</span>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <div className="hidden md:flex gap-8 items-center font-black text-gray-500 uppercase text-[10px] tracking-[0.2em]">
        <Link to="/" className={`hover:text-green-600 transition ${location.pathname === '/' ? 'text-green-600' : ''}`}>Home</Link>
        <Link to="/about" className={`hover:text-green-600 transition ${location.pathname === '/about' ? 'text-green-600' : ''}`}>About</Link>
        <Link to="/shop" className={`hover:text-green-600 transition ${location.pathname === '/shop' ? 'text-green-600' : ''}`}>Shopping</Link>
        
        <Link to="/cart" className="relative group hover:text-green-600 transition">
          Cart 
          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
              {cartItems.length}
            </span>
          )}
        </Link>
        
        <Link to="/contact" className={`hover:text-green-600 transition ${location.pathname === '/contact' ? 'text-green-600' : ''}`}>Contact</Link>
        <Link to="/history" className={`hover:text-green-600 transition ${location.pathname === '/history' ? 'text-green-600' : ''}`}>History</Link>
      </div>

      {/* User Actions */}
      <div className="flex gap-4 items-center">
        {userEmail ? (
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* --- MACHI: ADMIN PANEL BUTTON (Only for YOU) --- */}
            {userEmail === 'thulasirajan663@gmail.com' && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${location.pathname === '/admin' ? 'bg-gray-950 text-white shadow-lg' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}
                title="Admin Command Center"
              >
                <span className="text-sm">🛠️</span>
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all group"
              title="View Profile"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full border-2 border-green-500 overflow-hidden shadow-sm group-hover:border-gray-950 group-hover:shadow-md transition-all">
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="text-left hidden lg:block">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none">
                  {userName ? userName.split(' ')[0] : 'Hero'}
                </p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">My Profile</p>
              </div>
            </Link>

            {/* Power Off Logout Button */}
            <button 
              onClick={handleLogout}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm transition-all duration-300 active:scale-90 group/power"
              title="Power Off / Logout"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-gray-700 font-black text-[10px] uppercase tracking-[0.2em] hover:text-green-600 transition">
              Login
            </Link>
            <Link to="/register" className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-950 transition-all shadow-xl active:scale-95">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;