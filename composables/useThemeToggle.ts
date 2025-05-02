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
  o.style.cssText +=
    'position:fixed;inset:0;pointer-events:none;z-index:9999;transition:clip-path .6s ease-out'
  o.querySelectorAll('*').forEach(e => ((e as HTMLElement).style.transition = 'none'))
  return { r, o, cx, cy }
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
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
  const start = `${cx}px ${cy}px`
  const end = `${cx}px ${cy - r}px, ${cx + r}px ${cy}px, ${cx}px ${cy + r}px, ${cx - r}px ${cy}px`
  o.style.clipPath = `polygon(${start},${start},${start},${start})`
  o.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  o.style.color = 'var(--fg)'
  document.body.appendChild(o)
  o.getBoundingClientRect()
  requestAnimationFrame(() => (o.style.clipPath = `polygon(${end})`))
  o.addEventListener('transitionend', () => finish(o, tgt), { once: true })
}
export function toggleThemeWithRipple(ev: MouseEvent) {
  const btn = ev.currentTarget as HTMLElement
  const { o: inner, cx, cy } = baseOverlay(btn)
  const tgt = !isDark.value
  setMode(inner, tgt)
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
  inner.style.clipPath = `circle(0 at ${cx}px ${cy}px)`
  inner.style.background = 'linear-gradient(135deg,var(--bg-start),var(--bg-end))'
  inner.style.color = 'var(--fg)'
  const outer = document.createElement('div')
  outer.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:9998;
    clip-path:circle(0 at ${cx}px ${cy}px);transition:clip-path .8s ease-out;
    background:linear-gradient(135deg,var(--bg-start),var(--bg-end))`
  document.body.appendChild(outer)
  document.body.appendChild(inner)
  inner.getBoundingClientRect()
  requestAnimationFrame(() => {
    inner.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`
    outer.style.clipPath = `circle(${r + 80}px at ${cx}px ${cy}px)`
  })
  inner.addEventListener(
    'transitionend',
    () => {
      outer.addEventListener('transitionend', () => outer.remove(), { once: true })
      finish(inner, tgt)
    },
    { once: true }
  )
}
