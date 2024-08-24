<template>
  <div class="w-full p-4 border-b shadow bg-white">
    <div class="flex w-full lg:max-w-7xl lg:mx-auto">
      <button class="leading-4 w-min text-indigo-600 font-bold text-lg" @click="goToHomeListPage()">
        {{ common__app_name() }}
      </button>
      <UserAccountButton v-if="user !== null" class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAccountButton from "~/components/atoms/buttons/UserAccountButton.vue"

import { useRouter } from "vue-router"
import routes from "~/router/routes"
import { common__app_name } from "~translations"

import { useCurrentUser } from "vuefire"

const user = useCurrentUser()

const router = useRouter()
function goToHomeListPage() {
  router.push({ name: routes.homeList.name })
}
</script>
