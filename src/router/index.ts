import { createRouter, createWebHistory } from "vue-router"
import HomeListView from "~/components/views/HomeListView.vue"
import HomeViewsLayout from "~/components/views/home/HomeViewsLayout.vue"
import HomeShoppingListView from "~/components/views/home/ShoppingListView.vue"
import HomeSettingsView from "~/components/views/home/SettingsView.vue"

import routes from "./routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: routes.homeList.path, name: routes.homeList.name, component: HomeListView },
    {
      path: routes.home.settings.path,
      name: "homes",
      component: HomeViewsLayout,
      children: [
        { ...routes.home.shoppingList, component: HomeShoppingListView },
        { ...routes.home.stock, component: HomeShoppingListView },
        { ...routes.home.settings, component: HomeSettingsView }
      ]
    }
  ]
})

export default router
