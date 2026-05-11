// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found machi!</div>;

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-xl shadow-lg" />
      <div>
        <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
        <p className="text-green-600 font-bold text-xl mb-2">Made from: {product.material}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-3xl font-bold mb-6">₹{product.price}</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;