<script lang="ts">
import { defineComponent } from 'vue'

import Banner from '@/components/Banner.vue'
import useDisplayTheme from '@/composables/use-display-theme'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
  },
  setup() {
    const { displayTheme, setDisplayMode } = useDisplayTheme()

    function toggleDisplayTheme() {
      if (displayTheme.value === 'light') {
        setDisplayMode('dark')
      } else {
        setDisplayMode('light')
      }
    }

    return {
      displayTheme,

      toggleDisplayTheme,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-content class="content">
      <banner />
      <div class="about-wrapper ion-padding max-width-md">
        <div class="ion-text-center">
          <h1>Hi, I'm Alex</h1>
        </div>
        <div>
          <p>
            Professionally, I've been a software engineer for three years. Right
            now I work at
            <a href="http://www.ori.org/research">Oregon Research Institute</a>
            and
            <a href="https://influentsin.com/">Influents Innovations</a>. My
            focus is web development, but I have an academic background in
            game-playing artificial intelligence and computer graphics.
          </p>
          <p>This website is currently under development.</p>
          <p>
            Reach out via email, if you like:
            <a href="mailto:alexleong7@gmail.com">alexleong7@gmail.com</a>.
          </p>
        </div>
      </div>
      <img src="../assets/peace.svg" alt="peace" class="hidden-peace" />

      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button @click="toggleDisplayTheme" color="light">
          <ion-icon v-show="displayTheme === 'dark'" name="sunny" />
          <ion-icon v-show="displayTheme === 'light'" name="moon" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.content {
  overflow: visible;
}
.about-wrapper {
  margin: auto;
}

.hidden-peace {
  height: 100px;
  width: 100px;
  position: sticky;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
