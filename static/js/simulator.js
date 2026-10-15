/**
 * EASY PAY — SAFE PAY
 * SMART PAYMENT ASSISTANT — VERIFY BEFORE YOU PAY
 *
 * Senior-Friendly Guided Payment Simulator:
 * Step 1: Enter Payment Details (presets + custom)
 * Step 2: Safety Assessment (scam rules, warning signs, unverified status)
 * Step 3: Final Review (with mandatory high-risk explicit acknowledgment)
 * Step 4: Demonstration Result (unique demo reference, DB save, zero real money guarantee)
 */

class SmartPaymentAssistantManager {
  constructor() {
    // Stepper navigation
    this.indicators = [
      document.getElementById('stepIndicator1'),
      document.getElementById('stepIndicator2'),
      document.getElementById('stepIndicator3'),
      document.getElementById('stepIndicator4')
    ];

    this.stepCards = [
      document.getElementById('paymentStep1Card'),
      document.getElementById('paymentStep2Card'),
      document.getElementById('paymentStep3Card'),
      document.getElementById('paymentStep4Card')
    ];

    // Main tabs
    this.tabSmart = document.getElementById('tabSmartAssistant');
    this.tabScenarios = document.getElementById('tabInteractiveScenarios');
    this.tabHistory = document.getElementById('tabQuickHistory');

    this.contentSmart = document.getElementById('contentSmartAssistant');
    this.contentScenarios = document.getElementById('contentInteractiveScenarios');
    this.contentHistory = document.getElementById('contentQuickHistory');

    // Step 1 Inputs & Buttons
    this.inputRecipient = document.getElementById('payRecipientName');
    this.inputUpi = document.getElementById('payUpiId');
    this.inputAmount = document.getElementById('payAmount');
    this.inputPurpose = document.getElementById('payPurpose');
    this.btnVerify = document.getElementById('btnVerifyPayment');
    this.presetButtons = document.querySelectorAll('.btn-preset-pay');

    // Step 2 Assessment Elements
    this.riskBadge = document.getElementById('assessmentRiskBadge');
    this.verificationText = document.getElementById('assessmentVerificationText');
    this.warningsList = document.getElementById('assessmentWarningsList');
    this.precautionsList = document.getElementById('assessmentPrecautionsList');
    this.learnLink = document.getElementById('assessmentLearnLink');
    this.btnBackStep1 = document.getElementById('btnBackToStep1');
    this.btnProceedStep3 = document.getElementById('btnProceedToStep3');

    // Step 3 Review Elements
    this.reviewRecipient = document.getElementById('reviewRecipient');
    this.reviewUpi = document.getElementById('reviewUpiId');
    this.reviewAmount = document.getElementById('reviewAmount');
    this.reviewPurpose = document.getElementById('reviewPurpose');
    this.reviewRiskBadge = document.getElementById('reviewRiskBadge');
    this.highRiskBox = document.getElementById('highRiskAlertBox');
    this.chkHighRisk = document.getElementById('chkHighRiskAck');
    this.btnConfirm = document.getElementById('btnConfirmDemoPayment');
    this.btnCancel = document.getElementById('btnCancelPayment');

    // Step 4 Result Elements
    this.resultSuccess = document.getElementById('resultSuccessView');
    this.resultCancelled = document.getElementById('resultCancelledView');
    this.resultTxnRef = document.getElementById('resultTxnRef');
    this.resultDateTime = document.getElementById('resultDateTime');
    this.resultRecipient = document.getElementById('resultRecipientName');
    this.resultAmountRecipient = document.getElementById('resultAmountRecipient');
    this.btnRestart = document.getElementById('btnRestartPayment');

    // Audio controls
    this.btnReadPage = document.getElementById('btnReadSimPage');
    this.btnStopAudio = document.getElementById('btnStopSimAudio');

    // Scenarios Subtabs
    this.subTabGrocery = document.getElementById('subTabGrocery');
    this.subTabCollect = document.getElementById('subTabCollect');
    this.subTabQr = document.getElementById('subTabQr');
    this.scenarioGrocery = document.getElementById('scenarioGroceryView');
    this.scenarioCollect = document.getElementById('scenarioCollectView');
    this.scenarioQr = document.getElementById('scenarioQrView');
    this.btnSimGroceryPay = document.getElementById('btnSimGroceryPay');
    this.btnDeclineCollect = document.getElementById('btnDeclineCollectTrap');
    this.btnAcceptCollect = document.getElementById('btnAcceptCollectTrap');
    this.collectFeedback = document.getElementById('collectFeedbackBox');

    this.currentAssessment = null;
    this.init();
  }

  init() {
    this.bindTabs();
    this.bindPresets();
    this.bindStepNavigation();
    this.bindScenarios();
    this.bindAudio();
  }

  // ============================================================
  // TAB NAVIGATION
  // ============================================================
  bindTabs() {
    const setTab = (activeTab, activeContent) => {
      [this.tabSmart, this.tabScenarios, this.tabHistory].forEach(t => {
        if (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        }
      });
      [this.contentSmart, this.contentScenarios, this.contentHistory].forEach(c => {
        if (c) c.style.display = 'none';
      });

      if (activeTab) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
      }
      if (activeContent) {
        activeContent.style.display = 'block';
      }
    };

    if (this.tabSmart) this.tabSmart.addEventListener('click', () => setTab(this.tabSmart, this.contentSmart));
    if (this.tabScenarios) this.tabScenarios.addEventListener('click', () => setTab(this.tabScenarios, this.contentScenarios));
    if (this.tabHistory) this.tabHistory.addEventListener('click', () => setTab(this.tabHistory, this.contentHistory));
  }

  // ============================================================
  // PRESETS
  // ============================================================
  bindPresets() {
    this.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const upi = btn.getAttribute('data-upi');
        const amt = btn.getAttribute('data-amt');
        const purpose = btn.getAttribute('data-purpose');

        if (this.inputRecipient) this.inputRecipient.value = name || '';
        if (this.inputUpi) this.inputUpi.value = upi || '';
        if (this.inputAmount) this.inputAmount.value = amt || '';
        if (this.inputPurpose) this.inputPurpose.value = purpose || '';

        this.inputRecipient.focus();
      });
    });
  }

  // ============================================================
  // STEPPER NAVIGATION
  // ============================================================
  goToStep(stepNumber) {
    this.stepCards.forEach((card, idx) => {
      if (card) card.style.display = (idx + 1 === stepNumber) ? 'block' : 'none';
    });

    this.indicators.forEach((ind, idx) => {
      if (ind) {
        const badge = ind.querySelector('.step-badge');
        if (idx + 1 === stepNumber) {
          ind.classList.add('active');
          ind.style.color = 'var(--accent-teal-dark)';
          if (badge) {
            badge.style.background = 'var(--accent-teal)';
            badge.style.color = '#FFFFFF';
          }
        } else if (idx + 1 < stepNumber) {
          ind.classList.remove('active');
          ind.style.color = 'var(--status-success)';
          if (badge) {
            badge.style.background = '#10B981';
            badge.style.color = '#FFFFFF';
          }
        } else {
          ind.classList.remove('active');
          ind.style.color = '#94A3B8';
          if (badge) {
            badge.style.background = '#E2E8F0';
            badge.style.color = '#64748B';
          }
        }
      }
    });

    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  bindStepNavigation() {
    // 1. Verify Payment (Step 1 -> Step 2)
    if (this.btnVerify) {
      this.btnVerify.addEventListener('click', () => this.handleVerifyPayment());
    }

    // 2. Edit Details (Step 2 -> Step 1)
    if (this.btnBackStep1) {
      this.btnBackStep1.addEventListener('click', () => this.goToStep(1));
    }

    // 3. Proceed to Review (Step 2 -> Step 3)
    if (this.btnProceedStep3) {
      this.btnProceedStep3.addEventListener('click', () => this.handleProceedToReview());
    }

    // 4. Confirm Payment (Step 3 -> Step 4 Success)
    if (this.btnConfirm) {
      this.btnConfirm.addEventListener('click', () => this.handleConfirmPayment());
    }

    // 5. Cancel Payment (Step 3 -> Step 4 Cancelled)
    if (this.btnCancel) {
      this.btnCancel.addEventListener('click', () => this.handleCancelPayment());
    }

    // 6. Restart (Step 4 -> Step 1)
    if (this.btnRestart) {
      this.btnRestart.addEventListener('click', () => {
        if (this.inputRecipient) this.inputRecipient.value = '';
        if (this.inputUpi) this.inputUpi.value = '';
        if (this.inputAmount) this.inputAmount.value = '';
        if (this.inputPurpose) this.inputPurpose.value = '';
        this.currentAssessment = null;
        this.goToStep(1);
      });
    }
  }

  async handleVerifyPayment() {
    const recipient = this.inputRecipient ? this.inputRecipient.value.trim() : '';
    const upi = this.inputUpi ? this.inputUpi.value.trim() : '';
    const amount = this.inputAmount ? this.inputAmount.value.trim() : '';
    const purpose = this.inputPurpose ? this.inputPurpose.value.trim() : '';

    if (!recipient) {
      alert('Please enter the recipient name.');
      this.inputRecipient.focus();
      return;
    }
    if (!upi) {
      alert('Please enter the UPI ID (e.g. name@bank).');
      this.inputUpi.focus();
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid payment amount in Rupees.');
      this.inputAmount.focus();
      return;
    }

    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';

    try {
      this.btnVerify.disabled = true;
      this.btnVerify.textContent = 'Evaluating Fraud Risks...';

      const res = await fetch('/api/payment/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_name: recipient,
          upi_id: upi,
          amount: amount,
          purpose: purpose,
          language: currentLang
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        this.currentAssessment = data;
        this.populateStep2(data);
        this.goToStep(2);
      } else {
        alert(data.message || 'Error evaluating payment safety.');
      }
    } catch (err) {
      console.error('Error in assessment:', err);
      alert('Network or server error while assessing payment.');
    } finally {
      if (this.btnVerify) {
        this.btnVerify.disabled = false;
        this.btnVerify.textContent = '🔍 Check Safety & Verify Details →';
      }
    }
  }

  populateStep2(data) {
    const risk = data.risk_classification || 'NO OBVIOUS WARNING SIGNS';
    const isHigh = risk === 'HIGH RISK';
    const isCaution = risk === 'CAUTION';

    if (this.riskBadge) {
      this.riskBadge.className = 'warning-badge-pill ' + (isHigh ? 'badge-high-risk' : (isCaution ? 'badge-suspicious' : 'badge-clean'));
      this.riskBadge.textContent = isHigh ? '🚨 HIGH RISK' : (isCaution ? '⚠️ CAUTION' : '✔ NO OBVIOUS WARNING SIGNS');
    }

    if (this.verificationText) {
      this.verificationText.textContent = data.verification_status || 'Unverified Demo UPI ID — Always confirm recipient in person';
    }

    if (this.warningsList) {
      const warnings = data.warning_signs || [];
      this.warningsList.innerHTML = warnings.map(w => `<li>${this.escapeHtml(w)}</li>`).join('');
    }

    if (this.precautionsList) {
      const precautions = data.recommended_precautions || [];
      this.precautionsList.innerHTML = precautions.map(p => `<li>${this.escapeHtml(p)}</li>`).join('');
    }

    if (this.learnLink && data.contextual_lesson) {
      this.learnLink.href = data.contextual_lesson;
    }
  }

  handleProceedToReview() {
    if (!this.currentAssessment) return;

    const det = this.currentAssessment.details || {};
    const risk = this.currentAssessment.risk_classification;
    const isHigh = risk === 'HIGH RISK';
    const isCaution = risk === 'CAUTION';

    if (this.reviewRecipient) this.reviewRecipient.textContent = det.recipient || this.inputRecipient.value;
    if (this.reviewUpi) this.reviewUpi.textContent = det.upi_id || this.inputUpi.value;
    if (this.reviewAmount) this.reviewAmount.textContent = det.amount || `₹${this.inputAmount.value}`;
    if (this.reviewPurpose) this.reviewPurpose.textContent = det.purpose || this.inputPurpose.value || 'General Payment';

    if (this.reviewRiskBadge) {
      this.reviewRiskBadge.className = 'warning-badge-pill ' + (isHigh ? 'badge-high-risk' : (isCaution ? 'badge-suspicious' : 'badge-clean'));
      this.reviewRiskBadge.textContent = isHigh ? '🚨 HIGH RISK' : (isCaution ? '⚠️ CAUTION' : '✔ NO OBVIOUS WARNING SIGNS');
    }

    if (this.highRiskBox) {
      this.highRiskBox.style.display = isHigh ? 'block' : 'none';
      if (this.chkHighRisk) this.chkHighRisk.checked = false;
    }

    this.goToStep(3);
  }

  async handleConfirmPayment() {
    if (!this.currentAssessment) return;

    const risk = this.currentAssessment.risk_classification;
    const isHigh = risk === 'HIGH RISK';

    if (isHigh && this.chkHighRisk && !this.chkHighRisk.checked) {
      alert('Safety Notice: High risk warning signs were detected for this payment. Please review the warning and check the acknowledgment box before continuing this demonstration.');
      this.chkHighRisk.focus();
      return;
    }

    const det = this.currentAssessment.details || {};
    const recipient = det.recipient || this.inputRecipient.value;
    const upi = det.upi_id || this.inputUpi.value;
    const amt = det.raw_amount || this.inputAmount.value;
    const purpose = det.purpose || this.inputPurpose.value;

    try {
      this.btnConfirm.disabled = true;
      this.btnConfirm.textContent = 'Confirming Demonstration...';

      const res = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_name: recipient,
          upi_id: upi,
          amount: amt,
          purpose: purpose,
          risk_classification: risk,
          warning_signs: (this.currentAssessment.warning_signs || []).join('; '),
          acknowledged_high_risk: this.chkHighRisk ? this.chkHighRisk.checked : false
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        const txn = data.transaction || {};
        if (this.resultSuccess) this.resultSuccess.style.display = 'block';
        if (this.resultCancelled) this.resultCancelled.style.display = 'none';

        if (this.resultAmountRecipient) {
          this.resultAmountRecipient.textContent = `${txn.amount} Paid in Demonstration to ${txn.recipient_name}`;
        }
        if (this.resultTxnRef) this.resultTxnRef.textContent = txn.txn_ref || '-';
        if (this.resultDateTime) this.resultDateTime.textContent = txn.date_time || '-';
        if (this.resultRecipient) this.resultRecipient.textContent = txn.recipient_name || '-';

        this.goToStep(4);
      } else {
        alert(data.message || 'Payment confirmation failed.');
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      alert('Error recording demonstration payment.');
    } finally {
      if (this.btnConfirm) {
        this.btnConfirm.disabled = false;
        this.btnConfirm.textContent = '✔ CONFIRM DEMO PAYMENT';
      }
    }
  }

  async handleCancelPayment() {
    const recipient = this.inputRecipient ? this.inputRecipient.value.trim() : 'Cancelled Demo Merchant';
    const upi = this.inputUpi ? this.inputUpi.value.trim() : 'cancelled@demo';
    const amount = this.inputAmount ? this.inputAmount.value.trim() : '0';
    const purpose = this.inputPurpose ? this.inputPurpose.value.trim() : 'Cancelled Demo Payment';
    const risk = this.currentAssessment ? this.currentAssessment.risk_classification : 'CAUTION';

    try {
      await fetch('/api/payment/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_name: recipient,
          upi_id: upi,
          amount: amount,
          purpose: purpose,
          risk_classification: risk
        })
      });

      if (this.resultSuccess) this.resultSuccess.style.display = 'none';
      if (this.resultCancelled) this.resultCancelled.style.display = 'block';
      this.goToStep(4);
    } catch (e) {
      console.error('Error logging cancellation:', e);
      if (this.resultSuccess) this.resultSuccess.style.display = 'none';
      if (this.resultCancelled) this.resultCancelled.style.display = 'block';
      this.goToStep(4);
    }
  }

  // ============================================================
  // INTERACTIVE SCENARIOS
  // ============================================================
  bindScenarios() {
    const setScenario = (tab, view) => {
      [this.subTabGrocery, this.subTabCollect, this.subTabQr].forEach(t => {
        if (t) t.classList.remove('active');
      });
      [this.scenarioGrocery, this.scenarioCollect, this.scenarioQr].forEach(v => {
        if (v) v.style.display = 'none';
      });

      if (tab) tab.classList.add('active');
      if (view) view.style.display = 'block';
    };

    if (this.subTabGrocery) this.subTabGrocery.addEventListener('click', () => setScenario(this.subTabGrocery, this.scenarioGrocery));
    if (this.subTabCollect) this.subTabCollect.addEventListener('click', () => setScenario(this.subTabCollect, this.scenarioCollect));
    if (this.subTabQr) this.subTabQr.addEventListener('click', () => setScenario(this.subTabQr, this.scenarioQr));

    // Scenario 1: Grocery Pay button
    if (this.btnSimGroceryPay) {
      this.btnSimGroceryPay.addEventListener('click', async () => {
        try {
          this.btnSimGroceryPay.disabled = true;
          this.btnSimGroceryPay.textContent = "Processing Demo Payment...";
          const res = await fetch('/api/payment/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipient_name: "Sharma Kirana & Provisions",
              upi_id: "sharmakiranastore@okbank",
              amount: "150",
              purpose: "Groceries",
              risk_classification: "NO OBVIOUS WARNING SIGNS",
              warning_signs: "Safe merchant payment verified"
            })
          });
          const data = await res.json();
          if (data.status === 'success') {
            const ref = data.transaction ? data.transaction.txn_ref : 'DEMO-UPI-SUCCESS';
            const feedbackBox = document.createElement('div');
            feedbackBox.style.cssText = "background: #ECFDF5; border: 2px solid #10B981; border-radius: var(--radius-md); padding: 16px; margin-top: 14px; text-align: center;";
            feedbackBox.innerHTML = `
              <strong style="color: #065F46; font-size: 1.15rem; display: block; margin-bottom: 4px;">✅ Demo Payment of ₹150 Completed Safely!</strong>
              <span style="font-size: 0.95rem; color: #047857; display: block; margin-bottom: 10px;">Reference: <code>${ref}</code> • Saved in SQLite Database</span>
              <a href="/transactions" class="btn-large btn-teal" style="display: inline-block; text-decoration: none; padding: 10px 20px; font-weight: 800;">
                📊 View in Feature 4: Transaction History →
              </a>
            `;
            this.btnSimGroceryPay.parentNode.appendChild(feedbackBox);
            this.btnSimGroceryPay.style.display = 'none';
          }
        } catch (e) {
          alert('Demo payment completed safely in simulation.');
        }
      });
    }

    // Scenario 2: Collect Request Trap Buttons (Persists to Transaction History)
    if (this.btnDeclineCollect) {
      this.btnDeclineCollect.addEventListener('click', async () => {
        try {
          await fetch('/api/payment/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipient_name: "Unknown Buyer (Old Sofa Trap)",
              upi_id: "buyer98200@fakebank",
              amount: "3500",
              purpose: "Advance payment for old sofa table",
              risk_classification: "HIGH RISK"
            })
          });
        } catch (e) {
          console.warn('Decline log error:', e);
        }

        if (this.collectFeedback) {
          this.collectFeedback.style.display = 'block';
          this.collectFeedback.innerHTML = `
            <div style="background: #ECFDF5; border: 2px solid #10B981; border-radius: var(--radius-md); padding: 16px; color: #065F46;">
              <strong style="font-size: 1.15rem; display: block; margin-bottom: 4px;">✅ Outstanding Choice: Safe Decline!</strong>
              <p style="margin: 0 0 10px 0; font-size: 0.95rem;">
                By declining the collect request, you protected your savings. Remember: entering a PIN is ONLY to send money. You NEVER enter a PIN to receive cash or advance payments.
              </p>
              <a href="/transactions" class="btn-control-chip" style="display: inline-block; background: #0D9488; color: #FFF; text-decoration: none; font-weight: 700; padding: 6px 14px;">
                📊 View Declined Trap in Feature 4: Transaction History →
              </a>
            </div>
          `;
        }
      });
    }

    if (this.btnAcceptCollect) {
      this.btnAcceptCollect.addEventListener('click', async () => {
        try {
          await fetch('/api/payment/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipient_name: "Trap Collect Request (Old Sofa Scam)",
              upi_id: "buyer98200@fakebank",
              amount: "3500",
              purpose: "Simulated Collect Trap Explored",
              risk_classification: "HIGH RISK",
              acknowledged_high_risk: true,
              warning_signs: "User explored collect request trap in simulation to observe loss warning."
            })
          });
        } catch (e) {
          console.warn('Accept trap log error:', e);
        }

        if (this.collectFeedback) {
          this.collectFeedback.style.display = 'block';
          this.collectFeedback.innerHTML = `
            <div style="background: #FEF2F2; border: 2px solid #EF4444; border-radius: var(--radius-md); padding: 16px; color: #991B1B;">
              <strong style="font-size: 1.15rem; display: block; margin-bottom: 4px;">🚨 TRAP DETECTED: Money Would Be Lost!</strong>
              <p style="margin: 0 0 10px 0; font-size: 0.95rem;">
                If this were a real application and you entered your PIN, <strong>₹3,500 would be DEDUCTED from your account immediately</strong>! Fraudsters send collect requests pretending it is to "receive payment". Always DECLINE unexpected collect requests.
              </p>
              <a href="/transactions" class="btn-control-chip" style="display: inline-block; background: #DC2626; color: #FFF; text-decoration: none; font-weight: 700; padding: 6px 14px;">
                📊 View High-Risk Trap in Feature 4: Transaction History →
              </a>
            </div>
          `;
        }
      });
    }

    // Scenario 3: QR Code Practice Simulation
    const btnSimQrPay = document.getElementById('btnSimQrPay');
    if (btnSimQrPay) {
      btnSimQrPay.addEventListener('click', async () => {
        try {
          btnSimQrPay.disabled = true;
          btnSimQrPay.textContent = "Processing QR Payment...";
          const res = await fetch('/api/payment/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipient_name: "Fresh Coconut Water & Fruits Stall",
              upi_id: "freshfruitstall@oksbi",
              amount: "80",
              purpose: "QR Code Merchant Payment",
              risk_classification: "NO OBVIOUS WARNING SIGNS",
              warning_signs: "Safe physical QR merchant payment"
            })
          });
          const data = await res.json();
          if (data.status === 'success') {
            const qrFeedbackBox = document.getElementById('qrFeedbackBox');
            if (qrFeedbackBox) {
              qrFeedbackBox.style.display = 'block';
              qrFeedbackBox.innerHTML = `
                <div style="background: #ECFDF5; border: 2px solid #10B981; border-radius: var(--radius-md); padding: 16px; margin-top: 14px; text-align: center;">
                  <strong style="color: #065F46; font-size: 1.15rem; display: block; margin-bottom: 4px;">✅ QR Code Payment of ₹80 Completed Safely!</strong>
                  <span style="font-size: 0.95rem; color: #047857; display: block; margin-bottom: 10px;">Reference: <code>${data.transaction.txn_ref}</code> • Saved in SQLite Database</span>
                  <a href="/transactions" class="btn-large btn-teal" style="display: inline-block; text-decoration: none; padding: 10px 20px; font-weight: 800;">
                    📊 View in Feature 4: Transaction History →
                  </a>
                </div>
              `;
            }
            btnSimQrPay.style.display = 'none';
          }
        } catch (e) {
          alert('QR demo payment completed safely in simulation.');
        }
      });
    }
  }

  // ============================================================
  // AUDIO
  // ============================================================
  bindAudio() {
    if (this.btnReadPage) {
      this.btnReadPage.addEventListener('click', () => {
        const text = "Welcome to the Smart Payment Assistant. Before you make any payment, enter the recipient's name, UPI ID, and amount to verify safety. We will check for urgent threats, fake handles, and advance fees so you can practice safely without real money.";
        if (window.voiceEngine && typeof window.voiceEngine.speak === 'function') {
          if (this.btnStopAudio) this.btnStopAudio.style.display = 'inline-flex';
          window.voiceEngine.speak(text, () => {
            if (this.btnStopAudio) this.btnStopAudio.style.display = 'none';
          });
        }
      });
    }

    if (this.btnStopAudio) {
      this.btnStopAudio.addEventListener('click', () => {
        if (window.voiceEngine && typeof window.voiceEngine.stop === 'function') {
          window.voiceEngine.stop();
        }
        if (this.btnStopAudio) this.btnStopAudio.style.display = 'none';
      });
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.paymentAssistant = new SmartPaymentAssistantManager();
});
