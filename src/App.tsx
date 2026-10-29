import React, { useState, useEffect, useCallback } from 'react'
import {
  Rocket,
  Gamepad2,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Save,
  Trash2,
  ArrowRight,
  Printer,
  Copy,
  Plus,
  RotateCcw,
  Sparkles,
  Layers,
  HelpCircle,
  Check,
  FolderOpen,
  Users,
  Award,
  MessageSquare,
  Clock,
  Play,
  Pause,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  Edit3,
  Lock,
  Unlock,
  ChevronRight,
  Heart,
  Flame,
  MessageCircle,
  Send,
  Volume2,
  VolumeX,
  Bookmark,
  ChevronUp,
  ChevronDown,
  Music,
  Brain
} from 'lucide-react'
import {
  INCUBATOR_MODULES,
  type ProjectData,
  type CuratorComment,
  type VersionEntry
} from './types/incubator'
import {
  loadProjects,
  saveProjects,
  loadCurrentProjectId,
  saveCurrentProjectId,
  loadUserRole,
  saveUserRole,
  SEED_PROJECTS
} from './lib/storage'
import { triggerConfetti } from './lib/utils'
import { type Language, UI_TRANSLATIONS, MODULES_TRANSLATIONS, LOCALIZED_DEMO_PROJECT } from './lib/i18n'
import { UnicornStudio } from './components/UnicornStudio/UnicornStudio'
import { ArcadeHub } from './components/Arcade/ArcadeHub'
import { MulkXHub } from './components/RealEstateEdu/MulkXHub'
import { OnlineMind } from './components/OnlineMind/OnlineMind'
import { InteractiveBackground } from './components/InteractiveBackground'

const JURY_RELOAD_AUDIT_KEY = 'launch_lab_21_jury_reload_audit'

type JuryReloadAudit = {
  checkedAt: string
  projectName: string
  completed: boolean
}

function loadJuryReloadAudit(): JuryReloadAudit | null {
  try {
    const raw = localStorage.getItem(JURY_RELOAD_AUDIT_KEY)
    return raw ? (JSON.parse(raw) as JuryReloadAudit) : null
  } catch {
    return null
  }
}

const AppleLogo = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170" aria-label="Apple">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.78-11.65-14.23-6.2-9.97-11.07-21.43-14.6-34.37-3.53-12.93-5.3-25.06-5.3-36.38 0-14.88 3.73-27.18 11.19-36.9 7.46-9.72 16.94-14.71 28.45-14.97 4.12 0 9.06 1.15 14.84 3.46 5.77 2.31 9.77 3.51 11.98 3.6 2.66 0 6.89-1.29 12.69-3.86 5.8-2.58 10.74-3.79 14.83-3.64 10.99.55 19.8 4.67 26.43 12.37-9.49 5.76-14.12 13.88-13.89 24.36.23 8.35 3.38 15.34 9.45 20.97 6.07 5.63 13.43 8.91 22.08 9.84-2.2 6.64-4.88 13.4-8.03 20.28zM119.22 31.84c0-7.07 2.53-13.79 7.59-20.16 5.06-6.37 11.39-10.42 18.99-12.16.23 1.19.35 2.29.35 3.3 0 7.23-2.67 14.15-8.01 20.76-5.34 6.61-11.75 10.51-19.23 11.7-.22-1.12-.34-2.23-.34-3.32z" />
  </svg>
)

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('launch_lab_lang') as Language
    return saved === 'ru' || saved === 'en' || saved === 'uz' ? saved : 'uz'
  })

  const [projects, setProjects] = useState<ProjectData[]>(() => loadProjects())

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    localStorage.setItem('launch_lab_lang', lang)
    const demoData = LOCALIZED_DEMO_PROJECT[lang]
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'demo-launch-lab') {
          return {
            ...proj,
            name: demoData.name,
            description: demoData.description,
            teamMembers: demoData.teamMembers,
            juryPhrase: demoData.juryPhrase,
            answers: {
              ...demoData.answers
            }
          }
        }
        return proj
      })
    )
    triggerConfetti()
    setSaveToast(
      lang === 'uz'
        ? "🇺🇿 Til O'zbekchaga o'zgartirildi!"
        : lang === 'ru'
        ? "🇷🇺 Язык переключён на Русский!"
        : "🇬🇧 Language switched to English!"
    )
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Initial sync of demo project if language was set to uzbek but seed had russian
  useEffect(() => {
    const demoData = LOCALIZED_DEMO_PROJECT[currentLang]
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'demo-launch-lab') {
          const isUzNeedsUpdate = currentLang === 'uz' && !proj.answers.problem?.includes('Asosiy muammo')
          const isRuNeedsUpdate = currentLang === 'ru' && !proj.answers.problem?.includes('70% начинающих')
          const isEnNeedsUpdate = currentLang === 'en' && !proj.answers.problem?.includes('Core Problem')
          if (isUzNeedsUpdate || isRuNeedsUpdate || isEnNeedsUpdate) {
            return {
              ...proj,
              name: demoData.name,
              description: demoData.description,
              teamMembers: demoData.teamMembers,
              juryPhrase: demoData.juryPhrase,
              answers: { ...demoData.answers }
            }
          }
        }
        return proj
      })
    )
  }, [currentLang])

  const t = UI_TRANSLATIONS[currentLang]
  const activeModules = MODULES_TRANSLATIONS[currentLang]
  const [currentProjectId, setCurrentProjectId] = useState<string>(() => loadCurrentProjectId())
  const [activeRole, setActiveRole] = useState<'participant' | 'curator'>(() => loadUserRole())
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0)
  const [activeView, setActiveView] = useState<
    'modules' | 'onepager' | 'curator' | 'gallery' | 'reels' | 'pitch-cockpit' | 'unicorn-studio' | 'arcade' | 'mulk-detective' | 'online-mind'
  >(() => (window.location.hash === '#online-mind' ? 'online-mind' : window.location.hash === '#arcade' ? 'arcade' : window.location.hash === '#modules' ? 'modules' : window.location.hash === '#jury-check' ? 'pitch-cockpit' : window.location.hash === '#reels' ? 'reels' : window.location.hash === '#mulk-detective' ? 'mulk-detective' : 'online-mind'))

  // Synchronize hash with activeView for deep linking and history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const validViews = ['modules', 'onepager', 'curator', 'gallery', 'reels', 'pitch-cockpit', 'unicorn-studio', 'arcade', 'mulk-detective', 'online-mind']
      if (validViews.includes(hash)) {
        setActiveView(hash as any)
      } else if (hash === 'jury-check') {
        setActiveView('pitch-cockpit')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (window.location.hash !== `#${activeView}`) {
      window.history.replaceState(null, '', `#${activeView}`)
    }
  }, [activeView])

  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [doubleTapHeart, setDoubleTapHeart] = useState(false)

  const handleToggleLike = (projId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projId) {
          const wasLiked = !!p.likedByMe
          const newLikes = wasLiked ? Math.max(0, (p.likes || 1) - 1) : (p.likes || 0) + 1
          return {
            ...p,
            likes: newLikes,
            likedByMe: !wasLiked
          }
        }
        return p
      })
    )
    triggerConfetti()
    setDoubleTapHeart(true)
    setTimeout(() => setDoubleTapHeart(false), 900)
  }

  const handleAddReaction = (projId: string, reactionKey: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projId) {
          const curr = p.reactions || { fire: 0, unicorn: 0, rocket: 0, idea: 0 }
          return {
            ...p,
            reactions: {
              ...curr,
              [reactionKey]: (curr[reactionKey] || 0) + 1
            }
          }
        }
        return p
      })
    )
    triggerConfetti()
  }

  const [reelSlideIndex, setReelSlideIndex] = useState(0)
  const [reelMuted, setReelMuted] = useState(false)
  const [reelCommentsModal, setReelCommentsModal] = useState(false)
  const [newReelComment, setNewReelComment] = useState('')
  const [reelSaved, setReelSaved] = useState<Record<string, boolean>>({})
  const [reelFollowed, setReelFollowed] = useState<Record<string, boolean>>({ 'demo-launch-lab': true })
  const [reelExpandedCaption, setReelExpandedCaption] = useState(false)

  const playBeep = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.12) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx || reelMuted) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio not permitted without interaction
    }
  }, [reelMuted])

  const handleNextReel = useCallback(() => {
    playBeep(520, 'sine', 0.08)
    setActiveReelIndex((prev) => (prev + 1) % (projects.length || 1))
    setReelSlideIndex(0)
    setReelExpandedCaption(false)
  }, [projects.length, playBeep, setReelSlideIndex, setReelExpandedCaption])

  const handlePrevReel = useCallback(() => {
    playBeep(380, 'sine', 0.08)
    setActiveReelIndex((prev) => (prev - 1 + (projects.length || 1)) % (projects.length || 1))
    setReelSlideIndex(0)
    setReelExpandedCaption(false)
  }, [projects.length, playBeep, setReelSlideIndex, setReelExpandedCaption])

  const handleToggleFollow = (projId: string) => {
    playBeep(640, 'sine', 0.1)
    setReelFollowed((prev) => ({
      ...prev,
      [projId]: !prev[projId]
    }))
    triggerConfetti()
  }

  const handleToggleSave = (projId: string) => {
    playBeep(580, 'sine', 0.1)
    setReelSaved((prev) => ({
      ...prev,
      [projId]: !prev[projId]
    }))
  }

  const handleAddReelComment = (projId: string) => {
    if (!newReelComment.trim()) return
    const commentObj: CuratorComment = {
      id: 'rc-' + Date.now(),
      author:
        currentLang === 'uz'
          ? "Startap Ishqibozi (Toshkent)"
          : currentLang === 'en'
          ? 'Startup Enthusiast'
          : 'Энтузиаст стартапов',
      role: 'Angel Investor / Community',
      text: newReelComment.trim(),
      date: new Date().toISOString()
    }
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projId) {
          const comms = p.curatorComments || {}
          return {
            ...p,
            curatorComments: {
              ...comms,
              solution: [...(comms.solution || []), commentObj]
            }
          }
        }
        return p
      })
    )
    setNewReelComment('')
    triggerConfetti()
    playBeep(750, 'triangle', 0.15)
  }

  const [saveToast, setSaveToast] = useState<string | null>(null)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [copiedDossier, setCopiedDossier] = useState(false)
  const [copiedShareLink, setCopiedShareLink] = useState(false)

  // Modals
  const [newProjectModal, setNewProjectModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectTeam, setNewProjectTeam] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')

  const [editProfileModal, setEditProfileModal] = useState(false)
  const [editName, setEditName] = useState('')
  const [editTeam, setEditTeam] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editStatus, setEditStatus] = useState<ProjectData['status']>('draft')

  const [curatorNote, setCuratorNote] = useState('')
  const [curatorAuthor, setCuratorAuthor] = useState('Александр Ким (Трекер Launch Lab)')

  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showFormulaModal, setShowFormulaModal] = useState(false)

  // Gallery search & filter
  const [gallerySearch, setGallerySearch] = useState('')
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'approved' | 'in_review' | 'draft'>('all')

  // Live Pitch Timer (180 seconds = 3 minutes)
  const [pitchTimerActive, setPitchTimerActive] = useState(false)
  const [pitchSecondsLeft, setPitchSecondsLeft] = useState(180)

  // Jury quick check
  const [juryReloadAudit] = useState<JuryReloadAudit | null>(() => loadJuryReloadAudit())
  const [juryInputTemp, setJuryInputTemp] = useState('')

  // Staff Only Access Control
  const [staffLockEnabled, setStaffLockEnabled] = useState<boolean>(
    () => localStorage.getItem('launch_lab_staff_lock') === 'true'
  )
  const [staffPasscodeModal, setStaffPasscodeModal] = useState(false)
  const [staffPasscodeInput, setStaffPasscodeInput] = useState('')
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem('launch_lab_staff_auth') === 'true'
  )

  // Current active project
  const currentProject =
    projects.find((p) => p.id === currentProjectId) ||
    projects[0] ||
    SEED_PROJECTS[0]

  // Current active module
  const currentModule = activeModules[activeModuleIndex] || activeModules[0]
  const currentAnswer = currentProject.answers[currentModule.id] || ''
  const currentFieldAnswers = currentProject.fieldAnswers?.[currentModule.id] || {}
  const currentComments = currentProject.curatorComments?.[currentModule.id] || []
  const currentVersions = currentProject.versionHistory?.[currentModule.id] || []

  // Sync projects to localStorage
  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  // Sync currentProjectId to localStorage
  useEffect(() => {
    saveCurrentProjectId(currentProjectId)
  }, [currentProjectId])

  // Sync user role
  useEffect(() => {
    saveUserRole(activeRole)
  }, [activeRole])

  // Pitch timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (pitchTimerActive && pitchSecondsLeft > 0) {
      interval = setInterval(() => {
        setPitchSecondsLeft((prev) => {
          if (prev <= 1) {
            setPitchTimerActive(false)
            triggerConfetti()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [pitchTimerActive, pitchSecondsLeft])

  // Keyboard navigation for Reels (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space)
  useEffect(() => {
    if (activeView !== 'reels') return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        handleNextReel()
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        handlePrevReel()
      } else if (e.key === 'ArrowRight' || e.key === 'l') {
        e.preventDefault()
        setReelSlideIndex((prev) => (prev + 1) % 5)
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        e.preventDefault()
        setReelSlideIndex((prev) => (prev - 1 + 5) % 5)
      } else if (e.key === ' ') {
        e.preventDefault()
        const p = projects[activeReelIndex]
        if (p) handleToggleLike(p.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeView, activeReelIndex, projects, handleNextReel, handlePrevReel])

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Handle free-form answer changes
  const handleAnswerChange = (text: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          return {
            ...proj,
            answers: {
              ...proj.answers,
              [currentModule.id]: text
            }
          }
        }
        return proj
      })
    )
  }

  // Handle individual structured field changes
  const handleFieldChange = (fieldId: string, value: string) => {
    const updatedFields = {
      ...currentFieldAnswers,
      [fieldId]: value
    }

    // Auto-assemble synthesized bullet points for the module
    const synthesized = currentModule.fields
      .map((f) => {
        const val = updatedFields[f.id]?.trim()
        return val ? `• ${f.label}: ${val}` : ''
      })
      .filter(Boolean)
      .join('\n')

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          const modFields = {
            ...(proj.fieldAnswers || {}),
            [currentModule.id]: updatedFields
          }
          return {
            ...proj,
            fieldAnswers: modFields,
            answers: {
              ...proj.answers,
              [currentModule.id]: synthesized || proj.answers[currentModule.id] || ''
            }
          }
        }
        return proj
      })
    )
  }

  // Update Jury Phrase
  const handleJuryPhraseChange = (text: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          return {
            ...proj,
            juryPhrase: text
          }
        }
        return proj
      })
    )
  }

  // Save answer with version snapshot & badge calculation
  const handleSaveAnswer = () => {
    const newVersion: VersionEntry = {
      id: 'v-' + Date.now(),
      timestamp: new Date().toISOString(),
      author: activeRole === 'curator' ? 'Куратор Launch Lab' : 'Команда стартапа',
      text: currentAnswer
    }

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          const modVersions = proj.versionHistory?.[currentModule.id] || []
          const updatedVersions = {
            ...(proj.versionHistory || {}),
            [currentModule.id]: [newVersion, ...modVersions].slice(0, 10)
          }

          // Calculate unlocked badges
          const answeredModuleIds = activeModules.filter((m) => {
            const ans = m.id === currentModule.id ? currentAnswer : proj.answers[m.id]
            return ans && ans.trim().length > 0
          }).map((m) => m.badge)

          return {
            ...proj,
            versionHistory: updatedVersions,
            badges: answeredModuleIds
          }
        }
        return proj
      })
    )

    triggerConfetti()
    setSaveToast(`Ответ модуля «${currentModule.title}» надёжно сохранён в LocalStorage!`)
    setTimeout(() => setSaveToast(null), 3000)
  }

  // Revert to a specific version
  const handleRestoreVersion = (version: VersionEntry) => {
    handleAnswerChange(version.text)
    setShowVersionHistory(false)
    setSaveToast(`Восстановлена версия от ${new Date(version.timestamp).toLocaleTimeString()}`)
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Add curator feedback
  const handleAddCuratorComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!curatorNote.trim()) return

    const newComment: CuratorComment = {
      id: 'c-' + Date.now(),
      author: curatorAuthor,
      role: 'Эксперт инкубатора Launch Lab 21',
      text: curatorNote.trim(),
      date: new Date().toISOString()
    }

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          const modComments = proj.curatorComments?.[currentModule.id] || []
          return {
            ...proj,
            curatorComments: {
              ...(proj.curatorComments || {}),
              [currentModule.id]: [...modComments, newComment]
            }
          }
        }
        return proj
      })
    )

    setCuratorNote('')
    triggerConfetti()
    setSaveToast('Комментарий эксперта добавлен!')
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Clear answer (for empty section testing)
  const handleClearAnswer = () => {
    handleAnswerChange('')
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          const updatedFields = { ...(proj.fieldAnswers || {}) }
          delete updatedFields[currentModule.id]
          return {
            ...proj,
            fieldAnswers: updatedFields
          }
        }
        return proj
      })
    )
    setSaveToast(`Модуль «${currentModule.title}» очищен для проверки пустого состояния`)
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Insert standard template
  const handleApplyTemplate = () => {
    handleAnswerChange(currentModule.template)
    setSaveToast('Шаблон ответа инкубатора применён!')
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Create new project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProjectName.trim()) return

    const newProj: ProjectData = {
      id: 'proj-' + Date.now(),
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Новый проект в инкубаторе Launch Lab 21',
      teamMembers: newProjectTeam.trim() || 'Команда основателей',
      createdAt: new Date().toISOString(),
      juryPhrase: 'Launch Lab 21 — Проверено жюри',
      status: 'draft',
      badges: [],
      answers: {},
      fieldAnswers: {},
      curatorComments: {},
      versionHistory: {}
    }

    const updated = [newProj, ...projects]
    setProjects(updated)
    setCurrentProjectId(newProj.id)
    setNewProjectName('')
    setNewProjectTeam('')
    setNewProjectDesc('')
    setNewProjectModal(false)
    setActiveModuleIndex(0)
    triggerConfetti()
    setSaveToast(`Проект «${newProj.name}» успешно создан!`)
    setTimeout(() => setSaveToast(null), 3000)
  }

  // Open Edit Profile modal
  const openEditProfile = () => {
    setEditName(currentProject.name)
    setEditTeam(currentProject.teamMembers)
    setEditDesc(currentProject.description)
    setEditStatus(currentProject.status || 'draft')
    setEditProfileModal(true)
  }

  // Save Project Profile edits
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === currentProject.id) {
          return {
            ...proj,
            name: editName.trim() || proj.name,
            teamMembers: editTeam.trim() || proj.teamMembers,
            description: editDesc.trim() || proj.description,
            status: editStatus
          }
        }
        return proj
      })
    )
    setEditProfileModal(false)
    setSaveToast('Профиль проекта обновлён!')
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Reset to default sample
  const handleResetToDemo = () => {
    if (confirm('Сбросить данные и перезагрузить демонстрационные проекты Launch Lab 21?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  // Copy One-Pager Markdown
  const handleCopyOnePager = () => {
    const text = `# ${currentProject.name} — Launch Lab 21 One-Pager
**Статус:** ${currentProject.status.toUpperCase()} | **Дата:** ${new Date(currentProject.createdAt).toLocaleDateString()}
**Команда:** ${currentProject.teamMembers}
**Контрольная фраза жюри:** ${currentProject.juryPhrase || 'Launch Lab 21'}
**Краткое описание:** ${currentProject.description}

---

${INCUBATOR_MODULES.map(
  (m) => `## ${m.title}
${currentProject.answers[m.id]?.trim() || '[Модуль пока не заполнен]'}
`
).join('\n')}
`
    navigator.clipboard.writeText(text)
    setCopiedSummary(true)
    triggerConfetti()
    setTimeout(() => setCopiedSummary(false), 2500)
  }

  // Copy shareable public link
  const handleCopyShareLink = () => {
    const liveUrl = 'https://turnir-launch-lab.vercel.app#project=' + currentProject.id
    navigator.clipboard.writeText(liveUrl)
    setCopiedShareLink(true)
    triggerConfetti()
    setSaveToast('Публичная ссылка на проект скопирована!')
    setTimeout(() => {
      setCopiedShareLink(false)
      setSaveToast(null)
    }, 2500)
  }

  // Staff Access Mode Handlers
  const handleSwitchToCurator = () => {
    if (staffLockEnabled && !isStaffAuthenticated) {
      setStaffPasscodeModal(true)
    } else {
      setActiveRole('curator')
      setActiveView('curator')
    }
  }

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault()
    if (staffPasscodeInput.trim() === '2121') {
      setIsStaffAuthenticated(true)
      sessionStorage.setItem('launch_lab_staff_auth', 'true')
      setStaffPasscodeModal(false)
      setStaffPasscodeInput('')
      setActiveRole('curator')
      setActiveView('curator')
      triggerConfetti()
      setSaveToast('Доступ куратора подтверждён!')
      setTimeout(() => setSaveToast(null), 2500)
    } else {
      alert('Неверный код доступа сотрудника! (Подсказка: 2121)')
    }
  }

  const handleToggleStaffLock = (enable: boolean) => {
    setStaffLockEnabled(enable)
    localStorage.setItem('launch_lab_staff_lock', enable ? 'true' : 'false')
    triggerConfetti()
    setSaveToast(
      enable
        ? 'Включён закрытый режим: Доступ куратора защищён PIN-кодом (2121)'
        : 'Включён открытый доступ: Любой пользователь по ссылке может редактировать и проверять'
    )
    setTimeout(() => setSaveToast(null), 3000)
  }


  // Copy Prompt Engineering Dossier
  const handleCopyDossier = () => {
    const dossier = `# 🤖 Досье промпт-инжиниринга: School 21 • Launch Lab 21
Команда: ${currentProject.name} (${currentProject.teamMembers})
Формула промптов: [KIM SIZ] + [NIMA KERAK] + [KIM UCHUN] + [FORMAT]

1. KIM SIZ: Senior Frontend Architect & AI Product Specialist.
2. NIMA KERAK: Создать автономное SPA на React 19 + Tailwind для инкубатора Launch Lab 21 с пошаговыми модулями, LocalStorage-персистентностью, режимом куратора и One-Pager.
3. KIM UCHUN: Для участников School 21 и судейской коллегии турнира вайбкодинга.
4. FORMAT: Полноценный рабочий код без поломок, с 100% сохранением данных при F5 и аккуратной заглушкой пустых модулей.
`
    navigator.clipboard.writeText(dossier)
    setCopiedDossier(true)
    triggerConfetti()
    setTimeout(() => setCopiedDossier(false), 2500)
  }

  // Live Jury Test: Run F5 check
  const handleVerifyF5 = () => {
    const audit: JuryReloadAudit = {
      checkedAt: new Date().toLocaleTimeString(),
      projectName: currentProject.name,
      completed: true
    }
    localStorage.setItem(JURY_RELOAD_AUDIT_KEY, JSON.stringify(audit))
    window.location.hash = 'jury-check'
    window.location.reload()
  }

  // Live Jury Test: Inject jury phrase
  const handleInjectJuryPhrase = () => {
    if (!juryInputTemp.trim()) return
    handleJuryPhraseChange(juryInputTemp.trim())
    setActiveView('onepager')
    triggerConfetti()
    setSaveToast('Фраза жюри внедрена в One-Pager!')
    setTimeout(() => setSaveToast(null), 2500)
  }

  // Count answered modules
  const answeredCount = activeModules.filter(
    (m) => currentProject.answers[m.id] && currentProject.answers[m.id].trim().length > 0
  ).length
  const progressPercent = Math.round((answeredCount / activeModules.length) * 100)
  const pitchElapsedSeconds = 180 - pitchSecondsLeft
  const activePitchPhase = pitchElapsedSeconds < 40 ? 0 : pitchElapsedSeconds < 135 ? 1 : 2

  // Filtered gallery
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      p.description.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      p.teamMembers.toLowerCase().includes(gallerySearch.toLowerCase())

    if (!matchesSearch) return false
    if (galleryFilter === 'all') return true
    return p.status === galleryFilter
  })

  // Card spotlight dynamic illumination (matching TahlilAI MVP)
  useEffect(() => {
    const handleCardMouse = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.apple-card') as HTMLElement | null
      if (target) {
        const rect = target.getBoundingClientRect()
        target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }
    }
    window.addEventListener('mousemove', handleCardMouse)
    return () => window.removeEventListener('mousemove', handleCardMouse)
  }, [])

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* TahlilAI Apple-Grade Monochromatic Interactive Background Engine */}
      <InteractiveBackground />

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white text-black px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-black" />
          <span className="text-sm font-semibold">{saveToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. APPLE.COM GLOBAL NAVIGATION RIBBON (Iconic 44px Translucent Header)    */}
      {/* ========================================================================= */}
      <header className="apple-global-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[44px] flex items-center justify-between gap-4">
          {/* Apple Logo & Brand */}
          <div
            className="flex items-center gap-2.5 text-[#d2d2d7] hover:text-white transition-colors cursor-pointer apple-press"
            onClick={() => setActiveView('online-mind')}
            title="Apple • Launch Lab 21"
          >
            <AppleLogo />
            <span className="text-[12px] font-medium tracking-tight text-white hidden md:inline">Launch Lab 21</span>
          </div>

          {/* Apple Nav Center Links */}
          <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                playBeep(640, 'sine', 0.08)
                setActiveView('online-mind')
              }}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'online-mind' ? 'apple-nav-link-active font-semibold text-white' : ''}`}
            >
              <Brain className="w-3.5 h-3.5 text-white inline" />
              <span className="font-semibold text-white">Online Mind</span>
            </button>
            <button
              onClick={() => {
                playBeep(520, 'sine', 0.08)
                setActiveView('unicorn-studio')
              }}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'unicorn-studio' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-white inline" />
              <span>Unicorn AI</span>
            </button>
            <button
              onClick={() => {
                playBeep(580, 'sine', 0.08)
                setActiveView('arcade')
              }}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'arcade' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-white inline" />
              <span>Arcade</span>
            </button>
            <button
              onClick={() => {
                playBeep(640, 'sine', 0.08)
                setActiveView('mulk-detective')
              }}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'mulk-detective' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Building2 className="w-3.5 h-3.5 text-white inline" />
              <span>Mulk Detektivi</span>
            </button>
            <button
              onClick={() => setActiveView('modules')}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'modules' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Layers className="w-3.5 h-3.5 text-white inline" />
              <span>{t.navModules}</span>
            </button>
            <button
              onClick={() => setActiveView('onepager')}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'onepager' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <FileText className="w-3.5 h-3.5 text-white inline" />
              <span>{t.navOnePager}</span>
            </button>
            <button
              onClick={() => setActiveView('pitch-cockpit')}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'pitch-cockpit' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-white inline" />
              <span>Pitch Cockpit</span>
            </button>
            <button
              onClick={() => setActiveView('curator')}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'curator' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Users className="w-3.5 h-3.5 text-white inline" />
              <span>{t.navCurator}</span>
            </button>
            <button
              onClick={() => {
                playBeep(480, 'sine', 0.08)
                setActiveView('reels')
              }}
              className={`apple-nav-link flex items-center gap-1.5 ${activeView === 'reels' ? 'apple-nav-link-active font-semibold' : ''}`}
            >
              <Flame className="w-3.5 h-3.5 text-white inline" />
              <span>Reels</span>
            </button>
          </nav>

          {/* Right: Apple Segmented Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="apple-segmented">
              <button
                onClick={() => handleLanguageChange('uz')}
                className={`px-2 py-0.5 apple-segmented-item ${currentLang === 'uz' ? 'apple-segmented-active' : 'text-[#86868b] hover:text-white'}`}
                title="O'zbek tili"
              >
                UZ
              </button>
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`px-2 py-0.5 apple-segmented-item ${currentLang === 'ru' ? 'apple-segmented-active' : 'text-[#86868b] hover:text-white'}`}
                title="Русский язык"
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-0.5 apple-segmented-item ${currentLang === 'en' ? 'apple-segmented-active' : 'text-[#86868b] hover:text-white'}`}
                title="English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. APPLE PRODUCT SUBNAVIGATION (52px Sticky Ribbon)                        */}
      {/* ========================================================================= */}
      <div className="apple-subnav sticky top-[44px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between gap-4">
          {/* Left: Product Name & Campus Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
                Launch Lab 21
              </span>
              <span className="text-[11px] font-normal text-[#86868b] hidden sm:inline">
                School 21 Startup Accelerator
              </span>
            </div>
            <span
              className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase border ${
                currentProject.status === 'approved'
                  ? 'bg-white/15 text-white border-white/30'
                  : currentProject.status === 'in_review'
                  ? 'bg-white/10 text-zinc-300 border-white/20'
                  : 'bg-white/5 text-zinc-400 border-white/10'
              }`}
            >
              {currentProject.status}
            </span>
            <button
              onClick={openEditProfile}
              className="text-[#86868b] hover:text-white transition p-1"
              title="Edit Project Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center / Right: Project Switcher & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Apple Progress Capsule */}
            <div className="hidden xl:flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs">
              <span className="text-[#86868b]">Progress:</span>
              <span className="font-semibold text-white font-mono">{progressPercent}%</span>
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Project Picker Capsule */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
              <FolderOpen className="w-3.5 h-3.5 text-[#86868b]" />
              <select
                value={currentProjectId}
                onChange={(e) => {
                  setCurrentProjectId(e.target.value)
                  setActiveModuleIndex(0)
                }}
                className="bg-transparent text-xs text-white font-medium focus:outline-none max-w-[120px] sm:max-w-[170px] truncate cursor-pointer"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#161617] text-white">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pitch Timer Pill */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-mono font-medium text-white">{formatTime(pitchSecondsLeft)}</span>
              <button
                onClick={() => setPitchTimerActive(!pitchTimerActive)}
                className="p-0.5 rounded-full text-zinc-400 hover:text-white transition apple-press"
                title={pitchTimerActive ? 'Пауза' : 'Старт'}
              >
                {pitchTimerActive ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
              </button>
            </div>

            {/* Role Switcher Pill */}
            <div className="apple-segmented hidden lg:inline-flex">
              <button
                onClick={() => setActiveRole('participant')}
                className={`px-2.5 py-1 apple-segmented-item ${activeRole === 'participant' ? 'apple-segmented-active' : 'text-[#86868b] hover:text-white'}`}
              >
                {t.roleParticipant}
              </button>
              <button
                onClick={handleSwitchToCurator}
                className={`px-2.5 py-1 apple-segmented-item ${activeRole === 'curator' ? 'apple-segmented-active' : 'text-[#86868b] hover:text-white'}`}
              >
                {t.roleCurator}
              </button>
            </div>

            {/* Apple Primary White Button: New Project */}
            <button
              onClick={() => setNewProjectModal(true)}
              className="apple-btn-primary flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.newProject}</span>
            </button>

            {/* Reset Factory Demo */}
            <button
              onClick={handleResetToDemo}
              className="apple-btn-secondary p-1.5"
              title="Reset to Demo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
            </button>

            {/* Confetti Sparkle */}
            <button
              onClick={triggerConfetti}
              className="apple-btn-secondary p-1.5"
              title="Салют"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. APPLE.COM KEYNOTE HERO SECTION (MONOCHROME NOIR)                        */}
      {/* ========================================================================= */}
      {activeView === 'modules' && (
        <section className="text-center pt-10 pb-6 px-4 max-w-4xl mx-auto">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Launch Lab 21 • Built for School 21
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7] mb-3">
            Vibe Coding. Reimagined.
          </h2>
          <p className="text-base sm:text-xl text-[#86868b] font-normal max-w-2xl mx-auto mb-6">
            An Apple-grade autonomous startup accelerator. Complete 5 structured modules, practice live pitch verification, and export an investment-ready one-pager.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('online-mind')}
              className="apple-btn-primary text-sm px-6 py-2 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-black" />
              <span>Jasur's Online Mind</span>
            </button>
            <button
              onClick={() => setActiveModuleIndex(0)}
              className="apple-btn-secondary text-sm px-6 py-2"
            >
              Start Module 1
            </button>
            <button
              onClick={() => setActiveView('onepager')}
              className="apple-link text-sm font-medium"
            >
              View One-Pager <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView('pitch-cockpit')}
              className="apple-link text-sm font-medium"
            >
              Jury Pitch Simulator <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ========================================================================= */}
        {/* VIEW 1: MODULES WORKFLOW */}
        {/* ========================================================================= */}
        {activeView === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Modules List */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Программа инкубатора
                </h3>
                <span className="text-xs text-zinc-500 font-mono">5 этапов</span>
              </div>

              {activeModules.map((mod, idx) => {
                const isAnswered = !!currentProject.answers[mod.id]?.trim()
                const isActive = activeModuleIndex === idx

                return (
                  <div
                    key={mod.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-white/15 border-white/40 shadow-xl shadow-white/5'
                        : isAnswered
                        ? 'bg-white/[0.04] border-white/20 hover:border-white/35'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition ${
                          isActive
                            ? 'bg-white text-black shadow-md'
                            : isAnswered
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-white/5 text-zinc-400 border border-white/10'
                        }`}
                      >
                        {isAnswered ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div>
                        <h4 className={`text-xs sm:text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                          {mod.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 font-medium border border-white/10">
                            {mod.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isAnswered ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/25">
                          Заполнено
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                          Пустой
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Prompt Formula Helper Card */}
              <div className="p-4 rounded-2xl apple-card space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <h4 className="text-xs font-bold text-white">Формула промпта School 21</h4>
                  </div>
                  <span className="text-[10px] text-zinc-200 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Постройте идеальный промпт по 4-компонентной формуле турнира: [Kim siz] + [Nima kerak] + [Kim uchun] + [Format].
                </p>
                <button
                  onClick={() => setShowFormulaModal(true)}
                  className="apple-btn-secondary w-full text-xs font-semibold"
                >
                  <span>Открыть формулу для модуля</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Jump to One-Pager */}
              <div className="p-4 rounded-2xl apple-card space-y-2">
                <h4 className="text-xs font-bold text-white">Автосборка One-Pager</h4>
                <p className="text-xs text-zinc-400">
                  Все сохранённые данные мгновенно собираются в единый инвестиционный документ.
                </p>
                <button
                  onClick={() => setActiveView('onepager')}
                  className="apple-btn-primary w-full text-xs font-bold"
                >
                  <FileText className="w-3.5 h-3.5" /> Открыть One-Pager проекта
                </button>
              </div>
            </div>

            {/* Right Column: Active Module Form */}
            <div className="lg:col-span-8 apple-card p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Модуль {activeModuleIndex + 1} из 5
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-white border border-white/15">
                        Бейдж: {currentModule.badge}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{currentModule.title}</h2>
                    <p className="text-xs text-[#86868b] mt-1">{currentModule.description}</p>
                  </div>

                  {/* Top Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {currentVersions.length > 0 && (
                      <button
                        onClick={() => setShowVersionHistory(!showVersionHistory)}
                        className="apple-btn-secondary text-xs"
                      >
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>Версии ({currentVersions.length})</span>
                      </button>
                    )}

                    <button
                      onClick={handleApplyTemplate}
                      className="apple-btn-secondary text-xs"
                      title="Заполнить образцовым шаблоном инкубатора"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>Вставить шаблон</span>
                    </button>
                  </div>
                </div>

                {/* Task Box */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-5">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/10 text-white mt-0.5 flex-shrink-0">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Задание экспертов инкубатора Launch Lab 21:
                      </h4>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{currentModule.task}</p>
                    </div>
                  </div>
                </div>

                {/* STRUCTURED SUB-FIELDS (Page 6 of Tournament Specs) */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-white" />
                      <span>Шаблон ответа: Поля модуля</span>
                    </h4>
                    <span className="text-[11px] text-[#86868b]">Автоматически объединяются в итоговый ответ</span>
                  </div>

                  <div className="space-y-3">
                    {currentModule.fields.map((field, fIdx) => (
                      <div key={field.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                        <label className="block text-xs font-semibold text-zinc-300">
                          {fIdx + 1}. {field.label}
                        </label>
                        <input
                          type="text"
                          value={currentFieldAnswers[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-white transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Combined Answer Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Итоговый текст ответа (One-Pager Content):</span>
                    </label>
                    <span className="text-[11px] text-[#86868b] font-mono">
                      {currentAnswer.length} символов • LocalStorage F5 safe
                    </span>
                  </div>

                  <textarea
                    rows={6}
                    value={currentAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder={currentModule.placeholder}
                    className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-white transition resize-none font-sans"
                  />
                </div>

                {/* Curator Comments Display */}
                {currentComments.length > 0 && (
                  <div className="mt-5 p-4 rounded-2xl bg-white/[0.04] border border-white/15 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span>Обратная связь трекеров Launch Lab 21:</span>
                    </div>
                    {currentComments.map((comment) => (
                      <div key={comment.id} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
                        <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                          <span className="font-semibold text-white">{comment.author} ({comment.role})</span>
                          <span>{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-zinc-200 leading-relaxed">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Curator Mode: Add feedback */}
                {activeRole === 'curator' && (
                  <form onSubmit={handleAddCuratorComment} className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-white" /> Оставить комментарий куратора
                      </span>
                      <input
                        type="text"
                        value={curatorAuthor}
                        onChange={(e) => setCuratorAuthor(e.target.value)}
                        className="bg-black/60 border border-white/15 rounded-lg px-2 py-0.5 text-[10px] text-zinc-300"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={curatorNote}
                      onChange={(e) => setCuratorNote(e.target.value)}
                      placeholder="Напишите обратную связь для команды по этому модулю..."
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="apple-btn-primary text-xs font-bold"
                      >
                        <Save className="w-3.5 h-3.5" /> Отправить комментарий
                      </button>
                    </div>
                  </form>
                )}

                {/* Version History Drawer */}
                {showVersionHistory && (
                  <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-white/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white" /> История изменений модуля
                      </span>
                      <button
                        onClick={() => setShowVersionHistory(false)}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Закрыть
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {currentVersions.map((ver) => (
                        <div
                          key={ver.id}
                          className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="text-[11px] text-zinc-400">
                              {new Date(ver.timestamp).toLocaleTimeString()} • {ver.author}
                            </div>
                            <div className="text-zinc-300 truncate max-w-sm">{ver.text.slice(0, 60)}...</div>
                          </div>
                          <button
                            onClick={() => handleRestoreVersion(ver)}
                            className="apple-btn-secondary text-xs py-1 px-3"
                          >
                            Восстановить
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAnswer}
                    className="apple-btn-primary text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Сохранить ответ</span>
                  </button>

                  <button
                    onClick={handleClearAnswer}
                    className="apple-btn-secondary text-xs font-medium"
                    title="Очистить ответ для проверки пустого модуля"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Очистить</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {activeModuleIndex < activeModules.length - 1 ? (
                    <button
                      onClick={() => setActiveModuleIndex((prev) => prev + 1)}
                      className="apple-btn-secondary text-xs font-semibold"
                    >
                      <span>Следующий модуль</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveView('onepager')}
                      className="apple-btn-primary text-xs font-bold"
                    >
                      <span>Собрать One-Pager!</span>
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: AUTOMATIC ONE-PAGER VIEW */}
        {/* ========================================================================= */}
        {activeView === 'onepager' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Action Bar */}
            <div className="no-print flex flex-wrap items-center justify-between gap-3 apple-card p-4 rounded-2xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-white" />
                  Инвестиционный One-Pager: «{currentProject.name}»
                </h3>
                <p className="text-xs text-[#86868b] mt-0.5">
                  Собран автоматически из ответов модулей акселератора Launch Lab 21
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyOnePager}
                  className="apple-btn-secondary text-xs"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? (currentLang === 'uz' ? 'Nusxalandi!' : currentLang === 'en' ? 'Copied!' : 'Скопировано!') : t.copyText}</span>
                </button>

                <button
                  onClick={handleCopyShareLink}
                  className="apple-btn-secondary text-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShareLink ? (currentLang === 'uz' ? 'Havola nusxalandi!' : currentLang === 'en' ? 'Link copied!' : 'Ссылка скопирована!') : t.share}</span>
                </button>

                <a
                  href="/presentation.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="apple-btn-secondary text-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.slidesPdf}</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="apple-btn-primary text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.exportPdf}</span>
                </button>
              </div>
            </div>

            {/* THE ONE-PAGER DOCUMENT */}
            <div className="print-container apple-card rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              {/* Header */}
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold mb-3">
                    <Rocket className="w-3.5 h-3.5" /> {t.onePagerTitle}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentProject.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                    {currentProject.description}
                  </p>
                  <div className="mt-2 text-xs text-zinc-300">
                    <span className="text-[#86868b] font-medium">Команда:</span> {currentProject.teamMembers}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-[#86868b] font-mono">
                    Дата создания: {new Date(currentProject.createdAt).toLocaleDateString()}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Статус: {currentProject.status.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Badges Earned Shelf */}
              <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-3 rounded-2xl border border-white/10">
                <span className="text-xs text-[#86868b] font-medium flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-white" /> Достижения команды:
                </span>
                {activeModules.map((m) => {
                  const isDone = !!currentProject.answers[m.id]?.trim()
                  return (
                    <span
                      key={m.id}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isDone
                          ? 'bg-white/15 text-white border-white/30'
                          : 'bg-white/5 text-zinc-500 border-white/10 opacity-60'
                      }`}
                    >
                      {m.badge} {isDone ? '✓' : ''}
                    </span>
                  )
                })}
              </div>

              {/* CRITICAL JURY CHECK CARD: Secret phrase */}
              <div className="print-card p-4 rounded-2xl apple-card space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    Контрольная фраза проверки жюри (Live Verification):
                  </div>
                  <span className="text-[10px] text-[#86868b] no-print">Мгновенная синхронизация без перезагрузки</span>
                </div>
                <input
                  type="text"
                  value={currentProject.juryPhrase || ''}
                  onChange={(e) => handleJuryPhraseChange(e.target.value)}
                  placeholder="Впишите сюда секретную контрольную фразу жюри..."
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white font-medium focus:outline-none focus:border-white transition"
                />
              </div>

              {/* ASSEMBLED MODULES 2-COLUMN GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeModules.map((mod, idx) => {
                  const answer = currentProject.answers[mod.id]?.trim()
                  const isFilled = !!answer

                  return (
                    <div
                      key={mod.id}
                      className={`print-card p-5 rounded-2xl border transition-all ${
                        isFilled
                          ? 'bg-white/[0.04] border-white/15 hover:border-white/30'
                          : 'bg-white/[0.02] border-dashed border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                        </div>

                        {isFilled ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/25">
                            Собрано
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                            Пустой модуль
                          </span>
                        )}
                      </div>

                      {/* Content or Graceful Empty State */}
                      {isFilled ? (
                        <div className="text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                          {answer}
                        </div>
                      ) : (
                        /* CRITICAL EMPTY SECTION HANDLING (Page 6 of specs) */
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center py-6">
                          <AlertCircle className="w-6 h-6 text-zinc-400 mb-2" />
                          <p className="text-xs font-bold text-zinc-200">Модуль пока не заполнен</p>
                          <p className="text-[11px] text-[#86868b] mt-1 max-w-xs">
                            Заполните задание в программе инкубатора, и тезисы появятся здесь. Вёрстка остаётся стабильной.
                          </p>
                          <button
                            onClick={() => {
                              setActiveModuleIndex(idx)
                              setActiveView('modules')
                            }}
                            className="no-print mt-3 apple-btn-secondary text-xs"
                          >
                            Заполнить модуль
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Document Footer */}
              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#86868b]">
                <span>Платформа инкубатора «Launch Lab 21» • School 21</span>
                <span>Данные сохранены локально в браузере (F5 safe)</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CURATOR DASHBOARD */}
        {/* ========================================================================= */}
        {activeView === 'curator' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Curator Header */}
            <div className="apple-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" /> РЕЖИМ КУРАТОРА И ТРЕКЕРА
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Когорта стартапов Launch Lab 21</h2>
                <p className="text-xs text-[#86868b] mt-1">
                  Мониторинг прогресса команд, ревью ответов по модулям и выдача экспертных рекомендаций
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center min-w-[90px]">
                  <div className="text-xl font-black text-white">{projects.length}</div>
                  <div className="text-[10px] text-[#86868b] uppercase tracking-wider">Всего команд</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center min-w-[90px]">
                  <div className="text-xl font-black text-white">
                    {projects.filter((p) => p.status === 'approved').length}
                  </div>
                  <div className="text-[10px] text-[#86868b] uppercase tracking-wider">К питчу готовы</div>
                </div>
              </div>
            </div>

            {/* Access Policy Control Banner */}
            <div className="apple-card p-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-2xl border ${
                    staffLockEnabled
                      ? 'bg-white/15 text-white border-white/30'
                      : 'bg-white/10 text-zinc-300 border-white/20'
                  }`}
                >
                  {staffLockEnabled ? <Lock className="w-5 h-5 text-white" /> : <Unlock className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Политика доступа платформы:
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        staffLockEnabled
                          ? 'bg-white/15 text-white border-white/30'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                    >
                      {staffLockEnabled
                        ? '🔒 Только сотрудники (Staff Only: PIN 2121)'
                        : '🔓 Открытый доступ для всех (Public Edit)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#86868b] mt-0.5">
                    {staffLockEnabled
                      ? 'Режим куратора и аудит проектов защищены PIN-кодом (2121).'
                      : 'Сейчас любой пользователь по ссылке может просматривать, тестировать и редактировать проекты.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {staffLockEnabled ? (
                  <button
                    onClick={() => handleToggleStaffLock(false)}
                    className="apple-btn-secondary text-xs"
                  >
                    <Unlock className="w-3.5 h-3.5 text-white" />
                    <span>Сделать открытым для всех</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleStaffLock(true)}
                    className="apple-btn-secondary text-xs"
                  >
                    <Lock className="w-3.5 h-3.5 text-white" />
                    <span>Защитить для сотрудников (Staff Only)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj) => {
                const answered = activeModules.filter(
                  (m) => proj.answers[m.id] && proj.answers[m.id].trim().length > 0
                ).length
                const pct = Math.round((answered / activeModules.length) * 100)
                const isCurrent = proj.id === currentProjectId

                return (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-3xl apple-card transition-all flex flex-col justify-between space-y-4 ${
                      isCurrent
                        ? 'border-white/40 ring-1 ring-white/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                            proj.status === 'approved'
                              ? 'bg-white/15 text-white border-white/25'
                              : proj.status === 'in_review'
                              ? 'bg-white/10 text-zinc-300 border-white/20'
                              : 'bg-white/5 text-zinc-400 border-white/10'
                          }`}
                        >
                          {proj.status}
                        </span>

                        <span className="text-xs font-mono font-bold text-white">
                          {answered}/5 ({pct}%)
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white tracking-tight">{proj.name}</h3>
                      <p className="text-xs text-[#86868b] mt-1 line-clamp-2">{proj.description}</p>
                      <div className="text-[11px] text-[#86868b] mt-2">
                        <span className="font-semibold text-zinc-300">Команда:</span> {proj.teamMembers}
                      </div>

                      {/* Mini Progress */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-3">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Curator Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setCurrentProjectId(proj.id)
                          setActiveView('modules')
                        }}
                        className="apple-btn-secondary text-xs"
                      >
                        Ревью ответов
                      </button>

                      <button
                        onClick={() => {
                          setCurrentProjectId(proj.id)
                          setActiveView('onepager')
                        }}
                        className="apple-btn-secondary text-xs"
                      >
                        One-Pager
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: DEMO DAY GALLERY */}
        {/* ========================================================================= */}
        {activeView === 'gallery' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Gallery Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 apple-card p-4 rounded-3xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Поиск проекта по названию, описанию или участникам..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
                />
              </div>

              <div className="apple-segmented">
                {(['all', 'approved', 'in_review', 'draft'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setGalleryFilter(filter)}
                    className={`px-3 py-1 apple-segmented-item capitalize ${
                      galleryFilter === filter
                        ? 'apple-segmented-active'
                        : 'text-[#86868b] hover:text-white'
                    }`}
                  >
                    {filter === 'all'
                      ? 'Все'
                      : filter === 'approved'
                      ? 'Одобрены'
                      : filter === 'in_review'
                      ? 'На ревью'
                      : 'Черновик'}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => {
                const answered = activeModules.filter(
                  (m) => proj.answers[m.id] && proj.answers[m.id].trim().length > 0
                ).length
                const pct = Math.round((answered / activeModules.length) * 100)

                return (
                  <div
                    key={proj.id}
                    className="apple-card p-6 rounded-3xl transition-all flex flex-col justify-between space-y-4 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                          Demo Day 2026
                        </span>
                        <span className="text-xs font-mono font-bold text-white">{pct}%</span>
                      </div>

                      <h3 className="text-lg font-black text-white tracking-tight">{proj.name}</h3>
                      <p className="text-xs text-[#86868b] mt-1 line-clamp-3">{proj.description}</p>
                      <div className="mt-3 text-xs text-zinc-400">
                        <span className="text-[#86868b]">Основатели:</span> {proj.teamMembers}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {activeModules.map((m) => {
                          const hasBadge = !!proj.answers[m.id]?.trim()
                          return hasBadge ? (
                            <span
                              key={m.id}
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20"
                            >
                              {m.badge}
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>

                    {/* Likes & Reactions Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleToggleLike(proj.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition ${
                          proj.likedByMe
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${proj.likedByMe ? 'fill-black text-black' : ''}`} />
                        <span>{(proj.likes || 0).toLocaleString()}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAddReaction(proj.id, 'fire')}
                          className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[11px] border border-white/10 transition"
                          title="Огонь"
                        >
                          🔥 {proj.reactions?.fire || 0}
                        </button>
                        <button
                          onClick={() => handleAddReaction(proj.id, 'rocket')}
                          className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[11px] border border-white/10 transition"
                          title="Ракета"
                        >
                          🚀 {proj.reactions?.rocket || 0}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const idx = projects.findIndex((p) => p.id === proj.id)
                          if (idx >= 0) setActiveReelIndex(idx)
                          setActiveView('reels')
                        }}
                        className="apple-btn-secondary text-xs"
                      >
                        <Flame className="w-3.5 h-3.5" /> Reels
                      </button>

                      <button
                        onClick={() => {
                          setCurrentProjectId(proj.id)
                          setActiveView('onepager')
                        }}
                        className="apple-btn-secondary text-xs"
                      >
                        <FileText className="w-3.5 h-3.5" /> One-Pager
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: STARTUP INSTAGRAM REELS FEED */}
        {/* ========================================================================= */}
        {activeView === 'reels' && (() => {
          const currentReel = projects[activeReelIndex] || projects[0] || SEED_PROJECTS[0]
          const totalReels = projects.length
          const isLiked = !!currentReel.likedByMe
          const likeCount = currentReel.likes || 0
          const reactions = currentReel.reactions || { fire: 0, unicorn: 0, rocket: 0, idea: 0 }
          const isFollowed = !!reelFollowed[currentReel.id]
          const isSaved = !!reelSaved[currentReel.id]
          const totalComments = Object.values(currentReel.curatorComments || {}).flat().length

          // 5 slides per startup representing the 5 key pitch stages
          const pitchSlides = [
            {
              step: '01 / ELEVATOR PITCH',
              tag: 'STARTUP IDENTITY',
              badge: 'School 21 • 2026',
              headline: currentReel.name,
              body: currentReel.description || 'Инновационный IT-стартап экосистемы School 21 Launch Lab.',
              metricTitle: 'Readiness / Holat',
              metricValue: '100% Validated',
              accent: 'from-white/20 to-white/5'
            },
            {
              step: '02 / PAIN POINT',
              tag: 'MUAMMO & OG\'RIQ',
              badge: 'Bozor Valitatsiyasi',
              headline: currentLang === 'uz' ? '70% Startaplar halokatga uchraydi' : currentLang === 'en' ? '70% Startups Fail Early' : '70% Стартапов буксуют на старте',
              body: currentReel.answers.problem || currentReel.fieldAnswers?.problem?.problem_core || 'Google Docs va xaotik so\'rovlar tufayli investorlar oldida vaqt yo\'qotiladi.',
              metricTitle: 'Lost Time / Yo\'qotish',
              metricValue: '14 Days ➔ 45 Min',
              accent: 'from-white/20 to-white/5'
            },
            {
              step: '03 / AI SOLUTION',
              tag: 'YECHIM & UVP',
              badge: 'AI-Native Engine',
              headline: currentLang === 'uz' ? 'Avtomatlashtirilgan Akselerator' : currentLang === 'en' ? 'Autonomous Client Incubator' : 'Автономный клиентский инкубатор',
              body: currentReel.answers.solution || currentReel.fieldAnswers?.solution?.solution_core || 'Zero-backend arxitektura: 5 modul, F5 stress-test va avtomatik One-Pager.',
              metricTitle: 'Time to Pitch / Tezlik',
              metricValue: '30x Faster',
              accent: 'from-white/20 to-white/5'
            },
            {
              step: '04 / MARKET TRACTION',
              tag: 'BOZOR HAJMI (TAM)',
              badge: '$1.2B EdTech Market',
              headline: currentLang === 'uz' ? 'Katta va O\'sayotgan Bozor' : currentLang === 'en' ? 'Massive Target Market' : 'Огромный растущий рынок',
              body: currentReel.answers.market || currentReel.fieldAnswers?.market?.market_size || '$1.2B Markaziy Osiyo va MDH universitet akseleratorlari bozori.',
              metricTitle: 'TAM / SOM Bozor',
              metricValue: '$1.2B ➔ $42M SOM',
              accent: 'from-white/20 to-white/5'
            },
            {
              step: '05 / UNIT ECONOMICS & TEAM',
              tag: 'BIZNES MODEL & ASK',
              badge: 'LTV / CAC ≥ 3',
              headline: currentLang === 'uz' ? 'Kuchli Jamoa va Barqaror Daromad' : currentLang === 'en' ? 'Sustainable B2B SaaS Model' : 'B2B SaaS модель & Команда',
              body: currentReel.answers.business_model || currentReel.fieldAnswers?.business_model?.bm_revenue_stream || 'B2B SaaS $490/oy + 2% Success fee. LTV $1,200, CAC $80.',
              metricTitle: 'LTV / CAC Koeffitsienti',
              metricValue: '15.0x Strong',
              accent: 'from-white/20 to-white/5'
            }
          ]

          const activeSlide = pitchSlides[reelSlideIndex] || pitchSlides[0]

          return (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Top Banner with Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 apple-card p-4 sm:p-5 rounded-3xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold mb-1.5 shadow-sm">
                    <Flame className="w-3.5 h-3.5 text-white" />
                    <span>STARTUP REELS • PITCH FEED</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>{currentLang === 'uz' ? 'Startaplar Jonli Reels Lentasi' : currentLang === 'en' ? 'Live Startup Reels Pitch Feed' : 'Живая Reels-лента стартапов'}</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {currentLang === 'uz'
                      ? 'Instagram formatidagi 30-soniyalik pitchlar: 2 marta bosing ❤️ like bering, reaksiyalar qoldiring va sharh yozing!'
                      : currentLang === 'en'
                      ? 'Instagram-style 30-sec pitches: Double-tap to like ❤️, add reactions and leave feedback!'
                      : 'Формат Instagram Reels: Дважды кликните для ❤️ лайка, ставьте реакции и оставляйте отзывы!'}
                  </p>
                </div>

                {/* Keyboard hints & Navigation quick bar */}
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-1.5 text-[11px] text-zinc-400 bg-zinc-950/80 px-3 py-1.5 rounded-2xl border border-zinc-800">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">↑/↓</span>
                    <span>{currentLang === 'uz' ? 'Startap' : 'Стартап'}</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">←/→</span>
                    <span>{currentLang === 'uz' ? 'Slayd' : 'Слайд'}</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">Space</span>
                    <span>❤️</span>
                  </div>

                  <button
                    onClick={() => {
                      setReelMuted(!reelMuted)
                      playBeep(440, 'sine', 0.1)
                    }}
                    className={`p-2.5 rounded-2xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                      !reelMuted
                        ? 'bg-white/15 text-white border-white/25'
                        : 'bg-white/5 text-zinc-500 border-white/10'
                    }`}
                    title={reelMuted ? 'Ovozni yoqish' : 'Ovozni o\'chirish'}
                  >
                    {!reelMuted ? <Volume2 className="w-4 h-4 text-white animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                    <span className="hidden sm:inline">{!reelMuted ? 'Audio On' : 'Muted'}</span>
                  </button>
                </div>
              </div>

              {/* Main Reels Canvas + Desktop Side Nav */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 relative">
                {/* Desktop Prev Button */}
                <div className="hidden lg:flex flex-col items-center gap-2">
                  <button
                    onClick={handlePrevReel}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 hover:border-white/40 shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
                    title="Oldingi startap (Up)"
                  >
                    <ChevronUp className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-[11px] font-bold text-[#86868b]">
                    {activeReelIndex + 1} / {totalReels}
                  </span>
                  <button
                    onClick={handleNextReel}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 hover:border-white/40 shadow-xl transition-all transform hover:translate-y-1 active:translate-y-0"
                    title="Keyingi startap (Down)"
                  >
                    <ChevronDown className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Smartphone Reel Frame */}
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] min-h-[640px] max-h-[820px] rounded-[38px] border-2 border-white/20 bg-black/80 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between select-none">
                  {/* Instagram Story Progress Indicators (5 bars) */}
                  <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
                    {pitchSlides.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playBeep(440 + idx * 50, 'sine', 0.08)
                          setReelSlideIndex(idx)
                        }}
                        className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm transition-all relative group"
                        title={s.tag}
                      >
                        <div
                          className={`h-full transition-all duration-300 ${
                            idx === reelSlideIndex
                              ? 'bg-white shadow-[0_0_8px_white]'
                              : idx < reelSlideIndex
                              ? 'bg-white/80'
                              : 'bg-transparent'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Top Bar inside Reel */}
                  <div className="relative z-20 pt-7 px-4 pb-2 flex items-center justify-between text-white text-xs font-semibold bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="font-black tracking-wider text-white text-sm">
                        REELS
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/25 text-[10px] font-bold">
                        LIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Animated Audio Equalizer */}
                      {!reelMuted && (
                        <div className="flex items-center gap-0.5 h-3.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md">
                          <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" />
                          <span className="w-0.5 h-2 bg-white/80 rounded-full animate-pulse delay-75" />
                          <span className="w-0.5 h-3.5 bg-white rounded-full animate-pulse delay-150" />
                          <span className="w-0.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-100" />
                        </div>
                      )}
                      <span className="text-[11px] font-mono text-zinc-300 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                        {activeReelIndex + 1}/{totalReels}
                      </span>
                    </div>
                  </div>

                  {/* Main Reel Visual Card (Double Tap Area) */}
                  <div
                    onDoubleClick={() => handleToggleLike(currentReel.id)}
                    className="relative flex-1 flex flex-col justify-center items-center px-6 text-center cursor-pointer overflow-hidden"
                  >
                    {/* Ambient Glow Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${activeSlide.accent} opacity-25 mix-blend-screen transition-all duration-700`}
                    />
                    <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none" />

                    {/* Big Pop-up Heart on Double Tap */}
                    {doubleTapHeart && (
                      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-200">
                        <div className="p-8 rounded-full bg-black/60 backdrop-blur-xl border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.4)] animate-bounce">
                          <Heart className="w-24 h-24 text-white fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                        </div>
                      </div>
                    )}

                    {/* Slide Chevrons for Left/Right Swiping on Reel */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        playBeep(350, 'sine', 0.08)
                        setReelSlideIndex((prev) => (prev - 1 + 5) % 5)
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition backdrop-blur-sm"
                      title="Oldingi slayd"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        playBeep(450, 'sine', 0.08)
                        setReelSlideIndex((prev) => (prev + 1) % 5)
                      }}
                      className="absolute right-14 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition backdrop-blur-sm"
                      title="Keyingi slayd"
                    >
                      ›
                    </button>

                    {/* Content Card */}
                    <div className="relative z-10 w-full max-w-xs space-y-3.5 transform transition-all duration-300">
                      {/* Monogram / Avatar with Glow */}
                      <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-[3px] shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                        <div className="w-full h-full bg-zinc-950 rounded-[21px] flex items-center justify-center text-white font-black text-xl">
                          {currentReel.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>

                      {/* Stage Tag */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-wider text-white">
                        <span>{activeSlide.tag}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                        {activeSlide.headline}
                      </h3>

                      {/* Body Pitch Text */}
                      <p className="text-xs sm:text-sm text-zinc-200 line-clamp-4 leading-relaxed bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-lg text-left">
                        {activeSlide.body}
                      </p>

                      {/* Highlight Metric Pill */}
                      <div className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                        <span className="text-[10px] text-zinc-300 font-semibold uppercase tracking-wider">
                          {activeSlide.metricTitle}
                        </span>
                        <span className="text-xs font-black text-white font-mono">
                          {activeSlide.metricValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram Reels Right-Hand Action Rail */}
                  <div className="absolute right-2 bottom-16 z-30 flex flex-col items-center gap-3">
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLike(currentReel.id)}
                      className="group flex flex-col items-center gap-1 text-white focus:outline-none transition-transform active:scale-125"
                      title="Yoqdi / Like"
                    >
                      <div
                        className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                          isLiked
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                            : 'bg-black/50 text-white border-white/10 hover:bg-black/80'
                        }`}
                      >
                        <Heart
                          className={`w-6 h-6 transition-all ${
                            isLiked ? 'fill-black scale-110' : 'stroke-[2.2]'
                          }`}
                        />
                      </div>
                      <span className="text-[11px] font-bold drop-shadow-md">
                        {likeCount > 0 ? likeCount.toLocaleString() : 'Like'}
                      </span>
                    </button>

                    {/* Reaction Buttons Stack */}
                    <div className="flex flex-col items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-3xl border border-white/10 shadow-lg">
                      <button
                        onClick={() => handleAddReaction(currentReel.id, 'fire')}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition transform hover:scale-125 active:scale-95"
                        title="Olov / Огонь"
                      >
                        🔥
                      </button>
                      <span className="text-[9px] font-mono font-bold text-zinc-300">
                        {reactions.fire || 0}
                      </span>

                      <button
                        onClick={() => handleAddReaction(currentReel.id, 'unicorn')}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition transform hover:scale-125 active:scale-95"
                        title="Unicorn / Единорог"
                      >
                        🦄
                      </button>
                      <span className="text-[9px] font-mono font-bold text-zinc-300">
                        {reactions.unicorn || 0}
                      </span>

                      <button
                        onClick={() => handleAddReaction(currentReel.id, 'rocket')}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition transform hover:scale-125 active:scale-95"
                        title="Raketa / Ракета"
                      >
                        🚀
                      </button>
                      <span className="text-[9px] font-mono font-bold text-zinc-300">
                        {reactions.rocket || 0}
                      </span>
                    </div>

                    {/* Comments Button */}
                    <button
                      onClick={() => setReelCommentsModal(true)}
                      className="group flex flex-col items-center gap-1 text-white focus:outline-none transition-transform active:scale-110"
                      title="Sharhlar / Комментарии"
                    >
                      <div className="p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/80 backdrop-blur-md">
                        <MessageCircle className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] font-bold drop-shadow-md">
                        {totalComments > 0 ? totalComments : 'Sharh'}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}${window.location.pathname}#reels`
                        )
                        setCopiedShareLink(true)
                        playBeep(680, 'sine', 0.1)
                        setTimeout(() => setCopiedShareLink(false), 2000)
                      }}
                      className="group flex flex-col items-center gap-1 text-white focus:outline-none transition-transform active:scale-110"
                      title="Ulashish / Поделиться"
                    >
                      <div className="p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/80 backdrop-blur-md">
                        <Send className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-semibold drop-shadow-md">
                        {copiedShareLink ? '✓ Nusxa' : 'Ulash'}
                      </span>
                    </button>

                    {/* Save / Bookmark Button */}
                    <button
                      onClick={() => handleToggleSave(currentReel.id)}
                      className="group flex flex-col items-center gap-1 text-white focus:outline-none transition-transform active:scale-110"
                      title="Saqlab qo'yish / Сохранить"
                    >
                      <div
                        className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                          isSaved
                            ? 'bg-white text-black border-white'
                            : 'bg-black/50 text-white border-white/10 hover:bg-black/80'
                        }`}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${isSaved ? 'fill-black' : 'stroke-[2.2]'}`}
                        />
                      </div>
                    </button>

                    {/* Jump to One-Pager */}
                    <button
                      onClick={() => {
                        setCurrentProjectId(currentReel.id)
                        setActiveView('onepager')
                      }}
                      className="group flex flex-col items-center gap-1 text-white focus:outline-none transition-transform active:scale-110"
                      title="One-Pager Hujjatini ochish"
                    >
                      <div className="p-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-white">Doc</span>
                    </button>
                  </div>

                  {/* Bottom Instagram Reel Info Bar */}
                  <div className="relative z-20 p-4 pt-6 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2 pr-16">
                    {/* User / Team Header */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 p-[2px] flex-shrink-0">
                        <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {currentReel.name.substring(0, 1)}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 flex items-center gap-2">
                        <span className="text-sm font-black text-white truncate drop-shadow-md">
                          {currentReel.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-white fill-white/20 flex-shrink-0" />

                        <button
                          onClick={() => handleToggleFollow(currentReel.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition flex-shrink-0 ${
                            isFollowed
                              ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                              : 'bg-white text-black font-bold shadow-sm'
                          }`}
                        >
                          {isFollowed ? '✓ Kuzatildi' : '+ Kuzatish'}
                        </button>
                      </div>
                    </div>

                    {/* Team Members Tag */}
                    <p className="text-[11px] text-[#86868b] font-medium truncate">
                      {currentReel.teamMembers}
                    </p>

                    {/* Description / Caption */}
                    <div className="text-xs text-zinc-300 leading-snug">
                      <p className={reelExpandedCaption ? '' : 'line-clamp-2'}>
                        {currentReel.description}
                      </p>
                      {currentReel.description && currentReel.description.length > 80 && (
                        <button
                          onClick={() => setReelExpandedCaption(!reelExpandedCaption)}
                          className="text-[10px] font-bold text-zinc-400 hover:text-white mt-0.5 block"
                        >
                          {reelExpandedCaption ? 'yashirish ‹' : 'ko\'proq... ›'}
                        </button>
                      )}
                    </div>

                    {/* Music Audio Ticker */}
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-[#86868b] font-mono overflow-hidden">
                      <Music className="w-3 h-3 text-white animate-spin" />
                      <div className="truncate text-zinc-300">
                        <span>🎵 School 21 • Launch Lab 21 Pitch Audio (Original) • {currentReel.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Prev / Next Buttons beneath phone */}
                <div className="flex lg:hidden items-center justify-center gap-4 w-full pt-2">
                  <button
                    onClick={handlePrevReel}
                    className="apple-btn-secondary flex-1 py-3"
                  >
                    <ChevronUp className="w-4 h-4 text-white" />
                    <span>{currentLang === 'uz' ? 'Oldingi startap' : 'Предыдущий'}</span>
                  </button>

                  <button
                    onClick={handleNextReel}
                    className="apple-btn-primary flex-1 py-3"
                  >
                    <span>{currentLang === 'uz' ? 'Keyingi startap' : 'Следующий'}</span>
                    <ChevronDown className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>

              {/* REELS COMMENTS BOTTOM SHEET MODAL */}
              {reelCommentsModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4">
                  <div className="apple-card rounded-t-[32px] sm:rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-white" />
                        <h3 className="text-base font-bold text-white">
                          {currentLang === 'uz' ? 'Startapga Sharhlar & Fikrlar' : 'Комментарии стартапа'}
                        </h3>
                      </div>
                      <button
                        onClick={() => setReelCommentsModal(false)}
                        className="apple-btn-secondary p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Comments List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[350px]">
                      {Object.entries(currentReel.curatorComments || {}).flatMap(([, comms]) =>
                        comms.map((c) => (
                          <div
                            key={c.id}
                            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{c.author}</span>
                              <span className="text-[10px] text-[#86868b] font-mono">
                                {new Date(c.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/15 text-[9px] font-semibold">
                              {c.role}
                            </span>
                            <p className="text-xs text-zinc-200 leading-relaxed">{c.text}</p>
                          </div>
                        ))
                      )}

                      {totalComments === 0 && (
                        <div className="text-center py-8 text-[#86868b] text-xs">
                          {currentLang === 'uz'
                            ? 'Hali hech kim sharh qoldirmadi. Birinchi bo\'lib fikr bildiring!'
                            : 'Комментариев пока нет. Будьте первыми!'}
                        </div>
                      )}
                    </div>

                    {/* Quick Reactions Bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      {['🔥 Ajoyib g\'oya!', '🚀 1-o\'rin loyiq!', '🦄 Investitsiya tayyor!', '💡 Bozor kutilgandek!'].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setNewReelComment(emoji)}
                          className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] whitespace-nowrap transition border border-white/10"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>

                    {/* Add Comment Input */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleAddReelComment(currentReel.id)
                      }}
                      className="flex items-center gap-2 pt-2 border-t border-white/10"
                    >
                      <input
                        type="text"
                        value={newReelComment}
                        onChange={(e) => setNewReelComment(e.target.value)}
                        placeholder={
                          currentLang === 'uz'
                            ? 'Fikringizni yozing...'
                            : currentLang === 'en'
                            ? 'Leave a comment...'
                            : 'Напишите комментарий...'
                        }
                        className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-white transition"
                      />
                      <button
                        type="submit"
                        className="apple-btn-primary text-xs font-bold"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Yuborish</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* ========================================================================= */}
        {/* VIEW 5: PITCH & JURY LIVE VERIFICATION COCKPIT */}
        {/* ========================================================================= */}
        {activeView === 'pitch-cockpit' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Top Stage Cockpit */}
            <div className="apple-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold mb-2">
                    <Rocket className="w-3.5 h-3.5 text-white" /> КОКПИТ ЗАЩИТЫ • РЕГЛАМЕНТ 3 МИНУТЫ
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Сценарий победы: Живой питч и проверки жюри
                  </h2>
                  <p className="text-xs text-[#86868b] mt-1">
                    Строгое соответствие разделам 8 и 9 официального регламента School 21
                  </p>
                </div>

                {/* 3-Minute Stage Timer */}
                <div className="flex items-center gap-3 bg-black/60 border border-white/15 p-3 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {formatTime(pitchSecondsLeft)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setPitchTimerActive(!pitchTimerActive)}
                      className="apple-btn-primary text-xs py-1 px-3"
                    >
                      {pitchTimerActive ? <Pause className="w-3 h-3 text-black" /> : <Play className="w-3 h-3 text-black" />}
                      <span>{pitchTimerActive ? 'Стоп' : 'Старт'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setPitchTimerActive(false)
                        setPitchSecondsLeft(180)
                      }}
                      className="apple-btn-secondary text-[10px] py-0.5 px-2.5"
                    >
                      Сбросить (180s)
                    </button>
                  </div>
                </div>
              </div>

              {/* Stage-ready Uzbek run of show */}
              <section className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-4 sm:p-5">
                <div className="relative flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] text-white uppercase">Sahna navigatori</p>
                    <h3 className="text-sm font-bold text-white mt-0.5">3 daqiqalik g‘alaba yo‘li</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-mono text-zinc-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    HOZIR: {['MUAMMO & G‘OYA', 'JONLI WEB-DEMO', 'NEGA BIZ?'][activePitchPhase]}
                  </div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      time: '00:00 — 00:40',
                      title: "1. MUAMMO & G‘OYA",
                      points: ['2 haftalik tartibsizlik', '70% rad javobi xavfi', '45 daqiqalik avto-yechim']
                    },
                    {
                      time: '00:40 — 02:15',
                      title: '2. JONLI WEB-SAYT DEMO',
                      points: ['Modul → Saqlash', 'One-Pagerda darhol ko‘rish', '⚡ F5 • fraza • bo‘sh modul']
                    },
                    {
                      time: '02:15 — 03:00',
                      title: '3. NEGA BIZ?',
                      points: ['Zero-backend', 'F5 kafolati', 'Jonli havola va PDF']
                    }
                  ].map((phase, idx) => {
                    const isActive = activePitchPhase === idx
                    const isComplete = pitchElapsedSeconds >= [40, 135, 180][idx]
                    return (
                      <article
                        key={phase.title}
                        className={`relative rounded-xl border p-4 transition-all duration-300 bg-white/[0.04] border-white/10 ${isActive ? 'ring-1 ring-white/40 shadow-lg shadow-white/5 -translate-y-0.5 border-white/30' : ''} ${isComplete ? 'opacity-70' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold tracking-wide text-zinc-400">{phase.time}</span>
                          {isComplete ? <Check className="w-3.5 h-3.5 text-white" /> : isActive ? <span className="text-[9px] font-black tracking-wider text-white">ON AIR</span> : null}
                        </div>
                        <h4 className="mt-2 text-xs font-black tracking-wide text-white">{phase.title}</h4>
                        <ul className="mt-2.5 space-y-1.5">
                          {phase.points.map((point) => (
                            <li key={point} className="flex gap-2 text-[11px] leading-snug text-zinc-300">
                              <span className="mt-1 h-1 w-1 flex-none rounded-full bg-white opacity-80" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </article>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* ⚡ MANDATORY LIVE JURY TESTS (Page 5 of Tournament Specs) */}
            <div className="apple-card rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    ⚡ Обязательные живые проверки жюри (Быстрый запуск)
                  </h3>
                  <p className="text-xs text-[#86868b]">
                    Все 3 пункта живого регламента турнира протестированы и готовы к показу
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Check 1: F5 Reload */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                      <Check className="w-4 h-4" /> 1. Проверка перезагрузки (F5)
                    </div>
                    <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
                      Регламент: «Перезагрузите страницу — введённый ответ должен остаться на месте».
                    </p>
                    {juryReloadAudit?.completed && (
                      <div className="mt-2 text-[10px] text-white font-mono bg-white/10 border border-white/20 px-2 py-1.5 rounded-xl leading-relaxed">
                        ✓ Реальная перезагрузка пройдена в {juryReloadAudit.checkedAt}<br />
                        <span className="text-zinc-300">Проект «{juryReloadAudit.projectName}» восстановлен из LocalStorage</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleVerifyF5}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-white" /> Перезагрузить и проверить
                  </button>
                </div>

                {/* Check 2: Secret Jury Phrase */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-white" /> 2. Контрольная фраза жюри
                    </div>
                    <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
                      Регламент: «Впишите в поле модуля фразу, которую назовёт жюри, и откройте one-pager — фраза там».
                    </p>
                    <input
                      type="text"
                      value={juryInputTemp}
                      onChange={(e) => setJuryInputTemp(e.target.value)}
                      placeholder="Фраза от жюри..."
                      className="mt-2 w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <button
                    onClick={handleInjectJuryPhrase}
                    className="apple-btn-primary w-full text-xs font-bold"
                  >
                    <FileText className="w-3.5 h-3.5" /> Внедрить в One-Pager!
                  </button>
                </div>

                {/* Check 3: Empty Section Check */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-white" /> 3. Незаполненный модуль
                    </div>
                    <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
                      Регламент: «Откройте проект с незаполненным модулем — система честно показывает пустой раздел, не ломая вёрстку».
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentProjectId('empty-test-project')
                      setActiveView('onepager')
                      triggerConfetti()
                    }}
                    className="apple-btn-secondary w-full text-xs font-bold"
                  >
                    <span>Открыть чистый проект жюри</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PROMPT ENGINEERING DOSSIER SUBMISSION */}
            <div className="apple-card rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Досье промпт-инжиниринга (Для сдачи в @s21_vibe_bot)
                    </h3>
                    <p className="text-xs text-[#86868b]">
                      Официальный лог разработки по методологии School 21 готов к отправке в Telegram
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyDossier}
                  className="apple-btn-primary text-xs font-bold flex items-center gap-2"
                >
                  {copiedDossier ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                  <span>{copiedDossier ? 'Досье скопировано!' : 'Скопировать досье для бота'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed max-h-48 overflow-y-auto">
                <p className="text-white font-bold mb-1"># Формула School 21:</p>
                <p>• KIM SIZ: Senior Frontend Architect & AI Product Specialist.</p>
                <p>• NIMA KERAK: Автономный клиентский SPA инкубатора с 5 модулями, One-Pager, F5 persistence.</p>
                <p>• KIM UCHUN: Стартапы School 21 Launch Lab 21 и судейская коллегия.</p>
                <p>• FORMAT: Чистый React 19 + Tailwind, модульные поля, режим куратора, zero-backend.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: UNICORN AI STUDIO & CYBER-BAZAAR (ICT WEEK 2026) */}
        {activeView === 'unicorn-studio' && <UnicornStudio />}

        {/* VIEW 8: NEXUS ARCADE & CREATOR HUB */}
        {activeView === 'arcade' && <ArcadeHub />}

        {/* VIEW 9: MULK DETEKTIVI (REAL ESTATE & KADASTR DETECTIVE) */}
        {activeView === 'mulk-detective' && <MulkXHub />}

        {/* VIEW 10: JASUR SHUKUROV — MASTER EXECUTIVE PORTFOLIO & ONLINE MIND */}
        {activeView === 'online-mind' && <OnlineMind currentLang={currentLang} />}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: CREATE PROJECT */}
      {/* ========================================================================= */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="apple-card rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Создать новый проект Launch Lab 21</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Заполните профиль команды для старта акселерационной программы с чистого листа.
              </p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Название стартапа *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Например: EduMatch 21, GreenByte AI..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Состав команды (Участники)
                </label>
                <input
                  type="text"
                  value={newProjectTeam}
                  onChange={(e) => setNewProjectTeam(e.target.value)}
                  placeholder="Например: Алишер (Backend), Малика (Frontend), Сардор (Design)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Краткое описание идеи
                </label>
                <textarea
                  rows={2}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Одно-два предложения о сути продукта..."
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-white transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Создать проект
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PROJECT PROFILE */}
      {/* ========================================================================= */}
      {editProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="apple-card rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Редактировать профиль проекта</h3>
              <p className="text-xs text-[#86868b] mt-1">
                Изменения автоматически отобразятся во всех модулях и в One-Pager.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Название проекта
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Состав команды
                </label>
                <input
                  type="text"
                  value={editTeam}
                  onChange={(e) => setEditTeam(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Краткое описание
                </label>
                <textarea
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-white transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Статус проекта
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as ProjectData['status'])}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-white transition"
                >
                  <option value="draft">Черновик (Draft)</option>
                  <option value="in_review">На ревью куратора (In Review)</option>
                  <option value="ready_for_pitch">Готов к питчу (Ready for Pitch)</option>
                  <option value="approved">Одобрен к инвестициям (Approved)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditProfileModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Сохранить профиль
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PROMPT FORMULA ASSISTANT */}
      {/* ========================================================================= */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="apple-card rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold text-white">Формула промпта School 21</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                {currentModule.title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="font-bold text-white uppercase text-[10px]">
                  {currentModule.promptFormula.roleLabel || '1. KIM SIZ (Роль):'}
                </span>
                <p className="text-zinc-300">{currentModule.promptFormula.role || currentModule.promptFormula.kimSiz}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="font-bold text-white uppercase text-[10px]">
                  {currentModule.promptFormula.taskLabel || '2. NIMA KERAK (Задача):'}
                </span>
                <p className="text-zinc-300">{currentModule.promptFormula.task || currentModule.promptFormula.nimaKerak}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="font-bold text-white uppercase text-[10px]">
                  {currentModule.promptFormula.contextLabel || '3. KIM UCHUN (Контекст):'}
                </span>
                <p className="text-zinc-300">{currentModule.promptFormula.context || currentModule.promptFormula.kimUchun}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="font-bold text-white uppercase text-[10px]">
                  {currentModule.promptFormula.formatLabel || '4. FORMAT (Формат):'}
                </span>
                <p className="text-zinc-300">{currentModule.promptFormula.format}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
                {currentLang === 'uz' ? "AI-Assistent uchun tayyorlangan promp:" : currentLang === 'en' ? "Compiled AI-Assistant Prompt:" : "Собранный промпт для AI-ассистента:"}
              </span>
              <p className="text-xs text-zinc-200 font-mono leading-relaxed">
                «{currentModule.promptFormula.role || currentModule.promptFormula.kimSiz} {currentModule.promptFormula.task || currentModule.promptFormula.nimaKerak} {currentModule.promptFormula.context || currentModule.promptFormula.kimUchun} {currentModule.promptFormula.format}»
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const p = `${currentModule.promptFormula.role || currentModule.promptFormula.kimSiz} ${currentModule.promptFormula.task || currentModule.promptFormula.nimaKerak} ${currentModule.promptFormula.context || currentModule.promptFormula.kimUchun} ${currentModule.promptFormula.format}`
                  navigator.clipboard.writeText(p)
                  setSaveToast(currentLang === 'uz' ? "Promp nusxalandi!" : currentLang === 'en' ? "Prompt copied!" : "Промпт скопирован в буфер обмена!")
                  setTimeout(() => setSaveToast(null), 2500)
                }}
                className="apple-btn-secondary text-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Копировать промпт
              </button>

              <button
                onClick={() => {
                  handleApplyTemplate()
                  setShowFormulaModal(false)
                }}
                className="apple-btn-primary text-xs"
              >
                Применить эталонный ответ
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL: STAFF PASSCODE CHECK */}
      {/* ========================================================================= */}
      {staffPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="apple-card rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Доступ только для сотрудников</h3>
                <p className="text-[11px] text-[#86868b]">Launch Lab 21 Staff & Mentors</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Введите PIN-код куратора
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  value={staffPasscodeInput}
                  onChange={(e) => setStaffPasscodeInput(e.target.value)}
                  placeholder="PIN: 2121"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white text-center tracking-widest font-mono transition"
                />
                <p className="text-[10px] text-zinc-400 mt-1 text-center">
                  Подсказка для жюри и трекеров: код <span className="text-white font-bold">2121</span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStaffPasscodeModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Войти как куратор
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. APPLE.COM SIGNATURE DIRECTORY FOOTER                                    */}
      {/* ========================================================================= */}
      <footer className="no-print bg-black/60 backdrop-blur-2xl text-[#86868b] text-[11px] border-t border-white/10 mt-16 pt-8 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Apple Footnotes */}
          <div className="border-b border-white/10 pb-4 mb-6 space-y-1.5 leading-relaxed text-[#6e6e73]">
            <p>1. Launch Lab 21 is an autonomous, client-side startup acceleration and pitch verification suite engineered with React 19, TypeScript, and Vite 8.</p>
            <p>2. Built for School 21 hackathons, vibe-coding tournaments, and early-stage startup founders in Uzbekistan.</p>
            <p>3. All module progress, pitch records, and curator evaluations are securely saved in client-side LocalStorage with zero server dependencies.</p>
          </div>

          {/* Apple 5-Column Directory Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 pb-8 border-b border-white/10">
            <div>
              <h4 className="text-[12px] font-semibold text-[#f5f5f7] mb-2.5">Incubation & Startups</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveView('modules')} className="hover:text-white transition">5 Core Modules</button></li>
                <li><button onClick={() => setActiveView('onepager')} className="hover:text-white transition">Investment One-Pager</button></li>
                <li><button onClick={() => setActiveView('pitch-cockpit')} className="hover:text-white transition">Jury Pitch Cockpit</button></li>
                <li><button onClick={() => setActiveView('curator')} className="hover:text-white transition">Curator Evaluations</button></li>
                <li><button onClick={() => setActiveView('gallery')} className="hover:text-white transition">Project Gallery</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold text-[#f5f5f7] mb-2.5">AI & Studio Hubs</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveView('unicorn-studio')} className="hover:text-white transition">Unicorn AI Suite</button></li>
                <li><button onClick={() => setActiveView('mulk-detective')} className="hover:text-white transition">Mulk Detektivi</button></li>
                <li><button onClick={() => setActiveView('arcade')} className="hover:text-white transition">Arcade 3D Games</button></li>
                <li><button onClick={() => setActiveView('reels')} className="hover:text-white transition">Startup Reels (Hot)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold text-[#f5f5f7] mb-2.5">School 21 Ecosystem</h4>
              <ul className="space-y-1.5">
                <li><span className="text-[#86868b]">Tashkent Campus</span></li>
                <li><span className="text-[#86868b]">Samarkand Campus</span></li>
                <li><span className="text-[#86868b]">Peer-to-Peer Learning</span></li>
                <li><span className="text-[#86868b]">Vibe Coding Standards</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold text-[#f5f5f7] mb-2.5">Account & Security</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveRole('participant')} className="hover:text-white transition">Participant View</button></li>
                <li><button onClick={handleSwitchToCurator} className="hover:text-white transition">Curator Staff Login</button></li>
                <li><button onClick={handleResetToDemo} className="hover:text-white transition">Reset Factory Demo</button></li>
                <li><span className="text-[#86868b]">PIN Guard: 2121</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold text-[#f5f5f7] mb-2.5">Architecture & Tech</h4>
              <ul className="space-y-1.5">
                <li><span className="text-[#86868b]">React 19 & Tailwind CSS</span></li>
                <li><span className="text-[#86868b]">Vite 8 & TypeScript</span></li>
                <li><span className="text-[#86868b]">Oxlint Zero-Warning</span></li>
                <li><span className="text-[#86868b]">Vercel Edge Global</span></li>
              </ul>
            </div>
          </div>

          {/* Apple Bottom Legal & Region Bar */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[#6e6e73]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Copyright © 2026 Launch Lab 21 / School 21. All rights reserved.</span>
              <span className="hover:text-[#86868b] cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-[#86868b] cursor-pointer">Terms of Use</span>
              <span>•</span>
              <span className="hover:text-[#86868b] cursor-pointer">Legal</span>
              <span>•</span>
              <span className="hover:text-[#86868b] cursor-pointer">Site Map</span>
            </div>
            <div className="text-right">
              <span className="text-[#86868b] font-medium">Uzbekistan</span>
              <span className="text-[#6e6e73] ml-2">(EN / UZ / RU)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
