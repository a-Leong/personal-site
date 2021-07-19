<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import anime from 'animejs'

export default defineComponent({
  name: 'Banner',
  props: {
    shouldFall: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const delays = ref()
    onMounted(() => {
      const spans = document.querySelectorAll('.pix')
      delays.value = Array.from(spans.keys())
        .map((_, i, arr) => {
          const x = i / arr.length
          return 1 - Math.sqrt(1 - Math.pow(x, 2))
        })
        .sort(() => Math.random() - 0.5)
    })

    function fall(delay = 500) {
      anime({
        targets: '.pix-cage',
        opacity: 0,
        duration: 500,
        easing: 'linear',
        delay,
      })
      anime({
        targets: '.pix',
        translateY: '110vh',
        rotate: function() {
          const rand = Math.random()
          if (rand > 0.75) {
            return `${(Math.random() - 0.5) * 720}deg`
          } else {
            return '0'
          }
        },
        duration: 2000,
        easing: 'cubicBezier(0.86, 0.1, 0.77, 0.78)',
        delay: function(_: HTMLElement, i: number) {
          return delay + 500 + delays.value[i] * 10000
        },
      })
    }

    watch(
      () => props.shouldFall,
      () => fall(),
      { immediate: true },
    )
  },
})
</script>

<template>
  <div class="banner noselect">
    <span class="pix-cage" style=";color:#777;"
      >&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;&#160;.&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;&#160;&#160;&#160;.&#160;&#160;..&#160;&#160;&#160;..&#160;.&#160;&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;..&#160;.&#160;&#160;&#160;&#160;&#160;&#160;.&#160;&#160;&#160;</span
    >
    <br />
    <span class="pix" style=";color:#777;">&#160;.;</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#f55;background-color:#777">X</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#f55;background-color:#777">X</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#777;">8;&#160;&#160;..</span>
    <span class="pix" style=";color:#777;background-color:#ff5">;</span>
    <span class="pix" style=";color:#777;">:</span>
    <span class="pix" style=";color:#777;background-color:#ff5">:</span>
    <span class="pix" style=";color:#777;">..&#160;.&#160;t8</span>
    <span class="pix" style=";color:#fff;background-color:#777">%%X</span>
    <span class="pix" style=";color:#777;">8:&#160;&#160;&#160;8</span>
    <span class="pix" style=";color:#5ff;background-color:#777">X</span>
    <span class="pix" style=";color:#777;background-color:#55f">8</span>
    <span class="pix" style=";color:#0aa;background-color:#777">8</span>
    <span class="pix" style=";color:#5ff;background-color:#777">@</span>
    <span class="pix" style=";color:#fff;background-color:#777">.</span>
    <span class="pix" style=";color:#777;">:&#160;&#160;&#160;.</span>
    <span class="pix" style=";color:#777;background-color:#f5f">t</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#777;background-color:#f5f">&#160;</span>
    <span class="pix" style=";color:#777;">;..&#160;.;</span>
    <span class="pix" style=";color:#fff;background-color:#777">X</span>
    <span class="pix" style=";color:#ff5;background-color:#777">8</span>
    <span class="pix" style=";color:#a50;background-color:#777">8</span>
    <span class="pix" style=";color:#ff5;background-color:#777">8</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#777;">S..&#160;@</span>
    <span class="pix" style=";color:#555;background-color:#777">8</span>
    <span class="pix" style=";color:#a0a;background-color:#555"
      >&#160;&#160;&#160;</span
    >
    <span class="pix" style=";color:#555;background-color:#777">S</span>
    <span class="pix" style=";color:#777;"
      >X&#160;.&#160;;@888X.&#160;&#160;</span
    >
    <br />
    <span class="pix" style=";color:#777;">&#160;%</span>
    <span class="pix" style=";color:#a0a;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#a00;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#f5f;background-color:#f55">X</span>
    <span class="pix" style=";color:#ff5;background-color:#f55">S</span>
    <span class="pix" style=";color:#f5f;background-color:#f55">%</span>
    <span class="pix" style=";color:#a00;background-color:#f55"
      >&#160;&#160;</span
    >
    <span class="pix" style=";color:#777;">8%:</span>
    <span class="pix" style=";color:#a50;background-color:#ff5">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#ff5">t;;;;;</span>
    <span class="pix" style=";color:#777;">.&#160;8</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#f5f;background-color:#777">%</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#777;">t&#160;</span>
    <span class="pix" style=";color:#0aa;background-color:#777">S</span>
    <span class="pix" style=";color:#00a;background-color:#55f"
      >&#160;&#160;</span
    >
    <span class="pix" style=";color:#0aa;background-color:#55f"
      >&#160;&#160;&#160;&#160;</span
    >
    <span class="pix" style=";color:#777;background-color:#5ff">8</span>
    <span class="pix" style=";color:#777;">:.</span>
    <span class="pix" style=";color:#777;background-color:#f5f">;</span>
    <span class="pix" style=";color:#a0a;background-color:#f5f">:</span>
    <span class="pix" style=";color:#777;background-color:#f5f">%:%</span>
    <span class="pix" style=";color:#a0a;background-color:#f5f">&#160;.</span>
    <span class="pix" style=";color:#f5f;background-color:#777">X</span>
    <span class="pix" style=";color:#777;">&#160;%</span>
    <span class="pix" style=";color:#ff5;background-color:#a50">.</span>
    <span class="pix" style=";color:#f55;background-color:#a50">88</span>
    <span class="pix" style=";color:#ff5;background-color:#a50">:</span>
    <span class="pix" style=";color:#a50;background-color:#f55">t</span>
    <span class="pix" style=";color:#ff5;background-color:#a50">%</span>
    <span class="pix" style=";color:#f55;background-color:#a50">8</span>
    <span class="pix" style=";color:#fff;background-color:#777">8</span>
    <span class="pix" style=";color:#777;">&#160;</span>
    <span class="pix" style=";color:#fff;background-color:#777">%</span>
    <span class="pix" style=";color:#a00;background-color:#000">:</span>
    <span class="pix" style=";color:#0a0;background-color:#000">.</span>
    <span class="pix" style=";color:#00a;background-color:#000">:</span>
    <span class="pix" style=";color:#a00;background-color:#000">.</span>
    <span class="pix" style=";color:#00a;background-color:#000">:</span>
    <span class="pix" style=";color:#a00;background-color:#000">.</span>
    <span class="pix" style=";color:#00a;background-color:#000">;</span>
    <span class="pix" style=";color:#fff;background-color:#777">8</span>
    <span class="pix" style=";color:#777;">&#160;@</span>
    <span class="pix" style=";color:#fff;background-color:#777">%</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#777;">8</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">8</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">8S&#160;</span>
    <br />
    <span class="pix" style=";color:#777;">&#160;%</span>
    <span class="pix" style=";color:#a0a;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#a50;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#a00;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#a00;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#f55;background-color:#777">S</span>
    <span class="pix" style=";color:#777;">.:</span>
    <span class="pix" style=";color:#a50;background-color:#ff5">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#ff5">%:;</span>
    <span class="pix" style=";color:#fff;background-color:#ff5">8</span>
    <span class="pix" style=";color:#777;background-color:#ff5">t;</span>
    <span class="pix" style=";color:#777;">:&#160;</span>
    <span class="pix" style=";color:#fff;background-color:#777"
      >%&#160;&#160;</span
    >
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#f5f;background-color:#777">%</span>
    <span class="pix" style=";color:#fff;background-color:#777"
      >&#160;&#160;</span
    >
    <span class="pix" style=";color:#777;">X&#160;</span>
    <span class="pix" style=";color:#55f;background-color:#777">8</span>
    <span class="pix" style=";color:#0aa;background-color:#55f">&#160;</span>
    <span class="pix" style=";color:#5ff;background-color:#0aa">;</span>
    <span class="pix" style=";color:#5ff;background-color:#55f">8</span>
    <span class="pix" style=";color:#0aa;background-color:#55f">.</span>
    <span class="pix" style=";color:#0aa;background-color:#5ff">:</span>
    <span class="pix" style=";color:#00a;background-color:#55f">..</span>
    <span class="pix" style=";color:#777;">&#160;&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f5f">tS%SSX</span>
    <span class="pix" style=";color:#a0a;background-color:#f5f">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f5f">%</span>
    <span class="pix" style=";color:#777;">&#160;%</span>
    <span class="pix" style=";color:#f55;background-color:#a50">8</span>
    <span class="pix" style=";color:#a50;background-color:#ff5">S</span>
    <span class="pix" style=";color:#777;background-color:#a50">8</span>
    <span class="pix" style=";color:#f55;background-color:#a50">8</span>
    <span class="pix" style=";color:#777;background-color:#ff5">@</span>
    <span class="pix" style=";color:#555;background-color:#a50">8</span>
    <span class="pix" style=";color:#ff5;background-color:#a50">.</span>
    <span class="pix" style=";color:#ff5;background-color:#777">X</span>
    <span class="pix" style=";color:#777;">.</span>
    <span class="pix" style=";color:#555;background-color:#777">;</span>
    <span class="pix" style=";color:#a00;background-color:#000">::</span>
    <span class="pix" style=";color:#00a;background-color:#000">:</span>
    <span class="pix" style=";color:#a00;background-color:#000">.</span>
    <span class="pix" style=";color:#0a0;background-color:#000">.</span>
    <span class="pix" style=";color:#a00;background-color:#000">;</span>
    <span class="pix" style=";color:#0a0;background-color:#000">:</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#777;">&#160;8</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">8</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">8</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#777;">8</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">&#160;&#160;</span>
    <br />
    <span class="pix" style=";color:#777;">&#160;&#160;8</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#f5f;background-color:#f55">S</span>
    <span class="pix" style=";color:#a50;background-color:#f55">&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f55">8</span>
    <span class="pix" style=";color:#f5f;background-color:#f55">S</span>
    <span class="pix" style=";color:#fff;background-color:#777">&#160;</span>
    <span class="pix" style=";color:#777;">@&#160;.;</span>
    <span class="pix" style=";color:#777;background-color:#ff5">;</span>
    <span class="pix" style=";color:#fff;background-color:#ff5">8</span>
    <span class="pix" style=";color:#777;background-color:#ff5">tt</span>
    <span class="pix" style=";color:#fff;background-color:#ff5">8</span>
    <span class="pix" style=";color:#777;">:&#160;.t8</span>
    <span class="pix" style=";color:#f5f;background-color:#777">S</span>
    <span class="pix" style=";color:#ff5;background-color:#777">S</span>
    <span class="pix" style=";color:#777;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;background-color:#ff5">8</span>
    <span class="pix" style=";color:#fff;background-color:#f5f">8</span>
    <span class="pix" style=";color:#777;">8;&#160;;</span>
    <span class="pix" style=";color:#5ff;background-color:#777">8</span>
    <span class="pix" style=";color:#00a;background-color:#55f">&#160;</span>
    <span class="pix" style=";color:#0aa;background-color:#55f">.</span>
    <span class="pix" style=";color:#55f;background-color:#0aa">8</span>
    <span class="pix" style=";color:#a0a;background-color:#55f">:</span>
    <span class="pix" style=";color:#0aa;background-color:#777">X</span>
    <span class="pix" style=";color:#777;">8.&#160;&#160;</span>
    <span class="pix" style=";color:#777;background-color:#f5f">%%S%SX</span>
    <span class="pix" style=";color:#777;">&#160;&#160;&#160;8</span>
    <span class="pix" style=";color:#f55;background-color:#a50">8</span>
    <span class="pix" style=";color:#777;background-color:#a50">@</span>
    <span class="pix" style=";color:#ff5;background-color:#a50">.</span>
    <span class="pix" style=";color:#a50;background-color:#f55">;</span>
    <span class="pix" style=";color:#777;background-color:#ff5">@</span>
    <span class="pix" style=";color:#ff5;background-color:#777">S</span>
    <span class="pix" style=";color:#777;">%.;</span>
    <span class="pix" style=";color:#555;background-color:#777">8</span>
    <span class="pix" style=";color:#555;background-color:#000">@</span>
    <span class="pix" style=";color:#a00;background-color:#000">.</span>
    <span class="pix" style=";color:#00a;background-color:#000">.:</span>
    <span class="pix" style=";color:#555;background-color:#000">8</span>
    <span class="pix" style=";color:#555;background-color:#777">@</span>
    <span class="pix" style=";color:#777;">..t88</span>
    <span class="pix" style=";color:#f5f;">8</span>
    <span class="pix" style=";color:#55f;background-color:#5ff">8</span>
    <span class="pix" style=";color:#f5f;">8</span>
    <span class="pix" style=";color:#5ff;">8</span>
    <span class="pix" style=";color:#777;">8;&#160;</span>
    <br />
    <span class="pix-cage" style=";color:#777;"
      >&#160;&#160;.&#160;&#160;&#160;.&#160;.&#160;.&#160;&#160;&#160;..&#160;.&#160;.&#160;;t;%;;.:.&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;.&#160;.&#160;&#160;&#160;...&#160;&#160;&#160;&#160;&#160;&#160;.&#160;&#160;:.&#160;&#160;..&#160;t@t&#160;.&#160;&#160;.%Xt&#160;t.::&#160;</span
    >
    <br />
  </div>
</template>

<style scoped>
.pix-cage {
  display: inline-block;
}
.pix {
  display: inline-block;
}

.banner {
  z-index: 10;
  width: 100%;
  text-align: center;
  font-size: 1.9vw;
}
</style>
