<template>
  <div class="w-full fixed z-50 top-0 left-0 right-0 p-4 border-b shadow bg-white">
    <div class="flex w-full lg:max-w-7xl lg:mx-auto">
      <div class="leading-4 w-min text-blue-600 font-bold text-lg">Home Stock</div>
      <UserAccountButton class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAccountButton from '@/components/atoms/buttons/user-account-button/index.vue'
</script>
