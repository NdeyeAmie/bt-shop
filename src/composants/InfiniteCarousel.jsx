import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const InfiniteCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Vos images de parfums
  const images = [
    "https://akparfumerie.com/cdn/shop/files/Duo_Extase_Lytchee_Bloom.png?v=1766866808",
    "https://akparfumerie.com/cdn/shop/files/Mousuf_Daisy_Ard_Al_Zaafaran_350X.png?v=1767133209",
    "https://akparfumerie.com/cdn/shop/files/Emmanuelle_Jane_Milano_For_Men_-_Eau_de_Parfum_100ml.png?v=1767907999",
    "https://akparfumerie.com/cdn/shop/files/Lattafa_Badee_Al_Oud_Amethyst.png?v=1766335497",
    "https://akparfumerie.com/cdn/shop/files/Lattafa_Teriaq_Intense.png?v=1766774360",
    "https://akparfumerie.com/cdn/shop/files/Khadlaj_Rose_Couture_Eau_de_Parfum.png?v=1767131429",
    "https://akparfumerie.com/cdn/shop/files/Melissa_Poudree_Riiffs_Eau_de_Parfum.png?v=1766779060",
    "https://akparfumerie.com/cdn/shop/files/Crystal_Baccarat_Collection_Convivium_Paris_-_Eau_de_Parfum_100ml.png?v=1767904816",
  ];

  // Dupliquer les images pour créer l'effet infini
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="w-full bg-[#ffcc00] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12 px-4">
        <h1 className="text-2xl md:text-2xl font-bold text-center text-white mb-4">
          Découvrez l'univers BTSHOP en images : inspirations, nouveautés parfumées et coups de cœur du moment
        </h1>
        <p className="text-center text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-white mb-6 block">
          Découvrez nos parfums d'exception
        </p>
      </div>

      {/* Carrousel infini */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll">
          {duplicatedImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={img}
                alt={`Parfum ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay au hover */}
              <div
                className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Icône Favoris */}
                <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Heart size={32} className="text-red-500" />
                </button>
                
                {/* Icône Message */}
                <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <MessageCircle size={32} className="text-blue-500" />
                </button>

                {/* Texte */}
                {/* <div className="text-center px-6">
                  <p className="text-white font-bold text-lg mb-2">
                    Ajouter aux favoris
                  </p>
                  <p className="text-white/90 text-sm">
                    Envoyer un message
                  </p>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;