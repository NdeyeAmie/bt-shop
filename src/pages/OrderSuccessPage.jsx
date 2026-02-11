import React from 'react';
import { CheckCircle, Package, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../composants/Footer';
import Header from '../composants/Header';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const orderNumber = `CMD-${Date.now().toString().slice(-8)}`;

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center font-serif">
          {/* Icône de succès */}
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={60} className="text-emerald-500" />
          </div>

          {/* Titre */}
          <h1 className="text-1xl font-bold text-gray-800 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-black mb-8">
            Merci pour votre commande. Nous vous enverrons un email de confirmation.
          </p>

          {/* Numéro de commande */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Numéro de commande</p>
            <p className="text-1xl font-bold text-gray-800">{orderNumber}</p>
          </div>

          {/* Détails de la commande */}
          <div className="text-left mb-8 space-y-6">
            {/* Adresse de livraison */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-3 font-serif">
                <Package size={24} className="text-[#ffcc00]" />
                <h3 className="font-bold  text-sm">
                  Adresse de livraison
                </h3>
              </div>
              {orderData?.shipping && (
                <div className="ml-8 text-gray-600">
                  <p className="font-semibold text-gray-800 text-sm">
                    {orderData.shipping.fullName}
                  </p>
                  <p>{orderData.shipping.address}</p>
                  <p>
                    {orderData.shipping.city}, {orderData.shipping.postalCode}
                  </p>
                  <p>{orderData.shipping.phone}</p>
                </div>
              )}
            </div>

            {/* Email de confirmation */}
            <div>
              <div className="flex items-center gap-2 mb-3 font-serif">
                <Mail size={24} className="text-[#ffcc00]" />
                <h3 className="font-bold  text-sm">
                  Email de confirmation
                </h3>
              </div>
              <p className="ml-8 text-gray-600">
                Un email de confirmation a été envoyé à{' '}
                <span className="font-semibold text-gray-800">
                  {orderData?.shipping?.email || 'votre adresse email'}
                </span>
              </p>
            </div>

            {/* Montant total */}
            {orderData?.total && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-center font-serif">
                  <span className="font-semibold ">
                    Montant total payé
                  </span>
                  <span className="text-1xl font-bold text-[#ffcc00]">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-[#ffcc00] text-sm text-white py-2 rounded-full font-serif text-lg hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
            >
              Continuer mes achats
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 bg-gray-100 text-sm text-gray-800 py-2 rounded-full font-serif text-lg hover:bg-gray-200 transition-all"
            >
              Voir mes commandes
            </button>
          </div>
        </div>

        {/* Information supplémentaire */}
        <div className="mt-8 text-center text-gray-600 font-serif">
          <p className="text-sm">
            Vous recevrez une notification lorsque votre commande sera expédiée.
          </p>
          <p className="text-sm mt-2">
            Besoin d'aide ?{' '}
            <a href="#" className="text-[#ffcc00] font-semibold hover:underline">
              Contactez notre service client
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrderSuccessPage;