import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Navbar = ({ darkMode, setDarkMode }) => {
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
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-zinc-900 shadow-md border-b border-transparent dark:border-zinc-800 sticky top-0 z-50 h-20 px-6 md:px-12 transition-colors duration-300">
      
      {/* --- W2W LOGO --- */}
      <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 group">
        <div className="bg-green-600 text-white p-2 rounded-xl shadow-lg group-hover:bg-gray-950 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-950 transition-colors">
          <span className="text-2xl">♻️</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black text-gray-950 dark:text-white tracking-tighter uppercase italic">W2W</span>
          <span className="text-[8px] font-bold text-green-600 tracking-[0.3em] uppercase">Waste To Worth</span>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <div className="hidden md:flex gap-8 items-center font-black text-gray-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]">
        <Link to="/" className={`hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/' ? 'text-green-600 dark:text-green-500' : ''}`}>Home</Link>
        <Link to="/about" className={`hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/about' ? 'text-green-600 dark:text-green-500' : ''}`}>About</Link>
        <Link to="/shop" className={`hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/shop' ? 'text-green-600 dark:text-green-500' : ''}`}>Shopping</Link>
        
        <Link to="/cart" className={`relative group hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/cart' ? 'text-green-600 dark:text-green-500' : ''}`}>
          Cart 
          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
              {cartItems.length}
            </span>
          )}
        </Link>
        
        <Link to="/contact" className={`hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/contact' ? 'text-green-600 dark:text-green-500' : ''}`}>Contact</Link>
        <Link to="/history" className={`hover:text-green-600 dark:hover:text-green-500 transition ${location.pathname === '/history' ? 'text-green-600 dark:text-green-500' : ''}`}>History</Link>
      </div>

      {/* User Actions & Dark Mode Toggle */}
      <div className="flex gap-4 items-center">
        
        {/* --- DYNAMIC DARK MODE TOGGLE BUTTON --- */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-transparent dark:border-zinc-700 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 active:scale-90"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.036 5.036l1.591 1.591M17.364 17.364l1.591 1.591M3.182 12h2.25m13.5 0h2.25M5.036 18.964l1.591-1.591M17.364 6.636l1.591-1.591M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>

        {userEmail ? (
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* --- ADMIN PANEL BUTTON --- */}
            {userEmail === 'thulasirajan663@gmail.com' && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${location.pathname === '/admin' ? 'bg-gray-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-lg' : 'bg-green-50 dark:bg-zinc-800 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white'}`}
                title="Admin Command Center"
              >
                <span className="text-sm">🛠️</span>
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all group"
              title="View Profile"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full border-2 border-green-500 overflow-hidden shadow-sm group-hover:border-gray-950 dark:group-hover:border-zinc-100 group-hover:shadow-md transition-all">
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
              </div>

              <div className="text-left hidden lg:block">
                <p className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest leading-none">
                  {userName ? userName.split(' ')[0] : 'Hero'}
                </p>
                <p className="text-[8px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tighter mt-0.5">My Profile</p>
              </div>
            </Link>

            {/* Power Off Logout Button */}
            <button 
              onClick={handleLogout}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-red-50 dark:bg-zinc-800/50 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-950/50 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-600 shadow-sm transition-all duration-300 active:scale-90"
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
            <Link to="/login" className="text-gray-700 dark:text-zinc-300 font-black text-[10px] uppercase tracking-[0.2em] hover:text-green-600 dark:hover:text-green-500 transition">
              Login
            </Link>
            <Link to="/register" className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-950 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all shadow-xl active:scale-95">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;