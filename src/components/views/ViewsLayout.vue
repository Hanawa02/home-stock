<template>
  <div class="w-full h-svh grid app-grid-rows">
    <BaseHeader class="z-50" />

    <div class="w-full overflow-x-auto h-full">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseHeader from "~/components/molecules/BaseHeader.vue"
</script>
