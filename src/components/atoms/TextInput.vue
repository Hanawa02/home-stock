<template>
  <input
    type="text"
    class="w-full border p-3 rounded shadow-md outline-indigo-200 outline-offset-2 hide-dropdown-icon"
    v-model="modelValue"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel()
</script>
