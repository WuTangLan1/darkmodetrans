// composables\useThemeToggle.ts

import { ref } from 'vue'

export const isDark = ref(false)

export function initColorMode() {
  if (typeof window === 'undefined') return
  const root = document.getElementById('__nuxt')
  if (!root) return
  const stored = localStorage.getItem('color-mode')
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark')
    isDark.value = true
  } else {
    root.classList.remove('dark')
    isDark.value = false
  }
}

export function toggleThemeWithOverlay(ev: MouseEvent) {
  const root = document.getElementById('__nuxt')
  if (!root || !ev.currentTarget) return
  const newDark = !isDark.value
  const btn = ev.currentTarget as HTMLElement
  const rect = btn.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = Math.max(cx, window.innerWidth - cx)
  const dy = Math.max(cy, window.innerHeight - cy)
  const r = Math.hypot(dx, dy)
  const overlay = root.cloneNode(true) as HTMLElement
  const scrollY = window.scrollY
  overlay.style.transform = `translateY(-${scrollY}px)`
  const first = overlay.firstElementChild as HTMLElement | null
  if (first) first.scrollTop = scrollY
  overlay.id = 'nuxt-theme-overlay'
  overlay.style.position = 'fixed'
  overlay.style.inset = '0'
  overlay.style.pointerEvents = 'none'
  overlay.style.zIndex = '9999'
  overlay.style.clipPath = `circle(0px at ${cx}px ${cy}px)`
  overlay.style.transition = 'clip-path 0.6s ease-out'
  overlay.querySelectorAll('*').forEach(el => (el as HTMLElement).style.transition = 'none')
  if (newDark) overlay.classList.add('dark')
  else overlay.classList.remove('dark')
  document.body.appendChild(overlay)
  overlay.getBoundingClientRect()
  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`
  })
  overlay.addEventListener(
    'transitionend',
    () => {
      if (newDark) {
        root.classList.add('dark')
        localStorage.setItem('color-mode', 'dark')
      } else {
        root.classList.remove('dark')
        localStorage.setItem('color-mode', 'light')
      }
      isDark.value = newDark
      overlay.remove()
    },
    { once: true }
  )
}
