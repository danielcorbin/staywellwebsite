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
      common: {
        joinToday: 'Join Today',
        joinNow: 'Join Now',
        bookMeetGreet: 'Book Free Meet &amp; Greet',
        freeVirtualMeetGreet: 'Free Virtual Meet &amp; Greet',
        learnMore: 'Learn More',
        viewPricing: 'View Pricing',
        sendMessage: 'Send Message',
        acceptingMembers: 'Accepting new members',
        askQuestionFirst: 'Ask a Question First',
        textOrCall: 'Text or Call',
        visitUs: 'Visit Us',
        followUs: 'Follow Us',
        connectSocial: 'Connect on social media'
      },
      home: {
        heroBadge: 'Personalized Membership Medicine in Raleigh, NC',
        heroTitle1: 'Whole-person care,',
        heroTitle2: 'on your terms',
        heroSubtitle: 'Direct access to your provider, no rushed visits, and a full range of care built around you, from everyday primary care to hormone health, weight management, and longevity medicine.',
        heroExploreBtn: 'Explore Our Services',
        heroContactBtn: 'Contact Us',
        servicesHeading: 'How We Can Help',
        servicesSubheading: 'Six focused programs, one provider who knows your full picture.',
        svcDpcTitle: 'Direct Primary Care',
        svcDpcDesc: 'Same-day access, extended visits, and a provider who knows your full history.',
        svcMensTitle: "Men's Hormone Optimization",
        svcMensDesc: 'Testosterone replacement therapy (TRT) and hormone care tailored to how you feel and function.',
        svcWomensTitle: "Women's Hormone Optimization",
        svcWomensDesc: 'Hormone replacement therapy (HRT) for menopause, perimenopause, and beyond.',
        svcWeightlossTitle: 'Medical Weight Loss',
        svcWeightlossDesc: 'Physician-guided weight loss, including GLP-1 medications, built around your goals.',
        svcAestheticsTitle: 'Aesthetics',
        svcAestheticsDesc: 'Xeomin, an FDA-approved alternative to Botox, for smoothing lines and wrinkles.',
        svcGahtTitle: 'Gender Affirming Hormone Therapy',
        svcGahtDesc: 'Affirming, judgment-free hormone care.',
        peptideTitle: 'Peptide Therapy',
        peptideDesc: 'Peptides are targeted molecules used across many areas of care, including weight management, hormone optimization, recovery, and longevity. Ask your provider whether peptide therapy fits into your treatment plan.',
        peptideLearnMore: 'Learn More &#8250;',
        providerHeading: 'Meet Your Dedicated Provider',
        providerP1: "Experience healthcare with a provider who truly knows you. Whichever program brought you here, primary care, hormone health, weight management, or longevity medicine, you'll work with the same provider who understands your full history, goals, and preferences.",
        providerP2: 'Extended appointment times, direct communication, and a real partnership that grows with your goals. No rushed appointments, no cookie-cutter care, just thoughtful support built around you.',
        providerLearnMoreBtn: 'Learn More About Our Approach',
        testimonialsHeading: 'What Our Patients Say',
        testimonialsSubheading: "Real experiences from patients who've found a better way to receive healthcare.",
        t1Quote1: 'Daniel was <strong>instrumental in the early detection of a potentially life-threatening lung cancer</strong>. Thanks to his vigilance and diagnostic insight, it was caught at a stage where it could be successfully removed surgically. I am currently cancer-free, and I credit him directly with saving my life.',
        t1Quote2: 'He ensures we are thoroughly informed at every stage of our care, and never once have we felt rushed during an appointment.',
        t1Name: ' -  Mike S.',
        t1Tenure: 'Patient for 4+ years',
        t2Quote1: "I decided he would be our family's primary care doctor (all 6 of us) from the first time I met him. <strong>He hears you as a patient, cares, is supportive and inclusive</strong>, and treats you like a whole person and not just a number.",
        t2Quote2: "He's very well versed in the most up to date treatment and diagnostic practices. So glad we found this practice!",
        t2Name: ' -  Sarah C.',
        t2Tenure: 'Family of 6',
        pricingHeading: 'Pricing',
        pricingSubheading: 'Pricing varies by program. No hidden fees, no insurance hassles, just honest, upfront pricing.',
        pricingDpcTitle: 'Direct Primary Care',
        pricingDpcDesc: 'Membership starting at $39/month, with family plans available.',
        pricingHormoneTitle: 'Hormone Optimization',
        pricingHormoneDesc: 'Individualized pricing based on your protocol and labs.',
        pricingOtherTitle: 'Weight Loss, Aesthetics &amp; Longevity',
        pricingOtherDesc: 'Pricing is specific to each program and your goals.',
        notSureTitle: 'Not sure where to start?',
        notSureDesc: 'Book a free 15-minute virtual meet and greet to see if Staywell Health is the right fit for you.',
        contactHeading: 'Ready to get started?',
        contactSubheading: 'Start your care with a provider who listens, looks deeper, and supports the whole you.',
        contactFax: 'Fax: (919) 585-5595',
        visitUsAddress: '6837 Falls of Neuse Rd, Ste 106<br>Raleigh, NC 27615',
        locatedWithinTitle: 'Located Within',
        locatedWithinDesc: 'Multi-specialty wellness center',
        locatedWithinLink: 'Visit Health House &#8250;',
        formHeading: 'Send Us a Message',
        formNote: '<strong>Note:</strong> For protected health information, please use our secure patient portal.',
        formThankYouTitle: 'Thank You!',
        formThankYouMsg: "Your message has been sent successfully. We'll get back to you soon!",
        formNameLabel: 'Name *',
        formEmailLabel: 'Email *',
        formPhoneLabel: 'Phone',
        formMessageLabel: 'Message *',
        cookieText: 'We use cookies to improve your experience. By using our site, you agree to our use of cookies.',
        cookieAccept: 'Accept',
        cookieLearnMore: 'Learn More'
      },
      footer: {
        tagline: 'Premium membership medicine in Raleigh, NC with real access to your provider and care that goes deeper.',
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
        svcPrimaryCare: 'Direct Primary Care',
        svcLifestyle: 'Hormone Optimization',
        svcAesthetics: 'Aesthetics',
        svcPreventive: 'Medical Weight Loss',
        svcLab: 'Anti-Aging & Longevity',
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
      common: {
        joinToday: 'Inscr\u00EDbete Hoy',
        joinNow: 'Inscr\u00EDbete Ahora',
        bookMeetGreet: 'Reserva una Consulta Gratuita',
        freeVirtualMeetGreet: 'Consulta Virtual Gratuita',
        learnMore: 'Conoce M\u00E1s',
        viewPricing: 'Ver Precios',
        sendMessage: 'Enviar Mensaje',
        acceptingMembers: 'Aceptando nuevos miembros',
        askQuestionFirst: 'Hacer una Pregunta Primero',
        textOrCall: 'Env\u00EDa un Mensaje o Llama',
        visitUs: 'V\u00EDsitanos',
        followUs: 'S\u00EDguenos',
        connectSocial: 'Con\u00E9ctate en redes sociales'
      },
      home: {
        heroBadge: 'Medicina de Membres\u00EDa Personalizada en Raleigh, NC',
        heroTitle1: 'Atenci\u00F3n integral,',
        heroTitle2: 'a tu manera',
        heroSubtitle: 'Acceso directo a tu doctor, sin visitas apresuradas, y una amplia gama de atenci\u00F3n dise\u00F1ada para ti, desde atenci\u00F3n primaria diaria hasta salud hormonal, control de peso y medicina de longevidad.',
        heroExploreBtn: 'Explora Nuestros Servicios',
        heroContactBtn: 'Cont\u00E1ctanos',
        servicesHeading: 'C\u00F3mo Podemos Ayudarte',
        servicesSubheading: 'Seis programas enfocados, un solo doctor que conoce tu historia completa.',
        svcDpcTitle: 'Atenci\u00F3n Primaria Directa',
        svcDpcDesc: 'Acceso el mismo d\u00EDa, visitas extendidas, y un doctor que conoce tu historial completo.',
        svcMensTitle: 'Optimizaci\u00F3n Hormonal para Hombres',
        svcMensDesc: 'Terapia de reemplazo de testosterona (TRT) y atenci\u00F3n hormonal adaptada a c\u00F3mo te sientes y funcionas.',
        svcWomensTitle: 'Optimizaci\u00F3n Hormonal para Mujeres',
        svcWomensDesc: 'Terapia de reemplazo hormonal (HRT) para la menopausia, perimenopausia y m\u00E1s.',
        svcWeightlossTitle: 'P\u00E9rdida de Peso M\u00E9dica',
        svcWeightlossDesc: 'P\u00E9rdida de peso guiada por un m\u00E9dico, incluyendo medicamentos GLP-1, dise\u00F1ada para tus objetivos.',
        svcAestheticsTitle: 'Est\u00E9tica',
        svcAestheticsDesc: 'Xeomin, una alternativa a Botox aprobada por la FDA, para suavizar l\u00EDneas y arrugas.',
        svcGahtTitle: 'Terapia Hormonal de Afirmaci\u00F3n de G\u00E9nero',
        svcGahtDesc: 'Atenci\u00F3n hormonal afirmativa y sin juicios.',
        peptideTitle: 'Terapia de Peptidos',
        peptideDesc: 'Los peptidos son mol\u00E9culas dirigidas utilizadas en muchas \u00E1reas de atenci\u00F3n, incluyendo control de peso, optimizaci\u00F3n hormonal, recuperaci\u00F3n y longevidad. Pregunta a tu doctor si la terapia de peptidos es adecuada para tu plan de tratamiento.',
        peptideLearnMore: 'Conoce M\u00E1s &#8250;',
        providerHeading: 'Conoce a Tu Doctor Dedicado',
        providerP1: 'Experimenta la atenci\u00F3n m\u00E9dica con un doctor que realmente te conoce. Sin importar qu\u00E9 programa te trajo aqu\u00ED, atenci\u00F3n primaria, salud hormonal, control de peso o medicina de longevidad, trabajar\u00E1s con el mismo doctor que entiende tu historial completo, objetivos y preferencias.',
        providerP2: 'Tiempos de cita extendidos, comunicaci\u00F3n directa, y una asociaci\u00F3n real que crece con tus objetivos. Sin citas apresuradas, sin atenci\u00F3n gen\u00E9rica, solo apoyo reflexivo dise\u00F1ado para ti.',
        providerLearnMoreBtn: 'Conoce M\u00E1s Sobre Nuestro Enfoque',
        testimonialsHeading: 'Lo Que Dicen Nuestros Pacientes',
        testimonialsSubheading: 'Experiencias reales de pacientes que encontraron una mejor manera de recibir atenci\u00F3n m\u00E9dica.',
        t1Quote1: 'Daniel fue <strong>fundamental en la detecci\u00F3n temprana de un c\u00E1ncer de pulm\u00F3n potencialmente mortal</strong>. Gracias a su vigilancia y perspicacia diagn\u00F3stica, se detect\u00F3 en una etapa en la que pudo extirparse quir\u00FArgicamente con \u00E9xito. Actualmente estoy libre de c\u00E1ncer, y le atribuyo directamente haber salvado mi vida.',
        t1Quote2: 'Se asegura de que estemos completamente informados en cada etapa de nuestra atenci\u00F3n, y nunca nos hemos sentido apresurados durante una cita.',
        t1Name: ' -  Mike S.',
        t1Tenure: 'Paciente por m\u00E1s de 4 a\u00F1os',
        t2Quote1: 'Decid\u00ED que \u00E9l ser\u00EDa el doctor de atenci\u00F3n primaria de nuestra familia (los 6) desde la primera vez que lo conoc\u00ED. <strong>Te escucha como paciente, se preocupa, es comprensivo e inclusivo</strong>, y te trata como una persona completa y no solo un n\u00FAmero.',
        t2Quote2: 'Est\u00E1 muy bien versado en las pr\u00E1cticas de tratamiento y diagn\u00F3stico m\u00E1s actualizadas. \u00A1Qu\u00E9 bueno que encontramos esta pr\u00E1ctica!',
        t2Name: ' -  Sarah C.',
        t2Tenure: 'Familia de 6',
        pricingHeading: 'Precios',
        pricingSubheading: 'Los precios var\u00EDan seg\u00FAn el programa. Sin tarifas ocultas, sin complicaciones de seguro, solo precios honestos y transparentes.',
        pricingDpcTitle: 'Atenci\u00F3n Primaria Directa',
        pricingDpcDesc: 'Membres\u00EDa desde $39 al mes, con planes familiares disponibles.',
        pricingHormoneTitle: 'Optimizaci\u00F3n Hormonal',
        pricingHormoneDesc: 'Precios individualizados seg\u00FAn tu protocolo y an\u00E1lisis.',
        pricingOtherTitle: 'P\u00E9rdida de Peso, Est\u00E9tica y Longevidad',
        pricingOtherDesc: 'Los precios son espec\u00EDficos para cada programa y tus objetivos.',
        notSureTitle: '\u00BFNo sabes por d\u00F3nde empezar?',
        notSureDesc: 'Reserva una consulta virtual gratuita de 15 minutos para ver si Staywell Health es adecuado para ti.',
        contactHeading: '\u00BFListo para comenzar?',
        contactSubheading: 'Comienza tu atenci\u00F3n con un doctor que escucha, profundiza, y te apoya por completo.',
        contactFax: 'Fax: (919) 585-5595',
        visitUsAddress: '6837 Falls of Neuse Rd, Ste 106<br>Raleigh, NC 27615',
        locatedWithinTitle: 'Ubicados Dentro de',
        locatedWithinDesc: 'Centro de bienestar multiespecialidad',
        locatedWithinLink: 'Visita Health House &#8250;',
        formHeading: 'Env\u00EDanos un Mensaje',
        formNote: '<strong>Nota:</strong> Para informaci\u00F3n de salud protegida, por favor usa nuestro portal de pacientes seguro.',
        formThankYouTitle: '\u00A1Gracias!',
        formThankYouMsg: 'Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.',
        formNameLabel: 'Nombre *',
        formEmailLabel: 'Correo Electr\u00F3nico *',
        formPhoneLabel: 'Tel\u00E9fono',
        formMessageLabel: 'Mensaje *',
        cookieText: 'Usamos cookies para mejorar tu experiencia. Al usar nuestro sitio, aceptas nuestro uso de cookies.',
        cookieAccept: 'Aceptar',
        cookieLearnMore: 'Conoce M\u00E1s'
      },
      footer: {
        tagline: 'Medicina de membres\u00EDa premium en Raleigh, NC con acceso real a tu doctor y una atenci\u00F3n m\u00E1s profunda.',
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
        svcPrimaryCare: 'Atenci\u00F3n Primaria Directa',
        svcLifestyle: 'Optimizaci\u00F3n Hormonal',
        svcAesthetics: 'Est\u00E9tica',
        svcPreventive: 'P\u00E9rdida de Peso M\u00E9dica',
        svcLab: 'Antienvejecimiento y Longevidad',
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
        el.innerHTML = value;
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
