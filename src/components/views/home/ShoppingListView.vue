<template>
  <section class="contained-grid shopping-list-view-grid-rows px-4 pt-4">
    <ul class="overflow-auto">
      <li
        v-for="item in items"
        :key="item.id"
        class="border border-indigo-200 rounded w-full mb-4 flex justify-between p-1 bg-indigo-50"
      >
        <button
          class="hover:text-indigo-700 px-2 flex gap-2 items-center w-full"
          @click="selectItem(item.id)"
          @dblclick="moveItemToStock(item)"
        >
          <CheckCircleIcon v-if="selectedItems.includes(item.id)" class="text-green-600" />
          <CheckBoxBlankCircleOutlineIcon v-else class="text-indigo-700" />
          {{ item.title }}
        </button>
        <button
          class="p-2 rounded-full text-gray-500 hover:text-red-800 hover:bg-red-100 border border-transparent hover:border-red-200"
          @click="removeItem(item)"
        >
          <DeleteIcon />
        </button>
      </li>
    </ul>
    <div v-if="selectedItems.length > 0" class="flex gap-4 justify-stretch">
      <button class="bg-green-200 p-2 w-full rounded-md" @click="moveSelectedItemsToStock">
        {{ shopping_list_view__move_items_to_stock() }}
      </button>
      <button class="bg-red-200 p-2 w-full rounded-md" @click="removeSelectedItems">
        {{ shopping_list_view__remove_items() }}
      </button>
    </div>
    <div class="flex gap-4 py-4 items-center">
      <div class="relative w-full">
        <input
          type="text"
          class="w-full border p-3 rounded shadow-md outline-indigo-200 outline-offset-2 hide-dropdown-icon"
          :label="shopping_list_view__item_input_label()"
          :placeholder="shopping_list_view__item_input_placeholder()"
          list="stock-items"
          v-model.trim="shoppingItem"
          @keyup.enter="addItemToList"
        />
        <datalist id="stock-items">
          <option v-for="item of stockItems" :key="item.id" :value="item.title"></option>
        </datalist>
        <button
          v-if="shoppingItem.length"
          :class="[
            'absolute right-1 top-1 w-10 h-10 ',
            'p-2 flex justify-center items-center flex-shrink-0 rounded-full',
            'bg-transparent text-indigo-700 hover:text-white hover:bg-indigo-700 hover:shadow-card'
          ]"
          :aria-label="shopping_list_view__clear_input_button_aria_label()"
          @click="clearShoppingItemInput"
        >
          <CloseIcon class="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
      <button
        :disabled="!shoppingItem"
        :area-label="shopping_list_view__add_item_button_aria_label()"
        class="disabled:bg-slate-300 p-2 flex justify-center items-center bg-indigo-700 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 text-white rounded-full hover:bg-indigo-500 shadow-card"
        @click="addItemToList"
      >
        <PlusIcon class="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

import PlusIcon from "~icons/Plus.vue"
import DeleteIcon from "~icons/Delete.vue"
import CheckBoxBlankCircleOutlineIcon from "~icons/CheckBoxBlankCircleOutline.vue"
import CheckCircleIcon from "~icons/CheckCircle.vue"
import CloseIcon from "~icons/Close.vue"

import { type ShoppingItem } from "~/stores/homes"
import { useShoppingListStore } from "~/stores/shopping-list"
import { useStockStore } from "~/stores/stock"

import { useToast } from "~/composables/toast"
import { useRoute } from "vue-router"

import { generateId } from "~/utils/id-generator"

import {
  shopping_list_view__item_input_label,
  shopping_list_view__item_input_placeholder,
  shopping_list_view__move_items_to_stock,
  shopping_list_view__remove_items,
  shopping_list_view__clear_input_button_aria_label,
  shopping_list_view__add_item_button_aria_label,
  shopping_list_view__toast_item_moved_to_stock,
  shopping_list_view__toast_items_moved_to_stock,
  shopping_list_view__toast_item_removed,
  shopping_list_view__toast_items_removed
} from "~translations"

const shoppingListStore = useShoppingListStore()

const route = useRoute()
const toast = useToast()

const currentHomeId = route.params.id as string

const selectedItems = ref<string[]>([])

const selectItem = (itemId: string) => {
  if (selectedItems.value.includes(itemId)) {
    selectedItems.value = selectedItems.value.filter((id) => id !== itemId)
    return
  }

  selectedItems.value.push(itemId)
}

const cleanSelectedItems = () => {
  selectedItems.value = []
}

const shoppingItem = ref("")

const clearShoppingItemInput = () => {
  shoppingItem.value = ""
}

const items = computed(() => shoppingListStore.shoppingList(currentHomeId))

const stockStore = useStockStore()

const stockItems = stockStore.stockItems(currentHomeId)

const addItemToList = () => {
  const existingItem = stockStore
    .stockItems(currentHomeId)
    .find((item) => item.title === shoppingItem.value)

  const item = existingItem
    ? { id: existingItem.id, title: existingItem.title, quantity: 1 }
    : {
        id: generateId(),
        title: shoppingItem.value,
        quantity: 1
      }

  shoppingListStore.addToShoppingList(currentHomeId, item)
  clearShoppingItemInput()
}

const moveItemToStock = (item: ShoppingItem, notify: boolean = true) => {
  shoppingListStore.removeFromShoppingList(currentHomeId, item)
  stockStore.addToStock(currentHomeId, item)

  if (notify) {
    toast.addToast(shopping_list_view__toast_item_moved_to_stock({ title: item.title }), {
      color: "green"
    })
  }
}

const removeItem = (item: ShoppingItem, notify: boolean = true) => {
  shoppingListStore.removeFromShoppingList(currentHomeId, item)

  if (notify) {
    toast.addToast(shopping_list_view__toast_item_removed({ title: item.title }), {
      color: "red"
    })
  }
}

const moveSelectedItemsToStock = () => {
  const itemsToMove = items.value.filter((item) => selectedItems.value.includes(item.id))

  const notifyIndividually = itemsToMove.length < 3

  if (!notifyIndividually) {
    const items = itemsToMove.map((item) => item.title).join(", ")
    toast.addToast(shopping_list_view__toast_items_moved_to_stock({ items }), {
      color: "green"
    })
  }

  itemsToMove.forEach((item) => moveItemToStock(item, notifyIndividually))

  cleanSelectedItems()
}

const removeSelectedItems = () => {
  const itemsToRemove = items.value.filter((item) => selectedItems.value.includes(item.id))

  const notifyIndividually = itemsToRemove.length < 3

  if (!notifyIndividually) {
    const items = itemsToRemove.map((item) => item.title).join(", ")
    toast.addToast(shopping_list_view__toast_items_removed({ items }), {
      color: "red"
    })
  }

  itemsToRemove.forEach((item) => removeItem(item, notifyIndividually))

  cleanSelectedItems()
}
</script>

<style scoped>
.shopping-list-view-grid-rows {
  grid-template-rows: 1fr auto;
}

.hide-dropdown-icon::-webkit-calendar-picker-indicator,
.hide-dropdown-icon::-webkit-list-button {
  color: transparent;
}
</style>
