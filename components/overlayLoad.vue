<!-- components/OverlayLoad.vue -->
<template>
    <div class="fixed inset-0 overlay-load z-[9999]">
      <canvas ref="canvasRef" class="w-full h-full block"></canvas>
    </div>
  </template>
  
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
  let frameId: number
  const group = new Group()
  
  function buildPenroseLikeShape() {
    const beamLength = 2
    const beamThickness = 0.32
    const beamGeo = new BoxGeometry(beamLength, beamThickness, beamThickness)
    const mat = new MeshStandardMaterial({
      color: new Color('#5ab8ff'),
      roughness: 0.25,
      metalness: 0.4
    })
  
    const a = Math.PI / 3
    const r = beamLength * Math.sqrt(3) / 6
  
    const b1 = new Mesh(beamGeo, mat)
    b1.position.set(0, r * 2, 0)
  
    const b2 = new Mesh(beamGeo, mat)
    b2.position.set(-beamLength * 0.5, -r, 0)
    b2.rotation.z = a
  
    const b3 = new Mesh(beamGeo, mat)
    b3.position.set(beamLength * 0.5, -r, 0)
    b3.rotation.z = -a
  
    group.add(b1, b2, b3)
    group.scale.set(0.6, 0.6, 0.6)
  }
  
  function initThree() {
    if (!canvasRef.value) return
    scene = new Scene()
    camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 4)
    renderer = new WebGLRenderer({
      canvas: canvasRef.value,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  
    const amb = new AmbientLight(0x202020, 1.4)
    const point = new PointLight(0xffffff, 1.6, 10, 2)
    point.position.set(3, 4, 5)
    scene.add(amb, point)
  
    buildPenroseLikeShape()
    scene.add(group)
  
    window.addEventListener('resize', onResize)
  }
  
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  function animate() {
    const t = performance.now() * 0.001
    group.rotation.x = t * 0.4
    group.rotation.y = t * 0.6
    renderer.render(scene, camera)
    frameId = requestAnimationFrame(animate)
  }
  
  onMounted(() => {
    initThree()
    animate()
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
  
  <style scoped>
  .overlay-load {
    backdrop-filter: blur(10px);
    background: radial-gradient(circle at 50% 50%, #0a0a15 0%, #111733 50%, #090d1f 100%);
    animation: gradientPulse 6s linear infinite;
  }
  @keyframes gradientPulse {
    0% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(180deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
  </style>
  