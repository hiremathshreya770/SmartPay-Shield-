/**
 * EASY PAY — SAFE PAY: Voice Assistant Engine
 * Leverages Browser Web Speech API (SpeechSynthesis & SpeechRecognition)
 * Tailored for senior citizens: calm rate, respectful tone, clear repetition
 */

class VoiceAssistantEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.isSpeaking = false;
    this.isListening = false;
    this.lastSpokenText = "";
    this.availableVoices = [];

    this.initVoices();
    this.initRecognition();
    this.bindUI();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.availableVoices = this.synth.getVoices();
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  getBestVoice(lang) {
    if (!this.availableVoices.length && this.synth) {
      this.availableVoices = this.synth.getVoices();
    }

    const langPrefixMap = {
      'kn': 'kn',
      'hi': 'hi',
      'ta': 'ta',
      'te': 'te',
      'ml': 'ml',
      'mr': 'mr',
      'en': 'en'
    };
    const prefix = langPrefixMap[lang] || 'en';

    // 1. Try to find a native voice matching the language prefix (e.g. hi-IN, ta-IN, kn-IN)
    const nativeVoice = this.availableVoices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (nativeVoice) return nativeVoice;

    // 2. Fallback to Indian English or any English voice
    const inEnVoice = this.availableVoices.find(v => v.lang && v.lang.toLowerCase() === 'en-in');
    if (inEnVoice) return inEnVoice;

    const enVoice = this.availableVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    return enVoice || this.availableVoices[0] || null;
  }

  speak(text, onEndCallback = null) {
    if (!this.synth) {
      console.warn("Speech synthesis is not supported on this device.");
      return;
    }

    const cleanText = (text || "").trim();
    if (!cleanText) return;

    this.stop();
    this.lastSpokenText = cleanText;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';

    const langTagMap = {
      'kn': 'kn-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'ml': 'ml-IN',
      'mr': 'mr-IN',
      'en': 'en-IN'
    };
    utterance.lang = langTagMap[currentLang] || 'en-IN';
    const voice = this.getBestVoice(currentLang);
    if (voice) {
      utterance.voice = voice;
    }

    // Calm, unhurried rate (0.92) for senior citizens
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateVisualIndicator(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateVisualIndicator(false);
      if (typeof onEndCallback === 'function') onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      this.isSpeaking = false;
      this.updateVisualIndicator(false);
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.updateVisualIndicator(false);
    }
  }

  repeat() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  updateVisualIndicator(isActive) {
    const indicator = document.querySelector('.speaking-indicator');
    if (indicator) {
      indicator.classList.toggle('active', isActive);
    }
  }

  readCurrentPageInstructions() {
    // Looks for elements with class .voice-readable or main hero/instructions
    const target = document.querySelector('.voice-readable') ||
                   document.querySelector('.scenario-story-box') ||
                   document.querySelector('.result-card') ||
                   document.querySelector('.hero-description') ||
                   document.querySelector('main h1');

    if (target) {
      const textToRead = target.innerText || target.textContent;
      this.speak(textToRead);
    } else {
      const defaultText = typeof t === 'function' ? t('brand_tagline') : "Pause. Check. Stay Safe.";
      this.speak(defaultText);
    }
  }

  startListening(targetInput, onStatusCallback) {
    if (!this.recognition) {
      alert("Microphone voice input is not supported in this browser. Please type or paste your message.");
      return;
    }

    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const langTagMap = {
      'kn': 'kn-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'ml': 'ml-IN',
      'mr': 'mr-IN',
      'en': 'en-IN'
    };
    this.recognition.lang = langTagMap[currentLang] || 'en-IN';

    this.recognition.onstart = () => {
      this.isListening = true;
      if (typeof onStatusCallback === 'function') onStatusCallback(true);
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (targetInput) {
        targetInput.value = (targetInput.value ? targetInput.value + " " : "") + transcript;
        targetInput.dispatchEvent(new Event('input'));
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (typeof onStatusCallback === 'function') onStatusCallback(false);
    };

    this.recognition.onerror = (err) => {
      console.warn("Recognition error:", err);
      this.isListening = false;
      if (typeof onStatusCallback === 'function') onStatusCallback(false);
    };

    this.recognition.start();
  }

  bindUI() {
    document.addEventListener('DOMContentLoaded', () => {
      const btnRead = document.getElementById('btnVoiceRead');
      const btnRepeat = document.getElementById('btnVoiceRepeat');
      const btnStop = document.getElementById('btnVoiceStop');

      if (btnRead) {
        btnRead.addEventListener('click', () => this.readCurrentPageInstructions());
      }
      if (btnRepeat) {
        btnRepeat.addEventListener('click', () => this.repeat());
      }
      if (btnStop) {
        btnStop.addEventListener('click', () => this.stop());
      }
    });
  }
}

// Global Voice Assistant singleton
window.voiceAssistant = new VoiceAssistantEngine();
