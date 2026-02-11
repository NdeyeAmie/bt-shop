import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Heart, Instagram, Facebook, Linkedin , MessageCircle,} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Merci pour votre inscription : ${email}`);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f0e8] pt-8  relative">
      <div className=" ">
        <div className="flex flex-col md:flex-row justify-around gap-8 mb-8">
          
          {/* Section Service Client */}
          <div className='font-serif'>
            <h3 className="text-lg font-bold mb-4">Service client</h3>
            <div className="space-y-2">
              <Link 
                to="mailto:contact@mamdoux.com" 
                className="flex items-center gap-3 text-gray-700 hover:text-[#ffcc00] transition-colors duration-300"
              >
                <Mail size={20} className="text-black font-bold" />
                <span className="underline">contact@btshop.com</span>
              </Link>
              
              <Link 
                to="tel:+221777777777" 
                className="flex items-center gap-3 text-gray-700 hover:text-[#ffcc00] transition-colors duration-300"
              >
                <Phone size={20} className="text-[#ffcc00]" />
                <span>+221 77 777 17 77</span>
              </Link>
              
              <Link
                to="tel:+221338583358" 
                className="flex items-center gap-3 text-gray-700 hover:text-[#ffcc00] transition-colors duration-300"
              >
                <Phone size={20} className="text-[#ffcc00]" />
                <span>+221 33 858 33 58</span>
              </Link>
              
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={20} className="text-[#ffcc00] mt-1 flex-shrink-0" />
                <span>35, Liberté 6 extension Dakar – Sénégal</span>
              </div>
              
              <div className="space-y-1 pt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} className="text-[#ffcc00]" />
                  <span>Lundi – Vendredi : 09:00 – 18:00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 pl-8">
                  <span>Samedi : 10:00 – 17:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Newsletter */}
          <div className='font-serif'>
            <h3 className="text-lg font-bold mb-4">Pas de spams, juste des fragrances</h3>
            <p className="w-[400px] text-gray-700 mb-4 leading-relaxed text-sm">
              Inscrivez-vous pour recevoir toutes nos offres en avant-première et profitez de 10% de réduction sur votre 1ère commande !
            </p>
            
            <div className="flex gap-2 mb-6 w-[400px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse mail..."
                className="w-[400px] bg-white flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ffcc00] focus:ring-2 focus:ring-[#ffcc00]/20 transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="bg-[#ffcc00] hover:bg-[#ffdd11] text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Send size={24} />
              </button>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Suivez-nous sur nos réseaux sociaux</h4>
              <div className="flex gap-4">
                <Link 
                  to="#"
                  className=" p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <Instagram size={24} className="text-[#ffdd11]" />
                </Link>
                <Link 
                  to="#"
                  className=" p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <Facebook size={24} className="text-[#ffdd11]" />
                </Link>
                <Link 
                  to="#"
                  className=" p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <svg className="w-6 h-6 text-[#ffdd11]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </Link>
                <Link 
                  to="#"
                  className=" p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <svg className="w-6 h-6 text-[#ffdd11]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </Link>
                <Link 
                  to="#"
                  className=" p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <Linkedin size={24} className="text-[#ffdd11]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Section Nos Produits */}
          <div className='font-serif'>
            <h3 className="text-lg font-bold mb-4">
              Nos produits
            </h3>

            <ul className="space-y-2">
              {[
                "Pri'doux",
                "Maison",
                "Cadeaux",
                "Secret Coquin",
                "Diffuseurs",
                "Accessoires",
                "Bon senteur"
              ].map((item) => (
                <li key={item}>
                  <Link
                    to=""
                    className="text-gray-700 hover:text-[#ffcc00] hover:translate-x-2 inline-block transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

       
               {/* WHATSAPP FLOATING BUTTON */}
               
                <Link to="https://wa.me/221782864990"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
               >
                 <MessageCircle size={32} className="text-white" />
               </Link>

        {/* Bottom Bar */}
        <div className=" p-6  bg-black text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="">Made with</span>
              <Heart size={20} className=" fill-[#ffcc00]" />
              <span className="">by</span>
              <span className="font-bold  text-xl">BTSHOP</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6  text-sm">
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300">
                Conditions générales de vente
              </a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300">
                Retour & Échange
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;