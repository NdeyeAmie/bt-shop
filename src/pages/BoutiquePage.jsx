import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FilterSidebar from '../composants/FilterSidebar';
import products from '../data/data';
// CORRECTION : Importer ProductCard et non ProductGrid
import { ProductCard } from '../composants/ProductCard';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const BoutiquePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    genre: [],
    fragrance: [],
    priceRange: [1000, 20000],
  });

  // Appliquer les filtres
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = [...products];

    // Filtre par genre
    if (newFilters.genre.length > 0) {
      filtered = filtered.filter(product => 
        newFilters.genre.includes(product.genre)
      );
    }

    // Filtre par type de fragrance
    if (newFilters.fragrance.length > 0) {
      filtered = filtered.filter(product => 
        newFilters.fragrance.some(frag => product.fragrance?.includes(frag))
      );
    }

    // Filtre par prix
    filtered = filtered.filter(product => 
      product.price >= newFilters.priceRange[0] && 
      product.price <= newFilters.priceRange[1]
    );

    // Appliquer le tri
    filtered = sortProducts(filtered, sortBy);
    
    setFilteredProducts(filtered);
  };

  // Fonction de tri
  const sortProducts = (productsList, sortType) => {
    const sorted = [...productsList];
    
    switch (sortType) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };

  // Changer le tri
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setFilteredProducts(sortProducts(filteredProducts, newSort));
  };

  return (
    <>
    <Header />
    
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 ">
      {/* Header Section */}
      <div className="bg-[#f5f0e8] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Notre Collection
          </h1>
          <p className="text-[#ffcc00] text-sm uppercase tracking-[0.3em] text-black mb-6 block">
            Découvrez notre sélection de parfums de luxe
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        {/* Top Bar - Nombre de produits et tri */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-gray-600 font-medium">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          </p>

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

        {/* Layout with Sidebar and Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop - STICKY */}
          <div className="hidden lg:block">
            <div className="sticky top-28 self-start">
              <FilterSidebar onFilterChange={applyFilters} initialFilters={filters} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-gray-600">
                  Essayez d'ajuster vos filtres
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default BoutiquePage;