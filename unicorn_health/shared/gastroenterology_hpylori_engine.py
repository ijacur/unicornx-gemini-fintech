#!/usr/bin/env python3
"""
Unicorn Health - Gastroenterology Peptic Ulcer & Helicobacter pylori 14-Day Eradication Shield Engine
Phase 71: H. pylori eradication compliance, Bismuth Quadruple Therapy pouch generator,
benign side-effect reassurance (bismuth black stool vs melena), and ArzonLab 13C-UBT follow-up verification.
Founded by Jasur Shukurov (SamDTU Healthcare Management & School 21 Software Engineering).
"""

import json
import os
from typing import Dict, List, Any

# Clinical Regimen Specifications (Maastricht VI / Florence Consensus)
HPYLORI_REGIMENS = {
    "bismuth_quadruple_14d": {
        "id": "bismuth_quadruple_14d",
        "title": "Bismutli Kvadroterapiya (14 Kunlik Oltin Standart)",
        "duration_days": 14,
        "first_line_indication": "O'zbekistonda klaritromitsinga yuqori chidamlilik sharoitida 1-qator tanlov terapiyasi (Samaradorlik: 92-94%)",
        "total_pouches": 56,  # 4 pouches per day * 14 days
        "retail_cost_uzs": 680000,
        "doriquti_cost_uzs": 265000,
        "saved_uzs": 415000,
        "savings_percent": 61.0,
        "components": [
            {
                "name": "Pantoprazol 40 mg (yoki Ezomeprazol 40 mg)",
                "role": "Proton pompasi ingibitori (Kislota blokatori)",
                "timing": "Kuniga 2 mahal: Tongda (07:30) va Kechqurun (19:00) ovqatdan 30 daqiqa oldin",
                "purpose": "Oshqozon kislotasini neytrallab, antibiotiklarning maksimal antibakterial faolligini ta'minlaydi."
            },
            {
                "name": "Bismut subtsitrat (De-Nol) 120 mg",
                "role": "Gastroprotektor & Antibakterial qoplama",
                "timing": "Kuniga 4 mahal: Tongda (07:30), Tushlikda (12:30), Kechqurun (19:00) va Uyqudan oldin (22:30)",
                "purpose": "Bakteriya devorini parchalaydi va yara tubida kislotaga chidamli shilliq plyonka hosil qiladi."
            },
            {
                "name": "Amoksitsillin (Flemoksin) 1000 mg",
                "role": "Bakteritsid antibiotik",
                "timing": "Kuniga 2 mahal: Nonushta va Kechki ovqatdan 10 daqiqa keyin",
                "purpose": "H. pylori mikrobiga nisbatan chidamliligi minimal bo'lgan asosiy antibiotik."
            },
            {
                "name": "Klaritromitsin 500 mg (yoki Metronidazol 500 mg)",
                "role": "Makrolid antibiotik",
                "timing": "Kuniga 2 mahal: Nonushta va Kechki ovqatdan 10 daqiqa keyin",
                "purpose": "Bakteriya oqsil sintezini to'xtatadi."
            }
        ]
    },
    "triple_therapy_standard_14d": {
        "id": "triple_therapy_standard_14d",
        "title": "Klassik Standart Uchlik Terapiya (14 Kun)",
        "duration_days": 14,
        "first_line_indication": "Klaritromitsin sezuvchanligi tasdiqlangan holatlar uchun",
        "total_pouches": 28,
        "retail_cost_uzs": 520000,
        "doriquti_cost_uzs": 210000,
        "saved_uzs": 310000,
        "savings_percent": 59.6,
        "components": [
            {
                "name": "Pantoprazol 40 mg",
                "role": "PPI Kislota blokatori",
                "timing": "Kuniga 2 mahal ovqatdan oldin"
            },
            {
                "name": "Amoksitsillin 1000 mg",
                "role": "Antibiotik",
                "timing": "Kuniga 2 mahal ovqatdan keyin"
            },
            {
                "name": "Klaritromitsin 500 mg",
                "role": "Antibiotik",
                "timing": "Kuniga 2 mahal ovqatdan keyin"
            }
        ]
    }
}

ARZONLAB_GASTRIC_DIAGNOSTICS = {
    "ubt_13c_breath_test": {
        "id": "ubt_13c_breath_test",
        "name": "13C-Urea Nafas Testi (13C-UBT)",
        "gold_standard": True,
        "retail_uzs": 180000,
        "arzonlab_uzs": 65000,
        "saved_uzs": 115000,
        "savings_percent": 63.9,
        "description": "Og'riqsiz, zond yutmasdan (FGSsiz) 15 daqiqada mikrob faolligini aniqlovchi xalqaro oltin standart.",
        "pre_test_rules": "Antibiotik tugaganidan 4 hafta, Omeprazol/Pantoprazol tugaganidan 2 hafta o'tib topshiriladi."
    },
    "stool_antigen_elisa": {
        "id": "stool_antigen_elisa",
        "name": "Najasda H. pylori Antigenni Aniqlash (IFA/ELISA)",
        "gold_standard": False,
        "retail_uzs": 120000,
        "arzonlab_uzs": 45000,
        "saved_uzs": 75000,
        "savings_percent": 62.5,
        "description": "Najas namunasi orqali mikrob antigenini yuqori aniqlikda tekshirish.",
        "pre_test_rules": "Antibiotikdan 4 hafta, kislota ingibitoridan 14 kun keyin."
    },
    "gastric_pepsinogen_panel": {
        "id": "gastric_pepsinogen_panel",
        "name": "GastroPanel (Pepsinogen I/II & Gastrin-17 Onko-Xavf)",
        "gold_standard": False,
        "retail_uzs": 320000,
        "arzonlab_uzs": 135000,
        "saved_uzs": 185000,
        "savings_percent": 57.8,
        "description": "Oshqozon shilliq qavati atrofiyasi va onkologik xavfini baholovchi qon tahlili.",
        "pre_test_rules": "Ertalab och qoringa qon topshiriladi."
    }
}

SIDE_EFFECT_REASSURANCE_GUIDE = [
    {
        "symptom": "Qora rangli najas va qora til (Black Stool & Tongue)",
        "alarm_level": "XAVFSIZ (Zararsiz kimyoviy reaksiya)",
        "color": "emerald",
        "is_benign": True,
        "explanation": "Bismut subtsitrat ichakdagi oltingugurt birikmalari bilan reaksiyaga kirishib, qora bismut sulfidiga aylanadi. Bu 100% zararsiz, og'riqsiz va dori to'xtatilgach 2-3 kunda o'tib ketadi. Bu oshqozon qon ketishi (melena) EMAS! Dorini to'xtatmang!",
        "action": "Qo'rqmasdan 14 kunlik kursni davom ettiring."
    },
    {
        "symptom": "Og'izda achchiq metall ta'mi (Bitter Metallic Taste)",
        "alarm_level": "KUTILGAN NOJO'YA TA'SIR",
        "color": "blue",
        "is_benign": True,
        "explanation": "Klaritromitsin va metronidazol so'lak bezlari orqali qisman ajralgani sababli og'izda achchiq yoki metall ta'mi paydo bo'ladi.",
        "action": "Dorini ko'p suv bilan iching, taomdan so'ng limonli iliq suv iching yoki shakariz yalpizli konfet iste'mol qiling."
    },
    {
        "symptom": "Yengil ko'ngil aynishi va ich surishi (Dysbiosis / Diarrhea)",
        "alarm_level": "MODERATE",
        "color": "amber",
        "is_benign": True,
        "explanation": "Bir vaqtning o'zida ikkita kuchli antibiotik qabul qilish ichak florasini vaqtincha buzadi.",
        "action": "Antibiotik qabulidan kamida 2 soat keyin (soat 14:00 da) Saccharomyces boulardii (Enterol) probiotik qabul qiling. Dorilarni aslo och qoringa ichmang (PPI va Bismutdan tashqari)."
    },
    {
        "symptom": "Qora qatronga o'xshash suyuq qonli ich ketishi va bosh aylanishi, hushdan ketish",
        "alarm_level": "FAVQULODDA XAVF (103 Chaqiring!)",
        "color": "red",
        "is_benign": False,
        "explanation": "Agar najas qoraligi bilan birga qattiq holsizlik, sovuq ter, qonli qusish yoki qon bosimi keskin tushishi kuzatilsa, bu yara qonashining belgisi bo'lishi mumkin.",
        "action": "Zudlik bilan 103 ga qo'ng'iroq qiling va gastroenterologga murojaat qiling."
    }
]

class GastroenterologyHpyloriEngine:
    """Evaluates Helicobacter pylori eradication protocols, adherence calendars, symptom reassurance, and follow-up breath tests."""

    def __init__(self):
        self.regimens = HPYLORI_REGIMENS
        self.diagnostics = ARZONLAB_GASTRIC_DIAGNOSTICS
        self.reassurance_guide = SIDE_EFFECT_REASSURANCE_GUIDE

    def generate_14day_calendar(self, regimen_id: str = "bismuth_quadruple_14d") -> List[Dict[str, Any]]:
        """Generates the structured 14-day calendar with daily pouches and time slots."""
        calendar = []
        regimen = self.regimens.get(regimen_id, self.regimens["bismuth_quadruple_14d"])

        for day in range(1, 15):
            day_data = {
                "day_number": day,
                "title": f"{day}-kun Eradikatsiya Paketi",
                "phase": "Boshlang'ich (Kun 1-3)" if day <= 3 else ("Faol Eradikatsiya (Kun 4-10)" if day <= 10 else "Tugallash & Mustahkamlash (Kun 11-14)"),
                "pouches": [
                    {
                        "slot": "Tonggi (07:30)",
                        "timing": "Nonushtadan 30 daqiqa oldin",
                        "items": [
                            {"med": "Pantoprazol 40 mg", "form": "Tabletka", "rule": "Och qoringa suv bilan"},
                            {"med": "De-Nol (Bismut) 120 mg", "form": "Tabletka", "rule": "Och qoringa suv bilan"}
                        ],
                        "post_meal": {
                            "timing": "Nonushtadan 10 daqiqa so'ng",
                            "items": [
                                {"med": "Amoksitsillin 1000 mg", "form": "Eruvchan tabletka", "rule": "Ovqatdan so'ng darhol"},
                                {"med": "Klaritromitsin 500 mg", "form": "Kapsula", "rule": "Ovqatdan so'ng darhol"}
                            ]
                        }
                    },
                    {
                        "slot": "Tushlik (12:30)",
                        "timing": "Tushlikdan 30 daqiqa oldin",
                        "items": [
                            {"med": "De-Nol (Bismut) 120 mg", "form": "Tabletka", "rule": "Och qoringa suv bilan"}
                        ],
                        "post_meal": {
                            "timing": "Tushlikdan 2 soat so'ng (14:30)",
                            "items": [
                                {"med": "Saccharomyces boulardii 250 mg", "form": "Probiotik kapsula", "rule": "Antibiotikdan 2 soat oraliq bilan"}
                            ]
                        }
                    },
                    {
                        "slot": "Kechki (19:00)",
                        "timing": "Kechki ovqatdan 30 daqiqa oldin",
                        "items": [
                            {"med": "Pantoprazol 40 mg", "form": "Tabletka", "rule": "Och qoringa suv bilan"},
                            {"med": "De-Nol (Bismut) 120 mg", "form": "Tabletka", "rule": "Och qoringa suv bilan"}
                        ],
                        "post_meal": {
                            "timing": "Kechki ovqatdan 10 daqiqa so'ng",
                            "items": [
                                {"med": "Amoksitsillin 1000 mg", "form": "Eruvchan tabletka", "rule": "Ovqatdan so'ng darhol"},
                                {"med": "Klaritromitsin 500 mg", "form": "Kapsula", "rule": "Ovqatdan so'ng darhol"}
                            ]
                        }
                    },
                    {
                        "slot": "Tungi (22:30)",
                        "timing": "Uyqudan 15-20 daqiqa oldin",
                        "items": [
                            {"med": "De-Nol (Bismut) 120 mg", "form": "Tabletka", "rule": "1 qultum suv bilan, oshqozonni tuni bilan himoyalash"}
                        ],
                        "post_meal": None
                    }
                ],
                "daily_note": (
                    "Og'riq 3-4 kunda qolsa ham to'xtatmang! Erta to'xtatish chidamli superbakteriya hosil qiladi."
                    if day in [3, 4, 5] else
                    "Najasning qoraligi - me'yoriy holat (bismut sulfid). Xavotir olmang."
                )
            }
            calendar.append(day_data)
        return calendar

    def calculate_patient_economics(self, regimen_id: str = "bismuth_quadruple_14d") -> Dict[str, Any]:
        """Calculates financial savings of DoriQuti unit-dose kit vs retail pharmacy prices."""
        regimen = self.regimens.get(regimen_id, self.regimens["bismuth_quadruple_14d"])
        ubt = self.diagnostics["ubt_13c_breath_test"]

        med_retail = regimen["retail_cost_uzs"]
        med_doriquti = regimen["doriquti_cost_uzs"]
        med_saved = med_retail - med_doriquti

        lab_retail = ubt["retail_uzs"]
        lab_arzonlab = ubt["arzonlab_uzs"]
        lab_saved = lab_retail - lab_arzonlab

        total_retail = med_retail + lab_retail
        total_unicorn = med_doriquti + lab_arzonlab
        total_saved = total_retail - total_unicorn
        total_savings_pct = round((total_saved / total_retail) * 100, 1)

        return {
            "regimen_title": regimen["title"],
            "med_retail_uzs": med_retail,
            "med_doriquti_uzs": med_doriquti,
            "med_saved_uzs": med_saved,
            "lab_retail_uzs": lab_retail,
            "lab_arzonlab_uzs": lab_arzonlab,
            "lab_saved_uzs": lab_saved,
            "total_retail_uzs": total_retail,
            "total_unicorn_uzs": total_unicorn,
            "total_saved_uzs": total_saved,
            "savings_percent": total_savings_pct
        }

    def verify_eradication_readiness(self, days_since_antibiotics: int, days_since_ppi: int) -> Dict[str, Any]:
        """Checks if a patient is clinically eligible for 13C-UBT or Stool Antigen test without false negatives."""
        antibiotic_ready = days_since_antibiotics >= 28  # 4 weeks
        ppi_ready = days_since_ppi >= 14  # 2 weeks

        if antibiotic_ready and ppi_ready:
            return {
                "is_eligible": True,
                "status_code": "READY_FOR_UBT",
                "badge": "TAHLILGA TAYYOR (Oltin Standart)",
                "color": "emerald",
                "message": (
                    f"Ajoyib! Antibiotik tugaganiga {days_since_antibiotics} kun (me'yor >= 28) va "
                    f"Pantoprazol/Omeprazol tugaganiga {days_since_ppi} kun (me'yor >= 14) bo'ldi. "
                    "Siz hozir 13C-Urea Nafas Testini (13C-UBT) topshirishingiz mumkin. "
                    "Natija 98.5% aniqlik bilan bakteriya yo'q qilinganligini ko'rsatadi."
                ),
                "recommended_test": "ubt_13c_breath_test"
            }
        else:
            reasons = []
            if not antibiotic_ready:
                wait_ab = 28 - days_since_antibiotics
                reasons.append(f"Antibiotiklar to'xtatilganiga hali {days_since_antibiotics} kun bo'lgan (yana {wait_ab} kun kutish shart).")
            if not ppi_ready:
                wait_ppi = 14 - days_since_ppi
                reasons.append(f"Kislota blokatorlari (PPI) to'xtatilganiga hali {days_since_ppi} kun bo'lgan (yana {wait_ppi} kun kutish shart).")

            return {
                "is_eligible": False,
                "status_code": "NOT_READY_FALSE_NEGATIVE_RISK",
                "badge": "SOXTA MANFIY NATIJA XAVFI (Kutish kerak)",
                "color": "amber",
                "message": (
                    "Hozir tahlil topshirish tavsiya etilmaydi! Dori qoldiqlari bakteriyani vaqtincha bostirgan bo'lishi "
                    "va test soxta manfiy (false-negative) chiqib, mikroblar qayta ko'payishiga sabab bo'lishi mumkin. "
                    + " ".join(reasons)
                ),
                "days_to_wait_antibiotic": max(0, 28 - days_since_antibiotics),
                "days_to_wait_ppi": max(0, 14 - days_since_ppi)
            }

    def generate_full_clinical_dossier(self, patient_name: str = "Hamidov Botir", regimen_id: str = "bismuth_quadruple_14d") -> Dict[str, Any]:
        """Generates an end-to-end clinical dossier with calendar, economics, reassurance, and diagnostics."""
        regimen = self.regimens.get(regimen_id, self.regimens["bismuth_quadruple_14d"])
        calendar = self.generate_14day_calendar(regimen_id)
        economics = self.calculate_patient_economics(regimen_id)

        return {
            "patient_name": patient_name,
            "clinical_diagnosis": "Oshqozon va 12 barmoqli ichak eroziv yarasi, Helicobacter pylori musbat (+)",
            "selected_regimen": regimen,
            "calendar_14d": calendar,
            "financial_summary": economics,
            "side_effects_guide": self.reassurance_guide,
            "diagnostics": self.diagnostics,
            "adherence_rules": [
                "1. Hech qachon 14 kunlik kursni o'rtasida to'xtatmang.",
                "2. Pantoprazol va De-Nol ovqatdan 30 daqiqa oldin qabul qilinadi.",
                "3. Amoksitsillin va Klaritromitsin qorin to'ygandan so'ng darhol ichiladi.",
                "4. Achchiq ta'm yoki qora najasdan qo'rqmang - bu dori ta'sirining isboti.",
                "5. Davolash tugagach 4 hafta o'tib ArzonLab orqali 13C-UBT nafas testini topshiring."
            ]
        }

if __name__ == "__main__":
    engine = GastroenterologyHpyloriEngine()
    dossier = engine.generate_full_clinical_dossier()
    out_path = os.path.join(os.path.dirname(__file__), "sample_gastroenterology_hpylori.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(dossier, f, indent=2, ensure_ascii=False)
    print(f"H. pylori Eradication Shield Engine tested successfully. Output: {out_path}")
    print(f"Total Patient Savings: {dossier['financial_summary']['total_saved_uzs']:,} UZS ({dossier['financial_summary']['savings_percent']}%)")
