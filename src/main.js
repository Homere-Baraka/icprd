// main.js - Gestion du menu mobile et traduction

// ============================================
// DONNÉES DE TRADUCTION
// ============================================

const translations = {
   en: {
    // Header
    "nav.about": "About Us",
    "nav.what-we-do": "What we do",
    "nav.insights": "Insights",
    "nav.team": "Team",
    "nav.contact": "Contact",
    "header.donate": "Donate Now",
    
    // Hero section
    "hero.badge": "Since 2004 • DRC focus",
    "hero.title": "Building Sustainable Peace & Stability",
    "hero.title_highlight": "Peace",
    "hero.subtitle": "The Christian Initiative for Peace, Reconciliation and Development (ICPRD) works to empower local communities and foster regional harmony through dialogue and sustainable development.",
    "hero.button1": "Get Involved",
    "hero.button2": "Our Strategic Plan",
    
    // Stats section
    "stats.combatants": "Disarmed Combatants",
    "stats.experience": "Years of Experience",
    "stats.communities": "Communities Reached",
    "stats.partners": "International Partners",
    
    // Pillars section
    "pillars.subtitle": "Our Intervention Areas",
    "pillars.title": "Driving Change Across Three Core Pillars",
    "pillars.description": "Our holistic approach ensures that peace is not just the absence of conflict, but the presence of justice and opportunity.",
    
    "pillar1.title": "Peace Consolidation",
    "pillar1.desc": "A key player in Disarmament, Demobilization and Reintegration (DDR) in South Kivu. We facilitate the repatriation of armed groups and the socio-professional reintegration of combatants.",
    "pillar1.learn": "Learn More",
    
    "pillar2.title": "Humanitarian Emergency",
    "pillar2.desc": "We intervene in health and nutrition when needed during our activities, with the support of our partners.",
    "pillar2.learn": "Learn More",
    
    "pillar3.title": "Sustainable Development",
    "pillar3.desc": "We strengthen community resilience through vocational training, empowerment and advocacy for human rights and local development.",
    "pillar3.learn": "Learn More",
    
    // Mission section
    "mission.title": "Our Mission: To Heal through",
    "mission.title_highlight": "Action",
    "mission.desc": "The Christian Initiative for Peace, Reconciliation and Development (ICPRD) was born from the urgent need to break systemic cycles of conflict in eastern DRC, to help victimized populations.",
    "mission.point1.title": "Field Action and Mediation",
    "mission.point1.desc": "Our approach is based on direct engagement, awareness-raising of conflict parties and mediation to facilitate voluntary disarmament and repatriations.",
    "mission.point2.title": "Community Development",
    "mission.point2.desc": "We believe that lasting peace comes through development. We build training centers and support community autonomy for a stable future.",
    "mission.experience": "Years of Field Commitment",
    
    // Achievements section
    "achievements.title": "Our Achievements",
    "achievements.subtitle": "An overview of our lasting impact across South Kivu and North Kivu over the years.",
    
    "achievement1.title": "1,000+ Former Combatants Reintegrated",
    "achievement1.category": "Peace & Stability",
    "achievement1.status": "Ongoing Project",
    "achievement1.desc": "Through psychological support and vocational training, we successfully reintegrate former combatants, including former child soldiers, into their families and communities.",
    "achievement1.report": "Full Report →",
    
    "achievement2.title": "Voluntary Repatriation of Armed Groups",
    "achievement2.category": "Disarmament",
    "achievement2.status": "2013-2014",
    "achievement2.desc": "ICPRD was a key facilitator in awareness and voluntary disarmament operations of armed groups, including FDLR, directly contributing to reducing tensions and violence.",
    "achievement2.report": "Full Report →",
    
    "achievement3.title": "Kitamba Reintegration Center",
    "achievement3.category": "Development",
    "achievement3.status": "Launched in 2023",
    "achievement3.desc": "We built and equipped a training center in Kitamba (Mwenga), offering skills and a future to demobilized individuals. 'PPR is a lung for development,' attests Mwami Kalenga Riziki Lwango.",
    "achievement3.report": "Full Report →",
    
    // Team section
    "team.title": "Our Leadership Team",
    "team.subtitle": "Guided by committed experts, local activists and dedicated peacemakers.",
    "team.position1": "Executive Secretary",
    "team.position2": "Executive Secretary",
    "team.position3": "Operations Director",
    "team.position4": "Humanitarian Coordinator",
    
    // CTA section
    "cta.title": "Support Peace Today",
    "cta.desc": "Your contribution directly funds our community mediation programs, voluntary disarmament and development projects in conflict-affected areas.",
    "cta.button1": "Make a Donation",
    "cta.button2": "Become a Partner",
    
    // Blog section
    "blog.title": "Latest Reports & Testimonials",
    "blog.subtitle": "Detailed analysis and stories from our field operations across DRC.",
    "blog.viewall": "View all articles",
    
    "blog1.category": "Peace",
    "blog1.title": "The Role of Awareness in Voluntary Disarmament",
    "blog1.desc": "Review of our awareness missions in Kigogo, Burhinyi and Minova that led to the repatriation of hundreds of combatants.",
    "blog1.author": "ICPRD Team",
    "blog1.date": "2 days ago",
    "blog1.views": "views",
    
    "blog2.category": "Training",
    "blog2.title": "Kitamba: A Center for the Future",
    "blog2.desc": "How our socio-professional reintegration center trains former combatants in carpentry, sewing and other trades for successful reintegration.",
    "blog2.author": "Testimony",
    "blog2.date": "5 days ago",
    "blog2.views": "views",
    
    "blog3.category": "Human Rights",
    "blog3.title": "Training Human Rights Defenders",
    "blog3.desc": "Report on our workshop in Bukavu on data collection to document incidents in the mining value chain.",
    "blog3.author": "UN Expert",
    "blog3.date": "1 week ago",
    "blog3.views": "views",
    
    // Contact section
    "contact.title": "Let's Build Peace Together",
    "contact.subtitle": "Whether you're looking to partner, volunteer, or support our programs, we'd love to hear from you.",
    "contact.email": "Email Us",
    "contact.email_value": "contact@icprd.org",
    "contact.location": "Visit Us",
    "contact.location_value": "Bukavu & Goma, Democratic Republic of Congo",
    
    "form.name": "Name",
    "form.name_placeholder": "Full name",
    "form.email": "Email",
    "form.email_placeholder": "Email address",
    "form.subject": "Subject",
    "form.subject_placeholder": "Your message subject",
    "form.message": "Message",
    "form.message_placeholder": "How can we help you?",
    "form.button": "Send Message",
    
    // Footer
    "footer.desc": "Dedicated to fostering harmony and sustainable development across the Democratic Republic of Congo since 2004.",
    "footer.org": "Organization",
    "footer.org.about": "About",
    "footer.org.plan": "Strategic Plan",
    "footer.org.reports": "Annual Reports",
    "footer.org.join": "Join Us",
    
    "footer.legal": "Legal & Privacy",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.donor": "Donor Charter",
    "footer.legal.governance": "Governance",
    "footer.legal.transparency": "Transparency",
    
    "footer.newsletter": "Newsletter",
    "footer.newsletter.desc": "Receive field updates and our reports directly in your inbox.",
    "footer.newsletter.placeholder": "Email address",
    
    "footer.copyright": "© 2024 Christian Initiative for Peace, Reconciliation and Development.",
    "footer.tagline1": "Peace is Possible",
    "footer.tagline2": "DRC Strong",
  },
  
  fr: {
    // Header
    "nav.about": "À propos",
    "nav.what-we-do": "Domaines d'action",
    "nav.insights": "Actualités",
    "nav.team": "Équipe",
    "nav.contact": "Contact",
    "header.donate": "Faire un don",
    
    // Hero section
    "hero.badge": "Depuis 2004 • Focus RDC",
    "hero.title": "Construction d'une Paix et d'une Stabilité Durables",
    "hero.title_highlight": "Paix",
    "hero.subtitle": "L'Initiative Chrétienne pour la Paix, la Réconciliation et le Développement (ICPRD) œuvre pour autonomiser les communautés locales et favoriser l'harmonie régionale par le dialogue et le développement durable.",
    "hero.button1": "S'impliquer",
    "hero.button2": "Notre Plan Stratégique",
    
    // Stats section
    "stats.combatants": "Combattants Désarmés",
    "stats.experience": "Années d'Expérience",
    "stats.communities": "Communautés Touchées",
    "stats.partners": "Partenaires Internationaux",
    
    // Pillars section
    "pillars.subtitle": "Domaines d'Intervention",
    "pillars.title": "Agir pour le Changement à Travers Nos Trois Domaines Clés",
    "pillars.description": "Notre approche holistique garantit que la paix n'est pas seulement l'absence de conflit, mais la présence de justice et d'opportunités.",
    
    "pillar1.title": "Consolidation de la Paix",
    "pillar1.desc": "Acteur majeur dans le Désarmement, Démobilisation et Réintégration (DDR) au Sud-Kivu. Nous facilitons le rapatriement des groupes armés et la réintégration socio-professionnelle des combattants.",
    "pillar1.learn": "En savoir plus",
    
    "pillar2.title": "Urgence Humanitaire",
    "pillar2.desc": "Nous intervenons dans les domaines de la santé et de la nutrition lorsque le besoin se fait sentir pendant nos activités, avec le soutien de nos partenaires.",
    "pillar2.learn": "En savoir plus",
    
    "pillar3.title": "Développement Durable",
    "pillar3.desc": "Nous renforçons la résilience des communautés par la formation professionnelle, l'autonomisation et le plaidoyer pour les droits humains et le développement local.",
    "pillar3.learn": "En savoir plus",
    
    // Mission section
    "mission.title": "Notre Mission : Guérir par l'",
    "mission.title_highlight": "Action",
    "mission.desc": "L'Initiative Chrétienne pour la Paix, la Réconciliation et le Développement (ICPRD) est née de la nécessité urgente de rompre les cycles systémiques de conflit dans l'Est de la RDC, pour porter secours aux populations victimes.",
    "mission.point1.title": "Action de Terrain et Médiation",
    "mission.point1.desc": "Notre approche est fondée sur un engagement direct, la sensibilisation des parties aux conflits et la médiation pour faciliter le désarmement volontaire et les rapatriements.",
    "mission.point2.title": "Développement Communautaire",
    "mission.point2.desc": "Nous croyons que la paix durable passe par le développement. Nous construisons des centres de formation et soutenons l'autonomie des communautés pour un avenir stable.",
    "mission.experience": "Années d'Engagement sur le Terrain",
    
    // Achievements section
    "achievements.title": "Nos Réalisations",
    "achievements.subtitle": "Un aperçu de notre impact durable à travers le Sud-Kivu et le Nord-Kivu au fil des années.",
    
    "achievement1.title": "1,000+ Anciens Combattants Réintégrés",
    "achievement1.category": "Paix & Stabilité",
    "achievement1.status": "Projet en cours",
    "achievement1.desc": "Grâce à un accompagnement psychologique et une formation professionnelle, nous réintégrons avec succès d'anciens combattants, y compris d'anciens enfants soldats, dans leurs familles et communautés.",
    "achievement1.report": "Rapport Complet →",
    
    "achievement2.title": "Rapatriement Volontaire des Groupes Armés",
    "achievement2.category": "Désarmement",
    "achievement2.status": "2013-2014",
    "achievement2.desc": "L'ICPRD a été un facilitateur clé dans les opérations de sensibilisation et de désarmement volontaire de groupes armés, notamment les FDLR, contribuant directement à réduire les tensions et les violences.",
    "achievement2.report": "Rapport Complet →",
    
    "achievement3.title": "Centre de Réintégration de Kitamba",
    "achievement3.category": "Développement",
    "achievement3.status": "Lancé en 2023",
    "achievement3.desc": "Nous avons construit et équipé un centre de formation à Kitamba (Mwenga), offrant des compétences et un avenir aux démobilisés. 'Le PPR est un poumon du développement', témoigne le Mwami Kalenga Riziki Lwango.",
    "achievement3.report": "Rapport Complet →",
    
    // Team section
    "team.title": "Notre Équipe de Direction",
    "team.subtitle": "Guidée par des experts engagés, des activistes locaux et des artisans de paix dévoués.",
    "team.position1": "Secrétaire Exécutif",
    "team.position2": "Secretaire Executif",
    "team.position3": "Directeur des Opérations",
    "team.position4": "Coordinatrice Humanitaire",
    
    // CTA section
    "cta.title": "Soutenez la Paix Aujourd'hui",
    "cta.desc": "Votre contribution finance directement nos programmes de médiation communautaire, de désarmement volontaire et nos projets de développement dans les zones en proie aux conflits.",
    "cta.button1": "Faire un Don",
    "cta.button2": "Devenir Partenaire",
    
    // Blog section
    "blog.title": "Derniers Rapports & Témoignages",
    "blog.subtitle": "Analyses détaillées et récits issus de nos opérations sur le terrain à travers la RDC.",
    "blog.viewall": "Voir tous les articles",
    
    "blog1.category": "Paix",
    "blog1.title": "Le Rôle de la Sensibilisation dans le Désarmement Volontaire",
    "blog1.desc": "Retour sur nos missions de sensibilisation à Kigogo, Burhinyi et Minova qui ont conduit au rapatriement de centaines de combattants.",
    "blog1.author": "Équipe ICPRD",
    "blog1.date": "Il y a 2 jours",
    "blog1.views": "vues",
    
    "blog2.category": "Formation",
    "blog2.title": "Kitamba : Un Centre pour l'Avenir",
    "blog2.desc": "Comment notre centre de réintégration socio-professionnelle forme d'anciens combattants à la menuiserie, la couture et d'autres métiers pour une réinsertion réussie.",
    "blog2.author": "Témoignage",
    "blog2.date": "Il y a 5 jours",
    "blog2.views": "vues",
    
    "blog3.category": "Droits Humains",
    "blog3.title": "Formation des Défenseurs des Droits Humains",
    "blog3.desc": "Compte-rendu de notre atelier à Bukavu sur la collecte de données pour documenter les incidents dans la chaîne de valeur de l'exploitation minière.",
    "blog3.author": "Expert UN",
    "blog3.date": "Il y a 1 semaine",
    "blog3.views": "vues",
    
    // Contact section
    "contact.title": "Construisons la Paix Ensemble",
    "contact.subtitle": "Que vous souhaitiez devenir partenaire, bénévole ou soutenir nos programmes, nous serions ravis d'échanger avec vous.",
    "contact.email": "Écrivez-nous",
    "contact.email_value": "contact@icprd.org",
    "contact.location": "Nos bureaux",
    "contact.location_value": "Bukavu & Goma, République Démocratique du Congo",
    
    "form.name": "Nom",
    "form.name_placeholder": "Nom complet",
    "form.email": "Email",
    "form.email_placeholder": "Adresse email",
    "form.subject": "Sujet",
    "form.subject_placeholder": "Objet de votre message",
    "form.message": "Message",
    "form.message_placeholder": "Comment pouvons-nous vous aider ?",
    "form.button": "Envoyer le Message",
    
    // Footer
    "footer.desc": "Dédiée à favoriser l'harmonie et le développement durable à travers la République Démocratique du Congo depuis 2004.",
    "footer.org": "Organisation",
    "footer.org.about": "À propos",
    "footer.org.plan": "Plan Stratégique",
    "footer.org.reports": "Rapports Annuels",
    "footer.org.join": "Nous Rejoindre",
    
    "footer.legal": "Légal & Confidentialité",
    "footer.legal.privacy": "Politique de Confidentialité",
    "footer.legal.donor": "Charte des Donateurs",
    "footer.legal.governance": "Gouvernance",
    "footer.legal.transparency": "Transparence",
    
    "footer.newsletter": "Newsletter",
    "footer.newsletter.desc": "Recevez des mises à jour du terrain et nos rapports directement dans votre boîte mail.",
    "footer.newsletter.placeholder": "Adresse email",
    
    "footer.copyright": "© 2024 Initiative Chrétienne pour la Paix, la Réconciliation et le Développement.",
    "footer.tagline1": "La Paix est Possible",
    "footer.tagline2": "RDC Forte",
  }
};


// ============================================
// VARIABLES GLOBALES
// ============================================

let currentLang = 'fr'; // Langue par défaut

// ============================================
// FONCTIONS PRINCIPALES
// ============================================

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
  console.log('ICPRD Website - Initialisation...');
  
  // Charger la langue sauvegardée
  const savedLang = localStorage.getItem('icprd_lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
    currentLang = savedLang;
    console.log('Langue chargée depuis localStorage:', currentLang);
  }
  
  // Initialiser les composants
  initMobileMenu();
  initLanguageSwitcher();
  updateLanguageUI();
  applyTranslations();
  
  console.log('ICPRD Website - Initialisation terminée! Langue:', currentLang);
});

// Initialisation du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('mobile-overlay');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  // Ouvrir le sidebar
  toggleBtn.addEventListener('click', function() {
    sidebar.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Fermer le sidebar
  function closeSidebar() {
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Fermer avec le bouton X
  closeBtn.addEventListener('click', closeSidebar);

  // Fermer en cliquant sur l'overlay (extérieur)
  overlay.addEventListener('click', closeSidebar);

  // Fermer en cliquant sur un lien ou le bouton donate dans le sidebar
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Fermer avec la touche Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !sidebar.classList.contains('translate-x-full')) {
      closeSidebar();
    }
  });
});


// Initialisation du sélecteur de langue
function initLanguageSwitcher() {
  // Sélectionner tous les boutons de langue (dans le header et dans le menu mobile)
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang-btn');
      switchLanguage(lang);
    });
  });
  
  console.log('Sélecteur de langue initialisé');
}

// Mettre à jour l'interface de la langue
function updateLanguageUI() {
  // Mettre à jour les boutons de langue dans le header
  const enButton = document.querySelector('[data-lang-btn="en"]');
  const frButton = document.querySelector('[data-lang-btn="fr"]');
  
  if (enButton && frButton) {
    if (currentLang === 'en') {
      // EN actif, FR inactif
      enButton.classList.remove('text-slate-400', 'dark:hover:text-slate-200');
      enButton.classList.add('text-primary');
      frButton.classList.remove('text-primary');
      frButton.classList.add('text-slate-400', 'hover:text-slate-600', 'dark:hover:text-slate-200');
    } else {
      // FR actif, EN inactif
      frButton.classList.remove('text-slate-400', 'dark:hover:text-slate-200');
      frButton.classList.add('text-primary');
      enButton.classList.remove('text-primary');
      enButton.classList.add('text-slate-400', 'hover:text-slate-600', 'dark:hover:text-slate-200');
    }
  }
  
  console.log('Interface langue mise à jour:', currentLang);
}

// Changer de langue
function switchLanguage(lang) {
  if (currentLang === lang) {
    console.log('Langue déjà définie sur:', lang);
    return;
  }
  
  console.log('Changement de langue vers:', lang);
  
  // Mettre à jour la langue courante
  currentLang = lang;
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('icprd_lang', lang);
  
  // Mettre à jour l'interface
  updateLanguageUI();
  
  // Appliquer les traductions
  applyTranslations();
  
  // Fermer le menu mobile si ouvert
  const mobileSidebar = document.getElementById('mobile-sidebar');
  if (mobileSidebar) {
    mobileSidebar.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }
}

// Appliquer les traductions
function applyTranslations() {
  const t = translations[currentLang];
  
  if (!t) {
    console.error('Traductions non trouvées pour la langue:', currentLang);
    return;
  }
  
  // Sélectionner tous les éléments à traduire
  const translatableElements = document.querySelectorAll('[data-translate]');
  
  // Appliquer les traductions
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (t[key]) {
      element.textContent = t[key];
    }
  });
  
  console.log('Traductions appliquées pour:', currentLang);
}

// ============================================
// EXPOSER LES FONCTIONS GLOBALEMENT
// ============================================

// Exposer la fonction de changement de langue pour un usage externe
window.switchLanguage = switchLanguage;

console.log('main.js chargé avec succès');