"""
Unit tests for ScamDetector rule-based engine.
Tests high risk messages, caution messages, clean messages, and edge cases.
"""

import unittest
from scam_detector import ScamDetector


class TestScamDetector(unittest.TestCase):

    def setUp(self):
        self.detector = ScamDetector()

    def test_otp_request(self):
        msg = "Dear SBI User, your card is blocked. Send 6-digit OTP to 9876543210 immediately."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("OTP & Credential Request", flag_categories)
        self.assertIn("Urgent Threat / Fear Tactics", flag_categories)

    def test_digital_arrest_and_police(self):
        msg = "CBI Police: Digital arrest warrant issued for illegal parcel. Pay Rs 50000 bail within 2 hours or police will visit."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("Urgent Threat / Fear Tactics", flag_categories)

    def test_electricity_cutoff(self):
        msg = "Electricity power will be disconnected tonight at 9:30 pm because bill unpaid. Contact officer at 9845112233."
        res = self.detector.analyze(msg)
        self.assertIn(res["risk_level"], ["HIGH RISK", "SUSPICIOUS", "CAUTION"])
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("Urgent Threat / Fear Tactics", flag_categories)

    def test_lottery_fake_prize(self):
        msg = "Congratulations! You have won Rs 25 Lakhs in KBC Lucky Draw. Claim your prize at bit.ly/kbc-prize."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("Fake Prize / Lottery / Cashback", flag_categories)
        self.assertIn("Suspicious Web Link / URL", flag_categories)

    def test_remote_screen_share(self):
        msg = "Customer support: Please install AnyDesk or QuickSupport app to receive your refund."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("Remote Screen-Sharing Request", flag_categories)

    def test_upi_collect_and_qr(self):
        msg = "Scan this QR code to receive money in your bank account. Enter UPI PIN to confirm credit."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        flag_categories = [f["category"] for f in res["detected_flags"]]
        self.assertIn("Collect Request / QR Code Scam", flag_categories)

    def test_clean_message(self):
        msg = "Hi Grandma, I have reached Bangalore safely. Will visit you tomorrow morning."
        res = self.detector.analyze(msg)
        self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS")
        self.assertEqual(len(res["detected_flags"]), 0)

    def test_empty_message(self):
        res = self.detector.analyze("")
        self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS")
        self.assertEqual(res["risk_score"], 0)


if __name__ == "__main__":
    unittest.main()
