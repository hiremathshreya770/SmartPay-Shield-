# EASY PAY — SAFE PAY (ಸುಲಭ ಪಾವತಿ — ಸುರಕ್ಷಿತ ಪಾವತಿ)
**Track:** Digital Inclusion & Public Access  
**Target Users:** Senior Citizens in India  
**Tagline:** *"Pause. Check. Stay Safe." (ಸ್ವಲ್ಪ ನಿಲ್ಲಿ. ಪರಿಶೀಲಿಸಿ. ಸುರಕ್ಷಿತವಾಗಿರಿ.)*

A professional, fully functional, accessible, bilingual (English & Kannada) digital payment safety web application designed specifically for senior citizens and digital payment beginners to navigate online payments safely, recognize fraud before acting, and consult trusted family members with zero bank account risk.

---

## 🌟 Problem Statement & Purpose
Digital payment services (UPI, QR codes, net banking) have expanded rapidly across India, but senior citizens and first-time digital users are disproportionately targeted by cybercriminals using psychological urgency, panic, and technical confusion.

**EASY PAY — SAFE PAY** transforms digital payment safety into a calm, accessible, senior-friendly experience organized into **seven core feature areas**, providing:
1. High-contrast typography and multilingual accessibility (7 Indian languages).
2. An interactive Personal Scam Assistant to evaluate suspicious messages, phone calls, and links.
3. A guided Smart Payment Assistant ("Verify Before You Pay") with automatic risk detection.
4. Comprehensive Transaction History with safety insights and persistent SQLite database records.
5. A 12-Lesson UPI Learning Centre with realistic examples and safety knowledge quizzes.
6. A consent-based Trusted Family Helper module with a strict Zero Bank Access Guarantee.
7. Integrated Voice Assistance (Web Speech API) and 24x7 Emergency Fraud Guidance (Helpline 1930 & cybercrime.gov.in).

---

## 🛠️ Technology Stack
- **Frontend**: Semantic HTML5, Accessible Vanilla CSS3 (Custom design system, high-contrast dark/yellow theme, dynamic font scaling: A-, A, A+, A++), Vanilla JavaScript (ES6+).
- **Backend**: Python 3.10+, Flask 3.1+
- **Machine Learning**: `scikit-learn`, `joblib`, `numpy`, `pandas` (TF-IDF Vectorizer + Calibrated Logistic Regression Classifier trained on Indian fraud and SMS text).
- **Database**: SQLite3 (`safepay.db`) for simulated demonstration transactions (`simulated_transactions`) and safety learning progress. Strictly zero banking credentials or PINs are ever collected or stored.
- **Voice / Accessibility**: Browser Web Speech API (`SpeechSynthesis` with calm 0.9 speech rate in English `en-IN` and Kannada `kn-IN`; optional `SpeechRecognition`), Web Audio API feedback.

---

## 🏛️ The Six Main Features

### FEATURE 1: Accessible Dashboard and Language Management (`/`)
- **Senior-Friendly Layout**: Large typography, generous touch targets, high-contrast toggle, accessible color palette, and intuitive navigation cards.
- **Persistent Language Selection**: Supports 7 Indian languages:
  - **Full Support**: English (`en`) and Kannada (`kn - ಕನ್ನಡ`) across all pages, modals, voice narration, and warning cards.
  - **Identified Support**: Hindi (`hi`), Tamil (`ta`), Telugu (`te`), Malayalam (`ml`), and Marathi (`mr`). Whenever a partial translation language is chosen, an explicit notification banner informs the senior citizen rather than silently displaying incorrect text.
  - Language selection is persisted in `localStorage` across all page refreshes and routes.
- **Demo Mode Indicators**: Prominent visual badges (`DEMO MODE — NO REAL MONEY`) clearly distinguish simulations from real banking.

### FEATURE 2: Personal Scam Assistant (`/coach`)
- **Interactive Chat Experience**: Replaces static quiz coaches with a real-time conversational advisor.
- **Input & Speech Controls**: Large text area with **ANALYZE MESSAGE**, **🔊 Read Aloud**, and **⏹️ Stop Speaking** buttons.
- **5 Suggested Questions** for one-tap guidance:
  1. *Is this bank message suspicious?*
  2. *Someone is asking for my OTP. What should I do?*
  3. *I received a UPI payment request.*
  4. *Someone called claiming to be from the police (Digital Arrest).*
  5. *I clicked a suspicious link. What should I do?*
- **Hybrid Scam Detection**:
  - Reuses the existing Flask ML text classification pipeline and extensive domain safety rules.
  - Evaluates newly submitted text on-the-fly (not hardcoded string matches).
  - Identifies specific suspicious phrases that actually occur in the submitted text.
  - Distinguishes observed text warning signs from model probability predictions.
  - Color-coded risk classifications: **HIGH RISK**, **CAUTION**, or **NO OBVIOUS WARNING SIGNS**.
  - Safe disclaimer for unflagged text: *"We did not find obvious warning signs in this message. However, this does not prove that it is genuine. Verify the sender independently before clicking a link, sharing information, or making a payment."*
- **Phone Call & Emergency Guidance**: Immediate advice for calls demanding OTPs, remote access (AnyDesk), or claims of "Digital Arrest".
- **Contextual Learning Links**: Automatically suggests relevant lessons in the UPI Learning Centre (e.g. `Learn how to avoid this scam → /learn#lesson-8`).

### FEATURE 3: Smart Payment Assistant — Verify Before You Pay (`/simulator`)
- **4-Step Guided Payment Simulator**:
  - **Step 1: Enter Payment Details**: Recipient name, UPI ID, amount, and payment purpose.
  - **Step 2: Safety Assessment**: Detects urgency triggers, unknown collect requests, or suspicious keywords using our safety evaluation engine. Displays warning signs, risk classification, and recipient verification status (`Unverified Demo UPI ID — Always confirm recipient in person`). Never invents fake bank verification.
  - **Step 3: Final Review**: Clear review card with details, risk badge, and safety precautions. Requires **explicit acknowledgment** for high-risk payments before confirmation is permitted. Provides **CONFIRM DEMO PAYMENT** and **CANCEL PAYMENT** buttons.
  - **Step 4: Demonstration Result**: Generates a unique transaction reference (e.g. `PAY-DEMO-20261015-ABCD`), stores the simulated record in SQLite, and displays:  
    `"DEMO PAYMENT COMPLETED — NO REAL MONEY TRANSFERRED."`
- **Cancellation Safety**: When cancelled, records transaction as "Cancelled by User" and excludes it from successful financial totals.
- **Strict Credential Protection**: Never asks for or stores real UPI PINs, bank passwords, or OTPs.

### FEATURE 4: Transaction History and Safety Insights (`/transactions`)
- **Database Integration**: Powered by SQLite table `simulated_transactions` in `safepay.db`.
- **Complete Transaction Details**: Reference ID, timestamp, recipient name, UPI ID, amount, purpose, transaction status, risk classification, and verification status.
- **Interactive Controls**:
  - Real-time search by recipient name or UPI ID.
  - Filter by transaction status (`Completed`, `Cancelled by User`, `Pending`).
  - Filter by risk classification (`HIGH RISK`, `CAUTION`, `LOW RISK`).
  - Sort by date (Newest First / Oldest First).
- **Demo Statistics**: Displays count and total amount of successful demo transactions only.
- **Safety Reminders**: Prominent warning callouts for transactions flagged with caution or high risk.

### FEATURE 5: UPI Learning Centre (`/learn`)
- **12 Comprehensive Interactive Lessons**:
  1. *What UPI Is and How It Works* (Analogy: Buying vegetables at Shri Manjunath Vegetables for ₹120).
  2. *How to Send Money Safely* (6 golden steps: recipient verification to receipt check).
  3. *Understanding a UPI PIN* (Setting/resetting PIN, 4-digit vs 6-digit PINs, never entering PIN into websites).
  4. *OTP Safety* (Why banks never ask for OTPs, difference between login OTP and debit OTP).
  5. *QR-Code Payment Scams* (The golden rule: Scanning a QR code is ONLY to pay, never to receive).
  6. *Fraudulent Collect Requests* (Recognizing inverted payment traps).
  7. *Fake Payment Screenshots* (Spotting edited receipts and verifying funds in your own bank app).
  8. *Fake Bank and Customer-Care Calls* (Locating verified phone numbers on physical passbooks/cards).
  9. *Screen-Sharing and Remote-Access Scams* (Never installing AnyDesk or TeamViewer for callers).
  10. *Suspicious Links and Phishing Messages* (Electricity bill disconnection, KYC suspension scams).
  11. *Recognizing Urgent or Threatening Payment Requests* (Digital arrest myths, courier police scams).
  12. *What to Do After Suspected Financial Fraud* (Immediate actions, bank freezing, and Helpline 1930).
- **Curriculum Directory Grid**: Quick one-click jump buttons to each lesson.
- **Deep Anchor Links**: Contextual URLs (`#lesson-1` through `#lesson-12`) link directly from scam warnings.
- **Standardized Lesson Format**: Each lesson contains an explanation, step-by-step guidance, realistic example, common warning signs, safety tips, and a short recap box.
- **Golden Rule Banner**: Highlights that receiving money through UPI **NEVER** requires entering or sharing a UPI PIN or OTP.
- **Knowledge Quiz**: Section 14 interactive safety quiz with instant feedback.

### FEATURE 6: Voice Assistance and Emergency Support (`/help`)
- **Integrated Voice Assistance**:
  - Browser Web Speech API (`SpeechSynthesis`) with calm 0.9 speech rate.
  - **Read Aloud** and **Stop Speaking** buttons across the dashboard, scam assistant, learning centre, and emergency help.
  - Spoken guidance available in English (`en-IN`) and Kannada (`kn-IN`).
  - Stop button immediately halts speech execution (`speechSynthesis.cancel()`).
  - Graceful fallback when the browser does not support Web Speech APIs.
  - Voice input is strictly optional and never compulsory.
- **Emergency Fraud Guidance**:
  - Calm, non-blaming reassurance: *"Please stay calm — do not blame yourself. Sophisticated fraudsters use deceptive psychological pressure. Take these calm steps immediately:"*
  - **7 Immediate Steps**:
    1. Stop all contact immediately (hang up, disconnect, block).
    2. NEVER share additional OTPs, UPI PINs, or passwords.
    3. Contact bank immediately through verified official numbers (on debit card back or passbook) to freeze accounts and block cards.
    4. Call National Cyber Crime Helpline **1930** promptly ("Golden Hour").
    5. File an official complaint at **https://cybercrime.gov.in**.
    6. Preserve all evidence safely (screenshots of messages, caller IDs, transaction references).
    7. Important authority & recovery disclaimer: We do not impersonate authorities and cannot guarantee financial recovery, but prompt reporting maximizes the chance to freeze fraudulent accounts.
  - One-tap direct call link: `<a href="tel:1930">📞 Dial 1930</a>`.
  - Printable Senior Pocket Safety Card (`window.print()`).

---

## 💻 Installation & Setup Instructions (Windows)

### Prerequisites
- Windows 10 or 11
- Python 3.10, 3.11, or 3.12 (ensure `python` is added to Windows PATH)
- Modern web browser (Chrome, Edge, Firefox)

### Step 1: Open PowerShell in the Project Directory
```powershell
cd "c:\Users\Shreya\OneDrive\Desktop\smartpay"
```

### Step 2: (Optional but Recommended) Virtual Environment
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```
*(If PowerShell restricts script execution, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*

### Step 3: Install Required Dependencies
```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

**Required packages in `requirements.txt`:**
- `Flask>=3.0.0`
- `scikit-learn>=1.3.0`
- `joblib>=1.3.0`
- `pandas>=2.0.0`
- `numpy>=1.24.0`

### Step 4: Run the Full Test Suite
Run all unit and integration tests:
```powershell
python -m unittest discover -v
```
*All 57 unit tests will execute and pass cleanly (`OK`).*

### Step 5: Start the Application
```powershell
python app.py
```

### Step 6: Open in Web Browser
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🎯 Live Hackathon Demonstration Flow

| Feature Area | Route | Demonstration Flow |
|---|---|---|
| **1. Accessible Dashboard & Languages** | `/` | 1. Observe large typography, accessible contrast, and visible **DEMO MODE** badges.<br>2. Click language dropdown: toggle between **English** and **ಕನ್ನಡ (Kannada)**.<br>3. Select **Hindi** or **Tamil** to observe the clear partial-translation warning banner.<br>4. Toggle **High Contrast** mode (black/yellow) and text size controls (`A-`, `A`, `A+`, `A++`). |
| **2. Personal Scam Assistant** | `/coach` | 1. Click suggested chip: *"Someone called claiming to be from the police (Digital Arrest)"*.<br>2. Observe instant analysis: **HIGH RISK**, observed phrases, plain-language explanation, and next steps.<br>3. Click **🔊 Read Aloud** to test senior voice narration at calm 0.9 pace.<br>4. Click contextual link: *"Learn how to avoid this scam in Lesson 8 →"* to jump to Learning Centre. |
| **3. Smart Payment Assistant** | `/simulator` | 1. Step 1: Enter recipient `Rohan Stores`, UPI ID `rohan@fakeupi`, Amount `5000`, Purpose `Urgent police bail fee`.<br>2. Step 2: Observe safety assessment: flagged as **HIGH RISK** due to urgent extortion keywords.<br>3. Step 3: Try to confirm — observe system requires explicit acknowledgment checkbox for high risk.<br>4. Step 4: Confirm demo payment: observe unique demo reference `PAY-DEMO-...` and prominent notice: *"DEMO PAYMENT COMPLETED — NO REAL MONEY TRANSFERRED."* |
| **4. Transaction History & Insights** | `/transactions` | 1. Observe newly completed demo payment appears automatically in the SQLite-backed transaction list.<br>2. Verify successful demo count and total amount statistics.<br>3. Test real-time search by typing recipient name.<br>4. Test filtering by Risk (`HIGH RISK`, `CAUTION`) and sorting by Date. |
| **5. UPI Learning Centre** | `/learn` | 1. View Curriculum Directory Grid with all 12 lessons.<br>2. Jump to `#lesson-1` (vegetable vendor ₹120 analogy) and `#lesson-4` (OTP safety).<br>3. Review Golden Rule banner: *"Receiving money through UPI NEVER requires entering a UPI PIN."*<br>4. Test **🔊 Read Section Aloud** and toggle English / Kannada.<br>5. Jump to Section 14 to complete the Senior Safety Knowledge Check quiz. |
| **6. Voice Assistance & Emergency Support** | `/help` | 1. Click **🔊 Read Aloud** to hear calm audio instructions.<br>2. Review direct one-tap call link to Indian Cyber Crime Helpline `tel:1930`.<br>3. Review the calm, non-blaming 7-step checklist and verified bank customer care lookup guide.<br>4. Click **🖨️ Print Safety Card** to print a pocket reference for seniors. |

---

## 🔒 Security & Ethical Guardrails
- **Zero Real Credentials**: Never asks for, transmits, or stores real UPI PINs, net banking passwords, or bank OTPs.
- **Zero Real Transactions**: All payments are simulated educational demonstrations; no money can ever leave an account.
- **No False Claims**: Never claims a message or sender is 100% verified without genuine authoritative confirmation.
- **Safe Fallback**: If the machine learning model is unavailable, the system safely falls back to transparent domain safety rules without disruption.
- **Strict Consent**: Information is never shared in the background without explicit user confirmation.

---

## 🏆 Hackathon Attribution
Developed for **HACKURITY 2026 Hackathon**.  
**Track:** Digital Inclusion & Public Access  
**Target Users:** Senior Citizens in India  
**Tagline:** **"Pause. Check. Stay Safe."** / **"ಸ್ವಲ್ಪ ನಿಲ್ಲಿ. ಪರಿಶೀಲಿಸಿ. ಸುರಕ್ಷಿತವಾಗಿರಿ."**
