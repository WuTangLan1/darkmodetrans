<!-- components/OverlayLoad.vue -->

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  PointLight,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  Color
} from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let renderer: WebGLRenderer
let scene: Scene
let camera: PerspectiveCamera
const group = new Group()

const TOTAL   = 2000         // overlay lifetime in App (ms)
const SPIN    = 1500         // continuous spin duration   (ms)
const DECEL   = TOTAL - SPIN // ease-to-front window       (ms)

let start = 0
let frameId = 0

function buildShape () {
  const beamLen = 1.5
  const beamThk = 0.24
  const geo     = new BoxGeometry(beamLen, beamThk, beamThk)
  const mat = new MeshStandardMaterial({
    color:          new Color('#82cfff'),
    emissive:       new Color('#1a6eff'),
    emissiveIntensity: .35,
    roughness:  .2,
    metalness:  .45
  })

  const a = Math.PI / 3
  const r = beamLen * Math.sqrt(3) / 6

  const b1 = new Mesh(geo, mat)
  b1.position.set(0, r * 2, 0)

  const b2 = new Mesh(geo, mat)
  b2.position.set(-beamLen * .5, -r, 0)
  b2.rotation.z =  a

  const b3 = new Mesh(geo, mat)
  b3.position.set( beamLen * .5, -r, 0)
  b3.rotation.z = -a

  group.add(b1, b2, b3)
  group.scale.set(.4, .4, .4)
}

function initThree () {
  if (!canvasRef.value) return
  scene  = new Scene()
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
  camera.position.set(0, 0, 3.5)

  renderer = new WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  scene.add(new AmbientLight(0x141414, 1.6))
  const point = new PointLight(0x7bd7ff, 2.2, 12, 1.8)
  point.position.set(2, 3, 4)
  scene.add(point)

  buildShape()
  scene.add(group)
  window.addEventListener('resize', onResize)
}

function onResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate (t: number) {
  if (!start) start = t
  const elapsed = t - start

  /* spin phase */
  if (elapsed < SPIN) {
    const k = elapsed * .001            // simple linear spin speed
    group.rotation.x = k * .45
    group.rotation.y = k * .65
  }
  /* deceleration / align-front phase */
  else if (elapsed < TOTAL) {
    const p = (elapsed - SPIN) / DECEL  // 0 → 1 over DECEL ms
    const ease = 1 - Math.pow(1 - p, 3) // cubic-out
    group.rotation.x = (.45 * SPIN * .001) * (1 - ease) // lerp to 0
    group.rotation.y = (.65 * SPIN * .001) * (1 - ease)
  }
  /* finished – lock orientation and stop RAF */
  else {
    group.rotation.set(0, 0, 0)
    renderer.render(scene, camera)
    return                                    // exit without next frame
  }

  renderer.render(scene, camera)
  frameId = requestAnimationFrame(animate)
}

/* lifecycle */
onMounted(() => {
  initThree()
  frameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', onResize)
  renderer.dispose()
  group.children.forEach(m => {
    const mesh = m as Mesh
    mesh.geometry.dispose()
    ;(mesh.material as MeshStandardMaterial).dispose()
  })
})
</script>

<template>
  <div class="fixed inset-0 overlay-load z-[9999]">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>
  </div>
</template>

<style scoped>
.overlay-load{
  backdrop-filter:blur(10px);
  background:radial-gradient(circle at 50% 50%,#050510 0%,#0c1127 45%,#050510 100%);
  animation:gradientPulse 6s linear infinite
}
@keyframes gradientPulse{
  0%{filter:hue-rotate(0deg)}
  50%{filter:hue-rotate(180deg)}
  100%{filter:hue-rotate(360deg)}
}
</style>

  