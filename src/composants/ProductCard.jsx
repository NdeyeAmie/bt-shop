import React, { useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import products from '../data/data';
import { useCart } from '../contexts/CartContext';

// Export nommé du ProductCard
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
      />
    ));
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Badge Stock */}
      {product.countInStock > 0 ? (
        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs z-10">
          En stock
        </div>
      ) : (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs z-10">
          Rupture
        </div>
      )}

      {/* Image Container avec double image */}
      <div className="relative h-72 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
        {/* Image principale */}
        <img
          src={product.img}
          alt={product.title}
          className={`w-full h-full object-contain p-6 transition-all duration-500 ${
            isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        
        {/* Image au hover */}
        {product.hoverImg && (
          <img
            src={product.hoverImg}
            alt={`${product.title} - vue alternative`}
            className={`absolute inset-0 w-full h-full object-contain p-6 transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
            }`}
          />
        )}
        
        {/* Boutons d'action */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleViewDetails}
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-[#ffcc00] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-[#ffcc00] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-serif text-gray-600 mb-4 line-clamp-2">
          {product.desc}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export par défaut du ProductGrid (page complète)
const ProductGrid = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#ffcc00]">
            Nos Parfums
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez notre collection exclusive de parfums de luxe
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;