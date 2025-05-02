// composables/useThemeToggle.ts

import { ref } from 'vue'

export const isDark = ref(false)

function setMode(e: HTMLElement, d: boolean) {
  e.classList.toggle('dark', d)
  e.classList.toggle('light', !d)
}
function freeze() {
  const s = document.createElement('style')
  s.textContent = '*{transition:none!important}'
  document.head.appendChild(s)
  return () => s.remove()
}
export function initColorMode() {
  if (typeof window === 'undefined') return
  const h = document.documentElement
  const r = document.getElementById('__nuxt')
  if (!r) return
  const s = localStorage.getItem('color-mode')
  const d = s ? s === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  setMode(h, d)
  setMode(r, d)
  isDark.value = d
}
function baseOverlay(btn: HTMLElement) {
  const r = document.getElementById('__nuxt') as HTMLElement
  const o = r.cloneNode(true) as HTMLElement
  const { left, top, width, height } = btn.getBoundingClientRect()
  const cx = left + width / 2
  const cy = top + height / 2
  const y = scrollY
  o.style.transform = `translateY(-${y}px)`
  ;(o.firstElementChild as HTMLElement | null)?.scrollTo(0, y)
  o.id = 'nuxt-theme-overlay'
  o.style.cssText += 'position:fixed;inset:0;pointer-events:none;z-index:9999;transition:clip-path 1.2s cubic-bezier(.22,1,.36,1)'
  o.querySelectorAll('*').forEach(e => ((e as HTMLElement).style.transition = 'none'))
  return { o, cx, cy }
}
function finish(o: HTMLElement, tgt: boolean) {
  const h = document.documentElement
  const r = document.getElementById('__nuxt') as HTMLElement
  const un = freeze()
  setMode(h, tgt)
  setMode(r, tgt)
  localStorage.setItem('color-mode', tgt ? 'dark' : 'light')
  isDark.value = tgt
  o.remove()
  un()
}
export function toggleThemeWithCircle(ev: MouseEvent) {
  const btn = ev.currentTarget as HTMLElement
  const { o, cx, cy } = baseOverlay(btn)
  const tgt = !isDark.value
  setMode(o, tgt)
  const rad = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
  o.style.clipPath = `circle(0 at ${cx}px ${cy}px)`
  o.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  o.style.color = 'var(--fg)'
  document.body.appendChild(o)
  o.getBoundingClientRect()
  requestAnimationFrame(() => (o.style.clipPath = `circle(${rad}px at ${cx}px ${cy}px)`))
  o.addEventListener('transitionend', () => finish(o, tgt), { once: true })
}
export function toggleThemeWithDiamond(ev: MouseEvent) {
  const btn = ev.currentTarget as HTMLElement
  const { o, cx, cy } = baseOverlay(btn)
  const tgt = !isDark.value
  setMode(o, tgt)

  const diag = Math.hypot(innerWidth, innerHeight)
  const d = diag
  const s = `${cx}px ${cy}px`
  const e = `${cx}px ${cy - d}px, ${cx + d}px ${cy}px, ${cx}px ${cy + d}px, ${cx - d}px ${cy}px`

  o.style.clipPath = `polygon(${s},${s},${s},${s})`
  o.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  o.style.color = 'var(--fg)'
  document.body.appendChild(o)
  o.getBoundingClientRect()
  requestAnimationFrame(() => (o.style.clipPath = `polygon(${e})`))
  o.addEventListener('transitionend', () => finish(o, tgt), { once: true })
}
export function toggleThemeWithRipple(ev: MouseEvent) {
  const btn = ev.currentTarget as HTMLElement
  const { o: core, cx, cy } = baseOverlay(btn)
  const tgt = !isDark.value
  setMode(core, tgt)
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
  core.style.transition = 'clip-path 1.4s cubic-bezier(.22,1,.36,1)'
  core.style.clipPath = `circle(0 at ${cx}px ${cy}px)`
  core.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  core.style.color = 'var(--fg)'
  const rings: HTMLElement[] = []
  const steps = 3
  for (let i = 0; i < steps; i++) {
    const ring = document.createElement('div')
    const delay = i * 0.15
    const size = r * 2 + i * 120
    ring.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;
      margin-left:-${size / 2}px;margin-top:-${size / 2}px;border-radius:50%;
      border:${4 - i}px solid var(--accent);opacity:.5;pointer-events:none;z-index:9998;
      transform:scale(0);transition:transform 1.4s ${delay}s cubic-bezier(.22,1,.36,1),opacity 1.4s ${delay}s`
    if (i === 1) ring.style.borderColor = 'var(--accent-hover)'
    if (i === 2) ring.style.borderColor = 'var(--btn-bg-hover)'
    rings.push(ring)
    document.body.appendChild(ring)
  }
  document.body.appendChild(core)
  core.getBoundingClientRect()
  requestAnimationFrame(() => {
    core.style.clipPath = `circle(${r + 120}px at ${cx}px ${cy}px)`
    rings.forEach(ring => {
      ring.style.transform = 'scale(1)'
      ring.style.opacity = '0'
    })
  })
  core.addEventListener(
    'transitionend',
    () => {
      rings.forEach(ring =>
        ring.addEventListener('transitionend', () => ring.remove(), { once: true })
      )
      finish(core, tgt)
    },
    { once: true }
  )
}
