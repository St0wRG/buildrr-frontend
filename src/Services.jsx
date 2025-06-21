import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  ShoppingCart, 
  Database, 
  Workflow, 
  Palette, 
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Création de Sites Web',
      description: 'Sites web modernes et responsives avec Framer ou Bubble',
      features: [
        'Design responsive et moderne',
        'Optimisation SEO',
        'Animations fluides',
        'Interface intuitive',
        'Hébergement inclus'
      ],
      platforms: ['Framer', 'Bubble'],
      color: 'from-blue-500 to-cyan-500',
      price: 'À partir de 800€'
    },
    {
      icon: ShoppingCart,
      title: 'Boutiques E-commerce',
      description: 'Solutions complètes pour vendre en ligne',
      features: [
        'Catalogue produits',
        'Gestion des commandes',
        'Paiements sécurisés',
        'Gestion des stocks',
        'Analytics intégrés'
      ],
      platforms: ['Shopify', 'WooCommerce', 'Bubble'],
      color: 'from-purple-500 to-pink-500',
      price: 'À partir de 1200€'
    },
    {
      icon: Database,
      title: 'Logiciels Métier',
      description: 'Applications sur mesure pour votre entreprise',
      features: [
        'Gestion des données',
        'Workflows personnalisés',
        'Tableaux de bord',
        'Rapports automatisés',
        'Intégrations API'
      ],
      platforms: ['Bubble', 'Airtable'],
      color: 'from-green-500 to-emerald-500',
      price: 'À partir de 1500€'
    },
    {
      icon: Workflow,
      title: 'Automatisation',
      description: 'Automatisez vos processus métier',
      features: [
        'Connexion entre outils',
        'Workflows automatisés',
        'Notifications intelligentes',
        'Synchronisation de données',
        'Monitoring en temps réel'
      ],
      platforms: ['Make', 'Zapier'],
      color: 'from-orange-500 to-red-500',
      price: 'À partir de 500€'
    },
    {
      icon: BarChart3,
      title: 'Bases de Données',
      description: 'Organisation et gestion de vos données',
      features: [
        'Structure optimisée',
        'Relations complexes',
        'Formulaires dynamiques',
        'Vues personnalisées',
        'Collaboration équipe'
      ],
      platforms: ['Airtable', 'Notion'],
      color: 'from-indigo-500 to-purple-500',
      price: 'À partir de 400€'
    },
    {
      icon: Palette,
      title: 'Design & UX',
      description: 'Interfaces utilisateur exceptionnelles',
      features: [
        'Design system complet',
        'Prototypage interactif',
        'Tests utilisateurs',
        'Optimisation conversion',
        'Accessibilité'
      ],
      platforms: ['Figma', 'Framer'],
      color: 'from-pink-500 to-rose-500',
      price: 'À partir de 600€'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins numériques, 
              développées avec les meilleures plateformes no-code du marché.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités incluses :</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Plateformes utilisées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.platforms.map((platform, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${service.color} text-white text-sm rounded-full`}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/quote?service=${encodeURIComponent(service.title)}`}
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre Processus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthode éprouvée pour garantir le succès de votre projet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Analyse',
                description: 'Étude approfondie de vos besoins et objectifs'
              },
              {
                step: '02',
                title: 'Conception',
                description: 'Design et architecture de votre solution'
              },
              {
                step: '03',
                title: 'Développement',
                description: 'Création avec les meilleures plateformes no-code'
              },
              {
                step: '04',
                title: 'Livraison',
                description: 'Tests, formation et mise en production'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Obtenez un devis personnalisé en quelques minutes et découvrez 
              comment nous pouvons transformer votre idée en réalité.
            </p>
            <Link
              to="/quote"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Obtenir un devis gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;

