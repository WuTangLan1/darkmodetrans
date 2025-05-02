// composables/useThemeToggle.ts

import { ref } from 'vue'

export const isDark = ref(false)

function setMode(el: HTMLElement, dark: boolean) {
  el.classList.toggle('dark', dark)
  el.classList.toggle('light', !dark)
}

function freezeAll() {
  const s = document.createElement('style')
  s.id = '__no-transitions'
  s.textContent = '*{transition:none!important}'
  document.head.appendChild(s)
  return () => document.head.removeChild(s)
}

export function initColorMode() {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  const root = document.getElementById('__nuxt')
  if (!root) return
  const stored = localStorage.getItem('color-mode')
  const dark = stored
    ? stored === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches
  setMode(html, dark)
  setMode(root, dark)
  isDark.value = dark
}

export function toggleThemeWithOverlay(ev: MouseEvent) {
  const root = document.getElementById('__nuxt')
  const html = document.documentElement
  if (!root || !ev.currentTarget) return

  const targetDark = !isDark.value
  const btn = ev.currentTarget as HTMLElement
  const { left, top, width, height } = btn.getBoundingClientRect()
  const cx = left + width / 2
  const cy = top + height / 2
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))

  const overlay = root.cloneNode(true) as HTMLElement
  const y = window.scrollY
  overlay.style.transform = `translateY(-${y}px)`
  ;(overlay.firstElementChild as HTMLElement | null)?.scrollTo(0, y)
  overlay.id = 'nuxt-theme-overlay'
  overlay.style.cssText += `
    position:fixed;
    inset:0;
    pointer-events:none;
    z-index:9999;
    clip-path:circle(0 at ${cx}px ${cy}px);
    transition:clip-path .6s ease-out;
  `
  overlay.querySelectorAll('*').forEach(el => ((el as HTMLElement).style.transition = 'none'))
  setMode(overlay, targetDark)
  overlay.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  overlay.style.color = 'var(--fg)'

  document.body.appendChild(overlay)
  overlay.getBoundingClientRect()
  requestAnimationFrame(() => (overlay.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`))

  overlay.addEventListener(
    'transitionend',
    () => {
      const unfreeze = freezeAll()
      setMode(html, targetDark)
      setMode(root, targetDark)
      localStorage.setItem('color-mode', targetDark ? 'dark' : 'light')
      isDark.value = targetDark
      overlay.remove()
      unfreeze()
    },
    { once: true }
  )
}
