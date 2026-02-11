import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi de la newsletter
    console.log('Email soumis:', email);
  };

  return (
    <div className="w-full bg-[#e6b800] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
          Votre newsletter pro
        </h2>
        
        {/* Subtitle */}
        <p className="text-white text-base md:text-lg mb-8 max-w-3xl mx-auto">
          Découvrez toutes nos réductions exclusives, nouveautés produits et inspirations pour votre entreprise
        </p>
        
        {/* Email Form */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="w-full bg-white border border-white sm:flex-1 px-6 py-3 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
          />
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg- text-black font-semibold rounded transition-colors duration-200"
          >
            Envoyer
          </button>
        </div>
        
        {/* More Info Link */}
        <a 
          href="#" 
          className="text-white underline hover:no-underline text-sm"
        >
          Plus d'informations
        </a>
      </div>
    </div>
  );
}