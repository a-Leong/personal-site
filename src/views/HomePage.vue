<script lang="ts">
import { defineComponent } from 'vue'
import { IonSlide, IonSlides } from '@ionic/vue'

export default defineComponent({
  name: 'Home',
  components: {
    IonSlide,
    IonSlides,
  },
})
</script>

<template>
  <ion-slides>
    <ion-slide
      v-for="(color, idx) in ['brown', 'green', 'magenta']"
      :key="color"
    >
      <div class="ion-padding">
        <p>Hello world! {{ idx + 1 }}</p>
        <svg height="80" width="80">
          <circle cx="40" cy="40" r="40" :fill="color" />
        </svg>
      </div>
    </ion-slide>
  </ion-slides>
</template>
