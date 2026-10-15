"""
EASY PAY — SAFE PAY
HACKURITY 2026 Hackathon Web Application
Main Flask Backend Server
"""

import os
import uuid
from flask import Flask, render_template, request, jsonify
from scam_detector import scam_detector
from coach_scenarios import get_coach_scenarios
from database import (
    init_db, save_coach_progress, save_quiz_score, get_learning_stats,
    get_simulated_transactions, add_simulated_transaction, get_transaction_stats
)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hackurity2026-safepay-secret-key-senior-friendly'

# Ensure database tables and initial demonstration data exist
init_db()


# --- Page Routes ---

@app.route('/')
def home():
    """Renders the Home Page with core branding and quick access cards."""
    return render_template('index.html')


@app.route('/checker')
def checker():
    """Renders the Scam Message Checker tool."""
    return render_template('checker.html')


@app.route('/coach')
@app.route('/assistant')
def coach():
    """Renders the Personal Scam Assistant interactive conversational guide."""
    return render_template('coach.html')


@app.route('/simulator')
@app.route('/payment-assistant')
def simulator():
    """Renders the Smart Payment Assistant — Verify Before You Pay."""
    transactions = get_simulated_transactions()
    stats = get_transaction_stats()
    return render_template('simulator.html', transactions=transactions, stats=stats)


@app.route('/transactions')
@app.route('/history')
def transactions_page():
    """Renders Transaction History and Safety Insights page."""
    transactions = get_simulated_transactions()
    stats = get_transaction_stats()
    return render_template('transactions.html', transactions=transactions, stats=stats)


@app.route('/learn')
@app.route('/learn-upi')
def learn():
    """Renders the LEARN UPI SAFELY interactive tutorial feature for seniors."""
    return render_template('learn.html')


@app.route('/help')
def help_page():
    """Renders the Emergency Help and Cybercrime Reporting Guide."""
    return render_template('help.html')


@app.route('/login', methods=['GET', 'POST'])
def login_page():
    """Renders the Senior Citizen Safe Login Page with Multilingual Selection."""
    if request.method == 'POST':
        data = request.get_json(silent=True) or request.form
        username = (data.get('username') or '').strip()
        password = (data.get('password') or '').strip()
        if not username:
            return jsonify({"status": "error", "field": "username", "message": "Username is required"}), 400
        if not password:
            return jsonify({"status": "error", "field": "password", "message": "Password is required"}), 400
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "user": {
                "username": username,
                "displayName": username.capitalize() if not username.isdigit() else f"Member {username[-4:]}"
            },
            "redirect": "/"
        })
    return render_template('login.html')


@app.route('/logout')
def logout():
    """Logs out user and redirects to login page."""
    return render_template('login.html', logged_out=True)


@app.route('/api/login', methods=['POST'])
def api_login():
    """API endpoint for safe login validation."""
    data = request.get_json(silent=True) or request.form
    username = (data.get('username') or '').strip()
    password = (data.get('password') or '').strip()
    if not username:
        return jsonify({"status": "error", "field": "username", "message": "Please enter your username or mobile number."}), 400
    if not password:
        return jsonify({"status": "error", "field": "password", "message": "Please enter your password or PIN."}), 400
    return jsonify({
        "status": "success",
        "message": "Login successful",
        "user": {
            "username": username,
            "displayName": username.capitalize() if not username.isdigit() else f"Member {username[-4:]}"
        }
    })


@app.route('/api/register', methods=['POST'])
def api_register():
    """API endpoint for friendly senior registration."""
    data = request.get_json(silent=True) or request.form
    name = (data.get('name') or '').strip()
    mobile = (data.get('mobile') or '').strip()
    password = (data.get('password') or '').strip()
    if not name:
        return jsonify({"status": "error", "field": "name", "message": "Please enter your name."}), 400
    if not mobile:
        return jsonify({"status": "error", "field": "mobile", "message": "Please enter your mobile number."}), 400
    if not password:
        return jsonify({"status": "error", "field": "password", "message": "Please create a password."}), 400
    return jsonify({
        "status": "success",
        "message": "Account created successfully",
        "user": {
            "username": mobile,
            "displayName": name
        }
    })



# --- API Endpoints ---

@app.route('/api/check-message', methods=['POST'])
def api_check_message():
    """
    Analyzes suspicious SMS, WhatsApp message, or URL.
    Returns risk classification, warning signs, and advice in English and Kannada.
    """
    try:
        data = request.get_json(force=True) if request.is_json else request.form
        text = data.get('text', '')
        language = data.get('language', 'en')
        result = scam_detector.analyze(text, language=language)
        return jsonify({
            "status": "success",
            "data": result
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Analysis error: {str(e)}"
        }), 400


@app.route('/api/assistant/analyze', methods=['POST'])
def api_assistant_analyze():
    """
    Personal Scam Assistant endpoint.
    Analyzes submitted message, phone call description, or question using
    trained ML model and safety rules.
    Returns plain-language warning signs, clear next actions, and bilingual explanations.
    """
    try:
        data = request.get_json(silent=True) or request.form
        text = data.get('text', '')
        language = data.get('language', 'en')
        result = scam_detector.analyze(text, language=language)
        return jsonify({
            "status": "success",
            "data": result
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Assistant analysis error: {str(e)}"
        }), 400


@app.route('/api/coach/scenarios', methods=['GET'])
def api_coach_scenarios():
    """Returns the list of interactive coach scenarios."""
    scenarios = get_coach_scenarios()
    return jsonify({
        "status": "success",
        "scenarios": scenarios
    })


@app.route('/api/coach/save-progress', methods=['POST'])
def api_save_progress():
    """
    Saves non-sensitive coach practice results to SQLite.
    Returns tailored recommendations based on mistakes.
    """
    try:
        data = request.get_json(force=True)
        session_id = data.get('session_id') or str(uuid.uuid4())[:8]
        total = int(data.get('total', 6))
        correct = int(data.get('correct', 0))
        mistake_categories = data.get('mistakes', [])
        language = data.get('language', 'en')

        # Generate personalized practice tips based on categories missed
        recommendations_en = []
        recommendations_kn = []

        if 'otp' in mistake_categories:
            recommendations_en.append("Review Lesson 2: Never share OTPs or PINs with anyone, even bank staff.")
            recommendations_kn.append("ಪಾಠ ೨ ಪುನರಾವರ್ತಿಸಿ: ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ ಕೇಳಿದರೂ ಒಟಿಪಿ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.")
        if 'fear_police' in mistake_categories:
            recommendations_en.append("Review Lesson 5: Real police never do 'Digital Arrest' or demand bail on WhatsApp.")
            recommendations_kn.append("ಪಾಠ ೫ ಪುನರಾವರ್ತಿಸಿ: ನಿಜವಾದ ಪೊಲೀಸರು ಎಂದಿಗೂ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಮಾಡುವುದಿಲ್ಲ.")
        if 'collect_request' in mistake_categories:
            recommendations_en.append("Practice UPI Simulator: Remember entering a PIN is ONLY to send money.")
            recommendations_kn.append("ಯುಪಿಐ ಸಿಮ್ಯುಲೇಟರ್ ಅಭ್ಯಾಸ ಮಾಡಿ: ಪಿನ್ ಹಾಕುವುದು ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ.")
        if 'remote_app' in mistake_categories:
            recommendations_en.append("Review Lesson 3: Never install AnyDesk or screen-sharing apps for callers.")
            recommendations_kn.append("ಪಾಠ ೩ ಪುನರಾವರ್ತಿಸಿ: ಅಪರಿಚಿತರು ಹೇಳಿದ ಯಾವುದೇ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಹಾಕಬೇಡಿ.")
        if 'fake_link' in mistake_categories:
            recommendations_en.append("Review Lesson 4: Pay electricity/utility bills only through official portals.")
            recommendations_kn.append("ಪಾಠ ೪ ಪುನರಾವರ್ತಿಸಿ: ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಮಾತ್ರ ಬಿಲ್ ಪಾವತಿಸಿ.")

        if not recommendations_en:
            recommendations_en.append("Outstanding work! You identified every scam attempt correctly.")
            recommendations_kn.append("ಅದ್ಭುತ! ನೀವು ಎಲ್ಲಾ ವಂಚನೆಗಳನ್ನು ಸರಿಯಾಗಿ ಗುರುತಿಸಿದ್ದೀರಿ.")

        save_coach_progress(session_id, total, correct, mistake_categories, language)

        return jsonify({
            "status": "success",
            "session_id": session_id,
            "correct": correct,
            "total": total,
            "recommendations_en": recommendations_en,
            "recommendations_kn": recommendations_kn
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/api/quiz/save-score', methods=['POST'])
def api_save_quiz_score():
    """Saves quiz score."""
    try:
        data = request.get_json(force=True)
        quiz_name = data.get('quiz_name', 'digital_safety_quiz')
        score = int(data.get('score', 0))
        total = int(data.get('total', 6))
        row_id = save_quiz_score(quiz_name, score, total)
        return jsonify({"status": "success", "id": row_id})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/api/stats', methods=['GET'])
def api_stats():
    """Returns aggregated anonymous usage stats."""
    stats = get_learning_stats()
    return jsonify({"status": "success", "stats": stats})


@app.route('/api/payment/assess', methods=['POST'])
def api_payment_assess():
    """
    Assesses safety of a proposed payment in Smart Payment Assistant.
    Evaluates:
    - Suspicious payment circumstances
    - Urgent or threatening requests
    - Requests for OTPs, UPI PINs, passwords, or remote access
    - Suspicious payment instructions / advance fees
    - Risk indicators from scam detector
    Strictly never claims recipient is verified without genuine authorized service.
    """
    import re
    try:
        data = request.get_json(force=True) if request.is_json else request.form
        recipient = (data.get('recipient_name') or '').strip()
        upi_id = (data.get('upi_id') or '').strip().lower()
        amount_str = str(data.get('amount') or '0').replace('₹', '').replace(',', '').strip()
        purpose = (data.get('purpose') or '').strip()
        language = data.get('language', 'en')
        is_kn = language == 'kn'

        try:
            amount = float(amount_str)
        except ValueError:
            amount = 0.0

        warning_signs_en = []
        warning_signs_kn = []
        precautions_en = []
        precautions_kn = []
        risk_level = "NO OBVIOUS WARNING SIGNS"
        contextual_lesson = "/learn#lesson-2"

        combined_text = f"{recipient} {purpose} {upi_id}"
        analysis = scam_detector.analyze(combined_text, language=language)

        # 1. Urgent/threatening requests
        urgent_keywords = ['urgent', 'block', 'disconnect', 'immediately', 'fine', 'penalty', 'police', 'arrest', 'bail', 'court', 'cbi', 'customs', 'kyc']
        has_urgency = any(re.search(rf'\b{w}\b', combined_text, re.IGNORECASE) for w in urgent_keywords) or any(re.search(rf'{w}', combined_text) for w in ['ತುರ್ತು', 'ಸ್ಥಗಿತ', 'ಬ್ಲಾಕ್', 'ಪೊಲೀಸ್', 'ಬಂಧನ', 'ದಂಡ'])

        # 2. Advance fee, lottery, prize, cashback, unlock traps
        fee_keywords = ['fee', 'charge', 'deposit', 'unlock', 'lottery', 'prize', 'reward', 'refund', 'cashback', 'clearance', 'tax', 'release']
        has_advance_fee = any(re.search(rf'\b{w}\b', combined_text, re.IGNORECASE) for w in fee_keywords) or any(re.search(rf'{w}', combined_text) for w in ['ಶುಲ್ಕ', 'ಮುಂಗಡ', 'ಲಾಟರಿ', 'ಬಹುಮಾನ', 'ರಿಫಂಡ್'])

        # 3. Credential or remote access requests
        has_credential_request = bool(re.search(r'\b(?:otp|pin|password|anydesk|teamviewer|quicksupport|screen[\s-]?share)\b', combined_text, re.IGNORECASE)) or bool(re.search(r'(?:ಒಟಿಪಿ|ಪಿನ್|ಪಾಸ್‌ವರ್ಡ್|ಎನಿಡೆಸ್ಕ್)', combined_text))

        # 4. Suspicious handles mimicking government or refund services
        fake_official_handles = ['police', 'cbi', 'rbi', 'customs', 'sbikyc', 'hdfckyc', 'refund', 'lottery', 'official', 'support']
        has_suspicious_handle = any(h in upi_id for h in fake_official_handles)

        # 5. Evaluate Risk Classification
        if has_credential_request or (has_urgency and (has_advance_fee or 'police' in combined_text.lower() or 'cbi' in combined_text.lower())):
            risk_level = "HIGH RISK"
            contextual_lesson = "/learn#lesson-11"
            if has_credential_request:
                warning_signs_en.append("Payment details or instructions request an OTP, PIN, password, or remote access software.")
                warning_signs_kn.append("ಪಾವತಿ ವಿವರಗಳಲ್ಲಿ ಒಟಿಪಿ, ಪಿನ್, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ.")
            if has_urgency:
                warning_signs_en.append("High urgency and fear tactic detected (threat of arrest, penalty, or service disconnection).")
                warning_signs_kn.append("ಹೆಚ್ಚಿನ ಆತುರ ಅಥವಾ ಭಯದ ಬೆದರಿಕೆ ಕಂಡುಬಂದಿದೆ (ಬಂಧನ ಅಥವಾ ವಿದ್ಯುತ್ ಕಡಿತದ ಬೆದರಿಕೆ).")
            if has_advance_fee:
                warning_signs_en.append("Advance fee trap: Demanding money to unlock an account or claim an unverified prize/refund.")
                warning_signs_kn.append("ಮುಂಗಡ ಶುಲ್ಕದ ವಂಚನೆ: ಬಹುಮಾನ ಪಡೆಯಲು ಅಥವಾ ಖಾತೆ ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಹಣ ಕೇಳಲಾಗುತ್ತಿದೆ.")
        elif has_urgency or has_advance_fee or has_suspicious_handle or analysis.get('risk_level') in ['HIGH RISK', 'SUSPICIOUS', 'CAUTION']:
            risk_level = "CAUTION"
            contextual_lesson = "/learn#lesson-6"
            if has_suspicious_handle:
                warning_signs_en.append(f"The UPI handle '{upi_id}' mimics an official department or refund service.")
                warning_signs_kn.append(f"ಯುಪಿಐ ಐಡಿ '{upi_id}' ಅಧಿಕೃತ ಇಲಾಖೆ ಅಥವಾ ರಿಫಂಡ್ ಸೇವೆಯನ್ನು ನಕಲು ಮಾಡುತ್ತಿದೆ.")
            if has_urgency:
                warning_signs_en.append("Payment includes urgent deadlines or pressured circumstances.")
                warning_signs_kn.append("ಪಾವತಿಯಲ್ಲಿ ತುರ್ತು ಗಡುವು ಅಥವಾ ಒತ್ತಡದ ಸಂದರ್ಭಗಳಿವೆ.")
            if has_advance_fee:
                warning_signs_en.append("Unfamiliar fee or unverified refund processing claim.")
                warning_signs_kn.append("ಅಪರಿಚಿತ ಶುಲ್ಕ ಅಥವಾ ಪರಿಶೀಲಿಸದ ಮರುಪಾವತಿ ವಿನಂತಿ.")
        elif amount > 5000 and not any(w in purpose.lower() for w in ['electricity', 'rent', 'groceries', 'hospital', 'medicine', 'gift', 'bill']):
            risk_level = "CAUTION"
            contextual_lesson = "/learn#lesson-2"
            warning_signs_en.append(f"Relatively large payment (₹{amount:,.2f}) to an unverified recipient.")
            warning_signs_kn.append(f"ಅಪರಿಚಿತ ಸ್ವೀಕೃತಿದಾರರಿಗೆ ಹೆಚ್ಚಿನ ಮೊತ್ತ (₹{amount:,.2f}).")
        else:
            risk_level = "NO OBVIOUS WARNING SIGNS"
            contextual_lesson = "/learn#lesson-2"
            warning_signs_en.append("No immediate obvious warning signs detected in the entered payment details.")
            warning_signs_kn.append("ನಮೂದಿಸಿದ ಪಾವತಿ ವಿವರಗಳಲ್ಲಿ ಯಾವುದೇ ನೇರ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.")

        # Recommended Precautions
        if risk_level == "HIGH RISK":
            precautions_en = [
                "Do NOT proceed with this payment. Scammers use urgency, authority threats, and panic to force seniors to transfer money.",
                "Never share your OTP or enter your UPI PIN on instructions from unexpected callers or messages.",
                "Contact the organization through its independently verified physical contact details (from your passbook or card)."
            ]
            precautions_kn = [
                "ಈ ಪಾವತಿಯನ್ನು ಮುಂದುವರಿಸಬೇಡಿ. ವಂಚಕರು ಭಯ ಮತ್ತು ಆತುರ ಹುಟ್ಟಿಸಿ ಹಣ ವರ್ಗಾಯಿಸಲು ಒತ್ತಡ ಹೇರುತ್ತಾರೆ.",
                "ಅಪರಿಚಿತರ ಮಾತನ್ನು ನಂಬಿ ಎಂದಿಗೂ ಯುಪಿಐ ಪಿನ್ ಹಾಕಬೇಡಿ ಅಥವಾ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
                "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಯಿಂದ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ."
            ]
        elif risk_level == "CAUTION":
            precautions_en = [
                "Pause and verify: Confirm the recipient in person or call them on a known saved number before sending money.",
                "Remember: Entering your UPI PIN transfers money OUT of your account. You NEVER enter a PIN to receive money.",
                "Verify the recipient details with a family member or merchant before confirming."
            ]
            precautions_kn = [
                "ನಿಲ್ಲಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿ: ಹಣ ಕಳುಹಿಸುವ ಮುನ್ನ ಸ್ವೀಕರಿಸುವವರನ್ನು ವೈಯಕ್ತಿಕವಾಗಿ ಅಥವಾ ತಿಳಿದಿರುವ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ದೃಢಪಡಿಸಿ.",
                "ನೆನಪಿಡಿ: ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಹೊರಹೋಗುತ್ತದೆ. ಹಣ ಪಡೆಯಲು ಪಿನ್ ಅಗತ್ಯವಿಲ್ಲ.",
                "ದೃಢೀಕರಿಸುವ ಮುನ್ನ ಕುಟುಂಬದ ಸದಸ್ಯರೊಂದಿಗೆ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
            ]
        else:
            precautions_en = [
                "Always verify that the recipient name displayed on your screen matches the intended person.",
                "Remember: Entering your UPI PIN is ONLY to send money. Never share your secret PIN with anyone."
            ]
            precautions_kn = [
                "ಪರದೆಯ ಮೇಲಿನ ಸ್ವೀಕರಿಸುವವರ ಹೆಸರು ನೀವು ಪಾವತಿಸಲು ಉದ್ದೇಶಿಸಿರುವ ವ್ಯಕ್ತಿಯ ಹೆಸರಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ.",
                "ನೆನಪಿಡಿ: ಯುಪಿಐ ಪಿನ್ ಹಾಕುವುದು ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ನಿಮ್ಮ ರಹಸ್ಯ ಪಿನ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
            ]

        return jsonify({
            "status": "success",
            "risk_classification": risk_level,
            "verification_status": "Unverified Demo UPI ID — Always confirm recipient in person",
            "warning_signs": warning_signs_kn if is_kn else warning_signs_en,
            "warning_signs_en": warning_signs_en,
            "warning_signs_kn": warning_signs_kn,
            "recommended_precautions": precautions_kn if is_kn else precautions_en,
            "recommended_precautions_en": precautions_en,
            "recommended_precautions_kn": precautions_kn,
            "contextual_lesson": contextual_lesson,
            "details": {
                "recipient": recipient,
                "upi_id": upi_id,
                "amount": f"₹{amount:,.2f}",
                "raw_amount": amount,
                "purpose": purpose
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"Payment assessment error: {str(e)}"}), 400


@app.route('/api/payment/confirm', methods=['POST'])
def api_payment_confirm():
    """
    Confirms a demonstration payment in Smart Payment Assistant.
    Generates a unique demo transaction reference and saves the simulated transaction in SQLite.
    Strictly educational simulator: NEVER connects to real money or banking rails.
    """
    try:
        data = request.get_json(force=True) if request.is_json else request.form
        recipient = (data.get('recipient_name') or '').strip()
        upi_id = (data.get('upi_id') or '').strip()
        amount_str = str(data.get('amount') or '0').replace('₹', '').replace(',', '').strip()
        purpose = (data.get('purpose') or 'General Payment').strip()
        risk_classification = (data.get('risk_classification') or 'NO OBVIOUS WARNING SIGNS').strip()
        warning_signs = (data.get('warning_signs') or '').strip()
        acknowledged = bool(data.get('acknowledged_high_risk', False))

        if not recipient:
            return jsonify({"status": "error", "message": "Recipient name is required."}), 400
        if not upi_id:
            return jsonify({"status": "error", "message": "UPI ID is required."}), 400

        try:
            amount = float(amount_str)
            if amount <= 0:
                return jsonify({"status": "error", "message": "Please enter a valid amount greater than 0."}), 400
        except ValueError:
            return jsonify({"status": "error", "message": "Please enter a numeric amount."}), 400

        # Require explicit acknowledgment for high risk before allowing demo payment to continue
        if risk_classification == 'HIGH RISK' and not acknowledged:
            return jsonify({
                "status": "error",
                "message": "High-risk payment requires explicit acknowledgment of warning signs before demonstration confirmation."
            }), 400

        txn = add_simulated_transaction(
            recipient_name=recipient,
            upi_id=upi_id,
            amount=amount,
            purpose=purpose,
            status="Completed",
            risk_classification=risk_classification,
            verification_status="Unverified Demo UPI ID — Always confirm recipient in person",
            warning_signs=warning_signs
        )

        return jsonify({
            "status": "success",
            "transaction": txn,
            "message": "DEMO PAYMENT COMPLETED — NO REAL MONEY TRANSFERRED.",
            "demo_notice": "SIMULATED DEMONSTRATION PAYMENT — NO REAL MONEY WAS TRANSFERRED."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"Payment confirmation error: {str(e)}"}), 400


@app.route('/api/payment/cancel', methods=['POST'])
def api_payment_cancel():
    """
    Handles payment cancellation in Smart Payment Assistant.
    Records payment as 'Cancelled by User' so it is excluded from successful totals.
    """
    try:
        data = request.get_json(silent=True) or request.form
        recipient = (data.get('recipient_name') or 'Demo Merchant').strip()
        upi_id = (data.get('upi_id') or 'demo@safe').strip()
        amount_str = str(data.get('amount') or '0').replace('₹', '').replace(',', '').strip()
        purpose = (data.get('purpose') or 'Cancelled Demo Payment').strip()
        risk = (data.get('risk_classification') or 'CAUTION').strip()

        try:
            amount = float(amount_str)
        except ValueError:
            amount = 0.0

        txn = add_simulated_transaction(
            recipient_name=recipient,
            upi_id=upi_id,
            amount=amount,
            purpose=purpose,
            status="Cancelled by User",
            risk_classification=risk,
            verification_status="Demo Payment Cancelled Safely",
            warning_signs="User cancelled payment after reviewing safety assessment."
        )

        return jsonify({
            "status": "success",
            "message": "Demo payment cancelled safely. No money transferred.",
            "transaction": txn
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"Cancel error: {str(e)}"}), 400


@app.route('/api/transactions', methods=['GET'])
def api_transactions():
    """
    Returns simulated demonstration transactions from SQLite safepay.db.
    Supports search by recipient, filter by status and risk, and sorting by date.
    Calculates statistics of successful demo transactions only.
    """
    try:
        search = request.args.get('search', '').strip()
        status = request.args.get('status', '').strip()
        risk = request.args.get('risk', '').strip()
        sort_order = request.args.get('sort', 'DESC').strip()

        transactions = get_simulated_transactions(
            search=search,
            status=status,
            risk=risk,
            sort_order=sort_order
        )
        stats = get_transaction_stats()

        return jsonify({
            "status": "success",
            "transactions": transactions,
            "stats": stats,
            "filters": {
                "search": search,
                "status": status,
                "risk": risk,
                "sort": sort_order
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"Transactions query error: {str(e)}"}), 400



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("=" * 60)
    print("  EASY PAY - SAFE PAY (Hackurity 2026)")
    print("  Senior Citizen Digital Payment Safety Web App")
    print(f"  Starting Flask server on http://0.0.0.0:{port} ...")
    print("=" * 60)
    app.run(host='0.0.0.0', port=port, debug=False)
