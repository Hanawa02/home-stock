import { defineStore } from "pinia"

import { useStorage } from "@vueuse/core"

export type Item = {
  id: string
  title: string
}

export type StockItem = Item & {
  inStock: number
  idealStock: number
}

export type ShoppingItem = Item & {
  quantity: number
}

export type Home = {
  id: string
  name: string
  stockItems: StockItem[]
  shoppingList: ShoppingItem[]
}

const HOME_STORAGE_KEY = "hs.homes"

export const useHomeStore = defineStore("homes", () => {
  const homes = useStorage<Home[]>(HOME_STORAGE_KEY, [
    { id: "1", name: "Home 1", stockItems: [], shoppingList: [] }
  ])

  const homeById = (id: string) => {
    return homes.value?.find((home) => home.id === id)
  }

  return {
    homes,
    homeById
  }
})
