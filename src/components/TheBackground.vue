<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

let animationId: number
let mixer: THREE.AnimationMixer
let dogModel: THREE.Group
let dogAction: THREE.AnimationAction
const clock = new THREE.Clock()
const loaded = ref(false)

function throttle<T extends (...args: any[]) => void>(fn: T, limit: number) {
  let inThrottle = false
  let lastArgs: Parameters<T> | null = null
  return function throttledFn(...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
        if (lastArgs) {
          fn(...lastArgs)
          lastArgs = null
        }
      }, limit)
    } else {
      lastArgs = args
    }
  }
}

const mouse = new THREE.Vector2(0.5, -0.5)
const smoothedMouse = new THREE.Vector2(0.5, -0.5)

function updateMouseFromEvent(x: number, y: number) {
  const targetX = (x / window.innerWidth) * 2 - 1
  const targetY = -((y / window.innerHeight) * 2 - 1)
  if (dogAction) {
    gsap.to(dogAction, {
      weight: Math.pow(
        1 - Math.max(Math.min(Math.hypot(targetX, targetY) / Math.SQRT2, 1), 0),
        4,
      ),
      duration: 0.2,
    })
  }
  gsap.to(mouse, {
    x: targetX,
    y: targetY,
    duration: 0.3,
    overwrite: 'auto',
  })
}

onMounted(() => {
  const container = document.getElementById('background-animation')
  if (!container) throw new Error('#background-animation not found')

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 10, 15)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.shadowMap.enabled = true // ✅ enable shadow map
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 2))
  const directional = new THREE.DirectionalLight(0xfff0e0, 1)
  directional.position.set(10, 20, 10)
  directional.castShadow = true
  scene.add(directional)

  const loader = new GLTFLoader()
  let headBone: THREE.Bone | null = null

  loader.load(
    '/dog/source/model.glb',
    (gltf) => {
      dogModel = gltf.scene
      dogModel.scale.set(5, 5, 5)
      dogModel.position.set(0, -2, 0)
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.FrontSide // avoid double rendering
          child.material.toneMapped = true
          child.material.needsUpdate = true
          child.castShadow = true
          child.receiveShadow = true
        }
        if (child.name === 'N') headBone = child as THREE.Bone
      })
      scene.add(dogModel)
      if (gltf.animations?.length) {
        const clip = gltf.animations[2]
        const filteredTracks = clip.tracks.filter(
          (track) =>
            !track.name.includes('H-D') &&
            !track.name.includes('N.quaternion') &&
            !track.name.includes('N.scale'),
        )
        const modifiedClip = new THREE.AnimationClip(
          clip.name,
          clip.duration,
          filteredTracks,
        )
        mixer = new THREE.AnimationMixer(dogModel)
        dogAction = mixer.clipAction(modifiedClip)
        dogAction.weight = 0.1
        dogAction.play()
      }

      loaded.value = true
    },
    undefined,
    (error) => console.error('Error loading model:', error),
  )

  const throttledMouseMove = throttle((event: MouseEvent) => {
    updateMouseFromEvent(event.clientX, event.clientY)
  }, 100)

  const throttledTouchMove = throttle((event: TouchEvent) => {
    if (event.touches.length > 0) {
      updateMouseFromEvent(event.touches[0].clientX, event.touches[0].clientY)
    }
  }, 100)

  window.addEventListener('mousemove', throttledMouseMove)
  window.addEventListener('touchmove', throttledTouchMove, { passive: true })
  window.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length > 0) {
        updateMouseFromEvent(event.touches[0].clientX, event.touches[0].clientY)
      }
    },
    { passive: true },
  )
  window.addEventListener('mousedown', (event) => {
    updateMouseFromEvent(event.clientX, event.clientY)
  })

  function animate() {
    animationId = requestAnimationFrame(animate)
    const delta = clock.getDelta()
    smoothedMouse.lerp(mouse, 0.04)
    if (dogModel) {
      if (!dogModel.userData.smoothedAngle) dogModel.userData.smoothedAngle = 0
      const maxAngle = Math.PI / 4
      const targetAngle = smoothedMouse.x * maxAngle
      dogModel.userData.smoothedAngle +=
        (targetAngle - dogModel.userData.smoothedAngle) * 0.02
      dogModel.rotation.y = dogModel.userData.smoothedAngle
    }
    if (headBone) {
      headBone.lookAt(
        smoothedMouse.x,
        Math.min(smoothedMouse.y - Math.abs(smoothedMouse.x) * 1.5, 0.5),
        1,
      )
    }
    mixer?.update(delta * 1.4)
    renderer.render(scene, camera)
  }
  animate()

  function handleResize() {
    if (!container) return
    const width = container.clientWidth
    const height = container.clientHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    renderer.dispose()
    scene.clear()
    container.innerHTML = ''
  })
})
</script>

<template>
  <div id="background-animation" :class="{ visible: loaded }"></div>
</template>

<style scoped>
#background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: 0;
}

#background-animation.visible {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
</style>
