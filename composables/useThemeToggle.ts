import { ref } from 'vue'

export const isDark = ref(false)

function setMode(el: HTMLElement, dark: boolean) {
  el.classList.toggle('dark', dark)
  el.classList.toggle('light', !dark)
}

function freeze() {
  const s = document.createElement('style')
  s.textContent = '*{transition:none!important}'
  document.head.appendChild(s)
  return () => s.remove()
}

export function initColorMode() {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  const root = document.getElementById('__nuxt')
  if (!root) return
  const stored = localStorage.getItem('color-mode')
  const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  setMode(html, dark)
  setMode(root, dark)
  isDark.value = dark
}

export function toggleThemeWithOverlay(ev: MouseEvent) {
  const root = document.getElementById('__nuxt')
  const html = document.documentElement
  if (!root || !ev.currentTarget) return

  const toDark = !isDark.value
  const btn = ev.currentTarget as HTMLElement
  const { left, top, width, height } = btn.getBoundingClientRect()
  const cx = left + width / 2
  const cy = top + height / 2
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))

  const overlay = root.cloneNode(true) as HTMLElement
  const y = scrollY
  overlay.style.transform = `translateY(-${y}px)`
  ;(overlay.firstElementChild as HTMLElement | null)?.scrollTo(0, y)
  overlay.id = 'nuxt-theme-overlay'
  overlay.style.cssText += `position:fixed;inset:0;pointer-events:none;z-index:9999;
    clip-path:circle(0 at ${cx}px ${cy}px);transition:clip-path .6s ease-out`
  overlay.querySelectorAll('*').forEach(e => ((e as HTMLElement).style.transition = 'none'))
  setMode(overlay, toDark)
  overlay.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  overlay.style.color = 'var(--fg)'

  document.body.appendChild(overlay)
  overlay.getBoundingClientRect()
  requestAnimationFrame(() => (overlay.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`))

  overlay.addEventListener(
    'transitionend',
    () => {
      const unfreeze = freeze()
      setMode(html, toDark)
      setMode(root, toDark)
      localStorage.setItem('color-mode', toDark ? 'dark' : 'light')
      isDark.value = toDark
      unfreeze()
      overlay.remove()
    },
    { once: true }
  )
}
