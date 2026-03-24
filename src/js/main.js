// =============================================================================
// MAIN.JS — Vanilla JavaScript for EZ Studio landing page
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initNavToggle();
  initStickyHeader();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
});

// ── Footer year ───────────────────────────────────────────────────────────────
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Sticky header shadow ──────────────────────────────────────────────────────
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
  );

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;pointer-events:none;';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

// ── Smooth scroll for hash links ──────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('site-header')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Contact form validation & submit ──────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  function showError(input, errorId, msg) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = msg;
    input.classList.add('is-invalid');
  }

  function clearError(input, errorId) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = '';
    input.classList.remove('is-invalid');
  }

  // Live validation on blur
  form.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  function validateField(input) {
    const errorId = `${input.id}-error`;
    if (!input.value.trim()) {
      showError(input, errorId, 'This field is required.');
      return false;
    }
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showError(input, errorId, 'Please enter a valid email address.');
      return false;
    }
    clearError(input, errorId);
    return true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) return;

    // Simulate form submission (replace with real API call / Formspree / etc.)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send message';
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    }, 900);
  });
}

// ── Scroll-triggered fade-in animations ───────────────────────────────────────
function initScrollAnimations() {
  // Only run if browser supports IntersectionObserver
  if (!('IntersectionObserver' in window)) return;

  // Add animation class to elements we want to animate
  const targets = document.querySelectorAll(
    '.service-card, .portfolio-card, .process__step, .about__grid > *, .contact__grid > *'
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}
