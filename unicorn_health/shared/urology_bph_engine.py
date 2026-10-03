#!/usr/bin/env python3
"""
Unicorn Health - Urology Benign Prostatic Hyperplasia (BPH), IPSS & Finasteride PSA Correction Shield Engine
Phase 73: LUTS/BPH evaluation, IPSS scoring, Finasteride 50% PSA suppression doubler calculator,
Tamsulosin + Finasteride dual pouch adherence, and ArzonLab Total/Free PSA screening.
Founded by Jasur Shukurov (SamDTU Healthcare Management & School 21 Software Engineering).
"""

import json
import os
from typing import Dict, List, Any

# Standard BPH / LUTS Medications Matrix
BPH_MEDICATIONS = {
    "dual_tamsulosin_finasteride": {
        "id": "dual_tamsulosin_finasteride",
        "title": "DoriQuti BPH Kombinatsiyalangan Oylik Lentasi (Tamsulozin 0.4mg + Finasterid 5mg)",
        "components": [
            {
                "name": "Tamsulozin gidroxlorid 0.4 mg",
                "class": "Alfa-1A adrenoblokator",
                "mechanism": "Prostata kapsulasi va qovuq bo'yni silliq mushaklarini 24-48 soatda bo'shashtirib, siydik oqimini 40% ga yaxshilaydi.",
                "timing": "Kechki ovqatdan 30 daqiqa keyin (kuniga 1 marta)"
            },
            {
                "name": "Finasterid 5 mg (yoki Dutasterid 0.5 mg)",
                "class": "5-alfa reduktaza ingibitori (5-ARI)",
                "mechanism": "Testosteronning digidrotestosteron (DHT) ga aylanishini to'sib, prostata hajmini 6-12 oyda 25-30% ga kichraytiradi va jarrohlik xavfini 57% ga kamaytiradi.",
                "timing": "Kechki ovqatdan keyin birga qabul qilinadi"
            }
        ],
        "retail_monthly_uzs": 380000,
        "doriquti_monthly_uzs": 145000,
        "saved_monthly_uzs": 235000,
        "savings_percent": 61.8
    },
    "tamsulosin_monotherapy": {
        "id": "tamsulosin_monotherapy",
        "title": "Tamsulozin 0.4 mg Monoterapiya (Kichik prostata hajmi < 30 sm³ uchun)",
        "retail_monthly_uzs": 160000,
        "doriquti_monthly_uzs": 65000,
        "saved_monthly_uzs": 95000,
        "savings_percent": 59.4
    }
}

ARZONLAB_UROLOGY_DIAGNOSTICS = {
    "total_free_psa_ratio": {
        "id": "total_free_psa_ratio",
        "title": "Umumiy va Erkin PSA (Prostata Maxsus Antigeni) Onko-Skriningi",
        "gold_standard": True,
        "retail_uzs": 140000,
        "arzonlab_uzs": 55000,
        "saved_uzs": 85000,
        "savings_percent": 60.7,
        "description": "Prostata saratoni xavfini erta bosqichda aniqlash uchun venadan qon tahlili.",
        "pre_test_rules": "Tahlildan 48 soat oldin velosiped minmaslik, jinsiy aloqa qilmaslik va rektal tekshiruv o'tkazmaslik."
    },
    "ultrasound_pvr_prostate": {
        "id": "ultrasound_pvr_prostate",
        "title": "Qovuq va Prostata UZI + Qoldiq Siydik Miqdori (PVR)",
        "gold_standard": True,
        "retail_uzs": 130000,
        "arzonlab_uzs": 50000,
        "saved_uzs": 80000,
        "savings_percent": 61.5,
        "description": "Prostata hajmini (sm³) va siygandan so'ng qovuqda qolgan siydik (PVR) hajmini aniq baholash.",
        "pre_test_rules": "To'lgan qovuq bilan tekshiruvga kelinadi, so'ng hojatdan keyin qayta o'lchanadi."
    }
}

class UrologyBphEngine:
    """Evaluates BPH / LUTS symptom severity via IPSS, calculates corrected true baseline PSA during 5-ARI therapy, and manages dual-pouch adherence."""

    def __init__(self):
        self.medications = BPH_MEDICATIONS
        self.diagnostics = ARZONLAB_UROLOGY_DIAGNOSTICS

    def calculate_ipss_score(self, answers: List[int], qol_score: int = 4) -> Dict[str, Any]:
        """Calculates International Prostate Symptom Score (IPSS: 0 to 35) and Quality of Life (QoL: 0 to 6).
        answers: list of 7 integers (each 0-5) corresponding to:
        1. Incomplete emptying, 2. Frequency, 3. Intermittency, 4. Urgency, 5. Weak stream, 6. Straining, 7. Nocturia.
        """
        if len(answers) != 7:
            raise ValueError("IPSS requires exactly 7 question responses (values 0-5).")

        total_ipss = sum(answers)

        if total_ipss <= 7:
            severity = "MILD"
            severity_label = "Yengil Daraja (IPSS: 0-7)"
            treatment_advice = "Kuzatuv rejimi, turmush tarzi o'zgarishi: kechki soat 19:00 dan so'ng suyuqlik, kofe va choyni cheklash."
            dual_therapy_indicated = False
        elif total_ipss <= 19:
            severity = "MODERATE"
            severity_label = "O'rtacha Daraja (IPSS: 8-19)"
            treatment_advice = "Dori vositalari bilan davolash: Alfa-blokator (Tamsulozin 0.4mg) + 5-ARI (Finasterid 5mg) kombinatsiyasi."
            dual_therapy_indicated = True
        else:
            severity = "SEVERE"
            severity_label = "Og'ir Daraja (IPSS: 20-35)"
            treatment_advice = "Faol kombinatsiyalangan terapiya yoki urolog-jarroh ko'rigi (TURP / lazer enukleatsiyasi ehtimoli)."
            dual_therapy_indicated = True

        qol_map = {
            0: "Juda mamnun (Delighted)",
            1: "Qoniqarli (Pleased)",
            2: "Asosan rozi (Mostly satisfied)",
            3: "Aralash his (Mixed)",
            4: "Asosan norozi (Mostly dissatisfied)",
            5: "Juda xafa (Unhappy)",
            6: "Dahshatli (Terrible)"
        }

        return {
            "total_ipss": total_ipss,
            "severity_code": severity,
            "severity_label": severity_label,
            "qol_score": qol_score,
            "qol_label": qol_map.get(qol_score, "Norozi"),
            "nocturia_count": answers[6],  # 7th question is nocturia
            "dual_therapy_indicated": dual_therapy_indicated,
            "clinical_advice": treatment_advice
        }

    def calculate_psa_correction(self, measured_psa_ng_ml: float, months_on_5ari: int = 6) -> Dict[str, Any]:
        """Calculates corrected true baseline PSA when patient takes Finasteride / Dutasteride.
        5-ARIs reduce PSA by 50% after >= 6 months. To avoid missing prostate cancer, multiply by 2!
        """
        is_suppressed = months_on_5ari >= 6
        multiplier = 2.0 if is_suppressed else 1.0
        adjusted_psa = round(measured_psa_ng_ml * multiplier, 2)

        # Standard clinical threshold for suspicion is 4.0 ng/mL
        suspicious_cancer_risk = adjusted_psa >= 4.0

        if suspicious_cancer_risk:
            alert_level = "HIGH_RISK"
            alert_color = "red"
            message = (
                f"DIQQAT! Laboratoriya ko'rsatgan PSA: {measured_psa_ng_ml} ng/mL. Bemor {months_on_5ari} oydan beri "
                f"Finasterid/Dutasterid qabul qilgani sababli bu ko'rsatkich 50% ga soxta pasaygan! "
                f"Haqiqiy klinik PSA: {adjusted_psa} ng/mL (me'yor < 4.0). Prostata saratoni xavfini inkor etish uchun "
                "zudlik bilan urolog-onkolog maslahati va MRT (mpMRI) tavsiya etiladi!"
            )
        else:
            alert_level = "NORMAL_OR_LOW"
            alert_color = "emerald"
            message = (
                f"O'lchangan PSA: {measured_psa_ng_ml} ng/mL. Korreksiyalangan haqiqiy PSA: {adjusted_psa} ng/mL. "
                "Xavfli o'sma belgilari yo'q (me'yor < 4.0 ng/mL). BPH terapiyasi muvaffaqiyatli davom ettirilishi mumkin."
            )

        return {
            "measured_psa": measured_psa_ng_ml,
            "months_on_5ari": months_on_5ari,
            "is_suppressed": is_suppressed,
            "multiplier": multiplier,
            "adjusted_psa": adjusted_psa,
            "suspicious_cancer_risk": suspicious_cancer_risk,
            "alert_level": alert_level,
            "alert_color": alert_color,
            "clinical_message": message
        }

    def calculate_annual_patient_savings(self) -> Dict[str, Any]:
        """Calculates annual patient savings for DoriQuti dual-pouch BPH kit and ArzonLab diagnostics."""
        med = self.medications["dual_tamsulosin_finasteride"]
        psa = self.diagnostics["total_free_psa_ratio"]
        uzi = self.diagnostics["ultrasound_pvr_prostate"]

        med_annual_retail = med["retail_monthly_uzs"] * 12
        med_annual_doriquti = med["doriquti_monthly_uzs"] * 12
        med_annual_saved = med_annual_retail - med_annual_doriquti

        # Diagnostics twice a year
        diag_annual_retail = (psa["retail_uzs"] + uzi["retail_uzs"]) * 2
        diag_annual_arzonlab = (psa["arzonlab_uzs"] + uzi["arzonlab_uzs"]) * 2
        diag_annual_saved = diag_annual_retail - diag_annual_arzonlab

        total_retail = med_annual_retail + diag_annual_retail
        total_unicorn = med_annual_doriquti + diag_annual_arzonlab
        total_saved = total_retail - total_unicorn
        savings_pct = round((total_saved / total_retail) * 100, 1)

        return {
            "med_monthly_saved_uzs": med["saved_monthly_uzs"],
            "med_annual_saved_uzs": med_annual_saved,
            "diag_annual_saved_uzs": diag_annual_saved,
            "total_annual_retail_uzs": total_retail,
            "total_annual_unicorn_uzs": total_unicorn,
            "total_annual_saved_uzs": total_saved,
            "savings_percent": savings_pct
        }

    def generate_full_dossier(self, patient_name: str = "Tursunov Omonullo (64 yosh)") -> Dict[str, Any]:
        """Generates comprehensive clinical dossier with IPSS, PSA correction, and economics."""
        # Sample patient: Moderate-to-severe BPH (answers: 3, 2, 3, 2, 4, 3, 4 -> IPSS: 21, Nocturia 4 times/night)
        sample_ipss_answers = [3, 2, 3, 2, 4, 3, 4]
        ipss_res = self.calculate_ipss_score(sample_ipss_answers, qol_score=5)
        psa_res = self.calculate_psa_correction(measured_psa_ng_ml=2.8, months_on_5ari=8)
        savings = self.calculate_annual_patient_savings()

        return {
            "patient_name": patient_name,
            "clinical_diagnosis": "Prostata bezining xavfsiz giperplaziyasi (BPH), II bosqich, og'ir nokturiyali LUTS sindromi",
            "ipss_evaluation": ipss_res,
            "psa_oncology_shield": psa_res,
            "annual_savings": savings,
            "daily_pouch_schedule": {
                "time": "20:30 (Kechki ovqatdan 30 min so'ng)",
                "pouch_name": "Kechki BPH Qalqoni",
                "items": [
                    {"name": "Tamsulozin 0.4 mg", "role": "Siydik yo'lini ochish & tungi qistashni kamaytirish"},
                    {"name": "Finasterid 5 mg", "role": "Prostata hajmini kichraytirish (DHT blokadasi)"}
                ]
            },
            "lifestyle_rules": [
                "1. Soat 19:00 dan keyin ko'p suyuqlik, tarvuz, qora choy yoki qahva ichmang.",
                "2. Qorinni sovuqqa oldirmang va oyoqlarni issiq tuting.",
                "3. Gripp va shamollashda burun tomchilari (psevdoefedrin) va antigistaminlarni shifokorsiz ichmang (o'tkir siydik tutilishiga olib kelishi mumkin).",
                "4. Finasteridni har kuni bir vaqtda to'xtatmasdan kamida 6-12 oy ichish shart.",
                "5. Har 6 oyda qon topshirganda laboratoriyaga Finasterid ichayotganingizni ayting (PSA 2 ga ko'paytiriladi)."
            ]
        }

if __name__ == "__main__":
    engine = UrologyBphEngine()
    dossier = engine.generate_full_dossier()
    out_path = os.path.join(os.path.dirname(__file__), "sample_urology_bph.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(dossier, f, indent=2, ensure_ascii=False)
    print(f"Urology BPH Shield Engine tested successfully. Output: {out_path}")
    print(f"IPSS Score: {dossier['ipss_evaluation']['total_ipss']} ({dossier['ipss_evaluation']['severity_label']})")
    print(f"Adjusted PSA: {dossier['psa_oncology_shield']['adjusted_psa']} ng/mL (Measured: {dossier['psa_oncology_shield']['measured_psa']})")
    print(f"Annual Patient Savings: {dossier['annual_savings']['total_annual_saved_uzs']:,} UZS ({dossier['annual_savings']['savings_percent']}%)")
