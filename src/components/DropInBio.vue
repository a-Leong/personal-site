<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import anime from 'animejs'

export default defineComponent({
  name: 'DropInBio',
  props: {
    group: {
      type: Number,
      required: true,
    },
    bioHtml: {
      type: String,
      required: true,
    },
    clickCount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const blockWrapperStyle = computed(() => ({
      'line-height': '1.5',
      display: props.clickCount <= props.group ? 'none' : 'inline-block',
      transform: props.clickCount <= props.group ? 'translateY(-50%)' : '',
    }))

    const delays = ref()
    const tl = anime.timeline({
      easing: 'easeOutElastic(1, 0.9)',
      duration: 3500,
    })

    function drop() {
      const spans = document.querySelectorAll(`.brick`)
      delays.value = Array.from(spans.keys())
        .map((_, i, arr) => {
          const x = i / arr.length
          return 1 - Math.sqrt(1 - Math.pow(x, 2))
        })
        .sort(() => Math.random() - 0.5)
      const duration = 20 * delays.value.length
      anime({
        targets: `.block-wrapper-${props.group}`,
        translateY: ['-50%', 0],
        easing: 'easeInOutElastic',
        duration: duration * 1.5,
        delay: 400,
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
          return 400 + delays.value[i] * duration
        },
      })
      tl.add({
        targets: `.block-${props.group}`,
        rotate: '0',
        duration: duration + 500,
        delay: function(_: HTMLElement, i: number) {
          return delays.value[i] * 500
        },
      })
    }

    watch(
      () => props.clickCount,
      () => {
        if (props.clickCount === props.group + 1) {
          drop()
        }
      },
    )

    return {
      blockWrapperStyle,
    }
  },
})
</script>

<template>
  <div
    :class="`block-wrapper-${group} max-width-md`"
    :style="blockWrapperStyle"
    v-html="bioHtml"
  ></div>
</template>
