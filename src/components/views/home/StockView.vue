<template>
  <section class="contained-grid shopping-list-view-grid-rows px-4 pt-4">
    <ul class="overflow-auto">
      <li
        v-for="item in items"
        :key="item.id"
        class="border border-green-200 rounded w-full mb-4 flex justify-between p-1 bg-green-50"
      >
        <button
          class="hover:text-green-700 px-2 flex gap-2 items-center"
          @click="selectItem(item.id)"
          @dblclick="applyItem(item)"
        >
          <CheckCircleIcon v-if="selectedItems.includes(item.id)" class="text-green-600" />
          <CheckBoxBlankCircleOutlineIcon v-else class="text-green-700" />
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
    <div v-if="selectedItems.length > 0" class="flex flex-col gap-2 md:flex-row md:gap-4">
      <button class="bg-green-200 p-2 w-full rounded-md" @click="applySelectedItems">
        {{ stock_view__add_to_shopping_list() }}
      </button>
      <button class="bg-red-200 p-2 w-full rounded-md" @click="removeSelectedItems">
        {{ stock_view__remove_items() }}
      </button>
    </div>
    <div class="flex gap-4 py-4 items-center">
      <div class="relative w-full">
        <input
          type="text"
          class="w-full border p-3 rounded shadow-md outline-green-200 outline-offset-2"
          :label="shopping_list_view__item_input_label()"
          :placeholder="shopping_list_view__item_input_placeholder()"
          v-model.trim="shoppingItem"
          @keyup.enter="addItemToList"
        />
        <button
          v-if="shoppingItem.length"
          :class="[
            'absolute right-1 top-1 w-10 h-10 ',
            'p-2 flex justify-center items-center flex-shrink-0 rounded-full',
            'bg-transparent text-green-700 hover:text-white hover:bg-green-700 hover:shadow-card'
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
        class="disabled:bg-slate-300 p-2 flex justify-center items-center bg-green-700 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 text-white rounded-full hover:bg-green-500 shadow-card"
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

import { type ShoppingItem, useHomeStore } from "~/stores/homes"
import { useRoute } from "vue-router"

import { generateId } from "~/utils/id-generator"

import {
  shopping_list_view__item_input_label,
  shopping_list_view__item_input_placeholder,
  stock_view__remove_items,
  stock_view__add_to_shopping_list,
  shopping_list_view__clear_input_button_aria_label,
  shopping_list_view__add_item_button_aria_label
} from "~translations"

const homeStore = useHomeStore()

const route = useRoute()

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

const items = computed(() => homeStore.stockItems(currentHomeId))

const addItemToList = () => {
  const existingItem = homeStore
    .stockItems(currentHomeId)
    .find((item) => item.title === shoppingItem.value)

  const item = existingItem ?? {
    id: generateId(),
    title: shoppingItem.value,
    quantity: 1
  }

  homeStore.addToShoppingList(currentHomeId, item)
  clearShoppingItemInput()
}

const applyItem = (item: ShoppingItem) => {
  homeStore.removeFromShoppingList(currentHomeId, item)
  homeStore.addToStock(currentHomeId, item)
}

const removeItem = (item: ShoppingItem) => {
  homeStore.removeFromShoppingList(currentHomeId, item)
}

const applySelectedItems = () => {
  items.value
    .filter((item) => selectedItems.value.includes(item.id))
    .forEach((item) => applyItem(item))

  cleanSelectedItems()
}

const removeSelectedItems = () => {
  items.value
    .filter((item) => selectedItems.value.includes(item.id))
    .forEach((item) => removeItem(item))

  cleanSelectedItems()
}
</script>

<style scoped>
.shopping-list-view-grid-rows {
  grid-template-rows: 1fr auto;
}
</style>
