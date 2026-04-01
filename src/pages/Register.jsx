import React, { useState } from "react";
import { X } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Register({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length > 2) parts.push(digits.slice(2, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 9));
    return parts.join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
    // Effacer l'erreur du champ modifié
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const phoneDigits = formData.phone.replace(/\s/g, "");

    if (!formData.username.trim()) {
      newErrors.username = "Le nom complet est requis.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Le nom doit contenir au moins 3 caractères.";
    }

    if (!phoneDigits) {
      newErrors.phone = "Le numéro est requis.";
    } else if (!/^\d{9}$/.test(phoneDigits)) {
      newErrors.phone = "Le numéro doit contenir exactement 9 chiffres.";
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'adresse email est invalide.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
try {
  await axios.post("http://127.0.0.1:8000/api/auth/register/", {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    phone: formData.phone.replace(/\s/g, ""),
  });

  toast.success("Compte créé avec succès ! Connectez-vous.");
  onClose();
  navigate("/login");

} catch (err) {
  if (err.response?.data?.error) {
    toast.error(err.response.data.error);
  } else {
    toast.error("Une erreur est survenue. Réessayez.");
  }
}
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20">
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center h-10 w-40 mx-auto mb-6">
            <img src={logo} alt="AK Parfumerie" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>

          {/* Erreur API globale */}
          {errors.api && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Nom Complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Jean Dupont"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent ${
                  errors.username ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Téléphone + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone</label>
                <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                  errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}>
                  <span className="px-3 py-2 bg-gray-50 text-sm border-r border-gray-300 whitespace-nowrap">
                    🇸🇳 +221
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="XX XXX XX XX"
                    className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe <span className="text-gray-400 text-xs">(6 caractères min)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirmation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation du mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent ${
                  errors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffcc00] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6b800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Tu as déjà un compte?{" "}
            <button onClick={onSwitchToLogin} className="text-[#ffcc00] font-bold hover:underline">
              Connecte-toi ici
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;