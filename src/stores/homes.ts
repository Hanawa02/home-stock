import { defineStore } from "pinia"

import { useStorage } from "@vueuse/core"
import type { StockItem } from "~/common-types/stock-item"

export type Home = {
  id: string
  name: string
  stock: StockItem[]
}

const HOME_STORAGE_KEY = "hs.homes"

export const useHomeStore = defineStore("homes", () => {
  const homes = useStorage<Home[]>(HOME_STORAGE_KEY, [{ id: "1", name: "Home 1", stock: [] }])

  function homeById(id: string) {
    return homes.value?.find((home) => home.id === id)
  }

  return { homes, homeById }
})
