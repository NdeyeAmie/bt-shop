import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, ShoppingBag } from 'lucide-react';
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

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const formatPrice = (price) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) { navigate('/login'); return; }
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/orders/my-orders/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
        else setError('Erreur lors du chargement des commandes.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Séparer commandes actives et historique
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const historyOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
  const displayedOrders = activeTab === 'active' ? activeOrders : historyOrders;

  const OrderCard = ({ order }) => {
    const status = statusConfig[order.status] || statusConfig.pending;
    const StatusIcon = status.icon;

    return (
      <div
        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
        onClick={() => navigate(`/orders/${order.id}`)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
              <Package size={20} className="text-[#ffcc00]" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Commande #{String(order.id).slice(0, 8).toUpperCase()}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}>
            <StatusIcon size={13} />
            {status.label}
          </div>
        </div>

        {/* Articles */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {order.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="w-14 h-14 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex-shrink-0"
            >
              <img
                src={item.product_img}
                alt={item.product_title}
                className="w-full h-full object-contain p-1"
              />
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-gray-500 font-semibold">
              +{order.items.length - 4}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">
              {order.items.length} article{order.items.length > 1 ? 's' : ''}
            </p>
            <p className="font-bold text-gray-800">{formatPrice(order.total_price)}</p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-serif text-center text-gray-800 mb-8">
            Mes commandes
          </h1>

          {/* ✅ Onglets */}
          {!loading && !error && (
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full mb-8 w-fit mx-auto">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'active'
                    ? 'bg-[#ffcc00] text-white shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                En cours ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'history'
                    ? 'bg-[#ffcc00] text-white shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Historique ({historyOrders.length})
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Erreur */}
          {!loading && error && (
            <div className="text-center py-20 text-red-500">{error}</div>
          )}

          {/* ✅ Aucune commande dans l'onglet actif */}
          {!loading && !error && displayedOrders.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={36} className="text-gray-400" />
              </div>
              {activeTab === 'active' ? (
                <>
                  <p className="text-gray-500 text-lg mb-2">Aucune commande en cours</p>
                  <p className="text-gray-400 text-sm mb-6">
                    Vos commandes livrées sont dans l'onglet Historique
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-lg mb-2">Aucun historique de commande</p>
                  <p className="text-gray-400 text-sm mb-6">
                    Vos commandes livrées ou annulées apparaîtront ici
                  </p>
                </>
              )}
              <button
                onClick={() => navigate('/boutique')}
                className="bg-[#ffcc00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e6b800] transition-all"
              >
                Découvrir nos parfums
              </button>
            </div>
          )}

          {/* ✅ Liste des commandes */}
          {!loading && !error && displayedOrders.length > 0 && (
            <div className="space-y-4">
              {displayedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;