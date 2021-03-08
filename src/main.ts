import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import App from './App.vue'
import Router from './router-config'

createApp(App)
  .use(Router)
  .use(IonicVue)
  .mount('#app')
