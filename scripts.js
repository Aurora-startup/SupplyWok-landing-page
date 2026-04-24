// ============================================
// SUPPLYWOK LANDING PAGE — Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navbar-toggle');
  const navLinks = document.getElementById('navbar-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // --- Scroll Reveal Animations ---
  const revealElements = () => {
    // Add reveal classes to elements
    const featureTexts = document.querySelectorAll('.feature-text');
    const featureImages = document.querySelectorAll('.feature-image');
    const stepCards = document.querySelectorAll('.step-card');
    const productText = document.querySelector('.product-text');
    const productVideo = document.querySelector('.product-video');
    const teamContent = document.querySelector('.team-content');
    const planCards = document.querySelectorAll('.plan-card');
    const ctaContent = document.querySelector('.cta-content');

    featureTexts.forEach((el, i) => {
      el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    });

    featureImages.forEach((el, i) => {
      el.classList.add(i % 2 === 0 ? 'reveal-right' : 'reveal-left');
    });

    stepCards.forEach(el => el.classList.add('reveal'));
    if (productText) productText.classList.add('reveal-left');
    if (productVideo) productVideo.classList.add('reveal-right');
    if (teamContent) teamContent.classList.add('reveal');
    planCards.forEach(el => el.classList.add('reveal'));
    if (ctaContent) ctaContent.classList.add('reveal');
  };

  revealElements();

  // Intersection Observer for scroll reveals
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 72; // navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar-links a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#E9B824';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Step cards staggered animation ---
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.step-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150);
        });
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const stepsGrid = document.querySelector('.steps-grid');
  if (stepsGrid) {
    stepObserver.observe(stepsGrid);
  }

});
