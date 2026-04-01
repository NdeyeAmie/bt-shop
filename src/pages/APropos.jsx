import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

function APropos() {
  return (
    <>
      <Header/>
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://www.dihouse.store/assets/about-atelier-DLsFrUhi.jpg"
              alt="D-House Store Atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Notre Histoire
            </h1>
            <p className="text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-white/70 mb-6 block">
              Créer des parfums extraordinaires qui capturent des moments, évoquent des émotions et deviennent une extension de votre identité unique.
            </p>
          </div>
        </section>

        {/* L'ART DE LA PARFUMERIE */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Texte */}
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl mb-6 text-gray-900">
                    L'Art de la Parfumerie
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    BTSHOP est né d'une passion pour les parfums d'exception et d'un désir de rendre la parfumerie de luxe accessible aux personnes exigeantes qui apprécient les belles choses.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Chaque parfum de notre collection est soigneusement sélectionné, avec uniquement les meilleurs ingrédients provenant du monde entier. Des champs de jasmin ensoleillés du Maroc aux forêts rares de oud du Moyen-Orient.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Nous croyons qu'un parfum est plus qu'une simple odeur—c'est une signature, un souvenir, un moment capturé dans un flacon.
                  </p>
                </div>

                {/* Nos Valeurs */}
                <div>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="font-serif text-2xl md:text-3xl mb-6 text-gray-900">
                      Nos Valeurs
                    </h3>
                    <ul className="space-y-6">
                      <ValueItem
                        title="Excellence"
                        description="Uniquement les meilleurs ingrédients et un savoir-faire expert"
                      />
                      <ValueItem
                        title="Authenticité"
                        description="Des parfums authentiques qui racontent une histoire"
                      />
                      <ValueItem
                        title="Durabilité"
                        description="Approvisionnement responsable et pratiques éco-conscientes"
                      />
                      <ValueItem
                        title="Client d'Abord"
                        description="Service exceptionnel et expériences personnalisées"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTIQUES */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem number="50+" label="Parfums Uniques" />
              <StatItem number="100+" label="Clients Satisfaits" />
              <StatItem number="3+" label="Pays Desservis" />
              <StatItem number="5★" label="Note Client" />
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Découvrez Votre Signature Olfactive
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Explorez notre collection soigneusement sélectionnée et trouvez le parfum qui vous parle.
              </p>
              <Link
                to="/boutique"
                className="inline-block bg-[#ffcc00] text-gray-900 px-8 py-3 font-medium tracking-wide hover:bg-[#e6b800] transition-colors rounded-lg"
              >
                Explorer la Collection
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function ValueItem({ title, description }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 flex-shrink-0"></span>
      <div>
        <span className="font-medium text-gray-900 block mb-1">{title}</span>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </li>
  );
}

function StatItem({ number, label }) {
  return (
    <div>
      <span className="block font-serif text-4xl md:text-5xl text-[#ffcc00] mb-2 font-bold">
        {number}
      </span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}

export default APropos;