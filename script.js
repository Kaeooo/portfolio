/* ============================================================
   PORTFOLIO SCRIPT — Kaeota Matyalan
   ============================================================ */

/* ── TYPING EFFECT ───────────────────────────────────────── */
const phrases = [
  'Computer Science Graduate',
  'Software Developer',
  'System Analyst',
  'Problem Solver',
];

let pi = 0, ci = 0, deleting = false;

function type() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const current = phrases[pi];

  if (!deleting) {
    el.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    el.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 45 : 80);
}

/* ── WELCOME SCREEN ──────────────────────────────────────── */
function initWelcome() {
  const ws = document.getElementById('welcome-screen');
  if (!ws) return;

  type(); // start typing

  setTimeout(() => {
    ws.classList.add('hide');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, 3200);

  // failsafe: force release after 4s
  setTimeout(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, 4000);
}

/* ── SECTION TOGGLE ──────────────────────────────────────── */
function toggleSection(id) {
  const sec = document.getElementById(id);
  if (!sec) return;

  const isHidden = sec.classList.contains('hidden-section');

  // close all
  document.querySelectorAll('.content-section').forEach(s => {
    s.classList.add('hidden-section');
  });

  if (isHidden) {
    sec.classList.remove('hidden-section');
    setTimeout(() => {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  } else {
    // was open → just closed → scroll back to top (menu area)
    document.querySelector('.menu-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── IMAGE MODAL ─────────────────────────────────────────── */
function initModal() {
  const modal   = document.getElementById('imgModal');
  const popupImg = document.getElementById('popupImg');
  const closeBtn = document.querySelector('.close-btn');

  if (!modal || !popupImg) return;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('.popup-image');
    if (trigger && trigger.tagName === 'IMG') {
      popupImg.src = trigger.src;
      if (trigger.classList.contains('always-blurred')) {
    popupImg.src = trigger.src; // ใช้รูปเดิม
    popupImg.classList.add('blurred-in-modal');
} else {
    popupImg.src = trigger.src;
    popupImg.classList.remove('blurred-in-modal');
}
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    // only release if modal was actually locking scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ── PROFILE POPUP ───────────────────────────────────────── */
function initProfile() {
  const btn = document.getElementById('profileBtn');
  if (!btn) return;
  btn.addEventListener('click', () => btn.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target)) btn.classList.remove('open');
  });
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  initWelcome();
  initModal();
  initProfile();
});