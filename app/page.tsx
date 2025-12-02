'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll for navigation links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in'
    );
    animatedElements.forEach((el) => observer.observe(el));

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.scale-in');
    serviceCards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
    });

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="border-b border-black py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light italic mb-2 tracking-tight">
            Beyra Jean Didier Stanislas Aka
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light text-gray-600">
            Ingénieur en Développement d'Applications
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden block w-full text-left mb-2 text-sm uppercase tracking-wider"
          >
            {mobileMenuOpen ? 'Fermer ✕' : 'Menu ☰'}
          </button>
          <ul
            id="nav-menu"
            className={`${
              mobileMenuOpen ? 'flex' : 'hidden'
            } md:flex md:space-x-8 text-sm uppercase tracking-wider md:flex-row flex-col space-y-2 md:space-y-0`}
          >
            <li>
              <a href="#home" onClick={handleNavClick} className="hover-underline block py-1">
                Accueil
              </a>
            </li>
            <li>
              <a href="#profil" onClick={handleNavClick} className="hover-underline block py-1">
                Profil
              </a>
            </li>
            <li>
              <a href="#projets" onClick={handleNavClick} className="hover-underline block py-1">
                Projets
              </a>
            </li>
            <li>
              <a
                href="#competences"
                onClick={handleNavClick}
                className="hover-underline block py-1"
              >
                Compétences
              </a>
            </li>
            <li>
              <a href="#services" onClick={handleNavClick} className="hover-underline block py-1">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" onClick={handleNavClick} className="hover-underline block py-1">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center text-center py-12 md:py-16 fade-in overflow-hidden">
        {/* Image de couverture - Ajoutez votre image dans public/images/cover.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cover.jpeg"
            alt="Cover"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            priority
            onError={(e) => {
              // Cache l'image si elle n'existe pas
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Image de profil - Ajoutez votre image dans public/images/profile.jpg */}
          <div className="mb-6 flex justify-center fade-in">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-50">
        <Image
                src="/images/profile.jpeg"
                alt="Beyra Jean Didier Stanisas"
                width={160}
                height={160}
                className="object-cover object-top w-full h-full"
          priority
                onError={(e) => {
                  // Cache l'image si elle n'existe pas
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300 text-sm">Photo</div>';
                  }
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light italic mb-4 leading-tight tracking-tight">
            Développeur d'Applications Informatiques & Génie Logiciel
          </h1>
          <p className="text-lg md:text-xl font-light mb-3 text-gray-700 max-w-3xl mx-auto">
            Je conçois des applications web, mobiles et des systèmes sécurisés adaptés aux besoins
            modernes.
          </p>
          <p className="text-base md:text-lg font-light max-w-2xl mx-auto mb-8 leading-relaxed text-gray-600">
            Passionné par l&apos;innovation technologique, je développe des solutions fiables,
            sécurisées et performantes dans les domaines du numérique et de la finance digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#profil"
              className="inline-block border border-black px-6 py-2 transition-all hover:bg-black hover:text-white font-light text-sm uppercase tracking-wider bg-white"
            >
              Voir mon profil
            </a>
            <a
              href="#projets"
              className="inline-block border border-black px-6 py-2 transition-all hover:bg-black hover:text-white font-light text-sm uppercase tracking-wider bg-white"
            >
              Voir mes projets
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        {/* Profil Section */}
        <section id="profil" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black fade-in">
            À Propos de Moi
          </h2>

          {/* Row 1: Présentation */}
          <div className="mb-12 fade-in">
            <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-gray-700">
              Je suis <strong className="text-black font-normal">développeur d'applications informatiques</strong>, titulaire
              d'un <strong className="text-black font-normal">diplôme en informatique et en génie logiciel</strong>. Je suis
              spécialisé dans la conception et le développement de solutions numériques robustes,
              sécurisées et évolutives.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-gray-700">
              J&apos;interviens aussi bien sur le <strong className="text-black font-normal">backend</strong>, le{' '}
              <strong className="text-black font-normal">frontend</strong> que sur le <strong className="text-black font-normal">développement mobile</strong>, ce qui me
              permet de maîtriser entièrement un projet, de l&apos;analyse à la mise en production.
              Mon travail est axé sur la performance, la fiabilité, la sécurité des données et
              l&apos;automatisation intelligente des processus.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-gray-700">
              Je développe principalement des applications orientées vers :
            </p>
            <ul className="space-y-3 font-light text-lg text-gray-700">
              <li className="flex items-start">
                <span className="mr-4 text-black">—</span>
                <span>Les <strong className="text-black font-normal">systèmes financiers</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-black">—</span>
                <span>Les <strong className="text-black font-normal">plateformes de paiement</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-black">—</span>
                <span>Les <strong className="text-black font-normal">applications connectées en temps réel</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-black">—</span>
                <span>Les <strong className="text-black font-normal">API sécurisées</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-black">—</span>
                <span>Les systèmes de <strong className="text-black font-normal">gestion intelligente</strong></span>
              </li>
            </ul>
          </div>

          {/* Row 2: Domaines de Compétence */}
          <div className="mb-12 fade-in">
            <h3 className="text-2xl font-light mb-8 italic">Domaines de Compétence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-light">
              {[
                {
                  tag: "Développement d'applications web",
                  desc: "Création d'applications web modernes, responsives et performantes",
                },
                {
                  tag: "Développement d'applications mobiles",
                  desc: "Développement d'applications iOS et Android natives et cross-platform",
                },
                {
                  tag: "Conception d'API sécurisées",
                  desc: "Architecture et développement d'API RESTful sécurisées et documentées",
                },
                {
                  tag: "Systèmes de paiement et de transfert d'argent",
                  desc: 'Intégration de solutions de paiement sécurisées et systèmes de transfert',
                },
                {
                  tag: 'WebSocket & temps réel',
                  desc: 'Communication bidirectionnelle en temps réel pour applications interactives',
                },
                {
                  tag: 'Bases de données relationnelles',
                  desc: 'Conception et optimisation de schémas de bases de données relationnelles',
                },
                {
                  tag: 'Sécurité des transactions',
                  desc: 'Mise en place de mécanismes de sécurité pour transactions financières',
                },
                {
                  tag: 'Architecture logicielle',
                  desc: "Conception d'architectures modulaires, scalables et maintenables",
                },
                {
                  tag: "Automatisation des processus",
                  desc: 'Optimisation et automatisation des processus métier et techniques',
                },
                {
                  tag: 'Maintenance et fiabilité logicielle',
                  desc: 'Maintenance préventive et corrective pour assurer la fiabilité des systèmes',
                },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-black pb-4">
                  <div className="text-sm uppercase tracking-wider mb-2 font-medium">
                    {item.tag}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Technologies & Outils */}
          <div className="mb-12 fade-in">
            <h3 className="text-2xl font-light mb-8 italic">Technologies & Outils</h3>
            <div className="space-y-8 font-light">
              {/* Backend */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Backend</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      tag: 'Laravel', 
                      desc: 'Framework PHP pour applications web robustes',
                      avantages: ['Architecture MVC claire', 'ORM Eloquent puissant', 'Sécurité intégrée', 'Écosystème riche']
                    },
                    {
                      tag: 'NestJS',
                      desc: 'Framework Node.js pour APIs scalables et modulaires',
                      avantages: ['Architecture modulaire', 'TypeScript natif', 'Injection de dépendances', 'Scalabilité élevée']
                    },
                    {
                      tag: 'Node.js',
                      desc: 'Runtime JavaScript pour applications backend performantes',
                      avantages: ['Asynchrone et non-bloquant', 'Performance élevée', 'Écosystème npm', 'JavaScript full-stack']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Frontend</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      tag: 'React',
                      desc: 'Bibliothèque JavaScript pour interfaces utilisateur interactives',
                      avantages: ['Composants réutilisables', 'Virtual DOM performant', 'Écosystème riche', 'Communauté active']
                    },
                    {
                      tag: 'Next.js',
                      desc: 'Framework React pour applications web full-stack optimisées',
                      avantages: ['Rendu côté serveur', 'Optimisation automatique', 'Routing intégré', 'Performance SEO']
                    },
                    {
                      tag: 'HTML, CSS, JavaScript',
                      desc: 'Fondations du développement web moderne',
                      avantages: ['Standards web universels', 'Compatibilité maximale', 'Base solide', 'Accessibilité']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Mobile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      tag: 'Flutter',
                      desc: 'Framework Google pour applications mobiles cross-platform',
                      avantages: ['Un seul code pour iOS/Android', 'Performance native', 'UI riche', 'Hot reload']
                    },
                    {
                      tag: 'Expo (React Native)',
                      desc: 'Plateforme pour développer des applications React Native',
                      avantages: ['Développement rapide', 'Déploiement simplifié', 'APIs natives', 'Communauté active']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Base de données */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">
                  Base de données
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      tag: 'MySQL',
                      desc: 'Système de gestion de base de données relationnelle open-source',
                      avantages: ['Performance élevée', 'Facilité d\'utilisation', 'Large communauté', 'Intégration facile']
                    },
                    {
                      tag: 'PostgreSQL',
                      desc: 'Base de données relationnelle avancée et open-source',
                      avantages: ['ACID complet', 'Fonctionnalités avancées', 'Extensibilité', 'Fiabilité']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Temps réel */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Temps réel</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-b border-black pb-3">
                    <div className="text-sm font-medium mb-2">
                      WebSocket
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      Protocole de communication bidirectionnelle en temps réel
                    </p>
                    <div className="text-xs text-gray-500">
                      <div className="font-medium mb-1">Avantages :</div>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Communication instantanée</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Faible latence</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Bidirectionnel</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Efficace pour les applications interactives</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paiement */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Paiement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-b border-black pb-3">
                    <div className="text-sm font-medium mb-2">
                      Mobile Money & Wallets
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      Solutions de paiement mobile et portefeuilles numériques
                    </p>
                    <div className="text-xs text-gray-500">
                      <div className="font-medium mb-1">Avantages :</div>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Accessibilité accrue</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Transactions sécurisées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Facilité d'utilisation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Intégration multi-opérateurs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outils */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Outils</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      tag: 'Excel VBA', 
                      desc: 'Automatisation et macros pour Excel',
                      avantages: ['Automatisation des tâches', 'Traitement de données', 'Rapports automatisés', 'Gain de temps']
                    },
                    {
                      tag: 'Systèmes OTP',
                      desc: 'Mots de passe à usage unique pour authentification sécurisée',
                      avantages: ['Sécurité renforcée', 'Protection contre le vol', 'Authentification à deux facteurs', 'Conformité']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sécurité */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">Sécurité</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      tag: 'Chiffrement',
                      desc: 'Protection des données sensibles par cryptage',
                      avantages: ['Protection des données', 'Confidentialité garantie', 'Conformité RGPD', 'Sécurité des transactions']
                    },
                    {
                      tag: 'Authentification sécurisée',
                      desc: "Mécanismes de vérification d'identité robustes",
                      avantages: ['Protection des comptes', 'Prévention des accès non autorisés', 'Multi-facteurs', 'Audit de sécurité']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-black pb-3">
                      <div className="text-sm font-medium mb-2">
                        {item.tag}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                      {item.avantages && (
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Avantages :</div>
                          <ul className="space-y-1">
                            {item.avantages.map((avantage, aIdx) => (
                              <li key={aIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* DevOps & Déploiement */}
              <div>
                <h4 className="font-light text-sm uppercase tracking-wider mb-4 text-gray-500">DevOps & Déploiement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-b border-black pb-3">
                    <div className="text-sm font-medium mb-2">
                      CI/CD (Intégration & Déploiement Continus)
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      Automatisation du déploiement et de l&apos;intégration continue pour un développement agile
                    </p>
                    <div className="text-xs text-gray-500">
                      <div className="font-medium mb-1">Avantages :</div>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Déploiements automatisés</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Tests automatisés</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Réduction des erreurs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Livraison continue</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 fade-in">
            <h3 className="text-2xl font-light mb-6 italic">Vision & Objectifs</h3>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-gray-700">
              Mon objectif est de concevoir des solutions numériques :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-light mb-6">
              {['Fiables', 'Sécurisées', 'Performantes', 'Évolutives'].map((item, idx) => (
                <div key={idx} className="flex items-start text-lg text-gray-700">
                  <span className="mr-4 text-black">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700">
              Je souhaite contribuer activement à la transformation digitale à travers des projets
              à fort impact technologique, financier et social.
            </p>
          </div>
        </section>

        {/* Projets Section */}
        <section id="projets" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black fade-in">
            Projets
          </h2>

          <div className="space-y-16">
            {[
              {
                title: 'Paytou – Application de Paiement Mobile',
                description: (
                  <>
                    Application de transfert d'argent permettant l&apos;envoi et la réception
                    de fonds, intégrant plusieurs services Mobile Money, avec gestion des
                    transactions en temps réel et sécurité par OTP. Elle est utilisée comme{' '}
                    <strong>moyen de paiement principal</strong> dans plusieurs plateformes.
                  </>
                ),
                features: null,
              },
              {
                title: "Agrégateur de Paiement & Générateur d'API",
                description: (
                  <>
                    Plateforme permettant aux développeurs de générer des API de paiement, connecter
                    leurs applications à un système centralisé, automatiser les paiements et suivre
                    les revenus via un tableau de bord sécurisé.
                  </>
                ),
                features: null,
              },
              {
                title: 'Système de Gestion de Budget (API & Mobile)',
                description: 'Application complète intégrant :',
                features: [
                  'Authentification',
                  'Gestion des utilisateurs',
                  'Catégories',
                  'Transactions',
                  'Budgets',
                  'Paiements',
                  'Objectifs financiers',
                  'Tableau de bord financier',
                ],
              },
              {
                title: 'Application de Gestion de Tâches & Groupes',
                description: (
                  <>
                    Plateforme permettant la création de groupes, la gestion de projets,
                    l&apos;attribution de tâches, le chat en temps réel entre membres et la gestion
                    de tâches personnelles.
                  </>
                ),
                features: null,
              },
              {
                title: 'eti_immo – Application de Gestion Immobilière',
                description: (
                  <>
                    Application complète de gestion immobilière permettant la gestion des biens
                    immobiliers, des locataires, des contrats de location, des paiements et des
                    documents. Solution moderne pour optimiser la gestion de portefeuilles
                    immobiliers.
                  </>
                ),
                features: null,
              },
              {
                title: "Plateforme E-commerce – Vente d'Articles",
                description: (
                  <>
                    Plateforme e-commerce complète pour la vente d'articles destinés aux hommes,
                    aux enfants et aux produits de beauté. Solution moderne avec gestion de
                    catalogue, panier d'achat, système de paiement sécurisé et gestion des
                    commandes.
                  </>
                ),
                features: [
                  'Catalogue produits multi-catégories',
                  'Gestion des stocks',
                  "Panier d'achat",
                  'Système de paiement intégré',
                  'Gestion des commandes',
                  'Espace client',
                  'Administration des produits',
                ],
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="fade-in project-card"
              >
                <h3 className="text-2xl md:text-3xl font-light italic mb-4">{project.title}</h3>
                <div className="font-light leading-relaxed text-lg text-gray-700">
                  {typeof project.description === 'string' ? (
                    <p>{project.description}</p>
                  ) : (
                    project.description
                  )}
                  {project.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-light mt-6">
                      {project.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start">
                          <span className="mr-3 text-black">—</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compétences Section */}
        <section id="competences" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black fade-in">
            Compétences Techniques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-light fade-in">
            {[
              {
                tag: 'Développement Backend',
                desc: 'Architecture et développement de serveurs, APIs et logique métier robustes',
              },
              {
                tag: 'Développement Frontend',
                desc: "Création d'interfaces utilisateur modernes, interactives et responsives",
              },
              {
                tag: 'Développement Mobile',
                desc: 'Applications natives et cross-platform pour iOS et Android',
              },
              {
                tag: "Conception d'API",
                desc: "Design et développement d'API RESTful sécurisées et performantes",
              },
              {
                tag: 'Sécurité des systèmes',
                desc: 'Protection des données et implémentation de mesures de sécurité avancées',
              },
              {
                tag: 'WebSocket & Temps réel',
                desc: 'Communication bidirectionnelle instantanée pour applications interactives',
              },
              {
                tag: 'Bases de données',
                desc: 'Conception, optimisation et gestion de bases de données relationnelles',
              },
              {
                tag: 'Systèmes financiers',
                desc: 'Développement de solutions sécurisées pour le secteur financier',
              },
              {
                tag: 'Automatisation logicielle',
                desc: 'Optimisation et automatisation des processus techniques et métier',
              },
              {
                tag: 'CI/CD & Déploiement automatisé',
                desc: "Configuration et mise en place de pipelines d'intégration continue (CI) et de déploiement continu (CD) pour automatiser les tests, la construction et le déploiement des applications, garantissant une livraison rapide, fiable et sécurisée",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-black pb-4">
                <div className="text-sm uppercase tracking-wider mb-2 font-medium">
                  {item.tag}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black fade-in">
            Services
          </h2>
          <p className="text-xl font-light mb-12 fade-in text-gray-700">Je propose les services suivants :</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Développement d'applications web",
                desc: 'Solutions web modernes et performantes adaptées à vos besoins.',
              },
              {
                title: "Développement d'applications mobiles",
                desc: 'Applications iOS et Android natives et cross-platform.',
              },
              {
                title: "Création d'API & systèmes backend",
                desc: 'Architecture backend robuste et scalable pour vos applications.',
              },
              {
                title: "Intégration de solutions de paiement",
                desc: 'Systèmes de paiement sécurisés et fiables intégrés à vos plateformes.',
              },
              {
                title: 'Automatisation de systèmes',
                desc: 'Optimisation et automatisation des processus métier.',
              },
              {
                title: 'Mise en place de plateformes sécurisées',
                desc: 'Sécurité et protection des données selon les meilleures pratiques.',
              },
              {
                title: 'Déploiement automatisé (CI/CD)',
                desc: "Configuration et mise en place de pipelines d'intégration continue (CI) et de déploiement continu (CD) pour automatiser les tests, la construction et le déploiement des applications, garantissant une livraison rapide, fiable et sécurisée.",
              },
              {
                title: "Maintenance et amélioration d'applications existantes",
                desc: 'Support technique et évolution continue de vos applications.',
                fullWidth: true,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`border-b border-black pb-6 fade-in scale-in ${
                  item.fullWidth ? 'md:col-span-2' : ''
                }`}
              >
                <h3 className="text-xl font-light italic mb-3">{item.title}</h3>
                <p className="font-light text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parcours Section */}
        <section id="parcours" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black">
            Parcours Professionnel
          </h2>

          <div className="space-y-12">
            {[
              {
                title: "Ingénieur en Développement d'Applications",
                period: 'Présent',
                desc: "Conception et développement d'applications complètes (frontend et backend) avec une expertise en architecture modulaire et scalable. Création d'interfaces utilisateur créatives et innovantes tout en maintenant une structure de code propre et maintenable.",
              },
              {
                title: 'Développeur Full Stack',
                period: 'Expérience',
                desc: "Développement d'applications web et mobiles utilisant diverses technologies modernes. Maîtrise de l'ensemble du stack technologique, de la base de données à l'interface utilisateur.",
              },
              {
                title: 'Spécialisation IA & Data Science',
                period: 'Formation Continue',
                desc: "Apprentissage actif du Machine Learning et de la Data Science, intégration d'outils d'intelligence artificielle dans les projets de développement.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-2 border-black pl-8">
                <h3 className="text-xl md:text-2xl font-light italic mb-3">{item.title}</h3>
                <p className="text-sm uppercase tracking-wider mb-4 text-gray-500">{item.period}</p>
                <p className="font-light leading-relaxed text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diplômes Section */}
        <section id="diplomes" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black">
            Formation & Diplômes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Ingénierie en Développement d'Applications",
                type: "Diplôme d'Ingénieur",
                desc: 'Formation complète en développement logiciel, architecture applicative et gestion de projets.',
              },
              {
                title: 'Développement Web & Mobile',
                type: 'Certifications',
                desc: 'Expertise en technologies frontend (React, Flutter) et backend (Laravel, NestJS, Node.js).',
              },
              {
                title: "Intelligence Artificielle",
                type: 'Formation Spécialisée',
                desc: "Machine Learning, Data Science et outils d'IA modernes.",
              },
              {
                title: 'Architecture Logicielle',
                type: 'Spécialisation',
                desc: 'Modélisation UML, architecture modulaire et scalable, design patterns avancés.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-black pb-6">
                <h3 className="text-xl font-light italic mb-3">{item.title}</h3>
                <p className="text-sm uppercase tracking-wider mb-3 text-gray-500">{item.type}</p>
                <p className="font-light text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-light italic mb-12 pb-4 border-b border-black fade-in">
            Contact
          </h2>
          <p className="text-xl font-light mb-12 fade-in text-gray-700">Tu peux me contacter via :</p>

          <div className="max-w-2xl fade-in">
            <div className="space-y-6">
              <a
                href="mailto:beyrastanislas@gmail.com"
                className="border-b border-black pb-4 block hover-underline transition-all"
              >
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2">
                  Email
                </span>
                <span className="text-lg md:text-xl font-light break-all">
                  beyrastanislas@gmail.com
                </span>
          </a>
          <a
                href="https://wa.me/2250705137055"
                className="border-b border-black pb-4 block hover-underline transition-all"
              >
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2">
                  WhatsApp
                </span>
                <span className="text-lg md:text-xl font-light">+225 07 05 13 70 55</span>
          </a>
        </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-6 md:py-8 mt-12 md:mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="font-light text-xs md:text-sm">
            © 2025 Beyra Jean Didier Stanisas — Ingénieur en Développement d'Applications
          </p>
          <p className="font-light text-xs mt-2 italic opacity-70">
            Développeur Multitâche • Architecture Modulaire & Scalable • Design Innovant
          </p>
        </div>
      </footer>
    </div>
  );
}
