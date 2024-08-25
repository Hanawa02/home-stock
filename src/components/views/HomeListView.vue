<template>
  <main class="p-4 h-full">
    <h1 class="mb-6">
      {{ home_list_view__title() }}
    </h1>

    <ul v-if="hasHomes" class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <li v-for="home in homes" :key="home.id">
        <router-link :to="{ name: homeRouteName, params: { id: home.id } }">
          <div
            class="shadow-card p-4 rounded text-center capitalize hover:shadow-card-hover hover:text-indigo-600 hover:border-gray-100 cursor-pointer border border-indigo-300"
          >
            {{ home.name }}
          </div>
        </router-link>
      </li>
    </ul>
    <InfoBox v-if="!hasHomes" class="text-lg mb-6">{{ home_list_view__no_home() }}</InfoBox>

    <div class="sticky bottom-4 pt-4 mt-4">
      <ActionButton class="w-full min-w-64">{{ home_list_view__create_home() }}</ActionButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useHomeStore } from "~/stores/homes"
import routes from "~/router/routes"
import {
  home_list_view__title,
  home_list_view__no_home,
  home_list_view__create_home
} from "~translations"

import ActionButton from "~/components/atoms/buttons/ActionButton.vue"
import InfoBox from "~/components/atoms/InfoBox.vue"

const homeStore = useHomeStore()
const homes = homeStore.homes

const homeRouteName = routes.home.shoppingList.name

const hasHomes = computed(() => homes.length > 0)
</script>
