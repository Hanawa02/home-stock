<template>
  <Toasts />
  <ViewsLayout>
    <RouterView />
  </ViewsLayout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"

import { setLanguageTag } from "~i18n"

import Toasts from "~/components/atoms/Toasts.vue"
import ViewsLayout from "~/components/views/ViewsLayout.vue"

setLanguageTag("en")
</script>

<style scoped>
.app-grid-rows {
  grid-template-rows: auto 1fr;
}
</style>
