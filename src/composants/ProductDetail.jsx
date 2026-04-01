import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.img);
  const [isFavorite, setIsFavorite] = useState(false);
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
        size={20}
        className={index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
      />
    ));
  };

  const handleIncrement = () => {
    if (quantity < product.count_in_stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getTotalPrice = () => product.price * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} × ${product.title} ajouté(s) au panier!`);
  };

  // ✅ Galerie avec les champs API
  const galleryImages = [product.img];
  if (product.hover_img) {
    galleryImages.push(product.hover_img);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

            {/* Section Gauche - Images */}
            <div className="space-y-4">
              {/* Image Principale */}
              <div className="relative mt-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden h-96 lg:h-[500px]">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />

                {/* Badge Stock */}
                {product.count_in_stock > 0 ? (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    En stock ({product.count_in_stock} disponibles)
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Rupture de stock
                  </div>
                )}

                {/* Bouton Favori */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* Galerie miniatures */}
              <div className="flex gap-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden h-24 w-24 transition-all ${
                      selectedImage === img
                        ? 'ring-4 ring-[#ffcc00] scale-105'
                        : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Section Droite - Informations */}
            <div className="space-y-6">
              {/* Titre */}
              <div>
                <h1 className="text-muted-foreground leading-relaxed mb-3 mt-10">
                  {product.title}
                </h1>

                {/* Rating et Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {renderStars(product.avg_rating)}
                  </div>
                  <span className="text-gray-600">
                    {product.avg_rating} ({product.num_reviews} avis)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Prix */}
              <div className="flex items-center gap-8">
                <span className="text-muted-foreground leading-relaxed">Prix:</span>
                <span className="text-muted-foreground leading-relaxed font-bold text-gray-800">
                  {formatPrice(getTotalPrice())}
                </span>
                {quantity > 1 && (
                  <span className="text-sm text-gray-500">
                    ({formatPrice(product.price)} × {quantity})
                  </span>
                )}
              </div>

              {/* Quantité */}
              <div className="flex items-center gap-10">
                <label className="text-muted-foreground leading-relaxed">
                  Quantité:
                </label>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-6 text-xl font-bold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.count_in_stock}
                    className="p-3 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.count_in_stock} disponibles
                </span>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.count_in_stock === 0}
                  className="w-[50%] bg-[#ffcc00] text-white py-2 rounded-full text-muted-foreground leading-relaxed hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Ajouter au panier
                </button>
              </div>

              {/* Avantages */}
              <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Truck className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Livraison gratuite</p>
                    <p className="text-sm text-gray-600">Pour toute commande supérieure à 50 000 XOF</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Paiement sécurisé</p>
                    <p className="text-sm text-gray-600">Transaction 100% sécurisée</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <RotateCcw className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Retour sous 30 jours</p>
                    <p className="text-sm text-gray-600">Garantie satisfait ou remboursé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;