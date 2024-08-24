<template>
  <div :class="[baseColorClasses, 'p-4 rounded border']">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type Color } from "~/common-types/color"
import { computed } from "vue"

const COLORS_STYLES: Record<Color, string> = {
  red: "bg-red-50 text-red-800 border-red-200",
  blue: "bg-indigo-50 text-indigo-800 border-indigo-200",
  yellow: "bg-yellow-50 text-yellow-800 border-yellow-200",
  green: "bg-green-50 text-green-800 border-green-200"
}

type Props = {
  color: Color
}

const props = withDefaults(defineProps<Props>(), {
  color: "blue"
})

const baseColorClasses = computed(() => {
  return COLORS_STYLES[props.color]
})
</script>
