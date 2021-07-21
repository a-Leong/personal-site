<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createAnimation } from '@ionic/core'

import DropInBio from '@/components/DropInBio.vue'

import { generateBricksHtml } from '@/utils/generate-bricks'

export default defineComponent({
  name: 'Home',
  components: {
    DropInBio,
  },
  setup() {
    const askew = ref(true)
    const actionRef = ref()
    const actionAnim = ref()
    const actionLabel = ref("Don't be afraid")
    const bioText =
      "I'm a software engineer and I have been for three years. I work at Oregon Research Institute and Influents Innovations where I build and maintain web and mobile apps. I have an academic background in game-playing artificial intelligence and computer graphics."
    bioText.replace(' ', '&#160;')
    const brickClassName = 'brick'
    const bioHtml = generateBricksHtml(bioText, brickClassName)
    const bioPlaceholderHtml = generateBricksHtml(bioText, '')

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
      bioHtml,
      bioPlaceholderHtml,
      brickClassName,

      handleactionClicked,
    }
  },
})
</script>

<template>
  <ion-content>
    <div class="about-wrapper ion-padding max-width-sm">
      <div class="ion-text-center">
        <h1>Hi, I'm Alex</h1>
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
    <div class="bio-placeholder max-width-sm" v-html="bioPlaceholderHtml"></div>
    <drop-in-bio
      :bioHtml="bioHtml"
      :brickClassName="brickClassName"
      :shouldFall="!askew"
    />
  </ion-content>
</template>

<style scoped>
.bio-placeholder {
  padding-bottom: 16px;
  visibility: hidden;
  top: calc(50vh - 76px);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.about-wrapper {
  margin: auto;
}

.action {
  z-index: 10;
  cursor: pointer;
  height: 100px;
  width: 100px;
  position: relative;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
}
</style>
