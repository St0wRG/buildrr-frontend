import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Send, CheckCircle, User, Mail, UserPlus, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Quote = ({ apiBaseUrl }) => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('form'); // form, choice, register, submit
  const [formData, setFormData] = useState({
    projectType: '',
    features: [],
    budget: '',
    timeline: '',
    company: '',
    email: '',
    phone: '',
    description: ''
  });

  const [userChoice, setUserChoice] = useState(''); // 'account' ou 'guest'
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    { id: 'website', name: 'Site Web', basePrice: 800 },
    { id: 'ecommerce', name: 'Boutique E-commerce', basePrice: 1200 },
    { id: 'software', name: 'Logiciel Métier', basePrice: 1500 },
    { id: 'automation', name: 'Automatisation', basePrice: 500 },
    { id: 'database', name: 'Base de Données', basePrice: 400 },
    { id: 'design', name: 'Design & UX', basePrice: 600 }
  ];

  const features = [
    { id: 'responsive', name: 'Design Responsive', price: 0 },
    { id: 'seo', name: 'Optimisation SEO', price: 200 },
    { id: 'animations', name: 'Animations Avancées', price: 300 },
    { id: 'cms', name: 'Système de Gestion de Contenu', price: 400 },
    { id: 'payment', name: 'Système de Paiement', price: 500 },
    { id: 'user-auth', name: 'Authentification Utilisateur', price: 300 },
    { id: 'api', name: 'Intégrations API', price: 400 },
    { id: 'analytics', name: 'Analytics & Reporting', price: 250 },
    { id: 'multilingual', name: 'Site Multilingue', price: 350 },
    { id: 'mobile-app', name: 'Application Mobile', price: 800 }
  ];

  // Pré-sélection depuis la page Services
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
      const serviceMapping = {
        'Création de Sites Web': 'website',
        'Boutiques E-commerce': 'ecommerce',
        'Logiciels Métier': 'software',
        'Automatisation': 'automation',
        'Bases de Données': 'database',
        'Design & UX': 'design'
      };
      
      const projectTypeId = serviceMapping[serviceParam];
      if (projectTypeId) {
        setFormData(prev => ({ ...prev, projectType: projectTypeId }));
      }
    }
  }, [location]);

  // Calcul automatique du prix
  useEffect(() => {
    calculatePrice();
  }, [formData.projectType, formData.features]);

  const calculatePrice = () => {
    const selectedProject = projectTypes.find(p => p.id === formData.projectType);
    const basePrice = selectedProject ? selectedProject.basePrice : 0;
    
    const featuresPrice = formData.features.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    setEstimatedPrice(basePrice + featuresPrice);
  };

  const handleProjectTypeChange = (projectTypeId) => {
    setFormData(prev => ({ ...prev, projectType: projectTypeId }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.projectType || !formData.company || !formData.email || !formData.description) {
      setError('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setCurrentStep('choice');
  };

  const handleGuestSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${apiBaseUrl}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice,
          withAccount: false
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setCurrentStep('submit');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de l\'envoi du devis');
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountSubmit = async () => {
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (registerData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Créer le compte
      const registerResponse = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: formData.email,
          password: registerData.password,
          company: formData.company,
          phone: formData.phone
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        setError(errorData.message || 'Erreur lors de la création du compte');
        return;
      }

      const userData = await registerResponse.json();
      
      // Envoyer le devis avec le compte
      const quoteResponse = await fetch(`${apiBaseUrl}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice,
          withAccount: true
        }),
      });

      if (quoteResponse.ok) {
        // Sauvegarder les données de connexion
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
        
        setIsSubmitted(true);
        setCurrentStep('submit');
      } else {
        const errorData = await quoteResponse.json();
        setError(errorData.message || 'Erreur lors de l\'envoi du devis');
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedFeatures = () => {
    return formData.features.map(featureId => {
      const feature = features.find(f => f.id === featureId);
      return feature ? feature : null;
    }).filter(Boolean);
  };

  const getSelectedProjectType = () => {
    return projectTypes.find(p => p.id === formData.projectType);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Demande de
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Devis
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Obtenez une estimation personnalisée pour votre projet en quelques minutes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            {currentStep === 'form' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Type de projet */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Type de projet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.projectType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="projectType"
                            value={type.id}
                            checked={formData.projectType === type.id}
                            onChange={(e) => handleProjectTypeChange(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{type.name}</div>
                            <div className="text-sm text-gray-600">À partir de {type.basePrice}€</div>
                          </div>
                          {formData.projectType === type.id && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fonctionnalités */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Fonctionnalités souhaitées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {features.map((feature) => (
                        <label
                          key={feature.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.features.includes(feature.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.features.includes(feature.id)}
                            onChange={() => handleFeatureToggle(feature.id)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{feature.name}</div>
                            {feature.price > 0 && (
                              <div className="text-sm text-gray-600">+{feature.price}€</div>
                            )}
                          </div>
                          {formData.features.includes(feature.id) && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Informations du projet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget approximatif
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez votre budget</option>
                        <option value="500-1000">500€ - 1 000€</option>
                        <option value="1000-2500">1 000€ - 2 500€</option>
                        <option value="2500-5000">2 500€ - 5 000€</option>
                        <option value="5000-10000">5 000€ - 10 000€</option>
                        <option value="10000+">Plus de 10 000€</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Délai souhaité
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez le délai</option>
                        <option value="1-2-semaines">1-2 semaines</option>
                        <option value="3-4-semaines">3-4 semaines</option>
                        <option value="1-2-mois">1-2 mois</option>
                        <option value="3-6-mois">3-6 mois</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Informations de contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'entreprise *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre entreprise"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description du projet *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez votre projet en détail..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Continuer</span>
                  </button>
                </form>
              </motion.div>
            )}

            {currentStep === 'choice' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment souhaitez-vous recevoir votre devis ?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <div className="flex items-center mb-4">
                      <UserPlus className="w-8 h-8 text-blue-600 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-900">Créer un compte</h4>
                    </div>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      <li>• Suivi en temps réel de votre demande</li>
                      <li>• Accepter/refuser les devis directement</li>
                      <li>• Historique de tous vos projets</li>
                      <li>• Communication directe avec l'équipe</li>
                    </ul>
                    <button
                      onClick={() => setCurrentStep('register')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Créer un compte
                    </button>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                    <div className="flex items-center mb-4">
                      <Mail className="w-8 h-8 text-green-600 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-900">Continuer en invité</h4>
                    </div>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      <li>• Devis envoyé par email</li>
                      <li>• Réponse par email/téléphone</li>
                      <li>• Pas de suivi en ligne</li>
                      <li>• Plus rapide</li>
                    </ul>
                    <button
                      onClick={handleGuestSubmit}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Envoi en cours...' : 'Envoyer le devis'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep('form')}
                  className="mt-6 text-gray-600 hover:text-gray-800 flex items-center"
                >
                  ← Retour au formulaire
                </button>
              </motion.div>
            )}

            {currentStep === 'register' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Créer votre compte</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={registerData.lastName}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 6 caractères"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirmez votre mot de passe"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleAccountSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{isLoading ? 'Création en cours...' : 'Créer le compte et envoyer le devis'}</span>
                </button>

                <button
                  onClick={() => setCurrentStep('choice')}
                  className="mt-4 text-gray-600 hover:text-gray-800 flex items-center"
                >
                  ← Retour aux options
                </button>
              </motion.div>
            )}

            {currentStep === 'submit' && isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-lg p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Devis envoyé avec succès !</h3>
                <p className="text-gray-600 mb-6">
                  Nous avons bien reçu votre demande de devis. Notre équipe va l'étudier et vous répondra dans les plus brefs délais.
                </p>
                {userChoice === 'account' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">
                      Votre compte a été créé ! Vous pouvez maintenant suivre l'évolution de votre demande dans votre dashboard.
                    </p>
                  </div>
                )}
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Retour à l'accueil
                </button>
              </motion.div>
            )}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
            >
              <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Estimation</h3>
              </div>

              <div className="space-y-4">
                {/* Projet sélectionné */}
                {formData.projectType && (
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Projet sélectionné</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{getSelectedProjectType()?.name}</span>
                      <span className="font-semibold text-gray-900">{getSelectedProjectType()?.basePrice}€</span>
                    </div>
                  </div>
                )}

                {/* Fonctionnalités sélectionnées */}
                {formData.features.length > 0 && (
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Fonctionnalités</h4>
                    <div className="space-y-2">
                      {getSelectedFeatures().map((feature) => (
                        <div key={feature.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{feature.name}</span>
                          <span className="text-gray-900">
                            {feature.price > 0 ? `+${feature.price}€` : 'Inclus'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Total estimé</span>
                    <span className="text-2xl text-blue-600">{estimatedPrice}€</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Prix indicatif basé sur vos sélections
                  </p>
                </div>

                {/* Inclus dans l'estimation */}
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Inclus dans l'estimation :</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Analyse et conception</li>
                    <li>• Développement complet</li>
                    <li>• Tests et optimisations</li>
                    <li>• Formation utilisateur</li>
                    <li>• Support 30 jours</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

