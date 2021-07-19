<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundPage',
})
</script>

<template>
  <ion-content>
    <div class="not-found-message ion-text-center ion-padding">
      <h1><ion-text color="dark">404</ion-text></h1>
      <router-link to="/"><p>home</p></router-link>
    </div>
  </ion-content>
</template>

<style scoped>
.not-found-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
