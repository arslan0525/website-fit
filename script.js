/* =====================================================
   DUBAI FAST MOVERS — JavaScript
   ===================================================== */

(function () {
  'use strict';

  // ===== STICKY HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const hamburger = document.getElementById('hamburger');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openNav() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileNavOverlay.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  mobileNavClose.addEventListener('click', closeNav);

  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) closeNav();
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ===== INTERSECTION OBSERVER — ANIMATE ON SCROLL =====
  const animateElements = document.querySelectorAll(
    '.service-card, .why-card, .review-card, .area-card, .contact-card, .uae-list li, .trust-item'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-in');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animateElements.forEach(el => observer.observe(el));

  // ===== CONTACT FORM — SEND VIA WHATSAPP =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        // Simple shake animation on required fields
        [document.getElementById('form-name'), document.getElementById('form-phone')].forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.animation = 'fieldShake 0.4s ease';
            setTimeout(() => {
              field.style.animation = '';
              field.style.borderColor = '';
            }, 500);
          }
        });
        return;
      }

      const waMessage = encodeURIComponent(
        `Hi, I need a moving service!\n\nName: ${name}\nPhone: ${phone}${message ? `\nDetails: ${message}` : ''}`
      );
      window.open(`https://wa.me/971507920510?text=${waMessage}`, '_blank');
      contactForm.reset();
      showSuccessToast();
    });
  }

  // ===== SUCCESS TOAST =====
  function showSuccessToast() {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 6rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.95rem;
      z-index: 9999;
      box-shadow: 0 10px 30px rgba(37,211,102,0.4);
      transition: all 0.3s ease;
      opacity: 0;
    `;
    toast.textContent = '✅ Opening WhatsApp...';
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== FIELD SHAKE ANIMATION =====
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes fieldShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(styleEl);

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // ===== WHATSAPP FLOAT BUTTON — HIDE WHEN CONTACT IN VIEW =====
  const contactSection = document.getElementById('contact');
  const waFloat = document.getElementById('floating-wa-btn');

  if (contactSection && waFloat) {
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        waFloat.style.transform = entry.isIntersecting
          ? 'scale(0.8) translateY(4px)'
          : '';
        waFloat.style.opacity = entry.isIntersecting ? '0.5' : '';
      },
      { threshold: 0.5 }
    );
    contactObserver.observe(contactSection);
  }

  // ===== ACTIVE NAV STYLE INJECTION =====
  const navStyleEl = document.createElement('style');
  navStyleEl.textContent = `
    .nav-link.active {
      color: #fff !important;
      background: rgba(255,255,255,0.1) !important;
    }
    .nav-link.active::after {
      left: 10% !important;
      right: 10% !important;
    }
  `;
  document.head.appendChild(navStyleEl);

  // ===== HERO BUTTON CLICK TRACKING (OPTIONAL ANALYTICS HOOK) =====
  document.querySelectorAll('[id$="-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Analytics hook — add your tracking code here
      // e.g., gtag('event', 'click', { event_category: btn.id });
    });
  });

  // ===== NUMBER COUNTER ANIMATION FOR HERO STATS =====
  function animateCounter(el, start, end, duration, suffix) {
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const val = Math.floor(progress * (end - start) + start);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const heroSection = document.getElementById('home');
  let countersRun = false;

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !countersRun) {
        countersRun = true;
        const statNums = document.querySelectorAll('.stat-num');
        statNums.forEach(el => {
          const text = el.textContent.trim();
          if (text === '500+') animateCounter(el, 0, 500, 1800, '+');
        });
      }
    },
    { threshold: 0.5 }
  );
  if (heroSection) heroObserver.observe(heroSection);

  // ===== LEAFLET UAE MAP INITIALIZATION =====
  const mapContainer = document.getElementById('uae-map');
  if (mapContainer && typeof L !== 'undefined') {
    // Initialize map
    const map = L.map('uae-map', {
      center: [24.8, 54.8], // Center of UAE
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      dragging: false
    });

    // Clean CARTO Voyager tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Emirates coordinates
    const emirates = [
      { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Sharjah", lat: 25.3463, lng: 55.4209 },
      { name: "Ajman", lat: 25.4052, lng: 55.5136 },
      { name: "Umm Al Quwain", lat: 25.5647, lng: 55.5552 },
      { name: "Ras Al Khaimah", lat: 25.7895, lng: 55.9432 },
      { name: "Fujairah", lat: 25.1288, lng: 56.3265 }
    ];

    // Red dot icon for markers
    const redIcon = L.divIcon({
      className: 'custom-red-marker',
      html: '<div style="width:12px; height:12px; background:#ef4444; border-radius:50%; box-shadow: 0 0 10px rgba(239,68,68,0.8); border: 2px solid white;"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    emirates.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: redIcon }).addTo(map).bindTooltip(loc.name, { direction: 'top', offset: [0, -5] });
    });
  }

})();
