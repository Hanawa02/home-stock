<template>
  <button
    :class="[
      'w-10 h-10 p-2 rounded-full',
      'flex justify-center items-center flex-shrink-0',
      'bg-transparent text-indigo-800 hover:bg-indigo-800 hover:text-white hover:shadow-card'
    ]"
  >
    <CloseIcon class="w-6 h-6 md:w-8 md:h-8" />
  </button>
</template>

<script setup lang="ts">
import CloseIcon from "~icons/Close.vue"
</script>
