import React, { useState, useEffect, useRef } from 'react'
import {
  Brain,
  Sparkles,
  Stethoscope,
  Cpu,
  GraduationCap,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Send,
  FileText,
  Search,
  Copy,
  Check,
  Award,
  Terminal,
  Boxes
} from 'lucide-react'

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24" aria-label="Instagram">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export interface OnlineMindProps {
  currentLang?: 'uz' | 'ru' | 'en'
}

type MindNodeId = 'healthtech' | 'lowlatency' | 'healthadmin' | 'arbitrage' | 'cognitive_ai'

interface MindNode {
  id: MindNodeId
  title: Record<'uz' | 'ru' | 'en', string>
  category: Record<'uz' | 'ru' | 'en', string>
  icon: React.ElementType
  color: string
  borderColor: string
  glowColor: string
  summary: Record<'uz' | 'ru' | 'en', string>
  keyProjects: { name: string; url?: string; desc: Record<'uz' | 'ru' | 'en', string> }[]
  metrics: string[]
  quote: Record<'uz' | 'ru' | 'en', string>
}

const MIND_NODES: MindNode[] = [
  {
    id: 'healthtech',
    title: {
      uz: 'HealthTech & Tibbiy AI Triaj',
      ru: 'HealthTech & Клинический AI-Триаж',
      en: 'HealthTech & Clinical AI Triage'
    },
    category: {
      uz: 'Asosiy Texnologik Ekologiya',
      ru: 'Ключевая Технологическая Экосистема',
      en: 'Core Technology Ecosystem'
    },
    icon: Stethoscope,
    color: 'from-white via-zinc-200 to-zinc-400',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    summary: {
      uz: "O'zbekiston xususiy klinikalari va laboratoriyalarida 45% bemorlarning yo'qotilishini to'xtatuvchi, 8 soniyada laboratoriya natijasini tushuntirib shifokorga yo'naltiruvchi MedLoop AI, 169 ta klinik kalkulyatorga ega Unicorn Health va Tahlil AI tizimlari.",
      ru: 'Экосистема MedLoop AI, Unicorn Health и Tahlil AI: предотвращение 45% оттока пациентов после сдачи анализов, интерпретация биомаркеров за 8 секунд и 169 верифицированных клинических алгоритмов.',
      en: 'MedLoop AI, Unicorn Health & Tahlil AI: Stopping 45% patient post-lab drop-off, 8-second biomarker interpretation OCR, and 169 verified clinical dosing engines.'
    },
    keyProjects: [
      {
        name: 'MedLoop AI',
        url: 'https://turnir-launch-lab.vercel.app',
        desc: {
          uz: 'Laboratoriyadan chiqqan bemorni 8 soniyada shifokor qabuliga qaytaruvchi B2B dvigatel. Klinika daromadini oyiga $6,000–$7,500 ga oshiradi.',
          ru: 'B2B SaaS для клиник: возвращает пациента к врачу за 8 секунд после анализов, увеличивая выручку клиники на $6,000–$7,500/мес.',
          en: 'B2B SaaS clinical engine returning patients from lab tests to doctors in 8 seconds, recapturing $6,000–$7,500/mo per clinic.'
        }
      },
      {
        name: 'Unicorn Health Uzbekistan',
        url: 'https://unicorn-health-uzbekistan.vercel.app/',
        desc: {
          uz: "169 ta matematik tibbiy modul (Cockcroft-Gault, Beers, STOPP/START, pediatr dozalash, PM2.5/PM10 havo ogohlantirishlari).",
          ru: '169 клинических математических модулей (клиренс, Beers, педиатрия, STOPP/START, экологический AQI-мониторинг).',
          en: '169 clinical math modules including Cockcroft-Gault, Beers criteria, pediatric titration, and real-time PM2.5 AQI alerts.'
        }
      },
      {
        name: 'Tahlil AI (MVP & Telegram)',
        url: 'https://tahlilai-mvp.vercel.app',
        desc: {
          uz: "Tahlil blanklarini sun'iy intellekt orqali o'qib, oddiy xalq tilida xavf darajasini ko'rsatuvchi platforma va @Tahlil_ai_bot.",
          ru: 'Платформа распознавания медицинских анализов и бот @Tahlil_ai_bot с понятным для пациента объяснением рисков.',
          en: 'Instant automated lab test analyzer and @Tahlil_ai_bot converting Latin biomarkers into plain-language actionable advice.'
        }
      },
      {
        name: 'Osiyo Medical Bot',
        url: 'https://t.me/Osiyomedicalbot',
        desc: {
          uz: 'Tibbiy maslahat va klinik qo‘llanma beruvchi interaktiv Telegram yordamchisi (@Osiyomedicalbot).',
          ru: 'Телеграм-ассистент клинических консультаций и маршрутизации пациентов (@Osiyomedicalbot).',
          en: 'Digital medical advisory and clinical navigation Telegram bot (@Osiyomedicalbot).'
        }
      }
    ],
    metrics: ['8s OCR Triage', '169 Clinical Engines', '45% Drop-off Recaptured', 'Zero Placeholders'],
    quote: {
      uz: "«Tibbiyotda xatoga o'rin yo'q. Har bir raqam, har bir biomarker ortida inson hayoti turadi.»",
      ru: '«В медицине нет места предположениям. За каждым биомаркером стоит здоровье человека.»',
      en: '“In medicine, there is zero room for guesswork. Behind every biomarker is human health.”'
    }
  },
  {
    id: 'healthadmin',
    title: {
      uz: 'Sog‘liqni Saqlash Menejmenti (SamDTU)',
      ru: 'Менеджмент Здравоохранения (СамГМУ)',
      en: 'Healthcare Governance (SamSMU)'
    },
    category: {
      uz: 'Akademik Yetakchilik & Rektor Stipendiyasi',
      ru: 'Академическое Лидерство & Стипендия Ректора',
      en: 'Academic Leadership & Rector Scholarship'
    },
    icon: GraduationCap,
    color: 'from-white via-zinc-200 to-zinc-400',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    summary: {
      uz: "Samarqand davlat tibbiyot universiteti Boshqaruv va menejment fakulteti II bosqich talabasi. Universitet Ilmiy ishlar bo'yicha prorektori A.S. Kubayev va bo'lim boshlig'i U.F. Payzullayeva tomonidan 2026–2027 o'quv yili Rektor stipendiyasiga nomzod qilib ko'rsatilgan.",
      ru: 'Студент факультета управления СамГМУ. Выдвинут на стипендию ректора проректором А.С. Кубаевым и зав. отделом У.Ф. Пайзуллаевой за внедрение цифровых технологий и проекта EpiVision XR.',
      en: 'Samarkand State Medical University Management student. Nominated for the 2026–2027 Rector Scholarship by Vice-Rector A.S. Kubayev & U.F. Payzullayeva for digital health innovation.'
    },
    keyProjects: [
      {
        name: 'EpiVision XR',
        desc: {
          uz: 'Tibbiyot xodimlari va talabalar uchun 3D/XR interaktiv simulyatsion jarrohlik va ta’lim vositasi. Loyiha boshqaruvi va biznes modeli rahbari.',
          ru: 'Интерактивный XR/3D симулятор хирургических и клинических процедур. Руководство проектным управлением и бизнес-моделью.',
          en: 'Interactive 3D/XR clinical simulation suite for surgeons and students. Project management and commercial integration lead.'
        }
      },
      {
        name: 'SamDTU IT-Inkubatsiya Markazi',
        desc: {
          uz: 'Universitet iqtidorli talabalari ilmiy jamiyati va startap tashabbuslari yetakchisi, xakatonlar g‘olibi.',
          ru: 'Лидер университетского IT-инкубатора и научных инициатив одаренных студентов, призер хакатонов.',
          en: 'Head of university IT-Incubation initiatives and student scientific society innovation challenges.'
        }
      }
    ],
    metrics: ['Rektor Stipendiyasi Nomzodi', 'SamDTU II Bosqich', 'EpiVision XR Lead', 'IT-Incubator Head'],
    quote: {
      uz: "«Boshqaruv — bu resurslarni cheklovlar ichida eng yuqori samaradorlikka erishtirish san’atidir.»",
      ru: '«Управление — это искусство достижения максимальной эффективности при строгих ограничениях.»',
      en: '“Governance is the disciplined art of maximizing clinical outcome within constraints.”'
    }
  },
  {
    id: 'lowlatency',
    title: {
      uz: 'Past Darajali Tizimlar (School 21)',
      ru: 'Низкоуровневые Системы (School 21)',
      en: 'Low-Latency Systems (School 21)'
    },
    category: {
      uz: 'École 42 Peer-to-Peer Muhandisligi',
      ru: 'Инженерия École 42 Peer-to-Peer',
      en: 'École 42 Peer-to-Peer Engineering'
    },
    icon: Cpu,
    color: 'from-white via-zinc-200 to-zinc-400',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    summary: {
      uz: "School 21 qat'iy peer-to-peer metodologiyasi: past darajali C va C++17/20, ko'rsatkichlar arifmetikasi, xotirani qo'lda boshqarish (custom allocators), keshga moslashtirilgan ma'lumotlar tuzilmasi va nol placeholder tamoyili.",
      ru: 'Школа 21 (модель École 42): строгий C/C++, работа с указателями, ручное управление памятью, алгоритмические структуры и нулевая терпимость к placeholder-коду.',
      en: 'Rigorous School 21 (École 42) peer-to-peer protocols: low-latency C/C++20, pointer arithmetic, manual memory allocators, and deterministic algorithms.'
    },
    keyProjects: [
      {
        name: 'Low-Latency Algorithmic Engines',
        desc: {
          uz: 'Kesh-optimal ma’lumotlar tuzilmalari, POSIX oqimlari, lock-free sinxronizatsiya va yuqori tezlikdagi C/C++ modullari.',
          ru: 'Кэш-оптимальные структуры данных, потоки POSIX, lock-free синхронизация и скоростные C/C++ модули.',
          en: 'Cache-conscious memory layouts, POSIX threads, lock-free synchronization, and bare-metal performance.'
        }
      },
      {
        name: 'Autonomous Verification Suite',
        desc: {
          uz: 'Oxlint, Vite 8 va Playwright avtomatlashtirilgan regressiya sinovlari bilan ta’minlangan 100% xatosiz dasturiy ta’minot.',
          ru: 'Автоматический аудит кода (Oxlint, Vite 8, Playwright) с гарантией полного прохождения тестов без сбоев.',
          en: 'Automated verification pipeline combining Oxlint, Vite 8, and Playwright with zero runtime debt.'
        }
      }
    ],
    metrics: ['Zero Mock Fallacy', 'C/C++ Systems', 'École 42 Standard', '100% Deterministic'],
    quote: {
      uz: "«Agar kod xotirani qayerga joylashtirayotganini bilmasangiz, siz uni to'liq nazorat qila olmaysiz.»",
      ru: '«Если вы не контролируете расположение данных в памяти, вы не контролируете систему.»',
      en: '“If you do not manage memory layout directly, you do not truly own the performance.”'
    }
  },
  {
    id: 'cognitive_ai',
    title: {
      uz: 'Kognitiv AI & Avtonom Arxitektura',
      ru: 'Когнитивный AI & Автономная Архитектура',
      en: 'Cognitive AI & Autonomous Swarms'
    },
    category: {
      uz: 'Sun’iy Intellekt & Multi-Agent Tizimlari',
      ru: 'ИИ & Мультиагентные Системы',
      en: 'AI & Multi-Agent Architectures'
    },
    icon: Brain,
    color: 'from-white via-zinc-200 to-zinc-400',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    summary: {
      uz: "Gemini Pro, Antigravity va NotebookLM orqali murakkab kognitiv jarayonlarni avtomatlashtirish, multi-agent tizimlari, kontekst xotirasi va strukturaviy schema sintezi.",
      ru: 'Глубокая экспертиза в Gemini Pro, Antigravity и NotebookLM: построение мультиагентных систем, автономных контуров и синтез структурированных знаний.',
      en: '18+ months deep engineering with Gemini Pro, Antigravity, and NotebookLM: multi-agent autonomous swarms, deterministic tools, and second-brain knowledge synthesis.'
    },
    keyProjects: [
      {
        name: 'Launch Lab 21 Platform',
        url: 'https://turnir-launch-lab.vercel.app',
        desc: {
          uz: 'Startap inkubatori, hakamlar tekshiruvi va avtonom pitch sinovlari platformasi (Apple.com dizayni bilan).',
          ru: 'Автономный стартап-инкубатор с симулятором питча перед жюри в эстетике Apple.com.',
          en: 'Autonomous startup incubator and jury pitch simulator engineered with Apple.com design principles.'
        }
      },
      {
        name: 'Jasur Universe Portfolio',
        url: 'https://jasur-universe-portfolio.vercel.app',
        desc: {
          uz: 'Raqamli koinot va loyihalar galereyasi.',
          ru: 'Галерея проектов и цифровая вселенная.',
          en: 'Living digital universe and venture ecosystem gallery.'
        }
      }
    ],
    metrics: ['18+ Mo. Gemini Pro', 'Multi-Agent Swarms', 'Apple Design Standard', 'NotebookLM Deep Synthesis'],
    quote: {
      uz: "«Prompt yozish — shunchaki so'rash emas, model ongiga qat'iy arxitektura chizishdir.»",
      ru: '«Промптинг — это не вопросы, это проектирование детерминированной архитектуры вычислений.»',
      en: '“Prompt architecture is not asking questions; it is constructing deterministic logic bounds.”'
    }
  },
  {
    id: 'arbitrage',
    title: {
      uz: 'Tijorat & Asimmetrik Arbitraj',
      ru: 'Коммерция & Асимметричный Арбитраж',
      en: 'Commercial Arbitrage & Trade'
    },
    category: {
      uz: 'Sanoat Uskunalari & Bozor Strategiyasi',
      ru: 'Промышленное Оборудование & Рыночная Стратегия',
      en: 'Industrial Machinery & Market Asymmetry'
    },
    icon: TrendingUp,
    color: 'from-white via-zinc-200 to-zinc-400',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    summary: {
      uz: 'Sanoat tikuv mashinalari va tekstil uskunalarini yetkazib berish bo‘yicha tajriba. $2 va $375 marja optimallashtirish strategiyasi, Markaziy Osiyo logistika va B2B savdo tarmoqlari.',
      ru: 'Опыт в поставках промышленного швейного оборудования. Стратегия маржинального арбитража ($2 vs $375) и дистрибуция по Центральной Азии.',
      en: 'Authority in industrial sewing machinery trade. Execution of asymmetric market dynamics ($2 vs $375 margin arbitrage) and Central Asian distribution.'
    },
    keyProjects: [
      {
        name: '$2 vs $375 Margin Strategy',
        desc: {
          uz: 'Past marjali ommaviy tovarlardan yuqori marjali sanoat yechimlariga o‘tish va asimmetrik savdo ustunligini shakllantirish.',
          ru: 'Переход от низкомаржинальных товаров к промышленным поставкам с асимметричной доходностью.',
          en: 'Pivoting from commodity volume to high-margin industrial machinery with structural pricing power.'
        }
      }
    ],
    metrics: ['$2 vs $375 Arbitrage', 'B2B Distribution', 'Central Asia Supply', 'Margin Dominance'],
    quote: {
      uz: "«Asl foyda sotishda emas, bozordagi narx nomutanosibligini ko'ra bilishda yashiringan.»",
      ru: '«Истинная прибыль лежит не в продаже, а в способности видеть асимметрию рынка.»',
      en: '“True margin is not made at sale; it is captured by seeing market asymmetry before others do.”'
    }
  }
]

interface BrainQueryQA {
  q: string
  a: Record<'uz' | 'ru' | 'en', string>
  tags: string[]
}

const BRAIN_KNOWLEDGE_BASE: BrainQueryQA[] = [
  {
    q: 'MedLoop AI nima va u qanday ishlaydi?',
    a: {
      uz: "MedLoop AI — O'zbekiston xususiy klinikalari uchun B2B dvigatel bo'lib, laboratoriyadan chiqqan bemorlarning 40-45 foizi shifokorga bormay ketib qolish muammosini hal qiladi. 8 soniyada laboratoriya tahlil blankini OCR orqali o'qib, bemorga oddiy tilda xavfni tushuntiradi va uni bo'sh turgan shifokor qabuliga yozadi. Natijada klinika har oy $6,000–$7,500 yo'qotilgan daromadini qaytarib oladi.",
      ru: 'MedLoop AI — это B2B платформа для частных клиник Узбекистана, устраняющая 40-45% отток пациентов после лаборатории. За 8 секунд ИИ распознает бланк анализов, объясняет пациенту риск простым языком и записывает его к врачу, возвращая клинике до $7,500/мес.',
      en: 'MedLoop AI is a B2B healthcare engine resolving the 40-45% patient drop-off in private clinics. It OCRs biomarker sheets in 8 seconds, explains risks in plain language, and routes patients directly to doctor slots, recapturing $6,000–$7,500/mo per clinic.'
    },
    tags: ['medloop', 'healthtech', 'clinic', 'dropoff', 'triage']
  },
  {
    q: 'SamDTU Rektor stipendiyasi tavsiyanomasi nima haqida?',
    a: {
      uz: "Samarqand davlat tibbiyot universiteti Boshqaruv va menejment fakulteti Menejment yo'nalishi II bosqich talabasi Shukurov Jasur Otabek o'g'liga berilgan rasmiy Tavsiyanoma. Universitet Ilmiy ishlar va innovatsiyalar bo'yicha prorektori A.S. Kubayev va bo'lim boshlig'i U.F. Payzullayeva tomonidan imzolangan. Unda Jasurning a'lo o'qishi, IT-inkubatsiya markazidagi yetakchiligi va 'EpiVision XR' startapi alohida e'tirof etilib, 2026–2027 o'quv yili kuzgi semestri Rektor stipendiyasiga tavsiya etilgan.",
      ru: 'Официальная рекомендация СамГМУ для студента 2 курса направления менеджмента Джасура Шукурова на соискание Стипендии Ректора 2026–2027. Подписана проректором по научной работе А.С. Кубаевым и зав. отделом У.Ф. Пайзуллаевой за проект EpiVision XR и лидерство в IT-инкубаторе.',
      en: 'Official recommendation letter from Samarkand State Medical University nominating 2nd-year management student Jasur Shukurov for the 2026–2027 Rector Scholarship. Signed by Vice-Rector A.S. Kubayev & U.F. Payzullayeva for his EpiVision XR venture and IT-incubator leadership.'
    },
    tags: ['rector', 'stipendiya', 'sammu', 'samdtu', 'tavsiyanoma', 'kubayev']
  },
  {
    q: 'Unicorn Health Uzbekistan qanday imkoniyatlarga ega?',
    a: {
      uz: "Unicorn Health Uzbekistan (unicorn-health-uzbekistan.vercel.app) — 169 ta klinik hisob-kitob dvigateliga ega yirik raqamli platforma. Unda pediatr dozalash, Mosteller BSA, Cockcroft-Gault buyrak klirensi, Beers va STOPP/START mezonlari, DoriQuti dorixona qidiruvi va ArzonLab laboratoriya agregatori jamlangan.",
      ru: 'Unicorn Health Uzbekistan — цифровая медицинская система со 169 алгоритмическими модулями: клиренс Cockcroft-Gault, шкалы Beers и STOPP/START, педиатрия, сервис поиска лекарств DoriQuti и агрегатор анализов ArzonLab.',
      en: 'Unicorn Health Uzbekistan features 169 verified clinical calculation engines: Cockcroft-Gault, Beers criteria, STOPP/START alerts, DoriQuti pharmacy locator, and ArzonLab diagnostic aggregator.'
    },
    tags: ['unicorn', 'health', 'uzbekistan', '169', 'doriquti', 'arzonlab']
  },
  {
    q: 'School 21 sizning muhandislik qarashlaringizga qanday ta’sir qilgan?',
    a: {
      uz: "School 21 (École 42 modeli) menga past darajali tizimli fikrlashni o'rgatdi: manual memory management (malloc/free), ko'rsatkichlar arifmetikasi, POSIX oqimlari va hech qanday chala 'placeholder' qoldirmasdan 100% ishlaydigan kod yozish madaniyati.",
      ru: 'Школа 21 привила культуру низкоуровневого программирования: ручное управление памятью, указатели в C/C++, кэш-оптимальные алгоритмы и строгий принцип Zero Placeholders.',
      en: 'School 21 instilled low-latency rigor: manual memory architecture, pointer arithmetic in C/C++, cache-aligned data structures, and the Zero Mock Fallacy principle.'
    },
    tags: ['school21', 'c', 'cpp', 'memory', 'ecole42']
  },
  {
    q: '$2 vs $375 marja arbitraji strategiyasi nima?',
    a: {
      uz: "Bu tijoratda past marjali ommaviy tovarlardan ($2 foyda) voz kechib, sanoat tikuv uskunalari va asimmetrik bozor talabiga ega yuqori marjali ($375 sof foyda) sanoat aktivlariga yo'naltirilgan biznes modeli. Bu usul minimal operatsion yuk bilan maksimal sof daromad keltiradi.",
      ru: 'Стратегия фокусировки на промышленном швейном оборудовании: уход от массовых дешевых товаров с маржой $2 в сторону индустриальных активов с чистой прибылью от $375 за единицу.',
      en: 'An asymmetric trade model shifting from low-margin commodity volume ($2) to specialized industrial machinery capture ($375 margin per transaction).'
    },
    tags: ['arbitrage', 'trade', 'machinery', 'strategy']
  }
]

export function OnlineMind({ currentLang = 'uz' }: OnlineMindProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<MindNodeId>('healthtech')
  const [activeTab, setActiveTab] = useState<'graph' | 'qa' | 'credentials' | 'ventures'>('graph')
  const [searchQuery, setSearchQuery] = useState('')
  const [qaAnswer, setQaAnswer] = useState<string | null>(null)
  const [showTavsiyanomaModal, setShowTavsiyanomaModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const selectedNode = MIND_NODES.find((n) => n.id === selectedNodeId) || MIND_NODES[0]

  // Canvas visualizer for neural node graph
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.65

      // Draw pulsating background neural connections
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'

      MIND_NODES.forEach((node, i) => {
        const theta = (i / MIND_NODES.length) * 2 * Math.PI + angle
        const x = centerX + Math.cos(theta) * radius
        const y = centerY + Math.sin(theta) * radius

        // Draw line to center
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = node.id === selectedNodeId ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = node.id === selectedNodeId ? 2 : 1
        ctx.stroke()

        // Draw perimeter lines between nodes
        const nextTheta = ((i + 1) / MIND_NODES.length) * 2 * Math.PI + angle
        const nextX = centerX + Math.cos(nextTheta) * radius
        const nextY = centerY + Math.sin(nextTheta) * radius
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nextX, nextY)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
        ctx.stroke()

        // Draw outer node circle
        ctx.beginPath()
        ctx.arc(x, y, node.id === selectedNodeId ? 16 : 10, 0, 2 * Math.PI)
        ctx.fillStyle = node.id === selectedNodeId ? '#ffffff' : '#141416'
        ctx.fill()
        ctx.strokeStyle = node.id === selectedNodeId ? '#ffffff' : 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw central core brain orb (Crisp White Monolith)
      ctx.beginPath()
      ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#ffffff'
      ctx.shadowBlur = 24
      ctx.fill()
      ctx.shadowBlur = 0

      angle += 0.003
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [selectedNodeId])

  const handleAskBrain = (query: string) => {
    setSearchQuery(query)
    const lower = query.toLowerCase()
    const found = BRAIN_KNOWLEDGE_BASE.find((item) =>
      item.tags.some((t) => lower.includes(t)) ||
      item.q.toLowerCase().includes(lower)
    )

    if (found) {
      setQaAnswer(found.a[currentLang])
    } else {
      setQaAnswer(
        currentLang === 'uz'
          ? `«${query}» bo‘yicha Jasurning onlayn fikr bazasida ma’lumotlar sintez qilindi. Asosiy e’tibor HealthTech, past darajali C/C++ va SamDTU klinik boshqaruviga qaratilgan. Batafsil ma’lumot olish uchun Telegram orqali @Shukurov_Jasur ga yozishingiz mumkin.`
          : currentLang === 'ru'
          ? `Синтезирован ответ по запросу «${query}». Основной стек Джасура сосредоточен на HealthTech, низкоуровневом C/C++ и медицинском управлении в СамГМУ. Для прямого контакта пишите в Telegram: @Shukurov_Jasur.`
          : `Synthesized perspective for "${query}". Jasur's core focus combines HealthTech (MedLoop AI), School 21 low-latency C/C++, and SamSMU healthcare governance. For direct inquiries, message @Shukurov_Jasur.`
      )
    }
  }

  const copyProfileLink = () => {
    navigator.clipboard.writeText('https://turnir-launch-lab.vercel.app#online-mind')
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in text-[#f5f5f7]">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: JASUR SHUKUROV ONLINE MIND (BLACK & WHITE)                 */}
      {/* ========================================================================= */}
      <section className="apple-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 via-zinc-800/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_#ffffff]" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300">
                {currentLang === 'uz'
                  ? 'ONLAYN MIYA FAOL • TASHKENT / SAMARKAND / CLOUD'
                  : currentLang === 'ru'
                  ? 'ОНЛАЙН РАЗУМ АКТИВЕН • ТАШКЕНТ / САМАРКАНД / ОБЛАКО'
                  : 'ONLINE MIND ACTIVE • SAMARKAND / TASHKENT / CLOUD'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
              JASUR SHUKUROV
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                CEO & ARCHITECT
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-3xl leading-relaxed">
              {currentLang === 'uz'
                ? 'School 21 past darajali C/C++ tizimlari, Samarqand davlat tibbiyot universiteti (Rektor stipendiyasi nomzodi) sog‘liqni saqlash menejmenti va Antigravity avtonom AI arxitekturasi birlashmasi.'
                : currentLang === 'ru'
                ? 'Синтез низкоуровневых систем C/C++ (Школа 21), управления здравоохранением СамГМУ (стипендия ректора) и когнитивных архитектур автономного ИИ.'
                : 'Unifying low-latency C/C++ engineering from School 21, healthcare administration from SamSMU (Rector Scholarship nominee), and autonomous AI architectures.'}
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="https://t.me/Shukurov_Jasur"
              target="_blank"
              rel="noreferrer"
              className="apple-btn-primary flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@Shukurov_Jasur</span>
            </a>

            <a
              href="https://www.instagram.com/jasurceo?stkn=MXQ2ZmN4bTJyY2pnNQ=="
              target="_blank"
              rel="noreferrer"
              className="apple-btn-secondary flex items-center gap-1.5"
            >
              <InstagramIcon />
              <span>@jasurceo</span>
            </a>

            <button
              onClick={() => setShowTavsiyanomaModal(true)}
              className="apple-btn-secondary flex items-center gap-1.5 border-white/20 text-white hover:border-white/50"
            >
              <Award className="w-3.5 h-3.5 text-white" />
              <span>{currentLang === 'uz' ? 'Tavsiyanoma' : currentLang === 'ru' ? 'Рекомендация' : 'Rector Letter'}</span>
            </button>

            <button
              onClick={copyProfileLink}
              className="apple-btn-secondary p-2"
              title="Copy link to online mind"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#a1a1aa]" />}
            </button>
          </div>
        </div>

        {/* Executive Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-[#a1a1aa] block">Academic Excellence</span>
            <span className="font-semibold text-white text-sm">SamMU Management (II)</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Rector's Scholarship Nominee</span>
          </div>
          <div>
            <span className="text-[#a1a1aa] block">Systems Engineering</span>
            <span className="font-semibold text-white text-sm">School 21 (École 42)</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Low-Latency C/C++ Protocols</span>
          </div>
          <div>
            <span className="text-[#a1a1aa] block">Core Ventures</span>
            <span className="font-semibold text-white text-sm">MedLoop AI • Unicorn</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">169 Clinical Math Modules</span>
          </div>
          <div>
            <span className="text-[#a1a1aa] block">Commercial Edge</span>
            <span className="font-semibold text-white text-sm">$2 vs $375 Strategy</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Industrial Machinery Trade</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. NAVIGATION SUBTABS (Graph, Q&A, Credentials, Ventures)                 */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'graph'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>{currentLang === 'uz' ? 'Kognitiv Xarita' : currentLang === 'ru' ? 'Когнитивная Карта' : 'Neural Graph'}</span>
        </button>

        <button
          onClick={() => setActiveTab('ventures')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'ventures'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>{currentLang === 'uz' ? 'Barcha Loyihalar' : currentLang === 'ru' ? 'Все Проекты' : 'Live Ventures'}</span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'qa'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{currentLang === 'uz' ? 'Miyaga Savol Berish' : currentLang === 'ru' ? 'Задать Вопрос ИИ' : 'Ask Brain AI'}</span>
        </button>

        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'credentials'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{currentLang === 'uz' ? 'Tavsiyanoma & Diplomlar' : currentLang === 'ru' ? 'Рекомендации и Дипломы' : 'Credentials & Letter'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE COGNITIVE NEURAL GRAPH                                  */}
      {/* ========================================================================= */}
      {activeTab === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Canvas Neural Lobe Display */}
          <div className="lg:col-span-5 apple-card p-6 flex flex-col items-center justify-center min-h-[420px] relative">
            <span className="text-[10px] font-mono text-[#86868b] absolute top-4 left-4 uppercase tracking-wider">
              {currentLang === 'uz' ? 'Interaktiv Neyron Klaster' : currentLang === 'ru' ? 'Интерактивный Нейро-Кластер' : 'Interactive Neural Cluster'}
            </span>

            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="max-w-full h-auto cursor-pointer"
            />

            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {MIND_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
                    selectedNodeId === n.id
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-white/5 text-[#a1a1aa] hover:text-white border border-white/10'
                  }`}
                >
                  {n.title[currentLang].split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Cognitive Lobe Dossier */}
          <div className="lg:col-span-7 apple-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white text-black shadow-lg">
                  <selectedNode.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    {selectedNode.category[currentLang]}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedNode.title[currentLang]}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-white/40 pl-4 italic">
              {selectedNode.quote[currentLang]}
            </p>

            <p className="text-sm text-[#d2d2d7] leading-relaxed">
              {selectedNode.summary[currentLang]}
            </p>

            {/* Key Metrics Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedNode.metrics.map((m, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white"
                >
                  ✓ {m}
                </span>
              ))}
            </div>

            {/* Key Projects in this Node */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                {currentLang === 'uz' ? 'Ushbu Yo‘nalishdagi Loyihalar' : currentLang === 'ru' ? 'Проекты в этом направлении' : 'Projects in this Domain'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedNode.keyProjects.map((p, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-2xl bg-[#161618] border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{p.name}</span>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white hover:text-zinc-400 transition p-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-[#86868b] leading-normal">{p.desc[currentLang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ALL VERIFIED VENTURES & WORLDWIDE LINKS (MONOCHROME BENTO)           */}
      {/* ========================================================================= */}
      {activeTab === 'ventures' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* MedLoop AI */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    B2B CLINICAL TRIAGE
                  </span>
                  <span className="text-xs font-mono text-zinc-500">MVP 2026</span>
                </div>
                <h4 className="text-lg font-bold text-white">MedLoop AI</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? 'Laboratoriyadan chiqqan bemorni 8 soniyada shifokor qabuliga qaytaruvchi AI-triaj ko‘prigi. 40–45% bemor yo‘qotilishini to‘xtatadi.'
                    : currentLang === 'ru'
                    ? 'ИИ-мост между лабораторией и врачом: возвращает 45% уходящих пациентов, принося клинике до $7,500/мес.'
                    : 'Recaptures the 40-45% patient drop-off after lab testing, routing them to clinic doctors in 8 seconds.'}
                </p>
              </div>
              <a
                href="https://turnir-launch-lab.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="apple-btn-primary flex items-center justify-center gap-1.5 w-full text-center"
              >
                <span>Launch Lab Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Unicorn Health Uzbekistan */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    169 CLINICAL ENGINES
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Live Production</span>
                </div>
                <h4 className="text-lg font-bold text-white">Unicorn Health Uzbekistan</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? '169 ta matematik tibbiy modul, DoriQuti retsept va dorixona qidiruvi, ArzonLab diagnostik agregatori.'
                    : currentLang === 'ru'
                    ? '169 клинических математических модулей, поиск аптек DoriQuti и агрегатор анализов ArzonLab.'
                    : '169 validated clinical dosing algorithms, pharmacy locator DoriQuti, and ArzonLab diagnostic portal.'}
                </p>
              </div>
              <a
                href="https://unicorn-health-uzbekistan.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="apple-btn-primary flex items-center justify-center gap-1.5 w-full text-center"
              >
                <span>Open Unicorn Health</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Tahlil AI */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    LAB ANALYZER & BOT
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Live Web & Bot</span>
                </div>
                <h4 className="text-lg font-bold text-white">Tahlil AI & @Tahlil_ai_bot</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? 'Qon va biomolekulyar tahlil varaqalarini avtomatlashtirilgan tarzda o‘qib, oddiy tilda xulosa beruvchi tizim.'
                    : currentLang === 'ru'
                    ? 'Автоматический анализ бланков лабораторных исследований с объяснением на понятном языке.'
                    : 'Automated clinical laboratory test result analyzer with instant plain-language risk explanation.'}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://tahlilai-mvp.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="apple-btn-primary flex-1 text-center"
                >
                  Web MVP
                </a>
                <a
                  href="https://t.me/Tahlil_ai_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="apple-btn-secondary flex-1 text-center"
                >
                  Telegram Bot
                </a>
              </div>
            </div>

            {/* Osiyo Medical Bot */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    TELEGRAM CLINICAL ADVISOR
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Active</span>
                </div>
                <h4 className="text-lg font-bold text-white">@Osiyomedicalbot</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? 'Bemorlarni shifokorlar va tibbiy muassasalar bilan bog‘lovchi avtomatlashtirilgan klinik maslahat boti.'
                    : currentLang === 'ru'
                    ? 'Автоматизированный бот медицинских консультаций и маршрутизации пациентов в клиники.'
                    : 'Automated patient intake, clinical advisory, and doctor scheduling assistant on Telegram.'}
                </p>
              </div>
              <a
                href="https://t.me/Osiyomedicalbot"
                target="_blank"
                rel="noreferrer"
                className="apple-btn-secondary flex items-center justify-center gap-1.5 w-full text-center"
              >
                <span>Open @Osiyomedicalbot</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* EpiVision XR */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    SURGICAL 3D / XR
                  </span>
                  <span className="text-xs font-mono text-zinc-500">SamMU Venture</span>
                </div>
                <h4 className="text-lg font-bold text-white">EpiVision XR</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? 'Tibbiyot xodimlari va talabalar uchun interaktiv simulyatsion vosita. Rektor stipendiyasi tavsiyanomasida alohida qayd etilgan.'
                    : currentLang === 'ru'
                    ? 'Интерактивный симулятор хирургических и клинических навыков для студентов и врачей.'
                    : 'Interactive 3D spatial simulation for surgery and medical pedagogy. High-impact SamMU startup.'}
                </p>
              </div>
              <button
                onClick={() => setShowTavsiyanomaModal(true)}
                className="apple-btn-secondary flex items-center justify-center gap-1.5 w-full text-center"
              >
                <span>Inspect Recommendation</span>
                <Award className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Launch Lab 21 */}
            <div className="apple-card p-5 space-y-3 flex flex-col justify-between border-white/10 hover:border-white/25">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    SCHOOL 21 INCUBATOR
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Apple.com Edition</span>
                </div>
                <h4 className="text-lg font-bold text-white">Launch Lab 21</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {currentLang === 'uz'
                    ? 'Startap inkubatori, hakamlar tekshiruvi va bir sahifali sarmoyaviy xulosa yaratuvchi avtonom platforma.'
                    : currentLang === 'ru'
                    ? 'Стартап-инкубатор и симулятор защиты проектов перед жюри в интерфейсе Apple.com.'
                    : 'Autonomous startup incubator and jury verification cockpit running client-side with zero server dependencies.'}
                </p>
              </div>
              <a
                href="https://turnir-launch-lab.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="apple-btn-primary flex items-center justify-center gap-1.5 w-full text-center"
              >
                <span>Live Worldwide Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: "ASK JASUR'S MIND" INTERACTIVE AI QUERY                            */}
      {/* ========================================================================= */}
      {activeTab === 'qa' && (
        <div className="apple-card p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              SYNTHETIC REASONING CONSOLE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentLang === 'uz' ? 'Jasurning Onlayn Miya Bazasidan So‘rang' : currentLang === 'ru' ? 'Задайте вопрос базе знаний Джасура' : "Query Jasur's Online Mind"}
            </h3>
            <p className="text-xs text-[#a1a1aa]">
              {currentLang === 'uz'
                ? 'Loyiha arxitekturasi, tibbiy iqtisodiyot, C/C++ xotira modellari yoki SamDTU Rektor stipendiyasi bo‘yicha savol bering:'
                : currentLang === 'ru'
                ? 'Спросите об архитектуре проектов, медицинской экономике, моделях памяти в C++ или стипендии СамГМУ:'
                : 'Ask anything regarding MedLoop AI, SamSMU governance, School 21 systems engineering, or the $2 vs $375 strategy:'}
            </p>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            {BRAIN_KNOWLEDGE_BASE.map((qa, idx) => (
              <button
                key={idx}
                onClick={() => handleAskBrain(qa.q)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition text-left inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span>{qa.q}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 bg-black border border-white/20 rounded-2xl p-2 px-4 focus-within:border-white transition">
            <Search className="w-4 h-4 text-[#86868b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  handleAskBrain(searchQuery)
                }
              }}
              placeholder={
                currentLang === 'uz'
                  ? 'Savolingizni yozing (masalan: MedLoop qanday ishlaydi?)...'
                  : currentLang === 'ru'
                  ? 'Введите ваш вопрос (например: Как работает MedLoop AI?)...'
                  : 'Type your query (e.g. How does MedLoop AI work?)...'
              }
              className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-[#6e6e73]"
            />
            <button
              onClick={() => searchQuery.trim() && handleAskBrain(searchQuery)}
              className="apple-btn-primary text-xs px-4 py-1.5"
            >
              Ask
            </button>
          </div>

          {/* Answer Box */}
          {qaAnswer && (
            <div className="p-5 rounded-2xl bg-[#161618] border border-white/25 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Sparkles className="w-4 h-4" />
                <span>{currentLang === 'uz' ? 'Miya Sintezi Natijasi:' : currentLang === 'ru' ? 'Результат Синтеза Разума:' : 'Synthesized Mind Response:'}</span>
              </div>
              <p className="text-sm text-[#f5f5f7] leading-relaxed whitespace-pre-line">
                {qaAnswer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: OFFICIAL CREDENTIALS & TAVSIYANOMA (RECOMMENDATION LETTER)          */}
      {/* ========================================================================= */}
      {activeTab === 'credentials' && (
        <div className="apple-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                OFFICIAL INSTITUTIONAL VAULT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {currentLang === 'uz' ? 'SamDTU Rektor Stipendiyasi Tavsiyanomasi' : currentLang === 'ru' ? 'Рекомендация СамГМУ на Стипендию Ректора' : 'SamSMU Rector Scholarship Recommendation'}
              </h3>
            </div>
            <button
              onClick={() => setShowTavsiyanomaModal(true)}
              className="apple-btn-primary text-xs flex items-center gap-1.5"
            >
              <span>{currentLang === 'uz' ? 'To‘liq Hujjatni O‘qish' : currentLang === 'ru' ? 'Читать полностью' : 'Full Document'}</span>
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Letter Excerpt Card */}
          <div className="p-6 rounded-2xl bg-[#161618] border border-white/20 space-y-4 text-xs sm:text-sm text-[#d2d2d7] leading-relaxed">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#86868b]">
              <span>Samarqand davlat tibbiyot universiteti</span>
              <span>2026–2027 O‘quv Yili</span>
            </div>

            <p className="font-semibold text-white">
              «Shukurov Jasur Otabek o‘g‘li 2025-yildan buyon Samarqand davlat tibbiyot universitetining Boshqaruv va menejment fakulteti Menejment yo‘nalishida tahsil olib, hozirda II bosqich 201-guruhning eng intiluvchan va iqtidorli talabalaridan biri hisoblanadi...»
            </p>

            <p>
              «...Talaba sog‘liqni saqlash tizimiga ilg‘or axborot texnologiyalari va raqamli innovatsiyalarni tatbiq etish yo‘nalishida intilib, universitet IT-inkubatsiya markazi faoliyatida tashabbuskor yetakchilardan biri sifatida qatnashmoqda. Ayni vaqtda tibbiyot sohasi xodimlari va talabalar uchun interaktiv simulyatsion vosita hisoblangan “EpiVision XR” Start-up loyihasining loyiha boshqaruvi va biznes modeli ustida qizg‘in izlanishlar olib bormoqda.»
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#86868b]">
              <div>
                <span className="text-white block font-semibold">U.F. Payzullayeva</span>
                <span>Iqtidorli talabalarning IT faoliyatini tashkil etish bo‘limi boshlig‘i</span>
              </div>
              <div className="sm:text-right">
                <span className="text-white block font-semibold">A.S. Kubayev</span>
                <span>Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor, SamDTU</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FULL TAVSIYANOMA VIEWER (MONOCHROME NOIR)                           */}
      {/* ========================================================================= */}
      {showTavsiyanomaModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="apple-card max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Award className="w-5 h-5 text-white" />
                <span>RASMIY TAVSIYANOMA • SAMDTU</span>
              </div>
              <button
                onClick={() => setShowTavsiyanomaModal(false)}
                className="apple-btn-secondary text-xs px-3 py-1"
              >
                ✕ Yopish
              </button>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-[#86868b]">Samarqand davlat tibbiyot universiteti</p>
              <p className="text-xs text-[#86868b]">Boshqaruv va menejment fakulteti Menejment yo‘nalishi</p>
              <h3 className="text-lg font-bold text-white mt-2">TAVSIYANOMA</h3>
              <p className="text-xs text-zinc-400">Shukurov Jasur Otabek o‘g‘liga</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#d2d2d7] leading-relaxed text-justify">
              <p>
                Shukurov Jasur Otabek o‘g‘li 2025-yildan buyon Samarqand davlat tibbiyot universitetining Boshqaruv va menejment fakulteti Menejment yo‘nalishida tahsil olib, hozirda II bosqich 201-guruhning eng intiluvchan va iqtidorli talabalaridan biri hisoblanadi.
              </p>
              <p>
                Shukurov Jasur o‘quv jarayonida o‘zining teran tahliliy tafakkuri, yuqori yetakchilik va tashkilotchilik qobiliyati, fanlarni a’lo baholarga o‘zlashtirishi bilan fakultet jamoasida alohida hurmat qozongan. U sog‘liqni saqlash sohasida zamonaviy menejment tamoyillari, tibbiyot iqtisodiyoti va strategik rejalashtirish usullarini chuqur egallab, murakkab boshqaruv vazifalariga tizimli yechimlar topishda o‘zining yuksak intellektual salohiyatini namoyon etib kelmoqda.
              </p>
              <p>
                Talaba sog‘liqni saqlash tizimiga ilg‘or axborot texnologiyalari va raqamli innovatsiyalarni tatbiq etish yo‘nalishida intilib, universitet IT-inkubatsiya markazi faoliyatida tashabbuskor yetakchilardan biri sifatida qatnashmoqda. U markaz va iqtidorli talabalar ilmiy jamiyati doirasidagi ko‘rik-tanlovlar, xakatonlar hamda ilmiy-amaliy anjumanlarda o‘zining amaliy loyihalari bilan faol ishtirok etib, faxrli o‘rinlar, diplom va sertifikatlarga sazovor bo‘lgan.
              </p>
              <p>
                Ayni vaqtda Shukurov Jasur tibbiyot sohasi xodimlari va talabalar uchun interaktiv simulyatsion vosita hisoblangan “EpiVision XR” Start-up loyihasining loyiha boshqaruvi (Project Management), biznes modeli hamda sog‘liqni saqlash amaliyotiga tatbiq etish mexanizmlari ustida qizg‘in izlanishlar olib bormoqda.
              </p>
              <p className="font-semibold text-white">
                Ushbu tavsiyanoma Samarqand davlat tibbiyot universiteti Boshqaruv va menejment fakulteti Menejment yo‘nalishi talabasi Shukurov Jasur Otabek o‘g‘lining namunali xulqi, yetakchilik salohiyati, o‘quvdagi yutuqlari va innovatsion faolligini rag‘batlantirish maqsadida 2026–2027-o‘quv yili kuzgi semestri “Rektor stipendiyasi” tanlov komissiyasiga taqdim qilish uchun berildi.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-[#86868b] block">Bo‘lim boshlig‘i:</span>
                <span className="font-bold text-white">U.F. Payzullayeva</span>
                <span className="text-[11px] text-[#86868b] block mt-0.5">Iqtidorli talabalarning ilmiy-tadqiqot faoliyatini tashkil etish bo‘limi</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-[#86868b] block">Ilmiy ishlar prorektori:</span>
                <span className="font-bold text-white">A.S. Kubayev</span>
                <span className="text-[11px] text-[#86868b] block mt-0.5">Samarqand davlat tibbiyot universiteti</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTavsiyanomaModal(false)}
                className="apple-btn-primary text-xs px-6 py-2"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
