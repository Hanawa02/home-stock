<template>
  <div class="flex flex-col">
    <button class="flex items-center gap-2" @click="togglePopover">
      <div class="truncate text-clip text-nowrap w-28 capitalize text-right">{{ visibleName }}</div>
      <img
        v-if="user?.photoURL"
        class="h-8 w-8 rounded-full"
        :src="user?.photoURL"
        alt="Profile picture"
      />
      <div
        v-else
        class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-blue-600"
      >
        {{ userInitials }}
      </div>
    </button>
    <div class="relative">
      <div
        v-if="isPopoverOpen"
        class="absolute min-w-32 top-2 right-0 z-50 bg-white border shadow-lg rounded-md p-2"
      >
        <button @click="logout">
          {{ translation.logout() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCurrentUser } from 'vuefire'
import { auth } from '@/firebase'

import { useLocalization } from '@/composables/localization'
import translations from './translations'
import { useRouter } from 'vue-router'
import routes from '@/router/routes'
import { useToast } from '@/composables/toast'

const localization = useLocalization()
const translation = computed(() => {
  return translations[localization.locale.value]
})

const user = useCurrentUser()

const nameParts = computed(() => user.value?.displayName?.split(' ') || ['You'])

const NAME_MAX_LENGTH = 20
const visibleName = computed(() => {
  let finalName = nameParts.value?.[0]

  for (let i = 1; i < nameParts.value?.length; i++) {
    if (finalName.length + nameParts.value[i].length > NAME_MAX_LENGTH) {
      break
    }

    finalName += ' ' + nameParts.value[i]
  }

  return finalName
})

const userInitials = computed(() => {
  if (!nameParts.value || nameParts.value.length === 0) {
    return 'You'
  }

  if (nameParts.value && nameParts.value?.length === 1) {
    return nameParts.value[0][0]
  }

  return nameParts.value[0][0] + nameParts.value[1][0]
})

const isPopoverOpen = ref(false)

function closePopover() {
  isPopoverOpen.value = false
}

function togglePopover() {
  isPopoverOpen.value = !isPopoverOpen.value

  if (isPopoverOpen.value) {
    setTimeout(() => window.addEventListener('click', closePopover, { once: true }), 100)
  }
}

const router = useRouter()
const toast = useToast()
function logout() {
  auth.signOut().then(() => {
    router.push({ name: routes.root.name })
    toast.addToast(translation.value.logoutSuccess(), { color: 'green' })
  })
}
</script>
