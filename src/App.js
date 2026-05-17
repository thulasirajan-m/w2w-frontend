import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global State Provider
import { CartProvider } from './CartContext';

// Components matrum Pages import
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import History from './pages/History';
import Contact from './pages/Contact';
import About from './pages/About';
import EWasteCalculator from './pages/EWasteCalculator';
import GlassCalculator from './pages/GlassCalculator';
import FabricCalculator from './pages/FabricCalculator';
import MetalCalculator from './pages/MetalCalculator';
import Checkout from './pages/Checkout';
import PickupForm from './pages/PickupForm';
import AdminDashboard from './pages/AdminDashboard'; 
import Profile from './pages/Profile'; 
import ForgotPassword from './pages/ForgotPassword';

function App() {
  // Initialize state based on previous storage or browser preferences
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Synchronize state mutations directly with HTML document element structure
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <CartProvider>
      <Router>
        {/* Top-level structure container adapts seamlessly to theme variations with strict transition metrics */}
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
          
          {/* Passing global theme controller values into navigation bar context */}
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <Routes>
            {/* Essential Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Sustainability Calculators */}
            <Route path="/e-waste-calculator" element={<EWasteCalculator />} />
            <Route path="/glass-calculator" element={<GlassCalculator />} />
            <Route path="/fabric-calculator" element={<FabricCalculator />} />
            <Route path="/metal-calculator" element={<MetalCalculator />} />
            
            {/* Functional Forms */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pickup" element={<PickupForm />} />

            {/* Admin Access */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;