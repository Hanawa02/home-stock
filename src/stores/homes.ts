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

  const shoppingList = (id: string) => {
    const home = homeById(id)

    if (!home) {
      return []
    }

    return home.shoppingList
  }

  const stockItems = (id: string) => {
    const home = homeById(id)

    if (!home) {
      return []
    }

    return home.stockItems
  }

  const addToShoppingList = (homeId: string, item: ShoppingItem) => {
    const home = homeById(homeId)

    if (!home) {
      return
    }

    registerIntoStock(homeId, { id: item.id, title: item.title })

    const existingItem = home.shoppingList.find((shoppingItem) => shoppingItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      home.shoppingList.push(item)
    }
  }

  const registerIntoStock = (id: string, item: Item, quantity: number = 0) => {
    const home = homeById(id)

    if (!home) {
      return
    }

    const existingItem = home.stockItems.find((stockItem) => stockItem.id === item.id)

    if (!existingItem) {
      home.stockItems.push({ ...item, inStock: quantity, idealStock: quantity })
    }
  }

  const removeFromShoppingList = (id: string, item: Item) => {
    const home = homeById(id)

    if (!home) {
      return
    }

    home.shoppingList = home.shoppingList.filter((shoppingItem) => shoppingItem.id !== item.id)
  }

  const addToStock = (id: string, item: ShoppingItem) => {
    const home = homeById(id)

    if (!home) {
      return
    }

    const stockItem = home.stockItems.find((stockItem) => stockItem.id === item.id)

    if (stockItem) {
      stockItem.inStock += item.quantity
    } else {
      registerIntoStock(id, item, item.quantity)
    }
  }

  return {
    homes,
    homeById,
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    addToStock,
    stockItems
  }
})
