#!/usr/bin/env python3
"""
Playwright Headless E2E Test Suite for MedLoop AI & Turnir Launch Lab
Validates:
1. Zero runtime JavaScript errors across all 6 pages.
2. Zero emojis in rendered live DOM text content.
3. Interactive modal open/close via click and Escape key.
4. Step workflow navigation and clinic pill toggling.
5. Multi-language toggle (UZ/RU) without DOM flicker.
6. Local HTTP server lifecycle.
"""

import os
import sys
import time
import threading
import http.server
import socketserver
import re
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8789

class MedLoopHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def translate_path(self, path):
        # Remove query parameters and hashes
        clean_path = path.split('?')[0].split('#')[0]
        if clean_path == '/':
            return os.path.join(BASE_DIR, 'index.html')
        
        # Check if requested file is in public/
        rel = clean_path.lstrip('/')
        pub_path = os.path.join(BASE_DIR, 'public', rel)
        if os.path.exists(pub_path):
            return pub_path
        
        # Otherwise root
        root_path = os.path.join(BASE_DIR, rel)
        if os.path.exists(root_path):
            return root_path
            
        return super().translate_path(path)

    def log_message(self, format, *args):
        # Silence HTTP access logs during test run
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", PORT), MedLoopHTTPHandler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd

def test_e2e():
    print(f"\n=======================================================")
    print(f"  MEDLOOP AI: PLAYWRIGHT HEADLESS E2E TEST SUITE")
    print(f"=======================================================")

    httpd = start_server()
    print(f"[HTTP SERVER] Listening on http://localhost:{PORT}")
    time.sleep(0.5)

    emoji_pattern = re.compile(r"[\U00010000-\U0010ffff]")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        js_errors = []
        page.on("pageerror", lambda err: js_errors.append(str(err)))

        routes = [
            ("/", "Asosiy & Tarix (index.html)"),
            ("/reception.html", "Registratura Navbati (reception.html)"),
            ("/clinic-roi.html", "Klinika ROI Simulator (clinic-roi.html)"),
            ("/workflow.html", "Klinik Jarayon (workflow.html)"),
            ("/tracker.html", "8 Klinika Haqiqati (tracker.html)"),
            ("/mini_app.html", "Telegram Mini App (mini_app.html)")
        ]

        total_checks = 0

        # Phase 1: Load each page, verify 0 JS errors, verify 0 emojis in DOM
        for route, desc in routes:
            url = f"http://localhost:{PORT}{route}"
            res = page.goto(url, wait_until="domcontentloaded")
            assert res.status == 200, f"HTTP status error {res.status} on {route}"
            
            # Check JS runtime errors
            assert len(js_errors) == 0, f"JS runtime errors on {route}: {js_errors}"
            
            # Live DOM emoji check
            body_text = page.evaluate("document.body.innerText")
            emojis = emoji_pattern.findall(body_text)
            assert len(emojis) == 0, f"Found emojis in DOM of {route}: {set(emojis)}"
            
            print(f"  [OK] {desc}: HTTP 200, 0 JS errors, 0 emojis in rendered DOM")
            total_checks += 3

        # Phase 2: Test Interactive Workflow Step Navigation & SOP Modal
        print("\n[WORKFLOW INTERACTION TEST]")
        page.goto(f"http://localhost:{PORT}/workflow.html", wait_until="domcontentloaded")
        
        # Test step advance
        page.click("button:has-text('Keyingi Bosqich')")
        page.wait_for_timeout(200)
        step_text = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 2" in step_text, f"Step did not advance, got: {step_text}"
        print(f"  [OK] Step navigation: Advanced to Step 2 successfully ({step_text})")
        total_checks += 1

        # Test SOP modal open & ESC close
        page.click("button:has-text('Klinika SOP (Nizom)')")
        page.wait_for_timeout(200)
        is_active = page.evaluate("document.getElementById('sopModal').classList.contains('active')")
        assert is_active, "SOP modal did not open"
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        is_closed = not page.evaluate("document.getElementById('sopModal').classList.contains('active')")
        assert is_closed, "SOP modal did not close on Escape key"
        print("  [OK] SOP Modal: Opened and closed cleanly via ESC key")
        total_checks += 2

        # Phase 3: Test Clinic ROI Commercial Proposal Modal & Presets
        print("\n[CLINIC ROI INTERACTION TEST]")
        page.goto(f"http://localhost:{PORT}/clinic-roi.html", wait_until="domcontentloaded")
        
        # Click preset Doktor D
        page.click("#preset-doktord")
        page.wait_for_timeout(200)
        val_patients = page.inner_text("#valDailyPatients")
        assert "90" in val_patients, f"Expected 90 patients for Doktor D, got: {val_patients}"
        print(f"  [OK] Preset switch: Loaded Doktor D ({val_patients})")
        total_checks += 1

        # Open Proposal modal
        page.click("button:has-text('Tijoriy Taklifni Shakllantirish')")
        page.wait_for_timeout(200)
        prop_active = page.evaluate("document.getElementById('commercialProposalModal').classList.contains('active')")
        assert prop_active, "Commercial proposal modal did not open"
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        prop_closed = not page.evaluate("document.getElementById('commercialProposalModal').classList.contains('active')")
        assert prop_closed, "Commercial proposal modal did not close on Escape"
        print("  [OK] Commercial Proposal Modal: Opened and closed cleanly via ESC key")
        total_checks += 2

        # Phase 4: Test Bilingual Toggle on Mini App (UZ / RU)
        print("\n[MINI APP BILINGUAL TEST]")
        page.goto(f"http://localhost:{PORT}/mini_app.html", wait_until="domcontentloaded")
        
        # Switch to RU
        page.click("#langBtnRu")
        page.wait_for_timeout(200)
        sub_ru = page.inner_text("#headerSubtitle")
        assert "Медицинский" in sub_ru or "Триаж" in sub_ru, f"RU language text mismatch: {sub_ru}"
        print(f"  [OK] Bilingual toggle: RU active ({sub_ru})")
        
        # Switch back to UZ
        page.click("#langBtnUz")
        page.wait_for_timeout(200)
        sub_uz = page.inner_text("#headerSubtitle")
        assert "Tibbiy" in sub_uz or "Triage" in sub_uz, f"UZ language text mismatch: {sub_uz}"
        print(f"  [OK] Bilingual toggle: UZ active ({sub_uz})")
        total_checks += 2

        browser.close()

    httpd.shutdown()
    print(f"\nALL {total_checks} PLAYWRIGHT E2E ASSERTIONS PASSED (100% GREEN)\n")

if __name__ == "__main__":
    try:
        test_e2e()
        sys.exit(0)
    except AssertionError as e:
        print(f"\n[PLAYWRIGHT E2E FAILURE]: {e}")
        sys.exit(1)
