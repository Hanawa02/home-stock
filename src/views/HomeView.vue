<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '@/stores/homes'
import { useRouter } from 'vue-router'

import GoBackButton from '@/components/atoms/buttons/go-back-button/index.vue'

const router = useRouter()
const homeId = computed(() => router.currentRoute.value.params.id)

const homeStore = useHomeStore()
const home = computed(() => homeStore.homeById(homeId.value.toString()))
</script>

<template>
  <main v-if="home">
    <h1>
      <GoBackButton class="absolute left-2" />
      {{ home.name }}
    </h1>
  </main>
</template>
