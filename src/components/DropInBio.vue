<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import anime from 'animejs'

export default defineComponent({
  name: 'DropInBio',
  props: {
    bioHtml: {
      type: String,
      required: true,
    },
    brickClassName: {
      type: String,
      required: true,
    },
    shouldFall: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const delays = ref()
    const tl = anime.timeline({
      easing: 'easeOutElastic(1, 0.7)',
      duration: 3500,
    })

    function drop() {
      const spans = document.querySelectorAll(`.${props.brickClassName}`)
      delays.value = Array.from(spans.keys())
        .map((_, i, arr) => {
          const x = i / arr.length
          return 1 - Math.sqrt(1 - Math.pow(x, 2))
        })
        .sort(() => Math.random() - 0.5)
      anime({
        targets: '.bio-wrapper',
        translateX: ['-50%', '-50%'],
        translateY: ['-110%', '-50%'],
        easing: 'easeInOutElastic',
        duration: 3000,
        delay: 400,
      })
      tl.add({
        targets: `.${props.brickClassName}`,
        translateY: '0',
        rotate: function() {
          const rand = Math.random()
          if (rand > 0.6) {
            return `${(Math.random() - 0.5) * 45}deg`
          } else {
            return '0'
          }
        },
        duration: 2000,
        delay: function(_: HTMLElement, i: number) {
          return 400 + delays.value[i] * 2000
        },
      })
      tl.add({
        targets: `.${props.brickClassName}`,
        rotate: '0',
        duration: 2500,
        delay: function(_: HTMLElement, i: number) {
          return delays.value[i] * 500
        },
      })
    }

    watch(
      () => props.shouldFall,
      () => props.shouldFall && drop(),
    )
  },
})
</script>

<template>
  <div class="bio-wrapper max-width-sm" v-html="bioHtml"></div>
</template>

<style scoped>
.bio-wrapper {
  line-height: 1.5;
  min-width: 288px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-110%);
}
</style>
