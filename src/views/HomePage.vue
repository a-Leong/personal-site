<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createAnimation } from '@ionic/core'

import Banner from '@/components/Banner.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
  },
  setup() {
    const askew = ref(true)
    const peaceRef = ref()
    const peaceAnim = ref()

    onMounted(() => {
      peaceAnim.value = createAnimation()
        .addElement(peaceRef.value)
        .duration(400)
        .keyframes([
          { offset: 0, transform: 'translateX(-50%) rotate(12deg)' },
          { offset: 0.3, transform: 'translateX(-50%) rotate(-5deg)' },
          { offset: 1, transform: 'translateX(-50%) rotate(0)' },
        ])
    })

    function handlePeaceClicked() {
      if (peaceAnim.value !== undefined && askew.value) {
        askew.value = false
        peaceRef.value.style.cursor = 'default'
        peaceAnim.value.play()
      }
    }

    return {
      askew,
      peaceRef,

      handlePeaceClicked,
    }
  },
})
</script>

<template>
  <ion-header class="ion-no-border">
    <banner :shouldFall="!askew" />
  </ion-header>

  <ion-content fullscreen>
    <div class="about-wrapper ion-padding max-width-md">
      <div class="ion-text-center">
        <h1>Hi, I'm Alex:</h1>
      </div>
      <div>
        <p>
          Software engineer for three years. Working at
          <a href="http://www.ori.org/research">Oregon Research Institute</a>
          and
          <a href="https://influentsin.com/">Influents Innovations</a> where I
          build and maintain web and mobile apps. Academic background in
          game-playing artificial intelligence and computer graphics.
        </p>
        <p>This website is currently under development.</p>
        <p><a href="mailto:alexleong7@gmail.com">alexleong7@gmail.com</a></p>
      </div>
    </div>
    <img
      ref="peaceRef"
      src="../assets/peace.svg"
      @click="handlePeaceClicked"
      alt="peace"
      class="peace nodrag noselect"
    />
  </ion-content>
</template>

<style scoped>
.about-wrapper {
  margin: auto;
}

.peace {
  cursor: url('../assets/happy-face.cur'), pointer;
  height: 100px;
  width: 100px;
  position: relative;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
}
</style>
