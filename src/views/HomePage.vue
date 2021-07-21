<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { alertController, createAnimation } from '@ionic/core'

import DropInBio from '@/components/DropInBio.vue'

import { generateBricksHtml } from '@/utils/generate-bricks'

export default defineComponent({
  name: 'Home',
  components: {
    DropInBio,
  },
  setup() {
    const actionClickCount = ref(0)
    const actionRef = ref()
    const actionAnim = ref()
    const bioText =
      "Hi there! I'm a software engineer and I have been for three years. I work at Oregon Research Institute and Influents Innovations where I build and maintain web and mobile apps. I have an academic background in game-playing artificial intelligence and computer graphics."
    bioText.replace(' ', '&#160;')
    const brickClassName = 'brick'
    const bioHtml = generateBricksHtml(bioText, brickClassName)

    const learnMoreAction = computed(() => require('@/assets/learn-more.svg'))
    const buyNowAction = computed(() => require('@/assets/buy-now.svg'))

    const actionSrc = computed(() =>
      actionClickCount.value === 0 ? learnMoreAction.value : buyNowAction.value,
    )

    onMounted(() => {
      actionAnim.value = createAnimation()
        .addElement(actionRef.value)
        .duration(400)
        .keyframes([
          { offset: 0, transform: 'translateX(-50%) rotate(0deg)' },
          { offset: 0.3, transform: 'translateX(-50%) rotate(-2deg)' },
          { offset: 1, transform: 'translateX(-50%) rotate(5deg)' },
        ])
    })

    async function handleActionClicked() {
      actionClickCount.value += 1
      if (actionClickCount.value === 1) {
        actionAnim.value && actionAnim.value.play()
      } else if (actionClickCount.value > 1) {
        const stockAlert = await alertController.create({
          header: 'Out of stock',
          mode: 'ios',
          message: 'Would you like to send an email to indicate your interest?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Email',
              handler: () => {
                window.location.href = `mailto:alexleong7@gmail.com?subject=Inquiry about Alex Leong`
              },
            },
          ],
        })
        stockAlert.present()
      }
    }

    return {
      actionClickCount,
      actionRef,
      actionSrc,
      bioHtml,
      brickClassName,

      handleActionClicked,
    }
  },
})
</script>

<template>
  <ion-header class="ion-no-border">
    <div class="ion-padding ion-text-center">
      <h1 class="title">Alex Leong</h1>
    </div>
  </ion-header>
  <ion-content fullscreen>
    <drop-in-bio
      :bioHtml="bioHtml"
      :brickClassName="brickClassName"
      :shouldFall="actionClickCount === 1"
    />
    <img
      ref="actionRef"
      :src="actionSrc"
      @click="handleActionClicked"
      alt="action"
      class="action nodrag noselect"
    />
  </ion-content>
</template>

<style scoped>
.title {
  font-size: calc(min(10vh, 10vw));
}

.action {
  cursor: pointer;
  border-radius: 40%;
  width: calc(min(30vh, 30vw));
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.action:hover:active {
  filter: invert(1);
}
</style>
