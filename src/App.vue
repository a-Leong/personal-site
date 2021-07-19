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
    </ion-page>
  </ion-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@600;700&family=Montserrat&display=swap');

h1 {
  font-family: 'Fira Code', monospace;
}

span {
  font-family: 'Fira Code', monospace;
}

p {
  font-family: 'Montserrat', sans-serif;
}

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

.nodrag {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>
