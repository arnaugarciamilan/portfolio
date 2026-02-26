/* =============================================
   ARNAU GARCIA MILAN — Portfolio
   main.js — Tota la interactivitat
   ============================================= */

'use strict';

/* ─── PRELOADER ──────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    initReveal();
  }, 900);
});



/* ─── CANVAS HERO ────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184, 255, 87, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Línies de connexió
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(184, 255, 87, ${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', () => { cancelAnimationFrame(animId); init(); animate(); });
})();

/* ─── TYPING EFFECT ──────────────────────────── */
(function initTyping() {
  const phrases = [
    'DAW Graduate ✦',
    'Frontend Developer ✦',
    'Backend Learner ✦',
    'UI Enthusiast ✦',
    'Full-Stack Builder ✦'
  ];
  const el = document.getElementById('typing-text');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 600);
})();

/* ─── NAVBAR ─────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Tanca el menú mòbil al clicar un link
  mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // Highlight de la secció activa
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }
})();

/* ─── SCROLL REVEAL ──────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animar skill bars quan entren en vista
        if (entry.target.classList.contains('skills-grid')) {
          animateSkillBars();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* ─── SKILL BARS ─────────────────────────────── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => { bar.style.width = width + '%'; }, 100);
  });
}

/* ─── BACK TO TOP ────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─── DARK / LIGHT TOGGLE ────────────────────── */
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ─── PROJECT FILTERS ────────────────────────── */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });
})();

/* ─── PROJECT MODAL ──────────────────────────── */
(function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const projectData = JSON.parse(document.getElementById('project-data').textContent);

  document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const key = card.getAttribute('data-project');
      const data = projectData[key];
      if (!data) return;

      modalContent.innerHTML = buildModalHTML(data);
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function buildModalHTML(data) {
    const features = data.features.map(f => `<li>${f}</li>`).join('');
    const stack = data.stack.map(s => `<span class="tag">${s}</span>`).join('');
    const demoLink = data.demo
      ? `<a href="${data.demo}" target="_blank" rel="noopener" class="modal-link primary">Demo en viu →</a>`
      : `<span class="modal-link disabled">Demo pròximament</span>`;
    const githubLink = data.github
      ? `<a href="${data.github}" target="_blank" rel="noopener" class="modal-link secondary">GitHub</a>`
      : '';

    return `
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>
      <p class="modal-desc">${data.description}</p>
      <p class="modal-section-label">Funcionalitats</p>
      <ul class="modal-features">${features}</ul>
      <p class="modal-section-label">Stack tecnològic</p>
      <div class="modal-stack">${stack}</div>
      <div class="modal-links">${demoLink}${githubLink}</div>
    `;
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ─── COPY EMAIL ─────────────────────────────── */
(function initCopyEmail() {
  const btn = document.getElementById('copy-email');
  const msg = document.getElementById('copied-msg');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      msg.classList.add('visible');
      setTimeout(() => msg.classList.remove('visible'), 2500);
    }).catch(() => {
      // Fallback per navegadors antics
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      msg.classList.add('visible');
      setTimeout(() => msg.classList.remove('visible'), 2500);
    });
  });
})();

/* ─── CONTACT FORM ───────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl = document.getElementById('form-name');
    const emailEl = document.getElementById('form-email');
    const msgEl = document.getElementById('form-message');
    let valid = true;

    // Validació nom
    if (nameEl.value.trim().length < 2) {
      document.getElementById('name-error').textContent = 'El nom ha de tenir mínim 2 caràcters.';
      valid = false;
    } else {
      document.getElementById('name-error').textContent = '';
    }

    // Validació email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl.value.trim())) {
      document.getElementById('email-error').textContent = 'Introdueix un email vàlid.';
      valid = false;
    } else {
      document.getElementById('email-error').textContent = '';
    }

    // Validació missatge
    if (msgEl.value.trim().length < 10) {
      document.getElementById('message-error').textContent = 'El missatge ha de tenir mínim 10 caràcters.';
      valid = false;
    } else {
      document.getElementById('message-error').textContent = '';
    }

    if (valid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Enviant...';
      submitBtn.disabled = true;

      // Simulació enviament
      setTimeout(() => {
        form.reset();
        success.classList.add('visible');
        submitBtn.textContent = 'Enviar missatge ✦';
        submitBtn.disabled = false;
        setTimeout(() => success.classList.remove('visible'), 4000);
      }, 1200);
    }
  });
})();

/* ─── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
