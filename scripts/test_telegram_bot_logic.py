# test_telegram_bot_logic.py
import unittest
from medloop_telegram_bot import (
    analyze_medical_text,
    generate_triage_voucher,
    SAMPLE_REPORTS
)

class TestMedLoopBotLogic(unittest.TestCase):
    def test_sample_reports_exist(self):
        self.assertIn("liver", SAMPLE_REPORTS)
        self.assertIn("glucose", SAMPLE_REPORTS)
        self.assertIn("anemia", SAMPLE_REPORTS)
        self.assertTrue(len(SAMPLE_REPORTS["liver"]["title"]) > 0)

    def test_text_analysis_anemia(self):
        text = "Menda gemoglobin 95 chiqdi, biroz charchoq bor"
        result = analyze_medical_text(text)
        self.assertIn("Gemoglobin", result["text"])
        self.assertIn("Terapevt", result["specialist"])
        self.assertEqual(result["status"], "attention")

    def test_text_analysis_liver(self):
        text = "Tahlilda ALT 75 va AST 55 chiqdi"
        result = analyze_medical_text(text)
        self.assertIn("ALT", result["text"])
        self.assertIn("Gepatolog", result["specialist"])

    def test_text_analysis_glucose(self):
        text = "Qondagi qand 8.2 mmol/l ekan"
        result = analyze_medical_text(text)
        self.assertIn("Qand", result["text"])
        self.assertIn("Endokrinolog", result["specialist"])

    def test_voucher_generation(self):
        voucher = generate_triage_voucher(
            user_id=123456,
            specialist="Gepatolog",
            clinic="Samarqand Shoshilinch Tibbiy Markazi"
        )
        self.assertTrue(voucher["voucher_id"].startswith("ML-"))
        self.assertIn("Gepatolog", voucher["text"])
        self.assertIn("Samarqand", voucher["text"])

if __name__ == '__main__':
    unittest.main()
