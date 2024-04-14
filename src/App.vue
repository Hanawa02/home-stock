<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthView from '@/components/views/auth-view/index.vue'
import Toasts from '@/components/atoms/toasts/index.vue'
import LoggedInHeader from '@/components/molecules/headers/logged-in-header/index.vue'

import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <Toasts />
  <div v-if="user !== null" class="w-full bg-blue-100 h-svh grid app-grid-rows">
    <LoggedInHeader class="z-50" />
    <div class="w-full overflow-x-auto h-full">
      <RouterView />
    </div>
  </div>
  <AuthView v-else />
</template>

<style scoped>
.app-grid-rows {
  grid-template-rows: auto 1fr;
}
</style>
