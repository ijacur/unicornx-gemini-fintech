# 🤖 SUN'IY INTELLEKT BILAN MULOQOT VA PROMP-INJINIRING TARIXI (AI CHAT LOGS)
**Turnir:** School 21 • Launch Lab 21 — 60 daqiqalik AI-Sprint Vaibkoding  
**Jamoa:** Black's (18-slot, Samarqand kampusi)  
**Jamoa tarkibi va rollar:**  
• **Jasur Shukurov (@jasurceo)** — Team Lead & Prompt Engineer (Role 1)  
• **Farrukh Jumayev (@Farrukh_Djumayev)** — Frontend Developer (Role 2)  
• **Bilol (@kind_enough)** — Product Manager (Role 3)  
• **Shoxrux (@Is_it_Blaze)** — QA & Pitch Lead (Role 4)  
**🌐 Global jonli havola:** [https://turnir-launch-lab.vercel.app](https://turnir-launch-lab.vercel.app)  
**🔐 Staff Only PIN:** `2121`  
**Metodologiya:** School 21 rasmiy 4 komponentli formulasi: `[KIM SIZ (Rol)]` + `[NIMA KERAK (Vazifa)]` + `[KIM UCHUN (Kontekst)]` + `[FORMAT (Natija)]`

---

## 🧭 I. DEKOMPOZITSIYA VA PROMP-INJINIRING STRATEGIYASI

Black's jamoasi ushbu 60 daqiqalik sprintda sun'iy intellektga yuzaki topshiriq bermadi. Butun ish 6 ta mantiqiy bosqichga ajratildi:

```
[1-bosqich: Arxitektura] ➔ [2-bosqich: 5 Modul & One-Pager] ➔ [3-bosqich: Kurator & PIN 2121] ➔
[4-bosqich: 3 ta Stress-Test] ➔ [5-bosqich: UZ/RU/EN Tillar] ➔ [6-bosqich: Dist Build & Bugfix]
```

Har bir promp School 21 ning rasmiy formulasiga qat'iy asoslandi:
* **[KIM SIZ]:** Sun'iy intellektga aniq yuqori darajadagi kasbiy rol berish (Staff Frontend Architect, Senior PM, QA Lead).
* **[NIMA KERAK]:** Aniq texnik talablar, cheklovlar va kutilayotgan xatti-harakat.
* **[KIM UCHUN]:** School 21 hakamlar hay'ati, investorlar va inkubator kuratorlari uchun.
* **[FORMAT]:** Qat'iy kod standarti (TypeScript strict, Tailwind CSS v4, LocalStorage persistence, 0 warnings, 0 errors).

---

## 💬 1-BOSQICH: ZERO-BACKEND ARXITEKTURA VA XOTIRA (Minut: 00:00 – 00:12)

### 👤 Jasur (Team Lead & Prompt Engineer):
> **[KIM SIZ]:** Siz — School 21 va Launch Lab 21 turnirining bosh Frontend arxitektori (Staff Engineer) ekansiz.  
> **[NIMA KERAK]:** 60 daqiqalik AI-sprint doirasida startaplar uchun to'liq mijoz tomonida ishlaydigan (Client-Side SPA), tashqi server va backendga aslo bog'lanmagan (Zero-Backend) arxitektura poydevorini yarating. Sahifa yangilanganda (F5 bosilganda) biror bayt ma'lumot yo'qolmasin — brauzer `localStorage`idan foydalanilsin.  
> **[KIM UCHUN]:** School 21 hakamlar hay'ati, investorlar va startap ishtirokchilari uchun.  
> **[FORMAT]:**  
> 1. Stack: React 19, TypeScript (qat'iy rejim), Tailwind CSS v4, Vite.  
> 2. Ma'lumotlar modeli: Modullar massivi (`id`, `title`, `fields`, `placeholders`).  
> 3. Initial State: Kamida 1 ta to'liq loyiha (`EduVibe AI`) va hakamlar sinovi uchun 1 ta toza bo'sh loyiha.

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "Topshiriq qabul qilindi. Live demo paytida server uzilishlari va tarmoq kechikishini 0% ga tushirish maqsadida to'liq avtonom Client-Side SPA modelini quramiz:  
> - `src/types/incubator.ts`: `ModuleItem`, `ProjectData`, `CuratorComment`, `VersionEntry` interfeyslari yaratildi.  
> - `src/lib/storage.ts`: `loadProjects()`, `saveProjects()` funksiyalari orqali `localStorage` bilan reaktiv sinxronizatsiya o'rnatildi.  
> - Ma'lumotlar `JSON.stringify` orqali xavfsiz saqlanadi, F5 bosilganda `useState(() => loadProjects())` yordamida bir zumda tiklanadi."

---

## 💬 2-BOSQICH: 5 TA MODUL VA REAL-TIME ONE-PAGER (Minut: 00:12 – 00:25)

### 👤 Jasur (Team Lead & Prompt Engineer):
> **[KIM SIZ]:** Siz — Senior Product Designer va akseleratsiya dasturlari metodisti ekansiz.  
> **[NIMA KERAK]:** Platformaga 5 ta to'liq akseleratsiya modulini integratsiya qiling. Har bir modulda aniq yo'riqnoma va 3 tadan ekspert savoli bo'lsin. Eng muhimi: foydalanuvchi chap tomondagi maydonlarga ma'lumot kiritishi bilan o'ng tomondagi investitsiya One-Pager vitrinasida 0 soniya kechikish bilan real vaqtda (real-time) aks etsin!  
> **[KIM UCHUN]:** Investitsiya izlayotgan startaplar va Demo Day hakamlari uchun.  
> **[FORMAT]:**  
> 1. 5 ta modul: 1) Muammo & Auditoriya, 2) Yechim & MVP, 3) Bozor & TAM, 4) Moliya & Unit-iqtisodiyot, 5) Jamoa & Natijalar.  
> 2. Dual-Screen: Chapda tahrirlash formasi, o'ngda yig'ilayotgan yagona investitsiya hujjati.  
> 3. **CRITICAL TALAB:** Agar modul to'ldirilmagan bo'lsa, dastur qulamasin (Crash bo'lmasin)! Bo'sh joyda chiroyli sariq kartochka va "Modul to'ldirilmoqda..." ogohlantirishi tursin (Graceful Degrade).

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "Amalga oshirildi. 5 bosqichli konveyer yo'lga qo'yildi:  
> - Har bir modul uchun School 21 talablari asosida ekspert savollari va tayyor etalon shablonlar yaratildi.  
> - Reaktiv sinxronizatsiya: Inputdagi har bir harf darhol o'ng tomondagi One-Pager kartochkalarida aks etadi.  
> - Graceful Degrade: `!isFilled` holatida vyorstka buzilmasligi uchun `AlertCircle` ikonkasi bilan silliq yo'riqnoma bloki render qilinadi."

---

## 💬 3-BOSQICH: KURATOR REJIMI, STAFF PIN 2121 VA A4 PDF (Minut: 00:25 – 00:40)

### 👤 Jasur (Team Lead & Prompt Engineer):
> **[KIM SIZ]:** Siz — EdTech ekotizimlari xavfsizligi va kuratorlik tizimlari bo'yicha yetakchi dasturchisiz.  
> **[NIMA KERAK]:** Loyihaga reglamentning maksimal ball beruvchi qo'shimcha imkoniyatlarini qo'shing:  
> a) Kurator rejimi: Barcha jamoalarni monitoring qilish, baholash va har bir modulga ekspert izohi qoldirish.  
> b) Staff Only Gate: Platforma hozir butun dunyo uchun ochiq (Public Edit) bo'lsin, lekin xohlagan vaqtda kurator rejimini maxfiy PIN-kod (`2121`) bilan begonalardan himoyalash imkoni bo'lsin.  
> c) Versiyalar tarixi (Time Machine): Loyihaning istalgan oldingi tahririni 1-bosishda tiklash (Rollback).  
> d) Geymifikatsiya va A4 PDF: Har bir to'ldirilgan modul uchun beydjlar va investorlarga taqdim etish uchun toza oq fonda A4 PDF eksport.  
> **[KIM UCHUN]:** Launch Lab 21 trekerlari, mentorlar va korporativ investorlar uchun.  
> **[FORMAT]:** TypeScript strict, CSS `@media print` qoidalari, modal oynalar va Canvas Confetti.

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "Barcha qo'shimcha imkoniyatlar muvaffaqiyatli dasturlandi:  
> - Yuqori menyuda `Участник / Куратор` rejimlari ulandi.  
> - `Staff Only PIN (2121)` darchasi kiritildi — to'g'ri PIN kiritilmaguncha hakamlik boshqaruvi ochilmaydi.  
> - `versionHistory` har bir tahrir uchun avtomatik vaqt tamg'asi bilan snapshot oladi va 'Tiklash' tugmasi bilan eski holatga qaytaradi.  
> - `@media print` yordamida printer va PDF eksporti qora fondan investorlar talabidagi toza oq A4 formatiga avtomatik o'tadi."

---

## 💬 4-BOSQICH: JONLI STRESS-TESTLAR VA 3 DAQIQALIK PITCH KOKPITI (Minut: 00:40 – 00:50)

### 👤 Jasur (Team Lead & Prompt Engineer):
> **[KIM SIZ]:** Siz — QA Automation va Live Demo bo'yicha yetakchi muhandissiz.  
> **[NIMA KERAK]:** Sahnada hakamlar oldida 3 daqiqalik himoya paytida yuzaga kelishi mumkin bo'lgan 3 ta eng qiyin stress-testni kod darajasida avtomatlashtiring:  
> 1. F5 Reload tekshiruvi: Sahifa yangilanganda xotira saqlanishi va audit logi.  
> 2. Hakamning maxfiy nazorat frazasini kiritganda darhol One-Pagerda binafsharang kartochkada ko'rsatish.  
> 3. Bo'sh modul tekshiruvi: Dastur oq ekranga aylanmasdan bo'sh holatni ko'rsatishi.  
> 4. Sayt yuqorisiga 3 daqiqalik (180 soniya) jonli vaqt taymerini o'rnating.  
> **[KIM UCHUN]:** Hakamlar hay'ati va jonli sahnadagi spikerimiz (Shoxrux) uchun.  
> **[FORMAT]:** 1-bosishda ishlovchi boshqaruv tugmalari va real vaqt taymeri.

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "Sahnadagi himoya uchun maxsus «⚡ Питч & Проверка Жюри» (Pitch Cockpit) paneli qurildi:  
> - Test 1: `handleVerifyF5` — `localStorage` holatini saqlab, sahifani yangilaydi va 'F5 tekshiruvi muvaffaqiyatli o'tdi' auditini chiqaradi.  
> - Test 2: `handleInjectJuryPhrase` — hakam xohlagan so'zni One-Pagerning maxsus kartochkasiga 0ms da kiritadi.  
> - Test 3: Bo'sh loyihani ko'rsatib, vyorstka mustahkamligini isbotlaydi.  
> - 180 soniyalik Pitch taymeri (Start / Pause / Reset) to'liq integratsiya qilindi."

---

## 💬 5-BOSQICH: 3 TILLI REJIM (UZ / RU / EN) VA SLAYDLAR INTEGRATSIYASI (Minut: 00:50 – 00:55)

### 👤 Jasur (Team Lead & Prompt Engineer):
> **[KIM SIZ]:** Siz — Xalqaro miqyosdagi Fullstack muhandissiz.  
> **[NIMA KERAK]:** Hakamlar va foydalanuvchilar orasida turli tillarda so'zlashuvchilar bo'lishi mumkin. Platformani to'liq 3 ta tilda ishlaydigan qiling:  
> 🇺🇿 O'zbekcha | 🇷🇺 Русский | 🇬🇧 English!  
> Til almashganda modullar nomlari, ko'rsatmalar, promp-formulasi, tugmalar va One-Pager sarlavhalari o'sha tilda ochilsin, foydalanuvchi kiritgan ma'lumotlar esa o'chmasin. Shuningdek, One-Pager tepasiga 3 varaqli taqdimot PDF slaydlarini yuklab olish tugmasini qo'shing.  
> **[KIM UCHUN]:** Xalqaro hakamlar va keng auditoriya uchun.  
> **[FORMAT]:** `src/lib/i18n.ts` lug'ati, yuqori menyuda til selektori, LocalStorage'da tanlangan tilni eslab qolish.

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "`src/lib/i18n.ts` arxitekturasi yaratildi:  
> - 3 ta tilda to'liq UI, 5 ta modulning barcha topshiriqlari, maydonlari va School 21 formulalari tarjima qilindi.  
> - Yuqori menyuda `🇺🇿 UZ`, `🇷🇺 RU`, `🇬🇧 EN` tugmalari joylashtirildi.  
> - Tanlangan til `localStorage.getItem('launch_lab_lang')` orqali saqlanadi.  
> - `presentation.pdf` platforma ichiga joylashtirildi va 'Slaydlar / Taqdimot (PDF)' tugmasi ulandi."

---

## 💬 6-BOSQICH: JURI XATOSINI TUZATISH: SOURCE EMAS, DIST BUNDLE (Minut: 00:55 – 00:60)

### ⚠️ Hakamlar / Telegram Botidan ogohlantirish:
> *"Команда «Black's»: проект у жюри не откроется, вы прислали исходники, а не сборку. В index.html подключён src/main.tsx, браузер такое не запускает, страница белая. Сделайте npm run build, заархивируйте dist и пришлите zip боту."*

### 👤 Jasur (Team Lead & Prompt Engineer) — Tezkor AI tuzatish buyrug'i:
> **[KIM SIZ]:** Siz — DevOps va Build Systems mutaxassisisiz.  
> **[NIMA KERAK]:** Hakamlar arxivni ochganda oq ekran chiqmasligi uchun:  
> 1. `vite.config.ts` ga `base: './'` qo'shing (hakamlar istalgan papkadan yoki serverdan ochsa ham yo'llar to'g'ri ishlashi uchun).  
> 2. `npm run build` orqali to'liq TypeScript va React 19 kodini toza `dist/` papkasiga yig'ing.  
> 3. `dist/` ichidagi fayllarni to'g'ridan-to'g'ri ildizida `index.html` va `assets/` bo'ladigan qilib `dist.zip` arxiviga joylang.  
> 4. `npm run preview` orqali lokal tekshirib, Vercel-ga ham yangi buildni qayta deploy qiling.  
> **[KIM UCHUN]:** Hakamlar bot tizimi va avtomatlashtirilgan tekshiruv uchun.  
> **[FORMAT]:** 0 xato, toza bundle, `dist.zip` tayyorlash.

### 🤖 Sun'iy Intellekt (Tahlil va Yechim):
> "Xato chuqur tahlil qilindi va darhol bartaraf etildi:  
> - `vite.config.ts` ga `base: './'` nisbiy yo'llar qoidasi o'rnatildi.  
> - `npm run build` 193ms ichida muvaffaqiyatli yakunlandi: `dist/assets/index-C_b3I5XD.js` (374 KB) va `dist/assets/index-BKVZTnky.css` (54 KB) hosil bo'ldi.  
> - `dist.zip` yaratildi: arxiv ochilganda ildizida `index.html`, `presentation.pdf` va `assets/` turadi — brauzerda 0 soniyada oq ekransiz ochiladi!  
> - Vercel production to'liq yangilandi: `https://turnir-launch-lab.vercel.app`."

---

## 🏆 NATIJA VA XULOSA

Black's jamoasining ushbu dialog jurnali quyidagilarni isbotlaydi:
1. **Promp-injiniring madaniyati:** Barcha vazifalar School 21 ning rasmiy 4 komponentli formulasiga qat'iy amal qilib yozilgan.
2. **Arxitektura mustahkamligi:** Serverlarsiz (Zero-Backend), to'liq oflayn ishlovchi, F5-safe va 3 tilli ekotizim yaratildi.
3. **Muvaffaqiyatli muammolarni yechish (Debugging):** Hakamlar ogohlantirishi bir necha daqiqada tahlil qilinib, to'liq ishchi `dist` paketiga aylantirildi.

Black's jamoasi g'alabaga 100% loyiq va tayyor! 🥇
