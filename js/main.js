/**
 * LearnMore Academy — Main JS
 * Premium interactions, animations, utilities
 */

/* ============================================
   LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2200);
});
document.body.style.overflow = 'hidden';

/* ============================================
   NAVBAR
   ============================================ */
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

// Scroll detection
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar && navbar.classList.add('scrolled');
  } else {
    navbar && navbar.classList.remove('scrolled');
  }
  // Back to top
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

// Hamburger toggle
hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav && mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active link highlight
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === path || (path === 'index.html' && href === 'index.html'));
  });
}
setActiveNav();

/* ============================================
   AOS INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      offset: 60,
      delay: 50,
    });
  }

  /* ============================================
     TYPED.JS — Hero Typing Effect
     ============================================ */
  const typedEl = document.getElementById('typed-text');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Cybersecurity Expert',
        'Ethical Hacker',
        'IT Professional',
        'Penetration Tester',
        'SOC Analyst',
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ============================================
     STATS COUNTER ANIMATION
     ============================================ */
  function animateCounter(el, target, duration = 2000, suffix = '') {
    let start = 0;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString() + suffix;
      }
    }, 16);
  }

  // Intersection observer for counters
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, 2200, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ============================================
     TESTIMONIALS SWIPER
     ============================================ */
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      loop: true,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ============================================
     CONTACT FORM
     ============================================ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #16a34a, #14532d)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    });
  }

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 84;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     BACK TO TOP
     ============================================ */
  const btt = document.getElementById('back-to-top');
  btt && btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ============================================
   HERO NAVBAR INIT (transparent on hero pages)
   ============================================ */
(function() {
  const hero = document.querySelector('.hero, .cyber-hero');
  if (hero && navbar) {
    // Start transparent on hero pages
    if (window.scrollY <= 40) {
      navbar.classList.add('hero-nav-init');
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.remove('hero-nav-init');
      } else {
        navbar.classList.add('hero-nav-init');
      }
    }, { passive: true });
  }
})();

/* ============================================
   WHATSAPP FLOAT BUTTON — inject dynamically
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/919063326889';
  wa.className = 'whatsapp-float';
  wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
  wa.setAttribute('target', '_blank');
  wa.setAttribute('rel', 'noopener noreferrer');
  wa.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>';
  document.body.appendChild(wa);

  /* ============================================
     LAZY LOAD IMAGES
     ============================================ */
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length && 'IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imgObs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imgObs.observe(img));
  }

  /* ============================================
     OPEN FAQ ON HASH
     ============================================ */
  if (window.location.hash === '#faq') {
    const first = document.querySelector('.faq-item');
    first && first.classList.add('open');
  }

  /* ============================================
     NAVBAR SCROLL-SPY (home page)
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const scrollSpy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id ||
              link.getAttribute('href') === entry.target.id + '.html'
            );
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -70% 0px' });
    sections.forEach(s => scrollSpy.observe(s));
  }
});
