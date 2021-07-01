<script lang="ts">
import { defineComponent } from 'vue'

import useDisplayTheme from './composables/use-display-theme'

export default defineComponent({
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
  <ion-app>
    <ion-page>
      <router-view />
      <ion-fab horizontal="end" vertical="bottom">
        <ion-fab-button @click="toggleDisplayTheme" color="light">
          <ion-icon v-show="displayTheme === 'dark'" name="sunny" />
          <ion-icon v-show="displayTheme === 'light'" name="moon" />
        </ion-fab-button>
      </ion-fab>
    </ion-page>
  </ion-app>
</template>

<style>
.max-width-sm {
  max-width: 576px;
}

.max-width-md {
  max-width: 768px;
}

.max-width-lg {
  max-width: 992px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Edge, Opera and Firefox */
}
</style>
