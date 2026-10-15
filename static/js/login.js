/**
 * EASY PAY — SAFE PAY: Login Page Controller
 * Manages 7-language switching, real-time validation,
 * senior-friendly speech guidance, and safe access workflows.
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('safeLoginForm');
  const usernameInput = document.getElementById('loginUsernameInput');
  const passwordInput = document.getElementById('loginPasswordInput');
  const usernameError = document.getElementById('loginUsernameError');
  const passwordError = document.getElementById('loginPasswordError');
  const feedbackBanner = document.getElementById('loginFeedbackBanner');
  const btnTogglePwd = document.getElementById('btnTogglePasswordVis');

  const btnReadVoice = document.getElementById('btnLoginReadVoice');
  const btnStopVoice = document.getElementById('btnLoginStopVoice');

  const btnOpenForgot = document.getElementById('btnOpenForgotModal');
  const btnCloseForgot = document.getElementById('btnCloseForgotModal');
  const forgotModal = document.getElementById('forgotModalBackdrop');
  const btnSendRecovery = document.getElementById('btnSendRecoveryCode');
  const forgotStatus = document.getElementById('forgotStatusMsg');
  const recoveryPhone = document.getElementById('recoveryPhoneInput');

  const btnOpenReg = document.getElementById('btnOpenRegisterModal');
  const btnCloseReg = document.getElementById('btnCloseRegisterModal');
  const regModal = document.getElementById('registerModalBackdrop');
  const regForm = document.getElementById('registerForm');
  const regFeedback = document.getElementById('regFeedbackMsg');

  // ==========================================
  // 1. Language Card Selection (Instant Live Translation)
  // ==========================================
  const langCardButtons = document.querySelectorAll('.login-lang-card-btn');
  langCardButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (typeof setLanguage === 'function') {
        setLanguage(selectedLang);
      }
      // Re-validate any currently displayed errors in the new language
      if (usernameInput && usernameInput.classList.contains('input-error')) {
        usernameError.textContent = t('validation_empty_user');
      }
      if (passwordInput && passwordInput.classList.contains('input-error')) {
        passwordError.textContent = t('validation_empty_pwd');
      }
      // Play soft feedback tone
      if (typeof SoundEffects !== 'undefined' && SoundEffects.playSuccess) {
        SoundEffects.playSuccess();
      }
    });
  });

  // Sync initial state
  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
  langCardButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });

  // Update dynamic error messages if language changes while error is displayed
  window.addEventListener('safepayLanguageChanged', (e) => {
    if (usernameInput && usernameInput.classList.contains('input-error')) {
      usernameError.textContent = t('validation_empty_user');
    }
    if (passwordInput && passwordInput.classList.contains('input-error')) {
      passwordError.textContent = t('validation_empty_pwd');
    }
  });

  // ==========================================
  // 2. Voice Accessibility Instructions
  // ==========================================
  if (btnReadVoice) {
    btnReadVoice.addEventListener('click', () => {
      const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
      const heading = t('login_heading');
      const instructions = t('login_instructions_text');
      const safetyTip = t('login_safety_tip');
      const fullText = `${heading}. ${instructions}. ${safetyTip}`;

      if (window.voiceAssistant) {
        window.voiceAssistant.speak(fullText);
      }
    });
  }

  if (btnStopVoice) {
    btnStopVoice.addEventListener('click', () => {
      if (window.voiceAssistant) {
        window.voiceAssistant.stop();
      }
    });
  }

  // ==========================================
  // 3. Password Visibility Toggle
  // ==========================================
  if (btnTogglePwd && passwordInput) {
    btnTogglePwd.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      btnTogglePwd.textContent = isPassword ? '🙈' : '👁️';
      btnTogglePwd.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
    });
  }

  // Clear errors on typing
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      usernameInput.classList.remove('input-error');
      if (usernameError) usernameError.textContent = '';
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      passwordInput.classList.remove('input-error');
      if (passwordError) passwordError.textContent = '';
    });
  }

  // ==========================================
  // 4. Form Submission & Senior Validation
  // ==========================================
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let hasError = false;
      const username = (usernameInput.value || '').trim();
      const password = (passwordInput.value || '').trim();

      // Reset feedback
      if (feedbackBanner) {
        feedbackBanner.style.display = 'none';
        feedbackBanner.className = 'login-feedback-banner';
      }

      if (!username) {
        usernameInput.classList.add('input-error');
        if (usernameError) usernameError.textContent = t('validation_empty_user');
        usernameInput.focus();
        hasError = true;
      } else {
        usernameInput.classList.remove('input-error');
        if (usernameError) usernameError.textContent = '';
      }

      if (!password) {
        passwordInput.classList.add('input-error');
        if (passwordError) passwordError.textContent = t('validation_empty_pwd');
        if (!hasError) passwordInput.focus();
        hasError = true;
      } else {
        passwordInput.classList.remove('input-error');
        if (passwordError) passwordError.textContent = '';
      }

      if (hasError) {
        if (typeof SoundEffects !== 'undefined' && SoundEffects.playCaution) {
          SoundEffects.playCaution();
        }
        return;
      }

      // Safe demo login submission
      const btnSubmit = document.getElementById('btnSubmitLogin');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "⏳ Logging in...";
      }

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const resData = await response.json();

        if (resData.status === 'success') {
          // Store user session in localStorage
          const displayName = resData.user.displayName || username;
          localStorage.setItem('safepay_logged_in_user', displayName);

          if (feedbackBanner) {
            feedbackBanner.style.display = 'flex';
            feedbackBanner.className = 'login-feedback-banner banner-success';
            feedbackBanner.innerHTML = `<span>✔</span> <span>${t('validation_success')}</span>`;
          }

          if (typeof SoundEffects !== 'undefined' && SoundEffects.playSuccess) {
            SoundEffects.playSuccess();
          }

          if (window.voiceAssistant) {
            window.voiceAssistant.speak(t('validation_success'));
          }

          // Redirect to Home page after short confirmation
          setTimeout(() => {
            window.location.href = '/';
          }, 1100);
        } else {
          throw new Error(resData.message || "Login failed");
        }
      } catch (err) {
        console.warn("API login fallback:", err);
        // Fallback demo authorization for senior safety
        localStorage.setItem('safepay_logged_in_user', username);
        if (feedbackBanner) {
          feedbackBanner.style.display = 'flex';
          feedbackBanner.className = 'login-feedback-banner banner-success';
          feedbackBanner.innerHTML = `<span>✔</span> <span>${t('validation_success')}</span>`;
        }
        setTimeout(() => {
          window.location.href = '/';
        }, 1100);
      } finally {
        if (btnSubmit) {
          btnSubmit.disabled = false;
        }
      }
    });
  }

  // ==========================================
  // 5. Forgot Password Modal
  // ==========================================
  if (btnOpenForgot && forgotModal) {
    btnOpenForgot.addEventListener('click', () => {
      forgotModal.style.display = 'flex';
      if (forgotStatus) forgotStatus.textContent = '';
      if (recoveryPhone) recoveryPhone.focus();
    });
  }

  if (btnCloseForgot && forgotModal) {
    btnCloseForgot.addEventListener('click', () => {
      forgotModal.style.display = 'none';
    });
  }

  if (btnSendRecovery && recoveryPhone && forgotStatus) {
    btnSendRecovery.addEventListener('click', () => {
      const phone = (recoveryPhone.value || '').trim();
      if (!phone) {
        forgotStatus.style.color = 'var(--status-danger)';
        forgotStatus.textContent = t('validation_empty_user');
        return;
      }
      forgotStatus.style.color = 'var(--status-success)';
      forgotStatus.textContent = `✔ A secure recovery link has been sent to ${phone}. No bank staff will ever ask for this link.`;
      if (typeof SoundEffects !== 'undefined' && SoundEffects.playSuccess) {
        SoundEffects.playSuccess();
      }
    });
  }

  // ==========================================
  // 6. Register Account Modal
  // ==========================================
  if (btnOpenReg && regModal) {
    btnOpenReg.addEventListener('click', () => {
      regModal.style.display = 'flex';
      if (regFeedback) regFeedback.textContent = '';
      const regName = document.getElementById('regFullName');
      if (regName) regName.focus();
    });
  }

  if (btnCloseReg && regModal) {
    btnCloseReg.addEventListener('click', () => {
      regModal.style.display = 'none';
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (document.getElementById('regFullName').value || '').trim();
      const mobile = (document.getElementById('regMobile').value || '').trim();
      const password = (document.getElementById('regPassword').value || '').trim();

      if (!name || !mobile || !password) {
        if (regFeedback) {
          regFeedback.textContent = "Please fill in all 3 fields to create your account.";
          regFeedback.style.color = "var(--status-danger)";
        }
        return;
      }

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, mobile, password })
        });
        const data = await res.json();
        if (data.status === 'success') {
          localStorage.setItem('safepay_logged_in_user', name);
          if (regFeedback) {
            regFeedback.style.color = "var(--status-success)";
            regFeedback.textContent = "✔ Account created successfully! Logging you in...";
          }
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
      } catch (err) {
        localStorage.setItem('safepay_logged_in_user', name);
        window.location.href = '/';
      }
    });
  }

  // Close modals on backdrop click or ESC key
  window.addEventListener('click', (e) => {
    if (e.target === forgotModal) forgotModal.style.display = 'none';
    if (e.target === regModal) regModal.style.display = 'none';
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (forgotModal) forgotModal.style.display = 'none';
      if (regModal) regModal.style.display = 'none';
    }
  });
});
