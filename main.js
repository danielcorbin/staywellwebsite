// Staywell Health - Main JavaScript
// Hamburger menu toggle - MUST be at top for onclick to work
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Navigation and site functionality
class SiteNavigation {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.trackAnalytics();
  }
  
  setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
      
      // Close menu when clicking on nav links
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
          }
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('active');
        }
      });
    }
  }
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  trackAnalytics() {
    // Track CTA button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': buttonText
          });
        }
      });
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'Contact',
            'event_label': 'Phone Click'
          });
        }
      });
    });
    
    // Track outbound links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const url = e.target.href;
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'Outbound Link',
            'event_label': url
          });
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SiteNavigation();
  
  // Add lazy loading to images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
});

// Cookie consent (simple version)
function initCookieConsent() {
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (!cookieConsent) {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

// Initialize cookie consent on load
document.addEventListener('DOMContentLoaded', initCookieConsent);
