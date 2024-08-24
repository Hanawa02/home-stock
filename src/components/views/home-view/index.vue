<template>
  <main v-if="home" class="contained-grid home-view-grid-rows">
    <h1 class="relative">
      <GoBackButton class="absolute left-2" />
      {{ home.name }}
    </h1>

    <RouterView />

    <BottomMenu :menu-items="menuItems" class="z-50" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useHomeStore } from "~/stores/homes"
import { useRouter } from "vue-router"

import GoBackButton from "~/components/atoms/buttons/go-back-button/index.vue"
import BottomMenu from "~/components/molecules/menus/bottom-menu/index.vue"
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
    clickFunction: () =>
      router.push({ name: routes.homes.shoppingList.name, params: { id: homeId.value } })
  },
  {
    label: bottom_menu__stock(),
    icon: "inventory",
    clickFunction: () =>
      router.push({ name: routes.homes.stock.name, params: { id: homeId.value } })
  },
  {
    label: bottom_menu__settings(),
    icon: "settings",
    clickFunction: () =>
      router.push({ name: routes.homes.settings.name, params: { id: homeId.value } })
  }
])
</script>

<style scoped>
.home-view-grid-rows {
  grid-template-rows: auto 1fr auto;
}
</style>
