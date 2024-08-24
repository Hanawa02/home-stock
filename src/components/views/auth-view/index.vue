<template>
  <div class="flex w-full h-screen justify-center items-center p-4">
    <div class="shadow border border-gray-100 max-w-md mx-auto p-8 rounded-md">
      <h1 class="font-bold text-indigo-600 mb-8 text-2xl text-center">
        {{ translation.signIn() }}
      </h1>
      <div class="flex justify-center w-full">
        <GoogleButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLocalization } from "@/composables/localization"
import translations from "./translations"

import GoogleButton from "@/components/atoms/buttons/google-button/index.vue"

const localization = useLocalization()
const translation = computed(() => translations[localization.locale.value])
</script>
