import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../composants/ProductDetail.jsx';
import Header from '../composants/Header.jsx';
import Footer from '../composants/Footer.jsx';
import { useProducts } from '../hook/useProducts.js';


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  // Skeleton loading
  if (loading) return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="space-y-4 mt-10">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-1/3" />
              <div className="h-12 bg-gray-200 rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  // Trouver le produit par ID
  const product = products.find(p => p.id.toString() === id);

  // Erreur ou produit non trouvé
  if (error || !product) return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {error || "Produit non trouvé"}
          </h2>
          <p className="text-gray-600 mb-6">ID recherché : {id}</p>
          <button
            onClick={() => navigate('/boutique')}
            className="bg-[#ffcc00] text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-[#e6b800] transition-all"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <div>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;