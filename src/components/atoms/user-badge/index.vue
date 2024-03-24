<template>
  <img
    v-if="user?.photoURL"
    :class="[sizeClasses, 'rounded-full']"
    :src="user?.photoURL"
    alt="Profile picture"
  />
  <div
    v-else
    :class="[sizeClasses, 'rounded-full bg-blue-50 flex items-center justify-center text-blue-600']"
  >
    {{ userInitials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type User = {
  photoURL?: string
  displayName?: string
}

interface Props {
  user?: User
  size: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), { size: 'medium' })

const SIZE_CLASSES = {
  small: 'h-4 w-4',
  medium: 'h-8 w-8',
  large: 'h-16 w-16'
}

const sizeClasses = computed(() => {
  return SIZE_CLASSES[props.size]
})

const userInitials = computed(() => {
  const nameParts = props.user?.displayName?.split(' ')
  if (!nameParts || nameParts.length === 0) {
    return 'You'
  }

  if (nameParts && nameParts?.length === 1) {
    return nameParts[0][0]
  }

  return nameParts[0][0] + nameParts[1][0]
})
</script>
