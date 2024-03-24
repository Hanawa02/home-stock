<template>
  <button
    @click="goBack"
    class="p-2 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:shadow-card"
  >
    <ArrowBackIcon class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ArrowBackIcon from '@/components/atoms/icons/ArrowBackIcon.vue'

const router = useRouter()

function goBack(): void {
  router.go(-1)
}
</script>
