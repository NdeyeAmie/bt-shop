import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function ParfumCategories() {
  const categories = [
    {
      title: "Parfum Femme",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
      link: "#femme"
    },
    {
      title: "Parfum Homme",
      image: "https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?w=600&q=80",
      link: "#homme"
    },
    {
      title: "Parfum Unisexe",
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
      link: "#unisexe"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {category.title}
                </h3>
                <a
                  href={category.link}
                  className="inline-block px-6 py-3 bg-[#ffcc00] text-black font-semibold rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
                >
                  Découvrir
                </a>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-emerald-800 hover:bg-emerald-900 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Retour en haut"
      >
        <ArrowUp size={24} />
      </button>
    </section>
  );
}