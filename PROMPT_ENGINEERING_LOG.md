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
