import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      category: 'Général',
      questions: [
        {
          id: 1,
          question: 'Qu\'est-ce que le no-code ?',
          answer: 'Le no-code est une approche de développement qui permet de créer des applications et des sites web sans écrire de code traditionnel. Grâce à des plateformes visuelles comme Bubble, Framer ou Shopify, nous pouvons développer des solutions complètes en utilisant des interfaces graphiques intuitives.'
        },
        {
          id: 2,
          question: 'Quels sont les avantages du no-code ?',
          answer: 'Le no-code offre plusieurs avantages : développement plus rapide (3 à 5 fois plus vite), coûts réduits, facilité de maintenance, possibilité de modifications rapides, et une mise sur le marché accélérée. De plus, les solutions no-code sont souvent plus accessibles pour les non-développeurs.'
        },
        {
          id: 3,
          question: 'Les solutions no-code sont-elles fiables ?',
          answer: 'Absolument ! Les plateformes no-code modernes comme Bubble, Shopify ou Airtable sont utilisées par des milliers d\'entreprises dans le monde. Elles offrent une sécurité robuste, une scalabilité éprouvée et des performances optimales. De nombreuses startups et grandes entreprises utilisent ces technologies avec succès.'
        }
      ]
    },
    {
      category: 'Services',
      questions: [
        {
          id: 4,
          question: 'Quels types de projets pouvez-vous réaliser ?',
          answer: 'Nous réalisons une large gamme de projets : sites web vitrine et corporate, boutiques e-commerce, applications métier (CRM, ERP), plateformes de gestion, systèmes d\'automatisation, bases de données personnalisées, et bien plus. Si votre projet peut être conceptualisé, nous pouvons probablement le réaliser en no-code.'
        },
        {
          id: 5,
          question: 'Combien de temps prend un projet typique ?',
          answer: 'La durée dépend de la complexité du projet. Un site web simple peut être réalisé en 1-2 semaines, une boutique e-commerce en 2-4 semaines, et une application métier complexe en 1-3 mois. Nous fournissons toujours un planning détaillé lors du devis.'
        },
        {
          id: 6,
          question: 'Proposez-vous de la maintenance après livraison ?',
          answer: 'Oui, nous proposons différents packages de maintenance : support technique, mises à jour de contenu, ajout de fonctionnalités, optimisations de performance, et formation continue. Chaque projet inclut 30 jours de support gratuit après livraison.'
        }
      ]
    },
    {
      category: 'Processus',
      questions: [
        {
          id: 7,
          question: 'Comment se déroule un projet ?',
          answer: 'Notre processus se déroule en 4 étapes : 1) Analyse approfondie de vos besoins et objectifs, 2) Conception et design de la solution, 3) Développement avec les meilleures plateformes no-code, 4) Tests, formation et mise en production. Vous êtes impliqué à chaque étape.'
        },
        {
          id: 8,
          question: 'Puis-je modifier mon projet en cours de développement ?',
          answer: 'Oui, l\'un des avantages du no-code est la flexibilité. Nous pouvons intégrer des modifications pendant le développement. Cependant, des changements majeurs peuvent impacter le délai et le budget, c\'est pourquoi nous discutons de tout changement avant implémentation.'
        },
        {
          id: 9,
          question: 'Fournissez-vous une formation ?',
          answer: 'Absolument ! Nous incluons une formation complète pour que vous puissiez gérer votre solution en autonomie. Cette formation couvre l\'utilisation quotidienne, la gestion du contenu, et les bonnes pratiques. Nous proposons aussi des sessions de formation avancée si nécessaire.'
        }
      ]
    },
    {
      category: 'Tarification',
      questions: [
        {
          id: 10,
          question: 'Comment sont calculés vos tarifs ?',
          answer: 'Nos tarifs sont basés sur la complexité du projet, les fonctionnalités requises, et le temps de développement estimé. Nous proposons des tarifs transparents avec un devis détaillé. Les prix commencent à 400€ pour une base de données simple et peuvent aller jusqu\'à plusieurs milliers d\'euros pour des projets complexes.'
        },
        {
          id: 11,
          question: 'Proposez-vous des facilités de paiement ?',
          answer: 'Oui, nous proposons plusieurs options de paiement : paiement en une fois avec remise, paiement en 2 ou 3 fois sans frais, ou paiement échelonné selon les étapes du projet. Nous nous adaptons à vos contraintes budgétaires.'
        },
        {
          id: 12,
          question: 'Y a-t-il des coûts cachés ?',
          answer: 'Non, nous pratiquons une politique de transparence totale. Tous les coûts sont détaillés dans le devis : développement, hébergement, licences des plateformes, formation, et maintenance. Aucune surprise, vous savez exactement ce que vous payez et pourquoi.'
        }
      ]
    },
    {
      category: 'Technique',
      questions: [
        {
          id: 13,
          question: 'Quelles plateformes utilisez-vous ?',
          answer: 'Nous utilisons les meilleures plateformes no-code du marché : Bubble pour les applications web complexes, Framer pour les sites web modernes, Shopify et WooCommerce pour l\'e-commerce, Airtable pour les bases de données, Make pour l\'automatisation, et bien d\'autres selon vos besoins.'
        },
        {
          id: 14,
          question: 'Mes données sont-elles sécurisées ?',
          answer: 'La sécurité est notre priorité. Toutes les plateformes que nous utilisons respectent les standards de sécurité les plus élevés (GDPR, SSL, chiffrement des données). Nous mettons en place des mesures de sécurité supplémentaires selon vos besoins : authentification à deux facteurs, sauvegardes automatiques, etc.'
        },
        {
          id: 15,
          question: 'Puis-je récupérer mes données si je change de prestataire ?',
          answer: 'Oui, vous restez propriétaire de vos données. Nous pouvons vous fournir des exports complets de votre base de données et vous donner accès aux comptes des plateformes utilisées. Nous facilitons toujours la transition si vous souhaitez changer de prestataire.'
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
              Questions 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fréquentes
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos services, 
              le no-code et notre processus de travail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gradient-to-r from-blue-600 to-purple-600">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                      </div>
                      {openItems[item.id] ? (
                        <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openItems[item.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="pl-10 pr-4">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Notre équipe est là pour répondre à toutes vos questions spécifiques. 
              N'hésitez pas à nous contacter !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:contact@buildrr.fr"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Nous contacter
              </a>
              <a
                href="#"
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Prendre rendez-vous
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

