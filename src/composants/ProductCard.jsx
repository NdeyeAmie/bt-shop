import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../hook/useProducts';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/products';

// ✅ Hook simple pour récupérer user et token depuis localStorage
const useAuth = () => {
  const token = localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return { token, user };
};

// ✅ Modal Reviews
const ReviewModal = ({ product, onClose }) => {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(product.reviews || []);

  const hasReviewed = reviews.some(r => r.user === user?.id);

  const handleSubmit = async () => {
    if (!rating) return setError('Veuillez choisir une note');
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_URL}/${product.id}/reviews/`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(prev => [res.data, ...prev]);
      setRating(0);
      setComment('');
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `${API_URL}/${product.id}/reviews/${reviewId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-500">{reviews.length} avis</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Formulaire si connecté et pas encore reviewé */}
          {user && !hasReviewed && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="font-semibold text-gray-700">Laisser un avis</p>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={28}
                    className={`cursor-pointer transition-colors ${
                      i < (hovered || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>

              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Votre commentaire (optionnel)..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#ffcc00] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#e6b800] transition disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'Publier'}
              </button>
            </div>
          )}

          {/* Déjà reviewé */}
          {user && hasReviewed && (
            <p className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
              Vous avez déjà laissé un avis sur ce produit
            </p>
          )}

          {/* Pas connecté */}
          {!user && (
            <p className="text-center text-gray-500 text-sm bg-gray-50 rounded-xl p-4">
              <a href="/login" className="text-amber-500 font-semibold hover:underline">
                Connectez-vous
              </a>{' '}
              pour laisser un avis
            </p>
          )}

          {/* Liste des reviews */}
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-4">
                Aucun avis pour le moment
              </p>
            )}
            {reviews.map(review => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-600">
                      {review.username?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">
                      {review.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    {user?.id === review.user && (
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-xs text-red-400 hover:text-red-600 ml-2"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-sm text-gray-600 ml-10">{review.comment}</p>
                )}
                <p className="text-xs text-gray-400 ml-10 mt-1">
                  {new Date(review.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ ProductCard
export const ProductCard = ({ product }) => {
  if (!product) return null;

  const [isHovered, setIsHovered] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
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

  const handleViewDetails = () => navigate(`/product/${product.id}`);
  const handleAddToCart = (e) => { e.stopPropagation(); addToCart(product, 1); };
  const handleStarsClick = (e) => { e.stopPropagation(); setShowReviews(true); };

  return (
    <>
      <div
        data-testid="product-card"
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetails}
      >
        {product.count_in_stock > 0 ? (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs z-10">En stock</div>
        ) : (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs z-10">Rupture</div>
        )}

        <div className="relative h-72 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            className={`w-full h-full object-contain p-6 transition-all duration-500 ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          />
          {product.hover_img && (
            <img
              src={product.hover_img}
              alt={`${product.title} - vue alternative`}
              className={`absolute inset-0 w-full h-full object-contain p-6 transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
            />
          )}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={handleViewDetails} className="bg-white text-gray-800 p-3 rounded-full hover:bg-[#ffcc00] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Eye size={20} />
            </button>
            <button data-testid="add-to-cart" onClick={handleAddToCart} className="bg-white text-gray-800 p-3 rounded-full hover:bg-[#ffcc00] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">{product.title}</h3>
          <p className="text-sm font-serif text-gray-600 mb-4 line-clamp-2">{product.desc}</p>

          {/* ⭐ Étoiles cliquables */}
          <div
            className="flex items-center gap-2 mb-4 cursor-pointer group w-fit"
            onClick={handleStarsClick}
            title="Voir et laisser un avis"
          >
            <div className="flex gap-1 group-hover:scale-105 transition-transform">
              {renderStars(product.avg_rating)}
            </div>
            <span className="text-sm text-gray-500 group-hover:text-amber-500 transition-colors">
              ({product.num_reviews} avis)
            </span>
          </div>

          <div className="text-xl font-bold text-gray-800">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>

      {showReviews && (
        <ReviewModal product={product} onClose={() => setShowReviews(false)} />
      )}
    </>
  );
};

// ✅ ProductGrid
const ProductGrid = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#ffcc00]">Nos Parfums</h1>
          <p className="text-gray-600 text-lg">Découvrez notre collection exclusive de parfums de luxe</p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-72 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-[#ffcc00] text-gray-900 rounded-full font-medium hover:bg-[#e6b800]">
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;