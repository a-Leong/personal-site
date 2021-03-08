<script lang="ts">
import { defineComponent } from 'vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import useDarkMode from '@/composables/use-dark-mode'

export default defineComponent({
  name: 'Settings',
  components: { IonSegment, IonSegmentButton },
  setup() {
    const { displayMode, setDisplayMode } = useDarkMode()

    return {
      displayMode,
      setDisplayMode,
    }
  },
})
</script>

<template>
  <div>
    <ion-segment
      :value="displayMode"
      @ionChange="setDisplayMode($event.detail.value)"
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
