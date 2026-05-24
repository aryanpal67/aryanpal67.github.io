/* =============================================================
   main.js  –  Global utilities
   Aryan's Blog · v2.0
   ============================================================= */

// ── Mobile nav toggle ──────────────────────────────────────
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close when a link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Mark current page link
  const path = window.location.pathname;
  menu.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' ? path === '/' : path.startsWith(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// ── Scroll reveal ──────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
})();

// ── Confetti burst (exported globally) ────────────────────
function confettiBurst(count = 60) {
  const colours = [
    '#ff6b9d','#a78bfa','#ffd93d',
    '#6bcb77','#6ec6f0','#ff9a3c','#ff6b6b'
  ];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left              = Math.random() * 100 + 'vw';
    el.style.background        = colours[Math.floor(Math.random() * colours.length)];
    el.style.animationDuration = (1.4 + Math.random() * 2) + 's';
    el.style.animationDelay    = (Math.random() * 0.5) + 's';
    el.style.borderRadius      = Math.random() > 0.5 ? '50%' : '2px';
    const size = (7 + Math.random() * 8) + 'px';
    el.style.width  = size;
    el.style.height = size;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  }
}
