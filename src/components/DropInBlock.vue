<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { IonRange, RangeCustomEvent } from '@ionic/vue'
import anime from 'animejs'

const props = defineProps<{
  group: number
  blockHtml: string
  clickCount: number
}>()

const blockWrapperStyle = computed(() => ({
  'line-height': '1.5',
  display: props.clickCount <= props.group ? 'none' : 'inline-block',
  transform: props.clickCount <= props.group ? 'translateY(-50%)' : '',
}))

const isBlockShowing = computed(() => props.clickCount > props.group)

const progress = ref(0)

const delays = ref()
const tl = anime.timeline({
  easing: 'easeOutElastic(1, 1)',
  autoplay: false,
  update: anim => (progress.value = anim.progress),
  complete: anim => {
    anim.play()
    anim.pause()
    anim.seek(anim.duration - 0.01)
  },
})

onMounted(() => {
  // Init animation timeline
  const spans = document.querySelectorAll(`.brick`)
  delays.value = Array.from(spans.keys())
    .map((_, i, arr) => {
      const x = i / arr.length
      return 1 - Math.sqrt(1 - Math.pow(x, 2))
    })
    .sort(() => Math.random() - 0.5)
  const duration = 15 * delays.value.length
  tl.add({
    targets: `.block-wrapper-${props.group}`,
    translateY: ['-50%', 0],
    easing: 'easeOutElastic(1, 1)',
    duration: 1,
  })
  tl.add({
    targets: `.block-${props.group}`,
    translateY: '0',
    rotate: function() {
      const rand = Math.random()
      if (rand > 0.6) {
        return `${(Math.random() - 0.5) * 45}deg`
      } else {
        return '0'
      }
    },
    duration,
    delay: function(_: HTMLElement, i: number) {
      return delays.value[i] * duration
    },
  })
  tl.add({
    targets: `.block-${props.group}`,
    rotate: '0',
    easing: 'easeInOutElastic',
    duration: duration,
    delay: function(_: HTMLElement, i: number) {
      return 250 + delays.value[i] * 500
    },
  })
})

function seekAnim(event: RangeCustomEvent) {
  tl.seek(tl.duration * ((event.detail.value as number) / 100))
}

watch(
  () => props.clickCount,
  () => {
    if (props.clickCount === props.group + 1) {
      tl.play()
    }
  },
)
</script>

<template>
  <div
    :class="`block-wrapper-${group} ion-padding-horizontal`"
    :style="blockWrapperStyle"
    v-html="blockHtml"
  ></div>
  <ion-range
    :class="{ showing: isBlockShowing }"
    :value="progress"
    step="0.01"
    @ionChange="seekAnim"
    @ionKnobMoveStart="tl.pause"
    @ionKnobMoveEnd="tl.play"
  />
</template>

<style scoped>
ion-range {
  opacity: 0;
  --knob-background: #00000008;
  --knob-box-shadow: 0;
  --bar-background-active: #0033eb;
  --bar-background: transparent;
  --bar-height: 1px;
}
ion-range.showing {
  opacity: 1;
  transition: all 4s ease-in;
}
</style>
