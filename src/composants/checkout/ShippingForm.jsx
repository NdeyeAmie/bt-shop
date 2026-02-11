import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const ShippingForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Sénégal',
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 font-serif">
      <h2 className="text-1xl font-serif font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
        <MapPin size={28} />
        Informations de livraison
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom complet */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Jean Dupont"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="jean@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+221 77 123 45 67"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Adresse complète *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Rue de la République"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Ville, Code postal, Pays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Dakar"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Code postal *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] ${
                errors.postalCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12345"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pays *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
            >
              <option value="Sénégal">Sénégal</option>
              <option value="Mali">Mali</option>
              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
              <option value="Burkina Faso">Burkina Faso</option>
            </select>
          </div>
        </div>

        {/* Bouton */}
        <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="w-[300px] bg-[#ffcc00] text-white py-2 rounded-full font-serif text-sm hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow-lg"
        >
          Continuer vers le paiement
        </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;