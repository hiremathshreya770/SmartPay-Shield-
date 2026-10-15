"""
Unit and integration tests for the 'LEARN UPI SAFELY' feature in EASY PAY — SAFE PAY.
"""

import unittest
from app import app


class TestLearnUpiSafely(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_learn_routes_status_200(self):
        """Verifies that /learn and /learn-upi return HTTP 200 OK."""
        for route in ['/learn', '/learn-upi']:
            res = self.client.get(route)
            self.assertEqual(res.status_code, 200, f"Failed for route {route}")
            html = res.get_data(as_text=True)
            self.assertIn("LEARN UPI SAFELY", html)
            self.assertIn("Learn UPI Safely", html)

    def test_all_six_tutorial_sections_present(self):
        """Verifies that all 6 tutorial sections required by prompt are present."""
        res = self.client.get('/learn')
        html = res.get_data(as_text=True)

        # Section 1: Understanding UPI
        self.assertIn("Understanding UPI", html)
        self.assertIn("Shri Manjunath Vegetables", html)
        self.assertIn("120", html)

        # Section 2: Making a UPI Payment
        self.assertIn("Making a UPI Payment", html)
        self.assertIn("Open your own trusted UPI app", html)
        self.assertIn("Verify the recipient", html)
        self.assertIn("Enter the intended amount", html)
        self.assertIn("Carefully review the payment details", html)
        self.assertIn("Enter your UPI PIN only inside your trusted app", html)
        self.assertIn("Confirm result", html)
        self.assertIn("check transaction history", html)

        # Section 3: Setting or Resetting a UPI PIN
        self.assertIn("Setting or Resetting Your UPI PIN", html)
        self.assertIn("The exact PIN setup process depends on your specific UPI application and bank", html)
        self.assertIn("NEVER enter your actual, real PIN into this website", html)
        self.assertIn("Never show or record a real PIN", html)

        # Section 4: UPI PIN Safety
        self.assertIn("UPI PIN Safety: The Golden Rules", html)
        self.assertIn("A UPI PIN is used <strong>ONLY to SEND money</strong>", html)
        self.assertIn("Strictly Confidential", html)
        self.assertIn("Reject Unexpected Requests", html)

        # Section 5: Biometric Authentication
        self.assertIn("Biometric Authentication", html)
        self.assertIn("How to Check Security Settings in Your Own App", html)
        self.assertIn("does NOT replace your confidential UPI PIN in every situation", html)
        self.assertIn("never collects fingerprints, facial scans, or any biometric information", html)

        # Section 6: Recognizing Collect Requests and QR-Code Scams
        self.assertIn("Recognizing Collect Requests", html)
        self.assertIn("QR Code Scams", html)
        self.assertIn("Collect Request", html)
        self.assertIn("Scanning a QR code to pay someone does NOT mean you will receive money", html)

    def test_accessibility_and_video_requirements(self):
        """Verifies accessibility controls, video demonstration players, captions, and transcripts."""
        res = self.client.get('/learn')
        html = res.get_data(as_text=True)

        # Read Aloud & Stop Speaking buttons
        self.assertIn("btn-read-aloud", html)
        self.assertIn("btn-stop-audio", html)
        self.assertIn("Read Section Aloud", html)

        # Video Player Controls & Transcripts
        self.assertIn("btn-play-pause", html)
        self.assertIn("btn-restart", html)
        self.assertIn("Video Transcript", html)
        self.assertIn("Text Alternative", html)
        self.assertIn("EDUCATIONAL SIMULATION ONLY", html)

    def test_kannada_translations_rendered(self):
        """Verifies Kannada section titles and content are rendered for bilingual support."""
        res = self.client.get('/learn')
        html = res.get_data(as_text=True)

        self.assertIn("ಯುಪಿಐ ಎಂದರೇನು", html)
        self.assertIn("ಯುಪಿಐ ಪಾವತಿ ಮಾಡುವುದು ಹೇಗೆ", html)
        self.assertIn("ಯುಪಿಐ ಪಿನ್ ಹೊಂದಿಸುವುದು ಅಥವಾ ಬದಲಾಯಿಸುವುದು", html)
        self.assertIn("ಯುಪಿಐ ಪಿನ್ ಸುರಕ್ಷತೆ", html)
        self.assertIn("ಬಯೋಮೆಟ್ರಿಕ್", html)
        self.assertIn("ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್", html)

    def test_safety_and_non_banking_disclaimer(self):
        """Verifies that educational simulation disclaimers are prominent."""
        res = self.client.get('/learn')
        html = res.get_data(as_text=True)

        self.assertIn("Educational Learning Simulation", html)
        self.assertIn("not a real banking application", html)
        self.assertIn("NEVER connect to real payment processing", html)


if __name__ == "__main__":
    unittest.main()
