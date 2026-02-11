import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductDetail from '../composants/ProductDetail.jsx';
import products from '../data/data.js';
import Header from '../composants/Header.jsx';
import Footer from '../composants/Footer.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  
  // Convertir l'ID en string pour la comparaison
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
          <p className="text-gray-600 mb-6">ID recherché: {id}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#ffcc00] text-white px-6 py-3 rounded-full hover:bg-[#e6b800] transition-all"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Bouton retour */}
      {/* <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ffcc00] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Retour</span>
          </button>
        </div>
      </div> */}
      
      {/* Composant de détails */}
      <Header />
      <ProductDetail product={product} className="mt-20" />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;