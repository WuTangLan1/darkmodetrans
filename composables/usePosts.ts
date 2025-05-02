// composables/usePosts.ts
export const posts = [
  {
    slug: 'expanding-circle-reveal',
    title: 'Expanding Circle Expansion',
    excerpt:
      'A definitive, engineering-grade handbook for crafting an ultra-smooth circular theme reveal that radiates from the toggle button and envelops the entire UI.',
    body: `
<p>The <strong>Expanding Circle Expansion</strong> is a flagship animation pattern that leverages GPU-accelerated <code>clip-path</code> masks to deliver a silky, radial theme swap. This guide walks through every layer—from math to accessibility—so you can ship a production-ready experience.</p>

<h2> 🚩 Architectural Overview</h2>
<p>At its core, the technique clones the live root node (<code># __nuxt</code>), applies the <em>target</em> theme to that clone, then animates a <em>circular</em> mask that unveils the clone while hiding the old UI. The real DOM’s classes are toggled <em>after</em> the animation, guaranteeing a flash-free transition.</p>

<h2> 🔬 Detailed Implementation Steps</h2>
<ol>
  <li><strong>Capture Click Center</strong><br>
      Use <code>const { left, top, width, height } = btn.getBoundingClientRect()</code>.<br>
      Calculate <code>cx = left + width / 2</code>, <code>cy = top + height / 2</code>. These coordinates anchor the mask exactly where the user’s intent originates.</li>

  <li><strong>Clone &amp; Freeze</strong><br>
      <code>const overlay = root.cloneNode(true) as HTMLElement</code>; append this to <code>body</code> with <code>position: fixed</code> and <code>transform: translateY(-scrollY)</code> so it lines up pixel-perfectly.<br>
      Inject a freeze-sheet: <code>* { transition:none!important; }</code> to stop every other CSS animation while the reveal plays.</li>

  <li><strong>Theme Pre-Swap</strong><br>
      Add <code>.dark</code>/<code>.light</code> to the clone <em>before</em> the mask starts. This ensures the clone’s look is already correct inside the growing circle.</li>

  <li><strong>Initial Mask</strong><br>
      <code>overlay.style.clipPath = \`circle(0 at \${cx}px \${cy}px)\`</code>.<br>
      Use custom properties for the gradient: <code>background:linear-gradient(135deg,var(--bg-start),var(--bg-end))</code>.</li>

  <li><strong>Compute Final Radius</strong><br>
      <code>const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))</code> so the circle fully covers ultrawide monitors.</li>

  <li><strong>Trigger Animation</strong><br>
      Flush layout → <code>overlay.getBoundingClientRect()</code> → <code>requestAnimationFrame</code> → set<br>
      <code>overlay.style.clipPath = \`circle(\${radius}px at \${cx}px \${cy}px)\`</code>.<br>
      Let CSS handle <code>transition: clip-path 0.9s cubic-bezier(.25,.8,.5,1)</code>.</li>

  <li><strong>Cleanup</strong><br>
      On <code>transitionend</code> of the overlay: toggle the real root’s classes, persist to <code>localStorage</code>, remove freeze-sheet, then <code>overlay.remove()</code>.</li>
</ol>

<h2> ⚙️ Performance Notes</h2>
<ul>
  <li>Only <code>clip-path</code> and <code>transform</code> animate—both composite on the GPU.</li>
  <li>All reflows are isolated in the overlay; the live DOM stays quiescent.</li>
  <li>Add a <code>@media (prefers-reduced-motion: reduce)</code> shortcut that instantly toggles without animation.</li>
</ul>

<h2> 🎨 Enhancements</h2>
<p>Fade in critical UI elements (<code>opacity:0→1</code>) via a delayed class toggle, or layer a background-blur (<code>backdrop-filter:blur(4px)</code>) on the expanding circle for extra polish.</p>
`
  },

  {
    slug: 'expanding-diamond-reveal',
    title: 'Expanding Diamond (Rotated Square) Reveal',
    excerpt:
      'A full-stack exploration of diamond-shaped theme transitions, from polygon math to reduced-motion fallbacks.',
    body: `
<p>The <strong>Expanding Diamond Reveal</strong> swaps themes by animating a four-vertex <code>clip-path: polygon()</code> mask that grows into a rotated square. This section dives deep into the geometry, accessibility, and micro-interaction design that make the effect feel both lively and professional.</p>

<h2> 📐 Geometry Breakdown</h2>
<p>The diamond’s vertices animate from the toggle center to the midpoints of each viewport edge. To ensure coverage regardless of aspect ratio, use the viewport diagonal:</p>
<pre><code>const d = Math.hypot(window.innerWidth, window.innerHeight);</code></pre>

<h2> 🛠️ Implementation Checklist</h2>
<ol>
  <li><strong>Vertex Initialisation</strong><br>
      <code>clip-path:polygon(cx cy, cx cy, cx cy, cx cy)</code></li>

  <li><strong>Final Polygon</strong><br>
      <code>clip-path:polygon(cx cy-d, cx+d cy, cx cy+d, cx-d cy)</code></li>

  <li><strong>Smooth Motion</strong><br>
      <code>transition: clip-path 1.1s ease-in-out</code>; add <code>will-change: clip-path</code> for hinting.</li>

  <li><strong>Overshoot Guard</strong><br>
      Expand by <code>d + 50</code> pixels to avoid sub-pixel voids on retina screens.</li>

  <li><strong>Accessibility</strong><br>
      Inside <code>@media (prefers-reduced-motion: reduce)</code>, bypass the animation and toggle classes immediately.</li>
</ol>

<h2> 🖌️ Design Flair</h2>
<ul>
  <li>Combine with a <em>counter-rotating</em> inner square via <code>transform:rotate(-45deg)</code> for a vortex-like effect.</li>
  <li>Fade border-radius from <code>0 → 16px</code> during expansion to soften the geometry.</li>
  <li>Layer a subtle <code>box-shadow</code> (<code>0 0 40px rgba(0,0,0,.25)</code>) on the overlay for depth.</li>
</ul>

<h2> 🚀 Production Tips</h2>
<p>Profile in Chrome DevTools: ensure <code>Frames per second ≥ 60</code>. If FPS dips, shorten mask duration or pre-warm the GPU by toggling <code>will-change</code> a frame earlier.</p>
`
  },

  {
    slug: 'multi-ring-ripple-expansion',
    title: 'Multi-Ring “Ripple” Expansion',
    excerpt:
      'An exhaustive tutorial on orchestrating concentric ripple waves that expand and fade while delivering a flawless theme swap.',
    body: `
<p>The <strong>Multi-Ring Ripple Expansion</strong> layers multiple staggered circles around the core mask, producing a sonar-like pulse that amplifies user delight. Below, we dissect how to generate, time, and clean up these rings without sacrificing performance.</p>

<h2> 🌊 Ripple Generation Algorithm</h2>
<pre><code>
for (let i = 0; i &lt; rings; i++) {
  const ring = document.createElement('div');
  const delay = i * 0.2;
  const diameter = base + i * spacing;
  ring.style.cssText =
    \`position:fixed;left:\${cx}px;top:\${cy}px;width:\${diameter}px;height:\${diameter}px;\` +
    \`margin-left:-\${diameter/2}px;margin-top:-\${diameter/2}px;border-radius:50%;\` +
    \`border:\${Math.max(1,4-i)}px solid var(--accent);\` +
    \`opacity:.5;transform:scale(0);pointer-events:none;z-index:9998;\` +
    \`transition:transform 1.6s \${delay}s cubic-bezier(.22,1,.36,1),opacity 1.6s \${delay}s\`;
  overlay.appendChild(ring);
}
</code></pre>

<h2> ⏱️ Timing & Easing</h2>
<ul>
  <li>Use a <em>cubic-bezier(.22,1,.36,1)</em> curve for a natural water-drop acceleration.</li>
  <li>Increment delays (0.2 s) so each ring overtakes its predecessor.</li>
  <li>Fade opacity to 0 concurrently to avoid harsh ring disappearance.</li>
</ul>

<h2> 💡 Visual Tweaks</h2>
<ul>
  <li>Add <code>filter:blur(2px)</code> on outer rings for a luminous halo.</li>
  <li>Randomize ring border colors along your brand gradient (\`hsl(var(--accent-h) + i*10, 85%, 55%)\`).</li>
  <li>Transform final ring scale to 1.2 for an overshoot-then-settle sensation.</li>
</ul>

<h2> 🧹 Cleanup Strategy</h2>
<p>Attach a <code>transitionend</code> listener to the <em>last</em> ring; once it finishes, remove all ring nodes, toggle the real DOM’s theme, and persist the new mode in <code>localStorage</code>. This keeps the DOM tidy and prevents memory leaks.</p>

<h2> 📊 Performance Checklist</h2>
<ul>
  <li>Ensure each ring only animates <code>transform</code> and <code>opacity</code>.</li>
  <li>Batch DOM writes—append all rings before a single <code>reflow</code>.</li>
  <li>Throttle to 3–5 rings; beyond that, visual payoff diminishes while paint cost rises.</li>
</ul>
`
  }
]
