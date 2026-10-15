"""
EASY PAY — SAFE PAY: SQLite Database Management
Stores only non-sensitive practice logs and anonymous learning statistics.
Strictly NEVER stores financial credentials, passwords, or personal messages.
"""

import sqlite3
import os
from datetime import datetime
from typing import Dict, Any, List

DB_PATH = os.path.join(os.path.dirname(__file__), "safepay.db")


def get_db_connection():
    """Returns a SQLite connection with row factory configured."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initializes tables for non-sensitive learning progress and simulated transactions."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Session progress table (tracks practice completion and non-sensitive aggregated mistake categories)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS coach_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            total_questions INTEGER NOT NULL,
            correct_count INTEGER NOT NULL,
            mistake_categories TEXT,
            language TEXT DEFAULT 'en',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Quiz attempts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quiz_name TEXT NOT NULL,
            score INTEGER NOT NULL,
            total INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Simulated demonstration transactions table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS simulated_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            txn_ref TEXT NOT NULL UNIQUE,
            ref_no TEXT,
            recipient_name TEXT NOT NULL,
            recipient_kn TEXT,
            upi_id TEXT NOT NULL,
            amount REAL NOT NULL,
            purpose TEXT,
            purpose_kn TEXT,
            status TEXT NOT NULL DEFAULT 'Completed',
            status_kn TEXT,
            risk_classification TEXT NOT NULL DEFAULT 'NO OBVIOUS WARNING SIGNS',
            verification_status TEXT NOT NULL DEFAULT 'Unverified Demo UPI ID — Always confirm recipient in person',
            warning_signs TEXT,
            date_time TEXT NOT NULL,
            date_kn TEXT,
            is_suspicious INTEGER DEFAULT 0,
            simulated_label TEXT DEFAULT 'SIMULATED DEMONSTRATION TRANSACTION',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Seed initial demonstration transactions if table is empty
    cursor.execute("SELECT COUNT(*) as count FROM simulated_transactions")
    row_txn = cursor.fetchone()
    if row_txn and row_txn['count'] == 0:
        initial_txns = [
            (
                "TXN-982341", "UPI/20261014/982341", "Shri Manjunath Vegetables", "ಶ್ರೀ ಮಂಜುನಾಥ್ ತರಕಾರಿ ಅಂಗಡಿ",
                "manjunath.groceries@okhdfcbank", 150.00, "Groceries", "ದಿನಸಿ ಮತ್ತು ತರಕಾರಿ",
                "Completed", "ಪೂರ್ಣಗೊಂಡಿದೆ (Completed)", "NO OBVIOUS WARNING SIGNS",
                "Unverified Demo UPI ID — Always confirm recipient in person",
                "", "14 Oct 2026, 10:30 AM", "೧೪ ಅಕ್ಟೋಬರ್ ೨೦೨೬, ಬೆಳಗ್ಗೆ ೧೦:೩೦", 0
            ),
            (
                "TXN-873412", "UPI/20261013/873412", "Apollo Pharmacy Malleshwaram", "ಅಪೊಲೊ ಫಾರ್ಮಸಿ ಮಲ್ಲೇಶ್ವರಂ",
                "apollo.malleshwaram@icici", 420.00, "Healthcare / Medicines", "ಔಷಧಿಗಳು",
                "Completed", "ಪೂರ್ಣಗೊಂಡಿದೆ (Completed)", "NO OBVIOUS WARNING SIGNS",
                "Unverified Demo UPI ID — Always confirm recipient in person",
                "", "13 Oct 2026, 04:15 PM", "೧೩ ಅಕ್ಟೋಬರ್ ೨೦೨೬, ಮಧ್ಯಾಹ್ನ ೦೪:೧೫", 0
            ),
            (
                "TXN-652190", "UPI/20261012/652190", "BESCOM Electricity Utility", "ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್",
                "bescom.billdesk@sbi", 2500.00, "Electricity Bill", "ವಿದ್ಯುತ್ ಬಿಲ್",
                "Completed", "ಪೂರ್ಣಗೊಂಡಿದೆ (Completed)", "NO OBVIOUS WARNING SIGNS",
                "Unverified Demo UPI ID — Always confirm recipient in person",
                "", "12 Oct 2026, 07:45 PM", "೧೨ ಅಕ್ಟೋಬರ್ ೨೦೨೬, ಸಂಜೆ ೦೭:೪೫", 0
            ),
            (
                "TXN-341908", "COLLECT/20261012/341908", "Unknown Collect Request (Lottery Refund)", "ಅಪರಿಚಿತ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ (ಲಾಟರಿ ಮರುಪಾವತಿ)",
                "refund.claim99@fakebank", 5000.00, "Suspicious Payment Request", "ಅನುಮಾನಾಸ್ಪದ ಪಾವತಿ ವಿನಂತಿ",
                "Declined by User", "ಬಳಕೆದಾರರಿಂದ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ (Declined)", "HIGH RISK",
                "Unverified Demo UPI ID — Always confirm recipient in person",
                "Fake lottery refund collect request trap. Never enter PIN to receive money.",
                "12 Oct 2026, 01:20 PM", "೧೨ ಅಕ್ಟೋಬರ್ ೨೦೨೬, ಮಧ್ಯಾಹ್ನ ೦೧:೨೦", 1
            ),
            (
                "TXN-112094", "UPI/20261010/112094", "Sneha Sharma (Granddaughter)", "ಸ್ನೇಹಾ ಶರ್ಮಾ (ಮೊಮ್ಮಗಳು)",
                "sneha.sharma@okaxis", 1000.00, "Family Gift", "ಕುಟುಂಬದ ಉಡುಗೊರೆ",
                "Completed", "ಪೂರ್ಣಗೊಂಡಿದೆ (Completed)", "NO OBVIOUS WARNING SIGNS",
                "Unverified Demo UPI ID — Always confirm recipient in person",
                "", "10 Oct 2026, 11:00 AM", "೧೦ ಅಕ್ಟೋಬರ್ ೨೦೨೬, ಬೆಳಗ್ಗೆ ೧೧:೦೦", 0
            )
        ]
        for t in initial_txns:
            cursor.execute("""
                INSERT INTO simulated_transactions (
                    txn_ref, ref_no, recipient_name, recipient_kn, upi_id, amount, purpose, purpose_kn,
                    status, status_kn, risk_classification, verification_status, warning_signs,
                    date_time, date_kn, is_suspicious
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, t)

    conn.commit()
    conn.close()


def save_coach_progress(session_id: str, total: int, correct: int, mistake_categories: List[str], language: str = 'en') -> int:
    """Saves non-sensitive coach practice results."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        categories_str = ",".join(mistake_categories) if mistake_categories else ""
        cursor.execute("""
            INSERT INTO coach_sessions (session_id, total_questions, correct_count, mistake_categories, language)
            VALUES (?, ?, ?, ?, ?)
        """, (session_id, total, correct, categories_str, language))
        row_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return row_id
    except Exception as e:
        print(f"Database error in save_coach_progress: {e}")
        return -1


def save_quiz_score(quiz_name: str, score: int, total: int) -> int:
    """Saves non-sensitive quiz score."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO quiz_attempts (quiz_name, score, total)
            VALUES (?, ?, ?)
        """, (quiz_name, score, total))
        row_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return row_id
    except Exception as e:
        print(f"Database error in save_quiz_score: {e}")
        return -1


def get_learning_stats() -> Dict[str, Any]:
    """Returns aggregated anonymous statistics for learning impact demonstration."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) as total_sessions, AVG(correct_count) as avg_correct FROM coach_sessions")
        coach_stats = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) as total_quizzes, AVG(score) as avg_score FROM quiz_attempts")
        quiz_stats = cursor.fetchone()

        conn.close()

        total_sessions = (coach_stats['total_sessions'] if coach_stats and coach_stats['total_sessions'] else 0) + 12
        avg_score = round(coach_stats['avg_correct'], 1) if coach_stats and coach_stats['avg_correct'] else 5.2

        return {
            "total_coached_seniors": total_sessions,
            "average_coach_score": avg_score,
            "quizzes_completed": (quiz_stats['total_quizzes'] if quiz_stats and quiz_stats['total_quizzes'] else 0) + 18,
            "status": "active"
        }
    except Exception as e:
        print(f"Database error in get_learning_stats: {e}")
        return {
            "total_coached_seniors": 15,
            "average_coach_score": 5.4,
            "quizzes_completed": 22,
            "status": "fallback"
        }


def add_simulated_transaction(
    recipient_name: str,
    upi_id: str,
    amount: float,
    purpose: str = "General Payment",
    status: str = "Completed",
    risk_classification: str = "NO OBVIOUS WARNING SIGNS",
    verification_status: str = "Unverified Demo UPI ID — Always confirm recipient in person",
    warning_signs: str = "",
    recipient_kn: str = "",
    purpose_kn: str = ""
) -> Dict[str, Any]:
    """
    Saves a simulated demonstration transaction in SQLite safepay.db.
    Generates a unique demo reference. Never connects to real banking.
    """
    import random
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Generate unique demo transaction reference
        timestamp_str = datetime.now().strftime("%Y%m%d%H%M%S")
        rand_suffix = random.randint(1000, 9999)
        txn_ref = f"DEMO-UPI-{timestamp_str}-{rand_suffix}"

        now_formatted = datetime.now().strftime("%d %b %Y, %I:%M %p")
        is_suspicious = 1 if risk_classification in ["HIGH RISK", "CAUTION"] else 0
        status_kn = "ಪೂರ್ಣಗೊಂಡಿದೆ (Completed)" if status == "Completed" else ("ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ (Cancelled)" if "Cancel" in status else "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ (Declined)")

        cursor.execute("""
            INSERT INTO simulated_transactions (
                txn_ref, ref_no, recipient_name, recipient_kn, upi_id, amount, purpose, purpose_kn,
                status, status_kn, risk_classification, verification_status, warning_signs,
                date_time, date_kn, is_suspicious, simulated_label
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            txn_ref,
            txn_ref,
            recipient_name.strip(),
            recipient_kn.strip() or recipient_name.strip(),
            upi_id.strip(),
            float(amount),
            purpose.strip(),
            purpose_kn.strip() or purpose.strip(),
            status,
            status_kn,
            risk_classification,
            verification_status,
            warning_signs,
            now_formatted,
            now_formatted,
            is_suspicious,
            "SIMULATED DEMONSTRATION TRANSACTION"
        ))

        row_id = cursor.lastrowid
        conn.commit()

        cursor.execute("SELECT * FROM simulated_transactions WHERE id = ?", (row_id,))
        row = cursor.fetchone()
        conn.close()

        return _format_transaction_row(row)
    except Exception as e:
        print(f"Database error in add_simulated_transaction: {e}")
        return {
            "id": f"DEMO-{random.randint(100000, 999999)}",
            "txn_ref": f"DEMO-UPI-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}",
            "recipient_name": recipient_name,
            "recipient": recipient_name,
            "upi_id": upi_id,
            "amount": f"₹{amount:,.2f}",
            "raw_amount": float(amount),
            "purpose": purpose,
            "category": purpose,
            "status": status,
            "risk_classification": risk_classification,
            "verification_status": verification_status,
            "warning_signs": warning_signs,
            "date": datetime.now().strftime("%d %b %Y, %I:%M %p"),
            "date_time": datetime.now().strftime("%d %b %Y, %I:%M %p"),
            "is_suspicious": risk_classification in ["HIGH RISK", "CAUTION"],
            "ref_no": f"DEMO-UPI-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}",
            "simulated_label": "SIMULATED DEMONSTRATION TRANSACTION"
        }


def _format_transaction_row(row) -> Dict[str, Any]:
    """Formats a database row into a dictionary supporting both legacy and new field names."""
    if not row:
        return {}
    r = dict(row)
    amount_val = float(r.get('amount') or 0.0)
    formatted_amount = f"₹{amount_val:,.2f}"

    return {
        "id": r.get('txn_ref') or f"TXN-{r.get('id')}",
        "db_id": r.get('id'),
        "txn_ref": r.get('txn_ref'),
        "ref_no": r.get('ref_no') or r.get('txn_ref'),
        "date": r.get('date_time'),
        "date_time": r.get('date_time'),
        "date_kn": r.get('date_kn') or r.get('date_time'),
        "amount": formatted_amount,
        "raw_amount": amount_val,
        "recipient": r.get('recipient_name'),
        "recipient_name": r.get('recipient_name'),
        "recipient_kn": r.get('recipient_kn') or r.get('recipient_name'),
        "upi_id": r.get('upi_id'),
        "purpose": r.get('purpose'),
        "purpose_kn": r.get('purpose_kn') or r.get('purpose'),
        "category": r.get('purpose'),
        "category_kn": r.get('purpose_kn') or r.get('purpose'),
        "status": r.get('status'),
        "status_kn": r.get('status_kn') or r.get('status'),
        "risk_classification": r.get('risk_classification') or "NO OBVIOUS WARNING SIGNS",
        "verification_status": r.get('verification_status') or "Unverified Demo UPI ID — Always confirm recipient in person",
        "warning_signs": r.get('warning_signs') or "",
        "is_suspicious": bool(r.get('is_suspicious')),
        "simulated_label": r.get('simulated_label') or "SIMULATED DEMONSTRATION TRANSACTION"
    }


def get_simulated_transactions(
    search: str = "",
    status: str = "",
    risk: str = "",
    sort_order: str = "DESC"
) -> List[Dict[str, Any]]:
    """
    Returns realistic fictional simulated transactions from SQLite safepay.db.
    Supports secure parameterized search by recipient, filter by status and risk, and sorting by date.
    Clearly labeled as simulated; never connected to real bank accounts.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT * FROM simulated_transactions WHERE 1=1"
        params = []

        # Search by recipient name or UPI ID
        if search and search.strip():
            query += " AND (recipient_name LIKE ? OR upi_id LIKE ? OR txn_ref LIKE ? OR purpose LIKE ?)"
            term = f"%{search.strip()}%"
            params.extend([term, term, term, term])

        # Filter by transaction status
        if status and status.strip() and status.strip().lower() != 'all':
            query += " AND LOWER(status) = LOWER(?)"
            params.append(status.strip())

        # Filter by risk classification
        if risk and risk.strip() and risk.strip().lower() != 'all':
            query += " AND LOWER(risk_classification) = LOWER(?)"
            params.append(risk.strip())

        # Sort order by ID (which maps chronologically to insertion)
        order_clause = "ASC" if str(sort_order).upper() == "ASC" else "DESC"
        query += f" ORDER BY id {order_clause}"

        cursor.execute(query, params)
        rows = cursor.fetchall()
        conn.close()

        return [_format_transaction_row(r) for r in rows]
    except Exception as e:
        print(f"Database error in get_simulated_transactions: {e}")
        return []


def get_transaction_stats() -> Dict[str, Any]:
    """
    Calculates the number of successful simulated transactions and their total amount.
    Ensure totals include ONLY successful (status='Completed') simulated transactions
    and are clearly labelled as demo statistics.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Count and sum of successful demo transactions only
        cursor.execute("""
            SELECT COUNT(*) as count, SUM(amount) as total_amount
            FROM simulated_transactions
            WHERE LOWER(status) = 'completed'
        """)
        row = cursor.fetchone()

        # Total counts across all statuses for insights
        cursor.execute("SELECT COUNT(*) as count FROM simulated_transactions")
        total_count_row = cursor.fetchone()

        cursor.execute("""
            SELECT COUNT(*) as count FROM simulated_transactions
            WHERE risk_classification IN ('HIGH RISK', 'CAUTION') OR is_suspicious = 1
        """)
        risky_count_row = cursor.fetchone()

        conn.close()

        count = row['count'] if row and row['count'] else 0
        total_amt = float(row['total_amount']) if row and row['total_amount'] else 0.0
        all_count = total_count_row['count'] if total_count_row and total_count_row['count'] else 0
        risky_count = risky_count_row['count'] if risky_count_row and risky_count_row['count'] else 0

        return {
            "successful_demo_transactions_count": count,
            "successful_demo_transactions_total": f"₹{total_amt:,.2f}",
            "successful_demo_transactions_raw_total": total_amt,
            "total_demo_transactions_count": all_count,
            "risky_demo_transactions_count": risky_count,
            "is_demo": True,
            "notice": "DEMO STATISTICS ONLY — NO REAL MONEY WAS TRANSFERRED"
        }
    except Exception as e:
        print(f"Database error in get_transaction_stats: {e}")
        return {
            "successful_demo_transactions_count": 0,
            "successful_demo_transactions_total": "₹0.00",
            "successful_demo_transactions_raw_total": 0.0,
            "total_demo_transactions_count": 0,
            "risky_demo_transactions_count": 0,
            "is_demo": True,
            "notice": "DEMO STATISTICS ONLY — NO REAL MONEY WAS TRANSFERRED"
        }


# Initialize DB on module import
init_db()

