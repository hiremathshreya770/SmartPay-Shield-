/**
 * EASY PAY — SAFE PAY
 * PERSONAL SCAM ASSISTANT
 *
 * Friendly, accessible chat-style interface for senior citizens to verify
 * suspicious messages, phone calls, links, and payment requests before they act.
 *
 * Features:
 * - Large readable typography and high-contrast color cards
 * - Real-time analysis via Flask backend using ML model and safety rules
 * - Identification of specific suspicious words/phrases extracted from user text
 * - Plain language explanations of warning signs and clear next actions
 * - Dedicated Phone Call Assistance guidance (refusing credentials, ending pressured calls)
 * - Immediate Emergency Guidance if money was already transferred (1930 & cybercrime.gov.in)
 * - Speech synthesis read aloud with Stop Speaking, keeping written text permanently visible
 * - Simple 1-click toggle between English and Kannada (ಕನ್ನಡ)
 */

class PersonalScamAssistant {
  constructor() {
    this.chatStream = document.getElementById('assistantChatStream');
    this.chatContainer = document.getElementById('assistantChatContainer');
    this.messageInput = document.getElementById('assistantMessageInput');
    this.btnAnalyze = document.getElementById('btnAnalyzeMessage');
    this.btnVoiceInput = document.getElementById('btnVoiceInput');
    this.btnReadLatest = document.getElementById('btnReadLatest');
    this.btnStopVoice = document.getElementById('btnStopVoice');
    this.btnClearChat = document.getElementById('btnClearChat');
    this.btnLangEn = document.getElementById('btnLangEn');
    this.btnLangKn = document.getElementById('btnLangKn');
    this.suggestedChips = document.querySelectorAll('.suggested-chip-btn');
    this.btnReadWelcome = document.getElementById('btnReadWelcome');
    this.btnStopWelcome = document.getElementById('btnStopWelcome');
    this.voiceStatus = document.getElementById('assistantVoiceStatus');
    this.voiceStatusText = document.getElementById('voiceStatusText');
    this.btnFloatingStop = document.getElementById('btnFloatingStop');

    this.latestResponseData = null;
    this.isAnalyzing = false;
    this.conversationHistory = [];

    this.init();
  }

  init() {
    // 1. Setup Language Button States
    this.updateLanguageButtonStates();

    // 2. Bind Event Listeners
    if (this.btnAnalyze) {
      this.btnAnalyze.addEventListener('click', () => this.handleAnalyzeClick());
    }

    if (this.messageInput) {
      this.messageInput.addEventListener('keydown', (e) => {
        // Submit on Ctrl+Enter or Cmd+Enter
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          this.handleAnalyzeClick();
        }
      });
    }

    // Suggested Question Chips Click
    this.suggestedChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const questionText = chip.getAttribute('data-question') || chip.innerText;
        if (this.messageInput) {
          this.messageInput.value = questionText;
        }
        this.analyzeMessage(questionText);
      });
    });

    // Voice Input via Microphone
    if (this.btnVoiceInput) {
      this.btnVoiceInput.addEventListener('click', () => this.handleVoiceInput());
    }

    // Audio Read Aloud & Stop Speaking Buttons
    if (this.btnReadLatest) {
      this.btnReadLatest.addEventListener('click', () => this.readLatestResponse());
    }

    if (this.btnStopVoice) {
      this.btnStopVoice.addEventListener('click', () => this.stopSpeaking());
    }

    if (this.btnFloatingStop) {
      this.btnFloatingStop.addEventListener('click', () => this.stopSpeaking());
    }

    if (this.btnReadWelcome) {
      this.btnReadWelcome.addEventListener('click', () => {
        const text = document.getElementById('welcomeMessageText');
        if (text) {
          this.speakText(text.innerText || text.textContent);
        }
      });
    }

    if (this.btnStopWelcome) {
      this.btnStopWelcome.addEventListener('click', () => this.stopSpeaking());
    }

    // Clear Chat Button
    if (this.btnClearChat) {
      this.btnClearChat.addEventListener('click', () => this.clearChat());
    }

    // Quick Language Toggle Buttons on Assistant Page
    if (this.btnLangEn) {
      this.btnLangEn.addEventListener('click', () => {
        if (typeof setLanguage === 'function') {
          setLanguage('en');
        }
      });
    }

    if (this.btnLangKn) {
      this.btnLangKn.addEventListener('click', () => {
        if (typeof setLanguage === 'function') {
          setLanguage('kn');
        }
      });
    }

    // Listen for global language changes
    window.addEventListener('safepayLanguageChanged', (e) => {
      this.updateLanguageButtonStates();
      this.updateExistingMessagesLanguage(e.detail ? e.detail.lang : 'en');
    });
  }

  updateLanguageButtonStates() {
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    if (this.btnLangEn) {
      const isEn = currentLang === 'en';
      this.btnLangEn.classList.toggle('active', isEn);
      this.btnLangEn.setAttribute('aria-pressed', isEn ? 'true' : 'false');
    }
    if (this.btnLangKn) {
      const isKn = currentLang === 'kn';
      this.btnLangKn.classList.toggle('active', isKn);
      this.btnLangKn.setAttribute('aria-pressed', isKn ? 'true' : 'false');
    }
  }

  handleAnalyzeClick() {
    if (this.isAnalyzing) return;
    const text = (this.messageInput ? this.messageInput.value : "").trim();
    if (!text) {
      const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
      const alertMsg = lang === 'kn' ?
        "ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಲು ಸಂದೇಶ ಅಥವಾ ಕರೆಯ ವಿವರವನ್ನು ನಮೂದಿಸಿ." :
        "Please paste a message or describe a situation in the box first.";
      alert(alertMsg);
      if (this.messageInput) this.messageInput.focus();
      return;
    }
    this.analyzeMessage(text);
  }

  handleVoiceInput() {
    if (!window.voiceAssistant || !this.messageInput) return;
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';

    window.voiceAssistant.startListening(this.messageInput, (isListening) => {
      if (this.btnVoiceInput) {
        this.btnVoiceInput.classList.toggle('listening', isListening);
        this.btnVoiceInput.innerHTML = isListening ?
          (lang === 'kn' ? "🛑 ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ" : "🛑 Listening... Speak now") :
          (lang === 'kn' ? "🎙️ ಧ್ವನಿ ಮೂಲಕ ಹೇಳಿ" : "🎙️ Speak Question");
      }
    });
  }

  async analyzeMessage(text) {
    if (!text || this.isAnalyzing) return;
    this.isAnalyzing = true;

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = lang === 'kn';

    // 1. Append User Message Bubble
    this.appendUserMessage(text);

    // 2. Clear input box
    if (this.messageInput) {
      this.messageInput.value = "";
    }

    // 3. Show Senior-Friendly Typing / Loading Indicator Bubble
    const typingId = this.showTypingIndicator(isKn);

    // 4. Update Analyze Button UI
    if (this.btnAnalyze) {
      this.btnAnalyze.disabled = true;
      this.btnAnalyze.innerHTML = isKn ? "⏳ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "⏳ Analyzing Message...";
    }

    try {
      // Call Flask Personal Scam Assistant API endpoint
      const response = await fetch('/api/assistant/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, language: lang })
      });

      const resJson = await response.json();
      this.removeTypingIndicator(typingId);

      if (resJson.status === 'success' && resJson.data) {
        this.latestResponseData = resJson.data;
        this.conversationHistory.push({
          userText: text,
          assistantData: resJson.data
        });

        // 5. Render Structured Warning Card Assistant Bubble
        this.appendAssistantResponse(resJson.data);

        // 6. Play appropriate audio chime feedback
        if (resJson.data.risk_level === 'HIGH RISK' || resJson.data.risk_level === 'SUSPICIOUS') {
          if (window.SoundEffects && SoundEffects.playCaution) SoundEffects.playCaution();
        } else {
          if (window.SoundEffects && SoundEffects.playSuccess) SoundEffects.playSuccess();
        }

      } else {
        this.appendErrorMessage(resJson.message || "Unable to analyze the message at this time.");
      }
    } catch (err) {
      console.error("Assistant API Error:", err);
      this.removeTypingIndicator(typingId);
      this.appendErrorMessage(isKn ?
        "ಸರ್ವರ್ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಸರ್ವರ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಪರಿಶೀಲಿಸಿ." :
        "Unable to reach the assistant server. Please ensure the Flask application is running."
      );
    } finally {
      this.isAnalyzing = false;
      if (this.btnAnalyze) {
        this.btnAnalyze.disabled = false;
        this.btnAnalyze.innerHTML = isKn ? "🔍 ಸಂದೇಶ ವಿಶ್ಲೇಷಿಸಿ" : "🔍 Analyze Message";
      }
      this.scrollToBottom();
    }
  }

  appendUserMessage(text) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('div');
    row.className = 'chat-bubble-row user-row';
    row.innerHTML = `
      <div class="chat-bubble user-bubble">
        <div class="bubble-speaker-tag">👤 You (Senior Member) • ${timeStr}</div>
        <div class="bubble-text">${this.escapeHtml(text)}</div>
      </div>
      <div class="chat-avatar user-avatar" aria-hidden="true">👤</div>
    `;
    this.chatStream.appendChild(row);
    this.scrollToBottom();
  }

  showTypingIndicator(isKn) {
    const id = 'typing_' + Date.now();
    const row = document.createElement('div');
    row.className = 'chat-bubble-row assistant-row typing-row';
    row.id = id;
    row.innerHTML = `
      <div class="chat-avatar" aria-hidden="true">🛡️</div>
      <div class="chat-bubble assistant-bubble typing-bubble">
        <div class="typing-indicator-dots">
          <span></span><span></span><span></span>
        </div>
        <span style="font-weight: 600; color: var(--text-muted);">
          ${isKn ? "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ... ಸುರಕ್ಷತಾ ನಿಯಮಗಳು ಮತ್ತು ಮಾದರಿಯನ್ನು ತಪಾಸಣೆ ಮಾಡಲಾಗುತ್ತಿದೆ." : "Personal Scam Assistant is evaluating your message..."}
        </span>
      </div>
    `;
    this.chatStream.appendChild(row);
    this.scrollToBottom();
    return id;
  }

  removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  appendAssistantResponse(data) {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = lang === 'kn';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Determine Risk Card Class & Colors
    let riskBadgeClass = 'badge-clean';
    let cardClass = 'card-clean-status';
    let riskIcon = '🛡️';
    let riskLabel = isKn ? "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯವಿಲ್ಲ" : "NO OBVIOUS WARNING SIGNS";

    if (data.risk_level === 'HIGH RISK') {
      riskBadgeClass = 'badge-high-risk';
      cardClass = 'card-high-risk';
      riskIcon = '🚨';
      riskLabel = isKn ? "ಹೆಚ್ಚಿನ ಅಪಾಯ (HIGH RISK)" : "HIGH RISK — STRONG SIGNS OF A SCAM";
    } else if (data.risk_level === 'SUSPICIOUS' || data.risk_level === 'CAUTION') {
      riskBadgeClass = 'badge-suspicious';
      cardClass = 'card-suspicious';
      riskIcon = '⚠️';
      riskLabel = isKn ? "ಅನುಮಾನಾಸ್ಪದ (SUSPICIOUS)" : "SUSPICIOUS — EXERCISE CAUTION";
    }

    const headline = isKn ? (data.headline_kn || data.headline_en) : (data.headline_en || data.headline_kn);
    const whyFlagged = isKn ? (data.why_flagged_kn || data.why_flagged_en) : (data.why_flagged_en || data.why_flagged_kn);
    const whatToDo = isKn ? (data.what_to_do_kn || data.what_to_do_en) : (data.what_to_do_en || data.what_to_do_kn);
    const speechSummary = isKn ? (data.speech_summary_kn || data.speech_summary_en) : (data.speech_summary_en || data.speech_summary_kn);

    // 1. Specific Suspicious Words & Phrases Card
    let phrasesHtml = "";
    if (data.identified_phrases && data.identified_phrases.length > 0) {
      phrasesHtml = `
        <div class="assistant-card-subblock">
          <div class="subblock-title">
            <span>🔍</span>
            <span>${isKn ? "ಪಠ್ಯದಲ್ಲಿ ಗುರುತಿಸಲಾದ ನಿರ್ದಿಷ್ಟ ಅನುಮಾನಾಸ್ಪದ ಪದಗಳು:" : "Suspicious Words & Phrases Identified in Submitted Text:"}</span>
          </div>
          <div class="identified-phrases-pills">
            ${data.identified_phrases.map(p => `
              <span class="phrase-tag">"${this.escapeHtml(p)}"</span>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 2. Why We Flagged It Section
    let whyHtml = "";
    if (whyFlagged && whyFlagged.length > 0) {
      whyHtml = `
        <div class="assistant-card-subblock">
          <div class="subblock-title">
            <span>⚠️</span>
            <span>${isKn ? "ನಾವು ಇದನ್ನು ಏಕೆ ಗುರುತಿಸಿದ್ದೇವೆ (ಪ್ರಮುಖ ಕಾರಣಗಳು):" : "Why we flagged it:"}</span>
          </div>
          <ul class="assistant-bullet-list">
            ${whyFlagged.map(reason => `
              <li>${this.escapeHtml(reason)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 3. What You Should Do Section
    let whatHtml = "";
    if (whatToDo && whatToDo.length > 0) {
      whatHtml = `
        <div class="assistant-card-subblock">
          <div class="subblock-title">
            <span>🛡️</span>
            <span>${isKn ? "ನೀವು ಮಾಡಬೇಕಾದ ಸ್ಪಷ್ಟ ಕ್ರಮಗಳು:" : "What you should do:"}</span>
          </div>
          <ul class="assistant-bullet-list action-bullets">
            ${whatToDo.map(act => `
              <li>${this.escapeHtml(act)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 4. Phone Call Safety Assistance Card (if caller asks for credentials/pressuring)
    let phoneCallHtml = "";
    if (data.phone_call_assistance && data.phone_call_assistance.detected) {
      const pc = data.phone_call_assistance;
      const pcTitle = isKn ? pc.title_kn : pc.title_en;
      const pcSteps = isKn ? pc.steps_kn : pc.steps_en;

      phoneCallHtml = `
        <div class="phone-call-assistance-card">
          <div class="call-guidance-header">
            <span style="font-size: 1.5rem;">📞</span>
            <strong>${pcTitle}</strong>
          </div>
          <ul class="assistant-bullet-list phone-call-bullets">
            ${pcSteps.map(step => `
              <li>${this.escapeHtml(step)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 5. Emergency Sent Money Guidance Card (if user sent money)
    let sentMoneyHtml = "";
    if (data.already_sent_money && data.already_sent_money.detected) {
      const sm = data.already_sent_money;
      const smTitle = isKn ? sm.title_kn : sm.title_en;
      const smSteps = isKn ? sm.steps_kn : sm.steps_en;

      sentMoneyHtml = `
        <div class="sent-money-emergency-card">
          <div class="emergency-banner-top">
            <span style="font-size: 1.6rem;">🚨</span>
            <div>
              <strong>${smTitle}</strong>
              <div style="font-size: 0.95rem; font-weight: normal; margin-top: 2px;">
                ${isKn ? "ಗಾಬರಿಯಾಗಬೇಡಿ, ತಕ್ಷಣ ಈ ತುರ್ತು ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳಿ:" : "Remain calm and take these immediate protective actions:"}
              </div>
            </div>
          </div>
          <ul class="assistant-bullet-list emergency-steps-list">
            ${smSteps.map(step => `
              <li>${this.escapeHtml(step)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 6. ML Model Scope & Transparency Card
    const ml = data.ml_model_result || {};
    let mlHtml = "";
    if (ml.model_available && ml.is_english) {
      const conf = ml.confidence_pct ? `${ml.confidence_pct}%` : "Moderate";
      mlHtml = `
        <div class="model-scope-notice-card">
          <div class="scope-header">
            <span>🤖</span>
            <span><strong>${isKn ? "ಯಂತ್ರ ಕಲಿಕೆ (ML) ಮಾದರಿ ಮೌಲ್ಯಮಾಪನ:" : "Machine-Learning Model Evaluation:"}</strong></span>
          </div>
          <div class="scope-body">
            <div>
              <span>${isKn ? "ಮಾದರಿ ಅಂದಾಜು:" : "Model Prediction:"} <strong>${ml.prediction}</strong></span> •
              <span>${isKn ? "ಕ್ಯಾಲಿಬ್ರೇಟೆಡ್ ವಿಶ್ವಾಸಾರ್ಹತೆ:" : "Calibrated Confidence:"} <strong>${conf}</strong></span>
            </div>
            <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: var(--text-muted);">
              ${isKn ? ml.note_kn : ml.note_en}
            </p>
          </div>
        </div>
      `;
    } else {
      mlHtml = `
        <div class="model-scope-notice-card">
          <div class="scope-header">
            <span>ℹ️</span>
            <span><strong>${isKn ? "ಮಾದರಿ ವ್ಯಾಪ್ತಿ & ಸುರಕ್ಷತಾ ನಿಯಮಗಳು:" : "Evaluation Scope & Safety Rules:"}</strong></span>
          </div>
          <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: var(--text-muted);">
            ${isKn ? (data.language_scope_note_kn || ml.note_kn) : (data.language_scope_note_en || ml.note_en)}
          </p>
        </div>
      `;
    }

    // 7. Disagreement Callout Banner (if model & safety rules disagreed)
    let disagreementHtml = "";
    if (data.disagreement_detected && (data.disagreement_explanation_en || data.disagreement_explanation_kn)) {
      disagreementHtml = `
        <div class="assistant-disagreement-callout">
          <span style="font-size: 1.3rem;">⚖️</span>
          <div>
            <strong>${isKn ? "ಮಾದರಿ ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ವ್ಯತ್ಯಾಸ ನಿರ್ವಹಣೆ:" : "Model vs Safety Rule Disagreement Resolution:"}</strong>
            <p style="margin: 4px 0 0 0; font-size: 0.95rem;">
              ${isKn ? data.disagreement_explanation_kn : data.disagreement_explanation_en}
            </p>
          </div>
        </div>
      `;
    }

    // 8. Contextual Lesson Link to UPI Learning Centre
    let targetLesson = 1;
    let lessonTitleEn = "Understanding UPI & Safe Payments";
    let lessonTitleKn = "ಯುಪಿಐ ಎಂದರೇನು ಮತ್ತು ಸುರಕ್ಷಿತ ಪಾವತಿ";

    const allIdentified = (data.identified_phrases || []).join(' ').toLowerCase();
    const flagsJoined = (data.detected_flags || []).map(f => (f.category || '') + ' ' + (f.label || '')).join(' ').toLowerCase();
    const signals = allIdentified + ' ' + flagsJoined;

    if (signals.includes('otp') || signals.includes('ಒಟಿಪಿ')) {
      targetLesson = 4;
      lessonTitleEn = "Lesson 4: OTP Safety Rules";
      lessonTitleKn = "ಪಾಠ ೪: ಒಟಿಪಿ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು";
    } else if (signals.includes('pin') || signals.includes('ಪಿನ್')) {
      targetLesson = 3;
      lessonTitleEn = "Lesson 3: Understanding a UPI PIN";
      lessonTitleKn = "ಪಾಠ ೩: ಯುಪಿಐ ಪಿನ್ ರಹಸ್ಯ";
    } else if (signals.includes('qr') || signals.includes('ಕ್ಯೂಆರ್')) {
      targetLesson = 5;
      lessonTitleEn = "Lesson 5: QR-Code Payment Scams";
      lessonTitleKn = "ಪಾಠ ೫: ಕ್ಯೂಆರ್ ಕೋಡ್ ಬಲೆ";
    } else if (signals.includes('collect') || signals.includes('ಕಲೆಕ್ಟ್') || signals.includes('request')) {
      targetLesson = 6;
      lessonTitleEn = "Lesson 6: Fraudulent Collect Requests";
      lessonTitleKn = "ಪಾಠ ೬: ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಬಲೆ";
    } else if (signals.includes('screenshot') || signals.includes('ಸ್ಕ್ರೀನ್‌ಶಾಟ್')) {
      targetLesson = 7;
      lessonTitleEn = "Lesson 7: Fake Payment Screenshots";
      lessonTitleKn = "ಪಾಠ ೭: ನಕಲಿ ಪಾವತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್";
    } else if (signals.includes('call') || signals.includes('police') || signals.includes('bank') || signals.includes('ಕರೆ') || signals.includes('ಪೊಲೀಸ್')) {
      targetLesson = 8;
      lessonTitleEn = "Lesson 8: Fake Bank and Customer-Care Calls";
      lessonTitleKn = "ಪಾಠ ೮: ನಕಲಿ ಬ್ಯಾಂಕ್ ಕರೆಗಳು";
    } else if (signals.includes('anydesk') || signals.includes('teamviewer') || signals.includes('quicksupport') || signals.includes('screen')) {
      targetLesson = 9;
      lessonTitleEn = "Lesson 9: Screen-Sharing Scams";
      lessonTitleKn = "ಪಾಠ ೯: ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಬಲೆ";
    } else if (signals.includes('link') || signals.includes('url') || signals.includes('bit.ly') || signals.includes('ಲಿಂಕ್')) {
      targetLesson = 10;
      lessonTitleEn = "Lesson 10: Suspicious Links & Phishing Messages";
      lessonTitleKn = "ಪಾಠ ೧೦: ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳು";
    } else if (signals.includes('urgent') || signals.includes('block') || signals.includes('threat') || signals.includes('ತಕ್ಷಣ') || signals.includes('ಬೆದರಿಕೆ')) {
      targetLesson = 11;
      lessonTitleEn = "Lesson 11: Recognizing Urgent or Threatening Requests";
      lessonTitleKn = "ಪಾಠ ೧೧: ತುರ್ತು ಬೆದರಿಕೆಗಳನ್ನು ಗುರುತಿಸುವುದು";
    } else if (data.already_sent_money) {
      targetLesson = 12;
      lessonTitleEn = "Lesson 12: What to Do After Suspected Financial Fraud";
      lessonTitleKn = "ಪಾಠ ೧೨: ವಂಚನೆ ನಡೆದ ನಂತರ ಏನು ಮಾಡಬೇಕು";
    }

    const contextualLessonHtml = `
      <div class="assistant-lesson-link-card" style="background: #F0FDFA; border: 1.5px solid var(--accent-teal); border-radius: 12px; padding: 14px 18px; margin: 18px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.4rem;">📖</span>
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-teal-dark, #0F766E); text-transform: uppercase; letter-spacing: 0.5px;">
              ${isKn ? "ಸಂಬಂಧಿತ ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ" : "Recommended UPI Learning Lesson"}
            </div>
            <div style="font-size: 1.05rem; font-weight: 800; color: var(--primary-navy);">
              ${isKn ? lessonTitleKn : lessonTitleEn}
            </div>
          </div>
        </div>
        <a href="/learn#lesson-${targetLesson}" class="btn-control-chip" style="background: var(--accent-teal); color: #FFFFFF; font-weight: 800; text-decoration: none; padding: 8px 16px; border-radius: 8px;">
          ${isKn ? "ಪಾಠ ಕಲಿಯಿರಿ →" : "Learn How to Avoid This Scam →"}
        </a>
      </div>
    `;

    // Unique ID for this message bubble
    const bubbleId = 'bubble_' + Date.now();

    const row = document.createElement('div');
    row.className = 'chat-bubble-row assistant-row';
    row.id = bubbleId;

    row.innerHTML = `
      <div class="chat-avatar" aria-hidden="true">${riskIcon}</div>
      <div class="chat-bubble assistant-bubble full-width-card">
        <div class="bubble-speaker-tag">
          <span>Personal Scam Assistant • ${timeStr}</span>
        </div>

        <!-- Main Warning Card -->
        <div class="assistant-warning-card ${cardClass}">
          
          <!-- Card Header & Headline -->
          <div class="warning-card-header">
            <div class="warning-badge-pill ${riskBadgeClass}">
              <span>${riskIcon}</span>
              <span>${riskLabel}</span>
            </div>
            
            <h2 class="warning-headline-text voice-readable">
              ${this.escapeHtml(headline)}
            </h2>

            <!-- Voice Controls for this specific card -->
            <div class="card-audio-controls">
              <button type="button" class="btn-card-audio btn-read-card" title="Read this response aloud">
                <span>🔊</span> <span data-i18n="btn_read_aloud">${isKn ? "ಓದಿ ಕೇಳಿಸಿ" : "Read Aloud"}</span>
              </button>
              <button type="button" class="btn-card-audio btn-stop btn-stop-card" title="Stop speaking">
                <span>⏹️</span> <span data-i18n="btn_stop_speaking">${isKn ? "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ" : "Stop Speaking"}</span>
              </button>
            </div>
          </div>

          <!-- Identified Phrases Subblock -->
          ${phrasesHtml}

          <!-- Why We Flagged It Subblock -->
          ${whyHtml}

          <!-- What You Should Do Subblock -->
          ${whatHtml}

          <!-- Phone Call Assistance (if applicable) -->
          ${phoneCallHtml}

          <!-- Emergency Sent Money Guidance (if applicable) -->
          ${sentMoneyHtml}

          <!-- Disagreement Explanation (if applicable) -->
          ${disagreementHtml}

          <!-- Contextual Lesson Link -->
          ${contextualLessonHtml}

          <!-- ML Model Scope Notice -->
          ${mlHtml}

          <!-- Non-Guarantee Educational Notice -->
          <div class="card-footer-caution">
            <span>🛡️</span>
            <span>${isKn ? data.educational_disclaimer_kn : data.educational_disclaimer}</span>
          </div>

        </div>
      </div>
    `;

    this.chatStream.appendChild(row);

    // Bind this card's audio buttons
    const btnRead = row.querySelector('.btn-read-card');
    const btnStop = row.querySelector('.btn-stop-card');

    if (btnRead) {
      btnRead.addEventListener('click', () => {
        this.speakText(speechSummary || headline);
      });
    }

    if (btnStop) {
      btnStop.addEventListener('click', () => {
        this.stopSpeaking();
      });
    }

    this.scrollToBottom();
  }

  appendErrorMessage(msg) {
    const row = document.createElement('div');
    row.className = 'chat-bubble-row assistant-row';
    row.innerHTML = `
      <div class="chat-avatar" aria-hidden="true">⚠️</div>
      <div class="chat-bubble assistant-bubble" style="border-left: 6px solid var(--status-danger);">
        <div class="bubble-speaker-tag">Personal Scam Assistant</div>
        <div class="bubble-text" style="color: var(--status-danger); font-weight: 700;">
          ${this.escapeHtml(msg)}
        </div>
      </div>
    `;
    this.chatStream.appendChild(row);
    this.scrollToBottom();
  }

  readLatestResponse() {
    if (!this.latestResponseData) {
      const text = document.getElementById('welcomeMessageText');
      if (text) {
        this.speakText(text.innerText || text.textContent);
      }
      return;
    }

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = lang === 'kn';
    const speech = isKn ?
      (this.latestResponseData.speech_summary_kn || this.latestResponseData.headline_kn) :
      (this.latestResponseData.speech_summary_en || this.latestResponseData.headline_en);

    this.speakText(speech);
  }

  speakText(text) {
    if (!text) return;

    if (window.voiceAssistant && typeof window.voiceAssistant.speak === 'function') {
      this.showVoiceStatus(true);
      window.voiceAssistant.speak(text, () => {
        this.showVoiceStatus(false);
      });
    } else {
      console.warn("Voice assistant engine not initialized.");
    }
  }

  stopSpeaking() {
    if (window.voiceAssistant && typeof window.voiceAssistant.stop === 'function') {
      window.voiceAssistant.stop();
    }
    this.showVoiceStatus(false);
  }

  showVoiceStatus(isActive) {
    if (this.voiceStatus) {
      this.voiceStatus.style.display = isActive ? 'flex' : 'none';
    }
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    if (this.voiceStatusText) {
      this.voiceStatusText.textContent = lang === 'kn' ?
        "ಧ್ವನಿ ಮೂಲಕ ವಿವರಿಸಲಾಗುತ್ತಿದೆ..." :
        "Reading explanation aloud...";
    }
  }

  clearChat() {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const confirmMsg = lang === 'kn' ?
      "ಚಾಟ್ ಇತಿಹಾಸವನ್ನು ತೆರವುಗೊಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?" :
      "Are you sure you want to clear the conversation history?";

    if (confirm(confirmMsg)) {
      this.stopSpeaking();
      this.latestResponseData = null;
      this.conversationHistory = [];

      // Retain only welcome message
      const welcomeRow = document.getElementById('welcomeMessageRow');
      this.chatStream.innerHTML = "";
      if (welcomeRow) {
        this.chatStream.appendChild(welcomeRow);
      }
      if (this.messageInput) {
        this.messageInput.value = "";
        this.messageInput.focus();
      }
    }
  }

  updateExistingMessagesLanguage(newLang) {
    // If conversation history exists and latest message is present, we re-render with new language
    if (this.conversationHistory.length > 0) {
      // Clear dynamically appended messages and re-analyze or re-render
      const last = this.conversationHistory[this.conversationHistory.length - 1];
      if (last && last.userText) {
        // Re-analyze silently with the newly selected language to get proper Kannada/English objects
        fetch('/api/assistant/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: last.userText, language: newLang })
        })
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status === 'success' && resJson.data) {
            this.latestResponseData = resJson.data;
          }
        })
        .catch(() => {});
      }
    }
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.scrollTo({
        top: this.chatContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.personalScamAssistant = new PersonalScamAssistant();
});
