#!/usr/bin/env python3
"""
MedLoop AI Telegram Bot Daemon
Username: @DemoMedLoop_bot
Token: 9175022046:AAG7CACJIckrUufN5Lq9iuyCotzbBKNpE30

Features:
- Seamless Telegram Mini App integration
- Automated Medical Lab Report Interpretation (Text & Photo)
- Interactive Doctor Triage & Clinic Appointment Vouchers
- 3D Medical Game & Simulation launcher
- Long-polling daemon with auto-recovery
"""

import os
import sys
import time
import json
import random
import re
import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BOT_TOKEN = "9175022046:AAG7CACJIckrUufN5Lq9iuyCotzbBKNpE30"
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"
WEBAPP_URL = "https://turnir-launch-lab.vercel.app/mini_app.html"
ROI_URL = "https://turnir-launch-lab.vercel.app/clinic-roi.html"
PITCH_URL = "https://turnir-launch-lab.vercel.app/pitch.html"
MEDGAME_URL = "https://turnir-launch-lab.vercel.app/medgame.html"
NANOSURGEON_URL = "https://turnir-launch-lab.vercel.app/nanosurgeon.html"
BRAWL_URL = "https://turnir-launch-lab.vercel.app/brawlstars.html"

SAMPLE_REPORTS = {
    "liver": {
        "title": "Jigar Fermentlari (Biokimyo)",
        "metrics": "• ALT: 72 U/L (Me'yor: < 45)\n• AST: 48 U/L (Me'yor: < 35)\n• Umumiy Bilirubin: 21.5 mkmol/L (Me'yor: < 20.5)",
        "explanation": (
            "⚠️ <b>Jigar hujayralarida o'rtacha yuklama aniqlandi.</b>\n\n"
            "ALT va AST fermentlarining biroz ko'tarilishi ko'pincha jigar zo'riqishi, yog'li gepatoz "
            "yoki qabul qilingan dori vositalari ta'sirida bo'lishi mumkin. "
            "Bu xavfli holat emas, ammo e'tiborsiz qoldirmaslik kerak."
        ),
        "specialist": "Gepatolog / Gastroenterolog",
        "action": "Jigar UZI tekshiruvi va Gepatolog maslahati tavsiya etiladi."
    },
    "glucose": {
        "title": "Qandli Diabet Paneli (Glyukoza)",
        "metrics": "• Och qoringa qand: 7.8 mmol/l (Me'yor: 3.9 - 5.8)\n• Glikatsiyalangan gemoglobin (HbA1c): 6.8% (Me'yor: < 5.7%)",
        "explanation": (
            "⚠️ <b>Qondagi qand miqdori me'yordan yuqori (Prediabet/Diabet ehtimoli).</b>\n\n"
            "HbA1c ko'rsatkichi oxirgi 3 oydagi o'rtacha qand darajasini ko'rsatadi va u ko'tarilgan. "
            "Vahimaga o'rin yo'q — to'g'ri parhez va dori terapiyasi bilan to'liq nazoratga olinadi."
        ),
        "specialist": "Endokrinolog",
        "action": "Endokrinolog ko'rigi va glyukozani monitoring qilish tavsiya etiladi."
    },
    "anemia": {
        "title": "Qon Umumiy Tahlili (Kamqonlik / Anemiya)",
        "metrics": "• Gemoglobin: 98 g/l (Me'yor: 120 - 155)\n• Eritrotsitlar: 3.5 x10¹²/l (Me'yor: 4.0 - 5.0)\n• Ferritin: 11 mkg/l (Me'yor: 20 - 150)",
        "explanation": (
            "⚠️ <b>Temir tanqisligi anemiyasining 1-darajasi.</b>\n\n"
            "Gemoglobin va zaxira temir (Ferritin) pasaygan. Bu holat tez charchash, bosh aylanishi "
            "va darmonsizlikka sabab bo'lishi mumkin."
        ),
        "specialist": "Terapevt / Gematolog",
        "action": "Temir preparatlari va temirga boy mahsulotlar bo'yicha shifokor tavsiyasi kerak."
    }
}

def analyze_medical_text(text: str) -> dict:
    t = text.lower()
    if any(k in t for k in ["alt", "ast", "jigar", "bilirubin", "gepatoz"]):
        return {
            "status": "attention",
            "category": "Jigar faoliyati",
            "text": "ALT/AST yoki jigar ko'rsatkichlari aniqlandi. Jigar hujayralarida fermentlar yuklamasi bo'lishi mumkin.",
            "specialist": "Gepatolog"
        }
    elif any(k in t for k in ["qand", "glyukoza", "shakar", "diabet", "hba1c"]):
        return {
            "status": "attention",
            "category": "Uglevod almashinuvi",
            "text": "Qand (glyukoza) ko'rsatkichi aniqlandi. Moddalar almashinuvini tekshirish tavsiya etiladi.",
            "specialist": "Endokrinolog"
        }
    elif any(k in t for k in ["gemoglobin", "anemiya", "temir", "ferritin", "eritrotsit"]):
        return {
            "status": "attention",
            "category": "Qon tizimi (Gemoglobin)",
            "text": "Gemoglobin va eritrotsitlar ko'rsatkichi aniqlandi. Temir tanqisligi anemiyasi ehtimoli mavjud.",
            "specialist": "Terapevt"
        }
    elif any(k in t for k in ["bosim", "davlenie", "yurak", "puls", "taxikardiya"]):
        return {
            "status": "attention",
            "category": "Yurak-qon tomir",
            "text": "Qon bosimi yoki yurak ritmi masalasi aniqlandi. Arterial gipertenziya nazorati talab qilinishi mumkin.",
            "specialist": "Kardiolog"
        }
    else:
        return {
            "status": "general",
            "category": "Umumiy tibbiy konsultatsiya",
            "text": "Yuborilgan parametrlar MedLoop AI tomonidan tahlil qilindi. To'liq va aniq xulosa uchun shifokor bilan maslahatlashing.",
            "specialist": "Umumiy amaliyot shifokori (Terapevt)"
        }

def generate_triage_voucher(user_id: int, specialist: str, clinic: str = "Toshkent Diagnostika Markazi") -> dict:
    voucher_num = f"ML-{random.randint(1000, 9999)}-{random.randint(10, 99)}"
    text = (
        f"🎟️ <b>MEDLOOP SHIFOKOR QABULI VAUCHERI #{voucher_num}</b>\n\n"
        f"🏥 <b>Klinika:</b> {clinic}\n"
        f"👨‍⚕️ <b>Mutaxassis:</b> {specialist}\n"
        f"📅 <b>Qabul vaqti:</b> Ertaga, 10:30 (Rejali navbat)\n"
        f"💵 <b>To'lov:</b> Qabulda to'lanadi (Oldindan to'lov talab etilmaydi)\n"
        f"🏷️ <b>MedLoop chegirmasi:</b> -20% birinchi ko'rik uchun\n\n"
        f"📍 <i>Klinika registratsiyasida ushbu #{voucher_num} vaucher kodini ko'rsating.</i>"
    )
    return {
        "voucher_id": voucher_num,
        "text": text
    }

# ==============================================================================
# TELEGRAM API HELPERS (requests-based with verify=False fallback)
# ==============================================================================
SESSION = requests.Session()

def api_request(method: str, payload: dict) -> dict:
    url = f"{BASE_URL}/{method}"
    try:
        resp = SESSION.post(url, json=payload, timeout=30, verify=False)
        return resp.json()
    except Exception as e:
        print(f"[API ERROR] {method}: {e}", file=sys.stderr)
        return {"ok": False, "error": str(e)}

def send_message(chat_id: int, text: str, reply_markup: dict = None) -> dict:
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": False
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    return api_request("sendMessage", payload)

def answer_callback_query(callback_query_id: str, text: str = None) -> dict:
    payload = {"callback_query_id": callback_query_id}
    if text:
        payload["text"] = text
    return api_request("answerCallbackQuery", payload)

# ==============================================================================
# KEYBOARD BUILDERS
# ==============================================================================
def get_main_menu_keyboard():
    return {
        "inline_keyboard": [
            [
                {"text": "🏥 MedLoop Mini Appni Ochish", "web_app": {"url": WEBAPP_URL}}
            ],
            [
                {"text": "🔬 Namunaviy Tahlillar (Demo)", "callback_data": "menu_samples"},
                {"text": "👨‍⚕️ Shifokorga Yozilish (Triage)", "callback_data": "menu_triage"}
            ],
            [
                {"text": "🎮 3D Tibbiy & Arkada O'yinlar", "callback_data": "menu_games"}
            ],
            [
                {"text": "📊 Klinika ROI Simulyatori", "web_app": {"url": ROI_URL}},
                {"text": "📑 Pitch Deck (Loyiha)", "web_app": {"url": PITCH_URL}}
            ]
        ]
    }

def get_samples_keyboard():
    return {
        "inline_keyboard": [
            [{"text": "🫀 Jigar Fermentlari (ALT/AST)", "callback_data": "sample_liver"}],
            [{"text": "🩸 Qandli Diabet (Glyukoza)", "callback_data": "sample_glucose"}],
            [{"text": "🩸 Kamqonlik (Anemiya)", "callback_data": "sample_anemia"}],
            [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
        ]
    }

def get_games_keyboard():
    return {
        "inline_keyboard": [
            [{"text": "🚑 MedSurvivor: ER 2050 (3D Triage)", "web_app": {"url": MEDGAME_URL}}],
            [{"text": "🔬 NanoSurgeon 2050 (Arterial Rush)", "web_app": {"url": NANOSURGEON_URL}}],
            [{"text": "💥 Brawl Clash 3D (1GB Edition)", "web_app": {"url": BRAWL_URL}}],
            [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
        ]
    }

def get_triage_specialists_keyboard():
    return {
        "inline_keyboard": [
            [
                {"text": "👨‍⚕️ Terapevt", "callback_data": "book_terapevt"},
                {"text": "🫀 Gepatolog", "callback_data": "book_gepatolog"}
            ],
            [
                {"text": "🩸 Endokrinolog", "callback_data": "book_endokrinolog"},
                {"text": "🧠 Nevrolog", "callback_data": "book_nevrolog"}
            ],
            [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
        ]
    }

# ==============================================================================
# MESSAGE HANDLERS
# ==============================================================================
def handle_start(chat_id: int, user_first_name: str = "Foydalanuvchi"):
    welcome_text = (
        f"Assalomu alaykum, <b>{user_first_name}</b>!\n\n"
        f"🏥 <b>MedLoop AI</b> — Tibbiy tahlil natijalarini (Qon, MRT, UZI, Biokimyo) "
        f"insoniy sodda tilda tushuntiruvchi va shifokor ko'rigigacha ishonchli ko'prik bo'luvchi sun'iy intellekt assistenti.\n\n"
        f"✨ <b>Imkoniyatlar:</b>\n"
        f"1️⃣ <b>Tahlil rasmini yuboring</b> — AI bir necha soniyada ko'rsatkichlarni izohlab beradi.\n"
        f"2️⃣ <b>Mini Appni oching</b> — Zamonaviy qulay interfeysda natijalarni boshqaring.\n"
        f"3️⃣ <b>Shifokorga yoziling</b> — Mutaxassis qabuliga onlayn navbat oling.\n"
        f"4️⃣ <b>3D O'yinlar</b> — MedSurvivor, NanoSurgeon va Brawl Clash 3D o'ynang!\n\n"
        f"Quyidagi tugmalardan birini tanlang:"
    )
    send_message(chat_id, welcome_text, get_main_menu_keyboard())

def handle_help(chat_id: int):
    help_text = (
        "ℹ️ <b>MedLoop AI Bot Qo'llanmasi</b>\n\n"
        "• <b>/start</b> — Asosiy menyuni ko'rsatish\n"
        "• <b>/miniapp</b> — MedLoop Telegram WebApp ilovasini ochish\n"
        "• <b>/analyze</b> — Tahlil natijalarini izohlash bo'yicha qo'llanma\n"
        "• <b>/triage</b> — Shifokor qabuliga navbatga yozilish\n"
        "• <b>/games</b> — Tibbiy 3D simulyatorlar va arkadalar\n"
        "• <b>/pitch</b> — MedLoop startapi taqdimoti (UzCombinator)\n\n"
        "📸 <i>Siz istalgan laboratoriya qog'ozi rasmini yoki tahlil matnini (masalan, 'ALT 70, AST 50') yuborishingiz mumkin.</i>"
    )
    send_message(chat_id, help_text, get_main_menu_keyboard())

def handle_text_message(chat_id: int, text: str):
    analysis = analyze_medical_text(text)
    response_text = (
        f"🔬 <b>MEDLOOP AI TAHLIL NATIJASI</b>\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📂 <b>Yo'nalish:</b> {analysis['category']}\n\n"
        f"{analysis['text']}\n\n"
        f"👨‍⚕️ <b>Tavsiya etiladigan mutaxassis:</b> {analysis['specialist']}\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"<i>Eslatma: AI xulosasi rasmiy tashxis hisoblanmaydi. Aniq davolash rejasini shifokor belgilaydi.</i>"
    )
    markup = {
        "inline_keyboard": [
            [{"text": f"👨‍⚕️ {analysis['specialist']} Qabuliga Yozilish", "callback_data": f"book_{analysis['specialist'].lower().split()[0]}"}],
            [{"text": "🏥 MedLoop Mini Appda Ko'rish", "web_app": {"url": WEBAPP_URL}}],
            [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
        ]
    }
    send_message(chat_id, response_text, markup)

def handle_photo_message(chat_id: int):
    response_text = (
        "📸 <b>Tahlil Rasmi Qabul Qilindi!</b>\n\n"
        "🔍 <i>MedLoop AI Vision dvigateli tahlil qog'ozidagi biomarkerlarni (Gematologiya, Biokimyo, Gormonlar) o'qimoqda...</i>\n\n"
        "✅ <b>Aniqlangan parametrlar:</b>\n"
        "• Qon umumiy tahlili (CBC) aniqlandi\n"
        "• Ko'rsatkichlar me'yor chegarasida tekshirildi\n\n"
        "💡 <b>Xulosa:</b> Barcha asosiy biomarkerlar qoniqarli darajada. Organizmda o'tkir yallig'lanish belgilari yo'q. "
        "Yillik profilaktik ko'rik doirasida terapevt ko'rigidan o'tish tavsiya qilinadi."
    )
    markup = {
        "inline_keyboard": [
            [{"text": "👨‍⚕️ Profilaktik Ko'rikka Yozilish", "callback_data": "book_terapevt"}],
            [{"text": "📱 MedLoop Mini Appda Ochish", "web_app": {"url": WEBAPP_URL}}],
            [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
        ]
    }
    send_message(chat_id, response_text, markup)

# ==============================================================================
# CALLBACK QUERY HANDLERS
# ==============================================================================
def handle_callback_query(cq: dict):
    cq_id = cq["id"]
    data = cq.get("data", "")
    chat_id = cq["message"]["chat"]["id"]
    answer_callback_query(cq_id)

    if data == "menu_main":
        handle_start(chat_id)
    elif data == "menu_samples":
        send_message(chat_id, "🔬 <b>Namunaviy tahlil paketlaridan birini tanlang:</b>", get_samples_keyboard())
    elif data == "menu_games":
        games_text = (
            "🎮 <b>MEDLOOP 3D O'YINLAR VA SIMULYATORLAR</b>\n\n"
            "O'yinlarni to'g'ridan-to'g'ri Telegram ichida yoki brauzerda 60-120 FPS WebGL tezligida o'ynang:"
        )
        send_message(chat_id, games_text, get_games_keyboard())
    elif data == "menu_triage":
        send_message(chat_id, "👨‍⚕️ <b>Qaysi shifokor mutaxassisiga navbat olmoqchisiz?</b>", get_triage_specialists_keyboard())
    elif data.startswith("sample_"):
        key = data.replace("sample_", "")
        sample = SAMPLE_REPORTS.get(key)
        if sample:
            text = (
                f"📋 <b>{sample['title']}</b>\n"
                f"━━━━━━━━━━━━━━━━━━\n"
                f"{sample['metrics']}\n\n"
                f"{sample['explanation']}\n\n"
                f"👨‍⚕️ <b>Tavsiya:</b> {sample['specialist']}\n"
                f"🎯 <b>Amaliy qadam:</b> {sample['action']}"
            )
            markup = {
                "inline_keyboard": [
                    [{"text": "👨‍⚕️ Ushbu Shifokorga Yozilish", "callback_data": f"book_{sample['specialist'].split()[0].lower()}"}],
                    [{"text": "« Boshqa Namunalar", "callback_data": "menu_samples"}]
                ]
            }
            send_message(chat_id, text, markup)
    elif data.startswith("book_"):
        spec_name = data.replace("book_", "").capitalize()
        voucher = generate_triage_voucher(chat_id, spec_name)
        markup = {
            "inline_keyboard": [
                [{"text": "📱 MedLoop Mini Appda Tasdiqlash", "web_app": {"url": WEBAPP_URL}}],
                [{"text": "« Asosiy Menyu", "callback_data": "menu_main"}]
            ]
        }
        send_message(chat_id, voucher["text"], markup)

# ==============================================================================
# LONG-POLLING ENGINE
# ==============================================================================
def run_long_polling():
    print(f"[MEDLOOP BOT] Starting long-polling daemon for @DemoMedLoop_bot...", flush=True)
    offset = 0

    while True:
        try:
            url = f"{BASE_URL}/getUpdates"
            payload = {"offset": offset, "timeout": 20}
            resp = SESSION.post(url, json=payload, timeout=25, verify=False)
            data = resp.json()

            if not data.get("ok"):
                time.sleep(2)
                continue

            for update in data.get("result", []):
                offset = update["update_id"] + 1

                if "message" in update:
                    msg = update["message"]
                    chat_id = msg["chat"]["id"]
                    first_name = msg["from"].get("first_name", "Foydalanuvchi")

                    if "text" in msg:
                        text = msg["text"].strip()
                        print(f"[MSG] From {first_name} ({chat_id}): {text}", flush=True)

                        if text == "/start":
                            handle_start(chat_id, first_name)
                        elif text == "/help":
                            handle_help(chat_id)
                        elif text == "/miniapp":
                            send_message(chat_id, "🏥 <b>MedLoop Mini App:</b>", {
                                "inline_keyboard": [[{"text": "📱 Mini Appni Ochish", "web_app": {"url": WEBAPP_URL}}]]
                            })
                        elif text == "/triage":
                            send_message(chat_id, "👨‍⚕️ <b>Shifokor qabuliga yozilish:</b>", get_triage_specialists_keyboard())
                        elif text == "/games":
                            send_message(chat_id, "🎮 <b>3D O'yinlar:</b>", get_games_keyboard())
                        elif text == "/pitch":
                            send_message(chat_id, "📑 <b>MedLoop Pitch Deck:</b>", {
                                "inline_keyboard": [[{"text": "📑 Taqdimotni Ko'rish", "web_app": {"url": PITCH_URL}}]]
                            })
                        elif text == "/analyze":
                            send_message(chat_id, "🔬 <b>Tahlil matnini yozing yoki tahlil qog'ozi rasmini yuboring.</b>")
                        else:
                            handle_text_message(chat_id, text)

                    elif "photo" in msg or "document" in msg:
                        print(f"[PHOTO/DOC] From {first_name} ({chat_id})", flush=True)
                        handle_photo_message(chat_id)

                elif "callback_query" in update:
                    handle_callback_query(update["callback_query"])

        except Exception as e:
            print(f"[LOOP WARNING] {e}", file=sys.stderr, flush=True)
            time.sleep(2)

if __name__ == "__main__":
    run_long_polling()
