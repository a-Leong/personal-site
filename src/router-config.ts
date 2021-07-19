import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from './views/HomePage.vue'
import NotFoundPage from './views/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
