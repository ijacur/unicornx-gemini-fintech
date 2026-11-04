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
