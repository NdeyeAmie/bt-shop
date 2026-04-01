import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('infos'); // 'infos' | 'password'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Récupérer user depuis le token
  const getUserFromToken = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      if (decoded.exp * 1000 < Date.now()) return null;
      return decoded;
    } catch { return null; }
  };

  const tokenUser = getUserFromToken();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirmPassword: '',
  });

  // Charger les infos utilisateur depuis l'API
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { navigate('/login'); return; }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          username: res.data.username || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
        });
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
      }
    };
    fetchProfile();
  }, []);

  // Formatage téléphone
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length > 2) parts.push(digits.slice(2, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 9));
    return parts.join(' ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccess('');
  };

  // Validation infos
  const validateInfos = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Le nom est requis.';
    else if (formData.username.trim().length < 3) newErrors.username = 'Le nom doit contenir au moins 3 caractères.';
    if (!formData.email) newErrors.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "L'email est invalide.";
    const phoneDigits = formData.phone.replace(/\s/g, '');
    if (phoneDigits && !/^\d{9}$/.test(phoneDigits)) newErrors.phone = 'Le numéro doit contenir 9 chiffres.';
    return newErrors;
  };

  // Validation mot de passe
  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.old_password) newErrors.old_password = 'L\'ancien mot de passe est requis.';
    if (!passwordData.new_password) newErrors.new_password = 'Le nouveau mot de passe est requis.';
    else if (passwordData.new_password.length < 6) newErrors.new_password = 'Le mot de passe doit contenir au moins 6 caractères.';
    if (!passwordData.confirmPassword) newErrors.confirmPassword = 'Veuillez confirmer le mot de passe.';
    else if (passwordData.new_password !== passwordData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    return newErrors;
  };

  // Soumettre infos
  const handleSubmitInfos = async (e) => {
    e.preventDefault();
    const validationErrors = validateInfos();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.put('http://127.0.0.1:8000/api/auth/profile/', {
        username: formData.username,
        email: formData.email,
        phone: formData.phone.replace(/\s/g, ''),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Informations mises à jour avec succès !');
    } catch (err) {
      setErrors({ api: err.response?.data?.error || 'Une erreur est survenue.' });
    } finally {
      setLoading(false);
    }
  };

  // Soumettre mot de passe
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.put('http://127.0.0.1:8000/api/auth/change-password/', {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Mot de passe modifié avec succès !');
      setPasswordData({ old_password: '', new_password: '', confirmPassword: '' });
    } catch (err) {
      setErrors({ api: err.response?.data?.error || 'Ancien mot de passe incorrect.' });
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Avatar + nom */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#ffcc00] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">
                {formData.username?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{formData.username}</h1>
            <p className="text-gray-500 text-sm">{formData.email}</p>
          </div>

          {/* Onglets */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-full mb-8 w-fit mx-auto">
            <button
              onClick={() => { setActiveTab('infos'); setSuccess(''); setErrors({}); }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'infos'
                  ? 'bg-[#ffcc00] text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mes informations
            </button>
            <button
              onClick={() => { setActiveTab('password'); setSuccess(''); setErrors({}); }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'password'
                  ? 'bg-[#ffcc00] text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mot de passe
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            {/* Message succès */}
            {success && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

            {/* Erreur API */}
            {errors.api && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                <AlertCircle size={16} />
                {errors.api}
              </div>
            )}

            {/* ✅ Onglet Infos */}
            {activeTab === 'infos' && (
              <form onSubmit={handleSubmitInfos} noValidate className="space-y-5">

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@example.com"
                      className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.email}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
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
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.phone}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ffcc00] text-gray-900 font-semibold py-3 rounded-full hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </form>
            )}

            {/* ✅ Onglet Mot de passe */}
            {activeTab === 'password' && (
              <form onSubmit={handleSubmitPassword} noValidate className="space-y-5">

                {/* Ancien mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ancien mot de passe
                  </label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.old_password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.old_password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.old_password}
                    </p>
                  )}
                </div>

                {/* Nouveau mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe <span className="text-gray-400 text-xs">(6 caractères min)</span>
                  </label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.new_password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="px-3 text-gray-400 hover:text-gray-600">
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.new_password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.new_password}
                    </p>
                  )}
                </div>

                {/* Confirmation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ffcc00] ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ffcc00] text-gray-900 font-semibold py-3 rounded-full hover:bg-[#e6b800] transition-all transform hover:scale-105 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Modification...' : 'Modifier le mot de passe'}
                </button>
              </form>
            )}

          </div>

          {/* Bouton déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-red-500 border border-red-200 py-3 rounded-full font-semibold hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;