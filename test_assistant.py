"""
Unit tests for the Personal Scam Assistant features in scam_detector.py
"""

import unittest
from scam_detector import scam_detector


class TestPersonalScamAssistant(unittest.TestCase):

    def test_example_bank_otp(self):
        msg = "Your bank account will be blocked today. Share your OTP immediately."
        res = scam_detector.analyze(msg)
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertIn("WARNING: This message has strong signs of a scam.", res["headline_en"])
        # Check why we flagged it contains urgency and otp
        why_str = " ".join(res["why_flagged_en"]).lower()
        self.assertTrue("urgency" in why_str or "block" in why_str)
        self.assertTrue("otp" in why_str)
        # Check what to do
        action_str = " ".join(res["what_to_do_en"]).lower()
        self.assertIn("otp", action_str)
        self.assertIn("bank", action_str)
        # Check identified phrases
        phrases_lower = [p.lower() for p in res["identified_phrases"]]
        self.assertTrue(any("block" in p for p in phrases_lower))
        self.assertTrue(any("otp" in p for p in phrases_lower))
        # Check ML model prediction
        self.assertTrue(res["ml_model_result"]["is_english"])
        if res["ml_model_result"].get("model_available"):
            self.assertGreaterEqual(res["ml_model_result"]["scam_likelihood_pct"], 80)
        else:
            self.assertFalse(res["ml_model_result"]["model_available"])

    def test_no_obvious_warning_signs(self):
        msg = "Hi Grandma, I have reached Bangalore safely. Will visit you tomorrow morning."
        res = scam_detector.analyze(msg)
        self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS")
        self.assertIn("We did not find obvious warning signs in this message", res["no_warning_signs_text_en"])
        self.assertIn("However, this does not prove that it is genuine", res["no_warning_signs_text_en"])
        self.assertIn("Verify the sender independently before clicking a link, sharing information, or making a payment", res["no_warning_signs_text_en"])

    def test_phone_call_police_assistance(self):
        msg = "Someone called claiming to be from the police."
        res = scam_detector.analyze(msg)
        self.assertIsNotNone(res["phone_call_assistance"])
        guidance = " ".join(res["phone_call_assistance"]["steps_en"]).lower()
        self.assertIn("credentials", guidance)
        self.assertIn("hang up", guidance)
        self.assertIn("verified official", guidance)

    def test_already_sent_money(self):
        msg = "I already sent money to the caller. What should I do?"
        res = scam_detector.analyze(msg)
        self.assertIsNotNone(res["already_sent_money"])
        guidance = " ".join(res["already_sent_money"]["steps_en"])
        self.assertIn("1930", guidance)
        self.assertIn("cybercrime.gov.in", guidance)
        self.assertIn("bank", guidance.lower())
        self.assertIn("recovery cannot be legally guaranteed", guidance)

    def test_kannada_translations(self):
        msg = "Your bank account will be blocked today. Share your OTP immediately."
        res = scam_detector.analyze(msg, language='kn')
        self.assertTrue(len(res["why_flagged_kn"]) > 0)
        self.assertTrue(len(res["what_to_do_kn"]) > 0)
        self.assertIn("ಎಚ್ಚರಿಕೆ", res["headline_kn"])
        self.assertIn("ಒಟಿಪಿ", " ".join(res["why_flagged_kn"]))


if __name__ == "__main__":
    unittest.main()
