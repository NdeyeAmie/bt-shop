import React, { useState } from 'react';
import { Search, Minus, Plus, Check, SlidersHorizontal, X } from 'lucide-react';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hook/useProducts';
import { useCart } from '../contexts/CartContext';

const CataloguePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { products, loading, error } = useProducts();
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(product.genre);
    const matchesType = selectedTypes.length === 0 || product.fragrance?.some(f => selectedTypes.includes(f));
    return matchesSearch && matchesGenre && matchesType;
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 20) {
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const incrementQuantity = (productId) => {
    handleQuantityChange(productId, (quantities[productId] || 0) + 1);
  };

  const decrementQuantity = (productId) => {
    handleQuantityChange(productId, Math.max(0, (quantities[productId] || 0) - 1));
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  const getTotalItems = () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'XOF', minimumFractionDigits: 0,
  }).format(price);

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => prev.includes(genre) ? [] : [genre]);
    setShowMobileFilter(false);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? [] : [type]);
    setShowMobileFilter(false);
  };

  const handleCheckout = () => {
    if (getTotalItems() === 0) return;

    // Vider le panier existant
    clearCart();

    // Ajouter les items du catalogue dans le CartContext
    Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .forEach(([productId, qty]) => {
        const product = products.find(p => p.id === productId);
        if (product) addToCart(product, qty);
      });

    // Naviguer vers checkout
    navigate('/checkout');
  };

  const genres = [
    { id: 'lui', label: 'Pour Lui' },
    { id: 'elle', label: 'Pour Elle' },
    { id: 'mixte', label: 'Mixte' },
  ];

  const fragrances = [
    { id: 'oriental', label: 'Oriental' },
    { id: 'floral', label: 'Floral' },
    { id: 'woody', label: 'Woody' },
    { id: 'fresh', label: 'Fresh' },
    { id: 'citrus', label: 'Citrus' },
  ];

  const FilterContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Filtres</h2>

      {/* Genre */}
      <div className="mb-8">
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">Genre</h3>
        <div className="space-y-3">
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreToggle(genre.id)} className="sr-only" />
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedGenres.includes(genre.id)
                    ? 'border-[#ffcc00] bg-[#ffcc00]'
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {selectedGenres.includes(genre.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{genre.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance */}
      <div className="mb-8">
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">Type de fragrance</h3>
        <div className="space-y-3">
          {fragrances.map((fragrance) => (
            <label key={fragrance.id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" checked={selectedTypes.includes(fragrance.id)}
                  onChange={() => handleTypeToggle(fragrance.id)} className="sr-only" />
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedTypes.includes(fragrance.id)
                    ? 'border-[#ffcc00] bg-[#ffcc00]'
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {selectedTypes.includes(fragrance.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{fragrance.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setSelectedGenres([]); setSelectedTypes([]); }}
        className="w-full py-2 text-sm font-semibold text-gray-600 hover:text-[#ffcc00] transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <>
      <Header />

      {/* Header Section */}
      <div className="bg-[#f5f0e8] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Catalogue
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-black mb-6 block">
            Parfums disponibles sur commande spéciale
          </p>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)} />
          <div className="relative bg-white w-72 h-full overflow-y-auto ml-0 shadow-xl z-10">
            <button onClick={() => setShowMobileFilter(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Dashboard Layout */}
      <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>

        {/* SIDEBAR GAUCHE — Filtres fixe Desktop */}
        <div
          className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white"
          style={{ position: 'sticky', top: 0, height: 'calc(100vh - 64px)' }}
        >
          <FilterContent />
        </div>

        {/* MAIN — scroll indépendamment */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 lg:px-6 py-8 pb-24">

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-[#ffcc00] rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-50 transition-colors"
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                  {(selectedGenres.length > 0 || selectedTypes.length > 0) && (
                    <span className="bg-[#ffcc00] text-gray-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {selectedGenres.length + selectedTypes.length}
                    </span>
                  )}
                </button>
                <p className="text-gray-600 font-medium">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="search"
                  placeholder="Rechercher un parfum..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-[#ffcc00] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffcc00] bg-white"
                />
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Chargement des produits...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Parfum</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">Type</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Prix</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 w-40">Quantité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                {product.img ? (
                                  <img src={product.img} alt={product.title}
                                    className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                    N/A
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{product.title}</p>
                                <p className="text-sm text-gray-500">
                                  100ml • {product.genre === 'lui' ? 'Homme' : product.genre === 'elle' ? 'Femme' : 'Unisexe'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            {product.fragrance?.[0] && (
                              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 capitalize">
                                {product.fragrance[0]}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right font-medium">{formatPrice(product.price)}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => decrementQuantity(product.id)}
                                disabled={!quantities[product.id] || quantities[product.id] === 0}
                                className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                <Minus size={16} />
                              </button>
                              <input type="number" min="0" max="20"
                                value={quantities[product.id] || 0}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                              />
                              <button onClick={() => incrementQuantity(product.id)}
                                className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
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
            )}

          </div>
        </div>

        {/* SIDEBAR DROITE — Récapitulatif fixe */}
        <div
          className="hidden xl:block w-80 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white"
          style={{ position: 'sticky', top: 0, height: 'calc(100vh - 64px)' }}
        >
          <div className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Récapitulatif</h2>

            {getTotalItems() === 0 ? (
              <p className="text-gray-500 text-sm mb-4">Aucun produit sélectionné</p>
            ) : (
              <div className="space-y-2 mb-4">
                {Object.entries(quantities).filter(([, qty]) => qty > 0).map(([productId, qty]) => {
                  const product = products.find(p => p.id === productId);
                  return product ? (
                    <div key={productId} className="flex items-center justify-between text-sm gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                          {product.img ? (
                            <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">N/A</div>
                          )}
                        </div>
                        <span className="text-gray-600 truncate max-w-[120px]">{product.title}</span>
                      </div>
                      <span className="font-medium flex-shrink-0">×{qty}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span className="font-semibold">{formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span className="font-semibold text-emerald-600">Gratuite</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-[#ffcc00]">{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={getTotalItems() === 0}
              className="w-full mt-6 bg-[#ffcc00] text-gray-900 py-3 rounded-lg font-semibold hover:bg-[#e6b800] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              <Check size={16} />
              Valider la commande
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Summary Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">{getTotalItems()} articles</p>
            <p className="font-semibold text-lg">{formatPrice(calculateTotal())}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={getTotalItems() === 0}
            className="bg-[#ffcc00] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#e6b800] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <Check size={16} />
            Commander
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CataloguePage;