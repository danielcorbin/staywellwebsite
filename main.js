// Staywell Health - Main JavaScript

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Analytics event tracking (requires Google Analytics gtag.js loaded on the page)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-brass, .btn-outline-light, .btn-outline-dark, .nav-cta').forEach(function(button) {
    button.addEventListener('click', function(e) {
      var buttonText = e.target.textContent.trim();
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', { event_category: 'CTA', event_label: buttonText });
      }
    });
  });

  document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', { event_category: 'Contact', event_label: 'Phone Click' });
      }
    });
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var url = e.target.href;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', { event_category: 'Outbound Link', event_label: url });
      }
    });
  });
});

// Cookie consent
function initCookieConsent() {
  var cookieConsent = localStorage.getItem('cookieConsent');
  if (!cookieConsent) {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', initCookieConsent);
