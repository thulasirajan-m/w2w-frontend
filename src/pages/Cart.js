import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, isLoggedIn } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add some products first.");
      return;
    }

    if (!isLoggedIn) {
      alert("First, please login to proceed to checkout 🔒");
      navigate('/login');
      return;
    }
    
    navigate('/checkout', { 
      state: { 
        total: totalPrice, 
        itemsCount: totalItemsCount,
        isFromCart: true 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3 italic tracking-tighter">
          Your W2W Inventory 🛒
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            
            {/* Bill Summary Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-orange-500 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Consolidated Bill</p>
                <h2 className="text-5xl font-black text-gray-950">₹{totalPrice.toLocaleString('en-IN')}</h2>
                <p className="text-green-600 text-sm font-bold mt-1 uppercase tracking-tighter">
                  ✨ Total {totalItemsCount} units ready for Purchase! ✨
                </p>
              </div>
              <button 
                onClick={handleBuyAll}
                className="w-full md:w-auto bg-gray-950 hover:bg-orange-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl transition-all active:scale-95 uppercase tracking-tight"
              >
                Proceed to Checkout ⚡
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                // MACHI: ID-ah ingaye fix panniduvom
                const currentId = item._id || item.id;

                return (
                  <div key={currentId} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 group hover:border-orange-200 transition-all">
                    
                    <div className="w-28 h-28 bg-gray-50 rounded-3xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img 
                        src={item.imageUrl || "https://via.placeholder.com/150?text=W2W+Product"} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-black text-gray-800">{item.name}</h3>
                      <p className="text-gray-400 text-xs mb-3 font-bold uppercase tracking-tight italic">Raw Upcycled Material</p>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-2xl font-black text-gray-900">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                        
                        {/* BUTTONS LOGIC FIXED WITH currentId */}
                        <div className="flex items-center justify-center md:justify-start bg-gray-100 rounded-2xl p-1 w-fit mx-auto md:mx-0 border border-gray-200">
                          <button 
                            onClick={() => updateQuantity(currentId, (item.quantity || 1) - 1)}
                            className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-white rounded-xl transition-all active:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-6 font-black text-lg min-w-[40px] text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(currentId, (item.quantity || 1) + 1)}
                            className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-white rounded-xl transition-all active:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(currentId)}
                      className="text-gray-300 font-black hover:text-red-500 transition-colors uppercase text-[10px] tracking-widest border-2 border-gray-50 px-4 py-2 rounded-2xl hover:bg-red-50"
                    >
                      Remove Item
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center px-6 py-4">
              <Link to="/shop" className="text-gray-950 font-black uppercase text-xs tracking-widest hover:text-orange-600 transition border-b-2 border-transparent hover:border-orange-600 pb-1">
                ← Return to Shop
              </Link>
              <button 
                onClick={() => { if(window.confirm("Sure to clear the cart?")) clearCart(); }}
                className="text-gray-300 text-[10px] hover:text-red-500 uppercase font-black tracking-[0.2em] transition"
              >
                Purge All Items
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tighter">Inventory Empty 🏜️</h2>
            <p className="text-gray-400 font-bold mb-8 italic text-sm">your W2W cart is waiting for some recycled gold!</p>
            <Link to="/shop">
              <button className="bg-gray-950 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition shadow-2xl active:scale-95">
                Browse Shop
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;