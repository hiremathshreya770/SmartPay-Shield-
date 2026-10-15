/**
 * EASY PAY — SAFE PAY
 * LEARN UPI SAFELY
 *
 * Interactive step-by-step tutorial engine designed for senior citizens.
 * Features:
 * - Stepper & Next/Previous navigation between all 6 sections + quiz
 * - Interactive video/simulation players with Play/Pause/Restart and synchronized captions
 * - Audio Read Aloud & Stop Speaking using browser Web Speech API
 * - Instant 1-tap English and Kannada language toggle
 * - Educational simulation safety notices (never collects real PINs/credentials)
 * - Accessible text transcripts for every demonstration
 * - Senior Safety Knowledge Check quiz with instant feedback
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question_en: "1. What happens when you enter your 4-digit or 6-digit UPI PIN?",
    question_kn: "೧. ನೀವು ೪ ಅಥವಾ ೬-ಅಂಕಿಯ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಿದಾಗ ಏನಾಗುತ್ತದೆ?",
    options: [
      { text_en: "Money LEAVES your bank account to pay someone.", text_kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗಿ ಬೇರೆಯವರಿಗೆ ಹೋಗುತ್ತದೆ.", is_correct: true },
      { text_en: "Money is credited into your bank account.", text_kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ ಬರುತ್ತದೆ.", is_correct: false }
    ],
    explanation_en: "Correct! The UPI PIN is ONLY used to authorize sending money. To receive money, you NEVER need to enter a PIN.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ಯುಪಿಐ ಪಿನ್ ಕೇವಲ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಪಿನ್ ಅಗತ್ಯವಿಲ್ಲ."
  },
  {
    id: 2,
    question_en: "2. Someone calls claiming to be from your bank and asks for a 6-digit OTP to prevent your account from blocking. What should you do?",
    question_kn: "೨. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗದಂತೆ ತಡೆಯಲು ೬-ಅಂಕಿಯ ಒಟಿಪಿ ನೀಡುವಂತೆ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಹೆಸರಿನಲ್ಲಿ ಕರೆ ಬಂದರೆ ಏನು ಮಾಡುತ್ತೀರಿ?",
    options: [
      { text_en: "Hang up immediately. Legitimate banks NEVER ask for your OTP.", text_kn: "ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡುತ್ತೇನೆ. ನೈಜ ಬ್ಯಾಂಕುಗಳು ಎಂದಿಗೂ ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ.", is_correct: true },
      { text_en: "Tell them the OTP quickly so the account stays active.", text_kn: "ಖಾತೆ ಚಾಲ್ತಿಯಲ್ಲಿರಲಿ ಎಂದು ತಕ್ಷಣ ಒಟಿಪಿ ಹೇಳುತ್ತೇನೆ.", is_correct: false }
    ],
    explanation_en: "Correct! No genuine bank employee has the authority to ask for an OTP. It is a secret password.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ಯಾವುದೇ ನೈಜ ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ ಒಟಿಪಿ ಕೇಳುವಂತಿಲ್ಲ. ಅದು ನಿಮ್ಮ ಹಣದ ರಹಸ್ಯ ಬೀಗ."
  },
  {
    id: 3,
    question_en: "3. Someone on WhatsApp sends you a QR code and says 'Scan this QR code to receive your ₹5,000 lottery prize'. What is the truth?",
    question_kn: "೩. 'ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ನಿಮ್ಮ ಖಾತೆಗೆ ₹೫,೦೦೦ ಬಹುಮಾನ ಜಮೆಯಾಗುತ್ತದೆ' ಎಂದು ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ ಬಂದರೆ ಸತ್ಯವೇನು?",
    options: [
      { text_en: "It is a 100% scam! QR codes are only for SENDING money, never receiving.", text_kn: "ಇದು ನೂರಕ್ಕೆ ನೂರು ಮೋಸ! ಕ್ಯೂಆರ್ ಕೋಡ್ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ, ಪಡೆಯಲು ಅಲ್ಲ.", is_correct: true },
      { text_en: "It is genuine. Scanning will deposit the ₹5,000.", text_kn: "ಇದು ನೈಜವಾಗಿದೆ. ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ.", is_correct: false }
    ],
    explanation_en: "Correct! You only scan QR codes to pay a shopkeeper. You NEVER scan a QR code to receive money.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ನೀವು ಅಂಗಡಿಯವರಿಗೆ ಹಣ ಪಾವತಿಸಲು ಮಾತ್ರ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುತ್ತೀರಿ. ಹಣ ಪಡೆಯಲು ಅಲ್ಲ."
  },
  {
    id: 4,
    question_en: "4. Where is the safest place to find your bank's official customer care helpline number?",
    question_kn: "೪. ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನ ಅಧಿಕೃತ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ಹುಡುಕಲು ಅತ್ಯಂತ ಸುರಕ್ಷಿತ ಸ್ಥಳ ಯಾವುದು?",
    options: [
      { text_en: "On the back of your physical ATM debit card or in your bank passbook.", text_kn: "ನಿಮ್ಮ ಎಟಿಎಂ ಕಾರ್ಡ್‌ನ ಹಿಂಭಾಗದಲ್ಲಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿ.", is_correct: true },
      { text_en: "By calling the first mobile number that shows up on a Google search.", text_kn: "ಗೂಗಲ್‌ನಲ್ಲಿ ಸರ್ಚ್ ಮಾಡಿದಾಗ ಮೊದಲು ಕಾಣಿಸುವ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡುವುದು.", is_correct: false }
    ],
    explanation_en: "Correct! Fraudsters post fake mobile numbers on Google search results. Always rely on your physical debit card or passbook.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ಗೂಗಲ್‌ನಲ್ಲಿ ವಂಚಕರು ನಕಲಿ ಸಂಖ್ಯೆಗಳನ್ನು ಹಾಕಿರುತ್ತಾರೆ. ಯಾವಾಗಲೂ ಎಟಿಎಂ ಕಾರ್ಡ್ ಅಥವಾ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿರುವ ಸಂಖ್ಯೆಯನ್ನೇ ಬಳಸಿ."
  },
  {
    id: 5,
    question_en: "5. Does fingerprint / biometric unlock completely replace your UPI PIN for sending money?",
    question_kn: "೫. ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಲಾಕ್ ಆನ್ ಮಾಡಿದರೆ ಹಣ ಕಳುಹಿಸಲು ಯುಪಿಐ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲವೇ?",
    options: [
      { text_en: "NO. Biometrics unlocks the phone/app, but the confidential UPI PIN authorizes the bank transfer.", text_kn: "ಇಲ್ಲ. ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಆ್ಯಪ್ ಅನ್‌ಲಾಕ್ ಮಾಡುತ್ತದೆ, ಆದರೆ ಹಣ ಕಳುಹಿಸಲು ರಹಸ್ಯ ಯುಪಿಐ ಪಿನ್ ಕಡ್ಡಾಯ.", is_correct: true },
      { text_en: "YES. Fingerprint replaces the UPI PIN in every transaction.", text_kn: "ಹೌದು. ಎಲ್ಲಾ ಸಂದರ್ಭದಲ್ಲೂ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಪಿನ್ ಬದಲಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ.", is_correct: false }
    ],
    explanation_en: "Correct! Biometric authentication safeguards the device, but the bank UPI PIN remains mandated by NPCI to authorize the fund transfer.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ಬಯೋಮೆಟ್ರಿಕ್ ಕೇವಲ ಆ್ಯಪ್ ಭದ್ರತೆಗೆ, ಹಣ ವರ್ಗಾವಣೆಯಾಗಲು ಬ್ಯಾಂಕ್ ಯುಪಿಐ ಪಿನ್ ಅಗತ್ಯ."
  },
  {
    id: 6,
    question_en: "6. What is the official National Cyber Crime Helpline number in India to report online financial fraud?",
    question_kn: "೬. ಭಾರತದಲ್ಲಿ ಆನ್‌ಲೈನ್ ಆರ್ಥಿಕ ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಲು ಅಧಿಕೃತ ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಂ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಯಾವುದು?",
    options: [
      { text_en: "1930 (Nineteen Thirty) and portal cybercrime.gov.in", text_kn: "೧೯೩೦ (1930) ಮತ್ತು cybercrime.gov.in ಜಾಲತಾಣ", is_correct: true },
      { text_en: "9999", text_kn: "೯೯೯೯", is_correct: false }
    ],
    explanation_en: "Correct! 1930 is the official toll-free government helpline operational 24x7 across India.",
    explanation_kn: "ಸರಿಯಾದ ಉತ್ತರ! ೧೯೩೦ ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ೨೪x೭ ಉಚಿತ ಸೈಬರ್ ಸಹಾಯವಾಣಿಯಾಗಿದೆ."
  }
];

class LearnUpiSafelyManager {
  constructor() {
    this.currentSection = 1;
    this.totalSections = 14;
    this.videoTimers = {};
    this.videoPlaying = {};
    this.speechUtterance = null;
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindCurriculumGrid();
    this.bindHashNavigation();
    this.bindLanguageToggles();
    this.bindAudioControls();
    this.bindVideoPlayers();
    this.initQuiz();
    this.updateLanguageUI();
  }

  bindCurriculumGrid() {
    const curBtns = document.querySelectorAll('.curriculum-item-btn');
    curBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = parseInt(btn.getAttribute('data-target-section'), 10);
        if (sec) {
          this.goToSection(sec);
        }
      });
    });
  }

  bindHashNavigation() {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const lessonMatch = hash.match(/^#lesson-(\d+)$/);
      if (lessonMatch) {
        const lessonNum = parseInt(lessonMatch[1], 10);
        const lessonMap = {
          1: 1, 2: 2, 3: 3, 4: 7, 5: 6, 6: 6,
          7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13
        };
        const sec = lessonMap[lessonNum] || 1;
        this.goToSection(sec);
        const el = document.getElementById(`lesson-${lessonNum}`) || document.getElementById(`learnSection${sec}`);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    setTimeout(handleHash, 100);
  }

  // 1. Navigation Between Sections
  bindNavigation() {
    // Stepper Tabs
    const stepperTabs = document.querySelectorAll('.stepper-tab-btn');
    stepperTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const step = parseInt(tab.getAttribute('data-step'), 10);
        if (step) {
          this.goToSection(step);
        }
      });
    });

    // Next Step Buttons
    const nextButtons = document.querySelectorAll('.btn-next-step');
    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const next = parseInt(btn.getAttribute('data-next'), 10);
        if (next) {
          this.goToSection(next);
        }
      });
    });

    // Previous Step Buttons
    const prevButtons = document.querySelectorAll('.btn-prev-step');
    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const prev = parseInt(btn.getAttribute('data-prev'), 10);
        if (prev) {
          this.goToSection(prev);
        }
      });
    });
  }

  goToSection(sectionNum) {
    if (sectionNum < 1 || sectionNum > this.totalSections) return;
    this.currentSection = sectionNum;

    // Stop speaking when leaving a section
    this.stopSpeaking();

    // Update Stepper Tabs
    const tabs = document.querySelectorAll('.stepper-tab-btn');
    tabs.forEach(t => {
      const step = parseInt(t.getAttribute('data-step'), 10);
      const isActive = step === sectionNum;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Section Cards
    const cards = document.querySelectorAll('.learn-section-card');
    cards.forEach(card => {
      const sec = parseInt(card.getAttribute('data-section'), 10);
      card.classList.toggle('active', sec === sectionNum);
    });

    // Smooth scroll to top of active card
    const activeCard = document.getElementById(`learnSection${sectionNum}`);
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 2. Language Switching (English / Kannada)
  bindLanguageToggles() {
    const btnEn = document.getElementById('btnLearnLangEn');
    const btnKn = document.getElementById('btnLearnLangKn');

    if (btnEn) {
      btnEn.addEventListener('click', () => {
        if (typeof setLanguage === 'function') setLanguage('en');
        this.updateLanguageUI();
      });
    }

    if (btnKn) {
      btnKn.addEventListener('click', () => {
        if (typeof setLanguage === 'function') setLanguage('kn');
        this.updateLanguageUI();
      });
    }

    window.addEventListener('safepayLanguageChanged', () => {
      this.updateLanguageUI();
      this.renderQuizQuestions();
    });
  }

  updateLanguageUI() {
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = currentLang === 'kn';

    const btnEn = document.getElementById('btnLearnLangEn');
    const btnKn = document.getElementById('btnLearnLangKn');
    if (btnEn) {
      btnEn.classList.toggle('active', !isKn);
      btnEn.setAttribute('aria-pressed', !isKn ? 'true' : 'false');
    }
    if (btnKn) {
      btnKn.classList.toggle('active', isKn);
      btnKn.setAttribute('aria-pressed', isKn ? 'true' : 'false');
    }

    // Toggle English/Kannada content spans
    document.querySelectorAll('.title-en, .text-en, .caption-en').forEach(el => {
      el.style.display = isKn ? 'none' : '';
    });
    document.querySelectorAll('.title-kn, .text-kn, .caption-kn').forEach(el => {
      el.style.display = isKn ? '' : 'none';
    });
  }

  // 3. Audio Read Aloud & Stop Speaking
  bindAudioControls() {
    const readButtons = document.querySelectorAll('.btn-read-aloud');
    readButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const secId = btn.getAttribute('data-section');
        this.readSectionAloud(secId);
      });
    });

    const stopButtons = document.querySelectorAll('.btn-stop-audio');
    stopButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.stopSpeaking();
      });
    });
  }

  readSectionAloud(sectionNum) {
    this.stopSpeaking();
    if (!('speechSynthesis' in window)) {
      alert("Voice speech is not supported in this browser.");
      return;
    }

    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = currentLang === 'kn';
    const activeCard = document.getElementById(`learnSection${sectionNum}`);
    if (!activeCard) return;

    let textToRead = "";
    if (sectionNum === '1') {
      textToRead = isKn ?
        "ವಿಭಾಗ ಒಂದು: ಯುಪಿಐ ಎಂದರೇನು? ಯುಪಿಐ ಎಂದರೆ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ನಡುವೆ ಹಣವನ್ನು ತಕ್ಷಣವೇ ತಲುಪಿಸುವ ಸರಳ ವ್ಯವಸ್ಥೆ. ಉದಾಹರಣೆಗೆ ತರಕಾರಿ ಅಂಗಡಿಯಲ್ಲಿ ೧೨೦ ರೂಪಾಯಿ ಪಾವತಿಸಲು, ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಹಣ ವರ್ಗಾಯಿಸಬಹುದು. ಹಣ ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನಲ್ಲೇ ಇರುತ್ತದೆ ಮತ್ತು ೨೪ ಗಂಟೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ." :
        "Section 1: Understanding UPI. UPI is an instant, secure delivery service between banks. For example, when buying vegetables worth 120 rupees from Shri Manjunath Stores, you can scan the vendor's QR code and the money transfers safely directly from your bank account in 3 seconds. Your funds remain safely in your bank, available 24 hours every day.";
    } else if (sectionNum === '2') {
      textToRead = isKn ?
        "ವಿಭಾಗ ಎರಡು: ಯುಪಿಐ ಪಾವತಿ ಮಾಡುವ ೬ ಮುಖ್ಯ ಹಂತಗಳು. ಒಂದು: ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ ಯುಪಿಐ ಆ್ಯಪ್ ತೆರೆಯಿರಿ. ಎರಡು: ಸ್ವೀಕರಿಸುವವರ ಹೆಸರನ್ನು ಪರದೆಯ ಮೇಲೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಮೂರು: ನಿಖರವಾದ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ. ನಾಲ್ಕು: ಪಾವತಿ ವಿವರಗಳನ್ನು ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ. ಐದು: ನಿಮ್ಮ ರಹಸ್ಯ ಯುಪಿಐ ಪಿನ್ ಅನ್ನು ಕೇವಲ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ ನಮೂದಿಸಿ. ಆರು: ಪಾವತಿ ಯಶಸ್ವಿ ಹಸಿರು ಗುರುತು ಮತ್ತು ಬ್ಯಾಂಕ್ ಎಸ್ಎಂಎಸ್ ಪರಿಶೀಲಿಸಿ." :
        "Section 2: Making a UPI Payment in six steps. Step 1: Open your own trusted UPI app. Step 2: Verify the recipient's name on your mobile screen. Step 3: Enter the intended amount carefully. Step 4: Review payment details. Step 5: Enter your confidential UPI PIN only when sending money. Step 6: Confirm the result and check your transaction history.";
    } else if (sectionNum === '3') {
      textToRead = isKn ?
        "ವಿಭಾಗ ಮೂರು: ಯುಪಿಐ ಪಿನ್ ಹೊಂದಿಸುವುದು ಅಥವಾ ಬದಲಾಯಿಸುವುದು. ಪ್ರಮುಖ ಸುರಕ್ಷತಾ ಸೂಚನೆ: ನಿಮ್ಮ ನಿಜವಾದ ಪಿನ್ ಅನ್ನು ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಎಂದಿಗೂ ನಮೂದಿಸಬೇಡಿ. ಬ್ಯಾಂಕ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಪ್ರೊಫೈಲ್ ತೆರೆದು, ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಅಥವಾ ಆಧಾರ್ ಒಟಿಪಿ ಬಳಸಿ ಹೊಸ ರಹಸ್ಯ ಪಿನ್ ರಚಿಸಬಹುದು. ಈ ಪಿನ್ ಅನ್ನು ಯಾರಿಗೂ ಹೇಳಬೇಡಿ." :
        "Section 3: Setting or resetting your UPI PIN. Important safety reminder: Never enter your real PIN into this website or any website. Follow your bank's official instructions inside your trusted app using your debit card or Aadhaar OTP to create a memorable, confidential PIN.";
    } else if (sectionNum === '4') {
      textToRead = isKn ?
        "ವಿಭಾಗ ನಾಲ್ಕು: ಯುಪಿಐ ಪಿನ್ ಸುರಕ್ಷತೆಯ ಸುವರ್ಣ ನಿಯಮ. ಯುಪಿಐ ಪಿನ್ ಕೇವಲ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಪಡೆಯಲು ಅಥವಾ ಬಹುಮಾನ ಪಡೆಯಲು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ. ಅಪರಿಚಿತ ಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ." :
        "Section 4: The Golden Rule of UPI PIN Safety. A UPI PIN is confidential and used ONLY to send money out of your account. You NEVER enter a PIN to receive money, refunds, or lottery prizes. Always decline unexpected payment requests.";
    } else if (sectionNum === '5') {
      textToRead = isKn ?
        "ವಿಭಾಗ ಐದು: ಬಯೋಮೆಟ್ರಿಕ್ ಮತ್ತು ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಸುರಕ್ಷತೆ. ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಆ್ಯಪ್ ಲಾಕ್ ಆನ್ ಮಾಡಿ. ಇದು ಆ್ಯಪ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡುತ್ತದೆ. ಆದರೆ ಹಣ ಕಳುಹಿಸಲು ರಹಸ್ಯ ಯುಪಿಐ ಪಿನ್ ಕಡ್ಡಾಯವಾಗಿರುತ್ತದೆ. ಈ ವೆಬ್‌ಸೈಟ್ ಯಾವುದೇ ಬಯೋಮೆಟ್ರಿಕ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ." :
        "Section 5: Biometric Authentication. Enable fingerprint lock in your app settings so strangers cannot open your payment app. Note that biometric lock does not replace your bank UPI PIN for authorizing money transfers.";
    } else if (sectionNum === '6') {
      textToRead = isKn ?
        "ವಿಭಾಗ ಆರು: ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಮತ್ತು ಕ್ಯೂಆರ್ ಕೋಡ್ ವಂಚನೆಗಳು. ಅಪರಿಚಿತ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಒಪ್ಪಿಕೊಂಡು ಪಿನ್ ಹಾಕಿದರೆ ನಿಮ್ಮ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಡಿಕ್ಲೈನ್ ಒತ್ತಿ. ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದರಿಂದ ಎಂದಿಗೂ ಹಣ ಬರುವುದಿಲ್ಲ. ಅದು ಕೇವಲ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ." :
        "Section 6: Recognizing Collect Requests and QR scams. Tapping approve on an unexpected collect request will deduct money from your account, so always tap Decline. Scanning a QR code can NEVER deposit money into your account; QR codes are only for paying someone.";
    } else if (sectionNum === '7') {
      textToRead = isKn ?
        "ಪಾಠ ನಾಲ್ಕು: ಒಟಿಪಿ ಸುರಕ್ಷತೆಯ ಸುವರ್ಣ ನಿಯಮ. ಒಟಿಪಿಯನ್ನು ಎಂದಿಗೂ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಯುಪಿಐ ಮೂಲಕ ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳುವ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ. ಯಾವುದೇ ಕರೆ ಅಥವಾ ಸಂದೇಶದಲ್ಲಿ ಒಟಿಪಿ ಕೇಳಿದರೆ ಫೋನ್ ಕಟ್ ಮಾಡಿ." :
        "Lesson 4: OTP Safety. Never share One-Time Passwords with anyone. Receiving money through UPI NEVER requires sharing an OTP or entering your UPI PIN. If any caller asks for your OTP, hang up immediately.";
    } else if (sectionNum === '8') {
      textToRead = isKn ?
        "ಪಾಠ ಏಳು: ನಕಲಿ ಪಾವತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ವಂಚನೆ. ಬೇರೆಯವರ ಮೊಬೈಲ್ ಸ್ಕ್ರೀನ್ ನೋಡಿ ಎಂದಿಗೂ ನಂಬಬೇಡಿ. ನಿಮ್ಮ ಸ್ವಂತ ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ಅಥವಾ ಅಧಿಕೃತ ಎಸ್ಎಂಎಸ್ ಪರಿಶೀಲಿಸಿ ಹಣ ಜಮೆಯಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಂಡ ನಂತರವೇ ವಸ್ತುಗಳನ್ನು ನೀಡಿ." :
        "Lesson 7: Fake Payment Screenshots. Never trust a screenshot on someone else's phone. Money has only arrived when your own bank balance shows the deposit inside your trusted app. Always verify before releasing goods.";
    } else if (sectionNum === '9') {
      textToRead = isKn ?
        "ಪಾಠ ಎಂಟು: ನಕಲಿ ಬ್ಯಾಂಕ್ ಮತ್ತು ಗ್ರಾಹಕ ಸೇವಾ ಕರೆಗಳು. ಯಾವುದೇ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅಥವಾ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಫೋನ್ ಕರೆಯಲ್ಲಿ ನಿಮ್ಮ ರಹಸ್ಯ ಪಿನ್, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ. ಒತ್ತಡ ಹೇರುವ ಕರೆಗಳನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ." :
        "Lesson 8: Fake Bank and Customer Care Calls. Real bank managers never ask for PINs or passwords over the phone. Police never interrogate or demand bail on WhatsApp video calls. Hang up on pressured calls.";
    } else if (sectionNum === '10') {
      textToRead = isKn ?
        "ಪಾಠ ಒಂಬತ್ತು: ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಮತ್ತು ರಿಮೋಟ್ ಆ್ಯಪ್ ವಂಚನೆಗಳು. ಯಾವುದೇ ಕರೆಯಲ್ಲಿ AnyDesk, TeamViewer ಅಥವಾ QuickSupport ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಹೇಳಿದರೆ ಒಪ್ಪಬೇಡಿ. ಇದು ನಿಮ್ಮ ಮೊಬೈಲ್‌ನ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣವನ್ನು ವಂಚಕನಿಗೆ ನೀಡುತ್ತದೆ." :
        "Lesson 9: Screen-Sharing Scams. Never install AnyDesk, TeamViewer, or QuickSupport on the advice of any caller. Screen-sharing allows strangers to see your bank logins and steal your savings.";
    } else if (sectionNum === '11') {
      textToRead = isKn ?
        "ಪಾಠ ಹತ್ತು: ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಸಂದೇಶಗಳು. ಎಸ್ಎಂಎಸ್ ಅಥವಾ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ ಬರುವ ಬಿಟ್ಲಿ ಅಥವಾ ಅಪರಿಚಿತ ಲಿಂಕ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಅಧಿಕೃತ ಬಿಲ್ ಪಾವತಿಗೆ ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ ಆ್ಯಪ್ ಅನ್ನು ಮಾತ್ರ ನೇರವಾಗಿ ಬಳಸಿ." :
        "Lesson 10: Suspicious Links and Phishing. Never tap web links in unsolicited text messages or WhatsApp. Genuine banks never send bit.ly shortened links. Always open your official app directly.";
    } else if (sectionNum === '12') {
      textToRead = isKn ?
        "ಪಾಠ ಹನ್ನೊಂದು: ತುರ್ತು ಅಥವಾ ಬೆದರಿಕೆಯ ಸಂದೇಶಗಳು. ವಂಚಕರು ಭಯ ಮತ್ತು ತುರ್ತು ಭಾವನೆ ಸೃಷ್ಟಿಸಿ ಹಣ ಕದಿಯುತ್ತಾರೆ. ತಕ್ಷಣವೇ ಹಣ ಕಳುಹಿಸಿ ಎಂದು ಒತ್ತಡ ಹೇರಿದಾಗ, ತಕ್ಷಣವೇ ನಿಲ್ಲಿಸಿ, ಉಸಿರೆಳೆದುಕೊಳ್ಳಿ ಮತ್ತು ನಿಮ್ಮ ಕುಟುಂಬದವರೊಂದಿಗೆ ಮಾತನಾಡಿ." :
        "Lesson 11: Recognizing Urgent Threats. High urgency is the scammer's trademark. No legitimate bank requires payment in 5 minutes. When pressured to act immediately, stop immediately and consult family.";
    } else if (sectionNum === '13') {
      textToRead = isKn ?
        "ಪಾಠ ಹನ್ನೆರಡು: ಹಣ ಕಳೆದುಕೊಂಡಾಗ ಅಥವಾ ವಂಚನೆಗೊಳಗಾದಾಗ ಏನು ಮಾಡಬೇಕು. ಗಾಬರಿಯಾಗಬೇಡಿ: ತಕ್ಷಣ ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ಗೆ ಕರೆ ಮಾಡಿ ಕಾರ್ಡ್ ಮತ್ತು ಯುಪಿಐ ಬ್ಲಾಕ್ ಮಾಡಿ. ನಂತರ ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ ೧೯೩೦ ಗೆ ಕರೆ ಮಾಡಿ ಮತ್ತು cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ." :
        "Lesson 12: What to Do After Suspected Fraud. Do not panic and do not blame yourself. Immediately call your bank to block your card and freeze UPI. Then dial Helpline 1930 within the Golden Hour and report at cybercrime.gov.in.";
    }

    if (!textToRead) return;

    this.speechUtterance = new SpeechSynthesisUtterance(textToRead);
    this.speechUtterance.lang = isKn ? 'kn-IN' : 'en-IN';
    this.speechUtterance.rate = 0.9; // Calm, senior-friendly speaking rate

    // Visual feedback
    const activeBtn = activeCard.querySelector('.btn-read-aloud');
    if (activeBtn) activeBtn.classList.add('reading-active');

    this.speechUtterance.onend = () => {
      if (activeBtn) activeBtn.classList.remove('reading-active');
    };
    this.speechUtterance.onerror = () => {
      if (activeBtn) activeBtn.classList.remove('reading-active');
    };

    window.speechSynthesis.speak(this.speechUtterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll('.btn-read-aloud').forEach(b => b.classList.remove('reading-active'));
  }

  // 4. Interactive Video / Simulation Players
  bindVideoPlayers() {
    const playButtons = document.querySelectorAll('.btn-play-pause');
    playButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video');
        this.toggleVideoPlay(videoId);
      });
    });

    const restartButtons = document.querySelectorAll('.btn-restart');
    restartButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video');
        this.restartVideo(videoId);
      });
    });
  }

  toggleVideoPlay(videoId) {
    const isPlaying = this.videoPlaying[videoId];
    const playBtn = document.querySelector(`.btn-play-pause[data-video="${videoId}"]`);

    if (isPlaying) {
      // Pause
      clearInterval(this.videoTimers[videoId]);
      this.videoPlaying[videoId] = false;
      if (playBtn) {
        playBtn.innerHTML = '<span class="ctrl-icon">▶️</span> <span class="ctrl-label">Play Demo</span>';
      }
    } else {
      // Play
      this.videoPlaying[videoId] = true;
      if (playBtn) {
        playBtn.innerHTML = '<span class="ctrl-icon">⏸️</span> <span class="ctrl-label">Pause</span>';
      }
      this.runVideoSimulation(videoId);
    }
  }

  restartVideo(videoId) {
    clearInterval(this.videoTimers[videoId]);
    this.videoPlaying[videoId] = false;
    const progressBar = document.getElementById(`progressBar${videoId}`);
    if (progressBar) progressBar.style.width = '0%';
    const playBtn = document.querySelector(`.btn-play-pause[data-video="${videoId}"]`);
    if (playBtn) {
      playBtn.innerHTML = '<span class="ctrl-icon">▶️</span> <span class="ctrl-label">Play Demo</span>';
    }
    // Automatically start after restart
    this.toggleVideoPlay(videoId);
  }

  runVideoSimulation(videoId) {
    let progress = 0;
    const progressBar = document.getElementById(`progressBar${videoId}`);
    const timeLabel = document.getElementById(`timeLabel${videoId}`);

    clearInterval(this.videoTimers[videoId]);
    this.videoTimers[videoId] = setInterval(() => {
      progress += 5;
      if (progress > 100) {
        clearInterval(this.videoTimers[videoId]);
        this.videoPlaying[videoId] = false;
        const playBtn = document.querySelector(`.btn-play-pause[data-video="${videoId}"]`);
        if (playBtn) {
          playBtn.innerHTML = '<span class="ctrl-icon">🔄</span> <span class="ctrl-label">Replay</span>';
        }
        if (progressBar) progressBar.style.width = '100%';
        return;
      }

      if (progressBar) progressBar.style.width = `${progress}%`;
      const currentSec = Math.floor((progress / 100) * 30);
      if (timeLabel) timeLabel.innerText = `0:${currentSec < 10 ? '0' : ''}${currentSec} / 0:30`;
    }, 400);
  }

  // 5. Senior Safety Knowledge Check Quiz
  initQuiz() {
    this.renderQuizQuestions();
    const btnSubmitQuiz = document.getElementById('btnSubmitQuiz');
    if (btnSubmitQuiz) {
      btnSubmitQuiz.addEventListener('click', () => this.handleQuizSubmit());
    }
  }

  renderQuizQuestions() {
    const quizContainer = document.getElementById('quizQuestionsContainer');
    if (!quizContainer) return;

    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = currentLang === 'kn';

    let html = "";
    QUIZ_QUESTIONS.forEach(q => {
      const qText = isKn ? q.question_kn : q.question_en;
      html += `
        <div class="scenario-card quiz-card" style="margin-bottom: 22px; padding: 24px;" id="quizCard_${q.id}">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 14px;">
            ${qText}
          </h3>
          <div class="scenario-options-group">
            ${q.options.map((opt, oIdx) => `
              <label class="option-button" style="cursor: pointer;">
                <input type="radio" name="quiz_q_${q.id}" value="${opt.is_correct ? '1' : '0'}" style="transform: scale(1.3); margin-top: 4px;">
                <span>${isKn ? opt.text_kn : opt.text_en}</span>
              </label>
            `).join('')}
          </div>
          <div class="feedback-banner" id="quizFeedback_${q.id}" style="display: none; margin-top: 14px; padding: 14px; border-radius: 8px;"></div>
        </div>
      `;
    });

    quizContainer.innerHTML = html;
  }

  handleQuizSubmit() {
    let score = 0;
    let answered = 0;
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = currentLang === 'kn';

    QUIZ_QUESTIONS.forEach(q => {
      const selected = document.querySelector(`input[name="quiz_q_${q.id}"]:checked`);
      const feedback = document.getElementById(`quizFeedback_${q.id}`);

      if (selected) {
        answered++;
        const isCorrect = selected.value === '1';
        if (isCorrect) score++;

        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = isCorrect ? 'var(--status-safe-bg, #DCFCE7)' : 'var(--status-danger-bg, #FEE2E2)';
          feedback.style.color = isCorrect ? 'var(--status-safe, #15803D)' : 'var(--status-danger, #B91C1C)';
          feedback.style.border = `2px solid ${isCorrect ? 'var(--status-safe-border, #86EFAC)' : 'var(--status-danger-border, #FCA5A5)'}`;
          feedback.innerHTML = `
            <strong>${isCorrect ? (isKn ? '✔ ಸರಿಯಾಗಿದೆ!' : '✔ Correct!') : (isKn ? '✖ ಗಮನಿಸಿ:' : '✖ Safety Note:')}</strong>
            <p style="margin: 6px 0 0 0;">${isKn ? q.explanation_kn : q.explanation_en}</p>
          `;
        }
      }
    });

    if (answered < QUIZ_QUESTIONS.length) {
      alert(isKn ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳಿಗೂ ಉತ್ತರಿಸಿ." : "Please answer all 6 questions before submitting!");
      return;
    }

    // Render Certificate
    const resultBox = document.getElementById('quizResultBox');
    if (resultBox) {
      resultBox.style.display = 'block';
      const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
      resultBox.innerHTML = `
        <div style="background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%); border: 3px solid var(--accent-teal); border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 10px 25px rgba(13, 148, 136, 0.15);">
          <span style="font-size: 3rem;">🏅</span>
          <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--primary-navy); margin: 12px 0;">
            ${isKn ? 'ಅಭಿನಂದನೆಗಳು! ನೀವು ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಪಾವತಿ ಕಲಿತಿದ್ದೀರಿ' : 'Congratulations! Senior Safety Certified'}
          </h3>
          <p style="font-size: 1.4rem; font-weight: 700; color: var(--accent-teal-dark);">
            ${isKn ? `ನಿಮ್ಮ ಅಂಕ: ${score} / ${QUIZ_QUESTIONS.length} (${pct}%)` : `Your Score: ${score} / ${QUIZ_QUESTIONS.length} (${pct}%)`}
          </p>
          <p style="font-size: 1.15rem; color: var(--text-main); max-width: 600px; margin: 12px auto;">
            ${score === QUIZ_QUESTIONS.length ?
              (isKn ? 'ಅದ್ಭುತ! ನೀವು ಎಲ್ಲಾ ಸುವರ್ಣ ನಿಯಮಗಳನ್ನು ಪರಿಪೂರ್ಣವಾಗಿ ಕಲಿತಿದ್ದೀರಿ. ನೀವು ಯಾವುದೇ ಭಯವಿಲ್ಲದೆ ಸುರಕ್ಷಿತವಾಗಿ ಯುಪಿಐ ಬಳಸಬಹುದು.' : 'Outstanding! You understand all the golden safety rules of UPI. You are ready to bank with confidence.') :
              (isKn ? 'ಉತ್ತಮ ಪ್ರಯತ್ನ! ಮೇಲಿನ ಸುವರ್ಣ ನಿಯಮಗಳನ್ನು ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ ನಿಮ್ಮ ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಿ.' : 'Great effort! Review the lessons above to keep your hard-earned savings protected.')
            }
          </p>
          <div style="margin-top: 20px;">
            <a href="/simulator" class="btn-large btn-teal" style="display: inline-block; text-decoration: none;">
              <span>📲 ${isKn ? 'ಸಿಮ್ಯುಲೇಟರ್‌ನಲ್ಲಿ ಅಭ್ಯಾಸ ಮಾಡಿ →' : 'Practice on UPI Simulator →'}</span>
            </a>
          </div>
        </div>
      `;
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.learnUpiSafely = new LearnUpiSafelyManager();
});
