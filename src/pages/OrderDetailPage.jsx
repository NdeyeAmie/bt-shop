import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Package, Clock, CheckCircle, Truck, XCircle,
  ArrowLeft, MapPin, Phone, Mail, User
} from 'lucide-react';
import axios from 'axios';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

const statusConfig = {
  pending:   { label: 'En attente',  color: 'bg-yellow-100 text-yellow-700',  icon: Clock },
  confirmed: { label: 'Confirmée',   color: 'bg-blue-100 text-blue-700',      icon: CheckCircle },
  shipped:   { label: 'Expédiée',    color: 'bg-purple-100 text-purple-700',  icon: Truck },
  delivered: { label: 'Livrée',      color: 'bg-green-100 text-green-700',    icon: CheckCircle },
  cancelled: { label: 'Annulée',     color: 'bg-red-100 text-red-700',        icon: XCircle },
};

// Étapes de progression
const steps = ['pending', 'confirmed', 'shipped', 'delivered'];

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) { navigate('/login'); return; }
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/orders/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
        else if (err.response?.status === 404) setError('Commande introuvable.');
        else setError('Erreur lors du chargement.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Skeleton
  if (loading) return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  if (error || !order) return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Commande introuvable'}</p>
          <button onClick={() => navigate('/orders')} className="bg-[#ffcc00] text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-[#e6b800]">
            Retour aux commandes
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  const status = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const currentStep = steps.indexOf(order.status);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Bouton retour */}
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ffcc00] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour aux commandes</span>
          </button>

          {/* Header commande */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                  <Package size={24} className="text-[#ffcc00]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Commande #{String(order.id).slice(0, 8).toUpperCase()}
                  </h1>
                  <p className="text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${status.color}`}>
                <StatusIcon size={16} />
                {status.label}
              </div>
            </div>
          </div>

          {/* Barre de progression (pas pour cancelled) */}
          {order.status !== 'cancelled' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Suivi de commande</h2>
              <div className="flex items-center justify-between relative">
                {/* Ligne de fond */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0" />
                {/* Ligne de progression */}
                <div
                  className="absolute top-5 left-0 h-1 bg-[#ffcc00] z-0 transition-all duration-500"
                  style={{ width: currentStep >= 0 ? `${(currentStep / (steps.length - 1)) * 100}%` : '0%' }}
                />
                {steps.map((step, index) => {
                  const StepIcon = statusConfig[step].icon;
                  const isDone = index <= currentStep;
                  return (
                    <div key={step} className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isDone ? 'bg-[#ffcc00] border-[#ffcc00] text-white' : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        <StepIcon size={18} />
                      </div>
                      <p className={`text-xs mt-2 font-medium text-center ${isDone ? 'text-[#ffcc00]' : 'text-gray-400'}`}>
                        {statusConfig[step].label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Articles */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Articles ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex-shrink-0">
                    <img
                      src={item.product_img}
                      alt={item.product_title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.product_title}</h3>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-bold text-gray-800">
                    {formatPrice(item.total)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-600">Livraison</span>
              <span className="text-emerald-600 font-semibold">Gratuite</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-[#ffcc00]">{formatPrice(order.total_price)}</span>
            </div>
          </div>

          {/* Infos livraison */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Informations de livraison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex items-start gap-3">
                <div className="bg-yellow-50 p-2 rounded-full mt-1">
                  <User size={16} className="text-[#ffcc00]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nom complet</p>
                  <p className="font-medium text-gray-800">{order.full_name || '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-yellow-50 p-2 rounded-full mt-1">
                  <Phone size={16} className="text-[#ffcc00]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Téléphone</p>
                  <p className="font-medium text-gray-800">{order.phone || '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-yellow-50 p-2 rounded-full mt-1">
                  <Mail size={16} className="text-[#ffcc00]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <p className="font-medium text-gray-800">{order.email || '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-yellow-50 p-2 rounded-full mt-1">
                  <MapPin size={16} className="text-[#ffcc00]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Adresse</p>
                  <p className="font-medium text-gray-800">
                    {[order.address, order.city, order.postal_code, order.country]
                      .filter(Boolean).join(', ') || '—'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailPage;