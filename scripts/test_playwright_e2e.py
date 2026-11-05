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
            ("/mini_app.html", "Telegram Mini App (mini_app.html)"),
            ("/medloop.html", "MedLoop B2B Pitch (medloop.html)")
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
        
        # Test step advance to Step 2
        page.click("button:has-text('Keyingi Bosqich')")
        page.wait_for_timeout(200)
        step_text2 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 2" in step_text2, f"Step did not advance to 2, got: {step_text2}"
        print(f"  [OK] Step navigation: Advanced to Step 2 successfully ({step_text2})")

        # Test step advance to Step 3
        page.click("button:has-text('Keyingi Bosqich')")
        page.wait_for_timeout(200)
        step_text3 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 3" in step_text3, f"Step did not advance to 3, got: {step_text3}"
        print(f"  [OK] Step navigation: Advanced to Step 3 successfully ({step_text3})")

        # Test step advance to Step 4
        page.click("button:has-text('Keyingi Bosqich')")
        page.wait_for_timeout(200)
        step_text4 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 4" in step_text4, f"Step did not advance to 4, got: {step_text4}"
        print(f"  [OK] Step navigation: Advanced to Step 4 successfully ({step_text4})")

        # Test keyboard arrow navigation (ArrowLeft back to Step 3)
        page.keyboard.press("ArrowLeft")
        page.wait_for_timeout(200)
        step_text_back = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 3" in step_text_back, f"Expected back to Step 3 on ArrowLeft, got: {step_text_back}"
        print(f"  [OK] Keyboard Arrow navigation: ArrowLeft returned to Step 3 ({step_text_back})")

        # Test direct card click to Step 1
        page.click("#step-card-1")
        page.wait_for_timeout(200)
        step_text1 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 1" in step_text1, f"Step card click failed for Step 1, got: {step_text1}"
        print(f"  [OK] Step card click: Activated Step 1 successfully ({step_text1})")

        # Test keyboard ArrowRight navigation to Step 2
        page.keyboard.press("ArrowRight")
        page.wait_for_timeout(200)
        step_text_arrow = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 2" in step_text_arrow, f"ArrowRight did not advance to Step 2, got: {step_text_arrow}"
        print(f"  [OK] Keyboard Arrow navigation: ArrowRight advanced to Step 2 ({step_text_arrow})")

        # Test direct card click to Step 4
        page.click("#step-card-4")
        page.wait_for_timeout(200)
        step_text_card4 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 4" in step_text_card4, f"Step card click failed for Step 4, got: {step_text_card4}"
        print(f"  [OK] Step card click: Activated Step 4 successfully ({step_text_card4})")
        total_checks += 6

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

        # Test Step 1 clinic switching (Osiyo Medical Clinic)
        page.click("#step-card-1")
        page.wait_for_timeout(200)
        page.click("#btn-wf-clinic-osiyo")
        page.wait_for_timeout(200)
        qr_caption = page.inner_text("#wfQrCaption")
        loc_text = page.inner_text("#wfClinicLoc")
        assert "OSIYO" in qr_caption, f"Expected OSIYO in QR caption, got: {qr_caption}"
        assert "Dagbitskaya" in loc_text, f"Expected Dagbitskaya in location, got: {loc_text}"
        print(f"  [OK] Workflow clinic switch: Activated Osiyo Medical Clinic ({qr_caption}, {loc_text})")

        # Test Step 2 dynamic biomarker panels (HbA1c & Ferritin)
        page.click("#step-card-2")
        page.wait_for_timeout(200)
        page.click("#btn-wf-bio-hba1c")
        page.wait_for_timeout(200)
        report_hba1c = page.inner_text("#wfBioReportTitle")
        badge_hba1c = page.inner_text("#wfBioBadge")
        assert "Karimova Ziyoda" in report_hba1c, f"Expected Karimova Ziyoda in HbA1c panel, got: {report_hba1c}"
        assert "GLIKIK OG'ISH" in badge_hba1c, f"Expected GLIKIK OG'ISH badge, got: {badge_hba1c}"
        print(f"  [OK] Workflow biomarker switch: Activated HbA1c panel ({report_hba1c})")

        page.click("#btn-wf-bio-ferritin")
        page.wait_for_timeout(200)
        report_ferr = page.inner_text("#wfBioReportTitle")
        badge_ferr = page.inner_text("#wfBioBadge")
        assert "Usmonova Nilufar" in report_ferr, f"Expected Usmonova Nilufar in Ferritin panel, got: {report_ferr}"
        assert "TEMIR TANQISLIGI" in badge_ferr, f"Expected TEMIR TANQISLIGI badge, got: {badge_ferr}"
        print(f"  [OK] Workflow biomarker switch: Activated Ferritin panel ({report_ferr})")

        # Test Step 3 dynamic clinical triage note with active Ferritin
        page.click("#step-card-3")
        page.wait_for_timeout(200)
        step3_doctor = page.inner_text("#wfStep3Doctor")
        step3_rebook_href = page.get_attribute("#btn-wf-step3-rebook", "href")
        assert "Usmonov" in step3_doctor, f"Expected Dr. Usmonov for Ferritin, got: {step3_doctor}"
        assert "/reception.html" in step3_rebook_href, f"Expected /reception.html link, got: {step3_rebook_href}"
        print(f"  [OK] Workflow clinical triage note: Rendered Dr. Usmonov rebooking link ({step3_doctor} -> {step3_rebook_href})")

        # Test Top Nav Agreement Modal open & ESC close
        page.click("#navWorkflowAgreementBtn")
        page.wait_for_timeout(300)
        doc_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert doc_modal_display == "flex", f"Expected docPreviewModal to be flex, got: {doc_modal_display}"
        iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in iframe_src, f"Expected MedLoop_Agreement.pdf in iframe, got: {iframe_src}"
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        doc_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert doc_modal_after_esc == "none", f"Expected docPreviewModal to be closed after ESC, got: {doc_modal_after_esc}"
        print("  [OK] Workflow Top Nav: Opened Founders Agreement modal and dismissed via ESC")

        # Test Workflow Top Nav LOI Modal open & ESC close
        page.click("#navWorkflowLoiBtn")
        page.wait_for_timeout(300)
        wf_loi_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_loi_modal_display == "flex", f"Expected docPreviewModal to be flex for LOI, got: {wf_loi_modal_display}"
        wf_loi_iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in wf_loi_iframe_src, f"Expected loi.pdf in iframe, got: {wf_loi_iframe_src}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        wf_loi_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_loi_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {wf_loi_after_esc}"
        print("  [OK] Workflow Top Nav: Opened 14-Day Pilot LOI modal and dismissed via ESC")

        # Test Workflow Bottom Banner LOI Button
        page.click("#btnWorkflowBottomLoi")
        page.wait_for_timeout(300)
        wf_bot_loi_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_bot_loi_display == "flex", f"Expected docPreviewModal to be flex from bottom LOI, got: {wf_bot_loi_display}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        wf_bot_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_bot_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {wf_bot_after_esc}"
        print("  [OK] Workflow Bottom Banner: Opened and dismissed 14-Day Pilot LOI modal cleanly via ESC")

        # Test Step 4 Room Telemetry & Doctor Dispatch
        page.click("#step-card-4")
        page.wait_for_timeout(200)
        page.click("#wf-room-104")
        page.wait_for_timeout(200)
        room_disp_status = page.inner_text("#wfRoomDispatchStatus")
        assert "104-xona tanlandi" in room_disp_status, f"Expected 104-xona in status, got: {room_disp_status}"
        print(f"  [OK] Workflow room dispatch: Switched to 104-xona ({room_disp_status})")

        # Test Workflow Deliverable Dock Agreement Card open & ESC close
        page.click("#dockAgreementBtn")
        page.wait_for_timeout(300)
        wf_dock_agr_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_dock_agr_display == "flex", f"Expected docPreviewModal to be flex from dock agreement, got: {wf_dock_agr_display}"
        wf_dock_agr_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in wf_dock_agr_src, f"Expected MedLoop_Agreement.pdf in iframe, got: {wf_dock_agr_src}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        wf_dock_agr_after = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_dock_agr_after == "none", f"Expected docPreviewModal to close on Escape, got: {wf_dock_agr_after}"
        print("  [OK] Workflow Deliverable Dock: Opened and closed Founders Agreement modal cleanly via ESC")

        # Test Workflow Deliverable Dock LOI Card open & ESC close
        page.click("#dockLoiBtn")
        page.wait_for_timeout(300)
        wf_dock_loi_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_dock_loi_display == "flex", f"Expected docPreviewModal to be flex from dock LOI, got: {wf_dock_loi_display}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        wf_dock_loi_after = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert wf_dock_loi_after == "none", f"Expected docPreviewModal to close on Escape, got: {wf_dock_loi_after}"
        print("  [OK] Workflow Deliverable Dock: Opened and closed 14-Day Pilot LOI modal cleanly via ESC")

        # Test Workflow Deliverable Dock internal route links
        wf_dock_links = [
            ("#workflow-card-reception", "/reception.html"),
            ("#workflow-card-tracker", "/tracker.html"),
            ("#workflow-card-miniapp", "/mini_app.html"),
            ("#workflow-card-roi", "/clinic-roi.html"),
            ("#workflow-card-pitch", "/medloop.html"),
            ("#workflow-card-index", "/index.html")
        ]
        for sel, exp_href in wf_dock_links:
            actual_href = page.get_attribute(sel, "href")
            assert exp_href in actual_href, f"Expected {exp_href} in {sel}, got: {actual_href}"
        print("  [OK] Workflow Deliverable Dock: All 6 internal sub-page links validated (/reception.html, /tracker.html, /mini_app.html, /clinic-roi.html, /medloop.html, /index.html)")

        # Test Workflow Keyboard Navigation (Keys '1' and '4')
        page.keyboard.press("1")
        page.wait_for_timeout(200)
        kb_step1 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 1" in kb_step1, f"Expected BOSQICH 1 on key '1', got: {kb_step1}"

        page.keyboard.press("4")
        page.wait_for_timeout(200)
        kb_step4 = page.inner_text("#currentStepIndicator")
        assert "BOSQICH 4" in kb_step4, f"Expected BOSQICH 4 on key '4', got: {kb_step4}"
        print(f"  [OK] Workflow keyboard navigation: Keys '1' and '4' loaded respective steps ({kb_step1} -> {kb_step4})")
        total_checks += 17

        # Phase 3: Test Clinic ROI Commercial Proposal Modal & Presets
        print("\n[CLINIC ROI INTERACTION TEST]")
        page.goto(f"http://localhost:{PORT}/clinic-roi.html", wait_until="domcontentloaded")
        
        # Click preset Doktor D
        page.click("#preset-doktord")
        page.wait_for_timeout(200)
        val_patients = page.inner_text("#valDailyPatients")
        assert "90" in val_patients, f"Expected 90 patients for Doktor D, got: {val_patients}"
        print(f"  [OK] Preset switch: Loaded Doktor D ({val_patients})")

        # Click preset Afrosiyob
        page.click("#preset-afrosiyob")
        page.wait_for_timeout(200)
        dossier_afro = page.inner_text("#dossierName")
        assert "Afrosiyob" in dossier_afro, f"Expected Afrosiyob in dossier, got: {dossier_afro}"
        print(f"  [OK] Preset switch: Loaded Afrosiyob ({dossier_afro})")

        # Click preset SamMed
        page.click("#preset-sammed")
        page.wait_for_timeout(200)
        dossier_sam = page.inner_text("#dossierName")
        assert "SamMed" in dossier_sam, f"Expected SamMed in dossier, got: {dossier_sam}"
        print(f"  [OK] Preset switch: Loaded SamMed ({dossier_sam})")

        # Click preset Osiyo Medical
        page.click("#preset-osiyo")
        page.wait_for_timeout(200)
        dossier_osiyo = page.inner_text("#dossierName")
        assert "Osiyo Medical" in dossier_osiyo, f"Expected Osiyo Medical in dossier, got: {dossier_osiyo}"
        print(f"  [OK] Preset switch: Loaded Osiyo Medical ({dossier_osiyo})")

        # Verify dynamic SVG Bar Chart has 3 rendered rect bars
        rect_count = page.evaluate("document.querySelectorAll('#chartBars rect').length")
        assert rect_count == 3, f"Expected 3 SVG chart bars, got: {rect_count}"
        print("  [OK] Dynamic SVG Bar Chart: 3 financial telemetry bars rendered cleanly")

        # Test Sliders live adjustment (Daily, Drop-off, Check)
        page.evaluate("() => { const s = document.getElementById('sliderDaily'); s.value = 140; s.dispatchEvent(new Event('input')); const sd = document.getElementById('sliderDropOff'); sd.value = 55; sd.dispatchEvent(new Event('input')); const sc = document.getElementById('sliderCheck'); sc.value = 220000; sc.dispatchEvent(new Event('input')); }")
        page.wait_for_timeout(200)
        updated_daily = page.inner_text("#valDailyPatients")
        updated_drop = page.inner_text("#valDropOff")
        updated_check = page.inner_text("#valCheck")
        assert "140" in updated_daily, f"Expected 140 in valDailyPatients, got: {updated_daily}"
        assert "55" in updated_drop, f"Expected 55 in valDropOff, got: {updated_drop}"
        assert "220,000" in updated_check, f"Expected 220,000 in valCheck, got: {updated_check}"
        print(f"  [OK] Sliders live interaction: Updated daily to {updated_daily}, drop-off to {updated_drop}, check to {updated_check}")

        # Test Header KPI Telemetry
        header_roi = page.inner_text("#headerRoi")
        assert "x" in header_roi, f"Expected 'x' in headerRoi, got: {header_roi}"
        print(f"  [OK] Financial KPI telemetry: Header ROI multiple validated ({header_roi})")
        total_checks += 9

        # Open Proposal modal & verify reference metadata
        page.click("button:has-text('Tijoriy Taklifni Shakllantirish')")
        page.wait_for_timeout(200)
        prop_active = page.evaluate("document.getElementById('commercialProposalModal').classList.contains('active')")
        assert prop_active, "Commercial proposal modal did not open"
        prop_ref = page.inner_text("#propRef")
        assert "ML-TAK-" in prop_ref, f"Expected ML-TAK- in propRef, got: {prop_ref}"
        print(f"  [OK] Commercial Proposal Modal: Opened with reference {prop_ref}")
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        prop_closed = not page.evaluate("document.getElementById('commercialProposalModal').classList.contains('active')")
        assert prop_closed, "Commercial proposal modal did not close on Escape"
        print("  [OK] Commercial Proposal Modal: Dismissed cleanly via ESC key")

        # Test Top Nav Founders Agreement Modal open & ESC close
        page.click("#navClinicRoiAgreementBtn")
        page.wait_for_timeout(300)
        roi_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert roi_modal_display == "flex", f"Expected docPreviewModal to be flex in clinic-roi, got: {roi_modal_display}"
        iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in iframe_src, f"Expected MedLoop_Agreement.pdf in iframe, got: {iframe_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        roi_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert roi_modal_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {roi_modal_after_esc}"
        print("  [OK] Clinic ROI Top Nav: Opened Founders Agreement modal and dismissed via ESC")

        # Test Top Nav 14-Day Pilot LOI Modal open & ESC close
        page.click("#navClinicRoiLoiBtn")
        page.wait_for_timeout(300)
        loi_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert loi_modal_display == "flex", f"Expected docPreviewModal to be flex for LOI, got: {loi_modal_display}"
        iframe_loi_src = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in iframe_loi_src, f"Expected loi.pdf in iframe, got: {iframe_loi_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        loi_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert loi_modal_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {loi_modal_after_esc}"
        print("  [OK] Clinic ROI Top Nav: Opened 14-Day Pilot LOI modal and dismissed via ESC")

        # Test Live KPI Cards & Telegram Outreach Link
        kpi_scans = page.inner_text("#kpiScans")
        kpi_net = page.inner_text("#kpiNetProfit")
        assert "4,200" in kpi_scans, f"Expected 4,200 scans for 140 pts/day, got: {kpi_scans}"
        assert "+" in kpi_net, f"Expected positive surplus in kpiNetProfit, got: {kpi_net}"
        tg_outreach_href = page.get_attribute("#btnTelegramOutreach", "href")
        assert "https://t.me/jasurceo?text=" in tg_outreach_href, f"Unexpected outreach link: {tg_outreach_href}"
        print(f"  [OK] Clinic ROI live metrics: Scans ({kpi_scans}), Surplus ({kpi_net}), Telegram Outreach Link verified")
        total_checks += 8

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

        # Switch to Afrosiyob clinic
        page.click("#btn-clinic-afrosiyob")
        page.wait_for_timeout(200)
        c_name_af = page.inner_text("#clinicName")
        assert "Afrosiyob" in c_name_af, f"Expected Afrosiyob, got: {c_name_af}"
        doc_af = page.inner_text("#doctorFullName")
        assert "Boboyev" in doc_af, f"Expected Dr. Boboyev, got: {doc_af}"
        print(f"  [OK] Mini App clinic switcher: Switched to {c_name_af} ({doc_af})")

        # Switch to Osiyo Medical clinic
        page.click("#btn-clinic-osiyo")
        page.wait_for_timeout(200)
        c_name_os = page.inner_text("#clinicName")
        assert "Osiyo Medical" in c_name_os, f"Expected Osiyo Medical, got: {c_name_os}"
        doc_os = page.inner_text("#doctorFullName")
        assert "Shirinov" in doc_os, f"Expected Dr. Shirinov, got: {doc_os}"
        print(f"  [OK] Mini App clinic switcher: Switched to {c_name_os} ({doc_os})")

        # Test Sample switching: Liver, Glucose, Anemia
        page.click("#btn-liver")
        page.wait_for_timeout(200)
        p_name_l = page.inner_text("#cardPatientName")
        assert "Xoliqov Bobur" in p_name_l, f"Expected Xoliqov Bobur on liver, got: {p_name_l}"
        print(f"  [OK] Mini App sample switcher: Liver panel loaded ({p_name_l})")

        page.click("#btn-glucose")
        page.wait_for_timeout(200)
        p_name_g = page.inner_text("#cardPatientName")
        assert "Karimova Ziyoda" in p_name_g, f"Expected Karimova Ziyoda on glucose, got: {p_name_g}"
        print(f"  [OK] Mini App sample switcher: Glucose panel loaded ({p_name_g})")

        page.click("#btn-anemia")
        page.wait_for_timeout(200)
        p_name_a = page.inner_text("#cardPatientName")
        assert "Usmonova Nilufar" in p_name_a, f"Expected Usmonova Nilufar on anemia, got: {p_name_a}"
        print(f"  [OK] Mini App sample switcher: Anemia panel loaded ({p_name_a})")

        # Test simulated OCR camera upload
        sample_file = os.path.join(BASE_DIR, "public", "samples", "sample_1_liver_intermed.pdf")
        page.set_input_files("#labCameraInput", sample_file)
        page.wait_for_timeout(300)
        upload_banner = page.is_visible("#uploadPreviewBanner")
        assert upload_banner, "Upload preview banner not visible after camera upload"
        banner_title = page.inner_text("#uploadedFileTitle")
        assert "sample_1_liver_intermed.pdf" in banner_title, f"Unexpected upload title: {banner_title}"
        ocr_patient = page.inner_text("#cardPatientName")
        assert "Bemor (Kameradan Yuklangan)" in ocr_patient, f"Unexpected OCR patient name: {ocr_patient}"
        print(f"  [OK] Mini App OCR camera scan: Processed {banner_title} -> {ocr_patient}")

        # Reset back to standard sample preset
        page.click("#btnResetUpload")
        page.wait_for_timeout(250)
        upload_hidden = not page.is_visible("#uploadPreviewBanner")
        assert upload_hidden, "Upload preview banner still visible after reset"
        restored_patient = page.inner_text("#cardPatientName")
        assert "Xoliqov Bobur" in restored_patient, f"Expected Xoliqov Bobur, got: {restored_patient}"
        print(f"  [OK] Mini App reset: Returned to preset state ({restored_patient})")

        # Test Slot Selection
        page.click(".slot-pill:nth-child(2)")
        page.wait_for_timeout(200)
        slot_text = page.inner_text(".slot-pill.active")
        assert len(slot_text) > 0, "No active slot selected"
        print(f"  [OK] Mini App slot selector: Active appointment slot chosen ({slot_text})")

        # Confirm appointment booking
        page.click("#mainBookingBtn")
        page.wait_for_timeout(300)
        notice_visible = page.is_visible("#successNotice")
        assert notice_visible, "Success notice did not show on appointment confirmation"
        succ_title = page.inner_text("#successNoticeTitle")
        assert "TASDIQLANDI" in succ_title, f"Expected TASDIQLANDI in title, got: {succ_title}"
        succ_detail = page.inner_text("#successDetail")
        assert "Registratura" in succ_detail, f"Expected Registratura in detail, got: {succ_detail}"
        print(f"  [OK] Mini App booking: Success notice displayed cleanly ({succ_title})")

        # Open referral sheet modal
        page.click("#btnOpenReferralModal")
        page.wait_for_timeout(300)
        ref_visible = page.is_visible("#referralModal")
        assert ref_visible, "Referral modal did not open on button click"
        print("  [OK] Mini App referral modal: Opened successfully")

        # Close with Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(350)
        ref_closed = not page.is_visible("#referralModal")
        assert ref_closed, "Referral modal did not close on Escape key"
        print("  [OK] Mini App referral modal: Closed cleanly via ESC key")

        # Test Mini App Legal Deliverables Dock: Founders Agreement & 14-Day LOI modals
        page.click("#miniAppAgreementBtn")
        page.wait_for_timeout(300)
        ma_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert ma_modal_display == "flex", f"Expected docPreviewModal to be flex in mini app, got: {ma_modal_display}"
        ma_iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in ma_iframe_src, f"Expected MedLoop_Agreement.pdf in iframe, got: {ma_iframe_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        ma_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert ma_modal_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {ma_modal_after_esc}"
        print("  [OK] Mini App Dock: Opened Founders Agreement modal and dismissed via ESC")

        page.click("#miniAppLoiBtn")
        page.wait_for_timeout(300)
        ma_loi_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert ma_loi_modal_display == "flex", f"Expected docPreviewModal to be flex for LOI, got: {ma_loi_modal_display}"
        ma_loi_iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in ma_loi_iframe_src, f"Expected loi.pdf in iframe, got: {ma_loi_iframe_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        ma_loi_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert ma_loi_modal_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {ma_loi_modal_after_esc}"
        print("  [OK] Mini App Dock: Opened 14-Day Pilot LOI modal and dismissed via ESC")

        # Open and test Digital Appointment Ticket (MedLoop Pass) Modal
        page.click("#btnOpenTicketModal")
        page.wait_for_timeout(300)
        ticket_visible = page.is_visible("#ticketModal")
        assert ticket_visible, "Ticket modal did not open on button click"
        ticket_patient = page.inner_text("#ticketPatientName")
        ticket_doctor = page.inner_text("#ticketDoctorName")
        ticket_slot = page.inner_text("#ticketSlot")
        assert "Xoliqov Bobur" in ticket_patient, f"Expected Xoliqov Bobur in ticket, got: {ticket_patient}"
        assert "Shirinov" in ticket_doctor, f"Expected Dr. Shirinov in ticket, got: {ticket_doctor}"
        assert len(ticket_slot) > 0, "Expected non-empty ticket slot"
        print(f"  [OK] Mini App digital pass: Ticket modal opened with {ticket_patient} • {ticket_doctor} ({ticket_slot})")

        # Close ticket modal with Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        ticket_closed = not page.is_visible("#ticketModal")
        assert ticket_closed, "Ticket modal did not close on Escape key"
        print("  [OK] Mini App digital pass: Closed cleanly via ESC key")

        # Test footer pitch route link
        footer_pitch_href = page.get_attribute("#mini-app-link-pitch", "href")
        assert "/medloop.html" in footer_pitch_href, f"Expected /medloop.html in footer pitch link, got: {footer_pitch_href}"
        print(f"  [OK] Mini App footer link: Verified pitch link ({footer_pitch_href})")
        total_checks += 27

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
        drawer_bleed = page.inner_text("#drawerBleed")
        assert len(drawer_bleed) > 0, "Drawer bleed metric missing"
        loi_btn_vis = page.is_visible("#drawerLoiBtn")
        assert loi_btn_vis, "Drawer LOI button missing for PASS clinic"
        print(f"  [OK] Evidence drawer: Opened for {drawer_clinic} (Bleed: {drawer_bleed})")

        # Click drawer LOI button to open document preview modal from drawer
        page.click("#drawerLoiBtn")
        page.wait_for_timeout(250)
        doc_from_drawer = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert doc_from_drawer, "Document modal did not open from drawer LOI button"
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        doc_closed_dr = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert doc_closed_dr, "Document modal did not close on ESC key"
        print("  [OK] Evidence drawer: Opened and dismissed 14-day LOI preview cleanly via drawer button")

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

        # Filter PASS / Validated clinics
        page.click("#btn-flt-pass")
        page.wait_for_timeout(200)
        pass_count = page.evaluate("document.querySelectorAll('#tableBody tr').length")
        assert pass_count == 5, f"Expected 5 validated clinics, got: {pass_count}"
        print(f"  [OK] Filter pills: Filtered to {pass_count} validated clinics (PASS)")

        # Live search test
        page.fill("#clinicSearch", "Zarmed")
        page.wait_for_timeout(200)
        search_count = page.evaluate("document.querySelectorAll('#tableBody tr').length")
        assert search_count == 1, f"Expected 1 clinic for 'Zarmed', got: {search_count}"
        matched_text = page.inner_text("#tableBody tr:first-child")
        assert "Zarmed" in matched_text, f"Expected Zarmed in search result row, got: {matched_text}"
        print("  [OK] Clinic search input: Filtered table correctly to Zarmed Pratiksha")

        # Clear search and reset filter
        page.fill("#clinicSearch", "")
        page.click("#btn-flt-all")
        page.wait_for_timeout(200)

        # Test CustDev Entry Modal open and Escape dismiss
        page.evaluate("openModal()")
        page.wait_for_timeout(200)
        modal_open = page.evaluate("document.getElementById('entryModal').style.display === 'flex'")
        assert modal_open, "Expected entryModal to be open"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        modal_closed = page.evaluate("document.getElementById('entryModal').style.display === 'none'")
        assert modal_closed, "Expected entryModal to be closed on Escape key"
        print("  [OK] CustDev entry modal: Opened and dismissed cleanly via ESC key")

        # Test Document Preview Modal open and Escape dismiss
        page.evaluate("previewDocument('MedLoop_Agreement.pdf', 'Taasis Shartnomasi')")
        page.wait_for_timeout(200)
        doc_open = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert doc_open, "Expected docPreviewModal to be open"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        doc_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert doc_closed, "Expected docPreviewModal to be closed on Escape key"
        print("  [OK] Document preview modal: Opened and dismissed cleanly via ESC key")

        # Test Telemetry Stats Metrics
        stat_loi = page.inner_text("#statLOI")
        assert "5 / 8" in stat_loi, f"Expected 5 / 8 LOI signed, got: {stat_loi}"
        stat_rate = page.inner_text("#statRate")
        assert "62.5%" in stat_rate or "87.5%" in stat_rate, f"Expected validation rate (62.5% or 87.5%), got: {stat_rate}"
        stat_pain = page.inner_text("#statPain")
        assert "4.6" in stat_pain, f"Expected 4.6 pain score, got: {stat_pain}"
        stat_total = page.inner_text("#statTotal")
        assert "8 ta" in stat_total, f"Expected 8 ta total clinics, got: {stat_total}"
        print(f"  [OK] CustDev tracker telemetry stats: Validated all 4 metrics ({stat_loi}, {stat_rate}, {stat_pain}, {stat_total})")

        # Test Tracker Top Nav Agreement Modal open & ESC close
        page.click("#navTrackerAgreementBtn")
        page.wait_for_timeout(300)
        tr_agr_open = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert tr_agr_open, "Tracker top nav agreement modal did not open"
        tr_agr_iframe = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in tr_agr_iframe, f"Expected MedLoop_Agreement.pdf, got: {tr_agr_iframe}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        tr_agr_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert tr_agr_closed, "Tracker top nav agreement modal did not close on Escape"
        print("  [OK] Tracker top nav: Opened and closed Founders Agreement modal cleanly via ESC key")

        # Test Tracker Top Nav LOI Modal open & ESC close
        page.click("#navTrackerLoiBtn")
        page.wait_for_timeout(300)
        tr_loi_open = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert tr_loi_open, "Tracker top nav LOI modal did not open"
        tr_loi_iframe = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in tr_loi_iframe, f"Expected loi.pdf, got: {tr_loi_iframe}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        tr_loi_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert tr_loi_closed, "Tracker top nav LOI modal did not close on Escape"
        print("  [OK] Tracker top nav: Opened and closed 14-Day Pilot LOI modal cleanly via ESC key")

        # Test Dynamic CustDev Ingestion via #btnNewInterview & #btnSaveCustDev
        page.click("#btnNewInterview")
        page.wait_for_timeout(250)
        page.fill("#mClinic", "Shifo Nur Med Samarqand")
        page.fill("#mContact", "Bosh Vrach Dr. Sobirov")
        page.click("#btnSaveCustDev")
        page.wait_for_timeout(250)
        post_ingest_rows = page.evaluate("document.querySelectorAll('#tableBody tr').length")
        new_row_text = page.inner_text("#tableBody")
        assert post_ingest_rows == 9 and "Shifo Nur Med" in new_row_text, f"Expected 9 rows and Shifo Nur Med, got {post_ingest_rows}"
        print("  [OK] Tracker dynamic ingestion: Ingested Shifo Nur Med Samarqand (9 rows total)")
        total_checks += 19

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
        page.wait_for_timeout(700)
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

        # Test Index ROI Sliders live input (Patients & Check)
        page.evaluate("() => { const sp = document.getElementById('sliderPatients'); sp.value = 110; sp.dispatchEvent(new Event('input')); const sc = document.getElementById('sliderCheck'); sc.value = 250000; sc.dispatchEvent(new Event('input')); }")
        page.wait_for_timeout(200)
        slider_p_val = page.inner_text("#dailyPatientsVal")
        slider_c_val = page.inner_text("#consultationCheckVal")
        assert slider_p_val == "110" and "250,000" in slider_c_val, f"Expected 110 and 250,000 UZS, got: {slider_p_val}, {slider_c_val}"
        print(f"  [OK] Index ROI sliders live interaction: Adjusted to {slider_p_val} pts/day and {slider_c_val}")

        # Test Deliverable Dock Preview Modal (MedLoop Agreement) via direct click & ESC key dismiss
        page.click("#dockAgreementBtn")
        page.wait_for_timeout(250)
        is_modal_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert is_modal_visible, "Document preview modal did not open on dockAgreementBtn click"
        iframe_agree_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in iframe_agree_src, f"Expected MedLoop_Agreement.pdf in iframe, got: {iframe_agree_src}"
        print("  [OK] Index deliverable dock: Opened MedLoop Agreement preview modal via #dockAgreementBtn click")
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        is_modal_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert is_modal_closed, "Document preview modal did not close on Escape key"
        print("  [OK] Index deliverable dock: Closed cleanly via ESC key")

        # Test Deliverable Dock Preview Modal (LOI Agreement) via direct click & ESC key dismiss
        page.click("#dockLoiBtn")
        page.wait_for_timeout(250)
        is_loi_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert is_loi_visible, "LOI preview modal did not open on dockLoiBtn click"
        iframe_loi_src = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in iframe_loi_src, f"Expected loi.pdf in iframe, got: {iframe_loi_src}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        is_loi_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert is_loi_closed, "LOI preview modal did not close on Escape key"
        print("  [OK] Index deliverable dock: Opened and dismissed 14-day LOI preview cleanly via #dockLoiBtn click")

        # Test Top Nav Agreement Button Click & ESC dismiss
        page.click("#navAgreementBtn")
        page.wait_for_timeout(200)
        nav_modal_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert nav_modal_visible, "Top nav agreement modal did not open on click"
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        nav_modal_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert nav_modal_closed, "Top nav agreement modal did not close on Escape key"
        print("  [OK] Index top nav: Opened and closed Founders Agreement modal cleanly via ESC key")

        # Test Top Nav LOI Button Click & ESC dismiss
        page.click("#navLoiBtn")
        page.wait_for_timeout(200)
        nav_loi_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert nav_loi_visible, "Top nav LOI modal did not open on click"
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        nav_loi_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert nav_loi_closed, "Top nav LOI modal did not close on Escape key"
        print("  [OK] Index top nav: Opened and closed 14-Day Pilot LOI modal cleanly via ESC key")

        # Test Deliverable Dock Sub-Page Routing Links (All 6 core routes)
        rec_href = page.get_attribute("#card-deliverable-reception", "href")
        assert rec_href == "/reception.html", f"Unexpected reception href: {rec_href}"
        trk_href = page.get_attribute("#card-deliverable-tracker", "href")
        assert trk_href == "/tracker.html", f"Unexpected tracker href: {trk_href}"
        mini_href = page.get_attribute("#card-deliverable-miniapp", "href")
        assert mini_href == "/mini_app.html", f"Unexpected mini_app href: {mini_href}"
        wf_href = page.get_attribute("#card-deliverable-workflow", "href")
        assert wf_href == "/workflow.html", f"Unexpected workflow href: {wf_href}"
        roi_href = page.get_attribute("#card-deliverable-roi", "href")
        assert roi_href == "/clinic-roi.html", f"Unexpected clinic-roi href: {roi_href}"
        pitch_href = page.get_attribute("#card-deliverable-pitch", "href")
        assert pitch_href == "/medloop.html", f"Unexpected medloop pitch href: {pitch_href}"
        print(f"  [OK] Index deliverable dock: All 6 sub-page links validated ({rec_href}, {trk_href}, {mini_href}, {wf_href}, {roi_href}, {pitch_href})")
        
        # Test 4D Hardware Keyboard Shortcut Navigation (Keys '1', '2', '3')
        page.keyboard.press("1")
        page.wait_for_timeout(200)
        p_name1 = page.inner_text("#labPatientName")
        assert "Xoliqov Bobur" in p_name1, f"Expected Xoliqov Bobur on key '1', got: {p_name1}"
        print(f"  [OK] Index keyboard navigation: Key '1' activated liver panel ({p_name1})")

        page.keyboard.press("2")
        page.wait_for_timeout(200)
        p_name2 = page.inner_text("#labPatientName")
        assert "Karimova Ziyoda" in p_name2, f"Expected Karimova Ziyoda on key '2', got: {p_name2}"
        print(f"  [OK] Index keyboard navigation: Key '2' activated glucose panel ({p_name2})")

        page.keyboard.press("3")
        page.wait_for_timeout(200)
        p_name3 = page.inner_text("#labPatientName")
        assert "Usmonova Nilufar" in p_name3, f"Expected Usmonova Nilufar on key '3', got: {p_name3}"
        print(f"  [OK] Index keyboard navigation: Key '3' activated anemia panel ({p_name3})")
        total_checks += 26

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

        # Test Simulated Patient Ingestion
        initial_queue_count = page.evaluate("patients.length")
        page.click("#btnSimulatePatient")
        page.wait_for_timeout(250)
        new_queue_count = page.evaluate("patients.length")
        assert new_queue_count == initial_queue_count + 1, f"Expected {initial_queue_count + 1} patients, got {new_queue_count}"
        print(f"  [OK] Reception patient simulation: Ingested new patient ({new_queue_count} in queue)")

        # Test Patient Confirmation Flywheel
        initial_confirmed = int(page.inner_text("#countConfirmed").strip())
        top_patient_id = page.evaluate("patients[0].id")
        page.evaluate(f"confirmPatient({top_patient_id})")
        page.wait_for_timeout(200)
        new_confirmed = int(page.inner_text("#countConfirmed").strip())
        assert new_confirmed == initial_confirmed + 1, f"Expected {initial_confirmed + 1} confirmed, got {new_confirmed}"
        print(f"  [OK] Reception confirmation flywheel: Confirmed patient {top_patient_id} (Total: {new_confirmed})")

        # Test Patient Detail Drawer via direct card click & Escape dismiss
        top_patient_name = page.evaluate("patients[0].name")
        page.click("#patientList > div.bento-card:first-child")
        page.wait_for_timeout(250)
        is_drawer_open = page.evaluate("document.getElementById('patientDrawer').style.right === '0px'")
        assert is_drawer_open, "Patient drawer did not open on card click"
        drawer_name = page.inner_text("#drawerPatientName")
        assert top_patient_name in drawer_name or len(drawer_name) > 3, f"Drawer patient name mismatch: {drawer_name}"
        drawer_doc = page.inner_text("#drawerDoctor")
        assert "Dr." in drawer_doc, f"Expected Dr. in drawerDoctor, got: {drawer_doc}"
        drawer_slot = page.inner_text("#drawerSlot")
        assert len(drawer_slot) > 2, f"Drawer slot missing: {drawer_slot}"
        
        # Test Confirm button state for already confirmed patient
        drawer_btn_text = page.inner_text("#drawerConfirmBtn")
        is_disabled = page.evaluate("document.getElementById('drawerConfirmBtn').disabled")
        assert is_disabled and "TASDIQLANGAN" in drawer_btn_text, f"Expected disabled TASDIQLANGAN button, got: {drawer_btn_text}"
        print(f"  [OK] Reception patient drawer: Real card click opened drawer ({drawer_name}, {drawer_doc}, {drawer_slot}) with confirmed state validated")

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        is_drawer_closed = page.evaluate("document.getElementById('patientDrawer').style.right !== '0px'")
        assert is_drawer_closed, "Patient drawer did not close on Escape key"
        print("  [OK] Reception patient drawer: Dismissed cleanly via ESC key")

        # Test Confirming an unconfirmed patient from Drawer
        unconf_id = page.evaluate("patients.find(p => p.status !== 'CONFIRMED').id")
        page.evaluate(f"openPatientDrawer({unconf_id})")
        page.wait_for_timeout(250)
        is_btn_enabled = not page.evaluate("document.getElementById('drawerConfirmBtn').disabled")
        assert is_btn_enabled, "Expected drawerConfirmBtn to be enabled for unconfirmed patient"
        pre_conf = int(page.inner_text("#countConfirmed").strip())
        page.click("#drawerConfirmBtn")
        page.wait_for_timeout(250)
        post_conf = int(page.inner_text("#countConfirmed").strip())
        assert post_conf == pre_conf + 1, f"Expected {pre_conf + 1} confirmed, got: {post_conf}"
        now_disabled = page.evaluate("document.getElementById('drawerConfirmBtn').disabled")
        assert now_disabled, "Expected drawerConfirmBtn to become disabled after confirmation"
        print(f"  [OK] Reception patient drawer: Successfully confirmed patient {unconf_id} from drawer (Total: {post_conf})")
        
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        is_drawer_closed2 = page.evaluate("document.getElementById('patientDrawer').style.right !== '0px'")
        assert is_drawer_closed2, "Patient drawer did not close on Escape key"

        # Test Referral Sheet Modal & Escape dismiss
        page.evaluate(f"printReferralSheet({top_patient_id})")
        page.wait_for_timeout(200)
        is_referral_open = page.evaluate("document.getElementById('referralModal').style.display === 'block'")
        assert is_referral_open, "Referral sheet modal did not open"
        print_patient = page.inner_text("#printPatientName")
        assert len(print_patient) > 2, f"Expected printPatientName, got: {print_patient}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(350)
        is_referral_closed = page.evaluate("document.getElementById('referralModal').style.display === 'none'")
        assert is_referral_closed, "Referral sheet modal did not close on Escape key"
        print(f"  [OK] Reception referral sheet modal: Opened for {print_patient} and dismissed cleanly via ESC key")

        # Test Queue Urgency Filter Pills (RED, YELLOW, ALL)
        page.click("#filter-red")
        page.wait_for_timeout(200)
        red_items = page.evaluate("document.querySelectorAll('#patientList .badge-urgent').length")
        assert red_items > 0, "Expected at least one URGENT RED patient in filtered queue"
        print(f"  [OK] Reception urgency filter: Filtered to {red_items} RED urgency patients")

        page.click("#filter-yellow")
        page.wait_for_timeout(200)
        yellow_items = page.evaluate("document.querySelectorAll('#patientList .badge-monochrome').length")
        assert yellow_items > 0, "Expected at least one YELLOW urgency patient in filtered queue"
        print(f"  [OK] Reception urgency filter: Filtered to {yellow_items} YELLOW urgency patients")

        page.click("#filter-all")
        page.wait_for_timeout(200)
        all_queue_count = page.evaluate("document.querySelectorAll('#patientList > div.bento-card').length")
        assert all_queue_count == page.evaluate("patients.length"), f"Expected {page.evaluate('patients.length')} total patients, got {all_queue_count}"
        print(f"  [OK] Reception urgency filter: Restored full queue ({all_queue_count} patients)")

        # Test Doctor Room Specialty Filter Pills (#filter-room-gepatolog, #filter-room-endokrinolog, #filter-room-terapevt, #filter-room-all)
        page.click("#filter-room-gepatolog")
        page.wait_for_timeout(200)
        gep_count = page.evaluate("document.querySelectorAll('#patientList > div.bento-card').length")
        assert gep_count >= 1, f"Expected at least 1 Gepatolog patient, got {gep_count}"
        print(f"  [OK] Reception room filter: Filtered to {gep_count} Gepatolog room patients")

        page.click("#filter-room-endokrinolog")
        page.wait_for_timeout(200)
        endo_count = page.evaluate("document.querySelectorAll('#patientList > div.bento-card').length")
        assert endo_count >= 1, f"Expected at least 1 Endokrinolog patient, got {endo_count}"
        print(f"  [OK] Reception room filter: Filtered to {endo_count} Endokrinolog room patients")

        page.click("#filter-room-terapevt")
        page.wait_for_timeout(200)
        tera_count = page.evaluate("document.querySelectorAll('#patientList > div.bento-card').length")
        assert tera_count >= 1, f"Expected at least 1 Terapevt patient, got {tera_count}"
        print(f"  [OK] Reception room filter: Filtered to {tera_count} Terapevt room patients")

        page.click("#filter-room-all")
        page.wait_for_timeout(200)
        restored_room_count = page.evaluate("document.querySelectorAll('#patientList > div.bento-card').length")
        assert restored_room_count == page.evaluate("patients.length"), f"Expected {page.evaluate('patients.length')} total patients after room reset, got {restored_room_count}"
        print(f"  [OK] Reception room filter: Restored all rooms ({restored_room_count} patients)")

        # Test Manual OCR Blank Intake Form
        page.fill("#manualName", "Hamidov Bobur")
        page.fill("#manualPhone", "+998 93 111 22 33")
        page.click("#sendBtn")
        page.wait_for_timeout(750)
        feedback_visible = page.evaluate("document.getElementById('manualFeedback').style.display === 'block'")
        assert feedback_visible, "Expected manualFeedback to be visible after OCR intake"
        first_patient_name = page.evaluate("patients[0].name")
        assert "Hamidov Bobur" in first_patient_name, f"Expected Hamidov Bobur as first patient, got: {first_patient_name}"
        print(f"  [OK] Reception manual OCR intake: Ingested {first_patient_name} to queue")

        # Test 1-Click Fast Real Sample Ingestion Pills (#btnSampleLiver, #btnSampleGlucose, #btnSampleAnemia)
        pre_sample_len = page.evaluate("patients.length")
        page.click("#btnSampleLiver")
        page.wait_for_timeout(200)
        assert page.evaluate("patients.length") == pre_sample_len + 1, "Expected queue to grow after liver sample"
        top_name_liver = page.evaluate("patients[0].name")
        assert "Bobur Xoliqov" in top_name_liver, f"Expected Bobur Xoliqov from liver sample, got: {top_name_liver}"
        print(f"  [OK] Reception sample ingestion: Ingested liver sample ({top_name_liver})")

        page.click("#btnSampleGlucose")
        page.wait_for_timeout(200)
        top_name_glucose = page.evaluate("patients[0].name")
        assert "Karimova Ziyoda" in top_name_glucose, f"Expected Karimova Ziyoda from glucose sample, got: {top_name_glucose}"
        print(f"  [OK] Reception sample ingestion: Ingested glucose sample ({top_name_glucose})")

        page.click("#btnSampleAnemia")
        page.wait_for_timeout(200)
        top_name_anemia = page.evaluate("patients[0].name")
        assert "Nilufar Usmonova" in top_name_anemia, f"Expected Nilufar Usmonova from anemia sample, got: {top_name_anemia}"
        print(f"  [OK] Reception sample ingestion: Ingested anemia sample ({top_name_anemia})")

        # Test Top Nav Founders Agreement Modal open & ESC close
        page.click("#navReceptionAgreementBtn")
        page.wait_for_timeout(300)
        rec_modal_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert rec_modal_display == "flex", f"Expected docPreviewModal to be flex in reception, got: {rec_modal_display}"
        iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in iframe_src, f"Expected MedLoop_Agreement.pdf in reception modal iframe, got: {iframe_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        rec_modal_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert rec_modal_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {rec_modal_after_esc}"
        print("  [OK] Reception Top Nav: Opened Founders Agreement modal and dismissed via ESC")

        # Test Top Nav LOI Modal open & ESC close
        page.click("#navReceptionLoiBtn")
        page.wait_for_timeout(300)
        rec_loi_display = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert rec_loi_display == "flex", f"Expected docPreviewModal to be flex for LOI in reception, got: {rec_loi_display}"
        rec_loi_iframe_src = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in rec_loi_iframe_src, f"Expected loi.pdf in reception modal iframe, got: {rec_loi_iframe_src}"

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        rec_loi_after_esc = page.evaluate("document.getElementById('docPreviewModal').style.display")
        assert rec_loi_after_esc == "none", f"Expected docPreviewModal to close on Escape, got: {rec_loi_after_esc}"
        print("  [OK] Reception Top Nav: Opened 14-Day Pilot LOI modal and dismissed via ESC")
        total_checks += 33

        # Phase 8: Test MedLoop B2B Pitch & Interactive Stage
        print("\n[MEDLOOP B2B PITCH INTERACTION TEST]")
        page.goto(f"http://localhost:{PORT}/medloop.html", wait_until="domcontentloaded")

        # Test Sample selector (Liver)
        page.click("#pill-liver")
        page.wait_for_timeout(200)
        p_name_l = page.inner_text("#labPatientName")
        assert "Xoliqov Bobur" in p_name_l, f"Expected Xoliqov Bobur, got: {p_name_l}"
        print(f"  [OK] MedLoop pitch: Liver sample loaded ({p_name_l})")

        # Test Sample selector (Glucose)
        page.click("#pill-glucose")
        page.wait_for_timeout(200)
        p_name_g = page.inner_text("#labPatientName")
        assert "Karimova Ziyoda" in p_name_g, f"Expected Karimova Ziyoda, got: {p_name_g}"
        print(f"  [OK] MedLoop pitch: Glucose sample loaded ({p_name_g})")

        # Test Sample selector (Anemia)
        page.click("#pill-anemia")
        page.wait_for_timeout(200)
        p_name_a = page.inner_text("#labPatientName")
        assert "Usmonova Nilufar" in p_name_a, f"Expected Usmonova Nilufar, got: {p_name_a}"
        print(f"  [OK] MedLoop pitch: Anemia sample loaded ({p_name_a})")

        # Test Booking Flywheel
        initial_revenue = page.inner_text("#revenueCounter").replace(",", "").strip()
        page.click("#bookingBtn")
        page.wait_for_timeout(400)
        new_revenue = page.inner_text("#revenueCounter").replace(",", "").strip()
        assert int(new_revenue) > int(initial_revenue), f"Expected revenue increase from {initial_revenue}, got: {new_revenue}"
        print(f"  [OK] MedLoop pitch booking flywheel: Revenue increased to {new_revenue} UZS")

        # Test MedLoop ROI Presets Strip
        page.click("#roi-preset-doktord")
        page.wait_for_timeout(200)
        p_val_d = page.inner_text("#dailyPatientsVal")
        c_val_d = page.inner_text("#consultationCheckVal")
        assert p_val_d == "90" and "180,000" in c_val_d, f"MedLoop ROI Preset Doktor D mismatch: {p_val_d}, {c_val_d}"
        print(f"  [OK] MedLoop pitch ROI preset: Loaded Doktor D ({p_val_d} pts/day, {c_val_d})")

        page.click("#roi-preset-osiyo")
        page.wait_for_timeout(200)
        p_val_o = page.inner_text("#dailyPatientsVal")
        assert p_val_o == "75", f"MedLoop ROI Preset Osiyo mismatch: {p_val_o}"
        print(f"  [OK] MedLoop pitch ROI preset: Loaded Osiyo Med ({p_val_o} pts/day)")

        # Test ROI Slider Live Adjustment
        page.evaluate("() => { const s = document.getElementById('sliderPatients'); s.value = 120; s.dispatchEvent(new Event('input')); const sc = document.getElementById('sliderCheck'); sc.value = 250000; sc.dispatchEvent(new Event('input')); }")
        page.wait_for_timeout(200)
        p_val = page.inner_text("#dailyPatientsVal")
        c_val = page.inner_text("#consultationCheckVal")
        assert "120" in p_val and "250,000" in c_val, f"Expected 120 and 250,000 in pitch ROI, got: {p_val}, {c_val}"
        print(f"  [OK] MedLoop pitch ROI sliders: Adjusted daily patients to {p_val} and check to {c_val}")

        # Test ROI Net Profit Metric
        profit_text = page.inner_text("#netProfitUzs")
        assert "M UZS" in profit_text, f"Expected M UZS in net profit, got: {profit_text}"
        print(f"  [OK] MedLoop pitch ROI calculation: Net monthly profit evaluated ({profit_text})")

        # Test Sample PDF Link
        pdf_href = page.get_attribute("#samplePdfLink", "href")
        assert "sample_" in pdf_href and ".pdf" in pdf_href, f"Expected sample PDF link, got: {pdf_href}"
        print(f"  [OK] MedLoop pitch sample link: Validated medical PDF attachment ({pdf_href})")

        # Test MedLoop Deliverable Sub-Page Routing Links (All 6 core routes)
        card_rec = page.get_attribute("#medloop-card-reception", "href")
        assert card_rec == "/reception.html", f"Unexpected reception href: {card_rec}"
        card_trk = page.get_attribute("#medloop-card-tracker", "href")
        assert card_trk == "/tracker.html", f"Unexpected tracker href: {card_trk}"
        card_mini = page.get_attribute("#medloop-card-miniapp", "href")
        assert card_mini == "/mini_app.html", f"Unexpected mini_app href: {card_mini}"
        card_wf = page.get_attribute("#medloop-card-workflow", "href")
        assert card_wf == "/workflow.html", f"Unexpected workflow href: {card_wf}"
        card_roi = page.get_attribute("#medloop-card-roi", "href")
        assert card_roi == "/clinic-roi.html", f"Unexpected roi href: {card_roi}"
        card_idx = page.get_attribute("#medloop-card-index", "href")
        assert card_idx == "/index.html", f"Unexpected index href: {card_idx}"
        print(f"  [OK] MedLoop pitch deliverable dock: All 6 sub-page links validated ({card_rec}, {card_trk}, {card_mini}, {card_wf}, {card_roi}, {card_idx})")

        # Test MedLoop Top Nav Agreement Modal open & ESC close
        page.click("#navMedloopAgreementBtn")
        page.wait_for_timeout(300)
        nav_agr_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert nav_agr_visible, "Top nav agreement modal did not open in medloop"
        nav_agr_iframe = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in nav_agr_iframe, f"Expected MedLoop_Agreement.pdf, got: {nav_agr_iframe}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        nav_agr_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert nav_agr_closed, "Top nav agreement modal did not close on Escape"
        print("  [OK] MedLoop pitch top nav: Opened and closed Founders Agreement modal cleanly via ESC key")

        # Test MedLoop Top Nav LOI Modal open & ESC close
        page.click("#navMedloopLoiBtn")
        page.wait_for_timeout(300)
        nav_loi_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert nav_loi_visible, "Top nav LOI modal did not open in medloop"
        nav_loi_iframe = page.get_attribute("#docViewerIframe", "src")
        assert "loi.pdf" in nav_loi_iframe, f"Expected loi.pdf, got: {nav_loi_iframe}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        nav_loi_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert nav_loi_closed, "Top nav LOI modal did not close on Escape"
        print("  [OK] MedLoop pitch top nav: Opened and closed 14-Day Pilot LOI modal cleanly via ESC key")

        # Test MedLoop Deliverable Dock Agreement Card open & ESC close
        page.click("#medloop-card-agreement")
        page.wait_for_timeout(300)
        dock_agr_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert dock_agr_visible, "Deliverable dock agreement modal did not open in medloop"
        dock_agr_iframe = page.get_attribute("#docViewerIframe", "src")
        assert "MedLoop_Agreement.pdf" in dock_agr_iframe, f"Expected MedLoop_Agreement.pdf in iframe, got: {dock_agr_iframe}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        dock_agr_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert dock_agr_closed, "Deliverable dock agreement modal did not close on Escape"
        print("  [OK] MedLoop pitch dock: Opened and closed Founders Agreement modal cleanly via ESC key")

        # Test MedLoop Deliverable Dock LOI Card open & ESC close
        page.click("#medloop-card-loi")
        page.wait_for_timeout(300)
        dock_loi_visible = page.evaluate("document.getElementById('docPreviewModal').style.display === 'flex'")
        assert dock_loi_visible, "Deliverable dock LOI modal did not open in medloop"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        dock_loi_closed = page.evaluate("document.getElementById('docPreviewModal').style.display === 'none'")
        assert dock_loi_closed, "Deliverable dock LOI modal did not close on Escape"
        print("  [OK] MedLoop pitch dock: Opened and closed 14-Day Pilot LOI modal cleanly via ESC key")

        # Test 4D Hardware Keyboard Navigation on MedLoop Pitch (Keys '1', '2', '3')
        page.keyboard.press("1")
        page.wait_for_timeout(200)
        p_name1 = page.inner_text("#labPatientName")
        assert "Xoliqov Bobur" in p_name1, f"Expected Xoliqov Bobur on key '1', got: {p_name1}"
        print(f"  [OK] MedLoop pitch keyboard shortcut: Key '1' loaded liver panel ({p_name1})")

        page.keyboard.press("2")
        page.wait_for_timeout(200)
        p_name2 = page.inner_text("#labPatientName")
        assert "Karimova Ziyoda" in p_name2, f"Expected Karimova Ziyoda on key '2', got: {p_name2}"
        print(f"  [OK] MedLoop pitch keyboard shortcut: Key '2' loaded glucose panel ({p_name2})")

        page.keyboard.press("3")
        page.wait_for_timeout(200)
        p_name3 = page.inner_text("#labPatientName")
        assert "Usmonova Nilufar" in p_name3, f"Expected Usmonova Nilufar on key '3', got: {p_name3}"
        print(f"  [OK] MedLoop pitch keyboard shortcut: Key '3' loaded anemia panel ({p_name3})")
        total_checks += 29

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
