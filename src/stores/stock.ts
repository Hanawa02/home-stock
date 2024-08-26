import { defineStore } from "pinia"

import { type Item, useHomeStore } from "~/stores/homes"

export const useStockStore = defineStore("stock", () => {
  const homeStore = useHomeStore()

  const stockItems = (id: string) => {
    const home = homeStore.homeById(id)

    if (!home) {
      return []
    }

    return home.stockItems
  }

  const addToStock = (homeId: string, item: Item, quantity: number = 0) => {
    const home = homeStore.homeById(homeId)

    if (!home) {
      return
    }

    const existingItem = home.stockItems.find((stockItem) => stockItem.id === item.id)

    if (existingItem) {
      existingItem.inStock += quantity
    } else {
      home.stockItems.push({ ...item, inStock: quantity, idealStock: quantity })
    }
  }

  const removeFromStock = (id: string, item: Item) => {
    const home = homeStore.homeById(id)

    if (!home) {
      return
    }

    home.stockItems = home.stockItems.filter((stockItem) => stockItem.id !== item.id)
  }

  return {
    removeFromStock,
    addToStock,
    stockItems
  }
})
