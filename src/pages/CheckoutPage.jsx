import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import ShippingForm from '../composants/checkout/ShippingForm';
import PaymentMethod from '../composants/checkout/PaymentMethod';
import OrderSummary from '../composants/checkout/OrderSummary';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (method) => {
    setPaymentMethod(method);
    setCurrentStep(3);
  };

  const handleOrderConfirm = () => {
    // Ici, vous pouvez envoyer les données au backend
    const orderData = {
      items: cartItems,
      shipping: shippingData,
      payment: paymentMethod,
      total: getCartTotal(),
      date: new Date().toISOString(),
    };
    
    console.log('Commande confirmée:', orderData);
    
    // Vider le panier
    clearCart();
    
    // Rediriger vers la page de confirmation
    navigate('/order-success', { state: { orderData } });
  };

  if (cartItems.length === 0) {
    return (
      <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Votre panier est vide
          </h2>
          {/* <button
            onClick={() => navigate('/')}
            className="bg-[#ffcc00] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#e6b800] transition-all"
          >
            Retour à la boutique
          </button> */}
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

  return (
     <>
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 mt-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ffcc00] transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-semibold">Retour au panier</span>
          </button> */}
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
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-[#ffcc00] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      className={`mt-2 text-sm text-[#ffcc00] uppercase tracking-[0.1em] text-black    ${
                        isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Forms */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingData} />
            )}
            {currentStep === 2 && (
              <PaymentMethod onSubmit={handlePaymentSubmit} onBack={() => setCurrentStep(1)} />
            )}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 font-serif">
                <h2 className="text-1xl text-center font-bold  mb-6">
                  Vérification de la commande
                </h2>

                {/* Informations de livraison */}
                <div className="mb-6 pb-6 border-b border-gray-200 font-serif">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Truck size={20} />
                    Adresse de livraison
                  </h3>
                  <p className="font-serif text-gray-700">{shippingData?.fullName}</p>
                  <p className="font-serif text-gray-600">{shippingData?.address}</p>
                  <p className="font-serif text-gray-600">
                    {shippingData?.city}, {shippingData?.postalCode}
                  </p>
                  <p className="font-serif text-gray-600">{shippingData?.phone}</p>
                </div>

                {/* Méthode de paiement */}
                <div className="mb-6 pb-6 border-b border-gray-200 font-serif">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CreditCard size={20} />
                    Méthode de paiement
                  </h3>
                  <p className="font-serif text-gray-700 capitalize">{paymentMethod}</p>
                </div>

                {/* Articles commandés */}
                <div className="mb-6 font-serif">
                  <h3 className="font-bold text-center boder mb-3">Articles commandés</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 font-serif">
                          <p className="font-serif text-gray-800">{item.title}</p>
                          <p className="text-sm font-semibold ">Quantité: {item.quantity}</p>
                        </div>
                        <p className="font-bold ">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-center items-center  gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-[200px] bg-gray-200 text-gray-800 py-3 text-sm rounded-full font-serifs hover:bg-gray-300 transition-all"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleOrderConfirm}
                    className=" w-[200px] bg-[#ffcc00] text-white py-3 text-sm rounded-full font-serif hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
                  >
                    Confirmer la commande
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
     <Footer />
      </>
  );
};

export default CheckoutPage;