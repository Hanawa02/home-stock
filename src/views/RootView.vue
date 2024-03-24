<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '@/stores/homes'
import routes from '@/router/routes'

const homeStore = useHomeStore()
const homes = computed(() => homeStore.homes.value)

const homeRouteName = routes.homes.item.name
</script>

<template>
  <main>
    <h1 class="text-3xl text-center font-bold py-4 lg:text-5xl text-blue-600">Homes</h1>
    <ul class="p-4 grid md:grid-cols-2 lg:grid-cols-4">
      <li v-for="home in homes" :key="home.id">
        <router-link :to="{ name: homeRouteName, params: { id: home.id } }">
          <div
            class="shadow-card p-4 rounded text-center capitalize hover:shadow-card-hover hover:text-blue-600 hover:border-gray-100 cursor-pointer"
          >
            {{ home.name }}
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>
