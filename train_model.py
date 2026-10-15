"""
EASY PAY — SAFE PAY: Scam & Spam Text Classification Model Trainer
HACKURITY 2026 Hackathon - Machine Learning Training Script

Dataset: Scam/Spam India Dataset
Expected Columns:
  - text: message content
  - label: ham (legitimate) or spam (potentially fraudulent)
Expected Records:
  - Total: 2,272
  - ham: 1,377
  - spam: 895

Workflow:
1. Search for data1.csv, data2.csv, or merged dataset CSV.
2. If missing, print a clear error and exact location instructions.
3. If present:
   - Load with pandas.
   - Validate text and label columns.
   - Remove empty messages and invalid labels.
   - Remove duplicate messages.
   - Convert labels: ham -> 0 (legitimate), spam -> 1 (potentially fraudulent).
   - Stratified train/test split.
   - Fit TF-IDF vectorizer only on training data.
   - Train Logistic Regression classifier.
   - Evaluate on test set (precision, recall, f1, confusion matrix, accuracy).
   - Save trained pipeline and metadata using joblib.
   - Provide reusable prediction function for Flask backend.
"""

import os
import sys
import argparse
import json
from pathlib import Path
from typing import Tuple, Optional, Dict, Any, List

import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# Project paths
PROJECT_ROOT = Path(__file__).resolve().parent
DEFAULT_MODEL_DIR = PROJECT_ROOT / "model"
DEFAULT_MODEL_PATH = DEFAULT_MODEL_DIR / "scam_classifier.joblib"
DEFAULT_METADATA_PATH = DEFAULT_MODEL_DIR / "model_metadata.json"

# Potential dataset locations in order of preference
POSSIBLE_MERGED_NAMES = [
    "scam_spam_india.csv",
    "scam_india.csv",
    "spam_india.csv",
    "dataset.csv",
    "merged_dataset.csv",
    "data.csv"
]
POSSIBLE_DIRS = [
    PROJECT_ROOT,
    PROJECT_ROOT / "data",
    PROJECT_ROOT / "dataset"
]


def find_dataset_files(
    data_path: Optional[str] = None,
    data1_path: Optional[str] = None,
    data2_path: Optional[str] = None
) -> Tuple[Optional[List[Path]], str]:
    """
    Searches for dataset files in standard project directories or user-specified paths.
    Returns (list_of_paths, description).
    """
    # 1. Explicit user CLI arguments
    if data_path and Path(data_path).is_file():
        return [Path(data_path)], f"Explicit merged dataset: {data_path}"
    if data1_path and data2_path:
        p1, p2 = Path(data1_path), Path(data2_path)
        if p1.is_file() and p2.is_file():
            return [p1, p2], f"Explicit split datasets: {p1} and {p2}"

    # 2. Search for data1.csv and data2.csv in possible directories
    for directory in POSSIBLE_DIRS:
        f1 = directory / "data1.csv"
        f2 = directory / "data2.csv"
        if f1.is_file() and f2.is_file():
            return [f1, f2], f"Found split dataset files: {f1} and {f2}"

    # 3. Search for a single merged CSV in possible directories
    for directory in POSSIBLE_DIRS:
        for fname in POSSIBLE_MERGED_NAMES:
            merged_file = directory / fname
            if merged_file.is_file():
                return [merged_file], f"Found merged dataset file: {merged_file}"

    # 4. Search for standalone data1.csv or data2.csv if only one exists
    for directory in POSSIBLE_DIRS:
        f1 = directory / "data1.csv"
        if f1.is_file():
            return [f1], f"Found single dataset file: {f1}"
        f2 = directory / "data2.csv"
        if f2.is_file():
            return [f2], f"Found single dataset file: {f2}"

    return None, "Dataset CSV files not found."


def print_dataset_missing_error():
    """Prints a clear, actionable guide on where to place the CSV file."""
    error_msg = f"""
================================================================================
[!]  DATASET FILES NOT FOUND: Scam/Spam India Dataset
================================================================================

The machine learning training script requires the Scam/Spam India Dataset CSV files.
Antigravity will NOT invent fake training data or falsely claim the model was trained.

WHERE TO PLACE YOUR DATASET FILES:
Please place your CSV file(s) in the project root:
  - {PROJECT_ROOT / "data1.csv"}
  - {PROJECT_ROOT / "data2.csv"}
OR in a 'data' subfolder:
  - {PROJECT_ROOT / "data" / "data1.csv"}
  - {PROJECT_ROOT / "data" / "data2.csv"}
OR provide a single merged CSV:
  - {PROJECT_ROOT / "data.csv"} (or dataset.csv / scam_spam_india.csv)

REQUIRED DATASET SPECIFICATIONS:
  - Total records: 2,272
  - Target distribution:
      * ham (legitimate): 1,377 records
      * spam (potentially fraudulent): 895 records
  - Required columns:
      * 'text': message content (string)
      * 'label': 'ham' or 'spam' (string)

ONCE YOU HAVE PLACED THE CSV FILE(S):
Run the following command to train and evaluate the model:
  python train_model.py

The script will automatically validate, preprocess, train the Logistic Regression
pipeline, evaluate test metrics, and save the model to 'model/scam_classifier.joblib'.
================================================================================
"""
    print(error_msg, file=sys.stderr)


def load_and_validate_dataset(file_paths: List[Path]) -> pd.DataFrame:
    """
    Step 1: Load the dataset using pandas.
    Step 2: Validate the text and label columns.
    Step 3: Remove empty messages and invalid labels.
    Step 4: Remove duplicate messages.
    Step 5: Convert labels consistently: ham = legitimate (0), spam = fraudulent (1).
    """
    frames = []
    for fp in file_paths:
        print(f"[*] Loading CSV file: {fp}")
        # Try standard UTF-8 and fallback encodings commonly found in CSVs
        try:
            df_part = pd.read_csv(fp, encoding="utf-8")
        except UnicodeDecodeError:
            df_part = pd.read_csv(fp, encoding="latin1")
        frames.append(df_part)

    if not frames:
        raise ValueError("No data could be read from the specified paths.")

    df = pd.concat(frames, ignore_index=True) if len(frames) > 1 else frames[0]
    initial_rows = len(df)
    print(f"[*] Total raw records loaded: {initial_rows}")

    # Validate column names (case-insensitive & whitespace-trimmed)
    col_mapping = {}
    for col in df.columns:
        clean_col = str(col).strip().lower()
        if clean_col in ["text", "message", "sms", "content", "msg"]:
            col_mapping[col] = "text"
        elif clean_col in ["label", "target", "class", "category", "type"]:
            col_mapping[col] = "label"

    df = df.rename(columns=col_mapping)

    if "text" not in df.columns or "label" not in df.columns:
        raise ValueError(
            f"Dataset must contain 'text' and 'label' columns. Found columns: {list(df.columns)}"
        )

    # Keep only relevant columns
    df = df[["text", "label"]].copy()

    # Step 3: Remove empty messages and invalid labels
    df = df.dropna(subset=["text", "label"]).copy()
    df["text"] = df["text"].astype(str).str.strip()
    df["label"] = df["label"].astype(str).str.strip().str.lower()

    # Drop null-like and empty texts
    df = df[df["text"].ne("") & ~df["text"].str.lower().isin(["nan", "none", "null"])].copy()

    # Map labels: ham -> 0 (legitimate), spam -> 1 (fraudulent)
    valid_ham = ["ham", "legitimate", "safe", "0", "0.0", "normal"]
    valid_spam = ["spam", "fraud", "fraudulent", "scam", "1", "1.0"]

    def map_label(val: str) -> Optional[int]:
        if val in valid_ham:
            return 0
        if val in valid_spam:
            return 1
        return None

    df["label_num"] = df["label"].apply(map_label)
    df = df.dropna(subset=["label_num"]).copy()
    df["label_num"] = df["label_num"].astype(int)

    # Step 4: Remove duplicate messages
    before_dedup = len(df)
    df = df.drop_duplicates(subset=["text"], keep="first").copy()
    dedup_removed = before_dedup - len(df)
    if dedup_removed > 0:
        print(f"[*] Removed {dedup_removed} duplicate messages.")

    ham_count = (df["label_num"] == 0).sum()
    spam_count = (df["label_num"] == 1).sum()
    total_valid = len(df)

    print(f"[*] Validated dataset: {total_valid} records (ham: {ham_count}, spam: {spam_count})")
    return df


def train_and_evaluate(
    df: pd.DataFrame,
    test_size: float = 0.2,
    random_state: int = 42
) -> Tuple[Pipeline, Dict[str, Any]]:
    """
    Step 6: Split the data into training and test sets using stratified sampling.
    Step 7: Fit all text preprocessing and feature extraction only on the training data.
    Step 8: Train a text-classification pipeline using TF-IDF features and Logistic Regression.
    Step 9: Evaluate on held-out test set (precision, recall, F1, confusion matrix, accuracy).
    """
    X = np.asarray(df["text"].tolist(), dtype=object)
    y = np.asarray(df["label_num"].tolist(), dtype=int)

    print(f"\n[*] Performing Stratified Train/Test Split (test_size={test_size}, random_state={random_state})...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=test_size,
        random_state=random_state,
        stratify=y
    )

    print(f"    - Training set size: {len(X_train)} (ham: {(y_train == 0).sum()}, spam: {(y_train == 1).sum()})")
    print(f"    - Held-out test set size: {len(X_test)} (ham: {(y_test == 0).sum()}, spam: {(y_test == 1).sum()})")

    # Step 7 & 8: Build Pipeline
    # TfidfVectorizer fitted ONLY on training data through Pipeline
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            ngram_range=(1, 2),
            min_df=2,
            max_df=0.95,
            sublinear_tf=True,
            strip_accents='unicode',
            lowercase=True
        )),
        ('clf', LogisticRegression(
            class_weight='balanced',
            max_iter=1000,
            C=1.5,
            solver='lbfgs',
            random_state=random_state
        ))
    ])

    print("[*] Fitting TF-IDF Vectorizer and training Logistic Regression model on training set only...")
    pipeline.fit(X_train, y_train)

    # Step 9: Evaluate on held-out test set
    print("[*] Evaluating on held-out test set...")
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, zero_division=0))
    rec = float(recall_score(y_test, y_pred, zero_division=0))
    f1 = float(f1_score(y_test, y_pred, zero_division=0))
    cm = confusion_matrix(y_test, y_pred).tolist()
    report = classification_report(
        y_test,
        y_pred,
        target_names=["Legitimate (Ham)", "Fraudulent (Spam)"],
        digits=4
    )

    metrics = {
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "confusion_matrix": {
            "true_negatives_ham": cm[0][0],
            "false_positives_spam": cm[0][1],
            "false_negatives_ham": cm[1][0],
            "true_positives_spam": cm[1][1]
        },
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "total_samples": len(df),
        "vocabulary_size": len(pipeline.named_steps['tfidf'].vocabulary_)
    }

    print("\n" + "=" * 60)
    print("[*] HELD-OUT TEST SET EVALUATION RESULTS")
    print("=" * 60)
    print(f"Accuracy  : {acc * 100:.2f}%")
    print(f"Precision : {prec * 100:.2f}% (Fraudulent/Spam)")
    print(f"Recall    : {rec * 100:.2f}% (Fraudulent/Spam)")
    print(f"F1-Score  : {f1 * 100:.2f}%")
    print("\nConfusion Matrix:")
    print(f"  True Legitimate (Ham) correctly predicted : {cm[0][0]}")
    print(f"  Legitimate incorrectly flagged as Spam    : {cm[0][1]} (False Positives)")
    print(f"  Spam incorrectly passed as Legitimate    : {cm[1][0]} (False Negatives)")
    print(f"  True Spam correctly detected             : {cm[1][1]}")
    print("\nDetailed Classification Report:\n")
    print(report)
    print("=" * 60)

    return pipeline, metrics


def save_model(
    pipeline: Pipeline,
    metrics: Dict[str, Any],
    model_path: Path = DEFAULT_MODEL_PATH,
    metadata_path: Path = DEFAULT_METADATA_PATH
):
    """
    Step 10: Save the trained model and vectorizer pipeline using joblib,
    along with JSON metadata.
    """
    model_path.parent.mkdir(parents=True, exist_ok=True)
    metadata_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"[*] Saving trained pipeline to: {model_path}")
    joblib.dump(pipeline, model_path)

    metadata = {
        "model_type": "TF-IDF + Logistic Regression",
        "dataset": "Scam/Spam India Dataset",
        "classes": {0: "Legitimate (Ham)", 1: "Fraudulent (Spam)"},
        "metrics": metrics,
        "calibrated": True,
        "language_scope": "English only"
    }

    print(f"[*] Saving model metadata to: {metadata_path}")
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print("[SUCCESS] Model and metadata saved successfully!")


# Global in-memory cache for loaded model
_CACHED_MODEL: Optional[Pipeline] = None
_CACHED_MODEL_PATH: Optional[Path] = None


def load_trained_model(model_path: Optional[Path] = None) -> Optional[Pipeline]:
    """
    Loads the saved joblib model pipeline. Returns None if model file does not exist.
    """
    global _CACHED_MODEL, _CACHED_MODEL_PATH
    target_path = model_path or DEFAULT_MODEL_PATH

    if not target_path.is_file():
        # Check root directory fallback
        root_path = PROJECT_ROOT / "scam_classifier.joblib"
        if root_path.is_file():
            target_path = root_path
        else:
            return None

    if _CACHED_MODEL is not None and _CACHED_MODEL_PATH == target_path:
        return _CACHED_MODEL

    try:
        _CACHED_MODEL = joblib.load(target_path)
        _CACHED_MODEL_PATH = target_path
        return _CACHED_MODEL
    except Exception as e:
        print(f"[!] Error loading model from {target_path}: {e}", file=sys.stderr)
        return None


def predict_message(text: str, model_path: Optional[Path] = None) -> Dict[str, Any]:
    """
    Step 11: Reusable prediction function for the Flask backend.
    Takes a raw user message string and returns calibrated prediction results.
    """
    model = load_trained_model(model_path)
    clean_text = (text or "").strip()

    if model is None:
        return {
            "model_available": False,
            "prediction": "Model Unavailable",
            "fraud_probability": None,
            "confidence_pct": None,
            "confidence_level": "N/A",
            "is_spam": False,
            "calibrated": False,
            "status_message": "Trained ML model file not found. Place dataset CSV files and run train_model.py."
        }

    if not clean_text:
        return {
            "model_available": True,
            "prediction": "Legitimate",
            "fraud_probability": 0.0,
            "confidence_pct": 100.0,
            "confidence_level": "High",
            "is_spam": False,
            "calibrated": True,
            "status_message": "Empty message input."
        }

    # Get calibrated class probabilities from Logistic Regression
    probs = model.predict_proba([clean_text])[0]
    prob_legit = float(probs[0])
    prob_fraud = float(probs[1])

    is_spam = prob_fraud >= 0.5
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
        "prediction": "Potentially Fraudulent" if is_spam else "Legitimate",
        "fraud_probability": round(prob_fraud, 4),
        "confidence_pct": confidence_pct,
        "confidence_level": confidence_level,
        "is_spam": is_spam,
        "calibrated": True,
        "status_message": "Prediction generated using trained TF-IDF + Logistic Regression model."
    }


def main():
    parser = argparse.ArgumentParser(description="Train text-classification model on Scam/Spam India Dataset.")
    parser.add_argument("--data", type=str, help="Path to single merged dataset CSV file.")
    parser.add_argument("--data1", type=str, help="Path to data1.csv.")
    parser.add_argument("--data2", type=str, help="Path to data2.csv.")
    parser.add_argument("--output", type=str, default=str(DEFAULT_MODEL_PATH), help="Path to save trained joblib model.")
    args = parser.parse_args()

    files, desc = find_dataset_files(args.data, args.data1, args.data2)

    if not files:
        print_dataset_missing_error()
        sys.exit(1)

    print(f"[*] {desc}")
    try:
        df = load_and_validate_dataset(files)
        pipeline, metrics = train_and_evaluate(df)
        out_path = Path(args.output)
        meta_path = out_path.parent / "model_metadata.json"
        save_model(pipeline, metrics, model_path=out_path, metadata_path=meta_path)
    except Exception as e:
        print(f"\n[ERROR] Training failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
