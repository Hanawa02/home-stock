import { defineStore } from "pinia"

import { type ShoppingItem, type Item, useHomeStore } from "~/stores/homes"
import { useStockStore } from "~/stores/stock"

export const useShoppingListStore = defineStore("shopping-list", () => {
  const homeStore = useHomeStore()
  const stockStore = useStockStore()

  const shoppingList = (id: string) => {
    const home = homeStore.homeById(id)

    if (!home) {
      return []
    }

    return home.shoppingList
  }

  const addToShoppingList = (homeId: string, item: ShoppingItem) => {
    const home = homeStore.homeById(homeId)

    if (!home) {
      return
    }

    stockStore.addToStock(homeId, { id: item.id, title: item.title })

    const existingItem = home.shoppingList.find((shoppingItem) => shoppingItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      home.shoppingList.push(item)
    }
  }

  const removeFromShoppingList = (id: string, item: Item) => {
    const home = homeStore.homeById(id)

    if (!home) {
      return
    }

    home.shoppingList = home.shoppingList.filter((shoppingItem) => shoppingItem.id !== item.id)
  }

  return {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList
  }
})
