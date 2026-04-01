import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleIncrement = (item) => {
    if (item.quantity < item.count_in_stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // Dans CartPage.jsx, modifier handleCheckout :
const handleCheckout = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    setShowLoginModal(true);
  } else {
    // ✅ Réinitialiser la session checkout à chaque nouvelle commande
    ['checkout_step', 'checkout_shipping', 'checkout_payment',
     'checkout_order_id', 'checkout_cart'].forEach(k => sessionStorage.removeItem(k));
    navigate("/checkout");
  }
};

  // ✅ Panier vide
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="text-center">

            <div className="mb-8 flex justify-center">
              <div className="relative">
                <svg
                  className="w-48 h-48"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 80 L160 80 L150 160 L50 160 Z"
                    fill="#ffcc00"
                    opacity="0.2"
                    stroke="#ffcc00"
                    strokeWidth="3"
                  />
                  <path
                    d="M60 80 Q100 40 140 80"
                    fill="none"
                    stroke="#ffcc00"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line x1="70" y1="90" x2="65" y2="150" stroke="#ffcc00" strokeWidth="2" />
                  <line x1="100" y1="90" x2="98" y2="150" stroke="#ffcc00" strokeWidth="2" />
                  <line x1="130" y1="90" x2="132" y2="150" stroke="#ffcc00" strokeWidth="2" />
                  <circle cx="30" cy="60" r="3" fill="#ffcc00" opacity="0.6" />
                  <circle cx="170" cy="70" r="2" fill="#ffcc00" opacity="0.6" />
                  <circle cx="50" cy="40" r="2.5" fill="#ffcc00" opacity="0.6" />
                  <circle cx="150" cy="50" r="2" fill="#ffcc00" opacity="0.6" />
                </svg>
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold animate-pulse">
                  !
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Découvrez notre collection et ajoutez vos parfums préférés
            </p>
            <button
              onClick={() => navigate('/boutique')}
              className="bg-[#ffcc00] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Modal connexion requise */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 z-10 p-8 text-center">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-[#ffcc00]" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Connexion requise
            </h2>

            <p className="text-red-500 text-sm font-medium mb-6">
              Vous devez être connecté pour procéder au paiement.
            </p>

            <button
              onClick={() => {
                setShowLoginModal(false);
                navigate("/login");
              }}
              className="w-full bg-[#ffcc00] text-gray-900 py-3 rounded-full font-bold hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
            >
              Se connecter
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen via-white to-pink-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Mon Panier</h1>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-semibold transition-colors"
            >
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-6"
                >
                  <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        Prix unitaire:{" "}
                        <span className="font-semibold text-gray-800">{formatPrice(item.price)}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-full">
                          <button
                            onClick={() => handleDecrement(item)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item)}
                            disabled={item.quantity >= item.count_in_stock}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      {item.count_in_stock > 0 ? (
                        <span className="text-emerald-600">{item.count_in_stock} en stock</span>
                      ) : (
                        <span className="text-red-600">Rupture de stock</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé de la commande</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-semibold text-emerald-600">Gratuite</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-[#ffcc00]">{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#ffcc00] text-white py-2 rounded-full font-bold text-lg hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg mb-4"
                >
                  Procéder au paiement
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-100 text-gray-800 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all"
                >
                  Continuer mes achats
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-purple-100 p-2 rounded-full mt-1">
                      <ShoppingBag size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Livraison gratuite</p>
                      <p>Pour toute commande supérieure à 50 000 XOF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-blue-100 p-2 rounded-full mt-1">
                      <ShoppingBag size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Paiement sécurisé</p>
                      <p>Transaction 100% sécurisée</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;