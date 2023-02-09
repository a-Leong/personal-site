import { createApp } from 'vue'
import '@ionic/core/css/ionic.bundle.css'
import App from './App.vue'
import Router from './router-config'

import {
  // Ionic components to be registered globally
  IonicVue,
  IonApp,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonTextarea,
} from '@ionic/vue'
import { addIcons } from 'ionicons'

import {
  // Ionicons to be registered globally
  add,
  addCircleOutline,
  analytics,
  arrowBack,
  arrowForward,
  book,
  bookmark,
  calendar,
  camera,
  caretBack,
  caretForward,
  caretUpCircle,
  caretDownCircle,
  chevronBack,
  chevronForward,
  chevronUp,
  close,
  cloudUpload,
  create,
  createOutline,
  eye,
  eyeOff,
  list,
  mail,
  menu,
  moon,
  pencil,
  people,
  personAdd,
  ribbon,
  school,
  send,
  settings,
  sunny,
  time,
  trash,
  videocam,
  chatbox,
  notifications,
} from 'ionicons/icons'

addIcons({
  // Register any Ionicons used in the app
  // Icons with hyphenated names need to be added like this:
  // 'example-icon': exampleIcon
  add,
  'add-circle-outline': addCircleOutline,
  analytics,
  'arrow-back': arrowBack,
  'arrow-forward': arrowForward,
  book,
  bookmark,
  calendar,
  camera,
  'caret-back': caretBack,
  'caret-forward': caretForward,
  'caret-up-circle': caretUpCircle,
  'caret-down-circle': caretDownCircle,
  'chevron-back': chevronBack,
  'chevron-forward': chevronForward,
  'chevron-up': chevronUp,
  close,
  'cloud-upload': cloudUpload,
  create,
  'create-outline': createOutline,
  eye,
  'eye-off': eyeOff,
  list,
  mail,
  menu,
  moon,
  pencil,
  people,
  'person-add': personAdd,
  ribbon,
  time,
  trash,
  school,
  send,
  settings,
  sunny,
  videocam,
  chatbox,
  notifications,
})

const app = createApp(App)
app.component('ion-app', IonApp)
app.component('ion-avatar', IonAvatar)
app.component('ion-button', IonButton)
app.component('ion-buttons', IonButtons)
app.component('ion-card', IonCard)
app.component('ion-card-content', IonCardContent)
app.component('ion-card-header', IonCardHeader)
app.component('ion-card-subtitle', IonCardSubtitle)
app.component('ion-card-title', IonCardTitle)
app.component('ion-col', IonCol)
app.component('ion-content', IonContent)
app.component('ion-fab', IonFab)
app.component('ion-fab-button', IonFabButton)
app.component('ion-fab-list', IonFabList)
app.component('ion-footer', IonFooter)
app.component('ion-grid', IonGrid)
app.component('ion-header', IonHeader)
app.component('ion-icon', IonIcon)
app.component('ion-img', IonImg)
app.component('ion-input', IonInput)
app.component('ion-item', IonItem)
app.component('ion-label', IonLabel)
app.component('ion-list', IonList)
app.component('ion-list-header', IonListHeader)
app.component('ion-modal', IonModal)
app.component('ion-note', IonNote)
app.component('ion-page', IonPage)
app.component('ion-reorder', IonReorder)
app.component('ion-reorder-group', IonReorderGroup)
app.component('ion-row', IonRow)
app.component('ion-select', IonSelect)
app.component('ion-select-option', IonSelectOption)
app.component('ion-spinner', IonSpinner)
app.component('ion-text', IonText)
app.component('ion-textarea', IonTextarea)
app.component('ion-title', IonTitle)
app.component('ion-toggle', IonToggle)
app.component('ion-toolbar', IonToolbar)
app
  .use(Router)
  .use(IonicVue, { mode: 'ios' })
  .mount('#app')
