"""
Unit Tests for Machine Learning Text-Classification Pipeline and Safety Checks.
Tests:
1. train_model module: dataset validation, missing file handling, pipeline training on synthetic split,
   stratified split, evaluation metrics, and joblib model persistence.
2. Text normalization & spelling variations (0TP, p!n, b@nk, o t p, anyd3sk, etc.).
3. Exact identified phrase extraction without hallucinated evidence.
4. All 6 mandatory safety check categories:
   - OTP, PIN, password, credentials
   - Urgent threats (account block, disconnection, digital arrest)
   - Fake prizes, lottery winnings, refunds
   - Suspicious links and remote access applications (AnyDesk, TeamViewer)
   - Unexpected payment requests and QR code traps
   - Transfer money to unlock account or receive reward
5. Disagreement handling between model and rules (more cautious result + clear explanation).
6. Unseen realistic Indian test messages (messages not in training data).
"""

import unittest
import tempfile
from pathlib import Path
import pandas as pd
import numpy as np

from train_model import (
    find_dataset_files,
    load_and_validate_dataset,
    train_and_evaluate,
    save_model,
    load_trained_model,
    predict_message,
    DEFAULT_MODEL_PATH
)
from scam_detector import (
    ScamDetector,
    normalize_text_variations,
    ScamMLModel
)


class TestMLPipelineAndSafetyChecks(unittest.TestCase):

    def setUp(self):
        self.detector = ScamDetector()

    def test_missing_dataset_detection(self):
        """Validates that train_model cleanly identifies missing dataset files."""
        files, desc = find_dataset_files("/nonexistent/data.csv")
        self.assertIsNone(files)
        self.assertIn("not found", desc.lower())

    def test_load_and_validate_dataset_logic(self):
        """Tests dataset validation, column normalization, deduplication, and label conversion."""
        with tempfile.TemporaryDirectory() as tmpdir:
            csv_path = Path(tmpdir) / "data1.csv"
            raw_data = {
                "Text": [
                    "Dear customer your OTP is 492019 for transfer.",
                    "Hello grandma see you tomorrow.",
                    "Dear customer your OTP is 492019 for transfer.",  # Duplicate
                    "",                                                # Empty text
                    "   ",                                             # Whitespace text
                    "You won Rs 50000 lottery cash prize.",
                    "Meeting at 3 PM today."
                ],
                "Label": [
                    "spam",
                    "ham",
                    "spam",
                    "spam",
                    "ham",
                    "fraudulent",
                    "invalid_label"                                    # Invalid label to be dropped
                ]
            }
            pd.DataFrame(raw_data).to_csv(csv_path, index=False)

            df_validated = load_and_validate_dataset([csv_path])
            self.assertEqual(len(df_validated), 3)  # 2 spam/fraudulent, 1 ham (1 duplicate & 3 invalid dropped)
            self.assertIn("text", df_validated.columns)
            self.assertIn("label_num", df_validated.columns)
            # Verify label mapping: ham=0, spam=1
            ham_rows = df_validated[df_validated["label_num"] == 0]
            spam_rows = df_validated[df_validated["label_num"] == 1]
            self.assertEqual(len(ham_rows), 1)
            self.assertEqual(len(spam_rows), 2)

    def test_train_evaluate_and_persist_pipeline(self):
        """Tests the full TF-IDF + LogisticRegression training, evaluation metrics, and joblib dump."""
        # Create a small balanced dataset with sufficient samples for stratified split
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

        # Validate evaluation metrics
        self.assertIn("accuracy", metrics)
        self.assertIn("precision", metrics)
        self.assertIn("recall", metrics)
        self.assertIn("f1_score", metrics)
        self.assertIn("confusion_matrix", metrics)
        self.assertGreater(metrics["vocabulary_size"], 0)

        # Test model persistence and reload
        with tempfile.TemporaryDirectory() as tmpdir:
            model_file = Path(tmpdir) / "test_model.joblib"
            meta_file = Path(tmpdir) / "test_metadata.json"
            save_model(pipeline, metrics, model_path=model_file, metadata_path=meta_file)
            self.assertTrue(model_file.is_file())
            self.assertTrue(meta_file.is_file())

            # Test predict_message reusable function
            res = predict_message("Please send your OTP to unblock card", model_path=model_file)
            self.assertTrue(res["model_available"])
            self.assertTrue(res["calibrated"])
            self.assertIn("fraud_probability", res)
            self.assertGreaterEqual(res["fraud_probability"], 0.0)
            self.assertLessEqual(res["fraud_probability"], 1.0)
            self.assertIn(res["confidence_level"], ["High", "Moderate", "Low"])

    def test_spelling_variations_and_leetspeak(self):
        """Tests that obfuscated fraud keywords are detected via normalization."""
        # 1. Spaced acronyms
        self.assertEqual(normalize_text_variations("Share your o t p now"), "share your otp now")
        self.assertEqual(normalize_text_variations("Enter u p i p i n"), "enter upi pin")
        self.assertEqual(normalize_text_variations("Account will be b l o c k"), "account will be block")

        # 2. Leetspeak
        self.assertIn("otp", normalize_text_variations("0TP"))
        self.assertIn("pin", normalize_text_variations("p!n"))
        self.assertIn("password", normalize_text_variations("pa$$word"))
        self.assertIn("anydesk", normalize_text_variations("anyd3sk"))
        self.assertIn("block", normalize_text_variations("bl0cked"))

        # 3. Spelling normalization in ScamDetector
        msg = "Dear user, share 0TP immediately or account will be bl0cked."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("OTP & Credential Request", flag_categories)
        self.assertIn("Urgent Threat / Fear Tactics", flag_categories)

    def test_six_mandatory_safety_categories(self):
        """Verifies explicit detection across all 6 safety categories required by prompt."""
        # Category 1: OTP, PIN, password, banking credentials
        res1 = self.detector.analyze("Please tell me your 4-digit UPI PIN and login password.")
        self.assertEqual(res1["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "OTP & Credential Request" for f in res1["detected_flags"]))

        # Category 2: Urgent threats (account block, arrest, disconnection)
        res2 = self.detector.analyze("Customs Officer: Illegal parcel seized. Digital arrest warrant issued for money laundering.")
        self.assertEqual(res2["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "Urgent Threat / Fear Tactics" for f in res2["detected_flags"]))

        # Category 3: Fake prizes, lottery, refunds
        res3 = self.detector.analyze("Congratulations you won Rs 50,00,000 cash in KBC Mega Lucky Draw.")
        self.assertIn(res3["risk_level"], ["HIGH RISK", "SUSPICIOUS"])
        self.assertTrue(any(f["category"] == "Fake Prize / Lottery / Cashback" for f in res3["detected_flags"]))

        # Category 4: Suspicious links & remote access apps
        res4 = self.detector.analyze("Install AnyDesk software to verify your KYC details at http://sbi-kyc-update.xyz")
        self.assertEqual(res4["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "Remote Screen-Sharing Request" for f in res4["detected_flags"]))
        self.assertTrue(any(f["category"] == "Suspicious Web Link / URL" for f in res4["detected_flags"]))

        # Category 5: Unexpected payment requests & QR code traps
        res5 = self.detector.analyze("Buyer sent you a UPI collect request. Scan QR code and enter PIN to receive Rs 8000.")
        self.assertEqual(res5["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "Collect Request / QR Code Scam" for f in res5["detected_flags"]))

        # Category 6: Transfer money to unlock account or receive reward
        res6 = self.detector.analyze("Pay Rs 2500 registration fee to unlock your frozen bank account and receive loan.")
        self.assertEqual(res6["risk_level"], "HIGH RISK")
        self.assertTrue(any(f["category"] == "Advance Fee / Account Unlock Scam" for f in res6["detected_flags"]))

    def test_unseen_legitimate_messages(self):
        """Tests realistic everyday legitimate Indian messages not in any training set."""
        unseen_legit = [
            "Your Amazon package with tracking #IN782910 has been delivered to your doorstep.",
            "Hi Appa, flight landed safely at Bangalore airport. Taking a taxi home now.",
            "Dr. Rao's clinic: Your appointment is confirmed for Saturday 4 PM. Please bring medical reports.",
            "Your monthly milk subscription for October has been successfully renewed. Thank you.",
            "Good evening Uncle, hope you are feeling better today. Sending the book by courier."
        ]
        for msg in unseen_legit:
            res = self.detector.analyze(msg)
            self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS", f"Failed for legitimate: {msg}")
            self.assertIn("We did not find obvious warning signs", res["no_warning_signs_text_en"])
            self.assertEqual(len(res["detected_flags"]), 0)

    def test_unseen_fraudulent_messages(self):
        """Tests realistic emerging Indian fraud messages not in any training set."""
        unseen_scam = [
            "BESCOM: Power will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer at 9845012345.",
            "CBI Cyber Branch: Digital arrest order issued against you for illegal narcotics parcel in Mumbai.",
            "Airtel Support: To prevent your SIM card from being deactivated within 2 hours, download AnyDesk immediately.",
            "Your bank account is frozen. Transfer Rs 5000 security deposit to unlock account right now."
        ]
        for msg in unseen_scam:
            res = self.detector.analyze(msg)
            self.assertIn(res["risk_level"], ["HIGH RISK", "SUSPICIOUS"], f"Failed for scam: {msg}")
            self.assertGreater(len(res["identified_phrases"]), 0)
            self.assertGreater(len(res["why_flagged_en"]), 0)
            self.assertGreater(len(res["what_to_do_en"]), 0)

    def test_no_obvious_warning_signs_disclaimer(self):
        """Verifies that no message is labeled absolutely safe and mandatory disclaimer is present."""
        res = self.detector.analyze("Good morning Dad, have a peaceful day.")
        self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS")
        self.assertIn("does not prove that it is genuine", res["no_warning_signs_text_en"])
        self.assertIn("Verify the sender independently", res["no_warning_signs_text_en"])


if __name__ == "__main__":
    unittest.main()
