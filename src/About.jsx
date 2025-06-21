import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Globe, Users } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const experiences = [
    {
      icon: Globe,
      title: 'Sites Habbo Rétro',
      description: 'Création de communautés virtuelles et gestion de serveurs de jeu'
    },
    {
      icon: Users,
      title: 'Blogs & Forums',
      description: 'Développement de plateformes communautaires avec MyBB'
    },
    {
      icon: Code,
      title: 'E-commerce',
      description: 'Boutiques en ligne avec Shopify et WooCommerce'
    }
  ];

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
              À propos d'
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Alex Truchy
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Product Builder No-code passionné, diplômé de l'École CUBE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo et informations principales */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 mr-3" />
                  <h2 className="text-2xl font-bold">Formation</h2>
                </div>
                <h3 className="text-xl font-semibold mb-2">École CUBE</h3>
                <p className="text-blue-100 mb-4">Bac+4 Product Builder No-code</p>
                <p className="text-blue-100">
                  Fraîchement diplômé avec une expertise approfondie dans les technologies no-code 
                  et la création de solutions numériques innovantes.
                </p>
              </div>
            </motion.div>

            {/* Texte de présentation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Une passion née très tôt
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Depuis mon plus jeune âge, je suis passionné par la création de sites web et 
                d'applications. Cette passion m'a mené à explorer différents domaines du 
                développement web, des communautés virtuelles aux plateformes e-commerce.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Aujourd'hui, fort de mon diplôme de l'École CUBE et de mes années d'expérience, 
                je me spécialise dans le no-code pour offrir des solutions rapides, efficaces 
                et sur mesure à mes clients.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mon approche combine créativité, expertise technique et compréhension des 
                besoins business pour transformer vos idées en réalité numérique.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expériences Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mon Parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des premières expériences aux projets professionnels, 
              découvrez les étapes qui ont forgé mon expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <exp.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{exp.title}</h3>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophie Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ma Philosophie
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                "Le no-code n'est pas seulement une technologie, c'est une révolution qui 
                démocratise la création numérique. Mon objectif est de rendre cette puissance 
                accessible à tous, en transformant vos idées les plus ambitieuses en solutions 
                concrètes et performantes."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Rapidité</h3>
                  <p className="opacity-90">
                    Développement accéléré grâce aux plateformes no-code
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Qualité</h3>
                  <p className="opacity-90">
                    Solutions robustes et scalables pour votre business
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                  <p className="opacity-90">
                    Approches créatives pour des résultats exceptionnels
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

