<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { alertController } from '@ionic/core'

import DropInBlock from '@/components/DropInBlock.vue'

import { generateBricksHtml } from '@/utils/generate-bricks'

export default defineComponent({
  name: 'Home',
  components: {
    DropInBlock,
  },
  setup() {
    const texts = [
      "Hi there! I'm a software engineer and I have been for three years. I work for @link@Oregon&#160;Research&#160;Institute++http://www.ori.org/research++ and @link@Influents&#160;Innovations++https://influentsin.com++ where I build and maintain web and mobile apps. I have an academic background in game-playing artificial intelligence and computer graphics.",
    ]

    const learnMoreClickCount = ref(0)
    const allTextsDropped = computed(
      () => learnMoreClickCount.value >= texts.length,
    )

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
        header: "I'm glad you're interested",
        mode: 'ios',
        message: 'Would you like to start a conversation?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Email',
            handler: () => {
              window.location.href = `mailto:alexleong7@gmail.com`
            },
          },
        ],
      })
      stockAlert.present()
    }

    return {
      allTextsDropped,
      brickBlocks,
      buyNowSvg,
      learnMoreSvg,
      learnMoreDisabledSvg,
      learnMoreClickCount,

      handleBuyNow,
      handleLearnMore,
    }
  },
})
</script>

<template>
  <ion-header class="ion-no-border">
    <div class="ion-text-center">
      <h1 class="title">Alexander Leong</h1>
    </div>
    <div class="flex-row-center ion-padding">
      <span title="Learn more">
        <img
          alt="Learn more"
          :tabindex="allTextsDropped ? null : 1"
          role="button"
          :src="allTextsDropped ? learnMoreDisabledSvg : learnMoreSvg"
          @click="handleLearnMore"
          @keyup.enter="handleLearnMore"
          :class="
            allTextsDropped
              ? 'action-button nodrag noselect'
              : 'action-button clickable nodrag noselect'
          "
        />
      </span>
      <span title="Buy now">
        <img
          alt="Buy now"
          tabindex="2"
          role="button"
          :src="buyNowSvg"
          @click="handleBuyNow"
          @keyup.enter="handleBuyNow"
          class="action-button clickable nodrag noselect"
        />
      </span>
    </div>
  </ion-header>
  <ion-content fullscreen>
    <div class="flex-row-center">
      <div class="flex-col-center  max-width-md">
        <div v-for="(block, i) in brickBlocks" :key="block" class="ion-padding">
          <drop-in-block
            :clickCount="learnMoreClickCount"
            :group="i"
            :blockHtml="block"
          />
        </div>
      </div>
    </div>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <nav class="footer-link-container">
        <a
          class="footer-link"
          href="https://drive.google.com/file/d/16bkXpchOJi31h_W_tmh95OBpzUOMxgWX/view?usp=sharing"
          target="_blank"
        >
          Resume
        </a>
        <a
          class="footer-link"
          href="https://www.linkedin.com/in/alex-leong/"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          class="footer-link"
          href="https://github.com/a-Leong"
          target="_blank"
        >
          Github
        </a>
      </nav>
    </ion-toolbar>
  </ion-footer>
</template>

<style scoped>
@font-face {
  font-family: 'tnr-condensed';
  src: url('../assets/tnr-condensed.woff2');
}

.title {
  font-family: 'tnr-condensed';
  color: #0033eb;
  min-height: 0vw;
  font-size: calc(max(min(10vh, 10vw), 24px));
}

.footer-link-container {
  display: flex;
  justify-content: flex-end;
}

.footer-link {
  min-height: 0vw;
  font-size: calc(max(min(4vh, 4vw), 20px));
  margin: 16px;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-button {
  border-radius: 35%;
  min-height: 26px;
  height: calc(min(10vh, 10vw));
  transform: rotate(1deg);
}

.clickable {
  z-index: 10;
  cursor: pointer;
}

.action-button.clickable:hover:active {
  filter: invert(1);
}
</style>
