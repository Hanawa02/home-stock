import { createRouter, createWebHistory } from 'vue-router'
import RootView from '@/views/RootView.vue'
import HomeView from '@/views/HomeView.vue'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: routes.root.path, name: routes.root.name, component: RootView },
    { path: routes.homes.item.path, name: routes.homes.item.name, component: HomeView }
  ]
})

export default router
