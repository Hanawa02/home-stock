<template>
  <Toasts />
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"

import { setLanguageTag } from "~i18n"

import Toasts from "~/components/atoms/Toasts.vue"
import DefaultLayout from "~/components/layouts/Default.vue"

setLanguageTag("en")
</script>

<style scoped>
.app-grid-rows {
  grid-template-rows: auto 1fr;
}
</style>
