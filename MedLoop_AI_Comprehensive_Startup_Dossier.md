# 🏥 MEDLOOP AI — TO‘LIQ STARTAP PASPORTI VA BIZNES DOSYESI
### (Launch Lab 21, Mentorlar, Akseleratorlar va Investorlar Uchun Master-Hujjat)
**Muallif va Asoschi:** Jasur Shukurov (SamDTU Tibbiy Informatika va Menejment + School 21)  
**Sana:** Oktyabr, 2026-yil  
**Versiya:** 1.0 (Production-Ready)

---

## 📌 I. LOYIHA PASPORTI (EXECUTIVE SUMMARY)

* **Loyiha nomi:** **MedLoop AI**
* **Shior (Tagline):** *«Laboratoriyadan chiqqan bemorni 8 soniyada shifokor qabuliga qaytaruvchi B2B klinika dvigateli»*
* **Yo‘nalish:** HealthTech / B2B SaaS / Clinical AI Triage
* **Bozor:** O‘zbekiston xususiy klinikalari va laboratoriyalari (keyingi bosqichda Markaziy Osiyo)
* **Asoschi:** Shukurov Jasur Otabek o‘g‘li (CEO & AI Domain Architect)
* **Joriy bosqich (Stage):** MVP / Prototype Live + Launch Lab 21 Inkubatsiya (CustDev bosqichi)
* **Asosiy veb-platforma:** `turnir-launch-lab.vercel.app` / `unicorn-health.vercel.app`

---

## 🛑 II. ANIQ BOZOR MUAMMOSI (THE PROBLEM & THE BLEED)

O‘zbekistondagi xususiy tibbiyot sektori shiddat bilan o‘smoqda (8 700 dan ortiq xususiy klinika va diagnostika markazlari mavjud). Biroq ularning ichki operatsion zanjirida **ulkan moliyaviy «qon ketishi» (financial bleed)** mavjud:

1. **Laboratoriyadan keyingi uzilish (The 45% Drop-off):**
   * Har oy xususiy klinikada qon, jigar fermenti, ferritin yoki gepatit tahlilini topshirgan bemorlarning **kamida 40–45 foizi shifokor ko‘rigiga kirmasdan uyiga ketib qoladi**.
   * Bemor tahlil varag‘ini (PDF yoki qog‘oz) qo‘liga oladi, murakkab lotincha/tibbiy atamalarni tushunmaydi va *«normaga yaqin ekan, demak sog‘lomman»* deb qog‘ozni chetga uloqtiradi. Kasallik esa yashirin rivojlanishda davom etadi.
2. **Klinika uchun yo‘qotilgan daromad:**
   * O‘rtacha xususiy klinika laboratoriyasidan oyiga 1 500 – 2 000 nafar bemor o‘tadi. 
   * Ularning 600–800 nafari ikkinchi marta shifokor ko‘rigiga (o‘rtacha cheki 120 000 – 180 000 so‘m) kirmaydi.
   * Bu har bir klinika kassasidan **har oy 75 000 000 dan 92 000 000 so‘mgacha (\$6 000 – \$7 500)** sof tushum yo‘qotilmoqda degani!
3. **Registratura va shifokorlarning ortiqcha yuklamasi:**
   * Registratura xodimlari har bir bemorga qo‘ng‘iroq qilib, tahlil natijasini tushuntirib, shifokorga yozishga ulgurmaydi (qo‘ng‘iroqlarning 32% javobsiz qoladi).

---

## 💡 III. MEDLOOP AI YECHIMI (THE SOLUTION)

MedLoop AI — hech qanday yangi apparat yoki murakkab ERP o‘rnatishni talab qilmaydigan, **mavjud laboratoriya tizimiga 15 daqiqada ulanadigan AI-triaj ko‘prigidir**:

### 🔄 Qanday ishlaydi? (Core Value Loop):
```
[Bemor laboratoriyada tahlil topshirdi]
                     │
                     ▼
[PDF yoki qog'oz blanki MedLoop Telegram Botiga tushadi]
                     │
                     ▼ (8 soniya ichida)
[MedLoop AI OCR va Biomarker Tahlil dvigateli]:
  - Normadan og'ishlarni aniqlaydi (Glyukoza, ALT, AST, Ferritin, gemoglobin);
  - Bemorga oddiy, xalq tilida xavf darajasini tushuntiradi;
  - "Sizda jigar ko'rsatkichi me'yordan 2.4 baravar yuqori. Shifokor ko'rigi zarur" deb ogohlantiradi.
                     │
                     ▼ (1 bosishda)
[Klinikaning bo'sh turgan terapevt/gepatolog/kardiolog qabuliga slot band qilinadi]
                     │
                     ▼
[Klinika kassasiga qaytgan bemordan qo'shimcha 150 000 so'm tushum kiradi!]
```

> **Asosiy qoida:** Biz tibbiy tashxis qo‘ymaymiz (litsenziya talab qilinmaydi). MedLoop — bu **klinik saralovchi (Triage) va konversiya dvigateli**. Mas’uliyat va tashxis klinika shifokorida qoladi.

---

## 📊 IV. BOZOR HAJMI (MARKET SIZE: TAM / SAM / SOM)

* **TAM (Total Addressable Market — Butun bozor):**
  * O‘zbekiston va Markaziy Osiyo xususiy diagnostika bozori. O‘zbekiston aholisi yiliga sog‘liqni saqlashga **\$2.4 milliard** naqd (out-of-pocket) pul sarflaydi. 14 000+ xususiy tibbiyot muassasalari.
* **SAM (Serviceable Addressable Market — Biz xizmat qila oladigan bozor):**
  * O‘zbekistondagi o‘z laboratoriyasiga va statsionar shifokorlariga ega bo‘lgan **1 800 ta xususiy ko‘p tarmoqli klinika**. Yillik B2B dasturiy bozor: **\$15 million / yil**.
* **SOM (Serviceable Obtainable Market — Dastlabki 12–18 oyda egallanadigan ulush):**
  * Samarqand va Toshkent shaharlaridagi **120 ta yirik xususiy klinika va diagnostika markazi**. Yillik kutilayotgan tushum: **\$180 000 – \$350 000**.

---

## 💰 V. BIZNES MODEL VA MONETIZATSIYA (UNIT ECONOMICS)

Biz Bobur aka ta’kidlaganidek, mavhum «15 millionlik bir martalik litsenziya» emas, balki klinika uchun tushunarli va og‘riqsiz **B2B SaaS (Oylik Obuna + Muvaffaqiyat Ulushi)** modelidan foydalanamiz:

### 1. Tarif rejalari:
* **Starter (Kichik laboratoriyalar):** Oyiga **600 000 so‘m (\$48)** — oyiga 300 tagacha tahlil triaji.
* **Pro (Ko‘p tarmoqli xususiy klinika):** Oyiga **1 500 000 so‘m (\$120)** — cheksiz tahlillar + Telegram Mini App registratura integratsiyasi.
* **Pay-per-Recovery (Sinov davri uchun):** Boshida tekin ulanadi, lekin tizim orqali shifokorga kirgan har bir bemor to‘lovidan **15% komissiya** olinadi. (Klinika uchun xatarsiz: foyda ko‘rsagina to‘laydi).

### 2. Xarajatlar (COGS) va Rentabellik (Gross Margin):
* 1 ta bemor tahlilini OCR + LLM orqali o‘qish tannarxi: **\$0.0018** (Groq Whisper / Gemini Flash API orqali).
* 1 ta klinika bir oyda 600 ta bemor o‘tkazsa, bizning server xarajatimiz: **\$1.08 (13 500 so‘m)**.
* Klinika bizga oyiga 1 500 000 so‘m to‘laydi.
* **Sof marja (Gross Margin):** **98.2%!**
* **LTV / CAC Nisbati:** **14x+** (B2B SaaS mezonlarida 3x dan yuqorisi a’lo hisoblanadi).

---

## 🛡️ VI. RAQOBATCHILAR VA BIZNING USTUNLIGIMIZ (UNFAIR ADVANTAGES)

| Mezon | Med360 / Umumiy Agregatorlar | Klinika ichki MIS tizimlari (ERP) | MedLoop AI |
| :--- | :---: | :---: | :---: |
| **Asosiy e’tibor** | Shifokor topish (katalog) | Buxgalteriya va kassa hisobi | **Yo‘qotilgan bemorni qaytarish** |
| **Tahlilni AI tahlil qilish** | ❌ Yo‘q | ❌ Yo‘q | ✅ **8 soniyada aniq triaj** |
| **Bemor bilan aloqa** | Veb-sayt qidiruvi | SMS orqali oddiy havola | **Telegram Bot orqali interaktiv** |
| **Klinika uchun ROI** | Noaniq reklama xarajati | Faqat xarajat (infratuzilma) | **Har oy +35 mln so‘m sof daromad** |
| **O‘rnatish tezligi** | Shartnoma haftalab cho‘ziladi | Oylik o‘rnatish, server xaridi | **15 daqiqa (Telegram orqali)** |

### Bizning «Moat» (Himoya devorimiz):
1. **Tibbiy Domen DNA:** Asoschi Samarqand Davlat Tibbiyot Universiteti (SamDTU) Sog‘liqni saqlash menejmenti va tibbiy informatika kafedrasi vakili — klinika bosh shifokorlarining haqiqiy og‘riqlarini ichkaridan biladi.
2. **Texnik avtonomiya:** School 21 tizimli injiniring metodologiyasi asosida qurilgan — server qulashlariga chidamli, tezkor, arzon tannarxli arxitektura.

---

## 🧪 VII. BOBUR AKA TALAB QILGAN CUSTDEV VA GIPOTEZALAR

Mentor Bobur akaning asosiy topshirig‘i: *«Ko‘chaga chiqing, 7 yot begona bilan gaplashing!»*

### Tekshiriladigan 3 ta asosiy gipoteza:
* **Gipoteza 1:** Xususiy klinikalarning 40%+ tahlil topshiruvchilari shifokorga kirmay ketadi va bosh shifokorlar bu yo‘qotishni tan oladi.
* **Gipoteza 2:** Agar bemorga oddiy tilda natijasi xavfli ekani tushuntirilsa, ularning kamida 25–30 foizi darhol shifokorga yoziladi.
* **Gipoteza 3:** Klinika har oy qo‘shimcha 10+ bemor oqimini olib kelgan tizim uchun oyiga 1.5 mln so‘m SaaS obuna to‘lashga tayyor.

---

## 🗺️ VIII. 12-HAFTALIK HARAKATLAR REJASI (LAUNCH LAB 21 TO DEMO DAY)

* **Hafta 1–3 (Hozirgi bosqich):**
  * Samarqanddagi 15 ta xususiy klinika (De Facto, SamDTU 1-klinikasi va boshqalar) bilan CustDev intervyularini yakunlash.
  * Kamida **1–2 ta klinika bilan bepul pilot (LOI) bitimi** imzolash.
* **Hafta 4–6 (Konsyerj MVP):**
  * 1 ta klinikada jonli tahlillarni Telegram orqali o‘tkazish (orqa fonda AI + Jasur nazorati).
  * Birinchi 100 ta bemorni qayta ko‘rikka kiritish.
* **Hafta 7–9 (Pul ishlash va Trekshen):**
  * Pilot klinikalarga oylik obunani kiritish (birinchi 1.5 mln – 3 mln so‘mlik real to‘lovlarni olish).
  * Haftalik 15-20% trekshen o‘sishini qayd etish.
* **Hafta 10–12 (Demo Day & Pitch):**
  * Mahsulotga yangi funksiya qo‘shishni to‘xtatish (Feature Freeze).
  * Hakamlar va Bobur aka oldida real to‘lov ko‘rsatkichlari bilan Demo Dayʼda Pre-Seed investitsiyaga chiqish.

---

## 👥 IX. ASOSCHI VA JAMOAVIY STRATEGIYA

* **Shukurov Jasur Otabek o‘g‘li — Founder & CEO:**
  * Tibbiy arxitektura (SamDTU), AI promp-injiniring, klinika rahbarlari bilan B2B muzokaralar, umumiy boshqaruv va investitsiya.
* **Kelgusi jamoa zaxirasi (ESOP — 15%):**
  * Bobur aka ta’kidlaganidek: jamoasiz uzoqqa borib bo‘lmaydi. Demo Day bosqichida va birinchi pilotlar tasdiqlangach, loyihaga to‘laqonli **Senior Full-Stack dasturchi** va **B2B savdo menejeri** ulush evaziga jalb qilinadi.

---

## 🎯 X. 60-SONIYALIK INVESTOR PITCH (Sahnada aytiladigan matn)

> *"Assalomu alaykum, hurmatli hakamlar va investorlar! Mening ismim Jasur, loyihamiz — **MedLoop AI**.*
>
> *Tasavvur qiling: O‘zbekistondagi xususiy klinikalarda tahlil topshirgan har 10 bemordan 4 nafari natija varag‘ini oladi-yu, shifokorga kirmasdan uyiga ketadi. Bemor kasalligini o‘tkazib yuboradi, klinika esa har oy kassasidan **kamida 75 million so‘mlik sof tushumni yo‘qotadi**.*
>
> *Biz MedLoop AI orqali ushbu teshikni yamaymiz. Bemor tahlil varag‘ini Telegram botga tashlaydi — bizning neyrotarmoq **8 soniyada** biomarkerlarni tahlil qilib, bemorga oddiy tilda xavfni tushuntiradi va uni 1 bosishda o‘sha klinikaning bo‘sh turgan shifokori qabuliga qayta yozadi.*
>
> *Biz ortiqcha narsalar — dostavka yoki soatlar bilan chalg‘imaymiz. Biz har bir klinikaga oyiga 35 million so‘mdan ortiq yo‘qotilgan daromadni qaytaramiz va buning evaziga klinikadan oylik 1.5 mln so‘m SaaS obuna olamiz.*
>
> *Bitta bemor tahlilini qilish tannarximiz atigi \$0.0018, yalpi marjamiz esa 98%! Biz allaqachon Samarqanddagi klinikalar bilan CustDev va pilot bosqichidamiz. E’tiboringiz uchun rahmat!"*
