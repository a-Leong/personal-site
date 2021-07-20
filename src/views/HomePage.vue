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
    const actionRef = ref()
    const actionAnim = ref()
    const actionLabel = ref("Don't be afraid")

    onMounted(() => {
      actionAnim.value = createAnimation()
        .addElement(actionRef.value)
        .duration(400)
        .keyframes([
          { offset: 0, transform: 'translateX(-50%) rotate(12deg)' },
          { offset: 0.3, transform: 'translateX(-50%) rotate(-5deg)' },
          { offset: 1, transform: 'translateX(-50%) rotate(0)' },
        ])
    })

    function handleactionClicked() {
      if (actionAnim.value !== undefined && askew.value) {
        askew.value = false
        actionRef.value.style.cursor = 'default'
        actionAnim.value.play()
        actionLabel.value = 'Email is up there ↑'
      }
    }

    return {
      askew,
      actionLabel,
      actionRef,

      handleactionClicked,
    }
  },
})
</script>

<template>
  <ion-header class="ion-no-border">
    <banner id="banner" :shouldFall="!askew" />
  </ion-header>

  <ion-content fullscreen>
    <div class="about-wrapper ion-padding max-width-sm">
      <div class="ion-text-center">
        <h1>Hi, I'm Alex</h1>
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
        <p>
          See more on my
          <a
            href="https://drive.google.com/file/d/16bkXpchOJi31h_W_tmh95OBpzUOMxgWX/view?usp=sharing"
            >resume</a
          >.
        </p>
        <p>
          <a href="mailto:alexleong7@gmail.com">alexleong7@gmail.com</a>
        </p>
      </div>
    </div>
    <span :title="actionLabel">
      <img
        ref="actionRef"
        src="../assets/buy-now.svg"
        @click="handleactionClicked"
        alt="action"
        class="action nodrag noselect"
      />
    </span>
  </ion-content>
</template>

<style scoped>
#banner {
  top: -11.4vw;
}
.about-wrapper {
  margin: auto;
}

.action {
  cursor: pointer;
  height: 100px;
  width: 100px;
  position: relative;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
}
</style>
