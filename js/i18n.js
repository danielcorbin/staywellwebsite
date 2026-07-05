// Staywell Health - i18n engine
// Handles language storage, text swapping, and the nav language toggle.
//
// HOW TO USE ON A PAGE:
// 1. Include this file before main.js: <script src="i18n.js"></script>
// 2. Mark any translatable element with data-i18n="section.key", e.g.
//      <a href="about.html" data-i18n="nav.aboutLink">About Staywell Health</a>
// 3. The element with data-lang-toggle (the globe icon link) flips language
//    on click, no page reload, no separate -es.html file needed.
//
// To add a new translatable string anywhere on the site:
//   a) add the English value under translations.en.<section>.<key>
//   b) add the Spanish value under translations.es.<section>.<key>
//   c) add data-i18n="<section>.<key>" to the element in the HTML

(function () {
  const STORAGE_KEY = 'staywellLang';

  const translations = {
    en: {
      nav: {
        home: 'Home',
        aboutDrop: 'About',
        aboutLink: 'About Staywell Health',
        landAck: 'Land Acknowledgement',
        primaryCare: 'Primary Care',
        longevityDrop: 'Longevity Medicine',
        weightLoss: 'Medical Weight Loss',
        hormone: 'Hormone Restoration',
        aesthetics: 'Aesthetics',
        pricing: 'Pricing',
        resourcesDrop: 'Resources',
        faq: 'FAQ',
        blog: 'Blog',
        healthshare: 'Healthshare Coverage',
        contact: 'Contact',
        portal: 'Patient Portal',
        portalShort: 'PORTAL',
        // New Services-dropdown keys (used on newly built pages; older pages
        // still use the keys above until the full nav rollout is done)
        servicesDrop: 'Services',
        dpc: 'Direct Primary Care',
        mensHormone: "Men's Hormone Optimization",
        womensHormone: "Women's Hormone Optimization",
        antiAging: 'Anti-Aging and Longevity'
      },
      footer: {
        tagline: 'Premium direct primary care in Raleigh, NC with real access to your provider and care that goes deeper.',
        affirming: 'This is an all-inclusive and affirming space.',
        quickLinks: 'Quick Links',
        home: 'Home',
        about: 'About',
        services: 'Services',
        pricing: 'Pricing',
        faq: 'FAQ',
        contact: 'Contact',
        employerBenefits: 'Small Business Solutions',
        privacy: 'Privacy Policy',
        servicesHeading: 'Services',
        svcPrimaryCare: 'Primary Care',
        svcLifestyle: 'Lifestyle Medicine',
        svcAesthetics: 'Aesthetics',
        svcPreventive: 'Preventive Care',
        svcLab: 'Lab Services',
        copyright: '\u00A9 2026 Staywell Health, PLLC. All rights reserved.'
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        aboutDrop: 'Nosotros',
        aboutLink: 'Sobre Staywell Health',
        landAck: 'Reconocimiento de Tierras',
        primaryCare: 'Atenci\u00F3n Primaria',
        longevityDrop: 'Medicina de Longevidad',
        weightLoss: 'P\u00E9rdida de Peso M\u00E9dica',
        hormone: 'Restauraci\u00F3n Hormonal',
        aesthetics: 'Est\u00E9tica',
        pricing: 'Precios',
        resourcesDrop: 'Recursos',
        faq: 'Preguntas Frecuentes',
        blog: 'Blog',
        healthshare: 'Cobertura Healthshare',
        contact: 'Contacto',
        portal: 'Portal del Paciente',
        portalShort: 'PORTAL',
        servicesDrop: 'Servicios',
        dpc: 'Atenci\u00F3n Primaria Directa',
        mensHormone: 'Optimizaci\u00F3n Hormonal para Hombres',
        womensHormone: 'Optimizaci\u00F3n Hormonal para Mujeres',
        antiAging: 'Antienvejecimiento y Longevidad'
      },
      footer: {
        tagline: 'Atenci\u00F3n primaria directa premium en Raleigh, NC con acceso real a tu doctor y una atenci\u00F3n m\u00E1s profunda.',
        affirming: 'Este es un espacio inclusivo y afirmativo.',
        quickLinks: 'Enlaces R\u00E1pidos',
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        pricing: 'Precios',
        faq: 'Preguntas Frecuentes',
        contact: 'Contacto',
        employerBenefits: 'Soluciones para Peque\u00F1as Empresas',
        privacy: 'Pol\u00EDtica de Privacidad',
        servicesHeading: 'Servicios',
        svcPrimaryCare: 'Atenci\u00F3n Primaria',
        svcLifestyle: 'Medicina de Estilo de Vida',
        svcAesthetics: 'Est\u00E9tica',
        svcPreventive: 'Atenci\u00F3n Preventiva',
        svcLab: 'Servicios de Laboratorio',
        copyright: '\u00A9 2026 Staywell Health, PLLC. Todos los derechos reservados.'
      }
    }
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
    return 'en';
  }

  function lookup(dict, path) {
    return path.split('.').reduce(function (obj, key) {
      return obj ? obj[key] : undefined;
    }, dict);
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = lookup(dict, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });
    // The toggle always shows the language you'd switch TO, not the current one.
    document.querySelectorAll('[data-lang-toggle] .lang-label').forEach(function (el) {
      el.textContent = lang === 'en' ? 'ES' : 'EN';
    });
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
  }

  function initLangToggle() {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(getLang() === 'en' ? 'es' : 'en');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lang = getLang();
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    initLangToggle();
  });

  // Exposed in case a page needs to trigger translation manually
  // (e.g. after injecting content dynamically).
  window.staywellI18n = { getLang: getLang, setLang: setLang, applyTranslations: applyTranslations };
})();
