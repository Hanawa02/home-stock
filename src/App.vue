<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthView from '@/views/auth/AuthView.vue'
import Toasts from '@/components/atoms/toasts/index.vue'
import LoggedInHeader from '@/components/molecules/headers/logged-in-header/index.vue'

import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <Toasts />
  <div v-if="user !== null" class="w-full">
    <LoggedInHeader />
    <div class="w-full overflow-x-auto">
      <RouterView />
    </div>
  </div>
  <AuthView v-else />
</template>
