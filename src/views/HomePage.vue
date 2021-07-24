<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { alertController } from '@ionic/core'

import DropInBio from '@/components/DropInBio.vue'

import { generateBricksHtml } from '@/utils/generate-bricks'

export default defineComponent({
  name: 'Home',
  components: {
    DropInBio,
  },
  setup() {
    const texts = [
      "Hi there! I'm a software engineer and I have been for three years. I work at @Oregon&#160;Research&#160;Institute++http://www.ori.org/research++ and @Influents&#160;Innovations++https://influentsin.com++ where I build and maintain web and mobile apps. I have an academic background in game-playing artificial intelligence and computer graphics.",
      'You can check out my @resume++https://drive.google.com/file/d/16bkXpchOJi31h_W_tmh95OBpzUOMxgWX/view?usp=sharing++ for more.',
    ]

    const learnMoreClickCount = ref(0)

    const brickBlocks = texts.map((textBlock, i) =>
      generateBricksHtml(textBlock, i),
    )

    const learnMoreSvg = computed(() => require('@/assets/learn-more.svg'))
    const learnMoreDisabledSvg = computed(() =>
      require('@/assets/learn-more-disabled.svg'),
    )
    const buyNowSvg = computed(() => require('@/assets/buy-now.svg'))

    async function handleLearnMore() {
      learnMoreClickCount.value += 1
    }

    async function handleBuyNow() {
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
              window.location.href = `mailto:alexleong7@gmail.com?subject=Inquiry regarding Alex Leong`
            },
          },
        ],
      })
      stockAlert.present()
    }

    return {
      brickBlocks,
      buyNowSvg,
      learnMoreSvg,
      learnMoreDisabledSvg,
      learnMoreClickCount,

      handleLearnMore,
      handleBuyNow,
    }
  },
})
</script>

<template>
  <ion-header class="ion-no-border">
    <div class="ion-text-center">
      <h1 class="title">Alexander Leong</h1>
    </div>
    <div class="actions-wrapper ion-padding">
      <img
        :src="
          learnMoreClickCount < brickBlocks.length
            ? learnMoreSvg
            : learnMoreDisabledSvg
        "
        @click="handleLearnMore"
        alt="Learn More"
        :class="
          learnMoreClickCount < brickBlocks.length
            ? 'action nodrag noselect'
            : 'action-disabled nodrag noselect'
        "
      />
      <img
        :src="buyNowSvg"
        @click="handleBuyNow"
        alt="Buy Now"
        class="action nodrag noselect"
      />
    </div>
  </ion-header>
  <ion-content fullscreen>
    <div
      v-for="(block, i) in brickBlocks"
      :key="block"
      class="bio-container ion-padding"
    >
      <drop-in-bio
        :clickCount="learnMoreClickCount"
        :group="i"
        :bioHtml="block"
      />
    </div>
  </ion-content>
</template>

<style scoped>
@font-face {
  font-family: 'changes';
  src: url('../assets/changes.woff') format('woff');
}
.title {
  font-family: changes;
  color: #0033eb;
  font-weight: 500;
  font-size: calc(max(min(10vh, 10vw), 24px));
}

.bio-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.actions-wrapper {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
}

.action {
  z-index: 10;
  cursor: pointer;
  border-radius: 35%;
  height: calc(max(min(10vh, 10vw), 26px));
  transform: rotate(1deg);
}

.action:hover:active {
  filter: invert(1);
}

.action-disabled {
  border-radius: 35%;
  height: calc(max(min(10vh, 10vw), 26px));
  transform: rotate(1deg);
}
</style>
