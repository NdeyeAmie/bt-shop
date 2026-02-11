import React, { useState } from 'react';
import { Search, Minus, Plus, Check, SlidersHorizontal } from 'lucide-react';
import products from '../data/data';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import { Link } from 'react-router-dom';

const CataloguePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(product.genre);
    const matchesType = selectedTypes.length === 0 || product.fragrance?.some(f => selectedTypes.includes(f));
    return matchesSearch && matchesGenre && matchesType;
  });

  // Gérer les quantités
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 20) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const incrementQuantity = (productId) => {
    const current = quantities[productId] || 0;
    handleQuantityChange(productId, current + 1);
  };

  const decrementQuantity = (productId) => {
    const current = quantities[productId] || 0;
    handleQuantityChange(productId, Math.max(0, current - 1));
  };

  // Calculer le total
  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <>
    <Header/>
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#f5f0e8] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Catalogue
            </h1>
            <p className="text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-black mb-6 block">
              Parfums disponibles sur commande spéciale. Sélectionnez vos produits et quantités.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <button className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100">
            <SlidersHorizontal size={16} />
            Filtres
          </button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Rechercher un parfum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#ffcc00] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
            />
          </div>

          <p className="text-gray-600 text-sm hidden sm:block">
            {filteredProducts.length} produits
          </p>
        </div>

        {/* Layout */}
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white border rounded-lg p-6">
              <h2 className="font-serif text-xl mb-6">Filtres</h2>

              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="font-serif text-lg mb-3">Genre</h3>
                <div className="space-y-2">
                  {[
                    { id: 'lui', label: 'Homme' },
                    { id: 'elle', label: 'Femme' },
                    { id: 'mixte', label: 'Unisexe' }
                  ].map(genre => (
                    <div key={genre.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`genre-${genre.id}`}
                        checked={selectedGenres.includes(genre.id)}
                        onChange={() => handleGenreToggle(genre.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#ffcc00] focus:ring-[#ffcc00]"
                      />
                      <label htmlFor={`genre-${genre.id}`} className="text-sm cursor-pointer">
                        {genre.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-serif text-lg mb-3">Type de parfum</h3>
                <div className="space-y-2">
                  {['oriental', 'floral', 'woody', 'fresh', 'citrus'].map(type => (
                    <div key={type} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="w-4 h-4 rounded border-gray-300 text-[#ffcc00] focus:ring-[#ffcc00]"
                      />
                      <label htmlFor={`type-${type}`} className="text-sm cursor-pointer capitalize">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Table */}
          <div className="flex-1">
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Parfum
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
                        Type
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        Prix
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 w-40">
                        Quantité
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{product.title}</p>
                            <p className="text-sm text-gray-500">
                              100ml • {product.genre === 'lui' ? 'Homme' : product.genre === 'elle' ? 'Femme' : 'Unisexe'}
                            </p>
                            {product.desc && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                {product.desc}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          {product.fragrance && product.fragrance[0] && (
                            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 capitalize">
                              {product.fragrance[0]}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right font-medium">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => decrementQuantity(product.id)}
                              disabled={!quantities[product.id] || quantities[product.id] === 0}
                              className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={quantities[product.id] || 0}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                              className="w-16 h-8 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                            />
                            <button
                              onClick={() => incrementQuantity(product.id)}
                              className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary Sidebar - Desktop */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white border rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">Récapitulatif</h2>
              
              {getTotalItems() === 0 ? (
                <p className="text-gray-500 text-sm mb-4">Aucun produit sélectionné</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {Object.entries(quantities).filter(([, qty]) => qty > 0).map(([productId, qty]) => {
                    const product = products.find(p => p.id === productId);
                    return product ? (
                      <div key={productId} className="flex justify-between text-sm">
                        <span className="text-gray-600">{product.title.substring(0, 20)}...</span>
                        <span className="font-medium">×{qty}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Articles</span>
                  <span>{getTotalItems()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <Link to="/checkout"
                disabled={getTotalItems() === 0}
                className="w-full mt-6 bg-[#ffcc00] text-white py-3 rounded-md font-medium hover:bg-[#e6b800] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                <Check size={16} />
                Valider la commande
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Summary Bar */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">{getTotalItems()} articles</p>
              <p className="font-semibold text-lg">{formatPrice(calculateTotal())}</p>
            </div>
            <button
              disabled={getTotalItems() === 0}
              className="bg-[#ffcc00] text-white px-6 py-3 rounded-md font-medium hover:bg-[#e6b800] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Check size={16} />
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CataloguePage;