/**
 * EASY PAY — SAFE PAY
 * Centralized Multilingual Translation Dictionary (7 Indian Languages)
 * 1. English (en)
 * 2. Kannada (kn - ಕನ್ನಡ)
 * 3. Hindi (hi - हिंदी)
 * 4. Tamil (ta - தமிழ்)
 * 5. Telugu (te - తెలుగు)
 * 6. Malayalam (ml - മലയാളം)
 * 7. Marathi (mr - मराठी)
 *
 * Senior citizen friendly, culturally respectful, with automatic English fallback.
 */

const SUPPORTED_LANGUAGES = ['en', 'kn', 'hi', 'ta', 'te', 'ml', 'mr'];

const TRANSLATIONS = {
  // ==========================================
  // 1. ENGLISH (en)
  // ==========================================
  en: {
    // Top Bar & Controls
    text_size: "Text Size:",
    high_contrast: "High Contrast",
    normal_contrast: "Normal Contrast",
    emergency_call: "🚨 Emergency: 1930",
    choose_language_title: "Choose Your Language / ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    choose_language_subtitle: "Select your preferred language. You can change this anytime.",
    language_label: "Language:",

    // Voice Assistant Bar
    voice_assistant: "Voice Assistant",
    voice_tagline: "Calm, step-by-step audio instructions",
    read_aloud: "🔊 Read Aloud",
    repeat_voice: "🔁 Repeat",
    stop_speaking: "⏹️ Stop Speaking",
    speaking_active: "Speaking now...",
    voice_not_supported: "Voice audio is not supported in this browser.",

    // Brand & Navigation
    brand_title: "EASY PAY — SAFE PAY",
    brand_tagline: "Pause. Check. Stay Safe.",
    nav_home: "Home",
    nav_checker: "Check a Message",
    nav_coach: "Personal Scam Assistant",
    nav_simulator: "Practice UPI",
    nav_transactions: "Transaction History",
    nav_learn: "Learn UPI Safely",
    nav_help: "Emergency Help",
    nav_login: "Login",
    nav_logout: "Logout",
    nav_welcome_user: "Welcome, Senior Member",
    back_to_home: "← Back to Home",

    // Login Page
    login_heading: "Senior Citizen Safe Login",
    login_welcome: "Welcome to EASY PAY — SAFE PAY. Please enter your credentials to continue safely.",
    login_instructions_text: "Welcome! Please choose your preferred language above. Then enter your username or 10-digit mobile number and password below. We never ask for your UPI PIN or banking passwords.",
    login_username_label: "Username or Mobile Number:",
    login_username_placeholder: "Enter username or 10-digit mobile",
    login_password_label: "Password or PIN:",
    login_password_placeholder: "Enter your password",
    btn_login: "Sign In / Login →",
    btn_register: "Create New Account / Register",
    link_forgot_pwd: "Forgot Password? Need Help?",
    login_safety_tip: "Safety Reminder: We will NEVER call or send SMS asking for your login password or UPI PIN.",
    login_voice_instruction: "Need help? Click 'Read Instructions Aloud' to hear guidance in your chosen language.",
    btn_read_instructions: "🔊 Read Instructions Aloud",
    btn_stop_instructions: "⏹️ Stop Speaking",
    validation_empty_user: "Please enter your username or mobile number.",
    validation_empty_pwd: "Please enter your password or PIN.",
    validation_success: "Login successful! Welcome to Safe Pay.",
    login_emergency_help: "🚨 Facing an emergency scam? Click here for 1930 help",
    register_title: "Create New SafePay Account",
    register_desc: "Quick, safe, and senior-friendly registration. No bank details required.",
    register_name_label: "Your Full Name:",
    register_name_placeholder: "Enter your name (e.g. Ramesh Sharma)",
    btn_submit_register: "Create My Account →",
    btn_back_to_login: "← Back to Login",
    forgot_pwd_title: "Password Assistance for Seniors",
    forgot_pwd_desc: "If you forgot your password, don't worry! Your safety is our priority. Enter your registered phone number to receive a recovery code. Remember: Bank managers will NEVER call asking for your recovery code.",
    btn_close: "Close",

    // Home Page Hero
    hero_badge: "HACKURITY 2026 — Senior Citizen Cyber Shield",
    hero_title: "Learn Safe Digital Payments Before Money Moves.",
    hero_desc: "Simple, friendly, step-by-step guidance designed specifically for senior citizens and beginners to use UPI, recognize scams, and bank with confidence.",
    btn_start_practice: "🛡️ Personal Scam Assistant",
    btn_check_sms: "🔍 Check a Suspicious Message",

    // Golden Rules
    golden_rules_title: "⭐ 3 Golden Rules Every Senior Must Remember",
    rule_1_title: "UPI PIN is ONLY for giving money",
    rule_1_desc: "Entering your UPI PIN ALWAYS subtracts money from your account. You NEVER enter a PIN to receive money.",
    rule_2_title: "Banks NEVER ask for OTP or Passwords",
    rule_2_desc: "No bank manager, police officer, or telecom executive has the authority to ask for your SMS OTP or card details.",
    rule_3_title: "NEVER install AnyDesk / QuickSupport",
    rule_3_desc: "If any caller asks you to install AnyDesk, TeamViewer, or share your screen, disconnect immediately.",

    // Feature Cards
    card_checker_title: "Check a Message",
    card_checker_desc: "Paste any SMS, WhatsApp message, or link. Our rule checker spots hidden dangers, urgency traps, and fake links.",
    btn_open_checker: "Check Message Now →",

    card_coach_title: "Personal Scam Assistant",
    card_coach_desc: "Understand suspicious messages, phone calls, links, and payment requests before you act. Instant plain-language guidance.",
    btn_open_coach: "Open Scam Assistant →",

    card_sim_title: "Practice Safe UPI",
    card_sim_desc: "A safe, simulated payment screen. Practice checking names, recognizing collect requests, and cancelling safely without real money.",
    btn_open_sim: "Try Practice Simulator →",

    card_trans_title: "Transaction History & Safety",
    card_trans_desc: "Review your completed demonstration payments with safety classifications, totals, search, and filters.",
    btn_open_trans: "View Transactions →",

    card_learn_title: "Learn UPI Safely",
    card_learn_desc: "Simple, step-by-step interactive video tutorials for seniors: understanding UPI, making payments, PIN security, biometrics, and avoiding scams.",
    btn_open_learn: "Learn UPI Safely →",

    card_help_title: "Emergency Help & Reporting",
    card_help_desc: "Immediate steps to take if you suspect a scam. Official Cyber Crime Helpline 1930 and bank contact guide.",
    btn_open_help: "Get Emergency Help →",

    // Checker Page
    checker_heading: "Suspicious Message & Link Checker",
    checker_subheading: "Paste any message you received. We will check it for warning signs before you click or reply.",
    checker_input_label: "Paste SMS, WhatsApp message, or website link here:",
    checker_placeholder: "Example: Dear customer, your electricity bill is unpaid. Power cut tonight. Call 9845...",
    btn_mic_input: "🎙️ Speak Message",
    btn_mic_listening: "Listening... Speak now",
    btn_analyze: "🔍 Check This Message",
    btn_clear: "Clear Text",
    sample_messages_label: "Try a sample scam message:",
    sample_power: "⚡ Power Disconnection SMS",
    sample_otp: "💳 Bank OTP Request",
    sample_lottery: "🎁 KBC Lottery Winner",
    sample_remote: "📱 AnyDesk Screen Share",
    sample_collect: "💸 OLX UPI Collect Request",
    sample_unlock: "🔒 Account Unlock Fee",
    sample_safe: "✅ Friendly Safe Message",

    // Checker Results
    results_heading: "Safety Analysis Result",
    detected_signs: "Warning Signs Detected:",
    advice_heading: "What You Should Do Now:",
    btn_check_another: "Check Another Message",
    btn_read_result: "🔊 Read Result Aloud",

    // Personal Scam Assistant Page
    coach_heading: "PERSONAL SCAM ASSISTANT",
    coach_subheading: "Help senior citizens understand suspicious messages, phone calls, links, and payment requests before they act.",
    assistant_title: "PERSONAL SCAM ASSISTANT",
    assistant_subtitle: "Help senior citizens understand suspicious messages, phone calls, links, and payment requests before they act.",
    assistant_welcome: "Hello! I am your Personal Scam Assistant. Before you click a link, share an OTP, or send money, tell me about any suspicious message, phone call, or payment request. I will explain the warning signs in plain language.",
    assistant_placeholder: "Paste a message, describe a phone call, or ask a question here... (e.g., 'Someone called asking for my OTP')",
    btn_analyze_message: "🔍 Analyze Message",
    btn_analyzing: "⏳ Analyzing Message...",
    btn_read_aloud: "🔊 Read Aloud",
    btn_stop_speaking: "⏹️ Stop Speaking",
    btn_clear_chat: "🗑️ Clear Chat",
    btn_speak_input: "🎙️ Speak Question",
    suggested_title: "Suggested Questions & Situations:",
    q_bank_suspicious: "Is this bank message suspicious?",
    q_ask_otp: "Someone is asking for my OTP. What should I do?",
    q_upi_request: "I received a UPI payment request.",
    q_police_call: "Someone called claiming to be from the police.",
    q_clicked_link: "I clicked a suspicious link. What should I do?",
    q_sent_money: "I already sent money to a scammer. What should I do?",
    section_why_flagged: "Why We Flagged It:",
    section_what_to_do: "What You Should Do:",
    section_identified_phrases: "Suspicious Words & Phrases Identified in Text:",
    section_ml_model: "English Machine-Learning Evaluation:",
    section_phone_call: "Phone Call Safety Assistance:",
    section_sent_money: "Immediate Action if Money Was Sent:",
    assistant_disclaimer: "Senior Safety Notice: We never collect OTPs, PINs, passwords, or bank credentials. No advice constitutes a legal or banking guarantee. Always verify numbers through official bank passbooks.",

    // UPI Simulator Page
    sim_heading: "Safe UPI Practice Simulator",
    sim_subheading: "Practice digital payments safely in a simulated phone. Learn to spot the difference between paying and receiving.",
    sim_badge_demo: "⚠️ DEMO ONLY — NO REAL MONEY MOVES. NO REAL PINS STORED.",
    tab_send: "Scenario 1: Paying a Shopkeeper",
    tab_collect: "Scenario 2: Fake Collect Request Trap",
    tab_qr: "Scenario 3: QR Code Safety",
    btn_verify_pay: "Pay Securely",
    btn_decline_request: "❌ DECLINE REQUEST (Safe)",
    btn_approve_trap: "⚠️ Accept Request (Trap)",
    sim_pin_instructions: "Notice: You only enter a UPI PIN when money is LEAVING your account.",

    // Learn UPI Safely Page
    learn_badge: "🛡️ SENIOR CITIZEN CYBER SHIELD • HACKURITY 2026",
    learn_heading: "LEARN UPI SAFELY",
    learn_subheading: "A friendly, step-by-step interactive tutorial designed for senior citizens and beginners to learn digital payments safely, confidently, and without fear.",
    learn_educational_notice: "Educational Learning Simulation: This is an educational guide, not a real banking application. We NEVER connect to real payment processing, and NEVER ask for or record real UPI PINs, OTPs, or bank passwords.",
    learn_tab_1: "1. Understanding UPI",
    learn_tab_2: "2. Making a Payment",
    learn_tab_3: "3. Set / Reset PIN",
    learn_tab_4: "4. UPI PIN Safety",
    learn_tab_5: "5. Biometrics",
    learn_tab_6: "6. QR & Collect Scams",
    learn_tab_quiz: "🎯 Knowledge Quiz",
    btn_prev_section: "⬅ Previous Section",
    btn_next_section: "Next Section ➡",
    btn_read_section: "🔊 Read Section Aloud",
    btn_stop_reading: "⏹️ Stop Speaking",
    btn_play_demo: "▶️ Play Video Demo",
    btn_pause_demo: "⏸️ Pause Demo",
    btn_restart_demo: "🔄 Restart Demo",
    transcript_heading: "📝 Video Transcript & Text Alternative",
    demo_simulation_label: "🏷️ EDUCATIONAL SIMULATION ONLY — NEVER ENTER REAL CREDENTIALS",
    quiz_heading: "🎯 Senior Safety Knowledge Check",
    quiz_subheading: "Test your confidence with these quick questions:",
    btn_submit_quiz: "Submit Quiz",

    // Help Page
    help_heading: "Emergency Help & Fraud Reporting",
    help_subheading: "If you shared an OTP, clicked a bad link, or sent money by mistake, act immediately.",
    emergency_title: "National Cyber Crime Reporting Helpline",
    emergency_dial_desc: "Toll-Free Indian Cybercrime Emergency Helpline (Operational 24x7)",
    official_portal_label: "Official Cybercrime Reporting Portal:",

    // Footer
    footer_hackathon: "Created for HACKURITY 2026 Hackathon | Built for Senior Citizen Safety",
    footer_disclaimer: "Educational Project Only. We never store personal messages, bank accounts, or financial credentials.",
  },

  // ==========================================
  // 2. KANNADA (kn - ಕನ್ನಡ)
  // ==========================================
  kn: {
    // Top Bar & Controls
    text_size: "ಅಕ್ಷರ ಗಾತ್ರ:",
    high_contrast: "ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್",
    normal_contrast: "ಸಾಮಾನ್ಯ ಮೋಡ್",
    emergency_call: "🚨 ತುರ್ತು ಸಹಾಯ: ೧೯೩೦",
    choose_language_title: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ / Choose Your Language",
    choose_language_subtitle: "ನಿಮಗೆ ಅನುಕೂಲವಾದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಇದನ್ನು ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಬದಲಾಯಿಸಬಹುದು.",
    language_label: "ಭಾಷೆ:",

    // Voice Assistant Bar
    voice_assistant: "ಧ್ವನಿ ಸಹಾಯಕ (Voice Assistant)",
    voice_tagline: "ಶಾಂತ, ಹಂತ-ಹಂತದ ಆಡಿಯೋ ಸೂಚನೆಗಳು",
    read_aloud: "🔊 ಓದಿ ಕೇಳಿಸಿ",
    repeat_voice: "🔁 ಪುನರಾವರ್ತಿಸಿ",
    stop_speaking: "⏹️ ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    speaking_active: "ಈಗ ಮಾತನಾಡುತ್ತಿದೆ...",
    voice_not_supported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯ ಲಭ್ಯವಿಲ್ಲ.",

    // Brand & Navigation
    brand_title: "ಸುಲಭ ಪಾವತಿ — ಸುರಕ್ಷಿತ ಪಾವತಿ",
    brand_tagline: "ಸ್ವಲ್ಪ ನಿಲ್ಲಿ. ಪರಿಶೀಲಿಸಿ. ಸುರಕ್ಷಿತವಾಗಿರಿ.",
    nav_home: "ಮುಖಪುಟ",
    nav_checker: "ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    nav_coach: "ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ",
    nav_simulator: "ಯುಪಿಐ ಅಭ್ಯಾಸ",
    nav_transactions: "ವಹಿವಾಟು ಇತಿಹಾಸ",
    nav_learn: "ಯುಪಿಐ ಸುರಕ್ಷಿತವಾಗಿ ಕಲಿಯಿರಿ",
    nav_help: "ತುರ್ತು ಸಹಾಯ",
    nav_login: "ಲಾಗಿನ್",
    nav_logout: "ಲಾಗ್‌ಔಟ್",
    nav_welcome_user: "ಸ್ವಾಗತ, ಹಿರಿಯ ಸದಸ್ಯರೇ",
    back_to_home: "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",

    // Login Page
    login_heading: "ಹಿರಿಯ ನಾಗರಿಕರ ಸುರಕ್ಷಿತ ಲಾಗಿನ್",
    login_welcome: "ಸುಲಭ ಪಾವತಿ — ಸುರಕ್ಷಿತ ಪಾವತಿಗೆ ಸ್ವಾಗತ. ಸುರಕ್ಷಿತವಾಗಿ ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    login_instructions_text: "ಸ್ವಾಗತ! ದಯವಿಟ್ಟು ಮೇಲೆ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ನಂತರ ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ. ನಾವು ಎಂದಿಗೂ ನಿಮ್ಮ ಯುಪಿಐ ಪಿನ್ ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಕೇಳುವುದಿಲ್ಲ.",
    login_username_label: "ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ:",
    login_username_placeholder: "ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್",
    login_password_label: "ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್:",
    login_password_placeholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    btn_login: "ಲಾಗಿನ್ ಮಾಡಿ →",
    btn_register: "ಹೊಸ ಖಾತೆ ತೆರೆಯಿರಿ / ನೋಂದಣಿ",
    link_forgot_pwd: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ? ಸಹಾಯ ಬೇಕೆ?",
    login_safety_tip: "ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ: ನಿಮ್ಮ ಲಾಗಿನ್ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಕೇಳಲು ನಾವು ಎಂದಿಗೂ ಕರೆ ಅಥವಾ ಸಂದೇಶ ಕಳುಹಿಸುವುದಿಲ್ಲ.",
    login_voice_instruction: "ಸಹಾಯ ಬೇಕೇ? ಧ್ವನಿ ಮೂಲಕ ಸೂಚನೆಗಳನ್ನು ಕೇಳಲು 'ಧ್ವನಿ ಮೂಲಕ ಸೂಚನೆಗಳನ್ನು ಕೇಳಿ' ಬಟನ್ ಒತ್ತಿ.",
    btn_read_instructions: "🔊 ಸೂಚನೆಗಳನ್ನು ಓದಿ ಕೇಳಿಸಿ",
    btn_stop_instructions: "⏹️ ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    validation_empty_user: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    validation_empty_pwd: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ನಮೂದಿಸಿ.",
    validation_success: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ! ಮುಖಪುಟಕ್ಕೆ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    login_emergency_help: "🚨 ತುರ್ತು ಸೈಬರ್ ವಂಚನೆಯೇ? ೧೯೩೦ ಸಹಾಯ ಪಡೆಯಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
    register_title: "ಹೊಸ ಸೇಫ್‌ಪೇ ಖಾತೆ ರಚಿಸಿ",
    register_desc: "ಹಿರಿಯರಿಗೆ ಸುಲಭ ಮತ್ತು ಸುರಕ್ಷಿತ ನೋಂದಣಿ. ಯಾವುದೇ ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಅಗತ್ಯವಿಲ್ಲ.",
    register_name_label: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು:",
    register_name_placeholder: "ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ (ಉದಾ: ರಮೇಶ್ ಕುಮಾರ್)",
    btn_submit_register: "ನನ್ನ ಖಾತೆ ತೆರೆಯಿರಿ →",
    btn_back_to_login: "← ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    forgot_pwd_title: "ಹಿರಿಯರಿಗಾಗಿ ಪಾಸ್‌ವರ್ಡ್ ಸಹಾಯ",
    forgot_pwd_desc: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದರೆ ಚಿಂತಿಸಬೇಡಿ! ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಸುರಕ್ಷಿತ ರಿಕವರಿ ಕೋಡ್ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ನೆನಪಿಡಿ: ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್‌ಗಳು ಎಂದಿಗೂ ಈ ಕೋಡ್ ಕೇಳುವುದಿಲ್ಲ.",
    btn_close: "ಮುಚ್ಚಿ",

    // Home Page Hero
    hero_badge: "ಹ್ಯಾಕ್ಯುರಿಟಿ ೨೦೨೬ — ಹಿರಿಯ ನಾಗರಿಕರ ಸೈಬರ್ ಕವಚ",
    hero_title: "ಹಣ ವರ್ಗಾವಣೆಯಾಗುವ ಮೊದಲೇ ಸುರಕ್ಷಿತ ಪಾವತಿ ಕಲಿಯಿರಿ.",
    hero_desc: "ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಆರಂಭಿಕ ಬಳಕೆದಾರರು ಯುಪಿಐ ಅನ್ನು ಧೈರ್ಯವಾಗಿ ಬಳಸಲು, ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಲು ರೂಪಿಸಲಾದ ಸರಳ ಮಾರ್ಗದರ್ಶಿ.",
    btn_start_practice: "🛡️ ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ",
    btn_check_sms: "🔍 ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",

    // Golden Rules
    golden_rules_title: "⭐ ಪ್ರತಿಯೊಬ್ಬ ಹಿರಿಯರು ನೆನಪಿಡಬೇಕಾದ ೩ ಚಿನ್ನದ ನಿಯಮಗಳು",
    rule_1_title: "ಯುಪಿಐ ಪಿನ್ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ",
    rule_1_desc: "ಯುಪಿಐ ಪಿನ್ ಹಾಕಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ. ಹಣ ಸ್ವೀಕರಿಸಲು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ.",
    rule_2_title: "ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳು ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ",
    rule_2_desc: "ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅಥವಾ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ನಿಮ್ಮ ಒಟಿಪಿ (OTP) ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಕೇಳುವಂತಿಲ್ಲ.",
    rule_3_title: "AnyDesk ಅಥವಾ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಹಾಕಬೇಡಿ",
    rule_3_desc: "ಯಾರೇ ಕರೆ ಮಾಡಿ AnyDesk ಅಥವಾ QuickSupport ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಹೇಳಿದರೆ ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ.",

    // Feature Cards
    card_checker_title: "ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    card_checker_desc: "ಯಾವುದೇ ಅನುಮಾನಾಸ್ಪದ ಎಸ್‌ಎಂಎಸ್, ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಹಾಕಿ. ಅಪಾಯಕಾರಿ ಅಂಶಗಳು ಮತ್ತು ನಕಲಿ ಲಿಂಕ್‌ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ.",
    btn_open_checker: "ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ →",

    card_coach_title: "ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ",
    card_coach_desc: "ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶಗಳು, ಕರೆಗಳು ಅಥವಾ ಯುಪಿಐ ಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ತಕ್ಷಣ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಸ್ಪಷ್ಟ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    btn_open_coach: "ವಂಚನೆ ಸಹಾಯಕ ತೆರೆಯಿರಿ →",

    card_sim_title: "ಯುಪಿಐ ಪಾವತಿ ಅಭ್ಯಾಸ",
    card_sim_desc: "ಯಾವುದೇ ನೈಜ ಹಣವಿಲ್ಲದ ಸುರಕ್ಷಿತ ಮೊಬೈಲ್ ಸಿಮ್ಯುಲೇಟರ್. ಹೆಸರು ಪರಿಶೀಲಿಸುವುದು ಮತ್ತು ನಕಲಿ ವಿನಂತಿ ತಿರಸ್ಕರಿಸುವುದನ್ನು ಕಲಿಯಿರಿ.",
    btn_open_sim: "ಯುಪಿಐ ಅಭ್ಯಾಸ ಮಾಡಿ →",

    card_trans_title: "ವಹಿವಾಟು ಇತಿಹಾಸ & ಸುರಕ್ಷತೆ",
    card_trans_desc: "ಸುರಕ್ಷತಾ ವರ್ಗೀಕರಣಗಳು, ಒಟ್ಟು ಮೊತ್ತಗಳು ಮತ್ತು ಹುಡುಕಾಟದೊಂದಿಗೆ ಡೆಮೊ ಪಾವತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    btn_open_trans: "ವಹಿವಾಟುಗಳನ್ನು ನೋಡಿ →",

    card_learn_title: "ಯುಪಿಐ ಸುರಕ್ಷಿತವಾಗಿ ಕಲಿಯಿರಿ",
    card_learn_desc: "ಹಿರಿಯರಿಗಾಗಿ ಸರಳ, ಹಂತ-ಹಂತದ ಇಂಟರಾಕ್ಟಿವ್ ವೀಡಿಯೊ ಮಾರ್ಗದರ್ಶಿ: ಯುಪಿಐ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು, ಪಾವತಿ, ಪಿನ್ ಭದ್ರತೆ, ಮತ್ತು ವಂಚನೆ ತಡೆಗಟ್ಟುವಿಕೆ.",
    btn_open_learn: "ಯುಪಿಐ ಸುರಕ್ಷಿತವಾಗಿ ಕಲಿಯಿರಿ →",

    card_help_title: "ತುರ್ತು ಸಹಾಯ ಮತ್ತು ದೂರು",
    card_help_desc: "ವಂಚನೆ ನಡೆದಾಗ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ತಕ್ಷಣದ ಕ್ರಮಗಳು. ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ ೧೯೩೦ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸಂಪರ್ಕ ಮಾರ್ಗದರ್ಶಿ.",
    btn_open_help: "ತುರ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ →",

    // Checker Page
    checker_heading: "ಸಂದೇಶ ಮತ್ತು ವೆಬ್ ಲಿಂಕ್ ಪರಿಶೀಲಕ",
    checker_subheading: "ನಿಮಗೆ ಬಂದ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ. ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ ಅಪಾಯಕಾರಿ ಅಂಶಗಳನ್ನು ತಪಾಸಣೆ ಮಾಡಿ.",
    checker_input_label: "ಎಸ್‌ಎಂಎಸ್, ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಅನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ:",
    checker_placeholder: "ಉದಾಹರಣೆ: ಪ್ರಿಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಯಾಗಿಲ್ಲ. ಇಂದು ರಾತ್ರಿ ಕರೆಂಟ್ ಕಟ್. ಸಂಪರ್ಕಿಸಿ ೯೮೪೫...",
    btn_mic_input: "🎙️ ಧ್ವನಿ ಮೂಲಕ ಸಂದೇಶ ಹೇಳಿ",
    btn_mic_listening: "ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ",
    btn_analyze: "🔍 ಈ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    btn_clear: "ತೆರವುಗೊಳಿಸಿ",
    sample_messages_label: "ಮಾದರಿ ವಂಚನೆ ಸಂದೇಶಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ:",
    sample_power: "⚡ ವಿದ್ಯುತ್ ಕಡಿತದ ಎಸ್‌ಎಂಎಸ್",
    sample_otp: "💳 ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಬೇಡಿಕೆ",
    sample_lottery: "🎁 ಕೆಬಿಸಿ ಲಾಟರಿ ಬಹುಮಾನ",
    sample_remote: "📱 AnyDesk ಸ್ಕ್ರೀನ್ ಶೇರ್",
    sample_collect: "💸 OLX ಹಣ ಕಲೆಕ್ಟ್ ವಿನಂತಿ",
    sample_unlock: "🔒 ಖಾತೆ ಅನ್‌ಲಾಕ್ ಶುಲ್ಕ",
    sample_safe: "✅ ನೈಜ ಸುರಕ್ಷಿತ ಸಂದೇಶ",

    // Checker Results
    results_heading: "ಸುರಕ್ಷತಾ ತಪಾಸಣೆ ಫಲಿತಾಂಶ",
    detected_signs: "ಪತ್ತೆಯಾದ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು:",
    advice_heading: "ನೀವು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ತಕ್ಷಣದ ಕ್ರಮಗಳು:",
    btn_check_another: "ಇನ್ನೊಂದು ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    btn_read_result: "🔊 ಫಲಿತಾಂಶ ಓದಿ ಕೇಳಿಸಿ",

    // Personal Scam Assistant Page
    coach_heading: "ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ (PERSONAL SCAM ASSISTANT)",
    coach_subheading: "ಹಿರಿಯ ನಾಗರಿಕರು ಯಾವುದೇ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶಗಳು, ಕರೆಗಳು, ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ.",
    assistant_title: "ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ",
    assistant_subtitle: "ಹಿರಿಯ ನಾಗರಿಕರು ಯಾವುದೇ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶಗಳು, ಕರೆಗಳು, ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ.",
    assistant_welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಂಚನೆ ಸಹಾಯಕ. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ, ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳುವ ಮುನ್ನ ಅಥವಾ ಹಣ ಕಳುಹಿಸುವ ಮುನ್ನ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶ ಅಥವಾ ಕರೆಯ ವಿವರಗಳನ್ನು ನನಗೆ ತಿಳಿಸಿ. ನಾನು ಅಪಾಯಕಾರಿ ಅಂಶಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತೇನೆ.",
    assistant_placeholder: "ಸಂದೇಶವನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ, ಕರೆಯ ವಿವರ ತಿಳಿಸಿ, ಅಥವಾ ಪ್ರಶ್ನೆ ಕೇಳಿ... (ಉದಾ: 'ಯಾರೋ ಕರೆ ಮಾಡಿ ಒಟಿಪಿ ಕೇಳುತ್ತಿದ್ದಾರೆ')",
    btn_analyze_message: "🔍 ಸಂದೇಶ ವಿಶ್ಲೇಷಿಸಿ",
    btn_analyzing: "⏳ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    btn_read_aloud: "🔊 ಓದಿ ಕೇಳಿಸಿ",
    btn_stop_speaking: "⏹️ ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    btn_clear_chat: "🗑️ ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    btn_speak_input: "🎙️ ಧ್ವನಿ ಮೂಲಕ ಹೇಳಿ",
    suggested_title: "ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಸನ್ನಿವೇಶಗಳು:",
    q_bank_suspicious: "ಈ ಬ್ಯಾಂಕ್ ಸಂದೇಶ ಅನುಮಾನಾಸ್ಪದವೇ?",
    q_ask_otp: "ಯಾರೋ ನನ್ನ ಒಟಿಪಿ ಕೇಳುತ್ತಿದ್ದಾರೆ. ನಾನು ಏನು ಮಾಡಬೇಕು?",
    q_upi_request: "ನನಗೆ ಯುಪಿಐ ಪಾವತಿ ವಿನಂತಿ ಬಂದಿದೆ.",
    q_police_call: "ಪೊಲೀಸ್ ಹೆಸರಿನಲ್ಲಿ ಯಾರೋ ಕರೆ ಮಾಡಿದ್ದಾರೆ.",
    q_clicked_link: "ನಾನು ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದ್ದೇನೆ. ಏನು ಮಾಡಬೇಕು?",
    q_sent_money: "ನಾನು ಈಗಾಗಲೇ ವಂಚಕನಿಗೆ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ. ಏನು ಮಾಡಬೇಕು?",
    section_why_flagged: "ನಾವು ಇದನ್ನು ಏಕೆ ಗುರುತಿಸಿದ್ದೇವೆ:",
    section_what_to_do: "ನೀವು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಕ್ರಮಗಳು:",
    section_identified_phrases: "ಪಠ್ಯದಲ್ಲಿ ಗುರುತಿಸಲಾದ ಅನುಮಾನಾಸ್ಪದ ಪದಗಳು ಮತ್ತು ನುಡಿಗಟ್ಟುಗಳು:",
    section_ml_model: "ಇಂಗ್ಲಿಷ್ ಯಂತ್ರ ಕಲಿಕೆ (ML) ಮಾದರಿ ಮೌಲ್ಯಮಾಪನ:",
    section_phone_call: "ದೂರವಾಣಿ ಕರೆ ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶನ:",
    section_sent_money: "ಹಣ ಕಳುಹಿಸಿದ್ದರೆ ತಕ್ಷಣದ ತುರ್ತು ಕ್ರಮಗಳು:",
    assistant_disclaimer: "ಹಿರಿಯರ ಸುರಕ್ಷತಾ ಸೂಚನೆ: ನಾವು ಎಂದಿಗೂ ಒಟಿಪಿ, ಪಿನ್, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಇಲ್ಲಿ ನೀಡಲಾಗುವ ಸಲಹೆ ಕಾನೂನು ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ಖಾತರಿಯಲ್ಲ. ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ.",

    // UPI Simulator Page
    sim_heading: "ಸುರಕ್ಷಿತ ಯುಪಿಐ ಪಾವತಿ ಸಿಮ್ಯುಲೇಟರ್",
    sim_subheading: "ನೈಜ ಹಣವಿಲ್ಲದ ಡೆಮೊ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಅಭ್ಯಾಸ ಮಾಡಿ. ಹಣ ಕಳುಹಿಸುವುದು ಮತ್ತು ಪಡೆಯುವುದರ ವ್ಯತ್ಯಾಸವನ್ನು ತಿಳಿಯಿರಿ.",
    sim_badge_demo: "⚠️ ಡೆಮೊ ಮಾತ್ರ — ಯಾವುದೇ ನೈಜ ಹಣ ವರ್ಗಾವಣೆಯಾಗುವುದಿಲ್ಲ. ಯಾವುದೇ ಪಿನ್ ಸಂಗ್ರಹವಾಗುವುದಿಲ್ಲ.",
    tab_send: "ಸನ್ನಿವೇಶ ೧: ಅಂಗಡಿಗೆ ಹಣ ಪಾವತಿಸುವುದು",
    tab_collect: "ಸನ್ನಿವೇಶ ೨: ನಕಲಿ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಬಲೆ",
    tab_qr: "ಸನ್ನಿವೇಶ ೩: ಕ್ಯೂಆರ್ ಕೋಡ್ ಸುರಕ್ಷತೆ",
    btn_verify_pay: "ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ",
    btn_decline_request: "❌ ವಿನಂತಿಯನ್ನು ತಿರಸ್ಕರಿಸಿ",
    btn_approve_trap: "⚠️ ಒಪ್ಪಿಕೊಳ್ಳಿ (ಅಪಾಯಕಾರಿ ಬಲೆ)",
    sim_pin_instructions: "ಗಮನಿಸಿ: ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಹೊರಹೋಗುವಾಗ ಮಾತ್ರ ನೀವು ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಬೇಕು.",

    // Learn UPI Safely Page (Kannada)
    learn_badge: "🛡️ ಹಿರಿಯ ನಾಗರಿಕರ ಸೈಬರ್ ಕವಚ • ಹ್ಯಾಕ್ಯುರಿಟಿ ೨೦೨೬",
    learn_heading: "ಯುಪಿಐ ಸುರಕ್ಷಿತವಾಗಿ ಕಲಿಯಿರಿ",
    learn_subheading: "ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಆರಂಭಿಕ ಬಳಕೆದಾರರು ಡಿಜಿಟಲ್ ಪಾವತಿಗಳನ್ನು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಕಲಿಯಲು ಸರಳ, ಹಂತ-ಹಂತದ ಇಂಟರಾಕ್ಟಿವ್ ಮಾರ್ಗದರ್ಶಿ.",
    learn_educational_notice: "ಶೈಕ್ಷಣಿಕ ಅಭ್ಯಾಸ ಮಾರ್ಗದರ್ಶಿ: ಇದು ಶೈಕ್ಷಣಿಕ ಉದ್ದೇಶಕ್ಕಾಗಿ ಮಾತ್ರ, ನೈಜ ಬ್ಯಾಂಕಿಂಗ್ ಆ್ಯಪ್ ಅಲ್ಲ. ನಾವು ಎಂದಿಗೂ ನಿಜವಾದ ಯುಪಿಐ ಪಿನ್, ಒಟಿಪಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ ಅಥವಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.",
    learn_tab_1: "೧. ಯುಪಿಐ ಎಂದರೇನು?",
    learn_tab_2: "೨. ಪಾವತಿ ಮಾಡುವುದು ಹೇಗೆ",
    learn_tab_3: "೩. ಪಿನ್ ಹೊಂದಿಸುವುದು / ಬದಲಿಸುವುದು",
    learn_tab_4: "೪. ಯುಪಿಐ ಪಿನ್ ಸುರಕ್ಷತೆ",
    learn_tab_5: "೫. ಬಯೋಮೆಟ್ರಿಕ್ ಸುರಕ್ಷತೆ",
    learn_tab_6: "೬. ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಮತ್ತು ಕ್ಯೂಆರ್ ವಂಚನೆ",
    learn_tab_quiz: "🎯 ಜ್ಞಾನ ಪರೀಕ್ಷೆ",
    btn_prev_section: "⬅ ಹಿಂದಿನ ವಿಭಾಗ",
    btn_next_section: "ಮುಂದಿನ ವಿಭಾಗ ➡",
    btn_read_section: "🔊 ಈ ವಿಭಾಗವನ್ನು ಓದಿ ಕೇಳಿಸಿ",
    btn_stop_reading: "⏹️ ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    btn_play_demo: "▶️ ಡೆಮೊ ವೀಡಿಯೊ ಪ್ಲೇ ಮಾಡಿ",
    btn_pause_demo: "⏸️ ವಿರಾಮ",
    btn_restart_demo: "🔄 ಮೊದಲಿನಿಂದ ನೋಡಿ",
    transcript_heading: "📝 ವೀಡಿಯೊ ಪಠ್ಯ ಪ್ರತಿ ಮತ್ತು ವಿವರಣೆ",
    demo_simulation_label: "🏷️ ಶೈಕ್ಷಣಿಕ ಡೆಮೊ ಮಾತ್ರ — ನೈಜ ಪಿನ್ ಎಂದಿಗೂ ನಮೂದಿಸಬೇಡಿ",
    quiz_heading: "🎯 ಹಿರಿಯರ ಸುರಕ್ಷತಾ ಜ್ಞಾನ ಪರೀಕ್ಷೆ",
    quiz_subheading: "ಈ ಸರಳ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಿ:",
    btn_submit_quiz: "ರಸಪ್ರಶ್ನೆ ಸಲ್ಲಿಸಿ",

    // Help Page
    help_heading: "ತುರ್ತು ಸಹಾಯ ಮತ್ತು ಸೈಬರ್ ದೂರು",
    help_subheading: "ತಪ್ಪಿ ಒಟಿಪಿ ಹಂಚಿಕೊಂಡಿದ್ದರೆ ಅಥವಾ ಹಣ ವರ್ಗಾಯಿಸಿದ್ದರೆ, ತಕ್ಷಣ ಈ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ.",
    emergency_title: "ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಂ ವರದಿ ಸಹಾಯವಾಣಿ",
    emergency_dial_desc: "ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ೨೪x೭ ಉಚಿತ ಸೈಬರ್ ಸಹಾಯವಾಣಿ",
    official_portal_label: "ಅಧಿಕೃತ ಸೈಬರ್ ದೂರು ಪೋರ್ಟಲ್:",

    // Footer
    footer_hackathon: "ಹ್ಯಾಕ್ಯುರಿಟಿ ೨೦೨೬ ಹ್ಯಾಕಥಾನ್‌ಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ | ಹಿರಿಯ ನಾಗರಿಕರ ಸುರಕ್ಷತೆಗಾಗಿ ಸಮರ್ಪಣೆ",
    footer_disclaimer: "ಕೇವಲ ಶೈಕ್ಷಣಿಕ ಯೋಜನೆ. ನಾವು ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಸಂದೇಶಗಳು, ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು ಅಥವಾ ಗೌಪ್ಯ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.",
  },

  // ==========================================
  // 3. HINDI (hi - हिंदी)
  // ==========================================
  hi: {
    // Top Bar & Controls
    text_size: "अक्षर का आकार:",
    high_contrast: "हाई कंट्रास्ट",
    normal_contrast: "सामान्य मोड",
    emergency_call: "🚨 आपातकालीन: 1930",
    choose_language_title: "अपनी भाषा चुनें / Choose Your Language",
    choose_language_subtitle: "अपनी पसंदीदा भाषा चुनें। आप इसे कभी भी बदल सकते हैं।",
    language_label: "भाषा:",

    // Voice Assistant Bar
    voice_assistant: "आवाज सहायक (Voice Assistant)",
    voice_tagline: "शांत, सरल ऑडियो निर्देश",
    read_aloud: "🔊 बोलकर सुनाएं",
    repeat_voice: "🔁 दोहराएं",
    stop_speaking: "⏹️ आवाज रोकें",
    speaking_active: "बोल रहा है...",
    voice_not_supported: "इस ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है।",

    // Brand & Navigation
    brand_title: "ईज़ी पे — सेफ़ पे",
    brand_tagline: "रुकें. जांचें. सुरक्षित रहें.",
    nav_home: "होम",
    nav_checker: "संदेश जांचें",
    nav_coach: "स्कैम सेफ्टी कोच",
    nav_simulator: "यूपीआई अभ्यास",
    nav_learn: "सुरक्षा सीखें",
    nav_help: "आपातकालीन सहायता",
    nav_login: "लॉगिन",
    nav_logout: "लॉगआउट",
    nav_welcome_user: "स्वागत है, वरिष्ठ सदस्य",
    back_to_home: "← होम पर वापस जाएं",

    // Login Page
    login_heading: "वरिष्ठ नागरिक सुरक्षित लॉगिन",
    login_welcome: "ईज़ी पे — सेफ़ पे में आपका स्वागत है। सुरक्षित रूप से जारी रखने के लिए कृपया अपना विवरण दर्ज करें।",
    login_instructions_text: "स्वागत है! कृपया ऊपर अपनी पसंदीदा भाषा चुनें। फिर नीचे अपना उपयोगकर्ता नाम या 10 अंकों का मोबाइल नंबर और पासवर्ड दर्ज करें। हम कभी भी आपका यूपीआई पिन या बैंकिंग पासवर्ड नहीं मांगते।",
    login_username_label: "उपयोगकर्ता नाम या मोबाइल नंबर:",
    login_username_placeholder: "उपयोगकर्ता नाम या 10 अंकों का मोबाइल दर्ज करें",
    login_password_label: "पासवर्ड या पिन:",
    login_password_placeholder: "अपना पासवर्ड दर्ज करें",
    btn_login: "लॉगिन करें →",
    btn_register: "नया खाता बनाएं / पंजीकरण",
    link_forgot_pwd: "पासवर्ड भूल गए? सहायता चाहिए?",
    login_safety_tip: "सुरक्षा चेतावनी: हम कभी भी आपका लॉगिन पासवर्ड या यूपीआई पिन मांगने के लिए कॉल या संदेश नहीं भेजते।",
    login_voice_instruction: "मदद चाहिए? अपनी चुनी हुई भाषा में मार्गदर्शन सुनने के लिए 'निर्देश बोलकर सुनाएं' पर क्लिक करें।",
    btn_read_instructions: "🔊 निर्देश बोलकर सुनाएं",
    btn_stop_instructions: "⏹️ आवाज रोकें",
    validation_empty_user: "कृपया अपना उपयोगकर्ता नाम या मोबाइल नंबर दर्ज करें।",
    validation_empty_pwd: "कृपया अपना पासवर्ड या पिन दर्ज करें।",
    validation_success: "लॉगिन सफल! मुख्य पृष्ठ पर भेजा जा रहा है...",
    login_emergency_help: "🚨 क्या आपके साथ साइबर धोखाधड़ी हुई है? 1930 सहायता के लिए यहां क्लिक करें",
    register_title: "नया सेफ़पे खाता बनाएं",
    register_desc: "वरिष्ठ नागरिकों के लिए आसान और सुरक्षित पंजीकरण। किसी बैंक विवरण की आवश्यकता नहीं।",
    register_name_label: "आपका पूरा नाम:",
    register_name_placeholder: "अपना नाम दर्ज करें (उदा. रमेश शर्मा)",
    btn_submit_register: "मेरा खाता बनाएं →",
    btn_back_to_login: "← लॉगिन पर वापस जाएं",
    forgot_pwd_title: "वरिष्ठों के लिए पासवर्ड सहायता",
    forgot_pwd_desc: "यदि आप पासवर्ड भूल गए हैं तो चिंता न करें! आपके पंजीकृत फोन पर एक रिकवरी कोड भेजा जाएगा। याद रखें: बैंक प्रबंधक कभी भी यह कोड फोन पर नहीं मांगते।",
    btn_close: "बंद करें",

    // Home Page Hero
    hero_badge: "हैकरिटी 2026 — वरिष्ठ नागरिक साइबर सुरक्षा कवच",
    hero_title: "पैसा कटने से पहले सुरक्षित डिजिटल भुगतान सीखें।",
    hero_desc: "वरिष्ठ नागरिकों और नए उपयोगकर्ताओं के लिए यूपीआई का सुरक्षित उपयोग करने और ऑनलाइन धोखाधड़ी पहचानने का आसान मार्गदर्शक।",
    btn_start_practice: "🎯 स्कैम कोच शुरू करें",
    btn_check_sms: "🔍 संदिग्ध संदेश जांचें",

    // Golden Rules
    golden_rules_title: "⭐ प्रत्येक वरिष्ठ नागरिक को याद रखने योग्य 3 सुनहरे नियम",
    rule_1_title: "यूपीआई पिन केवल पैसा भेजने के लिए है",
    rule_1_desc: "यूपीआई पिन डालने से आपके खाते से पैसे कटते हैं। पैसा प्राप्त करने के लिए कभी भी पिन नहीं डाला जाता।",
    rule_2_title: "बैंक कभी भी ओटीपी या पासवर्ड नहीं मांगते",
    rule_2_desc: "कोई भी बैंक प्रबंधक, पुलिस अधिकारी या टेलीकॉम कर्मचारी आपका एसएमएस ओटीपी या कार्ड विवरण नहीं मांग सकता।",
    rule_3_title: "एनीडेस्क (AnyDesk) कभी इंस्टॉल न करें",
    rule_3_desc: "यदि कोई कॉलर AnyDesk या TeamViewer ऐप डाउनलोड करने या स्क्रीन शेयर करने को कहे, तो तुरंत फोन काट दें।",

    // 5 Feature Cards
    card_checker_title: "संदेश जांचें",
    card_checker_desc: "कोई भी एसएमएस, व्हाट्सएप संदेश या लिंक यहां डालें। हमारा सिस्टम छिपे खतरे और नकली लिंक पकड़ता है।",
    btn_open_checker: "संदेश अभी जांचें →",

    card_coach_title: "स्कैम सेफ्टी कोच",
    card_coach_desc: "6 वास्तविक धोखाधड़ी स्थितियों का अभ्यास: नकली बैंक कॉल, डिजिटल अरेस्ट, लॉटरी और कलेक्ट रिक्वेस्ट।",
    btn_open_coach: "अभ्यास शुरू करें →",

    card_sim_title: "यूपीआई भुगतान अभ्यास",
    card_sim_desc: "बिना असली पैसे का सुरक्षित मोबाइल सिम्युलेटर। नाम जांचना और गलत रिक्वेस्ट अस्वीकार करना सीखें।",
    btn_open_sim: "यूपीआई अभ्यास करें →",

    card_learn_title: "डिजिटल सुरक्षा पाठ",
    card_learn_desc: "क्यूआर कोड, ओटीपी और ऑनलाइन धोखाधड़ी से बचने के आसान नियम और रोचक प्रश्नोत्तरी।",
    btn_open_learn: "पाठ देखें →",

    card_help_title: "आपातकालीन सहायता और रिपोर्टिंग",
    card_help_desc: "धोखाधड़ी की स्थिति में तत्काल उठाए जाने वाले कदम। राष्ट्रीय साइबर हेल्पलाइन 1930 और बैंक सहायता।",
    btn_open_help: "सहायता प्राप्त करें →",

    // Checker Page
    checker_heading: "संदेश और लिंक सुरक्षा चेकर",
    checker_subheading: "किसी भी संदेश को यहां पेस्ट करें। क्लिक करने से पहले चेतावनियों की जांच करें।",
    checker_input_label: "एसएमएस, व्हाट्सएप संदेश या वेबसाइट लिंक यहां पेस्ट करें:",
    checker_placeholder: "उदाहरण: प्रिय ग्राहक, आपका बिजली बिल बकाया है। आज रात बिजली कट जाएगी। कॉल करें 9845...",
    btn_mic_input: "🎙️ बोलकर संदेश दर्ज करें",
    btn_mic_listening: "सुन रहा है... बोलिए",
    btn_analyze: "🔍 संदेश की जांच करें",
    btn_clear: "साफ करें",
    sample_messages_label: "नमूना धोखाधड़ी संदेश आज़माएं:",
    sample_power: "⚡ बिजली बिल काटने का एसएमएस",
    sample_otp: "💳 बैंक ओटीपी मांग",
    sample_lottery: "🎁 केबीसी लॉटरी विजेता",
    sample_remote: "📱 एनीडेस्क स्क्रीन शेयर",
    sample_collect: "💸 ओएलएक्स पेमेंट कलेक्ट रिक्वेस्ट",
    sample_safe: "✅ सामान्य सुरक्षित संदेश",

    // Checker Results
    results_heading: "सुरक्षा विश्लेषण परिणाम",
    detected_signs: "पहचाने गए चेतावनी संकेत:",
    advice_heading: "आपको तुरंत क्या करना चाहिए:",
    btn_check_another: "दूसरा संदेश जांचें",
    btn_read_result: "🔊 परिणाम बोलकर सुनाएं",

    // Coach Page
    coach_heading: "व्यक्तिगत स्कैम सेफ्टी कोच",
    coach_subheading: "6 वास्तविक स्थितियों में सुरक्षित निर्णय लेने का व्यावहारिक अभ्यास करें।",
    coach_progress_label: "स्थिति",
    coach_score_label: "सुरक्षित निर्णय:",
    coach_question_prompt: "सबसे सुरक्षित निर्णय कौन सा है?",
    btn_try_again: "🔄 पुनः प्रयास करें",
    btn_next_scenario: "अगली स्थिति →",
    btn_finish_coach: "परिणाम सारांश देखें →",
    coach_summary_title: "प्रशिक्षण परिणाम सारांश",
    coach_summary_subtitle: "आपकी अभ्यास प्रगति रिपोर्ट:",
    btn_practice_again: "🔄 दोबारा अभ्यास करें",
    coach_disclaimer: "नोट: यह स्कोर अभ्यास सत्र के प्रदर्शन को दर्शाता है और केवल शैक्षिक जागरूकता के लिए है।",

    // UPI Simulator Page
    sim_heading: "सुरक्षित यूपीआई भुगतान सिम्युलेटर",
    sim_subheading: "नकली मोबाइल में अभ्यास करें। पैसा भेजने और प्राप्त करने के अंतर को समझें।",
    sim_badge_demo: "⚠️ केवल डेमो — कोई वास्तविक पैसा नहीं कटेगा। कोई पिन सहेजा नहीं जाता।",
    tab_send: "स्थिति 1: दुकानदार को भुगतान",
    tab_collect: "स्थिति 2: नकली कलेक्ट रिक्वेस्ट जाल",
    tab_qr: "स्थिति 3: क्यूआर कोड सुरक्षा",
    btn_verify_pay: "सुरक्षित भुगतान करें",
    btn_decline_request: "❌ अस्वीकार करें (सुरक्षित)",
    btn_approve_trap: "⚠️ स्वीकार करें (खतरा)",
    sim_pin_instructions: "ध्यान दें: केवल तभी यूपीआई पिन डालें जब पैसा आपके खाते से बाहर जा रहा हो।",

    // Learn Page
    learn_heading: "डिजिटल सुरक्षा ज्ञान केंद्र",
    learn_subheading: "अपनी मेहनत की कमाई की रक्षा करने के आसान नियम।",
    quiz_heading: "🎯 वरिष्ठ सुरक्षा प्रश्नोत्तरी",
    quiz_subheading: "इन 5 आसान सवालों के साथ अपने ज्ञान की जांच करें:",
    btn_submit_quiz: "प्रश्नोत्तरी सबमिट करें",

    // Help Page
    help_heading: "आपातकालीन सहायता और साइबर रिपोर्टिंग",
    help_subheading: "यदि गलती से ओटीपी साझा हो गया है या पैसे कट गए हैं, तो तुरंत ये कदम उठाएं।",
    emergency_title: "राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन",
    emergency_dial_desc: "भारत सरकार की 24x7 निःशुल्क राष्ट्रीय साइबर हेल्पलाइन",
    official_portal_label: "आधिकारिक साइबर अपराध पोर्टल:",

    // Footer
    footer_hackathon: "हैकरिटी 2026 के लिए निर्मित | वरिष्ठ नागरिकों की सुरक्षा को समर्पित",
    footer_disclaimer: "केवल शैक्षिक परियोजना। हम कोई व्यक्तिगत संदेश, बैंक खाता या गोपनीय डेटा एकत्र नहीं करते।",
  },

  // ==========================================
  // 4. TAMIL (ta - தமிழ்)
  // ==========================================
  ta: {
    // Top Bar & Controls
    text_size: "எழுத்து அளவு:",
    high_contrast: "உயர் மாறுபாடு",
    normal_contrast: "சாதாரண பயன்முறை",
    emergency_call: "🚨 அவசர உதவி: 1930",
    choose_language_title: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் / Choose Your Language",
    choose_language_subtitle: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். இதை நீங்கள் எப்போதும் மாற்றலாம்.",
    language_label: "மொழி:",

    // Voice Assistant Bar
    voice_assistant: "குரல் உதவியாளர் (Voice Assistant)",
    voice_tagline: "அமைதியான எளிய ஒலி வழிகாட்டுதல்",
    read_aloud: "🔊 உரக்கப் படிக்கவும்",
    repeat_voice: "🔁 மீண்டும் சொல்",
    stop_speaking: "⏹️ பேச்சை நிறுத்து",
    speaking_active: "பேசுகிறது...",
    voice_not_supported: "இந்த உலாவியில் குரல் வசதி இல்லை.",

    // Brand & Navigation
    brand_title: "ஈஸி பே — சேஃப் பே",
    brand_tagline: "சற்று நில்லுங்கள். சரிபாருங்கள். பாதுகாப்பாய் இருங்கள்.",
    nav_home: "முகப்பு",
    nav_checker: "செய்தியை சரிபார்க்கவும்",
    nav_coach: "மோசடி பாதுகாப்பு பயிற்சியாளர்",
    nav_simulator: "யுபிஐ பயிற்சி",
    nav_learn: "பாதுகாப்பு கற்க",
    nav_help: "அவசர உதவி",
    nav_login: "உள்நுழை",
    nav_logout: "வெளியேறு",
    nav_welcome_user: "வரவேற்கிறோம், மூத்த உறுப்பினர்",
    back_to_home: "← முகப்புக்குத் திரும்பு",

    // Login Page
    login_heading: "மூத்த குடிமக்கள் பாதுகாப்பான உள்நுழைவு",
    login_welcome: "ஈஸி பே — சேஃப் பே-க்கு வரவேற்கிறோம். தொடர உங்கள் விவரங்களை உள்ளிடவும்.",
    login_instructions_text: "வரவேற்கிறோம்! மேலே உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். பின்னர் உங்கள் பயனர்பெயர் அல்லது மொபைல் எண் மற்றும் கடவுச்சொல்லை உள்ளிடவும். உங்கள் யுபிஐ பின்னை நாங்கள் ஒருபோதும் கேட்க மாட்டோம்.",
    login_username_label: "பயனர்பெயர் அல்லது மொபைல் எண்:",
    login_username_placeholder: "பயனர்பெயர் அல்லது 10 இலக்க மொபைல் எண்",
    login_password_label: "கடவுச்சொல் அல்லது பின்:",
    login_password_placeholder: "கடவுச்சொல்லை உள்ளிடவும்",
    btn_login: "உள்நுழைக →",
    btn_register: "புதிய கணக்கு உருவாக்கு / பதிவுசெய்",
    link_forgot_pwd: "கடவுச்சொல் மறந்துவிட்டதா? உதவி தேவையா?",
    login_safety_tip: "பாதுகாப்பு நினைவூட்டல்: உங்கள் கடவுச்சொல் அல்லது யுபிஐ பின்னை நாங்கள் ஒருபோதும் போனில் கேட்க மாட்டோம்.",
    login_voice_instruction: "உதவி தேவையா? உங்கள் மொழியில் கேட்க 'வழிமுறைகளை உரக்கப் படிக்கவும்' என்பதை கிளிக் செய்யவும்.",
    btn_read_instructions: "🔊 வழிமுறைகளை உரக்கப் படிக்கவும்",
    btn_stop_instructions: "⏹️ பேச்சை நிறுத்து",
    validation_empty_user: "தயவுசெய்து உங்கள் பயனர்பெயர் அல்லது மொபைல் எண்ணை உள்ளிடவும்.",
    validation_empty_pwd: "தயவுசெய்து உங்கள் கடவுச்சொல்லை உள்ளிடவும்.",
    validation_success: "உள்நுழைவு வெற்றிகரமானது! முகப்புக்கு செல்கிறது...",
    login_emergency_help: "🚨 இணைய மோசடியா? 1930 உதவிக்கு இங்கே கிளிக் செய்யவும்",
    register_title: "புதிய சேஃப்பே கணக்கை உருவாக்கவும்",
    register_desc: "மூத்தவர்களுக்கான எளிய மற்றும் பாதுகாப்பான பதிவு. வங்கி விவரங்கள் தேவையில்லை.",
    register_name_label: "உங்கள் முழுப் பெயர்:",
    register_name_placeholder: "உங்கள் பெயரை உள்ளிடவும் (எ.கா. ரமேஷ்)",
    btn_submit_register: "கணக்கை உருவாக்கு →",
    btn_back_to_login: "← உள்நுழைவுக்குத் திரும்பு",
    forgot_pwd_title: "கடவுச்சொல் மீட்பு உதவி",
    forgot_pwd_desc: "கடவுச்சொல் மறந்துவிட்டால் கவலைப்பட வேண்டாம்! உங்கள் தொலைபேசி எண்ணிற்கு மீட்புக் குறியீடு அனுப்பப்படும். வங்கி மேலாளர்கள் இதை ஒருபோதும் கேட்க மாட்டார்கள்.",
    btn_close: "மூடு",

    // Home Page Hero
    hero_badge: "ஹேக்குரிட்டி 2026 — மூத்த குடிமக்கள் இணையப் பாதுகாப்பு கவசம்",
    hero_title: "பணம் பரிமாறும் முன் பாதுகாப்பான டிஜிட்டல் பரிவர்த்தனை கற்க.",
    hero_desc: "மூத்த குடிமக்கள் யுபிஐ-ஐ அச்சமின்றி பயன்படுத்தவும் மோசடிகளை அடையாளம் காணவும் எளிய வழிகாட்டி.",
    btn_start_practice: "🎯 பயிற்சியாளரைத் தொடங்கு",
    btn_check_sms: "🔍 சந்தேகத்திற்கிடமான செய்தியைச் சரிபார்",

    // Golden Rules
    golden_rules_title: "⭐ ஒவ்வொரு மூத்தவரும் நினைவில் கொள்ள வேண்டிய 3 பொன்னான விதிகள்",
    rule_1_title: "யுபிஐ பின் பணம் அனுப்ப மட்டுமே",
    rule_1_desc: "யுபிஐ பின் உள்ளிட்டால் உங்கள் கணக்கிலிருந்து பணம் கழியும். பணம் பெற பின் தேவையில்லை.",
    rule_2_title: "வங்கிகள் ஒருபோதும் ஓடிபி கேட்காது",
    rule_2_desc: "எந்த வங்கி அதிகாரியோ அல்லது போலீசோ உங்கள் ஓடிபி அல்லது கடவுச்சொல்லைக் கேட்க முடியாது.",
    rule_3_title: "AnyDesk செயலியைப் பதிவிறக்க வேண்டாம்",
    rule_3_desc: "யாராவது AnyDesk பதிவிறக்கச் சொன்னால் உடனடியாக அழைப்பைத் துண்டிக்கவும்.",

    // 5 Feature Cards
    card_checker_title: "செய்தியை சரிபார்க்கவும்",
    card_checker_desc: "எஸ்எம்எஸ் அல்லது வாட்ஸ்அப் செய்தியை உள்ளிட்டு மறைக்கப்பட்ட ஆபத்துகளைக் கண்டறியவும்.",
    btn_open_checker: "செய்தியைச் சரிபார் →",

    card_coach_title: "மோசடி பாதுகாப்பு பயிற்சியாளர்",
    card_coach_desc: "6 நிஜ மோசடி சூழ்நிலைகளில் பாதுகாப்பான முடிவெடுக்கும் பயிற்சி.",
    btn_open_coach: "பயிற்சி தொடங்க →",

    card_sim_title: "யுபிஐ பயிற்சி சிமுலேட்டர்",
    card_sim_desc: "உண்மை பணம் இல்லாத பாதுகாப்பான மொபைல் மாதிரி பயிற்சி.",
    btn_open_sim: "பயிற்சி செய்க →",

    card_learn_title: "டிஜிட்டல் பாதுகாப்பு பாடங்கள்",
    card_learn_desc: "கியூஆர் குறியீடு மற்றும் ஓடிபி பாதுகாப்பிற்கான எளிய வழிகாட்டுதல்.",
    btn_open_learn: "பாடங்களைப் பார்க்க →",

    card_help_title: "அவசர உதவி மற்றும் புகார்",
    card_help_desc: "மோசடி நடந்தால் உடனடியாக எடுக்க வேண்டிய நடவடிக்கைகள் மற்றும் 1930 உதவி.",
    btn_open_help: "அவசர உதவி பெறு →",

    // Checker Page
    checker_heading: "சந்தேகத்திற்கிடமான செய்தி சரிபார்ப்பான்",
    checker_subheading: "உங்களுக்கு வந்த செய்தியை இங்கே ஒட்டவும். கிளிக் செய்வதற்கு முன் சரிபார்க்கவும்.",
    checker_input_label: "செய்தி அல்லது இணைய இணைப்பை இங்கே ஒட்டவும்:",
    checker_placeholder: "உதாரணம்: உங்கள் மின்சாரக் கட்டணம் செலுத்தப்படவில்லை. இன்றிரவு மின்சாரம் துண்டிக்கப்படும்...",
    btn_mic_input: "🎙️ பேசி உள்ளிடவும்",
    btn_mic_listening: "கேட்கிறது... பேசுங்கள்",
    btn_analyze: "🔍 செய்தியைச் சரிபார்",
    btn_clear: "அழி",
    sample_messages_label: "மாதிரி மோசடி செய்திகளை முயற்சிக்கவும்:",
    sample_power: "⚡ மின்சாரத் துண்டிப்பு எஸ்எம்எஸ்",
    sample_otp: "💳 வங்கி ஓடிபி கோரிக்கை",
    sample_lottery: "🎁 கேபிசி லாட்டரி பரிசு",
    sample_remote: "📱 AnyDesk ஸ்கிரீன் ஷேரிங்",
    sample_collect: "💸 OLX பணக் கோரிக்கை",
    sample_safe: "✅ பாதுகாப்பான செய்தி",

    // Checker Results
    results_heading: "பாதுகாப்பு பகுப்பாய்வு முடிவு",
    detected_signs: "கண்டறியப்பட்ட எச்சரிக்கை அறிகுறிகள்:",
    advice_heading: "நீங்கள் செய்ய வேண்டியவை:",
    btn_check_another: "மற்றொரு செய்தியைச் சரிபார்",
    btn_read_result: "🔊 முடிவை உரக்கப் படிக்கவும்",

    // Coach Page
    coach_heading: "தனிப்பட்ட மோசடி பாதுகாப்பு பயிற்சியாளர்",
    coach_subheading: "6 நிஜ மோசடி சூழ்நிலைகளில் முடிவுகளைச் சோதிக்கவும்.",
    coach_progress_label: "சூழ்நிலை",
    coach_score_label: "பாதுகாப்பான முடிவுகள்:",
    coach_question_prompt: "மிகவும் பாதுகாப்பான முடிவு எது?",
    btn_try_again: "🔄 மீண்டும் முயற்சிக்கவும்",
    btn_next_scenario: "அடுத்த சூழ்நிலை →",
    btn_finish_coach: "சுருக்கத்தைப் பார்க்க →",
    coach_summary_title: "பயிற்சி முடிவுச் சுருக்கம்",
    coach_summary_subtitle: "உங்கள் பயிற்சி முன்னேற்ற அறிக்கை:",
    btn_practice_again: "🔄 மீண்டும் பயிற்சி செய்",
    coach_disclaimer: "குறிப்பு: இது கல்வி நோக்கத்திற்கான மாதிரி பயிற்சி மட்டுமே.",

    // UPI Simulator Page
    sim_heading: "பாதுகாப்பான யுபிஐ பயிற்சி சிமுலேட்டர்",
    sim_subheading: "பணம் செலுத்துவதற்கும் பெறுவதற்கும் உள்ள வித்தியாசத்தைக் கற்றுக் கொள்ளுங்கள்.",
    sim_badge_demo: "⚠️ மாதிரி மட்டுமே — உண்மையான பணம் எதுவும் மாறாது.",
    tab_send: "சூழ்நிலை 1: கடைக்கு பணம் செலுத்துதல்",
    tab_collect: "சூழ்நிலை 2: போலி பணக் கோரிக்கை வலை",
    tab_qr: "சூழ்நிலை 3: கியூஆர் குறியீடு பாதுகாப்பு",
    btn_verify_pay: "பணம் செலுத்துங்கள்",
    btn_decline_request: "❌ நிராகரி (பாதுகாப்பானது)",
    btn_approve_trap: "⚠️ ஏற்றுக்கொள் (ஆபத்து)",
    sim_pin_instructions: "கவனம்: கணக்கிலிருந்து பணம் வெளியேறும்போது மட்டுமே பின்னை உள்ளிட வேண்டும்.",

    // Learn Page
    learn_heading: "டிஜிட்டல் பாதுகாப்பு கற்றல் மையம்",
    learn_subheading: "சேமிப்பைப் பாதுகாக்க எளிய செய்ய வேண்டியவை மற்றும் செய்யக்கூடாதவை.",
    quiz_heading: "🎯 மூத்தோர் பாதுகாப்பு வினாடி வினா",
    quiz_subheading: "இந்த 5 எளிய கேள்விகளுடன் உங்கள் அறிவை சோதிக்கவும்:",
    btn_submit_quiz: "சமர்ப்பி",

    // Help Page
    help_heading: "அவசர உதவி மற்றும் புகார் வழிகாட்டி",
    help_subheading: "ஓடிபி பகிர்ந்தாலோ பணம் இழந்தாலோ உடனடியாக இந்த வழிமுறைகளைப் பின்பற்றவும்.",
    emergency_title: "தேசிய இணையக் குற்றப் புகாரளிப்பு உதவி எண்",
    emergency_dial_desc: "இந்திய அரசின் 24x7 இலவச அவசர உதவி எண் 1930",
    official_portal_label: "அதிகாரப்பூர்வ இணைய போர்டல்:",

    // Footer
    footer_hackathon: "ஹேக்குரிட்டி 2026-க்காக உருவாக்கப்பட்டது | மூத்த குடிமக்களின் பாதுகாப்பிற்காக",
    footer_disclaimer: "கல்வித் திட்டம் மட்டுமே. நாங்கள் எந்த தனிப்பட்ட தகவல்களையும் சேமிப்பதில்லை.",
  },

  // ==========================================
  // 5. TELUGU (te - తెలుగు)
  // ==========================================
  te: {
    // Top Bar & Controls
    text_size: "అక్షర పరిమాణం:",
    high_contrast: "హై కాంట్రాస్ట్",
    normal_contrast: "సాధారణ మోడ్",
    emergency_call: "🚨 అత్యవసర సహాయం: 1930",
    choose_language_title: "మీ భాషను ఎంచుకోండి / Choose Your Language",
    choose_language_subtitle: "మీకు అనుకూలమైన భాషను ఎంచుకోండి. దీన్ని ఎప్పుడైనా మార్చుకోవచ్చు.",
    language_label: "భాష:",

    // Voice Assistant Bar
    voice_assistant: "వాయిస్ అసిస్టెంట్ (Voice Assistant)",
    voice_tagline: "ప్రశాంతమైన ఆడియో సూచనలు",
    read_aloud: "🔊 చదివి వినిపించండి",
    repeat_voice: "🔁 పునరావృతం చేయండి",
    stop_speaking: "⏹️ మాట్లాడటం ఆపండి",
    speaking_active: "మాట్లాడుతోంది...",
    voice_not_supported: "ఈ బ్రౌజర్‌లో వాయిస్ సదుపాయం లేదు.",

    // Brand & Navigation
    brand_title: "ఈజీ పే — సేఫ్ పే",
    brand_tagline: "కాసేపు ఆగండి. తనిఖీ చేయండి. సురక్షితంగా ఉండండి.",
    nav_home: "హోమ్",
    nav_checker: "సందేశాన్ని తనిఖీ చేయండి",
    nav_coach: "స్కామ్ సేఫ్టీ కోచ్",
    nav_simulator: "యూపీఐ సాధన",
    nav_learn: "భద్రత నేర్చుకోండి",
    nav_help: "అత్యవసర సహాయం",
    nav_login: "లాగిన్",
    nav_logout: "లాగౌట్",
    nav_welcome_user: "స్వాగతం, సీనియర్ సభ్యులు",
    back_to_home: "← హోమ్‌కి తిరిగి వెళ్ళండి",

    // Login Page
    login_heading: "సీనియర్ సిటిజన్ సురక్షిత లాగిన్",
    login_welcome: "ఈజీ పే — సేఫ్ పేకి స్వాగతం. కొనసాగడానికి మీ వివరాలను నమోదు చేయండి.",
    login_instructions_text: "స్వాగతం! దయచేసి పైన మీ భాషను ఎంచుకోండి. ఆపై మీ యూజర్‌నేమ్ లేదా మొబైల్ నంబర్ మరియు పాస్‌వర్డ్ నమోదు చేయండి. మేము మీ యూపీఐ పిన్ ఎప్పుడూ అడగము.",
    login_username_label: "వినియోగదారు పేరు లేదా మొబైల్ నంబర్:",
    login_username_placeholder: "వినియోగదారు పేరు లేదా 10 అంకెల మొబైల్",
    login_password_label: "పాస్‌వర్డ్ లేదా పిన్:",
    login_password_placeholder: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
    btn_login: "లాగిన్ చేయండి →",
    btn_register: "కొత్త ఖాతాను సృష్టించండి / నమోదు",
    link_forgot_pwd: "పాస్‌వర్డ్ మర్చిపోయారా? సహాయం కావాలా?",
    login_safety_tip: "భద్రతా సూచన: మీ లాగిన్ పాస్‌వర్డ్ లేదా యూపీఐ పిన్ అడగడానికి మేము ఎప్పుడూ కాల్ లేదా మెసేజ్ చేయము.",
    login_voice_instruction: "సహాయం కావాలా? సూచనలను వినడానికి 'సూచనలను బిగ్గరగా చదవండి' బటన్ నొక్కండి.",
    btn_read_instructions: "🔊 సూచనలను బిగ్గరగా చదవండి",
    btn_stop_instructions: "⏹️ మాట్లాడటం ఆపండి",
    validation_empty_user: "దయచేసి మీ వినియోగదారు పేరు లేదా మొబైల్ నంబర్ నమోదు చేయండి.",
    validation_empty_pwd: "దయచేసి మీ పాస్‌వర్డ్ నమోదు చేయండి.",
    validation_success: "లాగిన్ విజయవంతమైంది! హోమ్‌కి వెళ్తున్నారు...",
    login_emergency_help: "🚨 సైబర్ మోసానికి గురయ్యారా? 1930 సహాయం కోసం ఇక్కడ క్లిక్ చేయండి",
    register_title: "కొత్త సేఫ్‌పే ఖాతా తెరవండి",
    register_desc: "సీనియర్లకు సులభమైన సురక్షిత నమోదు. బ్యాంక్ వివరాలు అవసరం లేదు.",
    register_name_label: "మీ పూర్తి పేరు:",
    register_name_placeholder: "మీ పేరు నమోదు చేయండి (ఉదా: రమేష్ రావు)",
    btn_submit_register: "ఖాతాను సృష్టించండి →",
    btn_back_to_login: "← లాగిన్‌కి తిరిగి వెళ్లండి",
    forgot_pwd_title: "పాస్‌వర్డ్ రికవరీ సహాయం",
    forgot_pwd_desc: "పాస్‌వర్డ్ మర్చిపోతే ఆందోళన చెందకండి! మీ రిజిస్టర్డ్ ఫోన్‌కి రికవరీ కోడ్ పంపబడుతుంది. బ్యాంక్ మేనేజర్లు దీన్ని ఎప్పుడూ అడగరు.",
    btn_close: "మూసివేయండి",

    // Home Page Hero
    hero_badge: "హ్యాక్యురిటీ 2026 — సీనియర్ సిటిజన్ సైబర్ రక్షణ కవచం",
    hero_title: "డబ్బు బదిలీకి ముందే సురక్షిత డిజిటల్ చెల్లింపులు నేర్చుకోండి.",
    hero_desc: "సీనియర్ సిటిజన్లు యూపీఐని ధైర్యంగా ఉపయోగించడానికి మరియు ఆన్‌లైన్ మోసాలను గుర్తించడానికి సులభమైన గైడ్.",
    btn_start_practice: "🎯 స్కామ్ కోచ్ ప్రారంభించండి",
    btn_check_sms: "🔍 అనుమానాస్పద మెసేజ్ తనిఖీ చేయండి",

    // Golden Rules
    golden_rules_title: "⭐ ప్రతి సీనియర్ గుర్తుంచుకోవలసిన 3 సువర్ణ నియమాలు",
    rule_1_title: "యూపీఐ పిన్ డబ్బు పంపడానికి మాత్రమే",
    rule_1_desc: "యూపీఐ పిన్ నమోదు చేస్తే మీ ఖాతా నుండి డబ్బు కట్ అవుతుంది. డబ్బు స్వీకరించడానికి పిన్ అవసరం లేదు.",
    rule_2_title: "బ్యాంకులు ఎప్పుడూ ఓటీపీ అడగవు",
    rule_2_desc: "ఏ బ్యాంక్ మేనేజర్ లేదా పోలీసు మీ ఓటీపీ లేదా పాస్‌వర్డ్ అడిగే అధికారం లేదు.",
    rule_3_title: "AnyDesk యాప్ ఎప్పుడూ ఇన్‌స్టాల్ చేయవద్దు",
    rule_3_desc: "ఎవరైనా AnyDesk లేదా TeamViewer డౌన్‌లోడ్ చేయమంటే వెంటనే కాల్ కట్ చేయండి.",

    // 5 Feature Cards
    card_checker_title: "సందేశాన్ని తనిఖీ చేయండి",
    card_checker_desc: "అనుమానాస్పద ఎస్ఎంఎస్ లేదా లింక్‌ను ఇక్కడ వేసి ప్రమాదాలను తనిఖీ చేయండి.",
    btn_open_checker: "ఇప్పుడే తనిఖీ చేయండి →",

    card_coach_title: "స్కామ్ సేఫ్టీ కోచ్",
    card_coach_desc: "6 వాస్తవ మోసపూరిత పరిస్థితులలో సరైన నిర్ణయం తీసుకునే సాధన.",
    btn_open_coach: "సాధన ప్రారంభించండి →",

    card_sim_title: "యూపీఐ చెల్లింపు సాధన",
    card_sim_desc: "నిజమైన డబ్బు లేని సురక్షిత మొబైల్ సిమ్యులేటర్.",
    btn_open_sim: "సాధన చేయండి →",

    card_learn_title: "డిజిటల్ భద్రతా పాఠాలు",
    card_learn_desc: "క్యూఆర్ కోడ్ మరియు ఓటీపీ భద్రతకు సులభమైన చేయవలసినవి మరియు చేయకూడనివి.",
    btn_open_learn: "పాఠాలను చూడండి →",

    card_help_title: "అత్యవసర సహాయం & ఫిర్యాదు",
    card_help_desc: "మోసం జరిగినప్పుడు వెంటనే తీసుకోవాల్సిన చర్యలు మరియు 1930 హెల్ప్‌లైన్.",
    btn_open_help: "సహాయం పొందండి →",

    // Checker Page
    checker_heading: "సందేశం & లింక్ భద్రతా తనిఖీ",
    checker_subheading: "మీకు వచ్చిన సందేశాన్ని ఇక్కడ అతికించండి. క్లిక్ చేసే ముందు తనిఖీ చేయండి.",
    checker_input_label: "ఎస్ఎంఎస్ లేదా వెబ్ లింక్‌ను ఇక్కడ అతికించండి:",
    checker_placeholder: "ఉదాహరణ: మీ విద్యుత్ బిల్లు చెల్లించలేదు. ఈ రాత్రి కరెంట్ కట్ అవుతుంది...",
    btn_mic_input: "🎙️ మాట్లాడి నమోదు చేయండి",
    btn_mic_listening: "వింటోంది... మాట్లాడండి",
    btn_analyze: "🔍 సందేశాన్ని తనిఖీ చేయండి",
    btn_clear: "క్లియర్ చేయండి",
    sample_messages_label: "నమూనా మోసపూరిత సందేశాలను పరీక్షించండి:",
    sample_power: "⚡ విద్యుత్ కట్ ఎస్ఎంఎస్",
    sample_otp: "💳 బ్యాంక్ ఓటీపీ అభ్యర్థన",
    sample_lottery: "🎁 కేబీసీ లాటరీ బహుమతి",
    sample_remote: "📱 AnyDesk స్క్రీన్ షేర్",
    sample_collect: "💸 OLX డబ్బు కలెక్ట్ అభ్యర్థన",
    sample_safe: "✅ సురక్షితమైన సందేశం",

    // Checker Results
    results_heading: "భద్రతా విశ్లేషణ ఫలితం",
    detected_signs: "గుర్తించిన హెచ్చరిక సంకేతాలు:",
    advice_heading: "మీరు తీసుకోవాల్సిన చర్యలు:",
    btn_check_another: "మరొక సందేశాన్ని తనిఖీ చేయండి",
    btn_read_result: "🔊 ఫలితాన్ని చదివి వినిపించండి",

    // Coach Page
    coach_heading: "వ్యక్తిగత స్కామ్ సేఫ్టీ కోచ్",
    coach_subheading: "6 వాస్తవ పరిస్థితులలో సరైన నిర్ణయం తీసుకోవడం నేర్చుకోండి.",
    coach_progress_label: "పరిస్థితి",
    coach_score_label: "సురక్షిత నిర్ణయాలు:",
    coach_question_prompt: "అత్యంత సురక్షితమైన నిర్ణయం ఏది?",
    btn_try_again: "🔄 మళ్లీ ప్రయత్నించండి",
    btn_next_scenario: "తదుపరి పరిస్థితి →",
    btn_finish_coach: "సారాంశం చూడండి →",
    coach_summary_title: "సాధన ఫలితాల సారాంశం",
    coach_summary_subtitle: "మీ సాధన పురోగతి నివేదిక:",
    btn_practice_again: "🔄 మళ్లీ సాధన చేయండి",
    coach_disclaimer: "గమనిక: ఇది కేవలం అవగాహన కోసం రూపొందించిన నమూనా సాధన మాత్రమే.",

    // UPI Simulator Page
    sim_heading: "సురక్షిత యూపీఐ ప్రాక్టీస్ సిమ్యులేటర్",
    sim_subheading: "డబ్బు పంపడం మరియు పొందడం మధ్య తేడాను తెలుసుకోండి.",
    sim_badge_demo: "⚠️ డెమో మాత్రమే — నిజమైన డబ్బు బదిలీ కాదు.",
    tab_send: "పరిస్థితి 1: దుకాణదారునికి చెల్లింపు",
    tab_collect: "పరిస్థితి 2: నకిలీ కలెక్ట్ రిక్వెస్ట్ ఉచ్చు",
    tab_qr: "పరిస్థితి 3: క్యూఆర్ కోడ్ భద్రత",
    btn_verify_pay: "చెల్లించండి",
    btn_decline_request: "❌ తిరస్కరించండి (సురక్షితం)",
    btn_approve_trap: "⚠️ ఆమోదించండి (ప్రమాదం)",
    sim_pin_instructions: "గమనిక: ఖాతా నుండి డబ్బు వెళ్లేటప్పుడు మాత్రమే పిన్ నమోదు చేయాలి.",

    // Learn Page
    learn_heading: "డిజిటల్ భద్రతా జ్ఞాన కేంద్రం",
    learn_subheading: "మీ పొదుపును రక్షించుకోవడానికి సులభమైన సూచనలు.",
    quiz_heading: "🎯 సీనియర్ భద్రతా క్విజ్",
    quiz_subheading: "ఈ 5 సులభమైన ప్రశ్నలతో మీ జ్ఞానాన్ని పరీక్షించుకోండి:",
    btn_submit_quiz: "సమర్పించండి",

    // Help Page
    help_heading: "అత్యవసర సహాయం & ఫిర్యాదు గైడ్",
    help_subheading: "ఓటీపీ పొరపాటున షేర్ చేసినా డబ్బు పోయినా వెంటనే ఈ చర్యలు తీసుకోండి.",
    emergency_title: "జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ హెల్ప్‌లైన్",
    emergency_dial_desc: "భారత ప్రభుత్వ ఉచిత 24x7 జాతీయ సైబర్ హెల్ప్‌లైన్ 1930",
    official_portal_label: "అధికారిక సైబర్ పోర్టల్:",

    // Footer
    footer_hackathon: "హ్యాక్యురిటీ 2026 కోసం రూపొందించబడింది | సీనియర్ సిటిజన్ల భద్రత కోసం",
    footer_disclaimer: "విద్యా ప్రాజెక్ట్ మాత్రమే. మేము ఎటువంటి వ్యక్తిగత సమాచారాన్ని నిల్వ చేయము.",
  },

  // ==========================================
  // 6. MALAYALAM (ml - മലയാളം)
  // ==========================================
  ml: {
    // Top Bar & Controls
    text_size: "അക്ഷര വലുപ്പം:",
    high_contrast: "ഹൈ കോൺട്രാസ്റ്റ്",
    normal_contrast: "സാധാരണ മോഡ്",
    emergency_call: "🚨 അടിയന്തര സഹായം: 1930",
    choose_language_title: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക / Choose Your Language",
    choose_language_subtitle: "നിങ്ങൾക്ക് സൗകര്യപ്രദമായ ഭാഷ തിരഞ്ഞെടുക്കുക. ഇത് എപ്പോൾ വേണമെങ്കിലും മാറ്റാം.",
    language_label: "ഭാഷ:",

    // Voice Assistant Bar
    voice_assistant: "വോയ്സ് അസിസ്റ്റന്റ് (Voice Assistant)",
    voice_tagline: "ശാന്തമായ ലളിതമായ നിർദ്ദേശങ്ങൾ",
    read_aloud: "🔊 ഉറക്കെ വായിക്കുക",
    repeat_voice: "🔁 ആവർത്തിക്കുക",
    stop_speaking: "⏹️ ശബ്ദം നിർത്തുക",
    speaking_active: "സംസാരിക്കുന്നു...",
    voice_not_supported: "ഈ ബ്രൗസറിൽ വോയ്‌സ് സൗകര്യം ലഭ്യമല്ല.",

    // Brand & Navigation
    brand_title: "ഈസി പേ — സേഫ് പേ",
    brand_tagline: "ഒരു നിമിഷം നിൽക്കൂ. പരിശോധിക്കൂ. സുരക്ഷിതരായിരിക്കൂ.",
    nav_home: "ഹോം",
    nav_checker: "സന്ദേശം പരിശോധിക്കുക",
    nav_coach: "തട്ടിപ്പ് സുരക്ഷാ കോച്ച്",
    nav_simulator: "യുപിഐ പരിശീലനം",
    nav_learn: "സുരക്ഷ പഠിക്കുക",
    nav_help: "അടിയന്തര സഹായം",
    nav_login: "ലോഗിൻ",
    nav_logout: "ലോഗ്ഔട്ട്",
    nav_welcome_user: "സ്വാഗതം, മുതിർന്ന അംഗം",
    back_to_home: "← ഹോമിലേക്ക് മടങ്ങുക",

    // Login Page
    login_heading: "മുതിർന്ന പൗരന്മാർക്കുള്ള സുരക്ഷിത ലോഗിൻ",
    login_welcome: "ഈസി പേ — സേഫ് പേ-യിലേക്ക് സ്വാഗതം. മുന്നോട്ട് പോകാൻ നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക.",
    login_instructions_text: "സ്വാഗതം! ദയവായി മുകളിൽ നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക. തുടർന്ന് നിങ്ങളുടെ ഉപയോക്തൃനാമമോ മൊബൈൽ നമ്പറോ പാസ്‌വേഡോ നൽകുക. ഞങ്ങൾ ഒരിക്കലും നിങ്ങളുടെ യുപിഐ പിൻ ചോദിക്കില്ല.",
    login_username_label: "ഉപയോക്തൃനാമം അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ:",
    login_username_placeholder: "ഉപയോക്തൃനാമം അല്ലെങ്കിൽ 10 അക്ക മൊബൈൽ നമ്പർ",
    login_password_label: "പാസ്‌വേഡ് അല്ലെങ്കിൽ പിൻ:",
    login_password_placeholder: "പാസ്‌വേഡ് നൽകുക",
    btn_login: "ലോഗിൻ ചെയ്യുക →",
    btn_register: "പുതിയ അക്കൗണ്ട് ഉണ്ടാക്കുക / രജിസ്റ്റർ",
    link_forgot_pwd: "പാസ്‌വേഡ് മറന്നുപോയോ? സഹായം വേണോ?",
    login_safety_tip: "സുരക്ഷാ ഓർമ്മപ്പെടുത്തൽ: നിങ്ങളുടെ പാസ്‌വേഡോ യുപിഐ പിന്നോ ചോദിക്കാൻ ഞങ്ങൾ ഒരിക്കലും വിളിക്കുകയോ സന്ദേശമയക്കുകയോ ഇല്ല.",
    login_voice_instruction: "സഹായം വേണോ? നിർദ്ദേശങ്ങൾ കേൾക്കാൻ 'നിർദ്ദേശങ്ങൾ ഉച്ചത്തിൽ വായിക്കുക' ക്ലിക്ക് ചെയ്യുക.",
    btn_read_instructions: "🔊 നിർദ്ദേശങ്ങൾ ഉച്ചത്തിൽ വായിക്കുക",
    btn_stop_instructions: "⏹️ ശബ്ദം നിർത്തുക",
    validation_empty_user: "ദയവായി നിങ്ങളുടെ ഉപയോക്തൃനാമമോ മൊബൈൽ നമ്പറോ നൽകുക.",
    validation_empty_pwd: "ദയവായി നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക.",
    validation_success: "ലോഗിൻ വിജയിച്ചു! ഹോമിലേക്ക് മാറ്റുന്നു...",
    login_emergency_help: "🚨 സൈബർ തട്ടിപ്പിന് ഇരയായോ? 1930 സഹായത്തിനായി ഇവിടെ ക്ലിക്ക് ചെയ്യുക",
    register_title: "പുതിയ സേഫ്പേ അക്കൗണ്ട് ഉണ്ടാക്കുക",
    register_desc: "മുതിർന്നവർക്കുള്ള ലളിതമായ രജിസ്ട്രേഷൻ. ബാങ്ക് വിവരങ്ങൾ ആവശ്യമില്ല.",
    register_name_label: "നിങ്ങളുടെ മുഴുവൻ പേര്:",
    register_name_placeholder: "പേര് നൽകുക (ഉദാ: രമേഷ് നായർ)",
    btn_submit_register: "അക്കൗണ്ട് ഉണ്ടാക്കുക →",
    btn_back_to_login: "← ലോഗിനിലേക്ക് മടങ്ങുക",
    forgot_pwd_title: "പാസ്‌വേഡ് സഹായം",
    forgot_pwd_desc: "പാസ്‌വേഡ് മറന്നാൽ പേടിക്കേണ്ടതില്ല! നിങ്ങളുടെ ഫോണിലേക്ക് ഒരു വീണ്ടെടുക്കൽ കോഡ് അയയ്ക്കും. ബാങ്ക് മാനേജർമാർ ഇത് ഒരിക്കലും ചോദിക്കില്ല.",
    btn_close: "അടയ്ക്കുക",

    // Home Page Hero
    hero_badge: "ഹാക്ക്യൂരിറ്റി 2026 — മുതിർന്ന പൗരന്മാർക്കുള്ള സൈബർ സുരക്ഷാ കവചം",
    hero_title: "പണം നഷ്ടപ്പെടുന്നതിന് മുൻപ് സുരക്ഷിത പണമിടപാടുകൾ പഠിക്കുക.",
    hero_desc: "മുതിർന്ന പൗരന്മാർക്ക് യുപിഐ ഭയമില്ലാതെ ഉപയോഗിക്കാനും തട്ടിപ്പുകൾ തിരിച്ചറിയാനും ലളിതമായ മാർഗ്ഗനിർദ്ദേശം.",
    btn_start_practice: "🎯 കോച്ച് ആരംഭിക്കുക",
    btn_check_sms: "🔍 സംശയകരമായ സന്ദേശം പരിശോധിക്കുക",

    // Golden Rules
    golden_rules_title: "⭐ മുതിർന്നവർ ഓർക്കേണ്ട 3 സുവർണ്ണ നിയമങ്ങൾ",
    rule_1_title: "യുപിഐ പിൻ പണം നൽകാൻ മാത്രമാണ്",
    rule_1_desc: "പിൻ നൽകുമ്പോൾ നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് പണം കുറയുന്നു. പണം ലഭിക്കാൻ പിൻ ആവശ്യമില്ല.",
    rule_2_title: "ബാങ്കുകൾ ഒരിക്കലും ഒടിപി ചോദിക്കില്ല",
    rule_2_desc: "ഒരു ബാങ്ക് മാനേജർക്കും നിങ്ങളുടെ ഒടിപിയോ പാസ്‌വേഡോ ചോദിക്കാൻ അധികാരമില്ല.",
    rule_3_title: "AnyDesk ആപ്പ് ഒരിക്കലും ഇൻസ്റ്റാൾ ചെയ്യരുത്",
    rule_3_desc: "ആരെങ്കിലും സ്ക്രീൻ ഷെയറിംഗ് ആപ്പ് ഡൗൺലോഡ് ചെയ്യാൻ ആവശ്യപ്പെട്ടാൽ ഫോൺ കട്ട് ചെയ്യുക.",

    // 5 Feature Cards
    card_checker_title: "സന്ദേശം പരിശോധിക്കുക",
    card_checker_desc: "വ്യാജ സന്ദേശങ്ങളും ലിങ്കുകളും തിരിച്ചറിയാൻ ഇവിടെ പരിശോധിക്കുക.",
    btn_open_checker: "പരിശോധിക്കുക →",

    card_coach_title: "തട്ടിപ്പ് സുരക്ഷാ കോച്ച്",
    card_coach_desc: "6 യഥാർത്ഥ തട്ടിപ്പ് സാഹചര്യങ്ങളിൽ പരിശീലിക്കുക.",
    btn_open_coach: "പരിശീലനം തുടങ്ങുക →",

    card_sim_title: "യുപിഐ പരിശീലന സിമുലേറ്റർ",
    card_sim_desc: "യഥാർത്ഥ പണമില്ലാതെ പരിശീലിക്കാവുന്ന മൊബൈൽ മോഡൽ.",
    btn_open_sim: "പരിശീലിക്കുക →",

    card_learn_title: "ഡിജിറ്റൽ സുരക്ഷാ പാഠങ്ങൾ",
    card_learn_desc: "ക്യുആർ കോഡ്, ഒടിപി സുരക്ഷ എന്നിവയ്ക്കുള്ള ലളിതമായ നിർദ്ദേശങ്ങൾ.",
    btn_open_learn: "പാഠങ്ങൾ കാണുക →",

    card_help_title: "അടിയന്തര സഹായവും പരാതിയും",
    card_help_desc: "തട്ടിപ്പ് ഉണ്ടായാൽ സ്വീകരിക്കേണ്ട നടപടികളും 1930 ഹെൽപ്പ്‌ലൈനും.",
    btn_open_help: "സഹായം നേടുക →",

    // Checker Page
    checker_heading: "സന്ദേശ പരിശോധന കേന്ദ്രം",
    checker_subheading: "ക്ലിക്ക് ചെയ്യുന്നതിന് മുമ്പ് മുന്നറിയിപ്പുകൾ പരിശോധിക്കുക.",
    checker_input_label: "എസ്എംഎസ് അല്ലെങ്കിൽ ലിങ്ക് ഇവിടെ പേസ്റ്റ് ചെയ്യുക:",
    checker_placeholder: "ഉദാഹരണം: നിങ്ങളുടെ വൈദ്യുതി ബിൽ അടച്ചിട്ടില്ല. ഇന്ന് രാത്രി വൈദ്യുതി വിച്ഛേദിക്കും...",
    btn_mic_input: "🎙️ സംസാരിച്ച് നൽകുക",
    btn_mic_listening: "കേൾക്കുന്നു... സംസാരിക്കൂ",
    btn_analyze: "🔍 സന്ദേശം പരിശോധിക്കുക",
    btn_clear: "മായ്ക്കുക",
    sample_messages_label: "മാതൃകാ തട്ടിപ്പ് സന്ദേശങ്ങൾ:",
    sample_power: "⚡ വൈദ്യുതി വിച്ഛേദന സന്ദേശം",
    sample_otp: "💳 ബാങ്ക് ഒടിപി ആവശ്യം",
    sample_lottery: "🎁 ലോട്ടറി സമ്മാന സന്ദേശം",
    sample_remote: "📱 AnyDesk സ്ക്രീൻ ഷെയർ",
    sample_collect: "💸 OLX പണം ആവശ്യപ്പെടൽ",
    sample_safe: "✅ സുരക്ഷിത സന്ദേശം",

    // Checker Results
    results_heading: "സുരക്ഷാ പരിശോധനാ ഫലം",
    detected_signs: "കണ്ടെത്തിയ മുന്നറിയിപ്പുകൾ:",
    advice_heading: "നിങ്ങൾ ചെയ്യേണ്ടത്:",
    btn_check_another: "മറ്റൊരു സന്ദേശം പരിശോധിക്കുക",
    btn_read_result: "🔊 ഫലം ഉറക്കെ കേൾക്കുക",

    // Coach Page
    coach_heading: "വ്യക്തിഗത തട്ടിപ്പ് സുരക്ഷാ കോച്ച്",
    coach_subheading: "6 യഥാർത്ഥ സാഹചര്യങ്ങളിൽ ശരിയായ തീരുമാനങ്ങൾ എടുക്കാൻ പരിശീലിക്കുക.",
    coach_progress_label: "സാഹചര്യം",
    coach_score_label: "സുരക്ഷിത തീരുമാനങ്ങൾ:",
    coach_question_prompt: "ഏറ്റവും സുരക്ഷിതമായ തീരുമാനം ഏതാണ്?",
    btn_try_again: "🔄 വീണ്ടും ശ്രമിക്കുക",
    btn_next_scenario: "അടുത്ത സാഹചര്യം →",
    btn_finish_coach: "സംഗ്രഹം കാണുക →",
    coach_summary_title: "പരിശീലന ഫല സംഗ്രഹം",
    coach_summary_subtitle: "നിങ്ങളുടെ പ്രകടന റിപ്പോർട്ട്:",
    btn_practice_again: "🔄 വീണ്ടും പരിശീലിക്കുക",
    coach_disclaimer: "കുറിപ്പ്: ഇത് കേവലം ബോധവൽക്കരണത്തിനായുള്ള പരിശീലനം മാത്രമാണ്.",

    // UPI Simulator Page
    sim_heading: "സുരക്ഷിത യുപിഐ സിമുലേറ്റർ",
    sim_subheading: "പണം അയക്കുന്നതും സ്വീകരിക്കുന്നതും തമ്മിലുള്ള വ്യത്യാസം മനസ്സിലാക്കുക.",
    sim_badge_demo: "⚠️ ഡെമോ മാത്രം — യഥാർത്ഥ പണമിടപാടല്ല.",
    tab_send: "സാഹചര്യം 1: കടയിൽ പണം നൽകൽ",
    tab_collect: "സാഹചര്യം 2: വ്യാജ കളക്ട് റിക്വസ്റ്റ് കുരുക്ക്",
    tab_qr: "സാഹചര്യം 3: ക്യുആർ കോഡ് സുരക്ഷ",
    btn_verify_pay: "പണം നൽകുക",
    btn_decline_request: "❌ നിരസിക്കുക (സുരക്ഷിതം)",
    btn_approve_trap: "⚠️ സ്വീകരിക്കുക (അപകടം)",
    sim_pin_instructions: "ശ്രദ്ധിക്കുക: പണം പോകുമ്പോൾ മാത്രമേ പിൻ നൽകേണ്ടതുള്ളൂ.",

    // Learn Page
    learn_heading: "ഡിജിറ്റൽ സുരക്ഷാ പഠന കേന്ദ്രം",
    learn_subheading: "പണം സംരക്ഷിക്കാൻ ലളിതമായ വഴികൾ.",
    quiz_heading: "🎯 മുതിർന്നവർക്കുള്ള സുരക്ഷാ ക്വിസ്",
    quiz_subheading: "ഈ 5 ലളിതമായ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക:",
    btn_submit_quiz: "സമർപ്പിക്കുക",

    // Help Page
    help_heading: "അടിയന്തര സഹായവും പരാതിയും",
    help_subheading: "പണം നഷ്ടപ്പെട്ടാൽ ഉടൻ ഈ നടപടികൾ സ്വീകരിക്കുക.",
    emergency_title: "ദേശീയ സൈബർ കുറ്റകൃത്യ ഹെൽപ്പ്‌ലൈൻ",
    emergency_dial_desc: "കേന്ദ്ര സർക്കാരിന്റെ 24x7 സൗജന്യ ഹെൽപ്പ്‌ലൈൻ 1930",
    official_portal_label: "ഔദ്യോഗിക സൈബർ പോർട്ടൽ:",

    // Footer
    footer_hackathon: "ഹാക്ക്യൂരിറ്റി 2026-ന് വേണ്ടി നിർമ്മിച്ചത് | മുതിർന്ന പൗരന്മാരുടെ സുരക്ഷയ്ക്കായി",
    footer_disclaimer: "വിദ്യാഭ്യാസ പദ്ധതി മാത്രം. ഞങ്ങൾ വ്യക്തിഗത വിവരങ്ങൾ ശേഖരിക്കുന്നില്ല.",
  },

  // ==========================================
  // 7. MARATHI (mr - मराठी)
  // ==========================================
  mr: {
    // Top Bar & Controls
    text_size: "अक्षराचा आकार:",
    high_contrast: "हाय कॉन्ट्रास्ट",
    normal_contrast: "सामान्य मोड",
    emergency_call: "🚨 आपत्कालीन मदत: 1930",
    choose_language_title: "तुमची भाषा निवडा / Choose Your Language",
    choose_language_subtitle: "तुमची आवडती भाषा निवडा. तुम्ही ही कधीही बदलू शकता.",
    language_label: "भाषा:",

    // Voice Assistant Bar
    voice_assistant: "आवाज सहाय्यक (Voice Assistant)",
    voice_tagline: "शांत व सोप्या ऑडिओ सूचना",
    read_aloud: "🔊 मोठ्याने ऐका",
    repeat_voice: "🔁 पुन्हा सांगा",
    stop_speaking: "⏹️ बोलणे थांबवा",
    speaking_active: "बोलत आहे...",
    voice_not_supported: "या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही.",

    // Brand & Navigation
    brand_title: "इझी पे — सेफ पे",
    brand_tagline: "थोडा वेळ थांबा. तपासा. सुरक्षित राहा.",
    nav_home: "मुख्यपृष्ठ",
    nav_checker: "संदेश तपासा",
    nav_coach: "स्कॅम सेफ्टी कोच",
    nav_simulator: "युपीआय सराव",
    nav_learn: "सुरक्षा शिका",
    nav_help: "आपत्कालीन मदत",
    nav_login: "लॉगिन",
    nav_logout: "लॉगआउट",
    nav_welcome_user: "स्वागत आहे, ज्येष्ठ नागरिक",
    back_to_home: "← मुख्यपृष्ठावर परत जा",

    // Login Page
    login_heading: "ज्येष्ठ नागरिक सुरक्षित लॉगिन",
    login_welcome: "इझी पे — सेफ पे मध्ये आपले स्वागत आहे. सुरक्षितपणे पुढे जाण्यासाठी कृपया आपले तपशील प्रविष्ट करा.",
    login_instructions_text: "स्वागत आहे! कृपया वर आपली भाषा निवडा. त्यानंतर खाली आपले वापरकर्ता नाव किंवा 10 अंकी मोबाईल नंबर आणि पासवर्ड टाका. आम्ही कधीही तुमचा युपीआय पिन विचारत नाही.",
    login_username_label: "वापरकर्ता नाव किंवा मोबाईल नंबर:",
    login_username_placeholder: "वापरकर्ता नाव किंवा 10 अंकी मोबाईल टाका",
    login_password_label: "पासवर्ड किंवा पिन:",
    login_password_placeholder: "आपला पासवर्ड प्रविष्ट करा",
    btn_login: "लॉगिन करा →",
    btn_register: "नवीन खाते तयार करा / नोंदणी",
    link_forgot_pwd: "पासवर्ड विसरलात? मदत हवी आहे?",
    login_safety_tip: "सुरक्षा स्मरणपत्र: आम्ही तुमचा पासवर्ड किंवा युपीआय पिन विचारण्यासाठी कधीही फोन किंवा मेसेज करत नाही.",
    login_voice_instruction: "मदत हवी आहे? सूचना ऐकण्यासाठी 'सूचना मोठ्याने ऐका' बटणावर क्लिक करा.",
    btn_read_instructions: "🔊 सूचना मोठ्याने ऐका",
    btn_stop_instructions: "⏹️ बोलणे थांबवा",
    validation_empty_user: "कृपया आपले वापरकर्ता नाव किंवा मोबाईल नंबर प्रविष्ट करा.",
    validation_empty_pwd: "कृपया आपला पासवर्ड प्रविष्ट करा.",
    validation_success: "लॉगिन यशस्वी! मुख्य पानावर जात आहे...",
    login_emergency_help: "🚨 सायबर फसवणूक झाली आहे का? 1930 मदतीसाठी येथे क्लिक करा",
    register_title: "नवीन सेफपे खाते तयार करा",
    register_desc: "ज्येष्ठ नागरिकांसाठी सोपी व सुरक्षित नोंदणी. बँक खात्याचे तपशील आवश्यक नाहीत.",
    register_name_label: "आपले पूर्ण नाव:",
    register_name_placeholder: "आपले नाव प्रविष्ट करा (उदा. रमेश जोशी)",
    btn_submit_register: "माझे खाते तयार करा →",
    btn_back_to_login: "← लॉगिनवर परत जा",
    forgot_pwd_title: "पासवर्ड मदत",
    forgot_pwd_desc: "पासवर्ड विसरल्यास काळजी करू नका! आपल्या नोंदणीकृत मोबाईलवर सुरक्षित कोड पाठवला जाईल. बँकेचे अधिकारी हा कोड कधीही विचारत नाहीत.",
    btn_close: "बंद करा",

    // Home Page Hero
    hero_badge: "हॅक्युरिटी 2026 — ज्येष्ठ नागरिक सायबर सुरक्षा कवच",
    hero_title: "पैसे जाण्यापूर्वी सुरक्षित डिजिटल पेमेंट शिका.",
    hero_desc: "ज्येष्ठ नागरिकांसाठी युपीआय आत्मविश्वासाने वापरण्यासाठी आणि ऑनलाइन फसवणूक ओळखण्यासाठी सोपे मार्गदर्शक.",
    btn_start_practice: "🎯 स्कॅम कोच सुरू करा",
    btn_check_sms: "🔍 संशयास्पद संदेश तपासा",

    // Golden Rules
    golden_rules_title: "⭐ प्रत्येक ज्येष्ठ नागरिकाने लक्षात ठेवावेत असे 3 महत्त्वाचे नियम",
    rule_1_title: "युपीआय पिन फक्त पैसे देण्यासाठी आहे",
    rule_1_desc: "युपीआय पिन टाकल्याने खात्यातून पैसे कट होतात. पैसे मिळवण्यासाठी कधीही पिन टाकावा लागत नाही.",
    rule_2_title: "बँक कधीही ओटीपी मागत नाही",
    rule_2_desc: "कोणताही बँक मॅनेजर किंवा पोलीस तुमचा एसएमएस ओटीपी किंवा पासवर्ड मागू शकत नाही.",
    rule_3_title: "AnyDesk ॲप कधीही डाऊनलोड करू नका",
    rule_3_desc: "कोणीही AnyDesk किंवा TeamViewer डाऊनलोड करायला सांगितले तर लगेच फोन कट करा.",

    // 5 Feature Cards
    card_checker_title: "संदेश तपासा",
    card_checker_desc: "कोणताही मेसेज किंवा लिंक टाकून त्यातील धोके तपासा.",
    btn_open_checker: "आत्ता तपासा →",

    card_coach_title: "स्कॅम सेफ्टी कोच",
    card_coach_desc: "6 वास्तववादी फसवणुकीच्या प्रसंगांमध्ये सुरक्षित निर्णय घेण्याचा सराव.",
    btn_open_coach: "सराव सुरू करा →",

    card_sim_title: "युपीआय सराव सिम्युलेटर",
    card_sim_desc: "खऱ्या पैशांशिवाय सुरक्षित मोबाईल सराव.",
    btn_open_sim: "सराव करा →",

    card_learn_title: "डिजिटल सुरक्षा धडे",
    card_learn_desc: "क्यूआर कोड, ओटीपी आणि ऑनलाइन सुरक्षिततेचे सोपे नियम.",
    btn_open_learn: "धडे पहा →",

    card_help_title: "आपत्कालीन मदत आणि तक्रार",
    card_help_desc: "फसवणूक झाल्यास त्वरित घ्यायची पावले आणि 1930 हेल्पलाईन.",
    btn_open_help: "मदत मिळवा →",

    // Checker Page
    checker_heading: "संदेश आणि लिंक सुरक्षा तपासक",
    checker_subheading: "क्लिक करण्यापूर्वी संशयास्पद संदेश तपासा.",
    checker_input_label: "एसएमएस किंवा लिंक येथे पेस्ट करा:",
    checker_placeholder: "उदाहरण: प्रिय ग्राहक, आपले वीज बिल भरलेले नाही. आज रात्री वीज पुरवठा खंडित होईल...",
    btn_mic_input: "🎙️ बोलून संदेश प्रविष्ट करा",
    btn_mic_listening: "ऐकत आहे... बोला",
    btn_analyze: "🔍 संदेश तपासा",
    btn_clear: "साफ करा",
    sample_messages_label: "नमुना फसवणूक संदेश तपासा:",
    sample_power: "⚡ वीज बिल कट एसएमएस",
    sample_otp: "💳 बँक ओटीपी मागणी",
    sample_lottery: "🎁 केबीसी लॉटरी बक्षीस",
    sample_remote: "📱 एनीडेस्क स्क्रीन शेअर",
    sample_collect: "💸 ओएलएक्स पेमेंट कलेक्ट मागणी",
    sample_safe: "✅ सुरक्षित संदेश",

    // Checker Results
    results_heading: "सुरक्षा विश्लेषण निकाल",
    detected_signs: "आढळलेले धोक्याचे संकेत:",
    advice_heading: "तुम्ही काय करावे:",
    btn_check_another: "दुसरा संदेश तपासा",
    btn_read_result: "🔊 निकाल मोठ्याने ऐका",

    // Coach Page
    coach_heading: "वैयक्तिक स्कॅम सेफ्टी कोच",
    coach_subheading: "6 प्रसंगांमध्ये योग्य निर्णय घेण्याचा प्रत्यक्ष सराव करा.",
    coach_progress_label: "प्रसंग",
    coach_score_label: "सुरक्षित निर्णय:",
    coach_question_prompt: "सर्वात सुरक्षित निर्णय कोणता आहे?",
    btn_try_again: "🔄 पुन्हा प्रयत्न करा",
    btn_next_scenario: "पुढील प्रसंग →",
    btn_finish_coach: "सारांश पहा →",
    coach_summary_title: "सराव निकाल सारांश",
    coach_summary_subtitle: "आपला प्रगती अहवाल:",
    btn_practice_again: "🔄 पुन्हा सराव करा",
    coach_disclaimer: "टीप: हे केवळ शैक्षणिक आणि जनजागृती सरावासाठी आहे.",

    // UPI Simulator Page
    sim_heading: "सुरक्षित युपीआय सराव सिम्युलेटर",
    sim_subheading: "पैसे देणे आणि घेणे यातील फरक प्रत्यक्ष अनुभवा.",
    sim_badge_demo: "⚠️ केवळ डेमो — कोणतेही खरे पैसे वापरले जात नाहीत.",
    tab_send: "प्रसंग 1: दुकानदाराला पैसे देणे",
    tab_collect: "प्रसंग 2: बनावट कलेक्ट रिक्वेस्ट सापळा",
    tab_qr: "प्रसंग 3: क्यूआर कोड सुरक्षा",
    btn_verify_pay: "पैसे भरा",
    btn_decline_request: "❌ नकार द्या (सुरक्षित)",
    btn_approve_trap: "⚠️ स्वीकारा (धोका)",
    sim_pin_instructions: "लक्षात ठेवा: खात्यातून पैसे जात असतानाच पिन टाकावा लागतो.",

    // Learn Page
    learn_heading: "डिजिटल सुरक्षा ज्ञान केंद्र",
    learn_subheading: "आपली कष्टाची कमाई वाचवण्यासाठी सोपे नियम.",
    quiz_heading: "🎯 ज्येष्ठ नागरिक सुरक्षा प्रश्नमंजुषा",
    quiz_subheading: "या 5 सोप्या प्रश्नांसह आपले ज्ञान तपासा:",
    btn_submit_quiz: "प्रश्नावली सबमिट करा",

    // Help Page
    help_heading: "आपत्कालीन मदत आणि सायबर तक्रार",
    help_subheading: "ओटीपी सांगितला गेला असल्यास किंवा पैसे गेले असल्यास त्वरित ही पावले उचला.",
    emergency_title: "राष्ट्रीय सायबर गुन्हे नोंदणी हेल्पलाईन",
    emergency_dial_desc: "भारत सरकारची 24x7 मोफत राष्ट्रीय सायबर हेल्पलाईन 1930",
    official_portal_label: "अधिकृत सायबर पोर्टल:",

    // Footer
    footer_hackathon: "हॅक्युरिटी 2026 साठी निर्मित | ज्येष्ठ नागरिकांच्या सुरक्षेसाठी",
    footer_disclaimer: "केवळ शैक्षणिक प्रकल्प. आम्ही कोणतीही वैयक्तिक माहिती साठवत नाही.",
  }
};

/**
 * Returns currently selected language code (default 'en')
 */
function getCurrentLanguage() {
  const saved = localStorage.getItem('safepay_lang');
  return SUPPORTED_LANGUAGES.includes(saved) ? saved : 'en';
}

/**
 * Returns translated string for given key in current language with English fallback
 */
function t(key) {
  const lang = getCurrentLanguage();
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined && TRANSLATIONS[lang][key] !== "") {
    return TRANSLATIONS[lang][key];
  }
  if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key] !== undefined && TRANSLATIONS['en'][key] !== "") {
    return TRANSLATIONS['en'][key];
  }
  return key;
}

/**
 * Sets current language, updates localStorage, and translates DOM in real time
 */
function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    lang = 'en';
  }
  localStorage.setItem('safepay_lang', lang);
  document.documentElement.lang = lang;

  // 1. Update active states on top bar language buttons (if any)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // 2. Update active states on Login page language card buttons
  document.querySelectorAll('.login-lang-card-btn').forEach(btn => {
    const isCurrent = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isCurrent);
    btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
  });

  // 3. Update top-bar dropdown select if present
  const headerSelect = document.getElementById('headerLangSelect');
  if (headerSelect && headerSelect.value !== lang) {
    headerSelect.value = lang;
  }

  // 4. Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) {
      el.textContent = translated;
    }
  });

  // 5. Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated) {
      el.placeholder = translated;
    }
  });

  // 7. Update partial translation notice banner
  const noticeBanner = document.getElementById('translationNoticeBanner');
  const noticeText = document.getElementById('translationNoticeText');
  const partialNoticeMap = {
    hi: "सूचना: हिंदी अनुवाद आंशिक है। आवश्यक सुरक्षा नियमों और घोटालों की चेतावनियों के लिए अंग्रेजी/कन्नड़ पाठ उपलब्ध है।",
    ta: "அறிவிப்பு: தமிழ் மொழிபெயர்ப்பு பகுதியளவானது. முக்கிய பாதுகாப்பு எச்சரிக்கைகளுக்கு சரிபார்க்கப்பட்ட ஆங்கிலம்/கன்னடம் காட்டப்படுகிறது.",
    te: "గమనిక: తెలుగు అనుவாదం పాక్షికం. కీలకమైన స్కామ్ హెచ్చరికల కోసం ధృవీకరించబడిన ఆంగ్లం/కన్నడ అందుబాటులో ఉంది.",
    ml: "അറിയിപ്പ്: മലയാളം വിവർത്തനം ഭാഗികമാണ്. പ്രധാന സുരക്ഷാ മുന്നറിയിപ്പുകൾക്ക് പരിശോധിച്ച ഇംഗ്ലീഷ്/കന്നഡ ലഭ്യമാണ്.",
    mr: "सूचना: मराठी भाषांतर अंशतः उपलब्ध आहे. महत्त्वाच्या सुरक्षिततेसाठी इंग्रजी/कन्नड मजकूर सक्रिय आहे."
  };

  if (noticeBanner) {
    if (partialNoticeMap[lang]) {
      noticeBanner.style.display = 'block';
      if (noticeText) noticeText.textContent = partialNoticeMap[lang];
    } else {
      noticeBanner.style.display = 'none';
    }
  }

  // 8. Dispatch global custom event for dynamic components (checker, coach, simulator, etc.)
  window.dispatchEvent(new CustomEvent('safepayLanguageChanged', { detail: { lang } }));
}

// Auto-run translation on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  setLanguage(currentLang);

  // Bind header select change if present
  const headerSelect = document.getElementById('headerLangSelect');
  if (headerSelect) {
    headerSelect.value = currentLang;
    headerSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
});
