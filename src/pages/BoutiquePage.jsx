import React, { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar from '../composants/FilterSidebar';
import { ProductCard } from '../composants/ProductCard';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import { useProducts } from '../hook/useProducts';

const BoutiquePage = () => {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState({
    genre: [],
    fragrance: [],
    priceRange: [1000, 20000],
  });

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(sortProducts(products, 'featured'));
    }
  }, [products]);

  const sortProducts = (productsList, sortType) => {
    const sorted = [...productsList];
    switch (sortType) {
      case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc': return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'featured':
      default: return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowMobileFilter(false); // ← ferme le drawer après sélection
    let filtered = [...products];
    if (newFilters.genre.length > 0) {
      filtered = filtered.filter(p => newFilters.genre.includes(p.genre));
    }
    if (newFilters.fragrance.length > 0) {
      filtered = filtered.filter(p =>
        p.fragrances?.some(f => newFilters.fragrance.includes(f.name.toLowerCase()))
      );
    }
    filtered = filtered.filter(p =>
      p.price >= newFilters.priceRange[0] && p.price <= newFilters.priceRange[1]
    );
    setFilteredProducts(sortProducts(filtered, sortBy));
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setFilteredProducts(sortProducts(filteredProducts, newSort));
  };

  const activeFiltersCount = filters.genre.length + filters.fragrance.length;

  return (
    <>
      <Header />

      {/* Header Section */}
      <div className="bg-[#f5f0e8] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Notre Collection
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-black mb-6 block">
            Découvrez notre sélection de parfums de luxe
          </p>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)}
          />
          {/* Drawer */}
          <div className="relative bg-white w-72 h-full overflow-y-auto shadow-xl z-10">
            <button
              onClick={() => setShowMobileFilter(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <div className="p-4">
              <FilterSidebar onFilterChange={applyFilters} initialFilters={filters} />
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Layout */}
      <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>

        {/* SIDEBAR — fixe Desktop */}
        <div
          className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white"
          style={{ position: 'sticky', top: 0, height: 'calc(100vh - 64px)' }}
        >
          <div className="p-4">
            <FilterSidebar onFilterChange={applyFilters} initialFilters={filters} />
          </div>
        </div>

        {/* MAIN — scroll indépendamment */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Bouton filtre mobile */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-[#ffcc00] rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-50 transition-colors"
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#ffcc00] text-gray-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <p className="text-gray-600 font-medium">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white border-2 border-[#ffcc00] rounded-full px-6 py-2.5 pr-10 font-medium text-gray-800 cursor-pointer hover:bg-yellow-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                >
                  <option value="featured">En vedette</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name-asc">Nom A-Z</option>
                  <option value="name-desc">Nom Z-A</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                />
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Chargement des produits...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Erreur lors du chargement.</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-gray-600">Essayez d'ajuster vos filtres</p>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BoutiquePage;