import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL ='https://w2w-backend-k76m.onrender.com';

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error machi!", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleQuickBuy = (product) => {
    navigate('/checkout', { state: { product } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-black animate-pulse text-green-600">LOADING W2W SHOP... ♻️</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-950 tracking-tight italic">W2W <span className="text-green-600">SHOP</span></h1>
          <p className="text-gray-500 font-medium mt-1">Directly upcycled from your contributions 🌍</p>
        </div>
        
        <div className="flex bg-gray-200/50 p-1.5 rounded-2xl gap-1">
          {['All', 'Metals', 'Glass', 'Plastic'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${
                filter === cat ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid - UPDATED KEY LOGIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          // MACHI: Inga key prop-la database _id correct-ah map aagudhu
          <div key={product._id || product.id} className="bg-white p-5 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col">
            
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] mb-5 bg-gray-100">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=400&auto=format&fit=crop"; 
                }}
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                {product.category}
              </span>
            </div>

            {/* Content Section */}
            <div className="px-2 flex-grow">
              <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex justify-between items-end mb-4 pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase">Price</span>
                  <span className="text-2xl font-black text-gray-950">
                    <span className="text-sm font-medium mr-0.5">₹</span>{product.price}
                  </span>
                </div>
                <div className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                  product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="space-y-2 mt-auto">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gray-950 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition-all text-[10px] uppercase tracking-widest active:scale-95"
              >
                ADD TO CART 🛒
              </button>
              <button 
                onClick={() => handleQuickBuy(product)}
                className="w-full bg-white border-2 border-gray-100 text-gray-950 font-black py-4 rounded-2xl hover:border-gray-900 transition-all text-[10px] uppercase tracking-widest active:scale-95"
              >
                Quick Buy ⚡
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] mt-10 border-4 border-dashed border-gray-50">
          <p className="text-gray-400 font-black text-xl uppercase tracking-widest">No materials found in this category 📦</p>
        </div>
      )}
    </div>
  );
};

export default Shop;