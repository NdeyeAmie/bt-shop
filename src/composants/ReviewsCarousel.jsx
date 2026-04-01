// src/composants/ReviewsCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/products';

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Récupérer tous les produits et extraire les reviews 4-5 étoiles
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/`);
        const allProducts = res.data.results;

        const topReviews = allProducts
          .flatMap(product =>
            product.reviews
              .filter(r => r.rating >= 4)
              .map(r => ({
                ...r,
                product_title: product.title,
                product_img: product.img,
              }))
          )
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);

        setReviews(topReviews);
      } catch (err) {
        console.error('Erreur chargement reviews', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, reviews.length]);

  const prev = () => {
    setAutoPlay(false);
    setCurrent(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const next = () => {
    setAutoPlay(false);
    setCurrent(prev => (prev + 1) % reviews.length);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto" />
            <div className="h-40 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* Titre section */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#ffcc00]">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-500">Des avis vérifiés de notre communauté</p>
          <div className="w-16 h-1 bg-[#ffcc00] mx-auto mt-4 rounded-full" />
        </div>

        {/* Carrousel */}
        <div className="relative">

          {/* Carte review */}
          <div className="relative min-h-[220px]">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === current
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : index < current
                    ? 'opacity-0 -translate-x-8 pointer-events-none'
                    : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 mx-12 relative">

                  {/* Quote icon */}
                  <Quote
                    size={40}
                    className="absolute top-6 right-6 text-amber-100 fill-amber-100"
                  />

                  {/* Étoiles */}
                  <div className="flex gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Commentaire */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{review.comment || 'Excellent produit, je recommande !'}"
                  </p>

                  {/* User + produit */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-600 text-lg">
                        {review.username?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{review.username}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Produit concerné */}
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      {review.product_img && (
                        <img
                          src={review.product_img}
                          alt={review.product_title}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <span className="text-xs text-gray-500 max-w-[120px] truncate">
                        {review.product_title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-white transition-all duration-300 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-white transition-all duration-300 z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => { setAutoPlay(false); setCurrent(index); }}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-6 h-2 bg-[#ffcc00]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsCarousel;