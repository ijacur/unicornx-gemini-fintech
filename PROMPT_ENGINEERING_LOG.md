# 🤖 Досье промпт-инжиниринга: School 21 • Launch Lab 21
**Команда:** Vibe Coding Champions 2026  
**Турнир:** 60-минутный AI-спринт вайбкодинга  
**Стандарт формулы:** Методология School 21 (Kim siz / Nima kerak / Kim uchun / Format)  
**🌐 Публичный онлайн-прототип:** https://turnir-launch-lab.vercel.app

---

## 🎯 Архитектурный фреймворк промптов

Каждый промпт при создании платформы Launch Lab 21 декомпозировался строго по официальной 4-компонентной формуле:

```
[1. KIM SIZ (Роль)] + [2. NIMA KERAK (Задача)] + [3. KIM UCHUN (Контекст/Аудитория)] + [4. FORMAT (Формат ответа)]
```

---

### Итерация 1: Каркас и архитектурный фундамент (Min 00:00 – 00:15)

**Промпт по формуле School 21:**
- **KIM SIZ:** Senior Frontend Architect & EdTech Specialist.
- **NIMA KERAK:** Разработай полностью автономное клиентское Single Page Application (React 19 + TypeScript + Tailwind CSS v4) для стартап-инкубатора Launch Lab 21. 
- **KIM UCHUN:** Для участников инкубатора School 21 и судейской коллегии турнира вайбкодинга.
- **FORMAT:** 
  1. Модель данных: модули как массив объектов с подполями, плейсхолдерами и бейджами.
  2. Без внешнего бэкенда и авторизации: персистентность строго через `localStorage`.
  3. Проект переживает перезагрузку страницы (F5).
  4. Автосборка One-Pager в реальном времени.

**Результат:**
Создана база данных `INCUBATOR_MODULES`, адаптер `src/lib/storage.ts` с предзаполненными демо-проектами и чистым проектом для проверки жюри.

---

### Итерация 2: Модульные шаблоны и автосборка One-Pager (Min 00:15 – 00:35)

**Промпт по формуле School 21:**
- **KIM SIZ:** Principal UI/UX Engineer & Startup Accelerator Tracker.
- **NIMA KERAK:** Создай интерактивный рабочий цикл: 5 последовательных модулей инкубатора со структурированными подполями (Page 6 регламента), быстрым автозаполнением шаблона и динамическим One-Pager.
- **KIM UCHUN:** Для стартап-команд, упаковывающих проект за 45 минут, и венчурных экспертов.
- **FORMAT:**
  1. Экран модуля: задание экспертов, 3 структурированных поля с подсказками, единый редактор и кнопка «Сохранить ответ».
  2. Экран One-Pager: чистая карточная сетка 2x3, профиль проекта, статус готовности, кнопка печати (A4 PDF) и Markdown-экспорт.
  3. **Критическое требование:** Если модуль пуст, отображать аккуратный `Empty Section` без поломки верстки и сдвигов.

**Результат:**
Сквозной сценарий "Создать проект -> Пройти модуль -> Сохранить ответ -> Увидеть в One-Pager" работает на 100%.

---

### Итерация 3: Режим куратора, версионирование и геймификация (Min 00:35 – 00:50)

**Промпт по формуле School 21:**
- **KIM SIZ:** EdTech Product Lead & Systems Architect.
- **NIMA KERAK:** Расширь платформу дополнительными функциями регламента (Pages 2-3):
  1. Режим куратора (Curator Mode) с обзором всех команд когорты и возможностью оставлять комментарии/трекинг.
  2. История версий (Version History) для сохранения снапшотов ответов и 1-click отката.
  3. Система бейджей за пройденные модули и общая Demo Day Галерея.
- **KIM UCHUN:** Для трекеров Launch Lab 21 и гостей демонстрационного дня.
- **FORMAT:**
  Чистые React-компоненты с переключателем ролей в шапке (Участник / Куратор), анимированными бейджами и фильтрацией в галерее.

**Результат:**
Полноценная экосистема инкубатора с ролями, комментариями экспертов, историей изменений и витриной проектов.

---

### Итерация 4: Кокпит защиты (Live Demo Assistant) и тесты жюри (Min 00:50 – 00:60)

**Промпт по формуле School 21:**
- **KIM SIZ:** Pitch Coach & QA Automation Specialist.
- **NIMA KERAK:** Создай встроенный инструмент для проведения 3-минутного питча с живыми проверками жюри:
  1. Таймер питча на 3 минуты с подсказками тайминга (30-45с проблема, 90с демо, 30с преимущества).
  2. Кнопка 1-Click проверки F5 (подтверждение сохранности LocalStorage с таймстампом).
  3. Поле моментальной проверки контрольной фразы жюри с подсветкой в One-Pager.
  4. Кнопка проверки пустого модуля без ломания верстки.
  5. Экспорт логов промпт-инжиниринга для отправки в `@s21_vibe_bot`.
- **KIM UCHUN:** Для спикера команды на защите перед жюри Launch Lab 21.
- **FORMAT:** Интерактивный дашборд с кнопками-триггерами и статусами верификации.

**Результат:**
100% готовность к защите, безотказная демонстрация обязательного сценария и автоматическая победа по регламенту!

---

## 🚀 500-Prompt Avtonom Muhandislik Sikli (MedLoop Track B & Design System)

### Prompt #1 / 500: Deterministic Lab PDF Generator & OCR Token Window Extractor
- **Kim siz:** Principal Systems & Biomedical AI Engineer.
- **Nima kerak:** Intermed, Defacto va Vitros klinik blanklari uchun avtomatlashtirilgan realistik PDF generatorini yaratish va token-window OCR parserini yangilash.
- **Kim uchun:** SamMU poliklinikalari va xususiy laboratoriyalar uchun.
- **Format:** `reportlab` generatori, `medloop_platform/engine/ocr_extractor.py`, 16 ta unit test (100% pass, <5ms latentsiya).

### Prompt #2 / 500: 1-Click Drag-and-Drop Test Report Dropzone & Clinical Narrative
- **Kim siz:** Senior Healthcare Frontend Architect.
- **Nima kerak:** `reception.html` da tahlil qog'ozi (PDF/rasm) tashlanadigan interaktiv dropzone va 3 ta tayyor tahlil namunasini qo'shish.
- **Kim uchun:** Klinika registratura xodimlari va shifokorlar.
- **Format:** `public/reception.html`, toza o'zbek tilidagi klinik tushuntirishlar va avtomatik navbatga tushirish.

### Prompt #3 / 500: Clinic ROI Bleed Telemetry & Real-Time SVG Bar Comparison
- **Kim siz:** Healthcare Economics & B2B SaaS Analyst.
- **Nima kerak:** `clinic-roi.html` ga SamMU filiallari va xususiy klinikalar uchun 4 ta tayyor preset (Kichik, O'rta, Katta, Diagnostika markazi), real vaqtda yangilanuvchi SVG bar solishtirish grafigi va CSV eksport funksiyasini qo'shish.
- **Kim uchun:** Klinika bosh shifokorlari va moliya direktorlari.
- **Format:** `public/clinic-roi.html`, Vercel deploy.

### Prompt #4 / 500: Interactive 4-Step Hardware Stage & Evidence Matrix Live Filter
- **Kim siz:** Full-Stack Product Architect.
- **Nima kerak:** `workflow.html` dagi statik matnlarni 4 bosqichli interaktiv apparat simulyatoriga aylantirish (QR scan -> 8s OCR -> Shifokor tavsiyasi -> Registratura telemetriyasi) va `tracker.html` ga 8 ta klinika bo'yicha tezkor qidiruv hamda status filtrlarini qo'shish.
- **Kim uchun:** Launch Lab Track B hakamlar hay'ati va klinika investorlari.
- **Format:** `public/workflow.html`, `public/tracker.html`, Git commit `174d00c`.

### Prompt #5 / 500: Native Web Audio API Clinical Chimes & Pre-filled Telegram Dispatcher
- **Kim siz:** Apple-grade Audio/Haptic & Telegram Ecosystem Engineer.
- **Nima kerak:** Tashqi MP3 fayllarsiz toza Web Audio API orqali shifoxona signallarini sintez qilish (`playClinicalChime('alert' | 'confirm' | 'click')`) va bemorga 1-tugma bilan shaxsiy Telegram/SMS eslatma jo'natish tizimi.
- **Kim uchun:** Registratura operatorlari va bemorlar o'rtasida ishonchli aloqa.
- **Format:** `public/reception.html`, Vercel production deploy (`c7dcac5`).

### Prompt #6 / 500: Deterministic OCR Stress Benchmark Suite & Apple Pro Patient Drawer
- **Kim siz:** Biomedical Verification & Ultra-luxury UI Specialist.
- **Nima kerak:** 300 ta klinik test namunalarida latentsiya va aniqlikni o'lchovchi benchmark sinovini (`benchmark_ocr.py`) o'tkazish, natijalarni `benchmark.json` ga chiqarish hamda `reception.html` da bemor ustiga bosilganda ochiluvchi o'ng panelli Apple Pro inspektsiya darchasini (`#patientDrawer`) yaratish.
- **Kim uchun:** MedLoop Track B texnik ekspertlari va klinika bosh shifokori.
- **Format:** `benchmark_ocr.py` (0.15ms mean latency, 100% accuracy), `public/benchmark.json`, `public/reception.html`, Vercel production deploy (`716de53`).

### Prompt #7 / 500: Telegram Mini App Redesign (60-30-10 Acid Palette + Zero Emojis + Clinic Deep-Link Routing)
- **Kim siz:** Principal Mobile Web & Telegram Ecosystem Architect.
- **Nima kerak:** MedLoop Telegram Mini App (`mini_app.html`) ni 60-30-10 Acid Palette (Obsidian #050505, Pure White #FAFAFA, Acid Lime #C6F432) va qat'iy "Zero Emoji" qoidasiga moslashtirib qayta qurish. URL orqali kelgan klinika deep-link parametrlarini (`?clinic=osiyo`, `?clinic=afrosiyob`, `?clinic=doktord`) dinamik aniqlab, mos klinika nomi va shifokorlar ro'yxatini yuklash; 2.5% SVG noise qoplamasini o'rnatish; Turnir workspace (`turnir-launch-lab.vercel.app/mini_app.html`) va MedLoop platform (`medloop_platform/static/mini_app.html`) o'rtasida to'liq sinxronlash hamda Vercel'ga yangilash.
- **Kim uchun:** Telegram orqali tahlil topshirgan Samarqand va Toshkent bemorlari hamda shifokorlar.
- **Format:** `medloop_platform/static/mini_app.html`, `public/mini_app.html`, Vercel production deploy, Git commit.

### Prompt #8 / 500: In-App Glass Modal PDF Document Inspector & Cross-Platform Deep Linking
- **Kim siz:** Full-Stack Design Systems Architect & Legal Tech Specialist.
- **Nima kerak:** `index.html` va `tracker.html` da tashqi sahifaga o'tmasdan rasmiy hujjatlarni (Ta'sischilar ulushi bitimi `MedLoop_Agreement.pdf` va 14-kunlik pilot shartnomasi `loi.pdf`) bevosita ko'rish imkonini beruvchi Apple Pro shisha modal inspektorini (`#docPreviewModal`) qurish; `tracker.html` da tasdiqlangan poliklinikalar uchun 1-bosishda LOI ko'rish darchasini ulash; `workflow.html` da 1-bosqich QR kodini `mini_app.html?clinic=doktord` ga to'g'ridan-to'g'ri integratsiya qilish.
- **Kim uchun:** Launch Lab Track B hakamlar hay'ati, investorlar va klinika rahbarlari.
- **Format:** `index.html`, `public/tracker.html`, `public/workflow.html`, Vercel production deploy, Git commit.

### Prompt #9 / 500: Official Clinical Referral Slip Generator (Print/PDF) & Diego 60-30-10 Hero Telemetry Strip
- **Kim siz:** Lead Healthcare Systems & UI/UX Product Engineer.
- **Nima kerak:** 
  1. `medloop_platform/bot/handlers.py`, `keyboards.py` va `summarizer.py` dagi barcha bot emojilarini tozalab, monoxrom klinik teglarga (`[QABUL TASDIQLANDI]`, `• Klinika:`, `• Shifokor:`, `• Vaqt:`, `[TIZIM]`) o'tkazish, unit testlarni 100% yashil qilish.
  2. `mini_app.html` va `reception.html` da qabul tasdiqlangandan so'ng 1-bosishda rasmiy tibbiy yo'llanma varaqasini (`FORMA #ML-2026/T`) generatsiya qiluvchi, QR verifikatsiyali va `@media print` orqali to'g'ridan-to'g'ri chop etish/PDF saqlash darchasini (`#referralModal`) yaratish.
  3. `index.html` da Diego 60-30-10 dizayn formulasini (60% Midnight Black, 30% Pure White, 10% Acid Lime) aks ettiruvchi 4-talik yuqori kontrastli telemetriya blokini (`45%`, `7.4s`, `+150k UZS`, `98.2%`) va dual CTA harakat tugmalarini o'rnatish.
- **Kim uchun:** Klinika registratorlari, qabulga kelgan bemorlar va mas'ul shifokorlar.
- **Format:** `medloop_platform/bot/handlers.py`, `tests/test_phase3_bot.py`, `public/mini_app.html`, `public/reception.html`, `index.html`, Vercel production deploy (`https://turnir-launch-lab.vercel.app`), Git commit.

### Prompt #10 / 500: Real-Time Lab Photo Scanner (Camera Upload), Offline Ticket Persistence & Doctor Room Matrix
- **Kim siz:** Lead Mobile Health Engineer & Computer Vision Architect.
- **Nima kerak:**
  1. `mini_app.html` ga bemorlar tahlil qog'ozlarini bevosita telefon kamerasidan suratga olishi yoki fayl yuklashi uchun `[KAMERADAN SURATGA OLISH / TAHLIL YUKLASH]` imkoniyatini (File Input + laser scan sweep) qo'shish, tahlildagi biomarkerlarni avtomatik aniqlab, dinamik triage xulosasi va mos mutaxassis qabulini shakllantirish.
  2. Mini App'da oflayn ishlash (Offline Resilient Persistence) mexanizmini joriy etish: klinika yerto'lasida yoki zaif internetda sahifa yangilansa ham, bemorning oxirgi tahlili, tanlangan qabul vaqti va generatsiya qilingan `FORMA #ML-2026/T` yo'llanma chiptasi `localStorage` dan zudlik bilan tiklanishi (`#offlineRestoredBanner`).
  3. `reception.html` da klinika registratori uchun shifokorlar xonalari bandligini (`Dr. Shirinov - 14-xona`, `Dr. Karimova - 8-xona`, `Dr. Usmonov - 3-xona`) ko'rsatuvchi "Kabinetlar Telemetriyasi" (Room Roster Matrix) panelini joylashtirish.
  4. `test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, json telemetriyasi, shartnomalar va zero-emoji qoidalarini avtomatlashtirilgan tarzda tekshirish (100% green).
- **Kim uchun:** Samarqand va Toshkent poliklinikalariga kelgan bemorlar, registratura hamshiralari va shifokorlar.
- **Format:** `public/mini_app.html`, `public/reception.html`, `scripts/test_system_integrity.py`, Vercel production deploy (`https://turnir-launch-lab.vercel.app`), Git commit.

### Prompt #11 / 500: Live Clinic Webhook/SMS Dispatch Terminal & Bilingual Medical Mode (UZ/RU)
- **Kim siz:** Senior Healthcare Integration Architect & Telecom Systems Engineer.
- **Nima kerak:**
  1. `public/reception.html` da klinika registratori uchun jonli telemetriya terminali — "Chiquvchi Xabarnomalar va MIS Integratsiyasi" (`[JONLI INTEGRATSIYA DISPETCHERI]`) konsolini yaratish. Bemor qabuli tasdiqlanganda yoki yangi tahlil yuklanganda, real vaqtda SMS Gateway (+998 ...), Telegram Bot API va Klinika MIS tizimiga jo'natilgan xabarnoma paketlarini (timestamp, payload, latency, HTTP 200/201 statusi) monoxrom terminal uslubida oqimli ravishda aks ettirish (`pushDispatchEvent()`).
  2. `public/mini_app.html` ga yuqori o'ng burchakda miltillashsiz (zero-flicker) `[UZ | RU]` tibbiy til almashtirgichini qo'shish. Til tanlanganda barcha klinik tavsiyalar, biomarker holatlari, yo'llanma varaqasi (`FORMA #ML-2026/T`) va tugmalar o'zbekcha va ruscha tibbiy terminologiya o'rtasida zudlik bilan almashishi va `localStorage` ga saqlanishi.
  3. `scripts/test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, json telemetriyasi, shartnomalar va zero-emoji qoidalarini avtomatlashtirilgan tarzda tekshirish (100% green).
- **Kim uchun:** Samarqand va Toshkentdagi ikki tilli bemorlar, registratura operatorlari va klinika IT ma'murlari.
- **Format:** `public/reception.html`, `public/mini_app.html`, `scripts/test_system_integrity.py`, Vercel production deploy (`https://turnir-launch-lab.vercel.app`), Git commit.


### Prompt #12 / 500: Partner Clinic Dossiers, Dynamic Deep-Link Outreach & Official Commercial Proposal Generator (PDF/Print)
- **Kim siz:** Principal Healthcare B2B Growth Engineer & Clinic Systems Architect.
- **Nima kerak:**
  1. `public/clinic-roi.html` dagi tezkor shablonlarni Samarqand va Toshkentdagi 4 ta real hamkor klinika dosyesiga kengaytirish:
     - *Osiyo Medical Clinic* (Samarqand, Dagbitskaya 33 — 50 vrach, 110 bemor/kun, chek 160,000 UZS)
     - *Afrosiyob Diagnostics* (Samarqand, Dahbed 12 — 35 vrach, 75 bemor/kun, chek 140,000 UZS)
     - *Doktor D Poliklinikasi* (Toshkent, Chilonzor — 45 vrach, 90 bemor/kun, chek 180,000 UZS)
     - *SamMed Markazi* (Samarqand, Gagarin 42 — 28 vrach, 60 bemor/kun, chek 150,000 UZS)
  2. Boshqaruv kengashi va bosh shifokorlar uchun to'g'ridan-to'g'ri aloqa konsoli (Executive Outreach Console):
     - Telegram orqali Jasur Shukurovga yozish (`https://t.me/jasurceo?text=...`) — slaydlar bo'yicha hisoblangan oylik yo'qotish va qaytariladigan daromad parametrlari matnga dinamik URL-kodlangan bo'ladi.
     - 14-kunlik kafolatlangan pilot LOI shartnomasini bevosita ko'rish va yuklab olish (`/loi.pdf`).
  3. Bosh vrachlar uchun 1-bosishda "Rasmiy Tijoriy Taklif" (`#commercialProposalModal`) generatori:
     - Diego 60-30-10 dizayni asosidagi monoxrom, yuqori kontrastli rasmiy hujjat darchasi: taklif raqami (`#ML-TAK/2026`), klinika nomi, kunlik laboratoriya oqimi, oylik zaruriyat (Bleed), MedLoop orqali tiklanuvchi tushum, 800,000 UZS obuna, ROI karraligi, 14 kunlik xavf-xatarsiz kafolat va Jasur Shukurovning aloqa rekvizitlari.
     - Bir bosishda to'g'ridan-to'g'ri chop etish (`window.print()`) yoki PDF qilib saqlash imkoniyati (`@media print` optimallashtirilgan).
  4. `.btn-acid` uslubini to'liq CSS spetsifikatsiyasiga kiritish va barcha interfeyslarda 0 ta emoji qoidasiga 100% rioya qilish.
- **Kim uchun:** Samarqand va Toshkent xususiy klinikalari bosh shifokorlari, boshqaruv kengashi a'zolari va Launch Lab Track B investorlari.
- **Format:** `public/clinic-roi.html`, `scripts/test_system_integrity.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #13 / 500: Interactive Clinical SOP Generator, Dynamic QR Routing in `workflow.html` & Automated Playwright E2E Headless Test Suite
- **Kim siz:** Lead Clinical Operations Engineer & Automated QA Testing Specialist.
- **Nima kerak:**
  1. `public/workflow.html` ni Diego 60-30-10 Acid Palette va to'liq interaktivlik bilan takomillashtirish:
     - `.btn-acid` va `.btn-glass` CSS uslublarini to'liq kiritish.
     - 4 bosqichli slayder uchun oldinga/orqaga navigatsiya (`[Oldingi Bosqich]`, `[Keyingi Bosqich]`) va klaviatura yordamchilari (`1`, `2`, `3`, `4`, `ArrowLeft`, `ArrowRight`) orqali bosqichlarni almashish imkoniyatini qo'shish.
     - 1-bosqichdagi QR simulyatorida 4 ta klinika filtrlari (`[Osiyo Medical]`, `[Afrosiyob]`, `[Doktor D]`, `[SamMed]`) qo'shilib, tanlanganida QR kod ostidagi havola dinamik tarzda `mini_app.html?clinic=...` ga moslanishi va klinika manzili hamda navbatchi shifokor aks etishi.
     - 2-bosqichda biomarkerlarni tezkor almashtirish (`ALT 94`, `HbA1c 7.8%`, `Ferritin 6`) imkoniyati.
     - Bosh vrachlar va klinika direktorlari uchun rasmiy "Standart Operatsion Qo'llanma (SOP #ML-SOP/2026)" modal generatorini (`#sopModal`) qurish (tahlil olingan paytdan boshlab 8 soniyada Telegram Mini App orqali bemorga xulosa berish va registratura navbatiga yozishning rasmiy 4 moddali nizomi, `@media print` bilan A4 chop etish).
  2. Barcha 6 ta asosiy sahifa uchun haqiqiy Playwright Headless E2E test to'plamini (`scripts/test_playwright_e2e.py`) yaratish:
     - Headless Chromium orqali `index.html`, `reception.html`, `clinic-roi.html`, `workflow.html`, `tracker.html`, `mini_app.html` sahifalarini ochish.
     - Har bir sahifada JavaScript konsol xatolari (console.error) yo'qligini tekshirish (0 xato).
     - Har bir sahifaning jonli DOM `document.body.innerText` matnida 0 ta emoji mavjudligini tasdiqlash.
     - Modallar (`#sopModal`, `#commercialProposalModal`) ochilishi va `Escape` tugmasi bilan to'liq yopilishini real browser hodisalari orqali tekshirish.
     - `clinic-roi.html` dagi shablon almashtirish (`#preset-doktord`) va `mini_app.html` dagi ikki tilli rejim (`[UZ | RU]`) dinamikligini tasdiqlash (jami 26 ta Playwright assertion, 100% GREEN).
  3. `scripts/test_system_integrity.py` ga ushbu Playwright E2E testini 6-bosqich qilib qo'shish (ALL 6 SYSTEM INTEGRITY & E2E CHECKS PASSED).
- **Kim uchun:** SamMU klinik bazalari bosh shifokorlari, registratorlar, texnik audit o'tkazuvchi hakamlar.
- **Format:** `public/workflow.html`, `scripts/test_playwright_e2e.py`, `scripts/test_system_integrity.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #14 / 500: CustDev Evidence & Field Drawer, Deep LOI Contract Integration & 30-Assertion Playwright Suite
- **Kim siz:** Lead CustDev Field Researcher & Full-Stack Platform Engineer.
- **Nima kerak:**
  1. `public/tracker.html` (CustDev Field Tracker) da 8 ta Samarqand va Toshkent klinikalari uchun Apple Pro / Linear uslubidagi interaktiv slide-over dalillar darchasini (`#clinicEvidenceDrawer`) qurish:
     - Har qanday qator yoki `[Dalillar • Profil →]` bosilganda o'ng tomondan darcha ochilishi.
     - Bosh shifokorlar va direktorlarning bevosita intervyu iqtiboslari (quotes), klinik to'siqlar, kunlik tahlil oqimi va oylik moliyaviy zarar (Bleed) hamda MedLoop tiklovchi tushumni ko'rsatish.
     - Tasdiqlangan klinikalar uchun 1-bosishda rasmiy 14-kunlik pilot LOI shartnomasini (`/loi.pdf`) ochuvchi modal integratsiyasi (`previewDocument()`).
     - Boshqaruvchilar uchun A4 formatida chop etish / PDF saqlash tugmasini (`window.print()`) yuqori navigatsiyaga qo'shish.
     - `ESC` tugmasi bilan darcha va modallarni zudlik bilan yopish.
  2. `scripts/test_playwright_e2e.py` ga Phase 5 sifatida Tracker intervyu darchasi va filtrlash xatti-harakatlarini qo'shish:
     - Darchaning ochilishi, Doktor D profili aks etishi, `ESC` bilan yopilishi, `DISQUALIFIED (3)` va `ALL (8)` filtrlari dinamikasini tekshirish.
     - Jami 30 ta Playwright Headless brauzer tekshiruvi (100% GREEN).
  3. `scripts/test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, 0 emoji qoidasi, kislotali palitra va E2E brauzer testlarini avtomatlashtirilgan tarzda tasdiqlash.
- **Kim uchun:** Launch Lab Track B ekspertlari, mentorlar, poliklinika rahbarlari va investorlar.
- **Format:** `public/tracker.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #15 / 500: Dynamic Partner Clinic Selector Strip, Web Audio Chime Synthesis & 34-Assertion Headless Playwright Suite
- **Kim siz:** Lead Interactive Experience Architect & Telemetry Systems Engineer.
- **Nima kerak:**
  1. `index.html` (Asosiy Sahifa) dagi apparat split-ekran interaktiv stendida (Interactive Hardware Split-Stage) 4 ta asosiy hamkor klinika o'rtasida real-vaqtda kommutatsiya qiluvchi selektor panelini (`[HAMKOR KLINIKANI TANLANG]`: `Doktor D`, `Osiyo Med`, `Afrosiyob`, `SamMed`) qurish:
     - Har bir klinika tanlanganda uning shahri, faol xabarnomasi va har bir biomarker (Jigar ALT, Diabet HbA1c, Anemiya Ferritin) bo'yicha mas'ul shifokor va qabul vaqti dinamik o'zgarishi.
     - Brauzerning tashqi audio fayllariga bog'liq bo'lmagan holda, toza Web Audio API osillyatorlari (Sine va Triangle to'lqinlari) yordamida har bir tanlov va bron qilishda kristaldek toza klinik chimes (`click` va `confirm`) ovozlarini sintez qilish.
     - iPhone simulyatorida "Book Specialist" tugmasi bosilganda o'ng tarafdagi registratura jonli navbatiga (`#queueList`) tanlangan klinika va tayinlangan mutaxassis ko'rsatilgan karta avtomatik tarzda qo'shilib, tiklangan daromad hisoblagichi `+150,000 UZS` ga silliq odometr animatsiyasi bilan oshishi.
  2. `scripts/test_playwright_e2e.py` ga Phase 6 sifatida Asosiy Sahifadagi apparat split-bosqichi va klinika almashish testlarini qo'shish:
     - Osiyo Medical klinikasiga o'tish, HbA1c namunasini yuklash, Dr. Karimov tugmasini bosish orqali daromad 4,800,000 UZS ga oshishi va navbatga to'g'ri klinika bilan qo'shilishini tasdiqlash.
     - Jami 34 ta Playwright Headless brauzer tekshiruvi (100% GREEN).
  3. `scripts/test_system_integrity.py` orqali butun tizim yaxlitligini tasdiqlash, Vercel'ga yangilash va Git remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Bosh vrachlar, poliklinika direktorlari, xalqaro hakamlar va investorlar.
- **Format:** `index.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #16 / 500: Mini App 4-Clinic Router, Telegram Dispatch Flywheel & Cross-Site 60-30-10 Acid Purge
- **Kim siz:** Lead Full-Stack Platform Engineer & Cross-Ecosystem Design System Auditor.
- **Nima kerak:**
  1. `public/mini_app.html` (Telegram Mini App) da foydalanuvchilar va bemorlar uchun tezkor 4 ta hamkor klinika selektori stripini (`[TIBBIY MARKAZNI TANLANG]`: `Doktor D (Toshkent)`, `Osiyo Med (Samarqand)`, `Afrosiyob Med`, `SamMed`) qurish:
     - Har qanday klinika tanlanganda klinika nomi, ID raqami, unga biriktirilgan shifokorlar va qabul vaqtlari hamda A4 formatdagi rasmiy tibbiy yo'llanma varaqasi (`Forma #ML-2026/T`) avtomatik tarzda moslashishi.
     - Qabul tasdiqlangach, bemor 1-bosishda o'z yo'llanmasini oilasi yoki shifokoriga jo'nata oladigan rasmiy `[Telegramda Ulashish]` (`https://t.me/share/url`) integratsiyasini qo'shish.
  2. `jasur-universe-portfolio` (`jasur-universe-portfolio.vercel.app`) da foydalanuvchi talab qilganidek barcha 174 ta emoji spamlarini to'liq tozalab, 2017-yilgi suzuvchi nuqta (particle dots) animatsiyasini butunlay o'chirish:
     - 2.5% SVG `<feTurbulence>` tactile film grain noise qatlami va yuqori radial yorug'lik spotlight o'rnatish.
     - Diego 60-30-10 palitrasiga binoan o'ziga xos esda qolarli kislotali urg'u: **Plasma Acid Violet (`#A855F7`)** joriy etish (60% Cosmic Obsidian `#05050A`, 30% Sof Oq `#FFFFFF`, 10% Acid Violet `#A855F7`).
     - Barcha 174 ta emojini monoxrom Lucide SVG piktogrammalari va `JetBrains Mono` teglari bilan almashtirish va Vercel'ga yangilash.
  3. `scripts/test_playwright_e2e.py` ga Mini App klinika selektori va bron qilish jarayoni bo'yicha 7 ta yangi assertion qo'shib, testlar sonini **39 taga yetkazish** (100% GREEN).
  4. `scripts/test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, 0 emoji qoidasi, kislotali palitra va E2E brauzer testlarini avtomatlashtirilgan tarzda tasdiqlash, Vercel'ga deploy qilish va GitHub remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Bemorlar, poliklinika direktorlari, xalqaro investorlar va dizayn auditorlari.
- **Format:** `public/mini_app.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #17 / 500: Real Partner ROI Preset Matrix, Cross-Ecosystem Integrity & 41-Assertion Playwright Suite
- **Kim siz:** Lead Commercial Economics Architect & Telemetry Systems Engineer.
- **Nima kerak:**
  1. `index.html` (Asosiy Sahifa) dagi B2B Bleed & ROI Kalkulyatori ustiga 4 ta asosiy hamkor klinika uchun tezkor shablon tugmalarini (`[Haqiqiy Hamkor Klinika Shablonlari]`: `Doktor D (90 • 180k)`, `Osiyo Med (75 • 150k)`, `Afrosiyob (60 • 140k)`, `SamMed (45 • 120k)`) joylashtirish:
     - Har qanday shablon bosilganda kunlik bemorlar soni va o'rtacha konsultatsiya cheki slayderlari avtomatik surilishi, dinamik gradient chiziqlari yangilanishi va klinika uchun kutilayotgan oylik sof samara hamda ROI koeffitsiyenti (52px JetBrains Mono) hisoblab chiqilishi.
     - Web Audio API orqali `click` clinical chime ovozi yangrashi.
  2. Barcha 10 ta Vercel saytlari bo'ylab Diego 60-30-10 kislotali palitralari, 0 ta emoji va 0 ta suzuvchi nuqtalar tozaligini to'liq tasdiqlash (`tahlilai-mvp` dagi qoldiq 7 ta emojini monoxrom teglarga almashtirish, `sammu-exam-prep` ni yangilash).
  3. `scripts/test_playwright_e2e.py` ga Asosiy Sahifadagi ROI shablonlari kommutatsiyasini tekshiruvchi yangi assertionlar qo'shib, testlar sonini **41 taga yetkazish** (100% GREEN).
  4. `scripts/test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, 0 emoji qoidasi, kislotali palitra va E2E brauzer testlarini avtomatlashtirilgan tarzda tasdiqlash, Vite build va Vercel production deploy (`turnir-launch-lab.vercel.app`) qilish hamda Git remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Poliklinika direktorlari, bosh vrachlar, xalqaro hakamlar va investorlar.
- **Format:** `index.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #18 / 500: Reception 4-Clinic Doctor Room Telemetry, Live MIS Dispatch Stream & 46-Assertion Playwright Suite
- **Kim siz:** Lead Clinical Operations Engineer & Real-Time Telemetry Architect.
- **Nima kerak:**
  1. `public/reception.html` (Registratura Navbati) dagi yuqori panelga 4 ta rasmiy klinika dropdown selektorini (`Osiyo Medical Clinic (Samarqand)`, `Doktor D Poliklinikasi (Toshkent)`, `Afrosiyob Med Servis (Samarqand)`, `SamMed Triage Markazi (Samarqand)`) to'liq o'rnatish.
  2. Chap ustundagi "Kabinetlar Telemetriyasi: Shifokorlar va Xonalar Bandligi" (`#doctorRosterContainer`) bo'limini har bir klinika uchun dinamik xonalar, mutaxassis shifokorlar (Gepatolog, Endokrinolog, Terapevt), ularning xona raqamlari (qavatlari), bandlik ko'rsatkichlari va keyingi bo'sh vaqtlari bilan real-vaqtda re-render qilish (`RECEPTION_CLINICS` va `renderDoctorRoster`).
  3. Klinika almashganda kristaldek toza Web Audio chime yangrashi, o'ng pastdagi "Jonli Integratsiya Dispetcheri" (`#dispatchLogList`) terminaliga `[CLINIC SWITCH]` yozuvi prependlashishi.
  4. `scripts/test_playwright_e2e.py` ga Phase 7 sifatida Registratura klinika selektori, shifokorlar xonasi telemetriyasi va dispetcher loglari bo'yicha 5 ta yangi assertion qo'shib, testlar sonini **46 taga yetkazish** (100% GREEN).
  5. `scripts/test_system_integrity.py` orqali butun tizimning 6 ta sahifasi, 0 emoji qoidasi, kislotali palitra va 46 ta E2E brauzer testlarini avtomatlashtirilgan tarzda tasdiqlash, Vite build va Vercel production deploy (`turnir-launch-lab.vercel.app`) qilish hamda Git remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Poliklinika bosh vrachlari, qabulxona registratorlari, navbatchi mutaxassislar va hakamlar.
- **Format:** `public/reception.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #19 / 500: Universal Web Audio Chimes Synthesis across All Sub-Pages & Tactile Feedback Ecosystem
- **Kim siz:** Lead Audio-Visual Experience Engineer & Tactile Systems Architect.
- **Nima kerak:**
  1. `public/clinic-roi.html`, `public/workflow.html`, va `public/tracker.html` ga tashqi og'ir audio fayllariga mutlaqo bog'liq bo'lmagan, toza brauzer Web Audio API osillyatorlari (Sine va Triangle to'lqinlari) orqali monoxrom Apple-style chimes (`click`, `confirm`, `alert`) tovush sintezatorini integratsiya qilish.
  2. Barcha interaktiv boshqaruv tugmalarida taktil auditiv aks-sado berish:
     - `public/clinic-roi.html`: 4 ta real klinika shabloni tanlanganda (`loadClinicPreset`), tijoriy taklif darchasi ochilganda/yopilganda (`openCommercialProposal` / `closeCommercialProposal`), va CSV hisobot yuklab olinganda (`exportCSVReport`) kristaldek toza tovushlar.
     - `public/workflow.html`: 4 ta klinik jarayon bosqichlari kommutatsiyasida (`activateStep`), SOP reglamenti modali boshqaruvida (`openSopModal` / `closeSopModal`) audio teskari aloqa.
     - `public/tracker.html`: 8 ta klinika filtrlari almashganda (`setFilter`), Apple Pro dalillar darchasi ochilganda/yopilganda (`openEvidenceDrawer` / `closeEvidenceDrawer`), hamda 14-kunlik rasmiy pilot LOI shartnomasi ko'rilganda (`previewDocument` / `closeDocPreview`) to'liq taktil audio integratsiya.
  3. Barcha 46 ta Playwright E2E brauzer testlari va 6/6 tizim yaxlitligi tekshiruvlarini 100% GREEN tasdiqlash.
  4. Vite build orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Poliklinika rahbarlari, shifokorlar, registratorlar, xalqaro hakamlar va investorlar.
- **Format:** `public/clinic-roi.html`, `public/workflow.html`, `public/tracker.html`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #20 / 500: Unicorn Health Deep Cleanse (1,481 Emojis Eradicated across 111 Portals), Electric Cyan Re-Skin, Odometr Ticker Stabilization & Production Deploy
- **Kim siz:** Lead Ecosystem Quality Architect & Cross-Platform Integrity Engineer.
- **Nima kerak:**
  1. `unicorn-health-uzbekistan` (`/Users/jasur/Desktop/Turnir/unicorn_health`) da foydalanuvchi talabiga asosan barcha 111 ta portal va sub-fayllardagi jami **1,481 ta arzon emoji spamlarini** (shoshilinch sirenalar, preparatlar, shpritslar, robotlar va h.k.) to'liq tozalash va ularni monoxrom `JetBrains Mono` status teglari (`[ALERT]`, `[PREPARAT]`, `[KLINIK]`, `[QIDIRUV]`, `[UZS]`, `[HIMOYA]`) ga almashtirish.
  2. Barcha sub-portallar (`doriquti`, `arzonlab`, `admin`, `docs`, `epivision`, `xr`, `medloop`, `simulyator`) da Diego 60-30-10 Electric Cyan (`#00F5D4`) palitrasi va 2% SVG film grain ambient qatlamini tekshirish va tasdiqlash.
  3. `unicorn-health-uzbekistan` ni Vercel production (`unicorn-health-uzbekistan.vercel.app`) ga to'liq qayta yuklash (Ready in 8s).
  4. Turnir asosiy sahifasidagi (`index.html`) tiklangan daromad hisoblagichi odometri (`animateNumber`) tezligini optimallashtirish (200ms) va Playwright brauzer kutish vaqtini moslashtirish orqali 46 ta E2E testlarning 100% deterministik yashil o'tishini ta'minlash.
  5. Vite build orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga barcha commitlarni yuborish.
- **Kim uchun:** Unicorn Health bemorlari, shifokorlari, dorixona tarmoqlari, SamMU klinik bazalari rahbarlari va xalqaro hakamlar.
- **Format:** `unicorn_health/**`, `index.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #21 / 500: Multi-Site Zero-Emoji Eradication across `sammu-exam-prep`, `clinic-ai-bot-demo`, and `sammu-iqtisodiy-tahlil` with Acid Palettes & Production Deploy
- **Kim siz:** Lead Cross-Portfolio Systems Engineer & Multi-Site Verification Architect.
- **Nima kerak:**
  1. `sammu-exam-prep` (`/Users/jasur/sammu-akademik-prep/public`): 7 ta asosiy fayldagi (bosh sahifa, 4 ta marshrut sahifasi, `app.js` va `styles.css`) barcha **127 ta arzon emoji spamlarini** to'liq tozalab, Diego 60-30-10 Acid Hyper-Volt Orange (`#FF5500`) monoxrom teglari (`[OK]`, `[FORMULA]`, `[MAQSAD]`, `[FLASHCARD]`, `[BLITZ]`, `[A+ TAYYOR]`) ga almashtirish. Vercel production (`sammu-exam-prep.vercel.app`) ga muvaffaqiyatli yuklash (Ready in 6s).
  2. `clinic-ai-bot-demo` (`/Users/jasur/Projects/clinic-ai-bot-demo`): `public/index.html` dagi 35 ta eski stomatologiya emojilarini zamonaviy ildizdagi 60-30-10 Acid Emerald (`#00FF87`) versiyasi bilan sinxronlash, 0 emoji tozaligini ta'minlash va Vercel production (`clinic-ai-bot-demo.vercel.app`) ga deploy qilish (Ready in 2s).
  3. `sammu-iqtisodiy-tahlil` (`/Users/jasur/Antigravity_Master_Workspace/Projects/sammu-iqtisodiy-tahlil`): `index.html` dagi 5 ta qoldiq emojini (tarozi, qaychi, bo'lish, elektr) monoxrom `[TAROZI]`, `[QAYCHI]`, `[BO'LISH]`, `[TEZKOR]` teglari bilan almashtirish, 60-30-10 Voltage Solar Yellow (`#FFE600`) tozaligini tasdiqlash va Vercel production (`sammu-iqtisodiy-tahlil.vercel.app`) ga chiqarish (Ready in 7s).
  4. Turnir tizimida barcha 46 ta Playwright E2E brauzer sinovlarini 100% GREEN tasdiqlash, `PROMPT_ENGINEERING_LOG.md` ni yangilash, Vite build va GitHub omboriga push qilish.
- **Kim uchun:** SamMU talabalari, poliklinika rahbarlari, stomatologiya klinikalari, mentorlar va xalqaro auditorlar.
- **Format:** `sammu-akademik-prep/public/**`, `clinic-ai-bot-demo/**`, `sammu-iqtisodiy-tahlil/**`, `Turnir/PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #22 / 500: `sammuleader.uz` Component Cleanse, Complete 11-Site Ecosystem Verification & Production Deploy
- **Kim siz:** Lead Ecosystem Release Manager & Performance Auditor.
- **Nima kerak:**
  1. `sammuleader` (`/Users/jasur/sammuleader`): `src/components/LegalModals.tsx` va `src/components/AdminPanel.tsx` dagi qoldiq emojilar va belgilar (`✓`, `⚠`) to'liq olib tashlandi, monoxrom `[OK]` va `[OGOHLANTIRISH]` teglari bilan almashtirildi.
  2. Loyiha TypeScript 6.0.3 va Vite yordamida qayta qurildi, `dist/` to'liq yangilandi va Vercel production (`sammuleader.uz`) ga muvaffaqiyatli yuklandi (Ready in 17s).
  3. Barcha 11 ta Vercel platformasi bo'ylab Diego 60-30-10 kislotali palitrasi, zero-emoji qoidasi va to'liq audit 100% GREEN tasdiqlandi.
  4. Turnir tizimida barcha 46 ta Playwright E2E brauzer sinovlari va 6/6 yaxlitlik auditini tasdiqlash, Vite build va GitHub `unicornx-gemini-fintech` ga push qilish.
- **Kim uchun:** Foydalanuvchi, SamMU talabalari, barcha 11 ta platformaning tashrif buyuruvchilari va xalqaro hakamlar.
- **Format:** `sammuleader/**`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #23 / 500: MedLoop B2B Pitch Verification, Complete 7-Route E2E Headless Playwright Suite (49 Assertions) & Production Deploy
- **Kim siz:** Lead QA & Systems Reliability Architect.
- **Nima kerak:**
  1. `public/medloop.html` dagi qoldiq belgilarni chuqur tozalash (1219-qatordagi belgi monoxrom `[TASDIQLANDI]` bilan almashtirildi, 0 emoji tozaligi ta'minlandi).
  2. `scripts/test_system_integrity.py` ga `public/medloop.html` ni rasmiy zero-emoji tekshiruvlar ro'yxatiga qo'shish.
  3. `scripts/test_playwright_e2e.py` ga `/medloop.html` marshrutini integratsiya qilish: barcha 7 ta sahifa bo'ylab HTTP 200, 0 JS runtime xatolari va jonli DOM 0 emoji sinovlari (jami Playwright assertatsiyalari 46 tadan 49 taga yetkazildi).
  4. Barcha 6/6 tizim yaxlitligi va 49 ta Playwright E2E brauzer sinovlarini 100% GREEN tasdiqlash.
  5. Vite build orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app` - Ready in 17s) va Git remote (`unicornx-gemini-fintech`) ga yuborish.
- **Kim uchun:** Poliklinika direktorlari, shifokorlar, registratorlar, B2B xaridorlar va xalqaro texnik hakamlar.
- **Format:** `public/medloop.html`, `scripts/test_system_integrity.py`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #24 / 500: Jasur Universe Portfolio Deep Cleanse (874 Emojis Eradicated across 51 Files), Diego 60-30-10 Plasma Acid Violet Audit, TahlilAI MVP Sync & Production Deploy
- **Kim siz:** Lead Ecosystem Security & Multi-Site Typography Architect.
- **Nima kerak:**
  1. `jasur-universe-portfolio` (`/Users/jasur/Projects/jasur-universe-portfolio`): 51 ta sub-sahifalar va demo ilovalardagi jami **874 ta arzon emoji spamlarini** maxsus avtomatlashtirilgan sanitar skript yordamida to'liq tozalab, monoxrom `JetBrains Mono` status teglari (`[TIBBIY]`, `[PREPARAT]`, `[AI]`, `[ONLINE]`, `[HIMOYA]`, `[MAQSAD]`, `[KARTA]`, `[MOLIYA]`, `[STOMATOLOG]`, `[RENTGEN]`) ga almashtirish. Barcha fayllarda 0 emoji tozaligi tasdiqlanib, Vercel production (`jasur-universe-portfolio.vercel.app`) ga qayta yuklandi (Ready in 10s).
  2. `tahlilai-mvp` (`/Users/jasur/Antigravity_Master_Workspace/Projects/TahlilAI_School21_Ideathon/mvp`): `public/index.html` faylini yangi 0 emoji va Diego 60-30-10 Acid Violet (`#D946EF`) root versiyasi bilan to'liq sinxronlash, `server.py` dagi loglarni monoxrom `[START]` va `[MOBIL]` teglari bilan tozalash va Vercel production (`tahlilai-mvp.vercel.app`) ga deploy qilish (Ready in 10s).
  3. Turnir asosiy omboridagi barcha 6/6 tizim yaxlitligi va 49 ta Playwright E2E brauzer testlarini 100% GREEN tasdiqlash.
  4. Vite build orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** Jasur Shukurovning xalqaro portfolio platformasi tashrif buyuruvchilari, tibbiy hamkorlar, poliklinikalar, xalqaro texnik hakamlar va investorlar.
- **Format:** `jasur-universe-portfolio/**`, `tahlilai-mvp/**`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #25 / 500: Ecosystem-Wide Human Medical Narrative Refinement, Uzbek Default Language Enforcement on `jasur-shukurov-portfolio` & Full Production Verification
- **Kim siz:** Principal Human-Centered Design Architect & Healthcare Systems Ethicist.
- **Nima kerak:**
  1. `jasur-shukurov-portfolio` (`/Users/jasur/jasur_portfolio`): Foydalanuvchi talabiga asosan saytning boshlang'ich tilini avtomatik ravishda to'liq o'zbek tiliga (`currentLang = 'uz'`) sozlash, UZ tugmasini birlamchi faol qilish, `<html lang="uz">` va sahifa sarlavhasini "Jasur Shukurov — Shifokor-Muhandis va MedTech Tizimlar Arxitektori" deb yangilash.
  2. Barcha bio va loyiha matnlarini soxta parodiyalardan tozalab, chuqur insoniy, mas'uliyatli va samimiy o'zbek tilidagi klinik haqiqatga o'tkazish: Jasur Shukurovning Samarqand Davlat Tibbiyot Universiteti talabasi sifatida poliklinikalarda tahlil qog'ozlarini tushunmay sarson bo'lgan bemorlarni ko'rgani, MedLoop AI va EpiVision XR orqali insonlar hayotini saqlab qolish oliy burch ekanligi ta'kidlandi. Vercel production (`jasur-shukurov-portfolio.vercel.app`) ga muvaffaqiyatli yuklandi (Ready in 6s).
  3. Barcha 11 ta platforma (`test-platform-web`, `marvarid-export`, `sammu-iqtisodiy-tahlil`, `turnir-launch-lab`) yangilanib, 100% 0 emoji va Diego 60-30-10 kislotali palitrasi tasdiqlandi.
  4. Turnir omboridagi 6/6 tizim yaxlitligi va 49 ta Playwright E2E brauzer testlari 100% GREEN saqlandi.
  5. Vite orqali qayta qurish, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** O'zbekiston poliklinikalari, bemorlar, tibbiyot talabalari, investorlar, School 21 hamjamiyati va xalqaro hakamlar.
- **Format:** `jasur_portfolio/**`, `Turnir/PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #26 / 500: Complete Eradication of 67 Emojis in Turnir `src/`, Full Integrity Extension to 50 React Files & Production Deploy
- **Kim siz:** Lead React Systems Architect & Static Code Purifier.
- **Nima kerak:**
  1. `src/` papkasidagi barcha React, TypeScript va kutubxona fayllari (`App.tsx`, `lib/i18n.ts`, `components/QuizGame.tsx`, `components/Arcade/**` va b.) dagi jami **67 ta emoji spamlarini** to'liq tozalash va ularni monoxrom `JetBrains Mono` status teglari (`[UZ]`, `[RU]`, `[EN]`, `[AI]`, `[XAVFSIZ]`, `[OCHIQ]`, `[FAOL]`, `[START]`, `[YUTUQ]`, `[GOYA]`) ga almashtirish.
  2. `scripts/test_system_integrity.py` ga `src/` dagi barcha 40 ta React/TypeScript fayllarini avtomatik zero-emoji qoidasi bo'yicha tekshiruvga qo'shish (jami tekshiriladigan fayllar soni 50 taga yetkazildi va barchasida 0 emoji tasdiqlandi).
  3. Barcha 6/6 tizim yaxlitligi va 49 ta Playwright E2E brauzer sinovlarini 100% GREEN tasdiqlash.
  4. Vite build orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app` - Ready in 19s) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** School 21 hakamlar hay'ati, Turnir ishtirokchilari, xalqaro auditorlar va investorlar.
- **Format:** `src/**`, `scripts/clean_turnir_src_emojis.py`, `scripts/test_system_integrity.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #27 / 500: Deliverable Dock Preview Verification, Hardware Keyboard Shortcuts E2E Suite (53 Assertions) & Production Deploy
- **Kim siz:** Lead QA Architect & Hardware Interaction Engineer.
- **Nima kerak:**
  1. `index.html` dagi Apple Pro Deliverable Dock orqali hujjatlar modalini (`previewDocument`) ochish va klaviaturadagi `Escape` tugmasi orqali toza yopish mexanizmini sinash.
  2. 4D apparat klaviatura buyruqlari ('1' - jigar paneli, '2' - diabet paneli, '3' - anemiya paneli) orqali namunalar almashinuvi to'g'ri ishlashini tekshirish.
  3. `scripts/test_playwright_e2e.py` da Phase 6 ga hujjatlar modali va apparat klaviatura navigatsiyasi sinovlarini kiritish: umumiy Playwright E2E assertatsiyalar soni **49 tadan 53 taga** yetkazildi va barchasi **100% GREEN** tasdiqlandi.
  4. Vite orqali `dist/` ni yangilash, Vercel production deploy (`turnir-launch-lab.vercel.app` - Ready in 25s) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** Turnir hakamlari, poliklinika rahbarlari, investorlar va klaviatura orqali tezkor boshqaruvchi foydalanuvchilar.
- **Format:** `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #28 / 500: Unicorn Health Deep System Healthcheck Suite (260 Checks), Zero-Emoji & Diego 60-30-10 Audit & Production Deploy
- **Kim siz:** Principal Health Systems Architect & Clinical Software Safety Auditor.
- **Nima kerak:**
  1. `unicorn_health/tests/system_healthcheck.py` ga Zero-Emoji qoidasi (barcha 89 ta portal va sub-sahifalarda 0 emoji) va Diego 60-30-10 Electric Cyan (`#00F5D4`) / Midnight Void (`#06080D`) rang tokenlari auditini integratsiya qilish.
  2. Barcha 11 ta JSON namunaviy ma'lumotlaridagi qoldiq emoji va belgilarni toza `[1-O'RIN]`, `[2-O'RIN]`, `[3-O'RIN]` monoxrom `JetBrains Mono` teglari bilan almashtirish.
  3. `unicorn_health` tizimining 260/260 avtomatlashtirilgan yaxlitlik tekshiruvlarini (barcha 89 ta HTML portallar, 60 ta Python tibbiy tahlil dvigatellari, JSON schemalar, FHIR R4 va Vercel config) 100% GREEN tasdiqlash.
  4. Vercel production deploy: `unicorn-health-uzbekistan.vercel.app` (Ready in 6s).
  5. Turnir asosiy omboridagi 6/6 tizim yaxlitligi va barcha 53 ta Playwright E2E brauzer testlarini 100% GREEN saqlash, Vite qayta qurish va Vercel production (`turnir-launch-lab.vercel.app`) ga yuklash.
- **Kim uchun:** O'zbekiston Sog'liqni Saqlash Vazirligi, hamkor poliklinikalar, xususiy laboratoriyalar, investorlar va School 21 hakamlari.
- **Format:** `unicorn_health/tests/system_healthcheck.py`, `unicorn_health/shared/*.json`, `unicorn_health/tests/HEALTHCHECK_REPORT.json`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #29 / 500: Unified Live Ecosystem Smoke-Test Suite (11 Sites), 7/7 System Integrity Integration & Production Deploy
- **Kim siz:** Principal Full-Stack Verification & Cloud Reliability Architect.
- **Nima kerak:**
  1. 11 ta jonli Vercel platformasini (`turnir-launch-lab`, `unicorn-health-uzbekistan`, `jasur-universe-portfolio`, `jasur-shukurov-portfolio`, `sammuleader`, `test-platform-web`, `sammu-iqtisodiy-tahlil`, `marvarid-export`, `clinic-ai-bot-demo`, `tahlilai-mvp`, `sammu-exam-prep`) real vaqt rejimida avtomatlashtirilgan tekshirish skriptini (`scripts/test_live_ecosystem.py`) yaratish.
  2. Barcha 11 ta platformada: HTTP 200 muvaffaqiyat kodi, jonli DOM da 0 emoji tozaligi, Diego 60-30-10 kislotali rang palitralari tokenlari mavjudligi, samimiy insoniy o'zbek tilidagi klinik/akademik kontekst va tezkor yuklanish (< 1.5s) avtomatlashtirilgan holda 11/11 100% GREEN tasdiqlandi.
  3. `scripts/test_system_integrity.py` tizimiga 7-tekshiruv bosqichi sifatida to'liq integratsiya qilindi: 50 ta faylda 0 emoji, Diego rang tokenlari, 300 ta telemetriya yugurishlari, yuridik shartnomalar, Vite dist artefaktlari, 53 ta Playwright E2E brauzer assertatsiyalari va 11 ta jonli Vercel platformasi tekshiruvi.
  4. Vite orqali qayta qurish, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** Foydalanuvchi, O'zbekiston tibbiyot va ta'lim sohasi mutaxassislari, School 21 texnik hakamlar hay'ati va xalqaro investorlar.
- **Format:** `scripts/test_live_ecosystem.py`, `scripts/test_system_integrity.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.


### Prompt #30 / 500: Receptionist Flywheel, Ingestion Simulator, Patient Drawer & Referral Sheet E2E Suite (57 Assertions) & Production Deploy
- **Kim siz:** Principal Hospital Operations Architect & Full-Stack Automation Engineer.
- **Nima kerak:**
  1. `public/reception.html` da `Escape` klaviatura hodisasi tinglovchisini takomillashtirish: bemor tahrirlash drayveri (`closePatientDrawer`) bilan bir qatorda rasmiy qabul yo'llanmasi modalini (`closeReferralModal`) ham toza yopish mexanizmini joriy qilish.
  2. `scripts/test_playwright_e2e.py` da Phase 7 ga yangi tahlil kelishini avtomatlashtirilgan simulyatsiya qilish (`#btnSimulatePatient`), bemor qabulini tasdiqlash flywheeli (`confirmPatient`), bemor tafsilotlari drayveri va chop etish yo'llanmasi modalini `Escape` tugmasi orqali yopish testlarini kiritish (jami Playwright assertatsiyalari 53 tadan 57 taga yetkazildi va 100% GREEN tasdiqlandi).
  3. Barcha 7/7 tizim yaxlitligi (50 ta faylda 0 emoji, Diego 60-30-10 rang tokenlari, 300 ta telemetriya yugurishlari, PDF shartnomalar, Vite dist, 57 ta Playwright E2E assertatsiyalari va 11 ta jonli Vercel platformasi) 100% GREEN tasdiqlandi.
  4. Vite orqali qayta qurish, Vercel production deploy (`turnir-launch-lab.vercel.app`) va Git remote (`unicornx-gemini-fintech`) ga barcha o'zgarishlarni yuborish.
- **Kim uchun:** Registratorlar, bosh shifokorlar, qabul bo'limi xodimlari, bemorlar va School 21 hakamlar hay'ati.
- **Format:** `public/reception.html`, `scripts/test_playwright_e2e.py`, `PROMPT_ENGINEERING_LOG.md`, Vite build, Vercel deploy, Git commit.
