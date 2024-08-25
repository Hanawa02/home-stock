<template>
  <main v-if="home" class="contained-grid home-view-grid-rows">
    <h1 class="relative p-4">
      <GoBackButton class="absolute left-2" />
      {{ home.name }}
    </h1>

    <RouterView />

    <BottomMenu :menu-items="menuItems" class="z-50" />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useHomeStore } from "~/stores/homes"
import { useRouter } from "vue-router"

import GoBackButton from "~/components/atoms/buttons/GoBackButton.vue"
import BottomMenu from "~/components/molecules/BottomMenu.vue"
import routes from "~/router/routes"

import {
  bottom_menu__settings,
  bottom_menu__shopping_list,
  bottom_menu__stock
} from "~translations"

const router = useRouter()
const homeId = computed(() => router.currentRoute.value.params.id)

const homeStore = useHomeStore()
const home = computed(() => homeStore.homeById(homeId.value.toString()))

const menuItems = computed(() => [
  {
    label: bottom_menu__shopping_list(),
    icon: "shopping_cart",
    routeName: routes.home.shoppingList.name,
    routeParams: { id: homeId.value }
  },
  {
    label: bottom_menu__stock(),
    icon: "inventory",
    routeName: routes.home.stock.name,
    routeParams: { id: homeId.value }
  },
  {
    label: bottom_menu__settings(),
    icon: "settings",
    routeName: routes.home.settings.name,
    routeParams: { id: homeId.value }
  }
])
</script>

<style scoped>
.home-view-grid-rows {
  grid-template-rows: auto 1fr auto;
}
</style>
