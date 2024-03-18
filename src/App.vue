<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthView from '@/views/auth/AuthView.vue'
import Toasts from '@/components/atoms/toasts/index.vue'

import { getAuth } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
import { firebaseApp } from '@/firebase'

const auth = getAuth(firebaseApp)
const { isAuthenticated } = useAuth(auth)
</script>

<template>
  <Toasts />
  <RouterView v-if="isAuthenticated" />
  <AuthView v-else />
</template>
