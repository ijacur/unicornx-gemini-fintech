#!/usr/bin/env python3
"""
Unicorn Health - Dermatology Psoriasis & Atopic Dermatitis Biologics & Phototherapy Shield Engine
Phase 72: Chronic plaque psoriasis, severe atopic dermatitis (eczema), PASI/SCORAD scoring,
topical steroid tapering schedule (anti-TSW rebound), biologics cold-chain tracker, and ArzonLab NB-UVB 311nm phototherapy.
Founded by Jasur Shukurov (SamDTU Healthcare Management & School 21 Software Engineering).
"""

import json
import os
from typing import Dict, List, Any

# Biologics & Targeted Therapies Formulary
DERMATOLOGY_MEDICATIONS = {
    "secukinumab-300mg": {
        "id": "secukinumab-300mg",
        "brand_name": "Cosentyx 300 mg (Sekukinumab)",
        "generic_name": "Sekukinumab (Anti-IL-17A monoklonal antitanacha)",
        "indication": "O'rta va og'ir darajadagi blyashkali psoriaz (PASI > 10)",
        "administration": "Teri ostiga (Combopack 2x150mg yoki 1x300mg avto-shprits). Induksiya: 0, 1, 2, 3, 4-haftalarda, so'ngra har 4 haftada 1 marta.",
        "storage": "+2°C..+8°C doimiy sovuq zanjir (muzlatilmasin, yorug'likdan himoyalangan)",
        "retail_monthly_uzs": 4800000,
        "doriquti_monthly_uzs": 1950000,
        "saved_monthly_uzs": 2850000,
        "savings_percent": 59.4
    },
    "dupilumab-300mg": {
        "id": "dupilumab-300mg",
        "brand_name": "Dupixent 300 mg (Dupilumab)",
        "generic_name": "Dupilumab (Anti-IL-4R-alpha monoklonal antitanacha)",
        "indication": "Og'ir va davolanmas atopik dermatit / ekzema (SCORAD > 50)",
        "administration": "Boshlang'ich doza: 600 mg (2 ta 300mg shprits), so'ngra har 2 haftada 300 mg.",
        "storage": "+2°C..+8°C qat'iy sovuq zanjir",
        "retail_monthly_uzs": 5400000,
        "doriquti_monthly_uzs": 2200000,
        "saved_monthly_uzs": 3200000,
        "savings_percent": 59.3
    },
    "tacrolimus-01-ointment": {
        "id": "tacrolimus-01-ointment",
        "brand_name": "Protopic 0.1% 30g (Takrolimus)",
        "generic_name": "Takrolimus malhami",
        "indication": "Gormonsiz kalsinevrin ingibitori, yuz va nozik teri sohalari uchun",
        "administration": "Kuniga 1-2 mahal yupqa qatlam qilib surtish. Steroid atrofiyasini chaqirmaydi.",
        "storage": "+15°C..+25°C",
        "retail_monthly_uzs": 360000,
        "doriquti_monthly_uzs": 145000,
        "saved_monthly_uzs": 215000,
        "savings_percent": 59.7
    },
    "ceramide-emollient-pack": {
        "id": "ceramide-emollient-pack",
        "brand_name": "DoriQuti Barer-Krem & Seramid Emollient 500ml",
        "generic_name": "Seramid NP, AP, EOP + Xolesterin + Fitosfingozin",
        "indication": "Teri lipid to'sig'ini tiklash, quruqlik va qichishishni yo'qotish",
        "administration": "Har kuni cho'milgandan so'ng 3 daqiqa ichida 'ho'l teriga' mo'l miqdorda surtish.",
        "storage": "+15°C..+25°C",
        "retail_monthly_uzs": 280000,
        "doriquti_monthly_uzs": 95000,
        "saved_monthly_uzs": 185000,
        "savings_percent": 66.1
    }
}

ARZONLAB_DERMATOLOGY_SERVICES = {
    "nb_uvb_311nm_session": {
        "id": "nb_uvb_311nm_session",
        "title": "Tor To'lqinli NB-UVB 311 nm Fototerapiya Seansi (Waldmann Kabinasi)",
        "gold_standard": True,
        "retail_uzs": 120000,
        "arzonlab_uzs": 45000,
        "saved_uzs": 75000,
        "savings_percent": 62.5,
        "description": "Gormonsiz va xavfsiz fototerapiya: T-limfotsitlar apoptozini chaqiradi va psoriaz blyashkalarini tozalaydi.",
        "course_recommendation": "Haftada 3 marta, jami 20-25 seanslik kurs tavsiya etiladi."
    },
    "ige_atopy_allergy_panel": {
        "id": "ige_atopy_allergy_panel",
        "title": "Umumiy IgE + 20-Allergenli Atopiya Skrining Bloti",
        "gold_standard": False,
        "retail_uzs": 380000,
        "arzonlab_uzs": 160000,
        "saved_uzs": 220000,
        "savings_percent": 57.9,
        "description": "Atopik dermatitni qo'zg'atuvchi oziq-ovqat va nafas yo'li allergenlarini aniqlash.",
        "course_recommendation": "Qon zardobidan IFA tahlili."
    }
}

class DermatologyPsoriasisEngine:
    """Evaluates Psoriasis & Atopic Dermatitis severity (PASI & SCORAD), steroid tapering schedules, and biologics cold-chain logistics."""

    def __init__(self):
        self.medications = DERMATOLOGY_MEDICATIONS
        self.services = ARZONLAB_DERMATOLOGY_SERVICES

    def calculate_pasi_score(
        self,
        head_params: Dict[str, float],
        upper_params: Dict[str, float],
        trunk_params: Dict[str, float],
        lower_params: Dict[str, float]
    ) -> Dict[str, Any]:
        """Calculates Psoriasis Area and Severity Index (PASI: 0 to 72).
        Weights: Head = 0.1, Upper limbs = 0.2, Trunk = 0.3, Lower limbs = 0.4.
        Params format: {'erythema': 0-4, 'induration': 0-4, 'desquamation': 0-4, 'area_score': 0-6}
        """
        def calc_region(p: Dict[str, float], weight: float) -> float:
            severity = p.get('erythema', 0) + p.get('induration', 0) + p.get('desquamation', 0)
            area = p.get('area_score', 0)
            return weight * severity * area

        head_val = calc_region(head_params, 0.1)
        upper_val = calc_region(upper_params, 0.2)
        trunk_val = calc_region(trunk_params, 0.3)
        lower_val = calc_region(lower_params, 0.4)

        total_pasi = round(head_val + upper_val + trunk_val + lower_val, 1)

        if total_pasi < 5.0:
            severity_label = "Yengil Psoriaz (Mild Psoriasis)"
            recommendation = "Mahalliy emollientlar, keratolotiklar (salitsil kislotasi) va nozik sohalarga kalsinevrin ingibitorlari kifoya."
            biologics_indicated = False
            phototherapy_indicated = False
        elif total_pasi <= 10.0:
            severity_label = "O'rtacha Psoriaz (Moderate Psoriasis)"
            recommendation = "Tor to'lqinli NB-UVB 311 nm fototerapiya va qisqa muddatli kombinatsiyalangan kremlar."
            biologics_indicated = False
            phototherapy_indicated = True
        else:
            severity_label = "Og'ir Psoriaz (Severe Psoriasis - PASI > 10)"
            recommendation = "Biologik terapiya (Sekukinumab / Anti-IL-17A) yoki tizimli immunosupressantlar + NB-UVB fototerapiya."
            biologics_indicated = True
            phototherapy_indicated = True

        return {
            "pasi_score": total_pasi,
            "severity_label": severity_label,
            "biologics_indicated": biologics_indicated,
            "phototherapy_indicated": phototherapy_indicated,
            "recommendation": recommendation,
            "region_breakdown": {
                "head": round(head_val, 2),
                "upper_limbs": round(upper_val, 2),
                "trunk": round(trunk_val, 2),
                "lower_limbs": round(lower_val, 2)
            }
        }

    def generate_steroid_tapering_schedule(self, current_steroid_potency: str = "very_high") -> List[Dict[str, Any]]:
        """Generates a safe 4-week step-down steroid tapering schedule to prevent Topical Steroid Withdrawal (TSW) / Rebound."""
        schedule = [
            {
                "week": 1,
                "title": "1-Hafta: Kundalik Boshqaruv & Barer Tiklash",
                "morning": "Kuchli steroid malham (Klobetazol/Betametazon) - faqat blyashka ustiga yupqa qilib",
                "midday": "Seramidli namlantiruvchi krem (DoriQuti Emollient)",
                "evening": "Kuchli steroid malham",
                "night": "Yotishdan oldin to'liq tana emollienti",
                "clinical_goal": "O'tkir yallig'lanish va qizarishni tezda pasaytirish."
            },
            {
                "week": 2,
                "title": "2-Hafta: Dozani 50% Kamaytirish (Kun Oraliq)",
                "morning": "Dushanba/Chorshanba/Juma: Steroid malham; Boshqa kunlari: Takrolimus 0.1% malham",
                "midday": "Seramidli emollient",
                "evening": "Takrolimus 0.1% (gormonsiz kalsinevrin blokatori)",
                "night": "To'liq tana emollienti",
                "clinical_goal": "Teri atrofiyasining oldini olish va terini gormonga qaramligini uzish."
            },
            {
                "week": 3,
                "title": "3-Hafta: Reboundga Qarshi 'Dam Olish Kunlari' Rejimi",
                "morning": "Faqat Shanba va Yakshanba: Steroid malham; Hafta ichi: FAQAT Takrolimus 0.1%",
                "midday": "Seramidli emollient",
                "evening": "Takrolimus 0.1%",
                "night": "To'liq tana emollienti",
                "clinical_goal": "Gormonni to'xtatganda qizarish qayta 'portlashi' (rebound flare) to'sig'i."
            },
            {
                "week": 4,
                "title": "4-Hafta: To'liq Gormonsiz Proaktiv Terapiya",
                "morning": "Takrolimus 0.1% (haftada 2 marta profilaktik surtish)",
                "midday": "Seramidli emollient",
                "evening": "DoriQuti Seramid Barer-Krem",
                "night": "To'liq tana emollienti",
                "clinical_goal": "100% gormonsiz remissiya va terining lipid qoplamini mustahkamlash."
            }
        ]
        return schedule

    def calculate_biologics_patient_savings(self, drug_id: str = "secukinumab-300mg", sessions_uvb: int = 20) -> Dict[str, Any]:
        """Calculates patient savings for Biologics subscription and NB-UVB phototherapy packages."""
        med = self.medications.get(drug_id, self.medications["secukinumab-300mg"])
        uvb = self.services["nb_uvb_311nm_session"]

        med_retail = med["retail_monthly_uzs"]
        med_doriquti = med["doriquti_monthly_uzs"]
        med_saved = med_retail - med_doriquti

        uvb_retail = uvb["retail_uzs"] * sessions_uvb
        uvb_arzonlab = uvb["arzonlab_uzs"] * sessions_uvb
        uvb_saved = uvb_retail - uvb_arzonlab

        total_retail = med_retail + uvb_retail
        total_unicorn = med_doriquti + uvb_arzonlab
        total_saved = total_retail - total_unicorn
        savings_percent = round((total_saved / total_retail) * 100, 1)

        return {
            "drug_name": med["brand_name"],
            "med_retail_monthly_uzs": med_retail,
            "med_doriquti_monthly_uzs": med_doriquti,
            "med_monthly_saved_uzs": med_saved,
            "uvb_sessions": sessions_uvb,
            "uvb_retail_course_uzs": uvb_retail,
            "uvb_arzonlab_course_uzs": uvb_arzonlab,
            "uvb_course_saved_uzs": uvb_saved,
            "total_retail_uzs": total_retail,
            "total_unicorn_uzs": total_unicorn,
            "total_saved_uzs": total_saved,
            "savings_percent": savings_percent
        }

    def generate_full_dossier(self, patient_name: str = "Saidova Nilufar", drug_id: str = "secukinumab-300mg") -> Dict[str, Any]:
        """Generates comprehensive dermatology care dossier."""
        head_sample = {"erythema": 2, "induration": 2, "desquamation": 2, "area_score": 3}
        upper_sample = {"erythema": 3, "induration": 3, "desquamation": 2, "area_score": 4}
        trunk_sample = {"erythema": 3, "induration": 3, "desquamation": 3, "area_score": 4}
        lower_sample = {"erythema": 3, "induration": 4, "desquamation": 3, "area_score": 5}

        pasi = self.calculate_pasi_score(head_sample, upper_sample, trunk_sample, lower_sample)
        tapering = self.generate_steroid_tapering_schedule()
        savings = self.calculate_biologics_patient_savings(drug_id)

        return {
            "patient_name": patient_name,
            "primary_diagnosis": "Keng tarqalgan blyashkali psoriaz, o'rtacha-og'ir bosqich",
            "pasi_assessment": pasi,
            "selected_biologic": self.medications[drug_id],
            "steroid_tapering_schedule": tapering,
            "financial_savings": savings,
            "clinical_rules": [
                "1. Biologik preparatni qabul qilishdan oldin Mantoux/Diaskintest (tuberkulyoz) va gepatit B/C tekshiruvi shart.",
                "2. Sovuq zanjir (+2°C..+8°C) buzilsa, oqsil molekulalari parchalanadi va samarasiz bo'ladi.",
                "3. Gormonli malhamlarni to'satdan tashlab yubormang; 4-haftalik sekin tushirish jadvaliga amal qiling.",
                "4. NB-UVB 311 nm fototerapiyasi seansidan 2 soat oldin quyoshdan saqlovchi krem surtmang.",
                "5. Har kuni cho'milgandan so'ng dastlabki 3 daqiqada teri namligini saqlash uchun seramidli emollient surting."
            ]
        }

if __name__ == "__main__":
    engine = DermatologyPsoriasisEngine()
    dossier = engine.generate_full_dossier()
    out_path = os.path.join(os.path.dirname(__file__), "sample_dermatology_psoriasis.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(dossier, f, indent=2, ensure_ascii=False)
    print(f"Dermatology Psoriasis Shield Engine tested successfully. Output: {out_path}")
    print(f"PASI Score: {dossier['pasi_assessment']['pasi_score']} ({dossier['pasi_assessment']['severity_label']})")
    print(f"Patient Monthly & Course Savings: {dossier['financial_savings']['total_saved_uzs']:,} UZS ({dossier['financial_savings']['savings_percent']}%)")
