/* ============================================
   MEDI PACÍFICO — Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ─── Preloader ───
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 1200);

  // ─── Header scroll effect ───
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ─── Mobile menu ───
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      mobileToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      mobileToggle.textContent = '☰';
    });
  });

  // ─── Scroll reveal ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Counter animation ───
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(easeOut * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ─── Form handling ───
  const leadForm = document.getElementById('leadForm');
  const modal = document.getElementById('modal');
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      if (!nombre || !email || !telefono) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
      }
      // Show success modal
      modal.classList.add('active');
      this.reset();
      // Log lead (replace with actual API call)
      console.log('Lead captured:', {
        nombre, email, telefono,
        institucion: document.getElementById('institucion').value,
        cargo: document.getElementById('cargo').value,
        interes: document.getElementById('interes').value,
        mensaje: document.getElementById('mensaje').value,
        timestamp: new Date().toISOString(),
        source: window.location.href
      });
    });
  }

  // ─── Modal close ───
  window.closeModal = function() {
    modal.classList.remove('active');
  };
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Parallax effect on hero ───
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ─── Active nav link on scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ─── Gallery lightbox (simple) ───
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.gallery-item-title')?.textContent || '';
      console.log('Gallery clicked:', title);
      // In production, open a lightbox modal
    });
  });

  // ─── Button ripple effect ───
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);
