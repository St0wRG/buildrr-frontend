import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MessageSquare, Settings, Trash2, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
const apiBaseUrl = import.meta.env.VITE_API_URL;


const AdminDashboard = ({ apiBaseUrl }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalQuotes: 0,
    revenue: 0
  });

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      window.location.href = '/login';
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      window.location.href = '/';
      return;
    }

    setUser(parsedUser);
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: User },
    { id: 'users', label: 'Utilisateurs', icon: User },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'quotes', label: 'Devis', icon: MessageSquare },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p className="text-gray-600">Bienvenue, {user.firstName} {user.lastName}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Devis</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalQuotes}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-gray-900">{stats.revenue}€</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vue d'ensemble</h3>
                <p className="text-gray-600">
                  Tableau de bord administrateur en cours de développement.
                  Toutes les fonctionnalités seront bientôt disponibles.
                </p>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des utilisateurs</h3>
                <p className="text-gray-600">
                  Interface de gestion des utilisateurs en cours de développement.
                </p>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des commandes</h3>
                <p className="text-gray-600">
                  Interface de gestion des commandes en cours de développement.
                </p>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des devis</h3>
                <p className="text-gray-600">
                  Interface de gestion des devis en cours de développement.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres</h3>
                <p className="text-gray-600">
                  Interface de paramètres en cours de développement.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

