import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, ArrowLeft } from 'lucide-react';

const PaymentMethod = ({ onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [mobileMoneyData, setMobileMoneyData] = useState({
    provider: 'Orange Money',
    phoneNumber: '',
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Orange Money, Wave, Free Money',
    },
    {
      id: 'cash',
      name: 'Paiement à la livraison',
      icon: Banknote,
      description: 'Payer en espèces lors de la réception',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      alert('Veuillez sélectionner une méthode de paiement');
      return;
    }

    let paymentData = { method: selectedMethod };

    if (selectedMethod === 'card') {
      paymentData = { ...paymentData, ...cardData };
    } else if (selectedMethod === 'mobile') {
      paymentData = { ...paymentData, ...mobileMoneyData };
    }

    onSubmit(selectedMethod);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 font-serif">
      <h2 className="text-1xl font-semibold mb-6 flex items-center justify-center gap-2">
        <CreditCard size={20} />
        Méthode de paiement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection de la méthode */}
        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-[#ffcc00] bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'bg-[#ffcc00] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'border-[#ffcc00]'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-[#ffcc00]"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulaire carte bancaire */}
        {selectedMethod === 'card' && (
          <div className="space-y-4 pt-4 border-t border-gray-200 font-serif">
            <h3 className="font-bold text-gray-800">Informations de la carte</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                value={cardData.cardNumber}
                onChange={(e) =>
                  setCardData({ ...cardData, cardNumber: e.target.value })
                }
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                maxLength="19"
              />
            </div>

            <div className='font-serif'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom sur la carte
              </label>
              <input
                type="text"
                value={cardData.cardName}
                onChange={(e) =>
                  setCardData({ ...cardData, cardName: e.target.value })
                }
                placeholder="JEAN DUPONT"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={cardData.expiryDate}
                  onChange={(e) =>
                    setCardData({ ...cardData, expiryDate: e.target.value })
                  }
                  placeholder="MM/AA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({ ...cardData, cvv: e.target.value })
                  }
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                  maxLength="4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Formulaire Mobile Money */}
        {selectedMethod === 'mobile' && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-800">Informations Mobile Money</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Opérateur
              </label>
              <select
                value={mobileMoneyData.provider}
                onChange={(e) =>
                  setMobileMoneyData({ ...mobileMoneyData, provider: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
              >
                <option value="Orange Money">Orange Money</option>
                <option value="Wave">Wave</option>
                <option value="Free Money">Free Money</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={mobileMoneyData.phoneNumber}
                onChange={(e) =>
                  setMobileMoneyData({ ...mobileMoneyData, phoneNumber: e.target.value })
                }
                placeholder="+221 77 123 45 67"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
              />
            </div>
          </div>
        )}

        {/* Paiement à la livraison */}
        {selectedMethod === 'cash' && (
          <div className="pt-4 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-semibold mb-2">
                Paiement à la livraison
              </p>
              <p className="text-blue-700 text-sm">
                Vous paierez en espèces lors de la réception de votre commande. Assurez-vous d'avoir le montant exact.
              </p>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-800 text-sm rounded-full font-serif  hover:bg-gray-300 transition-all"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <button
            type="submit"
            className="w-[200px]  bg-[#ffcc00] text-white py-2 rounded-full font-serif text-sm hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;