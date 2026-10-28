import { useEffect, useRef, useState } from 'react'

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ambientMode, setAmbientMode] = useState<number>(0)
  const MODES = ['Full Mesh', 'Constellation', 'Architectural Grid']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationFrameId: number
    let isRunning = true

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
      radius: 170
    }

    class BiomarkerNode {
      x: number = 0
      y: number = 0
      baseVx: number = 0
      baseVy: number = 0
      vx: number = 0
      vy: number = 0
      baseRadius: number = 0
      radius: number = 0
      pulsePhase: number = 0
      pulseSpeed: number = 0
      alpha: number = 0
      isPriority: boolean = false

      constructor(w: number, h: number) {
        this.reset(w, h)
      }

      reset(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.baseVx = (Math.random() - 0.5) * 0.45
        this.baseVy = (Math.random() - 0.5) * 0.45
        this.vx = this.baseVx
        this.vy = this.baseVy
        this.baseRadius = Math.random() * 1.4 + 1.0
        this.radius = this.baseRadius
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.025 + 0.015
        this.alpha = Math.random() * 0.35 + 0.25
        this.isPriority = Math.random() < 0.12
      }

      update(w: number, h: number) {
        this.pulsePhase += this.pulseSpeed
        const breathing = Math.sin(this.pulsePhase)
        this.radius = this.baseRadius + (this.isPriority ? breathing * 0.8 : breathing * 0.3)

        if (mouse.active) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.8
            this.vx += (dx / dist) * force
            this.vy += (dy / dist) * force
          }
        }

        this.vx += (this.baseVx - this.vx) * 0.035
        this.vy += (this.baseVy - this.vy) * 0.035
        this.x += this.vx
        this.y += this.vy

        if (this.x < -20) this.x = w + 20
        else if (this.x > w + 20) this.x = -20
        if (this.y < -20) this.y = h + 20
        else if (this.y > h + 20) this.y = -20
      }

      draw(context: CanvasRenderingContext2D) {
        const currentAlpha = Math.max(0.1, Math.min(0.9, this.alpha + Math.sin(this.pulsePhase) * 0.2))
        context.beginPath()
        context.arc(this.x, this.y, Math.max(0.6, this.radius), 0, Math.PI * 2)
        if (this.isPriority) {
          context.shadowBlur = 10
          context.shadowColor = 'rgba(255, 255, 255, 0.7)'
          context.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 1.2})`
        } else {
          context.shadowBlur = 0
          context.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`
        }
        context.fill()
        context.shadowBlur = 0
      }
    }

    class UltrasoundWave {
      x: number
      y: number
      radius: number = 2
      maxRadius: number
      speed: number = 5.5
      alpha: number = 0.55
      dead: boolean = false

      constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.maxRadius = Math.min(w, h) * 0.35 + 160
      }

      update() {
        this.radius += this.speed
        this.alpha = 0.55 * (1 - this.radius / this.maxRadius)
        if (this.radius >= this.maxRadius || this.alpha <= 0.01) {
          this.dead = true
        }
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.dead) return
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`
        context.lineWidth = 1.0
        context.stroke()

        if (this.radius > 40) {
          context.beginPath()
          context.arc(this.x, this.y, this.radius * 0.65, 0, Math.PI * 2)
          context.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.4})`
          context.lineWidth = 0.6
          context.stroke()
        }
      }
    }

    class ClickSpark {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number = 0.8
      size: number
      dead: boolean = false

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.size = Math.random() * 1.8 + 0.8
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.94
        this.vy *= 0.94
        this.alpha -= 0.025
        if (this.alpha <= 0.01) this.dead = true
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.dead) return
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
        context.fill()
      }
    }

    let particles: BiomarkerNode[] = []
    const waves: UltrasoundWave[] = []
    const sparks: ClickSpark[] = []

    function resize() {
      if (!canvas || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const targetCount = Math.max(30, Math.min(85, Math.floor((width * height) / 19000)))
      if (particles.length === 0) {
        for (let i = 0; i < targetCount; i++) {
          particles.push(new BiomarkerNode(width, height))
        }
      } else if (particles.length < targetCount) {
        while (particles.length < targetCount) {
          particles.push(new BiomarkerNode(width, height))
        }
      } else if (particles.length > targetCount) {
        particles = particles.slice(0, targetCount)
      }
    }

    function drawGrid(context: CanvasRenderingContext2D, currentMode: number) {
      if (currentMode === 1) return
      const gridSize = 64
      context.lineWidth = 0.5

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          let alpha = 0.025
          if (mouse.active) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 260) {
              alpha += (1 - dist / 260) * 0.11
            }
          }
          context.strokeStyle = `rgba(255, 255, 255, ${alpha * 1.5})`
          context.beginPath()
          context.moveTo(x - 2.5, y)
          context.lineTo(x + 2.5, y)
          context.moveTo(x, y - 2.5)
          context.lineTo(x, y + 2.5)
          context.stroke()
        }
      }

      if (currentMode === 2 || (mouse.active && currentMode === 0)) {
        context.strokeStyle = 'rgba(255, 255, 255, 0.015)'
        context.beginPath()
        for (let x = 0; x <= width; x += gridSize) {
          context.moveTo(x, 0)
          context.lineTo(x, height)
        }
        for (let y = 0; y <= height; y += gridSize) {
          context.moveTo(0, y)
          context.lineTo(width, y)
        }
        context.stroke()
      }
    }

    function drawTorch(context: CanvasRenderingContext2D) {
      if (!mouse.active) return
      const grad = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 420)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.045)')
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.015)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = grad
      context.beginPath()
      context.arc(mouse.x, mouse.y, 420, 0, Math.PI * 2)
      context.fill()
    }

    function drawNetwork(context: CanvasRenderingContext2D, currentMode: number) {
      if (currentMode === 2) return
      const maxDist = 125
      const len = particles.length

      context.lineWidth = 0.65
      for (let i = 0; i < len; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist
            const alpha = factor * 0.12 * Math.min(p1.alpha, p2.alpha)
            context.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            context.beginPath()
            context.moveTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.stroke()
          }
        }

        if (mouse.active) {
          const mdx = p1.x - mouse.x
          const mdy = p1.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < mouse.radius) {
            const mFactor = 1 - mdist / mouse.radius
            context.strokeStyle = `rgba(255, 255, 255, ${mFactor * 0.22})`
            context.lineWidth = 0.8
            context.beginPath()
            context.moveTo(p1.x, p1.y)
            context.lineTo(mouse.x, mouse.y)
            context.stroke()
          }
        }
      }

      for (let i = 0; i < len; i++) {
        particles[i].update(width, height)
        particles[i].draw(context)
      }
    }

    function triggerShockwave(x: number, y: number) {
      waves.push(new UltrasoundWave(x, y, width, height))
      for (let i = 0; i < 9; i++) {
        sparks.push(new ClickSpark(x, y))
      }
    }

    function animate() {
      if (!isRunning || !ctx) return
      mouse.x += (mouse.targetX - mouse.x) * 0.12
      mouse.y += (mouse.targetY - mouse.y) * 0.12

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      drawTorch(ctx)
      drawGrid(ctx, ambientMode)

      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].update()
        waves[i].draw(ctx)
        const wave = waves[i]
        for (let j = 0; j < particles.length; j++) {
          const p = particles[j]
          const dx = p.x - wave.x
          const dy = p.y - wave.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (Math.abs(dist - wave.radius) < 22 && dist > 0) {
            p.vx += (dx / dist) * 1.2
            p.vy += (dy / dist) * 1.2
          }
        }
        if (wave.dead) waves.splice(i, 1)
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update()
        sparks[i].draw(ctx)
        if (sparks[i].dead) sparks.splice(i, 1)
      }

      drawNetwork(ctx, ambientMode)
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animationFrameId = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      if (mouse.x < -500) {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.targetX = -2000
      mouse.targetY = -2000
    }

    const handleClick = (e: MouseEvent) => {
      triggerShockwave(e.clientX, e.clientY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0]
        mouse.targetX = touch.clientX
        mouse.targetY = touch.clientY
        mouse.x = touch.clientX
        mouse.y = touch.clientY
        mouse.active = true
        triggerShockwave(touch.clientX, touch.clientY)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX
        mouse.targetY = e.touches[0].clientY
        mouse.active = true
      }
    }

    const handleTouchEnd = () => {
      setTimeout(() => {
        mouse.active = false
      }, 1500)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false
      } else {
        isRunning = true
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [ambientMode])

  return (
    <>
      {/* TahlilAI Fixed Interactive Canvas Container */}
      <div
        id="interactive-bg-container"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="block w-full h-full absolute inset-0" />
      </div>

      {/* Ambient Glass Light Cores (matching TahlilAI MVP) */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-3/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.025] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Mode Switcher Pill in Footer (Minimal Luxury Control) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setAmbientMode((prev) => (prev + 1) % MODES.length)
        }}
        className="fixed bottom-4 left-4 z-40 bg-[#121214]/80 backdrop-blur-xl border border-white/12 rounded-full px-3.5 py-1.5 text-[11px] font-mono text-[#a1a1a6] hover:text-white hover:border-white/40 flex items-center gap-2 cursor-pointer transition shadow-2xl"
        title="Fon rejimini almashtirish (Full, Constellation, Grid)"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <span className="font-semibold text-white">{MODES[ambientMode]}</span>
      </button>
    </>
  )
}
