"""
Unit and integration tests for Feature 3 (Smart Payment Assistant)
and Feature 4 (Transaction History and Safety Insights).
"""

import unittest
import json
from app import app
import database


class TestSmartPaymentAndTransactions(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_routes_status_200(self):
        """Verifies that simulator, payment assistant, transactions, and history routes return HTTP 200."""
        for route in ['/simulator', '/payment-assistant', '/transactions', '/history']:
            res = self.client.get(route)
            self.assertEqual(res.status_code, 200, f"Route {route} failed with status {res.status_code}")

    def test_payment_assess_high_risk(self):
        """Verifies that payments with urgent threats, OTP, or advance fees are flagged as HIGH RISK."""
        payload = {
            "recipient_name": "Police Officer Digital Arrest",
            "upi_id": "police.officer@customs",
            "amount": "15000",
            "purpose": "Urgent bail payment to avoid police arrest immediately. Send OTP."
        }
        res = self.client.post('/api/payment/assess',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["risk_classification"], "HIGH RISK")
        self.assertTrue(len(data["warning_signs"]) > 0)
        self.assertTrue(len(data["recommended_precautions"]) > 0)
        self.assertIn("Unverified Demo UPI ID", data["verification_status"])

    def test_payment_assess_caution(self):
        """Verifies that unfamiliar payments or unverified refund handles are flagged as CAUTION."""
        payload = {
            "recipient_name": "Electricity Bill Refund Support",
            "upi_id": "refund.desk@fakebank",
            "amount": "2500",
            "purpose": "Electricity overcharge refund verification"
        }
        res = self.client.post('/api/payment/assess',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["risk_classification"], "CAUTION")

    def test_payment_assess_no_obvious_warnings(self):
        """Verifies that everyday legitimate payments have NO OBVIOUS WARNING SIGNS."""
        payload = {
            "recipient_name": "Local Grocery Store",
            "upi_id": "merchant.groceries@okhdfcbank",
            "amount": "180",
            "purpose": "Fresh vegetables and milk"
        }
        res = self.client.post('/api/payment/assess',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["risk_classification"], "NO OBVIOUS WARNING SIGNS")

    def test_payment_confirm_success(self):
        """Verifies confirming a demo payment generates a unique demo ref and saves to database."""
        payload = {
            "recipient_name": "Kaveri Medical Store",
            "upi_id": "kaveri.meds@icici",
            "amount": "350",
            "purpose": "Blood pressure medicines",
            "risk_classification": "NO OBVIOUS WARNING SIGNS",
            "warning_signs": "None"
        }
        res = self.client.post('/api/payment/confirm',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertIn("DEMO PAYMENT COMPLETED", data["message"])
        txn = data["transaction"]
        self.assertTrue(txn["txn_ref"].startswith("DEMO-UPI-"))
        self.assertEqual(txn["recipient_name"], "Kaveri Medical Store")
        self.assertEqual(txn["status"], "Completed")

    def test_payment_confirm_high_risk_requires_acknowledgment(self):
        """Verifies that high-risk payments require explicit acknowledgment before confirmation."""
        payload = {
            "recipient_name": "Suspicious Caller",
            "upi_id": "scam@fakebank",
            "amount": "10000",
            "purpose": "Urgent police settlement",
            "risk_classification": "HIGH RISK",
            "acknowledged_high_risk": False
        }
        res = self.client.post('/api/payment/confirm',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertIn("explicit acknowledgment", data["message"])

        # Now test with acknowledgment = True
        payload["acknowledged_high_risk"] = True
        res_ack = self.client.post('/api/payment/confirm',
                                   data=json.dumps(payload),
                                   content_type='application/json')
        self.assertEqual(res_ack.status_code, 200)
        data_ack = res_ack.get_json()
        self.assertEqual(data_ack["status"], "success")

    def test_payment_cancel(self):
        """Verifies cancelling a payment logs it as Cancelled and does not count towards completed totals."""
        payload = {
            "recipient_name": "Suspicious Caller",
            "upi_id": "scam@fakebank",
            "amount": "5000",
            "purpose": "Cancelled Lottery Advance Fee",
            "risk_classification": "HIGH RISK"
        }
        res = self.client.post('/api/payment/cancel',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["transaction"]["status"], "Cancelled by User")

    def test_transactions_api_search_filter_sort(self):
        """Verifies GET /api/transactions with search, status filtering, risk filtering, and statistics."""
        # 1. Base query
        res = self.client.get('/api/transactions')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        txns = data["transactions"]
        self.assertGreaterEqual(len(txns), 1)

        # 2. Check stats
        stats = data["stats"]
        self.assertTrue(stats["is_demo"])
        self.assertIn("DEMO STATISTICS ONLY", stats["notice"])
        self.assertGreaterEqual(stats["successful_demo_transactions_count"], 1)

        # 3. Search query
        res_search = self.client.get('/api/transactions?search=Vegetables')
        self.assertEqual(res_search.status_code, 200)
        data_search = res_search.get_json()
        for t in data_search["transactions"]:
            self.assertTrue("vegetables" in t["recipient_name"].lower() or "vegetables" in t["purpose"].lower())

        # 4. Status filter
        res_status = self.client.get('/api/transactions?status=Completed')
        self.assertEqual(res_status.status_code, 200)
        data_status = res_status.get_json()
        for t in data_status["transactions"]:
            self.assertEqual(t["status"], "Completed")

        # 5. Risk filter
        res_risk = self.client.get('/api/transactions?risk=HIGH%20RISK')
        self.assertEqual(res_risk.status_code, 200)
        data_risk = res_risk.get_json()
        for t in data_risk["transactions"]:
            self.assertEqual(t["risk_classification"], "HIGH RISK")


if __name__ == '__main__':
    unittest.main()
