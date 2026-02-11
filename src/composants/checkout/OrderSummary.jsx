import React from 'react';
import { useCart } from '../../contexts/CartContext';

const OrderSummary = () => {
  const { cartItems, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = 0; // Livraison gratuite
  const total = getCartTotal() + shippingCost;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-serif  mb-6">
        Résumé de la commande
      </h2>

      {/* Articles */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="flex-1">
              <p className="font-serif text-gray-800 text-sm line-clamp-2">
                {item.title}
              </p>
              <p className="font-serif text-sm text-gray-600">Qté: {item.quantity}</p>
            </div>
            <p className="font-serif font-bold text-gray-800 text-sm">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Calculs */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between font-serif text-gray-600">
          <span>Sous-total</span>
          <span className="font-semibold">{formatPrice(getCartTotal())}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span className="font-semibold text-emerald-600">Gratuite</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-xl font-bold">
            <span className="font-serif text-gray-800">Total</span>
            <span className="text-[#ffcc00]">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Garanties */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 font-serif text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>Livraison gratuite</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>Retour sous 30 jours</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;