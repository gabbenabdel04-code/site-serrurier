import './style.css';

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const floatingCta = document.getElementById('floatingCta');
const backToTop = document.getElementById('backToTop');
const reveals = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.hero-stat-number');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// ===== SCROLL HANDLER =====
let lastScroll = 0;

function onScroll() {
  const scrollY = window.scrollY;

  // Header style
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Floating CTA & Back to top
  if (scrollY > 400) {
    floatingCta.classList.add('visible');
    backToTop.classList.add('visible');
  } else {
    floatingCta.classList.remove('visible');
    backToTop.classList.remove('visible');
  }

  lastScroll = scrollY;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== INTERSECTION OBSERVER — REVEAL ANIMATIONS =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

reveals.forEach((el) => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
let countersAnimated = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  },
  { threshold: 0.3 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

function animateCounters() {
  statNumbers.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('fr-FR');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SUBTLE PARALLAX ON HERO =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const ratio = window.scrollY / window.innerHeight;
    heroContent.style.transform = `translateY(${ratio * 40}px)`;
    heroContent.style.opacity = 1 - ratio * 0.6;
  }
}, { passive: true });
