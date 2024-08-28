<template>
  <button
    :class="[
      'disabled:bg-slate-300  text-white rounded-full shadow-card',
      'flex justify-center items-center flex-shrink-0',
      'p-2 w-10 h-10 md:w-12 md:h-12',
      baseColorClasses
    ]"
  >
    <slot class="w-6 h-6 md:w-8 md:h-8" />
  </button>
</template>

<script setup lang="ts">
import { type Color } from "~/common-types/color"
import { computed } from "vue"

const COLORS_STYLES: Record<Color, string> = {
  red: "bg-red-800 hover:bg-red-500 border-red-200",
  blue: "bg-indigo-800 hover:bg-indigo-500 border-indigo-200",
  yellow: "bg-yellow-800 hover:bg-yellow-500 border-yellow-200",
  green: "bg-green-800 hover:bg-green-500 border-green-200"
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
