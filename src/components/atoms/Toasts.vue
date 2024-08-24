<template>
  <div
    v-show="hasToasts"
    class="fixed bottom-0 right-0 p-4 flex flex-col gap-4 w-full max-w-md z-50"
  >
    <TransitionGroup name="toast">
      <button
        v-for="toast in toasts"
        :key="toast.id"
        :class="['p-4 rounded-lg shadow-md', getBackgroundColor(toast)]"
        @click="removeToast(toast.id)"
        v-html="toast.text"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast, type Color, type Toast } from "~/composables/toast"
import { computed } from "vue"

const COLORS_STYLES: Record<Color, string> = {
  red: "bg-red-100",
  blue: "bg-indigo-100",
  yellow: "bg-yellow-100",
  green: "bg-green-100"
}

const { toasts, removeToast } = useToast()

const hasToasts = computed(() => {
  return toasts.value.length > 0
})

function getBackgroundColor(toast: Toast): string {
  return COLORS_STYLES[toast.color]
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
