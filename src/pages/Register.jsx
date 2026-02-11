import React from "react";
import { X } from "lucide-react";
import logo from "../assets/logo.png";

function Register({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Votre logique d'inscription ici
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Modal Body */}
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center h-10 w-40 mx-auto mb-6">
            <img src={logo} alt="AK Parfumerie" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Téléphone et Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] focus-within:border-transparent">
                  <span className="px-3 bg-gray-50">🇸🇳</span>
                  <input
                    type="tel"
                    placeholder="70 123 45 67"
                    required
                    className="flex-1 px-4 py-2 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe <span className="text-gray-500 text-xs">(6 caractères au moins)</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmation du mot de passe
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
            </div>

            {/* Bouton S'inscrire */}
            <button
              type="submit"
              className="w-full bg-[#ffcc00] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6b800] transition-colors"
            >
              S'inscrire
            </button>

            {/* Bouton Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              <span className="font-medium">Inscris-toi avec Google</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Tu as déjà un compte?{" "}
            <button
              onClick={onClose}
              className="text-[#ffcc00] font-bold hover:underline"
            >
              Connecte-toi ici
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;