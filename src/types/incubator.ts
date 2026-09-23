export interface ModuleField {
  id: string
  label: string
  placeholder: string
  helperText?: string
}

export interface PromptFormulaItem {
  kimSiz: string // Role (KIM SIZ)
  nimaKerak: string // Task (NIMA KERAK)
  kimUchun: string // Audience/Context (KIM UCHUN)
  format: string // Format (FORMAT)
}

export interface ModuleItem {
  id: string
  title: string
  titleUz: string
  icon: string
  badge: string
  description: string
  task: string
  fields: ModuleField[]
  template: string
  placeholder: string
  promptFormula: PromptFormulaItem
}

export interface CuratorComment {
  id: string
  author: string
  role: string
  text: string
  date: string
}

export interface VersionEntry {
  id: string
  timestamp: string
  author: string
  text: string
}

export interface ProjectData {
  id: string
  name: string
  description: string
  teamMembers: string
  createdAt: string
  juryPhrase?: string
  status: 'draft' | 'in_review' | 'ready_for_pitch' | 'approved'
  answers: Record<string, string> // moduleId -> answer text
  fieldAnswers?: Record<string, Record<string, string>> // moduleId -> fieldId -> text
  curatorComments?: Record<string, CuratorComment[]> // moduleId -> comments
  versionHistory?: Record<string, VersionEntry[]> // moduleId -> versions
  badges?: string[]
  likes?: number
  likedByMe?: boolean
  reactions?: Record<string, number>
}

export const INCUBATOR_MODULES: ModuleItem[] = [
  {
    id: 'problem',
    title: '1. Проблема и аудитория',
    titleUz: '1. Muammo va Maqsadli auditoriya',
    icon: 'Target',
    badge: 'Основа',
    description: 'Определите критическую боль клиентов и сегмент рынка, который острее всего её ощущает.',
    task: 'Опишите реальную боль пользователей, как они решают её сейчас и почему текущие решения неэффективны.',
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
    template: '• Проблема: 70% начинающих стартапов не могут структурировать идею для инвесторов.\n• Текущие альтернативы: Хаотичные Google Документы и бесконечные созвоны.\n• Целевая аудитория: Студенты и выпускники School 21, запускающие свой первый IT-бизнес.',
    placeholder: 'Опишите проблему и целевую аудиторию проекта...',
    promptFormula: {
      kimSiz: 'Siz — tajribali startup-treker va akselerator mentori ekansiz.',
      nimaKerak: 'Startap uchun auditoriya muammosi va alternativ yechimlarning kamchiliklarini tizimlashtirib bering.',
      kimUchun: 'School 21 Launch Lab 21 inkubatorining Demo Day hay\'ati uchun.',
      format: '3 ta aniq tezis ko\'rinishida: Muammo | Hozirgi muqobillar | Maqsadli auditoriya.'
    }
  },
  {
    id: 'solution',
    title: '2. Решение и MVP',
    titleUz: '2. Yechim va MVP',
    icon: 'Lightbulb',
    badge: 'Продукт',
    description: 'Сформулируйте ваше решение и его уникальное ценностное предложение (UVP).',
    task: 'Объясните, как именно ваш продукт устраняет описанную проблему и что уже готово в MVP.',
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
    template: '• Решение: Автоматизированный интерактивный трекер инкубатора с авто-генерацией питч-документов.\n• UVP (Уникальность): Сокращает подготовку инвестиционного one-pager с 2 недель до 45 минут за счёт пошаговых шаблонов.\n• Статус MVP: Рабочий прототип протестирован на живых данных кампуса.',
    placeholder: 'Опишите суть решения и ключевые преимущества...',
    promptFormula: {
      kimSiz: 'Siz — Senior Product Manager va texnologik startaplar arxitektorisiz.',
      nimaKerak: 'Mahsulotning UVP (Unique Value Proposition) va MVP ko\'lamini shakllantirib bering.',
      kimUchun: 'Venkure investorlar va akselerator saralash komissiyasi uchun.',
      format: 'Strukturaviy bloklar: Yechim mohiyati | Asosiy afzallik (UVP) | MVP holati.'
    }
  },
  {
    id: 'market',
    title: '3. Рынок и первые клиенты',
    titleUz: '3. Bozor va Ilk mijozlar',
    icon: 'BarChart3',
    badge: 'Аналитика',
    description: 'Оцените объем целевого рынка и ваше позиционирование среди конкурентов.',
    task: 'Укажите ориентировочный объем рынка (TAM/SAM/SOM) и первых клиентов или каналы продаж.',
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
    template: '• Рынок TAM/SAM: $1.2B рынок EdTech и стартап-акселераторов в Центральной Азии и СНГ.\n• Конкуренты: Notion-шаблоны (нет трекинга) и классические инкубаторы (медленный ручной аудит).\n• Первые клиенты: 3 кампуса School 21 и 2 технологических вуза-партнёра.',
    placeholder: 'Оцените объем рынка и конкурентное преимущество...',
    promptFormula: {
      kimSiz: 'Siz — venchur tahlilchi va bozor strategisiz.',
      nimaKerak: 'Bozor hajmini (TAM/SAM/SOM) va raqobatchilardan ustunlik omillarini hisoblab bering.',
      kimUchun: 'Startap inkubatorining investitsion qo\'mitasi uchun.',
      format: 'Raqamlar va faktlarga asoslangan 3 ta qisqa punkt.'
    }
  },
  {
    id: 'business_model',
    title: '4. Бизнес-модель и Монетизация',
    titleUz: '4. Biznes model va Monetizatsiya',
    icon: 'BadgeDollarSign',
    badge: 'Финансы',
    description: 'Определите, как проект будет генерировать выручку и масштабироваться.',
    task: 'Опишите источники доходов, ценообразование и ключевые ориентиры юнит-экономики.',
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
    template: '• Модель монетизации: B2B-подписка для вузов и акселераторов ($490/мес) + Success Fee 2% с инвестиций.\n• Unit-экономика: CAC $80, LTV $1,200, окупаемость 1.5 месяца.\n• Каналы продаж: Партнёрская сеть кампусов и технологических хабов.',
    placeholder: 'Опишите модель монетизации, тарифы и юнит-экономику...',
    promptFormula: {
      kimSiz: 'Siz — moliya direktori (CFO) va unit-iqtisodiyot bo\'yicha mutaxassissiz.',
      nimaKerak: 'Barqaror biznes model va monetizatsiya rejasini tuzing.',
      kimUchun: 'Angel investorlar va akselerator partnerlari uchun.',
      format: 'Moliyaviy formula: Tushum manbai | CAC & LTV | Masshtablash bosqichlari.'
    }
  },
  {
    id: 'team_traction',
    title: '5. Команда и Трэкшн (Traction)',
    titleUz: '5. Jamoa va Natijalar',
    icon: 'Users',
    badge: 'Реализация',
    description: 'Покажите экспертность команды и первые результаты (MVP, пользователи, метрики).',
    task: 'Перечислите ключевых участников, их роли и подтверждённый прогресс проекта на текущий момент.',
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
    template: '• Команда: 2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер.\n• Текущий трэкшн: Создан рабочий MVP за 60 минут турнира, запущено 15 тестовых команд в Launch Lab 21.\n• Запрос: Доступ к сети пилотных площадок и менторство экспертов индустрии.',
    placeholder: 'Укажите состав команды и текущие достижения...',
    promptFormula: {
      kimSiz: 'Siz — startap asoschisi (CEO) ekansiz.',
      nimaKerak: 'Jamoa kuchli tomonlari, erishilgan natijalar (Traction) va inkubatordan kutilayotgan yordamni bayon qiling.',
      kimUchun: 'Launch Lab 21 ekspertlari va hakamlar hay\'ati uchun.',
      format: '3 ta aniq tezis: Jamoa tarkibi | Qilingan ishlar | So\'rov (Ask).'
    }
  }
]
