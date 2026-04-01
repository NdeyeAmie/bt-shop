import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange, initialFilters }) => {
  const [selectedGenre, setSelectedGenre] = useState(initialFilters.genre);
  const [selectedFragrance, setSelectedFragrance] = useState(initialFilters.fragrance);
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);

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

  const handleGenreChange = (genreId) => {
      const newGenre = selectedGenre.includes(genreId) ? [] : [genreId];
    
    setSelectedGenre(newGenre);
    onFilterChange({
      genre: newGenre,
      fragrance: selectedFragrance,
      priceRange,
    });
  };

  const handleFragranceChange = (fragranceId) => {
    const newFragrance = selectedFragrance.includes(fragranceId) ? [] : [fragranceId];
    
    setSelectedFragrance(newFragrance);
    onFilterChange({
      genre: selectedGenre,
      fragrance: newFragrance,
      priceRange,
    });
  };

  const handlePriceChange = (e) => {
    const newPrice = [priceRange[0], parseInt(e.target.value)];
    setPriceRange(newPrice);
    onFilterChange({
      genre: selectedGenre,
      fragrance: selectedFragrance,
      priceRange: newPrice,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6 lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
        Filtres
      </h2>

      {/* Genre Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">
          Genre
        </h3>
        <div className="space-y-3">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedGenre.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedGenre.includes(genre.id)
                    ? 'border-[#ffcc00] bg-[#ffcc00]'
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {selectedGenre.includes(genre.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {genre.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance Type Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">
          Type de fragrance
        </h3>
        <div className="space-y-3">
          {fragrances.map((fragrance) => (
            <label
              key={fragrance.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFragrance.includes(fragrance.id)}
                  onChange={() => handleFragranceChange(fragrance.id)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedFragrance.includes(fragrance.id)
                    ? 'border-[#ffcc00] bg-[#ffcc00]'
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {selectedFragrance.includes(fragrance.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {fragrance.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">
          Prix
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ffcc00 0%, #ffcc00 ${((priceRange[1] - 1000) / 19000) * 100}%, #e5e7eb ${((priceRange[1] - 1000) / 19000) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>{formatPrice(1000)}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSelectedGenre([]);
          setSelectedFragrance([]);
          setPriceRange([1000, 20000]);
          onFilterChange({
            genre: [],
            fragrance: [],
            priceRange: [1000, 20000],
          });
        }}
        className="w-full mt-6 py-2 text-sm font-semibold text-gray-600 hover:text-[#ffcc00] transition-colors"
      >
        Réinitialiser les filtres
      </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;