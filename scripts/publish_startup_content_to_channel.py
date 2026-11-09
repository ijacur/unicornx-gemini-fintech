#!/usr/bin/env python3
"""
MedLoop AI Startup Content Publisher for @succesmotiv Channel
Publishes deep, high-converting startup case studies, vision docs, and founder insights.
"""

import requests
import time
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

TOKEN = "9175022046:AAG7CACJIckrUufN5Lq9iuyCotzbBKNpE30"
CHAT_ID = "-1001779158271" # @succesmotiv
BASE_URL = f"https://api.telegram.org/bot{TOKEN}"

STARTUP_POSTS = [
    {
        "id": 1,
        "title": "Muammo va Missiya",
        "text": (
            "🚀 <b>STARTAP KEYS: MEDLOOP AI — TIBBIYOTDAGI YANGI DAVR</b>\n\n"
            "<i>\"Har bir yangi boshlanish zamirida katta muammoni hal qilish istagi yotadi.\"</i>\n\n"
            "Har yili O‘zbekistonda <b>12 000 000 dan ortiq</b> laboratoriya tahlillari topshiriladi. Ammo odamlar laboratoriya qog‘ozini qo‘lga olgach nima bo‘ladi?\n\n"
            "❌ <b>87% bemor murakkab tibbiy atamalarni tushunmaydi:</b>\n"
            "1. Yoki tushunmasdan vahimaga tushadi va internetdan o‘zboshimchalik bilan noto‘g‘ri dori ichib, o‘zini zaharlaydi;\n"
            "2. Yoki aksincha, jiddiy kasallik belgilarini oddiy deb hisoblab, shifokor ko‘rigini oylarga kechiktiradi.\n\n"
            "Klinikalar esa bemorlarni jalb qilish uchun millionlab so‘mlik qimmat reklama xarajatlariga duch kelmoqda.\n\n"
            "━━━━━━━━━━━━━━━━━━━\n"
            "💡 <b>BIZNING YECHIM: MEDLOOP AI STARTAPI</b>\n\n"
            "<b>MedLoop AI</b> — laboratoriya tahlillari (qon, MRT, UZI, biokimyo) natijalarini <b>1.8 soniyada insoniy, sodda o‘zbek tilida</b> tushuntirib, bemorni to‘g‘ri mutaxassisga yo‘naltiruvchi innovatsion sun’iy intellekt ko‘prigi.\n\n"
            "🔹 <b>Bemorlar uchun:</b> Tahlilni tushunish va qabulga navbat olish 100% BEPUL.\n"
            "🔹 <b>Klinikalar uchun:</b> Yangi bemorlarni jalb qilish xarajatini (CAC) 60% ga qisqartiruvchi B2B Triage tizimi.\n\n"
            "🏆 <i>UzCombinator Season 3 akselerator dasturi doirasida Toshkent va Samarqand klinikalari bilan pilot hamkorlik yo‘lga qo‘yildi.</i>\n\n"
            "🌐 <b>Batafsil keys va loyiha:</b> https://turnir-launch-lab.vercel.app/article.html\n\n"
            "#MedLoop #Startap #Innovatsiya #HealthTech #Success"
        ),
        "buttons": [
            [{"text": "📖 MedLoop Keysini O‘qish", "url": "https://turnir-launch-lab.vercel.app/article.html"}],
            [{"text": "📑 Pitch Deck (Taqdimot)", "url": "https://turnir-launch-lab.vercel.app/pitch.html"}]
        ]
    },
    {
        "id": 2,
        "title": "Biznes Modeli va Unit Economics",
        "text": (
            "💼 <b>STARTAP BIZNES MODELI: QANDAY QILIB MEDLOOP DAROMAD KELTIRADI?</b>\n\n"
            "Ko‘pchilik so‘raydi: <i>\"Agar bemor uchun xizmat 100% bepul bo‘lsa, startap qanday pul ishlaydi?\"</i>\n\n"
            "Bu — zamonaviy <b>B2B2C Success-Fee</b> modelidir:\n\n"
            "📊 <b>1. Klinikalar og‘rig‘i:</b>\n"
            "Bugungi kunda xususiy klinika yoki laboratoriya bitta yangi bemorni o‘ziga jalb qilish (CAC) uchun o‘rtacha <b>40 000 – 60 000 so‘m</b> sarflaydi (Instagram, reklama, agentlar).\n\n"
            "🤝 <b>2. MedLoop yechimi:</b>\n"
            "Biz laboratoriya tahlilini topshirgan va aniq mutaxassisga ehtiyoji bo‘lgan bemorni (masalan, jigar fermenti yuqori chiqqan odamni Gepatologga) to‘g‘ri klinikaga yo‘naltiramiz.\n\n"
            "💵 <b>3. Monetizatsiya:</b>\n"
            "Klinika faqatgina bemor qabulga kelib, ko‘rikdan o‘tgandan keyin MedLoop ga kichik <b>Success Fee (15 000 – 20 000 so‘m)</b> to‘laydi. Klinika o‘z CAC xarajatini 60% tejaydi, MedLoop esa har bir ko‘rikdan daromad oladi!\n\n"
            "📈 <b>Oylik Reja (Samarqand + Toshkent):</b>\n"
            "• 5 000 ta yo‘naltirilgan ko‘rik × 18 000 so‘m = <b>90 000 000 so‘m / oyiga</b> sof daromad.\n\n"
            "💡 <i>Muvaffaqiyat — boshqalarga arzonroq, tezroq va sifatliroq yechim bera olishda!</i>\n\n"
            "🌐 <b>Klinika ROI hisoblagichi:</b> https://turnir-launch-lab.vercel.app/clinic-roi.html\n\n"
            "#BiznesModel #Startap #UnitEconomics #UzbekistanTech"
        ),
        "buttons": [
            [{"text": "📊 Klinika ROI Simulyatori", "url": "https://turnir-launch-lab.vercel.app/clinic-roi.html"}],
            [{"text": "📱 MedLoop WebApp", "url": "https://turnir-launch-lab.vercel.app/mini_app.html"}]
        ]
    },
    {
        "id": 3,
        "title": "Sun'iy Intellekt va Xavfsizlik",
        "text": (
            "🧠 <b>MEDLOOP AI KAPOTI OSTIDA: TIBBIY XATOSIZLIK STANDARTI (ZERO-HALLUCINATION)</b>\n\n"
            "Tibbiyot — bu xatoni kechirmaydigan soha. Oddiy ChatGPT yoki LLM modellari ba’zan \"gallyutsinatsiya\" qilishi (mavjud bo‘lmagan narsani to‘qib chiqarishi) mumkin.\n\n"
            "<b>MedLoop AI qanday qilib 100% ishonchlilikka erishdi?</b>\n\n"
            "🛡️ <b>1. Tibbiy Cheklovlar (Medical Guardrails):</b>\n"
            "MedLoop hech qachon retsept bermaydi va o‘zboshimchalik bilan dori yozmaydi! U faqat laboratoriya referens me’yorlarini xalqaro standartlar (WHO, IFCC) asosida solishtiradi.\n\n"
            "🔬 <b>2. Vision OCR texnologiyasi:</b>\n"
            "Bemor laboratoriyadan olgan qog‘ozini rasmga olganda, OCR algoritmlari harflar va sonlarni filtrlab, faqat tasdiqlangan biomarkerlarni ajratib oladi.\n\n"
            "⚡️ <b>3. Tezlik va Aniqlik:</b>\n"
            "Tahlil natijasi <b>1.8 soniyada</b> bemor tilida ekranga chiqadi. Hech qanday murakkab lotincha atamalarsiz — sodda, samimiy va xotirjam tushuntirish.\n\n"
            "<i>\"Texnologiya insonlarni qo‘rqitmasligi, balki ularning hayotini asrashi lozim.\"</i>\n\n"
            "🌐 <b>Ilmiy keys:</b> https://turnir-launch-lab.vercel.app/article.html\n\n"
            "#SuniyIntellekt #Tibbiyot #AI #MedLoop #Uzbekistan"
        ),
        "buttons": [
            [{"text": "🔬 Tahlil Tizimi bilan Tanishing", "url": "https://turnir-launch-lab.vercel.app/reception.html"}]
        ]
    },
    {
        "id": 4,
        "title": "Geymifikatsiya va 3D Simulyatorlar",
        "text": (
            "🎮 <b>STARTAPDA GEYMIFIKATSIYA: NEGA BIZ 3D O‘YINLAR VA SIMULYATORLAR YARATDIK?</b>\n\n"
            "Biz odatiy zerikarli tibbiy ilovalardan farqli yo‘lni tanladik.\n\n"
            "MedLoop ekotizimida <b>shoshilinch tibbiy yordam madaniyatini</b> o‘rgatuvchi 3D arkadalar va simulyatorlar yaratildi:\n\n"
            "🚑 <b>1. MedSurvivor: ER 2050 (3D Triage Simulator)</b>\n"
            "Qabul bo‘limiga kelayotgan bemorlarni tezkorlik bilan toifalarga (Qizil, Sariq, Yashil) ajratish simulyatori. WebGL Three.js 60 FPS!\n\n"
            "🔬 <b>2. NanoSurgeon 2050 (Arterial Rush)</b>\n"
            "Qon tomirlari bo‘ylab harakatlanuvchi nanorobot boshqaruvi. Tromblar va viruslarni yo‘q qilib, kislorod hujayralarini yig‘ish arkadasi.\n\n"
            "💥 <b>3. Brawl Clash 3D (1GB Ultimate Edition)</b>\n"
            "Supercell, Roblox va Yandex Games mexanikalarini birlashtirgan birinchi o‘zbek 3D kiber-jang arenasi!\n\n"
            "🕹️ <i>Geymifikatsiya yoshlarni profilaktika va sog‘liqni saqlashga qiziqtirishning eng kuchli qurolidir.</i>\n\n"
            "🌐 <b>O‘yinlarni bepul o‘ynab ko‘ring:</b>\n"
            "• MedSurvivor: https://turnir-launch-lab.vercel.app/medgame.html\n"
            "• NanoSurgeon: https://turnir-launch-lab.vercel.app/nanosurgeon.html\n"
            "• Brawl Clash 3D: https://turnir-launch-lab.vercel.app/brawlstars.html\n\n"
            "#Geymifikatsiya #3DGames #MedSurvivor #BrawlStars #Roblox"
        ),
        "buttons": [
            [{"text": "🚑 MedSurvivor 3D", "url": "https://turnir-launch-lab.vercel.app/medgame.html"}],
            [{"text": "💥 Brawl Clash 3D", "url": "https://turnir-launch-lab.vercel.app/brawlstars.html"}]
        ]
    },
    {
        "id": 5,
        "title": "Asoschi Manifesti va Muvaffaqiyat Falsafasi",
        "text": (
            "🏆 <b>STARTAP ASOSCHISI MANIFESTI: ORZUDAN UNICORN NATIJASIGA BO‘LGAN YO‘L</b>\n\n"
            "<i>\"Muvaffaqiyat (SUCCESS) — bu tasodifan omad kulib boqishi emas. Muvaffaqiyat — har kuni o‘z maqsadiga sadoqat bilan, intizomli mehnat qilish natijasidir.\"</i>\n\n"
            "<b>MedLoop AI loyihasi ortida nima turibdi?</b>\n\n"
            "1. <b>Haqiqiy insoniy qiymat:</b> Biz odamlarning eng nozik, eng qadrli ne’mati — sog‘lig‘i ustida ishlayapmiz. Har bir to‘g‘ri yo‘naltirilgan bemor — saqlab qolingan salomatlik demakdir.\n\n"
            "2. <b>Jasoratli qadamlar:</b> 0 dan boshlab UzCombinator Season 3 darajasigacha ko‘tarilish, Toshkent va Samarqand klinikalari bilan pilot shartnomalar tuzish va 24/7 ishlovchi xalqaro ekotizim barpo etish.\n\n"
            "3. <b>Doimiy o‘sish:</b> Hech qachon to‘xtamaslik. Yangi texnologiyalarni birinchi bo‘lib tatbiq etish.\n\n"
            "🌟 <b>Siz ham har bir yangi boshlagan ishingizda to‘xtamang.</b> Muvaffaqiyat o‘z g‘oyasiga ishongan va qiyinchiliklar oldida chekinmaganlarga tegishlidir!\n\n"
            "MedLoop jamoasi bilan birga kelajakni quramiz.\n\n"
            "🌐 <b>To‘liq Keys & Pitch:</b> https://turnir-launch-lab.vercel.app/pitch.html\n\n"
            "#Success #Motivatsiya #Startap #MedLoop #JasurShukurov #Unicorn"
        ),
        "buttons": [
            [{"text": "📑 MedLoop Master Pitch Deck", "url": "https://turnir-launch-lab.vercel.app/pitch.html"}],
            [{"text": "🌐 Rasmiy Veb-Sayt", "url": "https://turnir-launch-lab.vercel.app/"}]
        ]
    }
]

def publish_post(post_idx: int):
    if post_idx < 1 or post_idx > len(STARTUP_POSTS):
        print(f"Invalid post index: {post_idx}")
        return False

    post = STARTUP_POSTS[post_idx - 1]
    url = f"{BASE_URL}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": post["text"],
        "parse_mode": "HTML",
        "disable_web_page_preview": False,
        "reply_markup": {
            "inline_keyboard": post["buttons"]
        }
    }

    try:
        r = requests.post(url, json=payload, verify=False, timeout=15)
        res = r.json()
        if res.get("ok"):
            print(f"✓ Post #{post['id']} ('{post['title']}') successfully published to @succesmotiv!")
            return True
        else:
            print(f"✗ Failed to post #{post['id']}: {res}")
            return False
    except Exception as e:
        print(f"✗ Error publishing: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        idx = int(sys.argv[1])
        publish_post(idx)
    else:
        print("Usage: python3 publish_startup_content_to_channel.py <post_number (1-5)>")
        print("Available posts:")
        for p in STARTUP_POSTS:
            print(f"  {p['id']}. {p['title']}")
