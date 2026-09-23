export type Language = 'uz' | 'ru' | 'en'

export interface I18nModuleField {
  id: string
  label: string
  placeholder: string
}

export interface I18nPromptFormula {
  roleLabel: string
  role: string
  taskLabel: string
  task: string
  contextLabel: string
  context: string
  formatLabel: string
  format: string
  kimSiz?: string
  nimaKerak?: string
  kimUchun?: string
}

export interface I18nModule {
  id: string
  title: string
  badge: string
  description: string
  task: string
  placeholder: string
  template: string
  fields: I18nModuleField[]
  promptFormula: I18nPromptFormula
}

export const UI_TRANSLATIONS: Record<Language, {
  brandTitle: string
  brandSubtitle: string
  navModules: string
  navOnePager: string
  navCurator: string
  navGallery: string
  navReels: string
  pitchTimer: string
  start: string
  pause: string
  reset: string
  project: string
  selectProject: string
  newProject: string
  projectMembers: string
  progress: string
  completed: string
  roleParticipant: string
  roleCurator: string
  juryChecksTitle: string
  test1Title: string
  test1Desc: string
  test2Title: string
  test2Desc: string
  test3Title: string
  test3Desc: string
  secretPhrasePrompt: string
  secretPhraseDefault: string
  staffOnlyBadge: string
  openAccessBadge: string
  enterPin: string
  pinPlaceholder: string
  unlockStaff: string
  cancel: string
  copyText: string
  copied: string
  share: string
  linkCopied: string
  slidesPdf: string
  exportPdf: string
  onePagerTitle: string
  emptyModuleWarning: string
  curatorNotesTitle: string
  addCuratorNote: string
  authorName: string
  writeComment: string
  sendComment: string
  versionHistory: string
  restoreVersion: string
  restored: string
  promptFormulaBtn: string
  promptFormulaModalTitle: string
  close: string
  formulaExplanation: string
  demoDayGallery: string
  searchProjects: string
  allProjects: string
  approvedStatus: string
  inReviewStatus: string
  draftStatus: string
  openProject: string
  emptyFieldNotice: string
  tamLabel: string
  samLabel: string
  somLabel: string
  formulaNote: string
  editProfile: string
  save: string
}> = {
  uz: {
    brandTitle: 'LAUNCH LAB 21',
    brandSubtitle: 'Startap Inkubatori & One-Pager Generator',
    navModules: '1. Modullar',
    navOnePager: '2. One-Pager Vitrinasi',
    navCurator: '3. Kurator Rejimi',
    navGallery: '4. Demo Day Ko\'rgazmasi',
    navReels: '5. 📱 Startap Reels (Lenta)',
    pitchTimer: '3 Daqiqalik Pitch Taymeri',
    start: 'Boshlash',
    pause: 'To\'xtatish',
    reset: 'Qayta o\'rnatish',
    project: 'Loyiha',
    selectProject: 'Loyihani tanlang',
    newProject: '+ Yangi loyiha',
    projectMembers: 'Jamoa tarkibi',
    progress: 'Tugallanishi',
    completed: 'tayyor',
    roleParticipant: 'Ishtirokchi',
    roleCurator: 'Kurator / Hakam',
    juryChecksTitle: 'Hakamlar tekshiruvi (Jury Checks):',
    test1Title: '1. F5 Tekshiruv',
    test1Desc: 'F5 Stress-Test (LocalStorage Persistence)',
    test2Title: '2. Jonli sinxron',
    test2Desc: 'Maxfiy nazorat frazasini sinxronlash',
    test3Title: '3. Bo\'sh modul',
    test3Desc: 'Graceful Degrade (Bo\'sh holatni tekshirish)',
    secretPhrasePrompt: 'Hakamning maxfiy nazorat frazasini kiriting:',
    secretPhraseDefault: "Black's jamoasi 2026 turnir mutlaq g'olibi!",
    staffOnlyBadge: '🔒 Faqat Xodimlar (Staff Only)',
    openAccessBadge: '🌐 Ochiq Tahrir (Public Edit)',
    enterPin: 'Kurator xavfsizlik PIN-kodini kiriting (2121):',
    pinPlaceholder: 'PIN kiriting (masalan, 2121)',
    unlockStaff: 'Rejimni ochish',
    cancel: 'Bekor qilish',
    copyText: 'Matnni nusxalash',
    copied: 'Nusxalandi!',
    share: 'Ulashish',
    linkCopied: 'Havola nusxalandi!',
    slidesPdf: 'Slaydlar / Taqdimot (PDF)',
    exportPdf: 'PDF Chop etish / Eksport',
    onePagerTitle: 'LAUNCH LAB 21 • INVESTITSIYA ONE-PAGER',
    emptyModuleWarning: 'Ushbu modul hali to\'ldirilmagan. Chap tarafdagi formani to\'ldiring.',
    curatorNotesTitle: 'Kurator va Hakamlar izohlari',
    addCuratorNote: 'Ekspert izohi qoldirish',
    authorName: 'Ismingiz va rolingiz',
    writeComment: 'Loyiha bo\'yicha fikr va tavsiyalaringizni yozing...',
    sendComment: 'Izohni yuborish',
    versionHistory: 'Versiyalar tarixi (Time Machine)',
    restoreVersion: 'Ushbu versiyani tiklash',
    restored: 'Versiya muvaffaqiyatli tiklandi!',
    promptFormulaBtn: 'School 21 Promp-injiniring Formulasi',
    promptFormulaModalTitle: 'School 21 • 4 Komponentli Promp Formulasi',
    close: 'Yopish',
    formulaExplanation: 'Sun\'iy intellektdan eng yuqori sifatli javob olish uchun rasmiy formula:',
    demoDayGallery: 'Demo Day Loyihalar Ko\'rgazmasi',
    searchProjects: 'Loyiha nomi yoki jamoa bo\'yicha qidirish...',
    allProjects: 'Barcha loyihalar',
    approvedStatus: 'Qabul qilindi',
    inReviewStatus: 'Ko\'rib chiqilmoqda',
    draftStatus: 'Qoralama',
    openProject: 'Loyihani ochish',
    emptyFieldNotice: 'Ma\'lumot kiritilmoqda...',
    tamLabel: 'TAM (Umumiy bozor)',
    samLabel: 'SAM (Xizmat ko\'rsatiladigan bozor)',
    somLabel: 'SOM (Haqiqiy ulushimiz)',
    formulaNote: 'Formula: LTV / CAC ≥ 3 = Moliyaviy Barqarorlik',
    editProfile: 'Loyihani tahrirlash',
    save: 'Saqlash'
  },
  ru: {
    brandTitle: 'LAUNCH LAB 21',
    brandSubtitle: 'Инкубатор стартапов & One-Pager Генератор',
    navModules: '1. Модули',
    navOnePager: '2. Витрина One-Pager',
    navCurator: '3. Режим куратора',
    navGallery: '4. Галерея Demo Day',
    navReels: '5. 📱 Стартап Reels (Лента)',
    pitchTimer: '3-минутный таймер питча',
    start: 'Старт',
    pause: 'Пауза',
    reset: 'Сброс',
    project: 'Проект',
    selectProject: 'Выберите проект',
    newProject: '+ Новый проект',
    projectMembers: 'Состав команды',
    progress: 'Готовность',
    completed: 'готово',
    roleParticipant: 'Участник',
    roleCurator: 'Куратор / Жюри',
    juryChecksTitle: 'Проверка жюри (Jury Checks):',
    test1Title: '1. F5 Проверка',
    test1Desc: 'F5 Стресс-тест (LocalStorage Persistence)',
    test2Title: '2. Живой синхрон',
    test2Desc: 'Синхронизация секретной фразы жюри',
    test3Title: '3. Пустой модуль',
    test3Desc: 'Graceful Degrade (Проверка пустого состояния)',
    secretPhrasePrompt: 'Введите контрольную фразу жюри:',
    secretPhraseDefault: 'Команда Black\'s — абсолютный победитель 2026!',
    staffOnlyBadge: '🔒 Только персонал (Staff Only)',
    openAccessBadge: '🌐 Открытый доступ (Public Edit)',
    enterPin: 'Введите PIN-код куратора (2121):',
    pinPlaceholder: 'Введите PIN (например, 2121)',
    unlockStaff: 'Разблокировать',
    cancel: 'Отмена',
    copyText: 'Копировать текст',
    copied: 'Скопировано!',
    share: 'Поделиться',
    linkCopied: 'Ссылка скопирована!',
    slidesPdf: 'Слайды / Презентация (PDF)',
    exportPdf: 'Экспорт в PDF / Печать',
    onePagerTitle: 'LAUNCH LAB 21 • ИНВЕСТИЦИОННЫЙ ONE-PAGER',
    emptyModuleWarning: 'Этот модуль пока не заполнен. Заполните форму слева.',
    curatorNotesTitle: 'Комментарии куратора и жюри',
    addCuratorNote: 'Оставить экспертную оценку',
    authorName: 'Ваше имя и должность',
    writeComment: 'Напишите рекомендации и фидбек для команды...',
    sendComment: 'Отправить комментарий',
    versionHistory: 'История версий (Time Machine)',
    restoreVersion: 'Восстановить версию',
    restored: 'Версия успешно восстановлена!',
    promptFormulaBtn: 'Формула промпт-инжиниринга Школы 21',
    promptFormulaModalTitle: 'Школа 21 • 4-компонентная формула промпта',
    close: 'Закрыть',
    formulaExplanation: 'Официальная формула для получения идеального ответа от ИИ:',
    demoDayGallery: 'Галерея проектов Demo Day',
    searchProjects: 'Поиск по названию или команде...',
    allProjects: 'Все проекты',
    approvedStatus: 'Одобрено',
    inReviewStatus: 'На рассмотрении',
    draftStatus: 'Черновик',
    openProject: 'Открыть проект',
    emptyFieldNotice: 'Данные вводятся...',
    tamLabel: 'TAM (Общий объём рынка)',
    samLabel: 'SAM (Доступный объём рынка)',
    somLabel: 'SOM (Реально достижимая доля)',
    formulaNote: 'Формула: LTV / CAC ≥ 3 = Финансовая устойчивость',
    editProfile: 'Редактировать проект',
    save: 'Сохранить'
  },
  en: {
    brandTitle: 'LAUNCH LAB 21',
    brandSubtitle: 'Startup Incubator & One-Pager Generator',
    navModules: '1. Modules',
    navOnePager: '2. One-Pager Showcase',
    navCurator: '3. Curator Mode',
    navGallery: '4. Demo Day Gallery',
    navReels: '5. 📱 Startup Reels (Feed)',
    pitchTimer: '3-Minute Pitch Timer',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    project: 'Project',
    selectProject: 'Select Project',
    newProject: '+ New Project',
    projectMembers: 'Team Members',
    progress: 'Progress',
    completed: 'completed',
    roleParticipant: 'Participant',
    roleCurator: 'Curator / Jury',
    juryChecksTitle: 'Jury Stress-Tests:',
    test1Title: '1. F5 Check',
    test1Desc: 'F5 Stress-Test (LocalStorage Persistence)',
    test2Title: '2. Live Sync',
    test2Desc: 'Live Secret Jury Phrase Sync',
    test3Title: '3. Empty Module',
    test3Desc: 'Graceful Degradation (Empty State Test)',
    secretPhrasePrompt: 'Enter jury control test phrase:',
    secretPhraseDefault: "Team Black's is the undisputed 2026 Champion!",
    staffOnlyBadge: '🔒 Staff Only Mode',
    openAccessBadge: '🌐 Public Edit Mode',
    enterPin: 'Enter Curator Security PIN (2121):',
    pinPlaceholder: 'Enter PIN (e.g., 2121)',
    unlockStaff: 'Unlock Access',
    cancel: 'Cancel',
    copyText: 'Copy Text',
    copied: 'Copied!',
    share: 'Share Link',
    linkCopied: 'Link Copied!',
    slidesPdf: 'Slides / Deck (PDF)',
    exportPdf: 'Export to PDF / Print',
    onePagerTitle: 'LAUNCH LAB 21 • INVESTMENT ONE-PAGER',
    emptyModuleWarning: 'This module is not filled yet. Fill out the form on the left.',
    curatorNotesTitle: 'Curator & Jury Feedback',
    addCuratorNote: 'Leave Expert Feedback',
    authorName: 'Your Name & Role',
    writeComment: 'Write recommendations and evaluation for this team...',
    sendComment: 'Send Comment',
    versionHistory: 'Version History (Time Machine)',
    restoreVersion: 'Restore Version',
    restored: 'Version successfully restored!',
    promptFormulaBtn: 'School 21 Prompt-Engineering Formula',
    promptFormulaModalTitle: 'School 21 • 4-Component Prompt Formula',
    close: 'Close',
    formulaExplanation: 'Official formula for getting high-precision responses from AI:',
    demoDayGallery: 'Demo Day Project Gallery',
    searchProjects: 'Search projects by name or team...',
    allProjects: 'All Projects',
    approvedStatus: 'Approved',
    inReviewStatus: 'In Review',
    draftStatus: 'Draft',
    openProject: 'Open Project',
    emptyFieldNotice: 'Awaiting input...',
    tamLabel: 'TAM (Total Addressable Market)',
    samLabel: 'SAM (Serviceable Addressable Market)',
    somLabel: 'SOM (Serviceable Obtainable Market)',
    formulaNote: 'Formula: LTV / CAC ≥ 3 = Financially Viable',
    editProfile: 'Edit Project',
    save: 'Save'
  }
}

export const MODULES_TRANSLATIONS: Record<Language, I18nModule[]> = {
  uz: [
    {
      id: 'problem',
      title: '1. Muammo va auditoriya',
      badge: 'Poydevor',
      description: 'Mijozlarning eng og\'riqli muammosini va bu muammoni eng ko\'p his qilayotgan bozor segmentini belgilang.',
      task: 'Foydalanuvchilarning real muammosini, hozirda uni qanday hal qilishayotganini va nima uchun mavjud yechimlar samarasizligini yozing.',
      placeholder: 'Loyiha hal qilayotgan muammo va maqsadli auditoriyani tasvirlang...',
      template: '• Muammo: Boshlang\'ich startaplarning 70% g\'oyasini investorlar uchun tizimli One-Pager ko\'rinishida ifodalay olmaydi.\n• Hozirgi muqobillar: Tarqoq Google Docs va haftalab vaqt yo\'qotish.\n• Maqsadli auditoriya: O\'z IT-biznesini boshlayotgan School 21 talabalari va bitiruvchilari.',
      fields: [
        {
          id: 'problem_core',
          label: 'Loyihangiz qanday asosiy muammoni hal qiladi?',
          placeholder: 'Masalan: Startaplarning 70% tizimsizlik tufayli arizadan yiqiladi...'
        },
        {
          id: 'problem_target',
          label: 'Ushbu muammodan kim eng ko\'p aziyat chekmoqda (auditoriya)?',
          placeholder: 'Masalan: School 21 va oliygohlarning ilk startapini boshlayotgan yoshlari...'
        },
        {
          id: 'problem_alternatives',
          label: 'Bugungi kunda ular bu muammoni qanday hal qilishmoqda va nima uchun bu yomon?',
          placeholder: 'Masalan: Tarqoq Google fayllar, ma\'lumotlar yo\'qolishi va 2 haftalik behuda vaqt...'
        }
      ],
      promptFormula: {
        roleLabel: 'KIM SIZ (Rol)',
        role: 'Siz — tajribali startap-treker va akselerator mentori ekansiz.',
        taskLabel: 'NIMA KERAK (Vazifa)',
        task: 'Startap uchun auditoriya muammosi va alternativ yechimlarning kamchiliklarini tizimlashtirib bering.',
        contextLabel: 'KIM UCHUN (Kontekst)',
        context: 'School 21 Launch Lab 21 inkubatorining Demo Day hay\'ati uchun.',
        formatLabel: 'FORMAT (Natija shakli)',
        format: '3 ta aniq tezis: Asosiy muammo | Hozirgi muqobillar | Maqsadli auditoriya.'
      }
    },
    {
      id: 'solution',
      title: '2. Yechim va MVP',
      badge: 'Mahsulot',
      description: 'O\'z yechimingizni va uning noyob qiymat taklifini (UVP) shakllantiring.',
      task: 'Mahsulotingiz muammoni qanday bartaraf etishini va MVP bosqichida nimalar tayyorligini tushuntiring.',
      placeholder: 'Yechim mohiyati va asosiy afzalliklarini tasvirlang...',
      template: '• Yechim: Avtomatlashtirilgan interaktiv akselerator va investitsiya One-Pager generatori.\n• UVP: G\'oyadan investitsiya arizasigacha bo\'lgan vaqtni 14 kundan 45 daqiqaga qisqartiradi.\n• MVP holati: To\'liq mijoz tomonida (Client-Side) ishlovchi React 19 SPA prototipi.',
      fields: [
        {
          id: 'solution_core',
          label: 'Yechimingizning asosiy mohiyati nimada?',
          placeholder: 'Masalan: Bosqichma-bosqich akseleratsiya va avto-one-pager generatori...'
        },
        {
          id: 'solution_uvp',
          label: 'Noyob qiymat taklifi (UVP) qanday?',
          placeholder: 'Masalan: Hujjat tayyorlashni 14 kundan 45 daqiqagacha 10 barobarga qisqartiradi...'
        },
        {
          id: 'solution_mvp_status',
          label: 'Ayni daqiqada ishchi MVP-da nimalar amalga oshirilgan?',
          placeholder: 'Masalan: React 19, TypeScript, LocalStorage sinxronizatsiyasi va kurator rejimi...'
        }
      ],
      promptFormula: {
        roleLabel: 'KIM SIZ (Rol)',
        role: 'Siz — Senior Product Manager va texnologik startaplar arxitektorisiz.',
        taskLabel: 'NIMA KERAK (Vazifa)',
        task: 'Mahsulotning UVP (Unique Value Proposition) va MVP ko\'lamini shakllantirib bering.',
        contextLabel: 'KIM UCHUN (Kontekst)',
        context: 'Venchur investorlar va akselerator saralash komissiyasi uchun.',
        formatLabel: 'FORMAT (Natija shakli)',
        format: 'Strukturaviy bloklar: Yechim mohiyati | Asosiy afzallik (UVP) | MVP holati.'
      }
    },
    {
      id: 'market',
      title: '3. Bozor va Ilk mijozlar',
      badge: 'Tahlil',
      description: 'Maqsadli bozor hajmini va raqobatchilar orasidagi joylashuvingizni baholang.',
      task: 'Taxminiy bozor hajmini (TAM/SAM/SOM) va ilk mijozlar yoki savdo kanallarini ko\'rsating.',
      placeholder: 'Bozor hajmi va raqobat ustunligini baholang...',
      template: '• Bozor TAM/SAM: Markaziy Osiyo va MDH davlatlaridagi $1.2B ta\'lim inkubatorlari bozori.\n• Raqobatchilar: Notion-shablonlar (avtomatlashtirish yo\'q) va an\'anaviy akseleratorlar (juda sekin).\n• Ilk mijozlar: School 21 Samarqand, Toshkent kampusi va 2 ta hamkor universitet.',
      fields: [
        {
          id: 'market_size',
          label: 'Bozor hajmini baholash (TAM / SAM / SOM)',
          placeholder: 'Masalan: Markaziy Osiyo va MDHda $1.2B EdTech va universitet inkubatorlari bozori...'
        },
        {
          id: 'market_competitors',
          label: 'Raqobatchilar va sizning to\'siq ustunligingiz',
          placeholder: 'Masalan: Notion avtomatik yig\'maydi, oddiy dasturlar esa qimmat va murakkab...'
        },
        {
          id: 'market_early_adopters',
          label: 'Ilk mijozlar va bozorga chiqish strategiyasi',
          placeholder: 'Masalan: School 21 kampuslaridagi 500+ faol talaba bilan hamkorlik...'
        }
      ],
      promptFormula: {
        roleLabel: 'KIM SIZ (Rol)',
        role: 'Siz — venchur tahlilchi va bozor strategisiz.',
        taskLabel: 'NIMA KERAK (Vazifa)',
        task: 'Bozor hajmini (TAM/SAM/SOM) va raqobatchilardan ustunlik omillarini hisoblab bering.',
        contextLabel: 'KIM UCHUN (Kontekst)',
        context: 'Startap inkubatorining investitsion qo\'mitasi uchun.',
        formatLabel: 'FORMAT (Natija shakli)',
        format: 'Raqamlar va faktlarga asoslangan 3 ta qisqa punkt.'
      }
    },
    {
      id: 'business_model',
      title: '4. Biznes model va Moliya',
      badge: 'Moliya',
      description: 'Loyiha qanday qilib daromad olishini va masshtablanishini belgilang.',
      task: 'Daromad manbalari, narx belgilash va unit-iqtisodiyot ko\'rsatkichlarini bayon qiling.',
      placeholder: 'Monetizatsiya modeli, tariflar va unit-iqtisodiyotni yozing...',
      template: '• Monetizatsiya: Universitet va kovorkinglar uchun B2B SaaS obuna ($490/oy) + 2% Success Fee.\n• Unit-iqtisodiyot: CAC $80, LTV $1,200, qoplanish muddati 1.5 oy.\n• Masshtablash: Yil oxirigacha 15 ta yangi ta\'lim xabiga ulanish.',
      fields: [
        {
          id: 'bm_revenue_stream',
          label: 'Startap qanday pul ishlaydi (daromad oqimi)?',
          placeholder: 'Masalan: OTMlar uchun B2B SaaS obunasi ($490/oy) + 2% investitsiya yutug\'idan...'
        },
        {
          id: 'bm_unit_economics',
          label: 'Unit-iqtisodiyot orientirlari (CAC, LTV, o\'zini oqlash)',
          placeholder: 'Masalan: CAC $80, LTV $1,200 (LTV/CAC = 15 ≥ 3 barqaror), o\'zini oqlash 1.5 oy...'
        },
        {
          id: 'bm_scale_plan',
          label: '12 oylik masshtablash rejasi',
          placeholder: 'Masalan: Yil oxirigacha 15 ta IT-park va ta\'lim markazlariga chiqish...'
        }
      ],
      promptFormula: {
        roleLabel: 'KIM SIZ (Rol)',
        role: 'Siz — moliya direktori (CFO) va unit-iqtisodiyot bo\'yicha mutaxassissiz.',
        taskLabel: 'NIMA KERAK (Vazifa)',
        task: 'Barqaror biznes model va monetizatsiya rejasini tuzing.',
        contextLabel: 'KIM UCHUN (Kontekst)',
        context: 'Angel investorlar va akselerator partnerlari uchun.',
        formatLabel: 'FORMAT (Natija shakli)',
        format: 'Moliyaviy formula: Tushum manbai | CAC & LTV | Masshtablash bosqichlari.'
      }
    },
    {
      id: 'team_traction',
      title: '5. Jamoa va Natijalar (Traction)',
      badge: 'Amaliyot',
      description: 'Jamoaning tajribasini va ilk natijalarni (MVP, metrikalar) ko\'rsating.',
      task: 'Asosiy ishtirokchilar, ularning rollari va bugungi kunda erishilgan aniq natijalarni sanab o\'ting.',
      placeholder: 'Jamoa tarkibi va hozirgi natijalarni ko\'rsating...',
      template: '• Jamoa: Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA).\n• Natija (Traction): 60 daqiqada to\'liq ishchi MVP yaratildi va 3/3 hakamlar sinovidan o\'tdi.\n• So\'rov: B2B bo\'yicha mentorlik va sinov maydonlariga kirish.',
      fields: [
        {
          id: 'team_roles',
          label: 'Jamoaning asosiy a\'zolari va ularning mas\'uliyatlari',
          placeholder: 'Masalan: Jasur (Team Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)...'
        },
        {
          id: 'team_traction_proof',
          label: 'Hozirgi natijalar (amalda nima isbotlandi)',
          placeholder: 'Masalan: 60 daqiqada ishchi prototip yaratildi, 100% oflayn bardoshlilik tasdiqlandi...'
        },
        {
          id: 'team_incubator_ask',
          label: 'Launch Lab 21 inkubatoridan nima so\'raladi (Ask)?',
          placeholder: 'Masalan: B2B savdolar bo\'yicha mentorlik va kampuslarda tajriba o\'tkazish...'
        }
      ],
      promptFormula: {
        roleLabel: 'KIM SIZ (Rol)',
        role: 'Siz — startap asoschisi (CEO) ekansiz.',
        taskLabel: 'NIMA KERAK (Vazifa)',
        task: 'Jamoa kuchli tomonlari, erishilgan natijalar (Traction) va inkubatordan kutilayotgan yordamni bayon qiling.',
        contextLabel: 'KIM UCHUN (Kontekst)',
        context: 'Launch Lab 21 ekspertlari va hakamlar hay\'ati uchun.',
        formatLabel: 'FORMAT (Natija shakli)',
        format: '3 ta aniq tezis: Jamoa tarkibi | Qilingan ishlar | So\'rov (Ask).'
      }
    }
  ],
  ru: [
    {
      id: 'problem',
      title: '1. Проблема и аудитория',
      badge: 'Основа',
      description: 'Определите критическую боль клиентов и сегмент рынка, который острее всего её ощущает.',
      task: 'Опишите реальную боль пользователей, как они решают её сейчас и почему текущие решения неэффективны.',
      placeholder: 'Опишите проблему и целевую аудиторию проекта...',
      template: '• Проблема: 70% начинающих стартапов не могут структурировать идею для инвесторов.\n• Текущие альтернативы: Хаотичные Google Документы и бесконечные созвоны.\n• Целевая аудитория: Студенты и выпускники School 21, запускающие свой первый IT-бизнес.',
      fields: [
        {
          id: 'problem_core',
          label: 'Какую ключевую проблему решает ваш проект?',
          placeholder: 'Например: 70% начинающих стартапов не могут структурировать инвестиционный one-pager...'
        },
        {
          id: 'problem_target',
          label: 'Кто больше всего страдает от этой проблемы (целевая аудитория)?',
          placeholder: 'Например: Студенты и выпускники School 21, запускающие первый IT-бизнес...'
        },
        {
          id: 'problem_alternatives',
          label: 'Как пользователи справляются с этим сегодня и почему это плохо?',
          placeholder: 'Например: Разрозненные Google Docs, потеря данных, недели на ручную переписку...'
        }
      ],
      promptFormula: {
        roleLabel: 'КТО ВЫ (Роль)',
        role: 'Вы — опытный стартап-трекер и ментор акселератора.',
        taskLabel: 'ЧТО НУЖНО (Задача)',
        task: 'Систематизируйте проблему целевой аудитории и недостатки текущих альтернатив.',
        contextLabel: 'ДЛЯ КОГО (Контекст)',
        context: 'Для жюри Demo Day акселератора Launch Lab 21 Школы 21.',
        formatLabel: 'ФОРМАТ (Форма ответа)',
        format: '3 чётких тезиса: Ключевая боль | Текущие альтернативы | Сегмент аудитории.'
      }
    },
    {
      id: 'solution',
      title: '2. Решение и MVP',
      badge: 'Продукт',
      description: 'Сформулируйте ваше решение и его уникальное ценностное предложение (UVP).',
      task: 'Объясните, как именно ваш продукт устраняет описанную проблему и что уже готово в MVP.',
      placeholder: 'Опишите суть решения и ключевые преимущества...',
      template: '• Решение: Автоматизированный интерактивный трекер инкубатора с авто-генерацией питч-документов.\n• UVP (Уникальность): Сокращает подготовку инвестиционного one-pager с 2 недель до 45 минут за счёт пошаговых шаблонов.\n• Статус MVP: Рабочий прототип протестирован на живых данных кампуса.',
      fields: [
        {
          id: 'solution_core',
          label: 'В чём суть вашего решения?',
          placeholder: 'Например: Интерактивная платформа пошаговой акселерации с авто-генерацией артефактов...'
        },
        {
          id: 'solution_uvp',
          label: 'Каково уникальное ценностное предложение (UVP)?',
          placeholder: 'Например: Сокращает путь от идеи до презентационного One-Pager с 14 дней до 45 минут...'
        },
        {
          id: 'solution_mvp_status',
          label: 'Что реализовано в рабочем MVP прямо сейчас?',
          placeholder: 'Например: Полностью клиентское SPA на React 19 с сохранением в LocalStorage и режимом куратора...'
        }
      ],
      promptFormula: {
        roleLabel: 'КТО ВЫ (Роль)',
        role: 'Вы — Senior Product Manager и архитектор технологических продуктов.',
        taskLabel: 'ЧТО НУЖНО (Задача)',
        task: 'Сформулируйте UVP и границы MVP для быстрого выхода на рынок.',
        contextLabel: 'ДЛЯ КОГО (Контекст)',
        context: 'Для венчурных инвесторов и отборочного комитета акселератора.',
        formatLabel: 'ФОРМАТ (Форма ответа)',
        format: 'Структурные блоки: Суть решения | Главное преимущество (UVP) | Статус MVP.'
      }
    },
    {
      id: 'market',
      title: '3. Рынок и первые клиенты',
      badge: 'Аналитика',
      description: 'Оцените объем целевого рынка и ваше позиционирование среди конкурентов.',
      task: 'Укажите ориентировочный объем рынка (TAM/SAM/SOM) и первых клиентов или каналы продаж.',
      placeholder: 'Оцените объем рынка и конкурентное преимущество...',
      template: '• Рынок TAM/SAM: $1.2B рынок EdTech и стартап-акселераторов в Центральной Азии и СНГ.\n• Конкуренты: Notion-шаблоны (нет трекинга) и классические инкубаторы (медленный ручной аудит).\n• Первые клиенты: 3 кампуса School 21 и 2 технологических вуза-партнёра.',
      fields: [
        {
          id: 'market_size',
          label: 'Оценка объема рынка (TAM / SAM / SOM)',
          placeholder: 'Например: $1.2B рынок EdTech и университетских акселераторов в СНГ и Центральной Азии...'
        },
        {
          id: 'market_competitors',
          label: 'Конкуренты и ваше барьерное преимущество',
          placeholder: 'Например: Notion-шаблоны не дают автоматизации, классические инкубаторы медленные...'
        },
        {
          id: 'market_early_adopters',
          label: 'Первые клиенты и стратегия выхода на рынок',
          placeholder: 'Например: Партнёрство с кампусами School 21, старт с 500 активных студентов...'
        }
      ],
      promptFormula: {
        roleLabel: 'КТО ВЫ (Роль)',
        role: 'Вы — венчурный аналитик и специалист по рыночным стратегиям.',
        taskLabel: 'ЧТО НУЖНО (Задача)',
        task: 'Рассчитайте TAM/SAM/SOM и сформулируйте конкурентное преимущество.',
        contextLabel: 'ДЛЯ КОГО (Контекст)',
        context: 'Для инвестиционного комитета акселератора.',
        formatLabel: 'ФОРМАТ (Форма ответа)',
        format: '3 чётких пункта с цифрами и подтверждениями.'
      }
    },
    {
      id: 'business_model',
      title: '4. Бизнес-модель и Монетизация',
      badge: 'Финансы',
      description: 'Определите, как проект будет генерировать выручку и масштабироваться.',
      task: 'Опишите источники доходов, ценообразование и ключевые ориентиры юнит-экономики.',
      placeholder: 'Опишите модель монетизации, тарифы и юнит-экономику...',
      template: '• Модель монетизации: B2B-подписка для вузов и акселераторов ($490/мес) + Success Fee 2% с инвестиций.\n• Unit-экономика: CAC $80, LTV $1,200, окупаемость 1.5 месяца.\n• Каналы продаж: Партнёрская сеть кампусов и технологических хабов.',
      fields: [
        {
          id: 'bm_revenue_stream',
          label: 'Как стартап зарабатывает деньги?',
          placeholder: 'Например: B2B SaaS-подписка для вузов и коворкингов ($490/мес) + Success Fee 2%...'
        },
        {
          id: 'bm_unit_economics',
          label: 'Ориентиры юнит-экономики (CAC, LTV, срок окупаемости)',
          placeholder: 'Например: CAC $80, LTV $1,200, Payback period 1.5 месяца...'
        },
        {
          id: 'bm_scale_plan',
          label: 'План масштабирования на 12 месяцев',
          placeholder: 'Например: Выход на 15 новых образовательных хабов к концу года...'
        }
      ],
      promptFormula: {
        roleLabel: 'КТО ВЫ (Роль)',
        role: 'Вы — финансовый директор (CFO) и специалист по юнит-экономике.',
        taskLabel: 'ЧТО НУЖНО (Задача)',
        task: 'Разработайте устойчивую финансовую модель и план монетизации.',
        contextLabel: 'ДЛЯ КОГО (Контекст)',
        context: 'Для бизнес-ангелов и инвестиционных партнёров.',
        formatLabel: 'ФОРМАТ (Форма ответа)',
        format: 'Финансовая формула: Источник выручки | CAC & LTV | Масштабирование.'
      }
    },
    {
      id: 'team_traction',
      title: '5. Команда и Трэкшн (Traction)',
      badge: 'Реализация',
      description: 'Покажите экспертность команды и первые результаты (MVP, пользователи, метрики).',
      task: 'Перечислите ключевых участников, их роли и подтверждённый прогресс проекта на текущий момент.',
      placeholder: 'Укажите состав команды и текущие достижения...',
      template: '• Команда: 2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер.\n• Текущий трэкшн: Создан рабочий MVP за 60 минут турнира, запущено 15 тестовых команд в Launch Lab 21.\n• Запрос: Доступ к сети пилотных площадок и менторство экспертов индустрии.',
      fields: [
        {
          id: 'team_roles',
          label: 'Ключевые участники команды и их компетенции',
          placeholder: 'Например: 2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер...'
        },
        {
          id: 'team_traction_proof',
          label: 'Текущий трэкшн (что подтверждено на практике)',
          placeholder: 'Например: Рабочий прототип создан за 60 минут, 15 команд протестировали платформу...'
        },
        {
          id: 'team_incubator_ask',
          label: 'Запрос к инкубатору Launch Lab 21',
          placeholder: 'Например: Менторская поддержка по B2B-продажам и доступ к пилотам в сети кампусов...'
        }
      ],
      promptFormula: {
        roleLabel: 'КТО ВЫ (Роль)',
        role: 'Вы — основатель и лидер стартапа (CEO).',
        taskLabel: 'ЧТО НУЖНО (Задача)',
        task: 'Опишите сильные стороны команды, реальный трэкшн и конкретный запрос к инкубатору.',
        contextLabel: 'ДЛЯ КОГО (Контекст)',
        context: 'Для экспертов и судейской коллегии инкубатора Launch Lab 21.',
        formatLabel: 'ФОРМАТ (Форма ответа)',
        format: '3 чётких тезиса: Состав команды | Достигнутые результаты | Запрос (Ask).'
      }
    }
  ],
  en: [
    {
      id: 'problem',
      title: '1. Problem & Target Audience',
      badge: 'Foundation',
      description: 'Define the critical customer pain point and the market segment that feels it most acutely.',
      task: 'Describe the real pain of users, how they solve it today, and why current alternatives fail.',
      placeholder: 'Describe the core problem and target audience...',
      template: '• Problem: 70% of early-stage startups fail to structure their idea into an investor-ready One-Pager.\n• Current alternatives: Scattered Google Docs, lost data, and weeks wasted on manual docs.\n• Target audience: School 21 students and alumni launching their first IT business.',
      fields: [
        {
          id: 'problem_core',
          label: 'What core problem does your project solve?',
          placeholder: 'E.g., 70% of early startups get rejected due to disorganized pitch docs...'
        },
        {
          id: 'problem_target',
          label: 'Who suffers most from this problem (target audience)?',
          placeholder: 'E.g., Students and young developers launching their first IT product...'
        },
        {
          id: 'problem_alternatives',
          label: 'How do users cope today and why is it broken?',
          placeholder: 'E.g., Chaotic Google Docs, lost files, and 2 weeks of manual formatting...'
        }
      ],
      promptFormula: {
        roleLabel: 'ROLE (Who you are)',
        role: 'You are an experienced startup tracker and accelerator mentor.',
        taskLabel: 'TASK (What is needed)',
        task: 'Structure the target audience problem and flaws of existing alternatives.',
        contextLabel: 'CONTEXT (Audience)',
        context: 'For the Demo Day jury of School 21 Launch Lab 21 incubator.',
        formatLabel: 'FORMAT (Output shape)',
        format: '3 concise bullets: Core Problem | Existing Alternatives | Target Audience.'
      }
    },
    {
      id: 'solution',
      title: '2. Solution & MVP',
      badge: 'Product',
      description: 'Formulate your solution and its Unique Value Proposition (UVP).',
      task: 'Explain how your product eliminates the pain and what is already implemented in the MVP.',
      placeholder: 'Describe your solution and competitive advantages...',
      template: '• Solution: Automated interactive incubator tracker with instant One-Pager assembly.\n• UVP: Cuts pitch document preparation time from 14 days to 45 minutes.\n• MVP Status: Fully client-side React 19 SPA running with zero backend dependency.',
      fields: [
        {
          id: 'solution_core',
          label: 'What is the core of your solution?',
          placeholder: 'E.g., Step-by-step accelerator platform with real-time One-Pager assembly...'
        },
        {
          id: 'solution_uvp',
          label: 'What is your Unique Value Proposition (UVP)?',
          placeholder: 'E.g., Cuts preparation from 14 days to 45 minutes with guided templates...'
        },
        {
          id: 'solution_mvp_status',
          label: 'What is implemented in the working MVP right now?',
          placeholder: 'E.g., Client-side SPA on React 19, LocalStorage F5 persistence, curator mode...'
        }
      ],
      promptFormula: {
        roleLabel: 'ROLE (Who you are)',
        role: 'You are a Senior Product Manager and tech venture architect.',
        taskLabel: 'TASK (What is needed)',
        task: 'Formulate the UVP and MVP scope for rapid market launch.',
        contextLabel: 'CONTEXT (Audience)',
        context: 'For venture investors and incubator selection committee.',
        formatLabel: 'FORMAT (Output shape)',
        format: 'Structured blocks: Core Solution | Key UVP | MVP Status.'
      }
    },
    {
      id: 'market',
      title: '3. Market & Early Adopters',
      badge: 'Analytics',
      description: 'Estimate your addressable market size and positioning among competitors.',
      task: 'Provide estimated market volume (TAM/SAM/SOM) and your early customer acquisition strategy.',
      placeholder: 'Estimate market size and barrier advantage...',
      template: '• Market TAM/SAM: $1.2B EdTech and university incubator market across Central Asia & CIS.\n• Competitors: Notion templates (no automation) and legacy programs (slow manual reviews).\n• Early adopters: 3 School 21 campuses and 2 partner tech universities.',
      fields: [
        {
          id: 'market_size',
          label: 'Market size estimation (TAM / SAM / SOM)',
          placeholder: 'E.g., $1.2B EdTech and campus accelerator market in Central Asia & CIS...'
        },
        {
          id: 'market_competitors',
          label: 'Competitors and your defensive advantage',
          placeholder: 'E.g., Notion lacks automation; traditional accelerators are slow and manual...'
        },
        {
          id: 'market_early_adopters',
          label: 'Early adopters and go-to-market strategy',
          placeholder: 'E.g., Partnership with School 21 campuses, pilot with 500+ active students...'
        }
      ],
      promptFormula: {
        roleLabel: 'ROLE (Who you are)',
        role: 'You are a venture analyst and market strategist.',
        taskLabel: 'TASK (What is needed)',
        task: 'Calculate TAM/SAM/SOM and identify sustainable competitive advantages.',
        contextLabel: 'CONTEXT (Audience)',
        context: 'For the incubator investment and screening committee.',
        formatLabel: 'FORMAT (Output shape)',
        format: '3 fact-based bullets with quantitative backing.'
      }
    },
    {
      id: 'business_model',
      title: '4. Business Model & Finances',
      badge: 'Finance',
      description: 'Define how your startup generates revenue and scales profitably.',
      task: 'Describe revenue streams, pricing structure, and key unit-economics targets.',
      placeholder: 'Describe monetization model, pricing, and unit economics...',
      template: '• Monetization: B2B SaaS subscription for campuses ($490/mo) + 2% investment success fee.\n• Unit economics: CAC $80, LTV $1,200 (LTV/CAC = 15 ≥ 3), payback period 1.5 months.\n• Scale plan: Expand to 15 educational tech hubs by end of year.',
      fields: [
        {
          id: 'bm_revenue_stream',
          label: 'How does the startup make money (revenue streams)?',
          placeholder: 'E.g., B2B SaaS subscription for universities ($490/mo) + 2% Success Fee...'
        },
        {
          id: 'bm_unit_economics',
          label: 'Unit economics metrics (CAC, LTV, payback period)',
          placeholder: 'E.g., CAC $80, LTV $1,200 (LTV/CAC ≥ 3 healthy), 1.5 months payback...'
        },
        {
          id: 'bm_scale_plan',
          label: '12-month scaling roadmap',
          placeholder: 'E.g., Integration into 15 tech hubs and regional innovation centers...'
        }
      ],
      promptFormula: {
        roleLabel: 'ROLE (Who you are)',
        role: 'You are a Chief Financial Officer (CFO) and unit-economics expert.',
        taskLabel: 'TASK (What is needed)',
        task: 'Build a sustainable monetization model and financial milestones.',
        contextLabel: 'CONTEXT (Audience)',
        context: 'For angel investors and accelerator partners.',
        formatLabel: 'FORMAT (Output shape)',
        format: 'Financial formula: Revenue Stream | CAC & LTV | Scaling milestones.'
      }
    },
    {
      id: 'team_traction',
      title: '5. Team & Traction',
      badge: 'Execution',
      description: 'Highlight team competence and proven milestones (MVP, users, metrics).',
      task: 'List key members, their roles, and verified project progress achieved to date.',
      placeholder: 'List team members and verified traction...',
      template: '• Team: Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA).\n• Traction: Fully working MVP built in 60 minutes, passed 3/3 jury stress-tests.\n• Incubator ask: B2B sales mentorship and pilot deployment access across campuses.',
      fields: [
        {
          id: 'team_roles',
          label: 'Key team members and their core competencies',
          placeholder: 'E.g., Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)...'
        },
        {
          id: 'team_traction_proof',
          label: 'Current traction (verified achievements)',
          placeholder: 'E.g., Working MVP built in 60-min sprint, verified 100% offline persistence...'
        },
        {
          id: 'team_incubator_ask',
          label: 'Ask from Launch Lab 21 incubator',
          placeholder: 'E.g., B2B mentorship, pilot access, and angel network introduction...'
        }
      ],
      promptFormula: {
        roleLabel: 'ROLE (Who you are)',
        role: 'You are the startup founder and Chief Executive Officer (CEO).',
        taskLabel: 'TASK (What is needed)',
        task: 'Communicate team strengths, verified traction, and explicit incubator ask.',
        contextLabel: 'CONTEXT (Audience)',
        context: 'For Launch Lab 21 experts and judging panel.',
        formatLabel: 'FORMAT (Output shape)',
        format: '3 concise bullets: Team Roster | Traction Proof | Incubator Ask.'
      }
    }
  ]
}

export const LOCALIZED_DEMO_PROJECT: Record<Language, {
  name: string
  description: string
  teamMembers: string
  juryPhrase: string
  answers: Record<string, string>
}> = {
  uz: {
    name: "EduVibe AI — School 21 Aqlli Inkubator Assistent",
    description: "Launch Lab 21 inkubatori uchun avtomatlashtirilgan akseleratsiya va investitsiya One-Pager generatori.",
    teamMembers: "Black's (Samarqand): Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)",
    juryPhrase: "Black's jamoasi — 2026 turnir mutlaq g'olibi!",
    answers: {
      problem: "• Asosiy muammo: Boshlang'ich startaplarning 70 foizi tizimsizlik va g'oyani bitta varaqda (One-Pager) investorga ifodalay olmaslik tufayli rad javobini oladi.\n• Hozirgi muqobillar: Tarqoq Google Docs, ma'lumotlar yo'qolishi va 2 haftalik behuda hujjat to'ldirish azobi.\n• Maqsadli auditoriya: O'z IT-biznesini boshlayotgan School 21 talabalari va bitiruvchilari.",
      solution: "• Yechim: Bosqichma-bosqich akseleratsiya va real vaqtda investorlar uchun One-Pager yig'uvchi interaktiv platforma.\n• UVP (Noyoblik): Hujjat tayyorlash muddatini 14 kundan 45 daqiqaga 10 barobarga qisqartiradi.\n• MVP holati: To'liq mijoz tomonida (Client-Side) ishlovchi React 19 SPA prototipi.",
      market: "• Bozor TAM/SAM: Markaziy Osiyo va MDHdagi $1.2B ta'lim inkubatorlari va EdTech bozori.\n• Raqobatchilar: Notion-shablonlar (avtomatlashtirish yo'q) va an'anaviy dasturlar (juda sekin).\n• Ilk mijozlar: School 21 Samarqand va Toshkent kampusi, 2 ta hamkor universitet.",
      business_model: "• Monetizatsiya: Universitet va kovorkinglar uchun B2B SaaS obunasi ($490/oy) + 2% Success Fee.\n• Unit-iqtisodiyot: CAC $80, LTV $1,200 (LTV/CAC = 15 ≥ 3 barqaror), qoplanish muddati 1.5 oy.\n• Masshtablash: Yil oxirigacha 15 ta yangi ta'lim xabiga ulanish.",
      team_traction: "• Jamoa: Black's: 2 ta School 21 muhandisi (Fullstack & AI), 1 ta mahsulot menejeri, 1 ta QA.\n• Natija (Traction): 60 daqiqalik sprintda to'liq ishchi MVP yaratildi va 3/3 hakamlar testidan o'tdi.\n• So'rov: B2B savdolar bo'yicha mentorlik va kampuslarda sinov maydoni."
    }
  },
  ru: {
    name: "EduVibe AI — Умный ассистент кампуса 21",
    description: "Платформа автоматизированной акселерации и peer-to-peer сборки проектных питчей для инкубатора Launch Lab 21.",
    teamMembers: "Black's (Самарканд): Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)",
    juryPhrase: "Команда Black's — абсолютный победитель 2026!",
    answers: {
      problem: "• Проблема: 70% начинающих стартапов не могут структурировать идею для инвесторов и тратят недели на переписку.\n• Текущие альтернативы: Хаотичные Google Документы, разрозненные чаты и бесконечные созвоны.\n• Целевая аудитория: 5,000+ участников кампусов School 21, запускающих свои первые IT-продукты.",
      solution: "• Решение: Интерактивная платформа пошаговой акселерации с авто-генерацией инвестиционного One-Pager.\n• UVP (Уникальность): Сокращает подготовку инвестиционного one-pager с 14 дней до 45 минут за счёт пошаговых шаблонов.\n• Статус MVP: Рабочий прототип протестирован на турнире вайбкодинга School 21.",
      market: "• Рынок TAM/SAM: $1.2B рынок университетских инкубаторов и EdTech-акселераторов в СНГ и Центральной Азии.\n• Конкуренты: Notion-шаблоны (нет трекинга) и классические программы (медленный ручной аудит).\n• Первые клиенты: 3 кампуса School 21 и 2 технологических вуза-партнёра.",
      business_model: "• Монетизация: B2B SaaS-подписка для вузов и коворкингов ($490/мес) + Success Fee 2% с привлечённых инвестиций.\n• Unit-экономика: CAC $80, LTV $1,200, окупаемость 1.5 месяца.\n• Каналы продаж: Прямая интеграция в экосистему кампусов и хакатонов.",
      team_traction: "• Команда: 2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер.\n• Текущий трэкшн: Создан рабочий MVP за 60 минут турнира, протестирован обязательный сценарий.\n• Запрос: Менторство Launch Lab 21 по B2B-продажам и запуск пилота."
    }
  },
  en: {
    name: "EduVibe AI — School 21 Smart Incubator Assistant",
    description: "Automated acceleration platform and instant One-Pager pitch generator for Launch Lab 21.",
    teamMembers: "Black's (Samarkand): Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)",
    juryPhrase: "Team Black's is the undisputed 2026 Champion!",
    answers: {
      problem: "• Core Problem: 70% of early-stage startups get rejected due to disorganized pitch docs.\n• Existing Alternatives: Chaotic Google Docs, lost files, and 2 weeks of manual formatting.\n• Target Audience: School 21 students and alumni launching their first IT venture.",
      solution: "• Solution: Step-by-step accelerator platform with real-time One-Pager assembly.\n• Key UVP: Cuts pitch preparation from 14 days to 45 minutes with guided templates.\n• MVP Status: Client-side React 19 SPA running with zero backend dependency.",
      market: "• Market TAM/SAM: $1.2B EdTech and campus accelerator market in Central Asia & CIS.\n• Competitors: Notion lacks automation; traditional accelerators are slow and manual.\n• Early Adopters: School 21 Samarkand & Tashkent campuses, 2 partner universities.",
      business_model: "• Monetization: B2B SaaS subscription for campuses ($490/mo) + 2% Success Fee.\n• Unit Economics: CAC $80, LTV $1,200 (LTV/CAC = 15 ≥ 3 healthy), 1.5 months payback.\n• Scale Plan: Expansion into 15 tech hubs and regional innovation centers.",
      team_traction: "• Team: Black's: 2 School 21 engineers (Fullstack & AI), 1 Product Manager, 1 QA.\n• Verified Traction: Fully working MVP built in 60 minutes, passed 3/3 jury stress-tests.\n• Incubator Ask: B2B mentorship, pilot access, and angel network introduction."
    }
  }
}
