import React from 'react';
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
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
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