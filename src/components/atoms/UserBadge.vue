<template>
  <img
    v-if="user?.photoURL"
    :class="[sizeClasses, 'rounded-full']"
    :src="user?.photoURL"
    :alt="user_badge__profile_image_alt_text()"
  />
  <div
    v-else
    :class="[
      sizeClasses,
      'rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600'
    ]"
  >
    {{ userInitials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { user_badge__profile_image_alt_text } from "~translations"

type User = {
  photoURL: string | null
  displayName: string | null
}

interface Props {
  user?: User
  size: "small" | "medium" | "large"
}

const props = withDefaults(defineProps<Props>(), { size: "medium" })

const SIZE_CLASSES = {
  small: "h-4 w-4",
  medium: "h-8 w-8",
  large: "h-16 w-16"
}

const sizeClasses = computed(() => {
  return SIZE_CLASSES[props.size]
})

const userInitials = computed(() => {
  const nameParts = props.user?.displayName?.split(" ")
  if (!nameParts || nameParts.length === 0) {
    return "You"
  }

  if (nameParts && nameParts?.length === 1) {
    return nameParts[0][0]
  }

  return nameParts[0][0] + nameParts[1][0]
})
</script>
