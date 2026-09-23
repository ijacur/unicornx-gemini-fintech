import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import confetti from 'canvas-confetti'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
  })
}
