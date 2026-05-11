import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const loginUser = () => setIsLoggedIn(true);

  const logoutUser = () => {
    setIsLoggedIn(false);
    clearCart(); 
  };

  // 1. Add to Cart Logic
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => {
      const itemId = (item._id || item.id)?.toString();
      const productId = (product._id || product.id)?.toString();
      return itemId && productId && itemId === productId;
    });
    
    if (existingItem) {
      alert("Machi, item already in cart! 🛒");
      return;
    }

    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    alert(`${product.name} added to cart! ✅`);
  };

  // 2. Update Quantity Logic - MACHI INGA DHAAN FIX!
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        // ID-ah string-ah mathi compare pannuvom
        const itemId = (item._id || item.id)?.toString();
        const searchId = productId?.toString();
        
        return itemId === searchId ? { ...item, quantity: newQuantity } : item;
      })
    );
  };

  // 3. Remove Item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => {
        const itemId = (item._id || item.id)?.toString();
        const searchId = productId?.toString();
        return itemId !== searchId;
      })
    );
  };

  // 4. Clear Entire Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        updateQuantity,
        isLoggedIn,   
        loginUser,    
        logoutUser    
      }}
    >
      {children}
    </CartContext.Provider>
  );
};