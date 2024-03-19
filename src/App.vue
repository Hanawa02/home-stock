<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthView from '@/views/auth/AuthView.vue'
import Toasts from '@/components/atoms/toasts/index.vue'

import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <Toasts />
  <RouterView v-if="user !== null" />
  <AuthView v-else />
</template>
