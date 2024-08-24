<template>
  <div class="flex flex-col">
    <button class="flex items-center gap-2" @click="togglePopover">
      <div class="truncate text-clip text-nowrap w-28 capitalize text-right">{{ visibleName }}</div>
      <UserBadge size="medium" :user="user ?? undefined" />
    </button>
    <div class="relative">
      <div
        v-if="isPopoverOpen"
        class="absolute min-w-32 top-2 right-0 z-50 bg-white border shadow-lg rounded-md p-2"
      >
        <button @click="logout">
          {{ user_account_button__logout() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useCurrentUser } from "vuefire"
import { auth } from "~/firebase"

import { useRouter } from "vue-router"
import routes from "~/router/routes"
import { useToast } from "~/composables/toast"
import {
  user_account_button__logout,
  user_account_button__logout_success_toast
} from "~translations"

import UserBadge from "~/components/atoms/UserBadge.vue"

const user = useCurrentUser()

const nameParts = computed(() => user.value?.displayName?.split(" ") || ["You"])

const NAME_MAX_LENGTH = 20
const visibleName = computed(() => {
  let finalName = nameParts.value?.[0]

  for (let i = 1; i < nameParts.value?.length; i++) {
    if (finalName.length + nameParts.value[i].length > NAME_MAX_LENGTH) {
      break
    }

    finalName += " " + nameParts.value[i]
  }

  return finalName
})

const isPopoverOpen = ref(false)

function closePopover() {
  isPopoverOpen.value = false
}

function togglePopover() {
  isPopoverOpen.value = !isPopoverOpen.value

  if (isPopoverOpen.value) {
    setTimeout(() => window.addEventListener("click", closePopover, { once: true }), 100)
  }
}

const router = useRouter()
const toast = useToast()
function logout() {
  auth.signOut().then(() => {
    router.push({ name: routes.homeList.name })
    toast.addToast(user_account_button__logout_success_toast(), { color: "green" })
  })
}
</script>
