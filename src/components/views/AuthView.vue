<template>
  <div class="flex w-full h-screen justify-center items-center p-4">
    <div class="shadow border border-gray-100 max-w-md mx-auto p-8 rounded-md">
      <h1 class="font-bold text-indigo-600 mb-8 text-2xl text-center">
        {{ auth_view__sign_in() }}
      </h1>
      <div class="flex justify-center w-full">
        <GoogleButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth_view__sign_in } from "~translations"

import GoogleButton from "~/components/atoms/buttons/GoogleButton.vue"
</script>
