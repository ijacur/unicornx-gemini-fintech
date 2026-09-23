import type { ProjectData } from '../types/incubator'

const STORAGE_KEY = 'launch_lab_21_projects_v2'
const CURRENT_PROJECT_ID_KEY = 'launch_lab_21_current_id_v2'
const ROLE_KEY = 'launch_lab_21_user_role'

export const SEED_PROJECTS: ProjectData[] = [
  {
    id: 'demo-launch-lab',
    name: 'EduVibe AI — Умный ассистент кампуса 21',
    description: 'Платформа автоматизированной акселерации и peer-to-peer сборки проектных питчей для инкубатора Launch Lab 21.',
    teamMembers: "Black's (Самарканд): Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA)",
    createdAt: '2026-09-13T10:00:00.000Z',
    juryPhrase: 'Launch Lab 21 — Будущее создаётся здесь!',
    status: 'approved',
    badges: ['Основа', 'Продукт', 'Аналитика', 'Финансы', 'Реализация'],
    likes: 342,
    reactions: { fire: 189, unicorn: 94, rocket: 215, idea: 76 },
    answers: {
      problem: '• Проблема: 70% начинающих стартапов не могут структурировать идею для инвесторов и тратят недели на переписку.\n• Текущие альтернативы: Хаотичные Google Документы, разрозненные чаты и бесконечные созвоны.\n• Целевая аудитория: 5,000+ участников кампусов School 21, запускающих свои первые IT-продукты.',
      solution: '• Решение: Интерактивная платформа пошаговой акселерации с авто-генерацией инвестиционного One-Pager.\n• UVP (Уникальность): Сокращает подготовку инвестиционного one-pager с 14 дней до 45 минут за счёт пошаговых шаблонов.\n• Статус MVP: Рабочий прототип протестирован на турнире вайбкодинга School 21.',
      market: '• Рынок TAM/SAM: $1.2B рынок университетских инкубаторов и EdTech-акселераторов в СНГ и Центральной Азии.\n• Конкуренты: Notion-шаблоны (нет трекинга) и классические программы (медленный ручной аудит).\n• Первые клиенты: 3 кампуса School 21 и 2 технологических вуза-партнёра.',
      business_model: '• Монетизация: B2B SaaS-подписка для вузов и коворкингов ($490/мес) + Success Fee 2% с привлечённых инвестиций.\n• Unit-экономика: CAC $80, LTV $1,200, окупаемость 1.5 месяца.\n• Каналы продаж: Прямая интеграция в экосистему кампусов и хакатонов.',
      team_traction: '• Команда: 2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер.\n• Текущий трэкшн: Создан рабочий MVP за 60 минут турнира, протестирован обязательный сценарий.\n• Запрос: Менторство Launch Lab 21 по B2B-продажам и запуск пилота.'
    },
    fieldAnswers: {
      problem: {
        problem_core: '70% начинающих стартапов не могут структурировать инвестиционный one-pager.',
        problem_target: 'Студенты и выпускники School 21, запускающие первый IT-бизнес.',
        problem_alternatives: 'Разрозненные Google Docs, потеря данных, недели на ручную переписку.'
      },
      solution: {
        solution_core: 'Интерактивная платформа пошаговой акселерации с авто-генерацией артефактов.',
        solution_uvp: 'Сокращает путь от идеи до презентационного One-Pager с 14 дней до 45 минут.',
        solution_mvp_status: 'Полностью клиентское SPA на React 19 с сохранением в LocalStorage и режимом куратора.'
      },
      market: {
        market_size: '$1.2B рынок EdTech и университетских акселераторов в СНГ и Центральной Азии.',
        market_competitors: 'Notion-шаблоны не дают автоматизации, классические инкубаторы медленные.',
        market_early_adopters: 'Партнёрство с кампусами School 21, старт с 500 активных студентов.'
      },
      business_model: {
        bm_revenue_stream: 'B2B SaaS-подписка для вузов и коворкингов ($490/мес) + Success Fee 2%.',
        bm_unit_economics: 'CAC $80, LTV $1,200, Payback period 1.5 месяца.',
        bm_scale_plan: 'Выход на 15 новых образовательных хабов к концу года.'
      },
      team_traction: {
        team_roles: '2 инженера School 21 (Fullstack & AI), 1 продуктовый дизайнер.',
        team_traction_proof: 'Рабочий прототип создан за 60 минут, протестирован на турнире вайбкодинга.',
        team_incubator_ask: 'Менторская поддержка по B2B-продажам и доступ к пилотам в сети кампусов.'
      }
    },
    curatorComments: {
      problem: [
        {
          id: 'c1',
          author: 'Александр Ким',
          role: 'Главный трекер Launch Lab 21',
          text: 'Отличная формулировка проблемы! Боль целевой аудитории валидирована на практике кампусов.',
          date: '2026-09-13T10:30:00.000Z'
        }
      ],
      solution: [
        {
          id: 'c2',
          author: 'Дилором Махмудова',
          role: 'Инвестиционный эксперт',
          text: 'UVP звучит убедительно. Обратите внимание на автоэкспорт в PDF для инвесторов.',
          date: '2026-09-13T11:15:00.000Z'
        }
      ]
    },
    versionHistory: {
      problem: [
        {
          id: 'v1',
          timestamp: '2026-09-13T10:15:00.000Z',
          author: 'Команда стартапа',
          text: '• Проблема: Стартапы долго готовят презентации.\n• Альтернативы: Google Docs.'
        },
        {
          id: 'v2',
          timestamp: '2026-09-13T10:28:00.000Z',
          author: 'Команда стартапа',
          text: '• Проблема: 70% начинающих стартапов не могут структурировать идею для инвесторов и тратят недели на переписку.\n• Текущие альтернативы: Хаотичные Google Документы, разрозненные чаты и бесконечные созвоны.\n• Целевая аудитория: 5,000+ участников кампусов School 21, запускающих свои первые IT-продукты.'
        }
      ]
    }
  },
  {
    id: 'ecoroute-ai',
    name: 'EcoRoute AI — Smart Urban Logistics',
    description: 'ИИ-платформа динамической оптимизации маршрутов последней мили для e-commerce и курьерских служб.',
    teamMembers: "Команда Black's: Jasur (Lead), Farrux (Frontend), Bilol (Product), Shoxrux (QA & Pitch)",
    createdAt: '2026-09-13T12:30:00.000Z',
    juryPhrase: 'EcoRoute AI — Быстрее пробок, чище воздух!',
    status: 'ready_for_pitch',
    badges: ['Основа', 'Продукт', 'Аналитика', 'Финансы', 'Реализация'],
    likes: 518,
    reactions: { fire: 240, unicorn: 110, rocket: 305, idea: 120 },
    answers: {
      problem: '• Проблема: Курьерские службы теряют до 35% маржи на холостом пробеге и задержках в пробках в часы пик.\n• Текущие альтернативы: Статичные карты и ручное распределение заказов диспетчерами.\n• Целевая аудитория: Логистические парки, dark stores и e-commerce ритейлеры с флотом от 20 курьеров.',
      solution: '• Решение: ML-алгоритм динамической маршрутизации с прогнозом дорожной обстановки в реальном времени.\n• UVP: Сокращает время доставки на 28% и уменьшает топливные издержки на 22%.\n• Скоуп MVP: Готовый модуль предиктивного построения графа маршрутов с интеграцией в Telegram-бот курьера.',
      market: '• Объем рынка: $3.4B региональный рынок Last-Mile Delivery в регионе MENA и Центральной Азии.\n• Конкуренты: Дорогие enterprise TMS системы (Yandex Route, Onfleet). Наше преимущество — быстрый старт без интегратора и тариф $0.05 за заказ.\n• Первые клиенты: Пилотные соглашения с 2 сетями dark kitchen и 1 экспресс-доставкой (350 заказов/день).',
      business_model: '• Монетизация: B2B микро-транзакции ($0.04 - $0.08 за заказ) + месячный SaaS тир для автопарков ($199/мес).\n• Unit-экономика: CAC $120, LTV $2,400, срок окупаемости 1.2 месяца.',
      team_traction: '• Команда: Инженеры School 21 (Fullstack, AI, QA).\n• Трэкшн: Протестировано 1,200 виртуальных симуляций доставок, сокращение времени подтверждено на 24.6%.'
    },
    fieldAnswers: {
      problem: {
        problem_core: 'Курьерские службы теряют до 35% маржи на холостом пробеге и пробках.',
        problem_target: 'Dark stores, e-commerce ритейлеры и логистические службы с флотом от 20 курьеров.',
        problem_alternatives: 'Статичные навигаторы и ручная группировка заказов диспетчером.'
      },
      solution: {
        solution_core: 'ML-модель динамического объединения пулов заказов и предиктивной маршрутизации.',
        solution_uvp: 'Сокращение времени доставки на 28% и экономия топлива 22%.',
        solution_mvp_status: 'Клиентский трекер маршрутов и калькулятор юнит-экономики инкубатора.'
      },
      market: {
        market_size: '$3.4B рынок Last-Mile Logistics в регионе.',
        market_competitors: 'Тяжёлые enterprise системы vs наш zero-setup SaaS.',
        market_early_adopters: '2 dark kitchen сети и 1 служба экспресс-доставки.'
      }
    },
    curatorComments: {
      problem: [
        {
          id: 'c-eco-1',
          author: 'Александр Ким',
          role: 'Главный трекер Launch Lab 21',
          text: 'Отличная юнит-экономика и четкая фокусировка на боли B2B логистики!',
          date: '2026-09-13T12:40:00.000Z'
        }
      ]
    },
    versionHistory: {}
  },
  {
    id: 'empty-test-project',
    name: 'Сырая идея (Чистый проект для жюри)',
    description: 'Абсолютно пустой проект для живой проверки жюри: проверка чистого состояния и заполнения с нуля.',
    teamMembers: 'Участники турнира (Solo / Team)',
    createdAt: '2026-09-13T12:00:00.000Z',
    juryPhrase: 'Тестовая фраза жюри турнира School 21',
    status: 'draft',
    badges: [],
    likes: 42,
    reactions: { fire: 18, unicorn: 5, rocket: 22, idea: 31 },
    answers: {},
    fieldAnswers: {},
    curatorComments: {},
    versionHistory: {}
  },
  {
    id: 'ecotrack-21',
    name: 'EcoTrack 21 — AI мониторинг энергоэффективности',
    description: 'IoT + AI решение для оптимизации энергопотребления серверов и рабочих станций в технологических кластерах.',
    teamMembers: 'Рустам (Backend), Сардор (Embedded / IoT)',
    createdAt: '2026-09-13T11:30:00.000Z',
    juryPhrase: 'EcoTrack — Зелёный код кампуса',
    status: 'in_review',
    badges: ['Основа', 'Продукт'],
    likes: 184,
    reactions: { fire: 92, unicorn: 45, rocket: 130, idea: 54 },
    answers: {
      problem: '• Проблема: Высокий углеродный след и перерасход электроэнергии в режиме 24/7 в вычислительных кластерах.\n• Альтернативы: Ручные таймеры отключения и приблизительные расчёты.',
      solution: '• Решение: Автоматическая балансировка нагрузки и отключение неактивных узлов с помощью ML-моделей.\n• UVP: Снижение счетов за электроэнергию на 32%.'
    },
    fieldAnswers: {},
    curatorComments: {
      problem: [
        {
          id: 'c3',
          author: 'Александр Ким',
          role: 'Главный трекер Launch Lab 21',
          text: 'Проблема актуальна, допишите оценку объема рынка в Модуле 3.',
          date: '2026-09-13T12:10:00.000Z'
        }
      ]
    },
    versionHistory: {}
  }
]

export function loadProjects(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      saveProjects(SEED_PROJECTS)
      return SEED_PROJECTS
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p: ProjectData, idx: number) => ({
        ...p,
        likes: typeof p.likes === 'number' ? p.likes : [342, 518, 42, 184][idx % 4] || 120,
        reactions: p.reactions || {
          fire: [189, 240, 18, 92][idx % 4] || 50,
          unicorn: [94, 110, 5, 45][idx % 4] || 25,
          rocket: [215, 305, 22, 130][idx % 4] || 65,
          idea: [76, 120, 31, 54][idx % 4] || 35
        }
      }))
    }
    return SEED_PROJECTS
  } catch (e) {
    console.error('Error loading projects from localStorage', e)
    return SEED_PROJECTS
  }
}

export function saveProjects(projects: ProjectData[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (e) {
    console.error('Error saving projects to localStorage', e)
  }
}

export function loadCurrentProjectId(): string {
  return localStorage.getItem(CURRENT_PROJECT_ID_KEY) || 'demo-launch-lab'
}

export function saveCurrentProjectId(id: string) {
  localStorage.setItem(CURRENT_PROJECT_ID_KEY, id)
}

export function loadUserRole(): 'participant' | 'curator' {
  const role = localStorage.getItem(ROLE_KEY)
  return role === 'curator' ? 'curator' : 'participant'
}

export function saveUserRole(role: 'participant' | 'curator') {
  localStorage.setItem(ROLE_KEY, role)
}

