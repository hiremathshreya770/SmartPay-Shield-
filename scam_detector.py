"""
EASY PAY — SAFE PAY: Scam Detection & Personal Assistant Engine
Senior-Friendly Fraud Prevention & Security Guidance.

Combines:
1. Calibrated Machine Learning Text-Classification Model (TF-IDF + Logistic Regression)
   trained on the Scam/Spam India Dataset.
2. Comprehensive Safety Check Engine covering:
   - OTP, UPI PIN, password, and banking credential requests.
   - Urgent threats involving account blocking, disconnection, or arrest (Digital Arrest).
   - Fake prizes, lottery winnings, and refund claims.
   - Suspicious links and remote-access applications (AnyDesk, TeamViewer, QuickSupport).
   - Unexpected payment requests and QR code scanning traps.
   - Requests to transfer money to unlock an account or receive a reward.
3. Spelling variation & leetspeak normalization.
4. Exact identified phrase extraction from user input.
5. Cautious disagreement resolution between ML model and safety rules.
6. Honest transparency: English-only dataset scope, no false certainty, no external APIs.
7. Bilingual English and Kannada explanations and next actions.
"""

import re
from pathlib import Path
from typing import Dict, List, Any, Optional

# Attempt import of model loader and prediction function from train_model
try:
    from train_model import load_trained_model, predict_message, DEFAULT_MODEL_PATH
except ImportError:
    load_trained_model = None
    predict_message = None
    DEFAULT_MODEL_PATH = Path(__file__).resolve().parent / "model" / "scam_classifier.joblib"


def normalize_text_variations(text: str) -> str:
    """
    Normalizes common spelling variations, leetspeak, spacing obfuscations,
    and ordinary message formatting so that hidden scam indicators can be evaluated.
    """
    if not text:
        return ""

    normalized = text.lower()

    # 1. Spaced acronyms normalization (e.g. "o t p" -> "otp", "u p i" -> "upi")
    spaced_acronyms = [
        (r'\bo\s+t\s+p\b', 'otp'),
        (r'\bu\s+p\s+i\b', 'upi'),
        (r'\bp\s+i\s+n\b', 'pin'),
        (r'\bk\s+y\s+c\b', 'kyc'),
        (r'\bc\s+v\s+v\b', 'cvv'),
        (r'\bm\s+p\s+i\s+n\b', 'mpin'),
        (r'\bb\s+l\s+o\s+c\s+k\b', 'block'),
        (r'\ba\s+n\s+y\s+d\s+e\s+s\s+k\b', 'anydesk'),
    ]
    for pattern, repl in spaced_acronyms:
        normalized = re.sub(pattern, repl, normalized)

    # 2. Punctuation-separated acronyms (e.g. "o-t-p", "o.t.p", "u-p-i", "p.i.n")
    punct_acronyms = [
        (r'\bo[-.]t[-.]p\b', 'otp'),
        (r'\bu[-.]p[-.]i\b', 'upi'),
        (r'\bp[-.]i[-.]n\b', 'pin'),
        (r'\bk[-.]y[-.]c\b', 'kyc'),
        (r'\bc[-.]v[-.]v\b', 'cvv'),
    ]
    for pattern, repl in punct_acronyms:
        normalized = re.sub(pattern, repl, normalized)

    # 3. Leetspeak substitutions in known sensitive keyword contexts
    # 0 -> o in specific keywords
    normalized = re.sub(r'\b0tp\b', 'otp', normalized)
    normalized = re.sub(r'\bbl0ck(ed)?\b', r'block\1', normalized)
    normalized = re.sub(r'\bl0tt(ery)?\b', r'lott\1', normalized)
    normalized = re.sub(r'\bb0nus\b', 'bonus', normalized)
    # 1, !, | -> i in specific keywords
    normalized = re.sub(r'\bp[1!|]n\b', 'pin', normalized)
    normalized = re.sub(r'\bcl[1!]ck\b', 'click', normalized)
    normalized = re.sub(r'\bw[1!]n\b', 'win', normalized)
    # @ -> a in specific keywords
    normalized = re.sub(r'\bb@nk\b', 'bank', normalized)
    normalized = re.sub(r'\bp@ssword\b', 'password', normalized)
    normalized = re.sub(r'\bcl@im\b', 'claim', normalized)
    # $ -> s
    normalized = re.sub(r'\b\$cam\b', 'scam', normalized)
    normalized = re.sub(r'\bpa\$\$word\b', 'password', normalized)
    # 3 -> e in specific keywords
    normalized = re.sub(r'\burg3nt\b', 'urgent', normalized)
    normalized = re.sub(r'\banyd3sk\b', 'anydesk', normalized)

    # 4. Common phonetic misspellings & Indian SMS abbreviations
    misspellings = [
        (r'\bimmi?diate(ly)?\b', r'immediate\1'),
        (r'\bimmedate(ly)?\b', r'immediate\1'),
        (r'\burgnt\b', 'urgent'),
        (r'\bcongratulat?ion\b', 'congratulations'),
        (r'\bcongrats?\b', 'congratulations'),
        (r'\bdeactivte\b', 'deactivate'),
        (r'\bdisconnet(ed)?\b', r'disconnect\1'),
        (r'\belectrcity\b', 'electricity'),
        (r'\btransfr\b', 'transfer'),
        (r'\bacc?nt\b', 'account'),
        (r'\ba/c\b', 'account'),
    ]
    for pattern, repl in misspellings:
        normalized = re.sub(pattern, repl, normalized)

    return normalized


class ScamMLModel:
    """
    Machine Learning Text Classifier interface for the Scam/Spam India Dataset.
    Uses TF-IDF feature extraction and Logistic Regression pipeline.
    Natively calibrated via Logistic Regression sigmoid probabilities.
    Does NOT invent fake training data if model file is missing.
    """

    def __init__(self, model_path: Optional[Path] = None):
        self.model_path = model_path or DEFAULT_MODEL_PATH
        self.pipeline = None
        self.is_trained = False
        self._load_model()

    def _load_model(self):
        """Attempts to load the trained model pipeline from disk."""
        if load_trained_model is not None:
            self.pipeline = load_trained_model(self.model_path)
            self.is_trained = self.pipeline is not None
        else:
            self.is_trained = False
            self.pipeline = None

    def predict(self, text: str) -> Dict[str, Any]:
        """
        Runs ML prediction on the given text input.
        Returns calibrated prediction, confidence, and transparent scope documentation.
        """
        clean_text = (text or "").strip()
        has_latin = bool(re.search(r'[a-zA-Z]', clean_text))
        has_kannada = bool(re.search(r'[\u0C80-\u0CFF]', clean_text))

        # Check if text is non-English
        if has_kannada and not has_latin:
            return {
                "model_available": self.is_trained,
                "is_english": False,
                "prediction": "Rules-Based Multilingual Evaluation",
                "fraud_probability": None,
                "scam_likelihood_pct": None,
                "confidence_pct": None,
                "confidence_level": "N/A",
                "calibrated": False,
                "model_type": "Multilingual Safety Rules Engine",
                "status_message": "Dataset is English-only. Kannada text evaluated via safety rules.",
                "note_en": "The statistical ML model is trained and evaluated on the English Scam/Spam India dataset only. Kannada text is analyzed using our comprehensive multilingual safety rules.",
                "note_kn": "ಯಂತ್ರ ಕಲಿಕೆ (ML) ಮಾದರಿಯನ್ನು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಯ ಡೇಟಾಸೆಟ್‌ನಲ್ಲಿ ಮಾತ್ರ ತರಬೇತುಗೊಳಿಸಲಾಗಿದೆ. ಕನ್ನಡ ಸಂದೇಶಗಳನ್ನು ನಮ್ಮ ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತದೆ."
            }

        # Check if model has not been trained yet
        if not self.is_trained or not self.pipeline:
            # Recheck once in case model was recently saved
            self._load_model()

        if not self.is_trained or not self.pipeline:
            return {
                "model_available": False,
                "is_english": has_latin,
                "prediction": "Model Awaiting Dataset Training",
                "fraud_probability": None,
                "scam_likelihood_pct": None,
                "confidence_pct": None,
                "confidence_level": "N/A",
                "calibrated": False,
                "model_type": "TF-IDF + Logistic Regression (Not yet trained)",
                "status_message": "No trained model file found. Place data1.csv/data2.csv in the project and run 'python train_model.py'.",
                "note_en": "Machine Learning model is awaiting dataset training. Safety rule checks are actively evaluating this message.",
                "note_kn": "ಡೇಟಾಸೆಟ್ ಕಡತಗಳು ಲಭ್ಯವಿಲ್ಲದ ಕಾರಣ ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿ ಸಿದ್ಧವಾಗಿಲ್ಲ. ಸುರಕ್ಷತಾ ನಿಯಮಗಳು ಈ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿವೆ."
            }

        # Model is trained and available: Run calibrated inference
        normalized = normalize_text_variations(clean_text)
        probs = self.pipeline.predict_proba([normalized])[0]
        prob_legit = float(probs[0])
        prob_fraud = float(probs[1])

        is_fraud = prob_fraud >= 0.5
        fraud_pct = round(prob_fraud * 100, 1)

        # Calibrated confidence from Logistic Regression
        confidence_val = max(prob_fraud, prob_legit)
        confidence_pct = round(confidence_val * 100, 1)

        if confidence_pct >= 80.0:
            confidence_level = "High"
        elif confidence_pct >= 60.0:
            confidence_level = "Moderate"
        else:
            confidence_level = "Low"

        return {
            "model_available": True,
            "is_english": True,
            "prediction": "Potentially Fraudulent" if is_fraud else "Legitimate",
            "fraud_probability": round(prob_fraud, 4),
            "scam_likelihood_pct": fraud_pct,
            "confidence_pct": confidence_pct,
            "confidence_level": confidence_level,
            "calibrated": True,
            "model_type": "TF-IDF + Logistic Regression (Scam/Spam India Dataset)",
            "status_message": "Calibrated prediction generated from trained Logistic Regression pipeline.",
            "note_en": f"Evaluated using English ML model (TF-IDF + Logistic Regression). Calibrated confidence: {confidence_pct}%.",
            "note_kn": f"ಇಂಗ್ಲಿಷ್ ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿಯಿಂದ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ. ಕ್ಯಾಲಿಬ್ರೇಟೆಡ್ ವಿಶ್ವಾಸಾರ್ಹತೆ: {confidence_pct}%."
        }


class ScamDetector:
    """
    Combined Machine Learning and Safety Rule-Engine for Digital Fraud Detection.
    Tailored for senior citizens and digital payment beginners in India.

    Comprehensive Safety Checks:
    1. OTP, UPI PIN, password, and banking credential requests.
    2. Urgent threats involving account blocking, disconnection, or arrest (Digital Arrest).
    3. Fake prizes, lottery winnings, and refund claims.
    4. Suspicious links and requests to install remote-access applications (AnyDesk, etc.).
    5. Unexpected payment requests or requests to scan QR codes.
    6. Requests to transfer money to unlock an account or receive a reward (Advance fee fraud).
    """

    # Category 1: OTP, UPI PIN, Password & Credential Harvesting
    OTP_PATTERNS = [
        r'\b(?:otp|one[\s-]?time[\s-]?password|verification[\s-]?code)\b',
        r'\b(?:upi[\s-]?pin|atm[\s-]?pin|mpin|security[\s-]?pin)\b',
        r'\b(?:cvv|card[\s-]?number|expiry[\s-]?date|debit[\s-]?card|credit[\s-]?card)\b',
        r'\b(?:netbanking[\s-]?password|login[\s-]?password|secret[\s-]?pin|credentials?)\b',
        r'\b(?:share|send|provide|tell|type|enter|ask(?:ing)?\s+for)\s+(?:your\s+)?(?:otp|pin|password|cvv|credentials?)\b',
        r'\b(?:asking\s+for\s+my\s+otp)\b',
        r'\b(?:do\s+not\s+share\b.*)?(?:send|give)\s+otp\b',
        # Kannada patterns
        r'(?:ಒಟಿಪಿ|ಪಾಸ್‌ವರ್ಡ್|ಪಿನ್|ಯುಪಿಐ\s*ಪಿನ್|ಸಿವಿವಿ|ಕಾರ್ಡ್\s*ಸಂಖ್ಯೆ|ರಹಸ್ಯ\s*ಪಿನ್)'
    ]

    # Category 2: Urgent Threats, Fear Tactics, Account Blocking & Digital Arrest
    URGENCY_PATTERNS = [
        r'\b(?:account|debit[\s-]?card|card|services?|sim|electricity|power)\s+(?:will\s+be\s+|has\s+been\s+)?(?:block(?:ed)?|suspend(?:ed)?|deactivat(?:ed)?|disconnect(?:ed)?|cut[\s-]?off|clos(?:ed)?)\b',
        r'\b(?:blocked\s+today|blocked\s+within|account\s+will\s+be\s+blocked|card\s+blocked)\b',
        r'\b(?:electricity\s+bill\s+unpaid|power\s+supply\s+will\s+be\s+disconnected|power\s+will\s+be\s+cut)\b',
        r'\b(?:within\s+\d+\s+(?:hours?|hrs?|minutes?|mins?)|tonight\s+at\s+\d+|immediately|urgent(?:ly)?|act\s+now|last\s+chance|final\s+notice)\b',
        r'\b(?:police|cbi|customs|narcotics|officer)\b.*?(?:calling|called|caller|arrest|parcel|bail|case|claim|investigat)',
        r'\b(?:called|calling|phone\s+call|caller)\b.*?(?:police|cbi|customs|narcotics|officer)',
        r'\b(?:claiming\s+to\s+be\s+from\s+(?:the\s+)?police|someone\s+called\s+claiming\s+to\s+be\s+from\s+the\s+police)\b',
        r'\b(?:pan\s+card\s+(?:block|deactivat|link)|aadhaar\s+suspended|kyc\s+(?:suspend|pending|expir(?:ed)?|updat(?:e|ed)))\b',
        r'\b(?:call\s+immediately|contact\s+officer|contact\s+branch\s+manager)\b',
        # Kannada patterns
        r'(?:ಖಾತೆ\s*(?:ಸ್ಥಗಿತ|ಬ್ಲಾಕ್|ರದ್ದು)|ವಿದ್ಯುತ್\s*ಕಡಿತ|ಡಿಜಿಟಲ್\s*ಅರೆಸ್ಟ್|ಪೊಲೀಸ್|ಬಂಧನ|ತಕ್ಷಣ|ಇಂದೇ|ಕೇಸ್|ಪೊಲೀಸ್\s*ಹೆಸರಿನಲ್ಲಿ\s*ಕರೆ)'
    ]

    # Category 3: Fake Prizes, Lotteries, Refunds & Cashbacks
    PRIZE_PATTERNS = [
        r'\b(?:congratulations?|congrats?|winner|lucky\s+draw|lottery|kbc|kaun\s+banega\s+crorepati)\b',
        r'\b(?:won|win|credited)\s+(?:rs\.?|inr|₹)?\s*[\d,]+(?:\s*(?:lakhs?|crores?|rupees))?\b',
        r'\b(?:cashback|reward\s+points?|scratch\s+card|gift\s+card|bonus\s+prize)\b',
        r'\b(?:claim\s+(?:your\s+)?(?:prize|reward|refund|cashback|gift))\b',
        r'\b(?:refund\s+of\s+rs|income\s+tax\s+refund|subsidy\s+amount|subsidy\s+approved)\b',
        r'\b(?:part[\s-]?time\s+job|earn\s+rs\b.*per\s+day|work\s+from\s+home\s+earn)\b',
        # Kannada patterns
        r'(?:ಬಹುಮಾನ|ಲಾಟರಿ|ಗೆದ್ದಿದ್ದೀರಿ|ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್|ಉಚಿತ\s*ಹಣ|ರಿಫಂಡ್|ಸಬ್ಸಿಡಿ)'
    ]

    # Category 4: Suspicious Links & Shorteners
    LINK_PATTERNS = [
        r'https?://[^\s]+',
        r'www\.[^\s]+',
        r'\b(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|shorturl\.at|gg\.gg)\b[^\s]*',
        r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b[^\s]*',
        r'\.apk\b',
        r'\.(?:xyz|top|live|club|buzz|online|icu|vip|work|click)\b',
        r'\b(?:sbi|pnb|hdfc|icici|paytm|phonepe|gpay|bank)[^\s]*-(?:kyc|update|login|reward|verify)\b',
        r'\b(?:clicked\s+a\s+suspicious\s+link|clicked\s+a\s+link|opened\s+link)\b',
        # Kannada patterns
        r'(?:ಲಿಂಕ್|ಅನುಮಾನಾಸ್ಪದ\s*ಲಿಂಕ್)'
    ]

    # Category 5: Remote Access & Screen Sharing Applications
    REMOTE_ACCESS_PATTERNS = [
        r'\b(?:anydesk|teamviewer|quicksupport|rustdesk|airdroid|zoho\s+assist|ultraviewer|screen\s*share|share\s+your\s+screen)\b',
        r'\b(?:install|download)\s+(?:the\s+)?(?:app|apk|software|file|tool)\s+(?:to\s+verify|to\s+cancel|for\s+support|to\s+receive)\b',
        r'\b(?:remote\s+access|remote\s+support|desktop\s+sharing)\b',
        # Kannada patterns
        r'(?:ಎನಿಡೆಸ್ಕ್|ಸ್ಕ್ರೀನ್\s*ಶೇರ್|ರಿಮೋಟ್\s*ಆ್ಯಪ್|ಆ್ಯಪ್\s*ಇನ್‌ಸ್ಟಾಲ್)'
    ]

    # Category 6: QR Code & UPI Collect Request Traps
    COLLECT_QR_PATTERNS = [
        r'\b(?:scan\s+(?:this\s+)?qr\s*(?:code)?\s+to\s+(?:receive|get|claim)\s+money)\b',
        r'\b(?:enter\s+(?:upi\s+)?pin\s+to\s+(?:receive|get|credit)\s+money)\b',
        r'\b(?:approve\s+(?:the\s+)?collect\s+request|accept\s+request\s+to\s+get)\b',
        r'\b(?:upi\s+collect|collect\s+request|payment\s+request|received\s+a\s+upi\s+payment\s+request)\b',
        r'\b(?:scan\s+qr|scan\s+code\s+to\s+receive)\b',
        # Kannada patterns
        r'(?:ಕ್ಯೂಆರ್\s*ಕೋಡ್|ಕಲೆಕ್ಟ್\s*ರಿಕ್ವೆಸ್ಟ್|ಪಾವತಿ\s*ವಿನಂತಿ|ಹಣ\s*ಪಡೆಯಲು\s*ಪಿನ್|ಸ್ಕ್ಯಾನ್)'
    ]

    # Category 7: Transfer Money to Unlock Account or Receive Reward (Advance Fee Fraud)
    UNLOCK_TRANSFER_PATTERNS = [
        r'\b(?:transfer|send|pay|deposit)\s+(?:rs\.?|inr|₹)?\s*[\d,]+\s*(?:to\s+(?:unlock|activate|verify|unfreeze)|registration\s+fee|processing\s+fee|security\s+deposit|clearance\s+charge|tax\s+fee)\b',
        r'\b(?:pay\s+rs\b.*to\s+receive|send\s+rs\b.*registration\s+fee|pay\s+fee\s+to\s+claim)\b',
        r'\b(?:safe\s+(?:police|rbi|cbi|government)\s+account|verification\s+account|security\s+deposit\s+to\s+receive)\b',
        r'\b(?:pay\s+bail|transfer\s+money\s+to\s+avoid\s+arrest|transfer\s+to\s+unfreeze)\b',
        # Kannada patterns
        r'(?:ಖಾತೆ\s*ತೆರೆಯಲು\s*ಹಣ|ಮುಂಗಡ\s*ಶುಲ್ಕ|ನೋಂದಣಿ\s*ಶುಲ್ಕ|ಹಣ\s*ವರ್ಗಾಯಿಸಿ)'
    ]

    # Phone Call Interaction Indicators
    PHONE_CALL_PATTERNS = [
        r'\b(?:someone\s+called|caller|phone\s+call|on\s+the\s+phone|called\s+me|received\s+a\s+call|incoming\s+call)\b',
        r'\b(?:claiming\s+to\s+be\s+from|pressuring\s+me|demanding\s+transfer|told\s+me\s+to\s+stay\s+on\s+line)\b',
        r'\b(?:someone\s+called\s+claiming\s+to\s+be\s+from\s+the\s+police)\b',
        r'\b(?:caller\s+asking|caller\s+pressuring|speaking\s+to\s+an\s+agent)\b',
        # Kannada patterns
        r'(?:ಕರೆ\s*ಮಾಡಿದ್ದಾರೆ|ಫೋನ್\s*ಕರೆ|ಕರೆ\s*ಬಂದಿದೆ|ಪೊಲೀಸ್\s*ಹೆಸರಿನಲ್ಲಿ\s*ಕರೆ)'
    ]

    # Incident: User Already Sent Money
    ALREADY_SENT_PATTERNS = [
        r'\b(?:i\s+already\s+sent\s+money|already\s+(?:sent|transferred|paid|lost|given)|money\s+deducted|money\s+debited)\b',
        r'\b(?:sent\s+money|accidentally\s+(?:sent|transferred|paid)|scammed\s+my\s+money|transferred\s+(?:rs\.?|inr|₹|\d+|money|amount)|i\s+paid\s+the\s+caller)\b',
        r'\b(?:entered\s+my\s+pin\s+and\s+money\s+was\s+cut|funds\s+transferred|money\s+was\s+debited|lost\s+money\s+to\s+scam)\b',
        # Kannada patterns
        r'(?:ಹಣ\s*ಕಳುಹಿಸಿಬಿಟ್ಟಿದ್ದೇನೆ|ಹಣ\s*ವರ್ಗಾಯಿಸಿದ್ದೇನೆ|ಖಾತೆಯಿಂದ\s*ಹಣ\s*ಕಟ್\s*ಆಗಿದೆ|ಹಣ\s*ಪಾವತಿಸಿದ್ದೇನೆ|ಹಣ\s*ಕಳೆದುಕೊಂಡಿದ್ದೇನೆ)'
    ]

    def __init__(self, model_path: Optional[Path] = None):
        self.ml_model = ScamMLModel(model_path)

    def extract_identified_phrases(self, text: str) -> List[str]:
        """
        Extracts exact suspicious words and phrases found in the user's submitted text.
        Never invents evidence not present in the user's message.
        """
        found = []
        lower_text = text.lower()
        normalized_text = normalize_text_variations(text)

        target_phrases = [
            # OTP & PIN
            "share your otp", "share otp", "send otp", "enter otp", "provide otp", "give otp",
            "your otp", "upi pin", "mpin", "atm pin", "password", "cvv", "6-digit otp", "4-digit pin",
            "asking for my otp", "asking for otp", "enter pin",
            # Urgency & Threat
            "will be blocked", "blocked today", "account will be blocked", "card has been blocked",
            "debit card is blocked", "card is blocked", "suspended", "immediately", "urgent", "urgently",
            "last chance", "final notice", "within 2 hours", "tonight at", "power will be disconnected",
            "electricity will be disconnected", "electricity power will be cut", "digital arrest",
            "arrest warrant", "police case", "cbi", "customs", "illegal parcel", "drugs found",
            "kyc pending", "kyc expire", "pan card block", "sim deactivat",
            # Remote Access
            "anydesk", "teamviewer", "quicksupport", "screen share", "remote access", "download app",
            "install app", "install anydesk", "quick support",
            # Collect & QR
            "upi collect", "collect request", "payment request", "scan qr code", "scan qr",
            "enter pin to receive", "enter pin to get", "received a upi payment request",
            "scan code to receive",
            # Advance Fee / Unlock Transfer
            "registration fee", "processing fee", "security deposit", "transfer money to unlock",
            "pay to receive", "safe account", "transfer to avoid arrest",
            # Lottery & Prizes
            "congratulations", "winner", "lucky draw", "kbc", "won rs", "claim your prize",
            "claim prize", "cashback", "refund of rs", "part time job", "earn rs",
            # Police & Authority
            "someone called claiming to be from the police", "claiming to be from the police",
            "someone called", "from the police", "police officer", "digital arrest warrant", "police",
            # Incident & Queries
            "already sent money", "bank message", "clicked a suspicious link", "suspicious link", "clicked a link",
            # Links
            "bit.ly", "tinyurl", ".apk", "http://", "https://"
        ]

        for phrase in target_phrases:
            idx = lower_text.find(phrase)
            if idx != -1:
                exact_sub = text[idx:idx + len(phrase)].strip()
                if exact_sub and exact_sub not in found:
                    found.append(exact_sub)

        # Also search for leetspeak / normalized phrase matches if not already caught
        normalized_targets = ["otp", "upi pin", "anydesk", "block", "quicksupport"]
        for nt in normalized_targets:
            if nt in normalized_text and not any(nt in f.lower() for f in found):
                # Find corresponding original token
                tokens = text.split()
                for token in tokens:
                    if normalize_text_variations(token) == nt:
                        if token not in found:
                            found.append(token)

        # Kannada target phrases
        kn_phrases = [
            "ಒಟಿಪಿ", "ಯುಪಿಐ ಪಿನ್", "ಬ್ಲಾಕ್", "ಸ್ಥಗಿತ", "ವಿದ್ಯುತ್ ಕಡಿತ", "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್",
            "ಪೊಲೀಸ್", "ಎನಿಡೆಸ್ಕ್", "ಕ್ಯೂಆರ್ ಕೋಡ್", "ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್", "ಲಿಂಕ್", "ತಕ್ಷಣ", "ಮುಂಗಡ ಶುಲ್ಕ"
        ]
        for kn_p in kn_phrases:
            if kn_p in text and kn_p not in found:
                found.append(kn_p)

        return found

    def analyze(self, text: str, language: str = 'en') -> Dict[str, Any]:
        """
        Comprehensive analysis returning structured safety data.
        Classifies actual input using trained ML model combined with safety rules.
        """
        clean_text = (text or "").strip()
        lower_text = clean_text.lower()
        normalized_text = normalize_text_variations(clean_text)

        # 1. Handle empty input
        if not clean_text:
            return {
                "risk_level": "NO OBVIOUS WARNING SIGNS",
                "legacy_risk_level": "NO OBVIOUS WARNING SIGNS",
                "risk_score": 0,
                "headline_en": "Please enter a message or question to analyze",
                "headline_kn": "ದಯವಿಟ್ಟು ವಿಶ್ಲೇಷಿಸಲು ಸಂದೇಶ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ",
                "identified_phrases": [],
                "why_flagged_en": ["No message text was provided for analysis."],
                "why_flagged_kn": ["ಪರಿಶೀಲನೆಗಾಗಿ ಯಾವುದೇ ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿಲ್ಲ."],
                "what_to_do_en": ["Type or paste any SMS, message, or phone call description into the box above."],
                "what_to_do_kn": ["ಮೇಲಿನ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ಯಾವುದೇ ಎಸ್ಎಂಎಸ್ ಅಥವಾ ಕರೆಯ ವಿವರಗಳನ್ನು ಬರೆಯಿರಿ."],
                "phone_call_assistance": None,
                "already_sent_money": None,
                "no_warning_signs_text_en": "We did not find obvious warning signs in this message. However, this does not prove that it is genuine. Verify the sender independently before clicking a link, sharing information, or making a payment.",
                "no_warning_signs_text_kn": "ಈ ಸಂದೇಶದಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವೆಂಬ ಖಾತರಿಯಲ್ಲ. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ, ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳುವ ಅಥವಾ ಪಾವತಿ ಮಾಡುವ ಮುನ್ನ ಕಳುಹಿಸಿದವರನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
                "ml_model_result": {
                    "model_available": self.ml_model.is_trained,
                    "is_english": False,
                    "prediction": "None",
                    "fraud_probability": 0.0,
                    "scam_likelihood_pct": 0,
                    "confidence_pct": None,
                    "confidence_level": "N/A",
                    "calibrated": False,
                    "model_type": "TF-IDF + Logistic Regression",
                    "status_message": "No text provided.",
                    "note_en": "No text provided.",
                    "note_kn": "ಯಾವುದೇ ಪಠ್ಯ ನೀಡಿಲ್ಲ."
                },
                "disagreement_detected": False,
                "disagreement_explanation_en": None,
                "disagreement_explanation_kn": None,
                "language_scope_note_en": "No text provided.",
                "language_scope_note_kn": "ಯಾವುದೇ ಪಠ್ಯ ನೀಡಿಲ್ಲ.",
                "detected_flags": [],
                "explanations_en": [],
                "explanations_kn": [],
                "advice_en": [],
                "advice_kn": [],
                "checked_length": 0,
                "educational_disclaimer": "This educational assistant provides risk guidance based on pattern analysis and machine learning; it never guarantees fraud or legitimacy. Never share passwords, OTPs, or UPI PINs.",
                "educational_disclaimer_kn": "ಇದು ಶೈಕ್ಷಣಿಕ ಸಹಾಯಕವಾಗಿದ್ದು, ಸುರಕ್ಷತೆಯ ಸಂಪೂರ್ಣ ಖಾತರಿಯಲ್ಲ. ಎಂದಿಗೂ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
            }

        # Check for general question: "Is this bank message suspicious?"
        if re.search(r'^\s*(?:is\s+this\s+bank\s+message\s+suspicious\??|how\s+to\s+know\s+if\s+bank\s+message\s+is\s+scam\??|is\s+my\s+bank\s+message\s+fake\??)\s*$', lower_text):
            return {
                "risk_level": "SUSPICIOUS",
                "legacy_risk_level": "SUSPICIOUS",
                "risk_score": 2,
                "headline_en": "How to Check if a Bank Message is Suspicious",
                "headline_kn": "ಬ್ಯಾಂಕ್ ಸಂದೇಶ ಅನುಮಾನಾಸ್ಪದವೇ ಎಂದು ತಿಳಿಯುವುದು ಹೇಗೆ",
                "identified_phrases": ["bank message", "suspicious"],
                "why_flagged_en": [
                    "A bank message is suspicious if it threatens immediate account blocking or power cutoff.",
                    "Genuine banks NEVER ask for your OTP, UPI PIN, or netbanking passwords over SMS or phone calls.",
                    "Genuine bank alerts will never include shortened web links (e.g., bit.ly) or APK downloads to update KYC."
                ],
                "why_flagged_kn": [
                    "ಖಾತೆ ಸ್ಥಗಿತ, ಒಟಿಪಿ ಅಥವಾ ತಕ್ಷಣದ ಕ್ರಮಕ್ಕೆ ಒತ್ತಾಯಿಸುವ ಬ್ಯಾಂಕ್ ಸಂದೇಶಗಳು ವಂಚನೆಯ ಲಕ್ಷಣಗಳಾಗಿವೆ.",
                    "ನೈಜ ಬ್ಯಾಂಕುಗಳು ಎಂದಿಗೂ ಒಟಿಪಿ, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಕೇಳುವುದಿಲ್ಲ.",
                    "ಅಧಿಕೃತ ಬ್ಯಾಂಕುಗಳು ಕಿರು ಲಿಂಕ್ ಅಥವಾ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವಂತೆ ಕೇಳುವುದಿಲ್ಲ."
                ],
                "what_to_do_en": [
                    "Paste the exact text of your bank message into this assistant to check it.",
                    "Do not click links or call phone numbers sent inside the SMS.",
                    "Contact your bank using its independently verified official contact details (from your passbook or back of your card)."
                ],
                "what_to_do_kn": [
                    "ಪರಿಶೀಲಿಸಲು ನಿಮಗೆ ಬಂದ ಸಂದೇಶದ ಪೂರ್ಣ ಪಠ್ಯವನ್ನು ಈ ಸಹಾಯಕ್ಕೆ ಪೇಸ್ಟ್ ಮಾಡಿ.",
                    "ಸಂದೇಶದಲ್ಲಿರುವ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಅದರಲ್ಲಿರುವ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ.",
                    "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಎಟಿಎಂ ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ."
                ],
                "phone_call_assistance": None,
                "already_sent_money": None,
                "no_warning_signs_text_en": "We did not find obvious warning signs in this message. However, this does not prove that it is genuine. Verify the sender independently before clicking a link, sharing information, or making a payment.",
                "no_warning_signs_text_kn": "ಈ ಸಂದೇಶದಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವೆಂಬ ಖಾತರಿಯಲ್ಲ. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ, ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳುವ ಅಥವಾ ಪಾವತಿ ಮಾಡುವ ಮುನ್ನ ಕಳುಹಿಸಿದವರನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
                "ml_model_result": {
                    "model_available": self.ml_model.is_trained,
                    "is_english": True,
                    "prediction": "General Safety Guidance",
                    "fraud_probability": 0.5,
                    "scam_likelihood_pct": 50.0,
                    "confidence_pct": 90.0,
                    "confidence_level": "High",
                    "calibrated": False,
                    "model_type": "Personal Scam Assistant Knowledge Base",
                    "status_message": "General bank message safety guidance.",
                    "note_en": "General guidance query for recognizing fraudulent bank messages.",
                    "note_kn": "ವಂಚನೆಯ ಬ್ಯಾಂಕ್ ಸಂದೇಶಗಳನ್ನು ಗುರುತಿಸುವ ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ."
                },
                "disagreement_detected": False,
                "disagreement_explanation_en": None,
                "disagreement_explanation_kn": None,
                "language_scope_note_en": "General advisory on Indian banking communication standards.",
                "language_scope_note_kn": "ಭಾರತೀಯ ಬ್ಯಾಂಕಿಂಗ್ ನಿಯಮಾವಳಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸಲಹೆ ನೀಡಲಾಗಿದೆ.",
                "speech_summary_en": "How to check if a bank message is suspicious: Genuine banks never ask for your OTP or UPI PIN, and never threaten immediate account blocking. Contact your bank using the official number on your debit card or passbook.",
                "speech_summary_kn": "ಬ್ಯಾಂಕ್ ಸಂದೇಶಗಳ ಪರಿಶೀಲನೆ: ನೈಜ ಬ್ಯಾಂಕುಗಳು ಎಂದಿಗೂ ಒಟಿಪಿ ಅಥವಾ ಪಿನ್ ಕೇಳುವುದಿಲ್ಲ. ನಿಮ್ಮ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.",
                "detected_flags": [{
                    "category": "Bank Message Inquiry",
                    "category_kn": "ಬ್ಯಾಂಕ್ ಸಂದೇಶ ವಿಚಾರಣೆ",
                    "severity": "MODERATE",
                    "detail_en": "Inquiry regarding recognizing fraudulent bank SMS and alerts.",
                    "detail_kn": "ಬ್ಯಾಂಕ್ ಎಸ್‌ಎಂಎಸ್ ವಂಚನೆಗಳನ್ನು ಗುರುತಿಸುವ ಮಾರ್ಗದರ್ಶನ."
                }],
                "explanations_en": [
                    "A bank message is suspicious if it threatens immediate account blocking or power cutoff.",
                    "Genuine banks NEVER ask for your OTP, UPI PIN, or netbanking passwords over SMS or phone calls."
                ],
                "explanations_kn": [
                    "ಖಾತೆ ಸ್ಥಗಿತ, ಒಟಿಪಿ ಅಥವಾ ತಕ್ಷಣದ ಕ್ರಮಕ್ಕೆ ಒತ್ತಾಯಿಸುವ ಬ್ಯಾಂಕ್ ಸಂದೇಶಗಳು ವಂಚನೆಯ ಲಕ್ಷಣಗಳಾಗಿವೆ.",
                    "ನೈಜ ಬ್ಯಾಂಕುಗಳು ಎಂದಿಗೂ ಒಟಿಪಿ, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಕೇಳುವುದಿಲ್ಲ."
                ],
                "advice_en": [
                    "Paste the exact text of your bank message into this assistant to check it.",
                    "Contact your bank using its independently verified official contact details."
                ],
                "advice_kn": [
                    "ಪರಿಶೀಲಿಸಲು ನಿಮಗೆ ಬಂದ ಸಂದೇಶದ ಪೂರ್ಣ ಪಠ್ಯವನ್ನು ಈ ಸಹಾಯಕ್ಕೆ ಪೇಸ್ಟ್ ಮಾಡಿ.",
                    "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಎಟಿಎಂ ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ."
                ],
                "checked_length": len(clean_text),
                "educational_disclaimer": "This educational assistant provides risk guidance based on pattern analysis and machine learning; it never guarantees fraud or legitimacy. Never share passwords, OTPs, or UPI PINs.",
                "educational_disclaimer_kn": "ಇದು ಶೈಕ್ಷಣಿಕ ಸಹಾಯಕವಾಗಿದ್ದು, ಸುರಕ್ಷತೆಯ ಸಂಪೂರ್ಣ ಖಾತರಿಯಲ್ಲ. ಎಂದಿಗೂ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
            }

        # 2. Extract Exact Identified Phrases from user's text
        identified_phrases = self.extract_identified_phrases(clean_text)

        # 3. Comprehensive Safety Checks across 7 categories
        detected_flags = []
        why_flagged_en = []
        why_flagged_kn = []
        what_to_do_en = []
        what_to_do_kn = []
        risk_score = 0
        critical_flags_count = 0

        # Safety Check 1: OTP, PIN, Password & Credential Requests
        otp_matches = [p for p in self.OTP_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        if otp_matches:
            risk_score += 4
            critical_flags_count += 1
            detected_flags.append({
                "category": "OTP & Credential Request",
                "category_kn": "ಒಟಿಪಿ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಬೇಡಿಕೆ",
                "severity": "CRITICAL",
                "detail_en": "Message asks for confidential OTP, UPI PIN, password, or bank card details.",
                "detail_kn": "ಸಂದೇಶವು ಒಟಿಪಿ, ಯುಪಿಐ ಪಿನ್, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ಕೇಳುತ್ತಿದೆ."
            })
            why_flagged_en.append("It asks for your OTP, UPI PIN, password, or confidential banking credentials.")
            why_flagged_en.append("Bank employees and genuine systems NEVER ask for your OTP or PIN. An OTP authorizes irreversible withdrawals.")
            why_flagged_kn.append("ಇದು ನಿಮ್ಮ ಒಟಿಪಿ (OTP), ಯುಪಿಐ ಪಿನ್ ಅಥವಾ ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್ ಕೇಳುತ್ತಿದೆ.")
            why_flagged_kn.append("ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳು ಎಂದಿಗೂ ನಿಮ್ಮ ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ. ಒಟಿಪಿ ಹಂಚಿಕೊಂಡರೆ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ.")

            what_to_do_en.append("Never share your OTP, PIN, or password with anyone, even if they claim to be from your bank.")
            what_to_do_kn.append("ನಿಮ್ಮ ಒಟಿಪಿ ಅಥವಾ ಪಿನ್ ಅನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.")

        # Safety Check 2: Urgent Threats (Account Block, Disconnection, Police/Digital Arrest)
        urgency_matches = [p for p in self.URGENCY_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        is_police_threat = bool(re.search(r'\b(?:cbi|police|customs|digital\s+arrest|arrest|illegal\s+parcel|drugs|narcotics)\b', lower_text) or re.search(r'\b(?:cbi|police|customs|digital\s+arrest|arrest)\b', normalized_text))
        has_block_threat = bool(re.search(r'\b(?:block(?:ed)?|suspend(?:ed)?|deactivat(?:ed)?|disconnect(?:ed)?|cut[\s-]?off)\b', lower_text) or re.search(r'\b(?:block|suspend|deactivat|disconnect)\b', normalized_text))

        if urgency_matches:
            if is_police_threat:
                risk_score += 4
                critical_flags_count += 1
                detected_flags.append({
                    "category": "Urgent Threat / Fear Tactics",
                    "category_kn": "ತುರ್ತು ಬೆದರಿಕೆ / ಭಯ ಹುಟ್ಟಿಸುವ ತಂತ್ರ",
                    "severity": "CRITICAL",
                    "detail_en": "Threatens police arrest, CBI, customs, or court action to extort money (Digital Arrest scam).",
                    "detail_kn": "ಪೊಲೀಸ್ ಬಂಧನ ಅಥವಾ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಬೆದರಿಕೆ ಹಾಕಿ ಹಣ ವಸೂಲಿ ಮಾಡುವ ತಂತ್ರ."
                })
                why_flagged_en.append("It claims to be from law enforcement (Police, CBI, Customs) demanding money or threatening 'digital arrest'.")
                why_flagged_en.append("Genuine police and government agencies NEVER conduct investigations or demand bail/payments over phone, Skype, or WhatsApp calls.")
                why_flagged_kn.append("ಇದು ಕಾನೂನು ಜಾರಿ ಸಂಸ್ಥೆಗಳ (ಪೊಲೀಸ್, ಸಿಬಿಐ) ಹೆಸರಿನಲ್ಲಿ ಹಣ ಕೇಳುತ್ತಿದೆ ಅಥವಾ ಬಂಧನದ ಬೆದರಿಕೆ ಹಾಕುತ್ತಿದೆ.")
                why_flagged_kn.append("ನೈಜ ಪೊಲೀಸರು ಅಥವಾ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳು ಎಂದಿಗೂ ವಾಟ್ಸ್‌ಆ್ಯಪ್/ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ವಿಚಾರಣೆ ನಡೆಸುವುದಿಲ್ಲ ಅಥವಾ ಜಾಮೀನು ಕೇಳುವುದಿಲ್ಲ.")

                what_to_do_en.append("Do not send any money or stay on video calls. End the call immediately. Report to 1930.")
                what_to_do_kn.append("ಯಾವುದೇ ಹಣ ಕಳುಹಿಸಬೇಡಿ ಮತ್ತು ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಮುಂದುವರಿಯಬೇಡಿ. ತಕ್ಷಣ ಕರೆಯನ್ನು ಕಡಿತಗೊಳಿಸಿ.")
            else:
                risk_score += 3
                detected_flags.append({
                    "category": "Urgent Threat / Fear Tactics",
                    "category_kn": "ತುರ್ತು ಬೆದರಿಕೆ / ಭಯ ಹುಟ್ಟಿಸುವ ತಂತ್ರ",
                    "severity": "HIGH",
                    "detail_en": "Threatens immediate service cutoff, power disconnection, or account blockage to induce panic.",
                    "detail_kn": "ಖಾತೆ ಸ್ಥಗಿತ ಅಥವಾ ಸೇವೆ ಕಡಿತದ ಬೆದರಿಕೆ ಹಾಕಿ ಗಾಬರಿಗೊಳಿಸಲಾಗುತ್ತಿದೆ."
                })
                why_flagged_en.append("It creates artificial urgency by threatening to block your account or disconnect power/services tonight.")
                why_flagged_kn.append("ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸುವುದಾಗಿ ಅಥವಾ ವಿದ್ಯುತ್ ಕಡಿತಗೊಳಿಸುವುದಾಗಿ ಬೆದರಿಕೆ ಹಾಕಿ ಆತುರ ಸೃಷ್ಟಿಸುತ್ತಿದೆ.")

            if bool(re.search(r'\b(?:immediately|urgent|tonight|act\s+now|last\s+chance)\b', lower_text) or re.search(r'\b(?:immediately|urgent|tonight)\b', normalized_text)):
                why_flagged_en.append("It pressures you to act immediately without giving you time to verify or consult family.")
                why_flagged_kn.append("ನೀವು ಯೋಚಿಸಲು ಅಥವಾ ಕುಟುಂಬದವರನ್ನು ಕೇಳಲು ಸಮಯ ನೀಡದೆ ತಕ್ಷಣ ಕಾರ್ಯನಿರ್ವಹಿಸಲು ಒತ್ತಡ ಹೇರುತ್ತಿದೆ.")

        # Safety Check 3: Fake Prizes, Lottery Winnings, Refunds & Cashbacks
        prize_matches = [p for p in self.PRIZE_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        if prize_matches:
            risk_score += 3
            detected_flags.append({
                "category": "Fake Prize / Lottery / Cashback",
                "category_kn": "ನಕಲಿ ಬಹುಮಾನ / ಲಾಟರಿ / ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್",
                "severity": "HIGH",
                "detail_en": "Promises unexpected lottery winnings, cash rewards, or unrequested refunds.",
                "detail_kn": "ಯಾವುದೇ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ಭಾಗವಹಿಸದಿದ್ದರೂ ದೊಡ್ಡ ಬಹುಮಾನ ಅಥವಾ ಉಚಿತ ಹಣದ ಆಮಿಷ ಒಡ್ಡಲಾಗಿದೆ."
            })
            why_flagged_en.append("It offers unexpected prizes, lottery winnings (e.g. KBC), or high cashback rewards.")
            why_flagged_en.append("Legitimate lotteries and tax departments never ask you to pay processing fees or click unverified links to claim money.")
            why_flagged_kn.append("ಇದು ನೀವು ಭಾಗವಹಿಸದ ಲಾಟರಿ ಅಥವಾ ಬಹುಮಾನದ ಸುಳ್ಳು ಆಮಿಷ ಒಡ್ಡುತ್ತಿದೆ.")
            why_flagged_kn.append("ನೈಜ ಬಹುಮಾನ ಪಡೆಯಲು ಯಾರೂ ಮುಂಗಡ ಶುಲ್ಕ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ.")

            what_to_do_en.append("Do not pay any fee, tax, or advance charge to claim any prize. Ignore and delete the message.")
            what_to_do_kn.append("ಬಹುಮಾನ ಪಡೆಯಲು ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ. ಇದನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಅಳಿಸಿ.")

        # Safety Check 4: Suspicious Links & Shorteners
        link_matches = [p for p in self.LINK_PATTERNS if re.search(p, lower_text)]
        if link_matches:
            risk_score += 2
            detected_flags.append({
                "category": "Suspicious Web Link / URL",
                "category_kn": "ಅನುಮಾನಾಸ್ಪದ ವೆಬ್ ಲಿಂಕ್",
                "severity": "HIGH",
                "detail_en": "Contains an internet link, shortened URL, or .apk file leading to a fraudulent website.",
                "detail_kn": "ಸಂದೇಶದಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ವೆಬ್ ಲಿಂಕ್ ಅಥವಾ ಅಪ್ಲಿಕೇಶನ್ ಕಡತವಿದೆ."
            })
            why_flagged_en.append("It contains a web link that could lead to a phishing page designed to steal your bank credentials.")
            why_flagged_kn.append("ಇದು ನಕಲಿ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಕರೆದೊಯ್ಯುವ ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್ ಹೊಂದಿದೆ.")

            what_to_do_en.append("Do not click links in unsolicited messages. Visit official bank portals by typing verified addresses yourself.")
            what_to_do_kn.append("ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ವಿಳಾಸವನ್ನು ನೀವೇ ನೇರವಾಗಿ ಟೈಪ್ ಮಾಡಿ.")

        # Safety Check 5: Remote Access & Screen Sharing Applications
        remote_matches = [p for p in self.REMOTE_ACCESS_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        if remote_matches:
            risk_score += 4
            critical_flags_count += 1
            detected_flags.append({
                "category": "Remote Screen-Sharing Request",
                "category_kn": "ರಿಮೋಟ್ ಸ್ಕ್ರೀನ್ ಹಂಚಿಕೆ ಅಪ್ಲಿಕೇಶನ್ ಬೇಡಿಕೆ",
                "severity": "CRITICAL",
                "detail_en": "Asks to install AnyDesk, TeamViewer, QuickSupport, or similar screen-sharing tools.",
                "detail_kn": "ಎನಿಡೆಸ್ಕ್ (AnyDesk) ಅಥವಾ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಕೋರುತ್ತಿದೆ."
            })
            why_flagged_en.append("It instructs you to install remote access or screen-sharing software (like AnyDesk or QuickSupport).")
            why_flagged_en.append("Screen-sharing software gives strangers full visibility and control over your phone, enabling them to intercept OTPs and drain accounts.")
            why_flagged_kn.append("ಇದು ಎನಿಡೆಸ್ಕ್ (AnyDesk) ನಂತಹ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಹಾಕಲು ಹೇಳುತ್ತಿದೆ.")
            why_flagged_kn.append("ಇಂತಹ ಆ್ಯಪ್‌ಗಳಿಂದ ವಂಚಕರು ನಿಮ್ಮ ಮೊಬೈಲ್ ಪರದೆಯನ್ನು ನೋಡಿ, ರಹಸ್ಯ ಒಟಿಪಿಗಳನ್ನು ಕದ್ದು ಖಾತೆಯನ್ನು ಖಾಲಿ ಮಾಡಬಹುದು.")

            what_to_do_en.append("Never install screen-sharing software on instructions from any caller or message. Disconnect immediately.")
            what_to_do_kn.append("ಯಾರೇ ಕರೆ ಮಾಡಿ ಹೇಳಿದರೂ ಯಾವುದೇ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಅನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.")

        # Safety Check 6: QR Code & UPI Collect Request Traps
        collect_matches = [p for p in self.COLLECT_QR_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        if collect_matches:
            risk_score += 4
            critical_flags_count += 1
            detected_flags.append({
                "category": "Collect Request / QR Code Scam",
                "category_kn": "ಯುಪಿಐ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ / ಕ್ಯೂಆರ್ ಕೋಡ್ ವಂಚನೆ",
                "severity": "CRITICAL",
                "detail_en": "Asks to scan a QR code or enter UPI PIN to receive money in your account.",
                "detail_kn": "ಹಣ ಪಡೆಯಲು ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಹಾಕಲು ಹೇಳುತ್ತಿದೆ."
            })
            why_flagged_en.append("It asks you to scan a QR code or enter your UPI PIN to 'receive' payment.")
            why_flagged_en.append("GOLDEN RULE: Entering your UPI PIN always sends money OUT of your account. You NEVER need to enter a PIN or scan a QR to receive money.")
            why_flagged_kn.append("ಇದು ಯುಪಿಐ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಅಥವಾ ಹಣ ಪಡೆಯಲು ಪಿನ್ ಹಾಕುವಂತೆ ಕೇಳುತ್ತಿದೆ.")
            why_flagged_kn.append("ಚಿನ್ನದ ನಿಯಮ: ಯುಪಿಐ ಪಿನ್ ಹಾಕುವುದು ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಪಡೆಯಲು ನೀವು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕಬೇಕಾಗಿಲ್ಲ.")

            what_to_do_en.append("Decline the collect request. Do not enter your UPI PIN to receive money.")
            what_to_do_kn.append("ಈ ವಿನಂತಿಯನ್ನು ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ (Decline). ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಬೇಡಿ.")

        # Safety Check 7: Transfer Money to Unlock Account or Receive Reward (Advance Fee Fraud)
        unlock_matches = [p for p in self.UNLOCK_TRANSFER_PATTERNS if re.search(p, lower_text) or re.search(p, normalized_text)]
        if unlock_matches:
            risk_score += 4
            critical_flags_count += 1
            detected_flags.append({
                "category": "Advance Fee / Account Unlock Scam",
                "category_kn": "ಖಾತೆ ಅನ್‌ಲಾಕ್ / ಮುಂಗಡ ಶುಲ್ಕ ವಂಚನೆ",
                "severity": "CRITICAL",
                "detail_en": "Requests transferring money to unlock an account, avoid arrest, or claim a reward.",
                "detail_kn": "ಖಾತೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು, ಬಂಧನ ತಪ್ಪಿಸಲು ಅಥವಾ ಬಹುಮಾನ ಪಡೆಯಲು ಹಣ ವರ್ಗಾಯಿಸುವಂತೆ ಕೇಳುತ್ತಿದೆ."
            })
            why_flagged_en.append("It asks you to transfer money in advance to unlock an account, pay 'bail', or release funds.")
            why_flagged_en.append("Legitimate organizations do not demand security deposits into individual accounts to release funds or resolve issues.")
            why_flagged_kn.append("ಖಾತೆಯನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಅಥವಾ ಬಹುಮಾನ ಪಡೆಯಲು ಮುಂಗಡ ಹಣ ವರ್ಗಾಯಿಸಲು ಕೇಳುತ್ತಿದೆ.")
            why_flagged_kn.append("ಯಾವುದೇ ಅಧಿಕೃತ ಸಂಸ್ಥೆಯು ಸಮಸ್ಯೆ ಬಗೆಹರಿಸಲು ವ್ಯಕ್ತಿಗತ ಖಾತೆಗೆ ಮುಂಗಡ ಹಣ ಪಾವತಿಸಲು ಕೇಳುವುದಿಲ್ಲ.")

            what_to_do_en.append("Do not transfer any money to 'unlock' an account or receive rewards. Contact your bank branch directly.")
            what_to_do_kn.append("ಖಾತೆ ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಯಾವುದೇ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ. ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಶಾಖೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.")

        # Check for Phone Call Context (OTP, UPI PIN, password, remote access, urgent transfer, police)
        is_phone_call = bool([p for p in self.PHONE_CALL_PATTERNS if re.search(p, lower_text)])
        has_caller_context = bool(re.search(r'\b(?:caller|call|called|calling|phone)\b', lower_text))
        has_sensitive_request = bool(re.search(r'\b(?:otp|pin|password|remote|anydesk|teamviewer|transfer|money|police|cbi|officer)\b', lower_text))
        phone_call_guidance = None
        if is_phone_call or (has_caller_context and has_sensitive_request) or (urgency_matches and has_caller_context):
            phone_call_guidance = {
                "detected": True,
                "title_en": "Phone Call Safety Assistance:",
                "title_kn": "ದೂರವಾಣಿ ಕರೆ ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶನ:",
                "steps_en": [
                    "Do not share any credentials (OTP, UPI PIN, passwords, or bank card details) with the caller.",
                    "If the caller is pressuring, rushing, or threatening you, end the call and hang up immediately.",
                    "Contact the organization through its independently verified official contact channel (e.g., number on your bank passbook or debit card)."
                ],
                "steps_kn": [
                    "ಕರೆ ಮಾಡಿದ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ಯಾವುದೇ ಗೌಪ್ಯ ವಿವರಗಳನ್ನು (ಒಟಿಪಿ, ಯುಪಿಐ ಪಿನ್, ಪಾಸ್‌ವರ್ಡ್) ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
                    "ಕರೆ ಮಾಡಿದವರು ಆತುರಪಡಿಸಿದರೆ, ಬೆದರಿಕೆ ಹಾಕಿದರೆ ಅಥವಾ ಒತ್ತಡ ಹೇರಿದರೆ ತಕ್ಷಣ ಕರೆಯನ್ನು ಕಡಿತಗೊಳಿಸಿ.",
                    "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಎಟಿಎಂ ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ನೀವೇ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ ಪರಿಶೀಲಿಸಿ."
                ]
            }

        # Check for "Already Sent Money" Incident
        is_money_sent = bool([p for p in self.ALREADY_SENT_PATTERNS if re.search(p, lower_text)])
        money_sent_guidance = None
        if is_money_sent:
            risk_score += 4
            critical_flags_count += 1
            detected_flags.append({
                "category": "Financial Fraud Incident / Money Sent",
                "category_kn": "ಆರ್ಥಿಕ ವಂಚನೆ ಘಟನೆ / ಹಣ ವರ್ಗಾವಣೆ",
                "severity": "CRITICAL",
                "detail_en": "User indicates that money or funds have already been sent to a caller or scammer.",
                "detail_kn": "ವಂಚಕನಿಗೆ ಈಗಾಗಲೇ ಹಣ ವರ್ಗಾಯಿಸಲಾಗಿರುವುದನ್ನು ಬಳಕೆದಾರರು ತಿಳಿಸಿದ್ದಾರೆ."
            })
            why_flagged_en.append("An unauthorized or fraudulent money transfer has been reported.")
            why_flagged_en.append("Scammers manipulate victims using panic, impersonation, or fake promises to induce immediate payments.")
            why_flagged_kn.append("ಅನಧಿಕೃತ ಅಥವಾ ವಂಚನೆಯ ಹಣ ವರ್ಗಾವಣೆ ನಡೆದಿರುವುದು ವರದಿಯಾಗಿದೆ.")
            why_flagged_kn.append("ವಂಚಕರು ಭಯ ಅಥವಾ ಸುಳ್ಳು ಆಮಿಷ ಒಡ್ಡಿ ಹಣ ವರ್ಗಾಯಿಸುವಂತೆ ಮಾಡುತ್ತಾರೆ.")

            what_to_do_en.insert(0, "Contact your bank immediately through verified official channels to request an urgent account freeze.")
            what_to_do_en.insert(1, "In India, promptly call 1930 or submit a complaint at cybercrime.gov.in.")
            what_to_do_kn.insert(0, "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ತಕ್ಷಣ ಖಾತೆಯನ್ನು ಫ್ರೀಜ್ ಮಾಡಲು ವಿನಂತಿಸಿ.")
            what_to_do_kn.insert(1, "ಭಾರತದಲ್ಲಿ, ತಕ್ಷಣ ೧೯೩೦ ಸೈಬರ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ.")

            money_sent_guidance = {
                "detected": True,
                "title_en": "Immediate Emergency Guidance (Money Sent):",
                "title_kn": "ಹಣ ಕಳುಹಿಸಿದ್ದರೆ ತಕ್ಷಣದ ತುರ್ತು ಕ್ರಮಗಳು:",
                "steps_en": [
                    "Contact your bank immediately through its verified official customer care number (printed on your passbook or debit card) to report the unauthorized transfer and request an urgent account freeze.",
                    "In India, promptly call the National Cyber Crime Helpline at 1930 or submit a complaint online at the official portal: cybercrime.gov.in.",
                    "Keep transaction details ready: UPI transaction ID, bank account number, date, time, and recipient UPI ID or phone number.",
                    "Disclaimer: Act quickly to maximize the opportunity to freeze the scammer's bank account, but note that financial recovery cannot be legally guaranteed."
                ],
                "steps_kn": [
                    "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಕಾರ್ಡ್ ಮೇಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ತಕ್ಷಣ ಕರೆ ಮಾಡಿ ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು ಖಾತೆಯನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಲು (freeze) ವಿನಂತಿಸಿ.",
                    "ಭಾರತದಲ್ಲಿ, ತಕ್ಷಣ ೧೯೩೦ (1930) ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ cybercrime.gov.in ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ.",
                    "ವಹಿವಾಟಿನ ವಿವರಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ: ಯುಪಿಐ ವಹಿವಾಟು ಐಡಿ (Transaction ID), ಸಮಯ, ಮೊತ್ತ ಮತ್ತು ವಂಚಕರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ.",
                    "ಪ್ರಮುಖ ಸೂಚನೆ: ತಕ್ಷಣ ವರದಿ ಮಾಡುವುದರಿಂದ ವಂಚಕರ ಖಾತೆಯನ್ನು ತಡೆಯಲು ಸಹಾಯವಾಗುತ್ತದೆ, ಆದರೆ ಹಣ ಮರಳಿ ಬರುವ ಬಗ್ಗೆ ಯಾವುದೇ ಕಾನೂನು ಖಾತರಿ ನೀಡಲಾಗುವುದಿಲ್ಲ."
                ]
            }

        # 4. Run Machine Learning Model Evaluation on Actual Input
        ml_res = self.ml_model.predict(clean_text)
        ml_fraud_prob = ml_res.get("fraud_probability")
        ml_is_fraud = ml_res.get("prediction") == "Potentially Fraudulent"
        ml_available = ml_res.get("model_available", False)

        # 5. Combine Model Predictions and Safety Rules with Cautious Disagreement Resolution
        rules_have_critical = critical_flags_count > 0 or is_money_sent
        rules_have_moderate = (risk_score >= 2) or (len(detected_flags) > 0)
        rules_flagged_scam = rules_have_critical or rules_have_moderate

        disagreement_detected = False
        disagreement_explanation_en = None
        disagreement_explanation_kn = None

        # Determine Risk Category: HIGH RISK, SUSPICIOUS, or NO OBVIOUS WARNING SIGNS
        is_high_risk = rules_have_critical or (risk_score >= 4) or (len(detected_flags) >= 2) or (ml_fraud_prob is not None and ml_fraud_prob >= 0.75)
        has_warnings = is_high_risk or rules_have_moderate or (risk_score >= 2) or (len(detected_flags) >= 1) or (ml_fraud_prob is not None and ml_fraud_prob >= 0.50)

        if is_high_risk:
            risk_level = "HIGH RISK"
            headline_en = "WARNING: This message has strong signs of a scam."
            headline_kn = "ಎಚ್ಚರಿಕೆ: ಈ ಸಂದೇಶದಲ್ಲಿ ಗಂಭೀರ ವಂಚನೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ."
        elif has_warnings:
            risk_level = "SUSPICIOUS"
            headline_en = "CAUTION: Suspicious signs detected in this message."
            headline_kn = "ಎಚ್ಚರಿಕೆ: ಈ ಸಂದೇಶದಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಅಂಶಗಳು ಕಂಡುಬಂದಿವೆ."
        else:
            risk_level = "NO OBVIOUS WARNING SIGNS"
            headline_en = "No obvious warning signs detected"
            headline_kn = "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ"

        # Disagreement Resolution Logic: If model and safety rules disagree, use more cautious result and explain
        if ml_available and ml_fraud_prob is not None:
            if rules_flagged_scam and not ml_is_fraud:
                # Rules detected danger, but ML model gave low statistical score
                disagreement_detected = True
                disagreement_explanation_en = (
                    "⚠️ Model vs Rule Disagreement: The machine learning model estimated lower risk based on text phrasing alone, "
                    "but our safety rule checks detected critical fraud patterns (e.g. credential requests, urgency, or remote access). "
                    "Following our safety-first policy, the more cautious risk category is applied."
                )
                disagreement_explanation_kn = (
                    "⚠️ ಮಾದರಿ ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ನಡುವೆ ವ್ಯತ್ಯಾಸ: ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿಯು ಕಡಿಮೆ ಅಂಕ ನೀಡಿದ್ದರೂ, ನಮ್ಮ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು "
                    "ಗಂಭೀರ ಅಪಾಯದ ಅಂಶವನ್ನು (ಒಟಿಪಿ/ಪಿನ್ ಅಥವಾ ಬೆದರಿಕೆ) ಗುರುತಿಸಿವೆ. ಬಳಕೆದಾರರ ಸುರಕ್ಷತೆಗಾಗಿ ಹೆಚ್ಚಿನ ಎಚ್ಚರಿಕೆಯ ವರ್ಗವನ್ನು ಅನ್ವಯಿಸಲಾಗಿದೆ."
                )
                why_flagged_en.insert(0, disagreement_explanation_en)
                why_flagged_kn.insert(0, disagreement_explanation_kn)

            elif not rules_flagged_scam and ml_is_fraud:
                # No keyword rules fired, but ML model flagged fraud patterns
                disagreement_detected = True
                disagreement_explanation_en = (
                    "⚠️ Model vs Rule Note: Standard keyword rules did not find specific blacklisted terms, "
                    "but the machine learning model identified statistical patterns closely matching known fraudulent messages in the dataset. "
                    "Caution is strongly advised."
                )
                disagreement_explanation_kn = (
                    "⚠️ ಮಾದರಿ ಗಮನಿಸಿದ ಅಂಶ: ನಿರ್ದಿಷ್ಟ ಕೀವರ್ಡ್ ನಿಯಮಗಳು ಸಕ್ರಿಯಗೊಳ್ಳದಿದ್ದರೂ, ಅಂಕಿಅಂಶಗಳ ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿಯು ಈ ಸಂದೇಶದಲ್ಲಿ "
                    "ವಂಚನೆಯ ಸಂದೇಶಗಳಿಗೆ ಹೋಲುವ ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಿದೆ."
                )
                why_flagged_en.insert(0, disagreement_explanation_en)
                why_flagged_kn.insert(0, disagreement_explanation_kn)

        elif not ml_available:
            # Model file missing
            model_missing_note_en = "Note: Machine learning model awaiting dataset training. Evaluating using safety rule engine."
            model_missing_note_kn = "ಸೂಚನೆ: ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿ ತರಬೇತಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ. ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಮೂಲಕ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತಿದೆ."

        # Add universal contact advice if warnings exist
        if risk_level in ["HIGH RISK", "SUSPICIOUS"]:
            # Check for urgent account block + OTP (Prompt Example alignment)
            has_block_and_otp = has_block_threat and bool(re.search(r'\botp\b', lower_text) or re.search(r'\botp\b', normalized_text) or re.search(r'ಒಟಿಪಿ', clean_text))
            if has_block_and_otp:
                why_flagged_en = [
                    "The account-blocking threat creates urgency and fear.",
                    "The message requests an OTP, which must not be shared."
                ]
                why_flagged_kn = [
                    "ಇದು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸುವುದಾಗಿ (block) ಬೆದರಿಕೆ ಹಾಕಿ ಭಯ ಮತ್ತು ಆತುರ ಸೃಷ್ಟಿಸುತ್ತಿದೆ.",
                    "ಇದು ನಿಮ್ಮ ಒಟಿಪಿ (OTP) ಕೇಳುತ್ತಿದೆ, ಇದನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬಾರದು."
                ]
                what_to_do_en = [
                    "Never share your OTP.",
                    "Do not click suspicious links.",
                    "Contact your bank through independently verified official contact details."
                ]
                what_to_do_kn = [
                    "ನಿಮ್ಮ ಒಟಿಪಿ (OTP) ಅನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
                    "ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
                    "ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನ ಅಧಿಕೃತ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿ ಸ್ವತಂತ್ರವಾಗಿ ಸಂಪರ್ಕಿಸಿ."
                ]
            else:
                what_to_do_en.append("Contact the organization through its independently verified official contact channel (e.g. number on debit card or passbook).")
                what_to_do_kn.append("ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಅಧಿಕೃತ ದಾಖಲೆಗಳಲ್ಲಿರುವ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ.")
        else:
            # Clean / No obvious warning signs advice
            why_flagged_en = [
                "We did not find obvious warning signs in this message.",
                "However, this does not prove that it is genuine."
            ]
            why_flagged_kn = [
                "ಈ ಸಂದೇಶದಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
                "ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಅಧಿಕೃತವೆಂಬ ಖಾತರಿಯಲ್ಲ."
            ]
            what_to_do_en = [
                "Verify the sender independently before clicking a link, sharing information, or making a payment.",
                "Never share your OTP, PIN, or netbanking passwords with anyone."
            ]
            what_to_do_kn = [
                "ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ, ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳುವ ಅಥವಾ ಪಾವತಿ ಮಾಡುವ ಮುನ್ನ ಕಳುಹಿಸಿದವರನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
                "ನಿಮ್ಮ ಒಟಿಪಿ, ಯುಪಿಐ ಪಿನ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
            ]

        # Deduplicate actions
        what_to_do_en = list(dict.fromkeys(what_to_do_en))
        what_to_do_kn = list(dict.fromkeys(what_to_do_kn))

        # Standard No-Warning Statement (Exact mandatory phrasing)
        no_warning_text_en = (
            "We did not find obvious warning signs in this message. However, this does not prove that it is genuine. "
            "Verify the sender independently before clicking a link, sharing information, or making a payment."
        )
        no_warning_text_kn = (
            "ಈ ಸಂದೇಶದಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವೆಂಬ ಖಾತರಿಯಲ್ಲ. "
            "ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ, ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳುವ ಅಥವಾ ಪಾವತಿ ಮಾಡುವ ಮುನ್ನ ಕಳುಹಿಸಿದವರನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ."
        )

        # Language Scope Disclaimer
        has_latin = bool(re.search(r'[a-zA-Z]', clean_text))
        has_kannada = bool(re.search(r'[\u0C80-\u0CFF]', clean_text))
        if has_kannada and not has_latin:
            lang_scope_en = "Evaluated using multilingual rule engine. English statistical ML probabilities do not apply to Kannada text."
            lang_scope_kn = "ಕನ್ನಡ ಸಂದೇಶಗಳನ್ನು ನಮ್ಮ ಬಹುಭಾಷಾ ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಮೂಲಕ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ. ಇಂಗ್ಲಿಷ್ ಎಂಎಲ್ ಮಾದರಿಯು ಅನ್ವಯಿಸುವುದಿಲ್ಲ."
        else:
            lang_scope_en = "Evaluated on English text. The model is trained strictly on English fraud patterns."
            lang_scope_kn = "ಇಂಗ್ಲಿಷ್ ಪಠ್ಯದಲ್ಲಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ."

        # Speech Summary text for browser Text-to-Speech
        if risk_level in ["HIGH RISK", "SUSPICIOUS"]:
            speech_en = f"{headline_en} Why we flagged it: {' '.join(why_flagged_en[:2])} What you should do: {' '.join(what_to_do_en[:2])}"
            speech_kn = f"{headline_kn} ಪ್ರಮುಖ ಕಾರಣ: {' '.join(why_flagged_kn[:2])} ನೀವು ಮಾಡಬೇಕಾದ ಕ್ರಮ: {' '.join(what_to_do_kn[:2])}"
        else:
            speech_en = no_warning_text_en
            speech_kn = no_warning_text_kn

        # Legacy risk level alias for backward compatibility with older tests expecting 'CAUTION'
        legacy_risk = "CAUTION" if risk_level == "SUSPICIOUS" else risk_level

        return {
            "risk_level": risk_level,
            "legacy_risk_level": legacy_risk,
            "risk_score": risk_score,
            "headline_en": headline_en,
            "headline_kn": headline_kn,
            "identified_phrases": identified_phrases,
            "why_flagged_en": why_flagged_en,
            "why_flagged_kn": why_flagged_kn,
            "what_to_do_en": what_to_do_en,
            "what_to_do_kn": what_to_do_kn,
            "ml_model_result": ml_res,
            "disagreement_detected": disagreement_detected,
            "disagreement_explanation_en": disagreement_explanation_en,
            "disagreement_explanation_kn": disagreement_explanation_kn,
            "language_scope_note_en": lang_scope_en,
            "language_scope_note_kn": lang_scope_kn,
            "phone_call_assistance": phone_call_guidance,
            "already_sent_money": money_sent_guidance,
            "no_warning_signs_text_en": no_warning_text_en,
            "no_warning_signs_text_kn": no_warning_text_kn,
            "speech_summary_en": speech_en,
            "speech_summary_kn": speech_kn,
            # Backwards compatibility fields for checker.html and existing tests
            "detected_flags": detected_flags,
            "explanations_en": why_flagged_en,
            "explanations_kn": why_flagged_kn,
            "advice_en": what_to_do_en,
            "advice_kn": what_to_do_kn,
            "checked_length": len(clean_text),
            "educational_disclaimer": "This educational assistant provides risk guidance based on pattern analysis and machine learning; it never guarantees fraud or legitimacy. Never share passwords, OTPs, or UPI PINs.",
            "educational_disclaimer_kn": "ಇದು ಶೈಕ್ಷಣಿಕ ಸಹಾಯಕವಾಗಿದ್ದು, ಸುರಕ್ಷತೆಯ ಸಂಪೂರ್ಣ ಖಾತರಿಯಲ್ಲ. ಎಂದಿಗೂ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
        }


# Global Singleton Instance
scam_detector = ScamDetector()
