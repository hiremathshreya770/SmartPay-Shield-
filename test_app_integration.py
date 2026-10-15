"""
Integration test for Flask backend endpoints with updated scam_detector and train_model.
Tests:
- /api/check-message with various realistic, unseen inputs
- /api/assistant/analyze with English and Kannada
- Calibrated response structure
- Backward compatibility with checker frontend
"""

import unittest
import json
from app import app


class TestFlaskIntegration(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_check_message_otp_high_risk(self):
        response = self.client.post(
            '/api/check-message',
            data=json.dumps({"text": "Dear customer, your card is blocked. Send OTP to 9876543210 immediately.", "language": "en"}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "success")
        res = data["data"]
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertTrue(len(res["identified_phrases"]) > 0)
        self.assertIn("OTP & Credential Request", [f["category"] for f in res["detected_flags"]])

    def test_check_message_clean_legitimate(self):
        response = self.client.post(
            '/api/check-message',
            data=json.dumps({"text": "Hi Grandma, reached Bangalore safely. See you tomorrow evening!", "language": "en"}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "success")
        res = data["data"]
        self.assertEqual(res["risk_level"], "NO OBVIOUS WARNING SIGNS")
        self.assertIn("We did not find obvious warning signs", res["no_warning_signs_text_en"])

    def test_check_message_kannada_language(self):
        response = self.client.post(
            '/api/check-message',
            data=json.dumps({"text": "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಸ್ಥಗಿತಗೊಂಡಿದೆ. ತಕ್ಷಣ ಒಟಿಪಿ ಕಳುಹಿಸಿ.", "language": "kn"}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "success")
        res = data["data"]
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertTrue(len(res["why_flagged_kn"]) > 0)

    def test_assistant_analyze_endpoint(self):
        response = self.client.post(
            '/api/assistant/analyze',
            data=json.dumps({"text": "Someone called claiming to be from the police asking for UPI PIN.", "language": "en"}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "success")
        res = data["data"]
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertIsNotNone(res["phone_call_assistance"])


if __name__ == "__main__":
    unittest.main()
