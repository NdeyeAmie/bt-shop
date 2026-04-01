import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import ShippingForm from '../composants/checkout/ShippingForm';
import PaymentMethod from '../composants/checkout/PaymentMethod';
import OrderSummary from '../composants/checkout/OrderSummary';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // ✅ Tout est initialisé depuis sessionStorage au refresh
  const [currentStep, setCurrentStep] = useState(() => {
    const step = sessionStorage.getItem('checkout_step');
    return step ? Number(step) : 1;
  });

  const [shippingData, setShippingData] = useState(() => {
    const s = sessionStorage.getItem('checkout_shipping');
    return s ? JSON.parse(s) : null;
  });

  const [paymentMethod, setPaymentMethod] = useState(() =>
    sessionStorage.getItem('checkout_payment') || null
  );

  const [orderId, setOrderId] = useState(() =>
    sessionStorage.getItem('checkout_order_id') || null
  );

  const [savedCartItems, setSavedCartItems] = useState(() => {
    const s = sessionStorage.getItem('checkout_cart');
    return s ? JSON.parse(s) : [];
  });

  const handleShippingSubmit = (data, id, itemsSnapshot) => {
    // ✅ Persist dans sessionStorage immédiatement
    sessionStorage.setItem('checkout_cart', JSON.stringify(itemsSnapshot));
    sessionStorage.setItem('checkout_shipping', JSON.stringify(data));
    sessionStorage.setItem('checkout_order_id', String(id));
    sessionStorage.setItem('checkout_step', '2');

    setSavedCartItems(itemsSnapshot);
    setShippingData(data);
    setOrderId(id);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (method) => {
    sessionStorage.setItem('checkout_payment', method);
    sessionStorage.setItem('checkout_step', '3');
    setPaymentMethod(method);
    setCurrentStep(3);
  };

  const handleOrderConfirm = () => {
    // ✅ Nettoyer sessionStorage après confirmation
    ['checkout_step', 'checkout_shipping', 'checkout_payment',
     'checkout_order_id', 'checkout_cart'].forEach(k => sessionStorage.removeItem(k));
    navigate(`/order-success/${orderId}`);
  };

  const goToStep = (step) => {
    sessionStorage.setItem('checkout_step', String(step));
    setCurrentStep(step);
  };

  // ✅ Panier vide seulement si aucune session en cours
  if (cartItems.length === 0 && savedCartItems.length === 0 && !orderId) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Votre panier est vide
            </h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const steps = [
    { number: 1, title: 'Livraison', icon: MapPin },
    { number: 2, title: 'Paiement', icon: CreditCard },
    { number: 3, title: 'Confirmation', icon: CheckCircle },
  ];

  // ✅ Items à afficher : snapshot si dispo, sinon panier en cours
  const displayItems = savedCartItems.length > 0 ? savedCartItems : cartItems;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 mt-1">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-8">
            <h1 className="text-center text-2xl font-serif">Paiement</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-emerald-500 text-white'
                        : isActive ? 'bg-[#ffcc00] text-white'
                        : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <span className={`mt-2 text-sm uppercase tracking-[0.1em] ${
                        isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 transition-all ${
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

              {currentStep === 1 && (
                <ShippingForm
                  onSubmit={handleShippingSubmit}
                  initialData={shippingData}
                />
              )}

              {currentStep === 2 && (
                <PaymentMethod
                  onSubmit={handlePaymentSubmit}
                  onBack={() => goToStep(1)}
                />
              )}

              {currentStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 font-serif">
                  <h2 className="text-1xl text-center font-bold mb-6">
                    Vérification de la commande
                  </h2>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Truck size={20} /> Adresse de livraison
                    </h3>
                    <p className="text-gray-700">{shippingData?.fullName}</p>
                    <p className="text-gray-600">{shippingData?.address}</p>
                    <p className="text-gray-600">{shippingData?.city}, {shippingData?.postalCode}</p>
                    <p className="text-gray-600">{shippingData?.country}</p>
                    <p className="text-gray-600">{shippingData?.phone}</p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <CreditCard size={20} /> Méthode de paiement
                    </h3>
                    <p className="text-gray-700 capitalize">{paymentMethod}</p>
                  </div>

                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => goToStep(2)}
                      className="w-[200px] bg-gray-200 text-gray-800 py-3 text-sm rounded-full hover:bg-gray-300 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleOrderConfirm}
                      className="w-[200px] bg-[#ffcc00] text-white py-3 text-sm rounded-full hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ OrderSummary reçoit toujours les bons items */}
            <div className="lg:col-span-1">
              <OrderSummary savedItems={displayItems} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;