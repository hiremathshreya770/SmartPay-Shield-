/**
 * EASY PAY — SAFE PAY: Scam Message Checker
 * Interacts with Python Flask backend /api/check-message
 * Incorporates:
 * 1. Machine Learning Text-Classification Model (TF-IDF + Logistic Regression)
 * 2. 6-Category Comprehensive Safety Rules
 * 3. Exact Identified Phrase Extraction
 * 4. Transparent Model Prediction & Calibrated Confidence Display
 * 5. Cautious Disagreement Explanations
 * 6. Senior-friendly bilingual (EN/KN) Audio Readout & High Contrast support
 */

const SAMPLE_MESSAGES = {
  power: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM by BESCOM officer because previous month bill was not updated. Immediately call 9845012345 or pay at http://bescom-bill.xyz",
  otp: "Dear State Bank Customer, your ATM Debit Card has been blocked due to KYC expiry. Share 6-digit OTP received on mobile with branch manager immediately to unblock.",
  lottery: "CONGRATULATIONS! Your mobile number has won Rs 25,00,000 in KBC Lucky Draw. Claim your prize money by sending Rs 2,500 registration charge to UPI: kbc-dept@upi",
  remote: "Airtel Customer Service: To upgrade your SIM card to high-speed 5G network, please download AnyDesk or QuickSupport app and read the 9-digit code.",
  collect: "OLX Buyer sent you a UPI collect request for Rs 5,000. Accept the request and enter your 4-digit UPI PIN to receive money in your account.",
  unlock: "Dear Customer, your bank account is frozen due to irregular activity. Pay Rs 2,500 security deposit to unlock account immediately and avoid police FIR.",
  safe: "Hi Grandpa, reached Bangalore safely. I bought the medicines you asked for. See you tomorrow evening!"
};

document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('scamMessageInput');
  const btnAnalyze = document.getElementById('btnAnalyzeMessage');
  const btnClear = document.getElementById('btnClearMessage');
  const btnMic = document.getElementById('btnMicInput');
  const resultArea = document.getElementById('checkerResultArea');
  const sampleChips = document.querySelectorAll('.sample-chip');

  if (!messageInput || !btnAnalyze) return;

  // Sample Chips Click Handlers
  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-sample');
      if (SAMPLE_MESSAGES[type]) {
        messageInput.value = SAMPLE_MESSAGES[type];
        messageInput.focus();
        resultArea.innerHTML = "";
      }
    });
  });

  // Clear button
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      messageInput.value = "";
      resultArea.innerHTML = "";
      messageInput.focus();
    });
  }

  // Voice Speech-to-Text Microphone
  if (btnMic) {
    btnMic.addEventListener('click', () => {
      if (window.voiceAssistant) {
        window.voiceAssistant.startListening(messageInput, (isListening) => {
          btnMic.classList.toggle('listening', isListening);
          const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
          btnMic.innerHTML = isListening ?
            (lang === 'kn' ? "🛑 ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ" : "🛑 Listening... Speak now") :
            (lang === 'kn' ? "🎙️ ಧ್ವನಿ ಮೂಲಕ ಸಂದೇಶ ಹೇಳಿ" : "🎙️ Speak Message");
        });
      }
    });
  }

  // Analyze Button Click
  btnAnalyze.addEventListener('click', () => {
    const text = (messageInput.value || "").trim();
    if (!text) {
      alert(typeof t === 'function' ? t('checker_placeholder') : "Please enter or paste a message first.");
      messageInput.focus();
      return;
    }

    analyzeMessage(text);
  });

  async function analyzeMessage(text) {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';

    // Show loading state
    btnAnalyze.disabled = true;
    btnAnalyze.innerHTML = lang === 'kn' ? "⏳ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "⏳ Analyzing message...";

    try {
      const response = await fetch('/api/check-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, language: lang })
      });

      const resJson = await response.json();
      if (resJson.status === 'success') {
        renderResult(resJson.data);
      } else {
        alert("Error analyzing message: " + (resJson.message || "Unknown error"));
      }
    } catch (err) {
      console.error("API error:", err);
      alert("Unable to reach server. Please ensure the Flask app is running.");
    } finally {
      btnAnalyze.disabled = false;
      btnAnalyze.innerHTML = lang === 'kn' ? "🔍 ಈ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ" : "🔍 Check This Message";
    }
  }

  function renderResult(data) {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const isKn = lang === 'kn';

    // 1. Risk Category Badge & Styling
    let riskClass = 'risk-safe';
    let riskIcon = 'ℹ️';
    let riskBadgeTitle = isKn ? "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯವಿಲ್ಲ" : "NO OBVIOUS WARNING SIGNS";

    if (data.risk_level === 'HIGH RISK') {
      riskClass = 'risk-high';
      riskIcon = '🚨';
      riskBadgeTitle = isKn ? "ಹೆಚ್ಚಿನ ಅಪಾಯ (HIGH RISK)" : "HIGH RISK — POTENTIALLY FRAUDULENT";
      if (window.SoundEffects && SoundEffects.playCaution) SoundEffects.playCaution();
    } else if (data.risk_level === 'SUSPICIOUS' || data.risk_level === 'CAUTION') {
      riskClass = 'risk-caution';
      riskIcon = '⚠️';
      riskBadgeTitle = isKn ? "ಅನುಮಾನಾಸ್ಪದ (SUSPICIOUS)" : "SUSPICIOUS — EXERCISE CAUTION";
      if (window.SoundEffects && SoundEffects.playCaution) SoundEffects.playCaution();
    } else {
      if (window.SoundEffects && SoundEffects.playSuccess) SoundEffects.playSuccess();
    }

    const headline = isKn ? data.headline_kn : data.headline_en;
    const whyFlagged = isKn ? data.why_flagged_kn : data.why_flagged_en;
    const whatToDo = isKn ? data.what_to_do_kn : data.what_to_do_en;
    const disclaimer = isKn ? data.educational_disclaimer_kn : data.educational_disclaimer;

    // 2. Machine Learning Model Section (Calibrated vs Uncalibrated / Missing)
    const ml = data.ml_model_result || {};
    let mlHtml = "";

    if (ml.model_available) {
      const predClass = ml.prediction === "Potentially Fraudulent" ? "pred-fraud" : "pred-legit";
      const predLabel = ml.prediction;
      const probPct = ml.scam_likelihood_pct !== null && ml.scam_likelihood_pct !== undefined ? ml.scam_likelihood_pct : 0;
      const confPct = ml.confidence_pct || 0;
      const confLevel = ml.confidence_level || "Moderate";

      mlHtml = `
        <div class="ml-result-card">
          <div class="ml-header">
            <span style="font-size: 1.4rem;">🤖</span>
            <div>
              <strong style="color: var(--primary-navy);">${isKn ? "ಯಂತ್ರ ಕಲಿಕೆ (ML) ಮಾದರಿ ವಿಶ್ಲೇಷಣೆ:" : "Machine Learning Model Prediction:"}</strong>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${ml.model_type || "TF-IDF + Logistic Regression"}</div>
            </div>
          </div>
          <div class="ml-body">
            <div class="ml-pred-badge ${predClass}">
              <span>${predLabel === "Potentially Fraudulent" ? "⚠️" : "✅"}</span>
              <span>${isKn && predLabel === "Potentially Fraudulent" ? "ವಂಚನೆಯ ಸಾಧ್ಯತೆ (Potentially Fraudulent)" : (isKn ? "ಸಾಮಾನ್ಯ/ಅಧಿಕೃತ (Legitimate)" : predLabel)}</span>
            </div>
            <div class="ml-metric-row">
              <span class="ml-metric-label">${isKn ? "ಕ್ಯಾಲಿಬ್ರೇಟೆಡ್ ವಿಶ್ವಾಸಾರ್ಹತೆ:" : "Calibrated Confidence:"}</span>
              <strong class="ml-metric-val">${confPct}% (${confLevel})</strong>
            </div>
            <div class="ml-prob-bar-container" title="Estimated fraud probability: ${probPct}%">
              <div class="ml-prob-bar ${predClass}" style="width: ${Math.max(6, Math.min(100, probPct))}%;"></div>
            </div>
            <div class="ml-note-text">
              <span>ℹ️</span>
              <span>${isKn ? ml.note_kn : ml.note_en}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      // Model not yet trained: Transparent notice
      mlHtml = `
        <div class="ml-result-card ml-status-waiting">
          <div class="ml-header">
            <span style="font-size: 1.4rem;">ℹ️</span>
            <div>
              <strong style="color: var(--primary-navy);">${isKn ? "ಯಂತ್ರ ಕಲಿಕೆ (ML) ಮಾದರಿ ಸ್ಥಿತಿ:" : "Machine Learning Model Status:"}</strong>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${isKn ? "ಡೇಟಾಸೆಟ್ ತರಬೇತಿ ಬಾಕಿ ಇದೆ" : "Awaiting Dataset Training"}</div>
            </div>
          </div>
          <div class="ml-body">
            <p style="font-size: 0.95rem; margin-bottom: 8px; color: var(--text-main);">
              ${isKn ?
                "Scam/Spam India ಡೇಟಾಸೆಟ್ ಕಡತಗಳು (data1.csv/data2.csv) ಇನ್ನೂ ಸಲ್ಲಿಕೆಯಾಗಿಲ್ಲ. ತರಬೇತಿ ಸ್ಕ್ರಿಪ್ಟ್ (train_model.py) ಸಿದ್ಧವಾಗಿದೆ." :
                "The Scam/Spam India Dataset CSV files (data1.csv/data2.csv) have not yet been placed. The training script (train_model.py) is ready to train on the 2,272 records once files are available."
              }
            </p>
            <div class="ml-note-text">
              <span>🛡️</span>
              <span>${isKn ?
                "ಸಕ್ರಿಯ ರಕ್ಷಣೆ: ನಮ್ಮ ೬-ವಿಭಾಗಗಳ ಸಮಗ್ರ ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಎಂಜಿನ್ ಈ ಸಂದೇಶವನ್ನು ರಿಯಲ್-ಟೈಮ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿದೆ." :
                "Active Protection: Our comprehensive 6-category safety rules engine is actively evaluating this message in real time."
              }</span>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Disagreement Callout Banner (if model & safety rules disagreed)
    let disagreementHtml = "";
    if (data.disagreement_detected && (data.disagreement_explanation_en || data.disagreement_explanation_kn)) {
      disagreementHtml = `
        <div class="disagreement-banner">
          <span style="font-size: 1.3rem;">⚖️</span>
          <div>
            <strong>${isKn ? "ಮಾದರಿ ಮತ್ತು ನಿಯಮಗಳ ವ್ಯತ್ಯಾಸ ನಿರ್ವಹಣೆ:" : "Model vs Rule Disagreement Resolution:"}</strong>
            <p style="margin: 4px 0 0 0; font-size: 0.95rem;">
              ${isKn ? data.disagreement_explanation_kn : data.disagreement_explanation_en}
            </p>
          </div>
        </div>
      `;
    }

    // 4. Specific Suspicious Words & Phrases Found in Submitted Message
    let phrasesHtml = "";
    if (data.identified_phrases && data.identified_phrases.length > 0) {
      phrasesHtml = `
        <div class="result-section-box">
          <div class="result-section-title">
            <span>🔍</span>
            <span>${isKn ? "ಸಂದೇಶದಲ್ಲಿ ಪತ್ತೆಯಾದ ನಿರ್ದಿಷ್ಟ ಅನುಮಾನಾಸ್ಪದ ಪದಗಳು:" : "Specific Suspicious Words / Phrases Found in Your Message:"}</span>
          </div>
          <div class="phrase-chips-wrapper">
            ${data.identified_phrases.map(phrase => `
              <span class="suspicious-phrase-pill">"${escapeHtml(phrase)}"</span>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 5. Warning Flags List
    let flagsHtml = "";
    if (data.detected_flags && data.detected_flags.length > 0) {
      flagsHtml = `
        <div class="result-section-box">
          <div class="result-section-title">
            <span>🚩</span>
            <span>${isKn ? "ಪತ್ತೆಯಾದ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು:" : "Warning Signs Detected:"}</span>
          </div>
          <ul class="warning-flags-list">
            ${data.detected_flags.map(flag => `
              <li class="warning-flag-item">
                <div class="flag-header">
                  <span class="flag-category">${escapeHtml(isKn ? flag.category_kn : flag.category)}</span>
                  <span class="flag-severity-pill ${flag.severity}">${flag.severity}</span>
                </div>
                <p class="flag-detail">${escapeHtml(isKn ? flag.detail_kn : flag.detail_en)}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 6. Simple Explanation of Why Flagged
    let explanationHtml = "";
    if (whyFlagged && whyFlagged.length > 0) {
      explanationHtml = `
        <div class="result-section-box">
          <div class="result-section-title">
            <span>💡</span>
            <span>${isKn ? "ಏಕೆ ಈ ಸಂದೇಶವನ್ನು ಗುರುತಿಸಲಾಗಿದೆ?" : "Why This Message Was Flagged:"}</span>
          </div>
          <ul class="explanation-points-list">
            ${whyFlagged.map(exp => `
              <li class="explanation-point-item">
                <span class="bullet-dot">•</span>
                <span>${escapeHtml(exp)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 7. Recommended Next Actions
    let adviceHtml = "";
    if (whatToDo && whatToDo.length > 0) {
      adviceHtml = `
        <div class="result-section-box">
          <div class="result-section-title">
            <span>🛡️</span>
            <span>${isKn ? "ನೀವು ಮಾಡಬೇಕಾದ ಶಿಫಾರಸು ಕ್ರಮಗಳು:" : "Recommended Next Action:"}</span>
          </div>
          <ul class="advice-action-list">
            ${whatToDo.map((adv, idx) => `
              <li class="advice-action-item">
                <span class="action-num-badge">${idx + 1}</span>
                <span>${escapeHtml(adv)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 8. Phone Call Context Box (if detected)
    let phoneCallHtml = "";
    if (data.phone_call_assistance && data.phone_call_assistance.detected) {
      const pc = data.phone_call_assistance;
      const steps = isKn ? pc.steps_kn : pc.steps_en;
      phoneCallHtml = `
        <div class="context-alert-box phone-call-box">
          <div class="context-alert-header">
            <span>📞</span>
            <strong>${isKn ? pc.title_kn : pc.title_en}</strong>
          </div>
          <ul class="context-steps-list">
            ${steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // 9. Already Sent Money Emergency Box (if detected)
    let moneySentHtml = "";
    if (data.already_sent_money && data.already_sent_money.detected) {
      const ms = data.already_sent_money;
      const steps = isKn ? ms.steps_kn : ms.steps_en;
      moneySentHtml = `
        <div class="context-alert-box emergency-money-box">
          <div class="context-alert-header">
            <span>🚨</span>
            <strong>${isKn ? ms.title_kn : ms.title_en}</strong>
          </div>
          <ul class="context-steps-list">
            ${steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // 10. Assemble the Full Result Card
    const html = `
      <div class="result-card ${riskClass}" id="activeResultCard">
        <div class="result-badge">
          <span class="badge-icon">${riskIcon}</span>
          <span class="badge-text">${riskBadgeTitle}</span>
        </div>

        <h3 class="result-headline">${escapeHtml(headline)}</h3>

        ${disagreementHtml}
        ${mlHtml}
        ${phrasesHtml}
        ${flagsHtml}
        ${explanationHtml}
        ${adviceHtml}
        ${phoneCallHtml}
        ${moneySentHtml}

        <div class="transparency-scope-box">
          <div style="margin-bottom: 6px;">
            ℹ️ <strong>${isKn ? "ಶೈಕ್ಷಣಿಕ ಸೂಚನೆ & ವ್ಯಾಪ್ತಿ:" : "Educational Note & Scope:"}</strong> ${escapeHtml(disclaimer)}
          </div>
          <div style="font-size: 0.9rem; color: var(--text-muted);">
            🔒 <strong>${isKn ? "ಗೌಪ್ಯತೆ:" : "Privacy:"}</strong>
            ${isKn ?
              "ಸಂದೇಶಗಳನ್ನು ಯಾವುದೇ ಹೊರಗಿನ API ಗಳಿಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ಸಂಪೂರ್ಣ ಪರಿಶೀಲನೆಯು ಈ ಸರ್ವರ್‌ನಲ್ಲಿಯೇ ಸ್ಥಳೀಯವಾಗಿ ನಡೆಯುತ್ತದೆ. ಎಂದಿಗೂ ಒಟಿಪಿ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ." :
              "Your messages are evaluated entirely on this local server and are never sent to external APIs. Never share OTPs, UPI PINs, or netbanking passwords."
            }
          </div>
        </div>

        <div class="result-actions-row">
          <button type="button" class="btn-large btn-primary" id="btnReadResultAloud">
            🔊 ${isKn ? "ಫಲಿತಾಂಶ ಓದಿ ಕೇಳಿಸಿ" : "Read Result Aloud"}
          </button>
          <button type="button" class="btn-large btn-secondary" id="btnCheckAnother">
            🔄 ${isKn ? "ಇನ್ನೊಂದು ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ" : "Check Another Message"}
          </button>
        </div>
      </div>
    `;

    resultArea.innerHTML = html;
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Audio Readout Binding
    const btnReadResult = document.getElementById('btnReadResultAloud');
    if (btnReadResult) {
      btnReadResult.addEventListener('click', () => {
        let textToRead = `${headline}. `;
        if (whatToDo && whatToDo.length) {
          textToRead += (isKn ? " ನೀವು ಮಾಡಬೇಕಾದ ಕ್ರಮ: " : " What you should do: ") + whatToDo.join(". ");
        }
        if (window.voiceAssistant) {
          window.voiceAssistant.speak(textToRead);
        }
      });
    }

    // Check Another Button Binding
    const btnAnother = document.getElementById('btnCheckAnother');
    if (btnAnother) {
      btnAnother.addEventListener('click', () => {
        messageInput.value = "";
        resultArea.innerHTML = "";
        messageInput.focus();
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Language Change Listener
  window.addEventListener('safepayLanguageChanged', () => {
    const text = (messageInput.value || "").trim();
    if (text && resultArea.querySelector('.result-card')) {
      analyzeMessage(text);
    }
  });
});
