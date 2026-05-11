import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Product Image Section */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-green-600 font-medium mb-3">{product.category}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
          
          {/* Single Add to Cart Button */}
          <button 
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;