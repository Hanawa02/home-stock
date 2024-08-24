<template>
  <button
    @click="goBack"
    :class="[
      'flex shrink-0 p-2 rounded-full text-base',
      'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 hover:shadow-card'
    ]"
    aria-label=""
  >
    <ArrowLeftIcon class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import ArrowLeftIcon from "icons/ArrowLeft.vue"
const router = useRouter()

function goBack(): void {
  router.go(-1)
}
</script>
