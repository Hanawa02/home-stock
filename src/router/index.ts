import { createRouter, createWebHistory } from 'vue-router'
import RootView from '@/components/views/RootView.vue'
import HomeView from '@/components/views/home-view/index.vue'
import HomeShoppingListView from '@/components/views/home-view/shopping-list-view/index.vue'
import HomeSettingsView from '@/components/views/home-view/settings-view/index.vue'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: routes.root.path, name: routes.root.name, component: RootView },
    {
      path: routes.homes.settings.path,
      name: 'homes',
      component: HomeView,
      children: [
        { path: '', name: routes.homes.settings.name, component: HomeSettingsView },
        { ...routes.homes.shoppingList, component: HomeShoppingListView },
        { ...routes.homes.stock, component: HomeShoppingListView }
      ]
    }
  ]
})

export default router
