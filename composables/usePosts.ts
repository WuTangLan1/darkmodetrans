// composables/usePosts.ts
export const posts = [
  {
    slug: 'expanding-circle-reveal',
    title: 'Expanding Circle Expansion',
    excerpt: 'Step-by-step guide on creating a circular theme reveal using clip-path animations and overlays.',
    body: `<p>This document explains how to implement a circular theme transition that radiates from the toggle button’s center. You clone the application root into a fixed overlay, account for scroll offset, and initialize with <code>clip-path: circle(0 at cx cy)</code>. Using <code>requestAnimationFrame</code>, you animate the radius to cover the viewport, then swap the real DOM’s <code>.dark</code> class and remove the overlay.</p>
<p><strong>Core steps:</strong></p>
<ul>
  <li>Compute <code>(cx, cy)</code> from <code>getBoundingClientRect()</code> of the button.</li>
  <li>Clone the <code>#__nuxt</code> root, freeze existing transitions, and apply the new theme class on the clone.</li>
  <li>Set <code>clip-path: circle(0 at cx cy)</code> and animate to <code>circle(radius at cx cy)</code>, where <code>radius</code> is the distance to the furthest corner.</li>
  <li>On <code>transitionend</code>, toggle the real root’s classes, persist to <code>localStorage</code>, then remove the overlay.</li>
</ul>`
  },
  {
    slug: 'expanding-diamond-reveal',
    title: 'Expanding Diamond (Rotated Square) Reveal',
    excerpt: 'How to build a diamond-shaped theme reveal with clip-path polygons for a dynamic rotated-square effect.',
    body: `<p>Learn to create a “diamond” reveal by animating a <code>clip-path: polygon()</code> from four coincident points at the button center to the viewport midpoints. You clone the root, disable transitions, and apply the new theme on the clone before animation.</p>
<p><strong>Key implementation details:</strong></p>
<ul>
  <li>Determine center <code>(cx, cy)</code> of the toggle button.</li>
  <li>Compute <code>d = hypot(viewportWidth, viewportHeight)</code> to ensure the diamond covers entire screen.</li>
  <li>Initialize <code>clip-path: polygon(cx cy, cx cy, cx cy, cx cy)</code> and animate to <code>polygon(cx cx-d, cx+d cy, cx cy+d, cx-d cy)</code>.</li>
  <li>Once the animation completes, toggle the real <code>.dark</code>/<code>.light</code> classes and remove the overlay.</li>
</ul>`
  },
  {
    slug: 'multi-ring-ripple-expansion',
    title: 'Multi-Ring “Ripple” Expansion',
    excerpt: 'Documentation for a multi-ring ripple effect: concentric circles that expand and fade for an impressive theme swap.',
    body: `<p>This guide covers creating a multi-ring ripple transition alongside the core circular reveal. You generate several concentric <code>div</code>s with increasing diameters, staggered delays, and fading borders.</p>
<p><strong>Workflow:</strong></p>
<ul>
  <li>Clone the root and apply the target theme on the clone.</li>
  <li>Compute maximum radius <code>r</code> from the click point to viewport corners.</li>
  <li>Create <code>n</code> rings with CSS <code>transition</code> delays and border colors from <code>var(--accent)</code> to <code>var(--accent-hover)</code>.</li>
  <li>Animate each ring’s <code>transform: scale(0 → 1)</code> and <code>opacity: 0.5 → 0</code>, while the clone’s <code>clip-path</code> expands slightly beyond <code>r</code>.</li>
  <li>After all transitions, toggle the real DOM’s theme classes, persist to <code>localStorage</code>, then clean up.</li>
</ul>`
  }
]
