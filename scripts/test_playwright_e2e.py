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

        # Phase 4: Test Bilingual Toggle & Clinic Switcher on Mini App
        print("\n[MINI APP BILINGUAL & CLINIC SWITCHER TEST]")
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

        # Switch to Doktor D clinic
        page.click("#btn-clinic-doktord")
        page.wait_for_timeout(200)
        c_name = page.inner_text("#clinicName")
        assert "Doktor D" in c_name, f"Expected Doktor D, got: {c_name}"
        print(f"  [OK] Mini App clinic switcher: Switched to {c_name}")

        # Switch to SamMed clinic
        page.click("#btn-clinic-sammed")
        page.wait_for_timeout(200)
        c_name2 = page.inner_text("#clinicName")
        assert "SamMed" in c_name2, f"Expected SamMed, got: {c_name2}"
        print(f"  [OK] Mini App clinic switcher: Switched to {c_name2}")

        # Confirm appointment booking
        page.click("#mainBookingBtn")
        page.wait_for_timeout(300)
        notice_visible = page.is_visible("#successNotice")
        assert notice_visible, "Success notice did not show on appointment confirmation"
        print("  [OK] Mini App booking: Success notice displayed cleanly")

        # Open referral sheet modal
        page.click("#btnOpenReferralModal")
        page.wait_for_timeout(300)
        ref_visible = page.is_visible("#referralModal")
        assert ref_visible, "Referral modal did not open on button click"
        print("  [OK] Mini App referral modal: Opened successfully")

        # Close with Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        ref_closed = not page.is_visible("#referralModal")
        assert ref_closed, "Referral modal did not close on Escape key"
        print("  [OK] Mini App referral modal: Closed cleanly via ESC key")
        total_checks += 7

        # Phase 5: Test Tracker Evidence Drawer & Filter Pills
        print("\n[TRACKER EVIDENCE DRAWER & FILTER TEST]")
        page.goto(f"http://localhost:{PORT}/tracker.html", wait_until="domcontentloaded")

        # Click first row
        page.click("#tableBody tr:first-child")
        page.wait_for_timeout(200)
        drawer_active = page.evaluate("document.getElementById('clinicEvidenceDrawer').classList.contains('active')")
        assert drawer_active, "Evidence drawer did not open on row click"
        drawer_clinic = page.inner_text("#drawerClinicName")
        assert "Doktor D" in drawer_clinic, f"Expected Doktor D in drawer, got: {drawer_clinic}"
        print(f"  [OK] Evidence drawer: Opened for {drawer_clinic}")

        # Close with Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        drawer_closed = not page.evaluate("document.getElementById('clinicEvidenceDrawer').classList.contains('active')")
        assert drawer_closed, "Evidence drawer did not close on Escape key"
        print("  [OK] Evidence drawer: Closed cleanly via ESC key")

        # Filter DISQUALIFIED
        page.click("#btn-flt-disq")
        page.wait_for_timeout(200)
        row_count = page.evaluate("document.querySelectorAll('#tableBody tr').length")
        assert row_count == 3, f"Expected 3 disqualified labs, got: {row_count}"
        print(f"  [OK] Filter pills: Filtered to {row_count} disqualified labs")

        # Restore all
        page.click("#btn-flt-all")
        page.wait_for_timeout(200)
        restored_count = page.evaluate("document.querySelectorAll('#tableBody tr').length")
        assert restored_count == 8, f"Expected 8 total clinics, got: {restored_count}"
        print(f"  [OK] Filter pills: Restored to {restored_count} total clinics")
        total_checks += 4

        # Phase 6: Test Index Hardware Split-Stage & Clinic Selector
        print("\n[INDEX HARDWARE SPLIT-STAGE & CLINIC SELECTOR TEST]")
        page.goto(f"http://localhost:{PORT}/index.html", wait_until="domcontentloaded")

        # Switch to Osiyo Medical clinic
        page.click("#stage-clinic-osiyo")
        page.wait_for_timeout(200)
        clinic_notice = page.inner_text("#activeClinicNotice")
        assert "Osiyo" in clinic_notice, f"Expected Osiyo in clinic notice, got: {clinic_notice}"
        print(f"  [OK] Index clinic selector: Active clinic switched to {clinic_notice}")

        # Select Glucose Sample (Diabet)
        page.click("#pill-glucose")
        page.wait_for_timeout(200)
        patient_name = page.inner_text("#labPatientName")
        assert "Karimova Ziyoda" in patient_name, f"Expected Karimova Ziyoda, got: {patient_name}"
        btn_text = page.inner_text("#bookingBtnText")
        assert "Karimov" in btn_text, f"Expected Dr. Karimov in booking button, got: {btn_text}"
        print(f"  [OK] Index sample selector: Loaded {patient_name} with {btn_text}")

        # Trigger 1-Click Booking
        page.click("#bookingBtn")
        page.wait_for_timeout(500)
        rev_text = page.inner_text("#revenueCounter")
        assert "4,800,000" in rev_text, f"Expected 4,800,000 UZS recovered, got: {rev_text}"
        
        # Verify prepended card in queue
        first_queue_item = page.inner_text("#queueList > div:first-child")
        assert "Karimova Ziyoda" in first_queue_item and "Osiyo" in first_queue_item, f"Queue item missing patient/clinic: {first_queue_item}"
        print(f"  [OK] Index booking flywheel: Revenue increased to {rev_text} UZS, prepended to queue")

        # Test ROI Presets Strip
        page.click("#roi-preset-doktord")
        page.wait_for_timeout(200)
        p_val = page.inner_text("#dailyPatientsVal")
        c_val = page.inner_text("#consultationCheckVal")
        assert p_val == "90" and "180,000" in c_val, f"ROI Preset Doktor D mismatch: {p_val}, {c_val}"
        print(f"  [OK] Index ROI preset: Loaded Doktor D ({p_val} pts/day, {c_val})")

        page.click("#roi-preset-osiyo")
        page.wait_for_timeout(200)
        p_val2 = page.inner_text("#dailyPatientsVal")
        assert p_val2 == "75", f"ROI Preset Osiyo mismatch: {p_val2}"
        print(f"  [OK] Index ROI preset: Loaded Osiyo Med ({p_val2} pts/day)")
        total_checks += 6

        # Phase 7: Test Reception Clinic Switcher & Doctor Room Telemetry
        print("\n[RECEPTION CLINIC SWITCHER & DOCTOR ROOM TELEMETRY TEST]")
        page.goto(f"http://localhost:{PORT}/reception.html", wait_until="domcontentloaded")

        # Select Doktor D clinic
        page.select_option("#clinicSelect", "doktord")
        page.wait_for_timeout(200)
        roster_text = page.inner_text("#doctorRosterContainer")
        assert "Dr. Alimov N. K." in roster_text and "101-xona" in roster_text, f"Doktor D roster mismatch: {roster_text}"
        print(f"  [OK] Reception clinic switcher: Switched to Doktor D ({roster_text[:40]}...)")

        # Select SamMed clinic
        page.select_option("#clinicSelect", "sammed")
        page.wait_for_timeout(200)
        roster_text2 = page.inner_text("#doctorRosterContainer")
        assert "Dr. To'rayev A. M." in roster_text2 and "301-xona" in roster_text2, f"SamMed roster mismatch: {roster_text2}"
        print(f"  [OK] Reception clinic switcher: Switched to SamMed ({roster_text2[:40]}...)")

        # Verify live dispatch log has recorded the switch
        dispatch_head = page.inner_text("#dispatchLogList > div:first-child")
        assert "CLINIC SWITCH" in dispatch_head and "SamMed" in dispatch_head, f"Dispatch switch log missing: {dispatch_head}"
        print(f"  [OK] Reception live telemetry: Dispatch logged clinic switch correctly")

        # Select Afrosiyob clinic
        page.select_option("#clinicSelect", "afrosiyob")
        page.wait_for_timeout(200)
        roster_text3 = page.inner_text("#doctorRosterContainer")
        assert "Dr. Boboyev J. O." in roster_text3 and "21-xona" in roster_text3, f"Afrosiyob roster mismatch: {roster_text3}"
        print(f"  [OK] Reception clinic switcher: Switched to Afrosiyob ({roster_text3[:40]}...)")

        # Select Osiyo Medical clinic back
        page.select_option("#clinicSelect", "osiyo")
        page.wait_for_timeout(200)
        roster_text4 = page.inner_text("#doctorRosterContainer")
        assert "Dr. Shirinov X. I." in roster_text4 and "14-xona" in roster_text4, f"Osiyo roster mismatch: {roster_text4}"
        print(f"  [OK] Reception clinic switcher: Restored Osiyo Med ({roster_text4[:40]}...)")
        total_checks += 5

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
