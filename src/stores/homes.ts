import { defineStore } from "pinia"
import { useCollection } from "vuefire"
import { homes } from "@/firebase/database"
import { computed } from "vue"
import { useCurrentUser } from "vuefire"

export const useHomeStore = defineStore("homes", () => {
  const user = useCurrentUser()

  const userHomes = computed(() => useCollection(homes(user.value?.uid || "")))

  function homeById(id: string) {
    return userHomes.value.value?.find((home) => home.id === id)
  }

  return { homes: userHomes, homeById }
})
