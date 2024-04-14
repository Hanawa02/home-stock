<template>
  <div class="w-full p-4 border-b shadow bg-white">
    <div class="flex w-full lg:max-w-7xl lg:mx-auto">
      <button class="leading-4 w-min text-blue-600 font-bold text-lg" @click="goToRootPage()">
        Home Stock
      </button>
      <UserAccountButton class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAccountButton from '@/components/atoms/buttons/user-account-button/index.vue'

import { useRouter } from 'vue-router'
import routes from '@/router/routes'

const router = useRouter()
function goToRootPage() {
  router.push({ name: routes.root.name })
}
</script>
