<script lang="ts">
import { defineComponent } from 'vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import useDisplayTheme from '@/composables/use-display-theme'

export default defineComponent({
  name: 'Settings',
  components: { IonSegment, IonSegmentButton },
  setup() {
    const { displayTheme, setDisplayTheme } = useDisplayTheme()

    return {
      displayTheme,
      setDisplayTheme,
    }
  },
})
</script>

<template>
  <div>
    <ion-segment
      :value="displayTheme"
      @ionChange="setDisplayTheme($event.detail.value)"
    >
      <ion-segment-button
        v-for="mode in ['Auto', 'Dark', 'Light']"
        :key="mode"
        :value="mode"
      >
        {{ mode }}
      </ion-segment-button>
    </ion-segment>
  </div>
</template>
