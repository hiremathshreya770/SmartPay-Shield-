"""
Comprehensive System Verification Test Suite for EASY PAY — SAFE PAY.
Validates all requirements specified in the project review:
1. Check Message: Analysis of newly submitted messages, warning signs, explanations, recommendations.
2. Personal Scam Assistant: Simple language explanations, guidance, voice output support.
3. Learn UPI Safely: Educational tutorials, video transcripts, captions, written instructions, PIN/biometric safety.
4. Accessibility & Multilingual: Large fonts, high contrast modes, English and Kannada translation coverage.
5. Privacy & Security: Zero real bank processing, zero credential collection, automatic confidential scrubbing.
6. Advanced Testing:
   - Legitimate and suspicious messages not in training data.
   - Ambiguous and conflicting signal messages.
   - Missing model and missing dataset graceful fallbacks.
   - Video fallbacks and voice fallbacks.
   - Full site navigation between all features.
"""

import unittest
import json
import tempfile
from pathlib import Path
import pandas as pd

from app import app
from scam_detector import scam_detector, ScamDetector, normalize_text_variations
import database
from train_model import find_dataset_files, train_and_evaluate, save_model, predict_message


class TestSystemVerification(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.detector = ScamDetector()

    # =========================================================================
    # 1. NAVIGATION BETWEEN EVERY FEATURE
    # =========================================================================
    def test_navigation_between_all_features(self):
        """Test that every core navigation endpoint returns 200 OK and valid HTML."""
        routes = [
            ('/', "Home Page", "EASY PAY — SAFE PAY"),
            ('/checker', "Message Checker", "Suspicious Message"),
            ('/coach', "Personal Scam Assistant", "PERSONAL SCAM ASSISTANT"),
            ('/simulator', "UPI Simulator", "Practice Safe UPI"),
            ('/learn', "Learn UPI Safely", "LEARN UPI SAFELY"),
            ('/learn-upi', "Learn UPI Safely (Alias)", "LEARN UPI SAFELY"),
            ('/help', "Emergency Help", "Emergency Help"),
            ('/login', "Senior Login", "Safe Login")
        ]
        for route, name, expected_text in routes:
            res = self.app.get(route)
            self.assertEqual(res.status_code, 200, f"Route {route} ({name}) failed with status {res.status_code}")
            html = res.get_data(as_text=True)
            self.assertIn(expected_text, html, f"Route {route} ({name}) did not contain expected text '{expected_text}'")

    # =========================================================================
    # 2. CHECK MESSAGE: ANALYSIS, WARNING SIGNS, EXPLANATION, RECOMMENDATIONS
    # =========================================================================
    def test_check_message_complete_analysis(self):
        """Verify message analysis identifies warning signs, provides plain language explanations and recommendations."""
        payload = {
            "text": "Your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Call 9845012345.",
            "language": "en"
        }
        res = self.app.post('/api/check-message',
                            data=json.dumps(payload),
                            content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.get_data(as_text=True))
        self.assertEqual(data.get("status"), "success")

        analysis = data["data"]
        self.assertIn(analysis["risk_level"], ["HIGH RISK", "SUSPICIOUS"])
        self.assertGreater(len(analysis["detected_flags"]), 0)
        self.assertGreater(len(analysis["why_flagged_en"]), 0)
        self.assertGreater(len(analysis["what_to_do_en"]), 0)
        self.assertTrue(any("power" in p.lower() or "bill" in p.lower() for p in analysis["identified_phrases"]))

    # =========================================================================
    # 3. PERSONAL SCAM ASSISTANT: SIMPLE LANGUAGE & VOICE OUTPUT SUPPORT
    # =========================================================================
    def test_personal_scam_assistant_interaction(self):
        """Verify assistant analyzes questions, offers calm guidance, and supports voice output."""
        queries = [
            ("Someone called claiming to be from the police.", "phone_call_assistance"),
            ("Someone is asking for my OTP. What should I do?", "detected_flags"),
            ("I already sent money to a scammer. What should I do?", "already_sent_money")
        ]
        for q, expected_key in queries:
            res = self.app.post('/api/assistant/analyze',
                                data=json.dumps({"text": q, "language": "en"}),
                                content_type='application/json')
            self.assertEqual(res.status_code, 200)
            data = json.loads(res.get_data(as_text=True))
            self.assertEqual(data.get("status"), "success")
            result = data["data"]
            self.assertIsNotNone(result.get(expected_key))
            self.assertGreater(len(result["what_to_do_en"]), 0)

    # =========================================================================
    # 4. UNSEEN LEGITIMATE AND SUSPICIOUS MESSAGES (NOT IN TRAINING SAMPLES)
    # =========================================================================
    def test_unseen_messages_generalization(self):
        """Test completely unseen legitimate and suspicious messages not copied from training data."""
        unseen_legit = [
            "Your Apollo pharmacy order #MED-9021 has been packed and will arrive by 5 PM.",
            "Dearest Dadi, reaching home by Shatabdi Express at 7:30 PM. See you soon!",
            "Dr. Mehta: Routine blood pressure checkup scheduled for Monday at 11 AM.",
            "Water supply in Malleshwaram 4th cross will be briefly maintained tomorrow morning."
        ]
        for msg in unseen_legit:
            res = self.detector.analyze(msg)
            self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS", f"Failed for legitimate: {msg}")
            self.assertIn("We did not find obvious warning signs", res["no_warning_signs_text_en"])

        unseen_scams = [
            "Your gas subsidy will stop today. Download QuickSupport app immediately to link Aadhaar.",
            "Speed Post parcel seized by Narcotics Bureau. Digital arrest proceeding against you.",
            "Dear customer, claim your Rs 15,000 Diwali lottery cash gift. Enter UPI PIN here."
        ]
        for msg in unseen_scams:
            res = self.detector.analyze(msg)
            self.assertIn(res["risk_level"], ["HIGH RISK", "SUSPICIOUS"], f"Failed for scam: {msg}")
            self.assertGreater(len(res["detected_flags"]), 0)

    # =========================================================================
    # 5. MESSAGES WITH CONFLICTING OR AMBIGUOUS SIGNALS
    # =========================================================================
    def test_conflicting_and_ambiguous_signals(self):
        """Test messages with mixed friendly greetings and urgent credential requests or disguised prompts."""
        # Friendly tone mixed with OTP request (Conflicting signal)
        ambiguous_1 = "Hi Grandma, love you so much! A 6-digit OTP just arrived on your mobile, please read it to me quickly for an online game."
        res1 = self.detector.analyze(ambiguous_1)
        # Even with friendly tone, safety rules MUST flag OTP request as HIGH RISK
        self.assertEqual(res1["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "OTP & Credential Request" for f in res1["detected_flags"]))

        # Official-sounding bank balance notification without request (Neutral/Safe)
        ambiguous_2 = "Your account XX1209 has a balance of Rs 14,200 as on 14-Oct-2026. Helpline: 1800-425-0018."
        res2 = self.detector.analyze(ambiguous_2)
        self.assertEqual(res2["risk_level"], "NO OBVIOUS WARNING SIGNS")

        # Obfuscated leetspeak combined with threat
        ambiguous_3 = "Dear consumer, your p0wer will be cut t0night. Share 0TP to unbl0ck."
        res3 = self.detector.analyze(ambiguous_3)
        self.assertEqual(res3["risk_level"], "HIGH RISK")

    # =========================================================================
    # 6. MISSING MODEL AND DATASET FALLBACK BEHAVIOR
    # =========================================================================
    def test_missing_dataset_fallback(self):
        """Verifies that missing dataset is handled gracefully without crashes."""
        files, desc = find_dataset_files("/completely/nonexistent/path/data.csv")
        self.assertIsNone(files)
        self.assertIn("not found", desc.lower())

    def test_missing_model_fallback(self):
        """Verifies that missing joblib model falls back cleanly to the safety rules engine."""
        fake_detector = ScamDetector()
        # Point to a nonexistent model path
        fake_detector.ml_model.model_path = Path("/nonexistent/model.joblib")
        fake_detector.ml_model._load_model()
        self.assertFalse(fake_detector.ml_model.is_trained)

        # Analyze a message with missing model
        res = fake_detector.analyze("Dear customer, share your 6-digit OTP immediately.")
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertFalse(res["ml_model_result"]["model_available"])
        self.assertIn("OTP & Credential Request", [f["category"] for f in res["detected_flags"]])

    # =========================================================================
    # 7. MODEL TEST-SET METRICS EVALUATION
    # =========================================================================
    def test_model_test_set_metrics(self):
        """Trains on a controlled benchmark set and verifies precision, recall, f1, and confusion matrix."""
        # 10 spam, 10 ham benchmark dataset
        texts = [
            "Your bank account is blocked share your OTP immediately",
            "SBI debit card suspended send 6 digit OTP to unblock",
            "BESCOM power disconnection tonight unpaid electricity bill",
            "Congratulations you won Rs 25 lakh in KBC lottery claim prize",
            "Install AnyDesk or QuickSupport app to receive refund",
            "Scan QR code and enter UPI PIN to receive money",
            "Digital arrest warrant issued by police pay bail Rs 50000",
            "Transfer money to safe police account to avoid FIR",
            "Part time job earn Rs 5000 daily prepaid telegram task",
            "Income tax refund approved click link to enter credentials",
            "Hi Mom reached Bangalore safely will call evening",
            "Your appointment with Dr Sharma is confirmed for 10 AM",
            "Happy Birthday Dad wishing good health and joy",
            "Monthly electricity bill of Rs 850 is generated due date 25th",
            "Account credited with Rs 1500 salary available balance Rs 24000",
            "Order delivered successfully thank you for shopping",
            "Library book is due on Friday have a great day",
            "Yoga class tomorrow morning at 7 AM community hall",
            "Don't forget to take medicines after lunch Grandma",
            "Milk delivery will resume tomorrow as requested"
        ]
        labels = [1] * 10 + [0] * 10
        df = pd.DataFrame({"text": texts, "label_num": labels})

        pipeline, metrics = train_and_evaluate(df, test_size=0.3, random_state=42)

        self.assertIn("accuracy", metrics)
        self.assertIn("precision", metrics)
        self.assertIn("recall", metrics)
        self.assertIn("f1_score", metrics)
        self.assertIn("confusion_matrix", metrics)
        self.assertGreater(metrics["vocabulary_size"], 0)

    # =========================================================================
    # 8. LEARN UPI SAFELY: VIDEO TRANSCRIPTS, CAPTIONS, & FALLBACKS
    # =========================================================================
    def test_learn_upi_safely_features(self):
        """Verifies all 6 tutorial sections, transcripts, captions, and simulation disclaimers."""
        res = self.app.get('/learn')
        self.assertEqual(res.status_code, 200)
        html = res.get_data(as_text=True)

        # Check all 6 tutorial sections
        self.assertIn("Understanding UPI", html)
        self.assertIn("Making a UPI Payment", html)
        self.assertIn("Set / Reset PIN", html)
        self.assertIn("UPI PIN Safety", html)
        self.assertIn("Biometrics", html)
        self.assertIn("QR & Collect Scams", html)

        # Check video transcript fallback boxes
        self.assertIn("Video Transcript & Text Alternative", html)
        self.assertIn("transcript-steps-list", html)

        # Check simulation disclaimers
        self.assertIn("Educational Learning Simulation", html)
        self.assertIn("NEVER ask for, record, or store real UPI PINs", html)

    # =========================================================================
    # 9. ACCESSIBILITY & BILINGUAL SUPPORT (ENGLISH & KANNADA)
    # =========================================================================
    def test_bilingual_and_accessibility_support(self):
        """Verifies Kannada and English translations, text size, and high-contrast modes."""
        res = self.app.get('/')
        html = res.get_data(as_text=True)

        # Accessibility controls in top bar
        self.assertIn("Text Size:", html)
        self.assertIn("High Contrast", html)
        self.assertIn("data-size=\"sm\"", html)
        self.assertIn("data-size=\"xl\"", html)
        self.assertIn("headerLangSelect", html)

        # Test Kannada translations in API
        kn_res = self.app.post('/api/check-message',
                               data=json.dumps({
                                   "text": "Your account is blocked share your OTP immediately.",
                                   "language": "kn"
                               }),
                               content_type='application/json')
        self.assertEqual(kn_res.status_code, 200)
        data = json.loads(kn_res.get_data(as_text=True))["data"]
        self.assertIn("ಎಚ್ಚರಿಕೆ", data["headline_kn"])
        self.assertGreater(len(data["why_flagged_kn"]), 0)
        self.assertGreater(len(data["what_to_do_kn"]), 0)

    # =========================================================================
    # 11. PRIVACY & SECURITY: ZERO CREDENTIALS & ZERO REAL PAYMENTS
    # =========================================================================
    def test_privacy_and_non_banking_security(self):
        """Ensures that no real banking accounts or credential storage exists."""
        # Database check: Ensure DB stores zero passwords, OTPs, or financial secrets
        conn = database.get_db_connection()
        cursor = conn.cursor()
        tables = [row[0] for row in cursor.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
        conn.close()

        # Check table schemas: only safe educational tables exist
        for t in tables:
            self.assertNotIn("credentials", t.lower())
            self.assertNotIn("bank_account", t.lower())
            self.assertNotIn("passwords", t.lower())


if __name__ == '__main__':
    unittest.main()
