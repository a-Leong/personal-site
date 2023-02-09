<script setup lang="ts">
import { computed, ref } from 'vue'

import DropInBlock from '@/components/DropInBlock.vue'

import { generateBricksHtml, parseForSR } from '@/utils/bio-parser'

const texts = [
  "Hi there! I'm a software lead at the NPO @link@Oregon&#160;Research&#160;Institute++http://www.ori.org/research++ and @link@Influents&#160;Innovations++https://influentsin.com++ where I build and maintain web and mobile apps.",
  'I have an academic background in game-playing artificial intelligence and computer graphics.',
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

function handleLearnMore() {
  learnMoreClickCount.value += 1
}
</script>

<template>
  <ion-header class="ion-no-border">
    <div class="ion-text-center">
      <h1 class="title"><span class="glyph-a">A</span>lex Leong</h1>
    </div>
    <div class="flex-row-center ion-padding">
      <span title="Learn more">
        <img
          :aria-disabled="allTextsDropped"
          role="button"
          alt="Learn more"
          :src="allTextsDropped ? learnMoreDisabledSvg : learnMoreSvg"
          @click="handleLearnMore"
          @keyup.enter="handleLearnMore"
          tabindex="0"
          :class="
            allTextsDropped
              ? 'action-button nodrag noselect'
              : 'action-button clickable nodrag noselect'
          "
        />
      </span>
    </div>
  </ion-header>
  <ion-content fullscreen>
    <ion-grid class="max-width-md" aria-hidden>
      <ion-row class="ion-justify-content-center">
        <ion-col size="auto">
          <drop-in-block
            v-for="(block, i) in brickBlocks"
            :key="block"
            :clickCount="learnMoreClickCount"
            :group="i"
            :blockHtml="block"
          />
        </ion-col>
      </ion-row>
    </ion-grid>

    <p v-for="(text, i) in texts" :key="i" class="sr-only">
      {{ parseForSR(text) }}
    </p>
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar>
      <nav class="footer-link-container">
        <a
          class="footer-link"
          href="https://drive.google.com/file/d/1xYywYeWP9G_g1ps1HGQysF0HtaTAEb8e/view?usp=sharing"
          target="_blank"
          tabindex="0"
        >
          Resume
        </a>
        <a
          class="footer-link"
          href="https://www.linkedin.com/in/alex-leong/"
          target="_blank"
          tabindex="0"
        >
          LinkedIn
        </a>
        <a
          class="footer-link"
          href="https://github.com/a-Leong"
          target="_blank"
          tabindex="0"
        >
          Github
        </a>
      </nav>
    </ion-toolbar>
  </ion-footer>
</template>

<style scoped>
.title {
  color: black;
  font-family: itc-avant-garde-gothic-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  min-height: 0vw;
  font-size: calc(max(min(10vh, 10vw), 24px));
}

.glyph-a {
  font-feature-settings: 'salt' 1;
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

.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
