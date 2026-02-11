import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';

export default function Bannier() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      image: image1,
      title: "Collection Exclusive",
      subtitle: "LUXE & ÉLÉGANCE",
      description: "Découvrez nos parfums de prestige",
      buttonText: "Acheter Maintenant"
    },
    {
      id: 2,
      image: image2,
      title: "Parfums d'Exception",
      subtitle: "Decouvrez nos Tresors olfactifs",
      description: "Un selection d'exceptions juste pour vous",
      buttonText: "Voir la Collection"
    },
    {
      id: 3,
      image: image3,
      title: "Nouveautés 2025",
      subtitle: "TENDANCES & STYLE",
      description: "Soyez unique avec nos créations exclusives",
      buttonText: "Découvrir"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative w-full h-[430px] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0 scale-100'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full scale-95'
              : 'opacity-0 translate-x-full scale-95'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
            <div className="max-w-2xl space-y-4">
              {/* Animated Subtitle */}
              <div
                className={`transition-all duration-700 delay-100 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-white/70 mb-6 block">
                  {slide.subtitle}
                </p>
              </div>

              {/* Animated Title */}
              <div
                className={`transition-all duration-700 delay-200 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white drop-shadow-lg">
                  {slide.title}
                </h1>
              </div>

              {/* Animated Description */}
              <div
                className={`transition-all duration-700 delay-300 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-lg text-white/80 mb-8 leading-relaxed drop-shadow-sm">
                  {slide.description}
                </p>
              </div>

              {/* Animated Button */}
              <div
                className={`transition-all duration-700 delay-400 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <button className="group relative px-6 py-3 md:px-8 md:py-3 bg-[#ffcc00] text-black font-bold text-base md:text-lg round overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ffcc00]/50">
                  <span className="relative z-10">{slide.buttonText}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              {/* Decorative Line */}
             
            </div>
          </div>

          {/* Floating Particles Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-[#ffcc00] rounded-full opacity-30 ${
                  index === currentSlide ? 'animate-float' : 'opacity-0'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#ffcc00] text-white hover:text-black p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
        aria-label="Slide précédent"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#ffcc00] text-white hover:text-black p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
        aria-label="Slide suivant"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Aller au slide ${index + 1}`}
          >
            <div
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#ffcc00] scale-x-100'
                  : 'bg-white/30 hover:bg-white/50 scale-x-75'
              }`}
            ></div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}