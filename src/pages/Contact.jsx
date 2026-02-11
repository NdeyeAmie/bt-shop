import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Music,
} from 'lucide-react';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import { Link } from 'react-router-dom';


function Contact() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://www.dihouse.store/assets/about-atelier-DLsFrUhi.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto text-white">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                Contactez-Nous
              </h1>
              <p className="text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-white/70 mb-6 block">
                Nous serions ravis d'avoir de vos nouvelles. Contactez-nous pour toute question concernant nos parfums ou vos commandes.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              
              {/* FORMULAIRE */}
              <div>
                <h2 className="font-serif text-2xl mb-6">
                  Envoyez-nous un message
                </h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        required
                        className="w-full h-12 rounded-lg border border-gray-200 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="w-full h-12 rounded-lg border border-gray-200 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sujet</label>
                    <input
                      type="text"
                      placeholder="Comment pouvons-nous vous aider ?"
                      required
                      className="w-full h-12 rounded-lg border border-gray-200 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Votre message..."
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-lg"
                  >
                    Envoyer
                  </button>
                </form>
              </div>

              {/* INFORMATIONS DE CONTACT */}
              <div>
                <h2 className="font-serif text-2xl mb-6">
                  Restez en Contact
                </h2>

                <div className="space-y-6 mb-12">
                  <ContactItem
                    icon={<MapPin size={24} className="text-[#ffcc00]" />}
                    title="Visitez-Nous"
                    text="Yeumbeul Nord, Darou Salame 6 E
                    Dakar, Sénégal"
                  />

                  <ContactItem
                    icon={<Phone size={24} className="text-[#ffcc00]" />}
                    title="Appelez-Nous"
                    text="+221 70 428 13 82"
                  />

                  <ContactItem
                    icon={<Mail size={24} className="text-[#ffcc00]" />}
                    title="Écrivez-Nous"
                    text="contact@d-house-store.com"
                  />

                  <ContactItem
                    icon={<Clock size={24} className="text-[#ffcc00]" />}
                    title="Horaires"
                    text="Mon-Sat: 9:00 AM - 8:00 PM"
                  />
                </div>

                {/* RÉSEAUX SOCIAUX */}
                <div>
                  <h3 className="font-serif text-xl mb-6 text-gray-900">Suivez-Nous</h3>
                  <div className="flex gap-4">
                    <SocialLink
                      href="https://www.instagram.com/d_house_store_26"
                      icon={<Instagram size={20} />}
                    />
                    <SocialLink
                      href="https://www.facebook.com/profile.php?id=61581434818850"
                      icon={<Facebook size={20} />}
                    />
                    <SocialLink
                      href="https://wa.me/221704281382"
                      icon={<MessageCircle size={20} />}
                    />
                    <SocialLink
                      href="https://www.tiktok.com/@dhouse.store1"
                      icon={<Music size={20} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-lg font-medium mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function SocialLink({ href, icon }) {
  return (
    
     <Link to={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-white transition-all"
    >
      {icon}
    </Link>
  );
}

export default Contact;