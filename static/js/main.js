/**
 * EASY PAY — SAFE PAY: Main UI Controller
 * Manages Senior Accessibility controls (font resizing, high contrast),
 * Audio feedback cues, responsive navigation, and global UX helpers.
 */

// Sound Feedback Helpers using Web Audio API (Zero external assets required)
const SoundEffects = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {
      // Audio not permitted without interaction
    }
  },
  playCaution() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.setValueAtTime(240, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      // Graceful fallback
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Font Size Adjustment
  const fontSizeBtns = document.querySelectorAll('.btn-font-size');
  const savedFontSize = localStorage.getItem('safepay_font_size') || 'md';
  document.documentElement.setAttribute('data-font-size', savedFontSize);

  fontSizeBtns.forEach(btn => {
    const size = btn.getAttribute('data-size');
    btn.classList.toggle('active', size === savedFontSize);
    btn.addEventListener('click', () => {
      document.documentElement.setAttribute('data-font-size', size);
      localStorage.setItem('safepay_font_size', size);
      fontSizeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-size') === size));
    });
  });

  // 2. High Contrast Mode Toggle
  const contrastToggle = document.getElementById('toggleHighContrast');
  const savedTheme = localStorage.getItem('safepay_theme') || 'normal';
  if (savedTheme === 'high-contrast') {
    document.documentElement.setAttribute('data-theme', 'high-contrast');
    if (contrastToggle) {
      contrastToggle.classList.add('active');
    }
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      const isHighContrast = document.documentElement.getAttribute('data-theme') === 'high-contrast';
      if (isHighContrast) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('safepay_theme', 'normal');
        contrastToggle.classList.remove('active');
      } else {
        document.documentElement.setAttribute('data-theme', 'high-contrast');
        localStorage.setItem('safepay_theme', 'high-contrast');
        contrastToggle.classList.add('active');
      }
    });
  }

  // 3. Language Selector Handling
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (typeof setLanguage === 'function') {
        setLanguage(selectedLang);
      }
    });
  });

  const headerLangSelect = document.getElementById('headerLangSelect');
  if (headerLangSelect) {
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    headerLangSelect.value = currentLang;
    headerLangSelect.addEventListener('change', (e) => {
      if (typeof setLanguage === 'function') {
        setLanguage(e.target.value);
      }
    });
  }

  // 4. User Login State Display in Navigation
  const loggedInUser = localStorage.getItem('safepay_logged_in_user');
  const navLoginLink = document.getElementById('navLoginLink');
  const navUserBadge = document.getElementById('navUserBadge');
  const navUserName = document.getElementById('navUserName');
  const navLogoutBtn = document.getElementById('navLogoutBtn');

  if (loggedInUser && navUserBadge && navLoginLink) {
    navLoginLink.style.display = 'none';
    navUserBadge.style.display = 'inline-flex';
    if (navUserName) {
      navUserName.textContent = `👤 ${loggedInUser}`;
    }
  }

  if (navLogoutBtn) {
    navLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('safepay_logged_in_user');
      window.location.href = '/login';
    });
  }

  // 5. Mobile Menu Toggle
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }
});
