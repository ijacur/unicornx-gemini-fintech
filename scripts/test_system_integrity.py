#!/usr/bin/env python3
"""
MedLoop Platform & Turnir Launch Lab: System Integrity & Quality Gate
Verifies:
1. Zero emojis in all production HTML and bot files.
2. 60-30-10 Acid Palette compliance across all templates.
3. Presence and validity of telemetry benchmark.json.
4. Deliverable document integrity (PDF/DOCX contracts).
"""

import os
import re
import json
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TURNIR_DIR = BASE_DIR
MEDLOOP_DIR = "/Users/jasur/Desktop/MedLoop/medloop_platform"

def check_emojis():
    print("[1/6] Checking Zero-Emoji Rule...")
    files_to_check = [
        os.path.join(TURNIR_DIR, "index.html"),
        os.path.join(TURNIR_DIR, "public", "reception.html"),
        os.path.join(TURNIR_DIR, "public", "clinic-roi.html"),
        os.path.join(TURNIR_DIR, "public", "workflow.html"),
        os.path.join(TURNIR_DIR, "public", "tracker.html"),
        os.path.join(TURNIR_DIR, "public", "mini_app.html"),
        os.path.join(TURNIR_DIR, "public", "medloop.html"),
        os.path.join(MEDLOOP_DIR, "bot", "handlers.py"),
        os.path.join(MEDLOOP_DIR, "bot", "keyboards.py"),
        os.path.join(MEDLOOP_DIR, "engine", "summarizer.py")
    ]
    # Include all React & TypeScript sources in src/
    src_dir = os.path.join(TURNIR_DIR, "src")
    if os.path.exists(src_dir):
        for root, dirs, files in os.walk(src_dir):
            for f in sorted(files):
                if f.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                    files_to_check.append(os.path.join(root, f))
    emoji_pattern = re.compile(r"[\U00010000-\U0010ffff]")
    violations = 0
    for path in files_to_check:
        if not os.path.exists(path):
            print(f"  [WARN] File not found: {path}")
            continue
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        emojis = emoji_pattern.findall(content)
        if emojis:
            print(f"  [FAIL] {os.path.basename(path)} contains {len(emojis)} emojis: {set(emojis)}")
            violations += 1
        else:
            print(f"  [OK] {os.path.basename(path)}: 0 emojis")
    assert violations == 0, f"Found {violations} files violating Zero-Emoji rule"

def check_acid_palette():
    print("[2/5] Checking 60-30-10 Palette tokens...")
    tokens = ["--bg-canvas", "--accent-acid", "#C6F432"]
    for fname in ["index.html", "public/reception.html", "public/mini_app.html"]:
        path = os.path.join(TURNIR_DIR, fname)
        with open(path, "r", encoding="utf-8") as f:
            c = f.read()
        for token in tokens:
            assert token in c, f"{fname} missing {token}"
        print(f"  [OK] {fname}: Palette validated")

def check_benchmark_telemetry():
    print("[3/5] Validating benchmark.json telemetry...")
    bm_path = os.path.join(TURNIR_DIR, "public", "benchmark.json")
    assert os.path.exists(bm_path), "benchmark.json missing"
    with open(bm_path) as f:
        data = json.load(f)
    assert data.get("total_runs") >= 100
    assert data.get("accuracy_pct") == 100.0
    assert "avg_latency_ms" in data
    print(f"  [OK] Telemetry validated: {data['total_runs']} runs, {data['avg_latency_ms']}ms latency, {data['accuracy_pct']}% accuracy")

def check_contracts():
    print("[4/6] Checking legal contracts & deliverables...")
    contracts = ["MedLoop_Agreement.pdf", "loi.pdf"]
    for c in contracts:
        path = os.path.join(TURNIR_DIR, "public", c)
        assert os.path.exists(path), f"Contract {c} missing in public/"
        assert os.path.getsize(path) > 1000, f"Contract {c} is too small"
        print(f"  [OK] {c} verified ({os.path.getsize(path):,} bytes)")

def check_build():
    print("[5/6] Checking dist build artifacts...")
    dist_index = os.path.join(TURNIR_DIR, "dist", "index.html")
    assert os.path.exists(dist_index), "dist/index.html missing"
    print(f"  [OK] dist/index.html verified ({os.path.getsize(dist_index):,} bytes)")

def check_playwright_e2e():
    print("[6/6] Running Playwright Headless E2E Browser Suite...")
    from test_playwright_e2e import test_e2e
    test_e2e()
    print("  [OK] Playwright E2E browser interactions verified")

if __name__ == "__main__":
    try:
        check_emojis()
        check_acid_palette()
        check_benchmark_telemetry()
        check_contracts()
        check_build()
        check_playwright_e2e()
        print("\nALL 6 SYSTEM INTEGRITY & E2E CHECKS PASSED (100% GREEN)")
        sys.exit(0)
    except AssertionError as e:
        print(f"\n[INTEGRITY FAILURE]: {e}")
        sys.exit(1)
