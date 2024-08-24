<template>
  <section class="contained-grid shopping-list-view-grid-rows px-4 pt-4">
    <ul class="overflow-auto">
      <li
        v-for="item in items"
        :key="item.id"
        class="border border-indigo-100 rounded w-full mb-4 flex justify-between p-1 bg-indigo-50"
      >
        <button
          class="hover:text-indigo-700 px-2 flex gap-2 items-center"
          @click="selectItem(item.id)"
          @dblclick="applyItem(item.id)"
        >
          <CheckCircleIcon v-if="selectedItems.includes(item.id)" class="text-green-600" />
          <CheckBoxBlankCircleOutlineIcon v-else />
          {{ item.title }}
        </button>
        <button
          class="p-2 rounded-full text-gray-500 hover:text-red-800 hover:bg-red-100 border border-transparent hover:border-red-200"
          @click="removeItem(item.id)"
        >
          <DeleteIcon />
        </button>
      </li>
    </ul>
    <div v-if="selectedItems.length > 0" class="flex gap-4 justify-stretch">
      <button class="bg-green-200 p-2 w-full" @click="applySelectedItems">Apply Items</button>
      <button class="bg-red-200 p-2 w-full" @click="removeSelectedItems">Remove Items</button>
    </div>
    <div class="flex gap-4 py-4 items-center">
      <input
        type="text"
        class="w-full border p-3 rounded shadow-md outline-indigo-200 outline-offset-2"
        :label="shopping_list_view__item_input_label()"
        :placeholder="shopping_list_view__item_input_placeholder()"
        v-model="shoppingItem"
        @keyup.enter="addItemToList"
      />
      <button
        class="p-2 flex justify-center items-center bg-indigo-700 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 text-white rounded-full hover:bg-indigo-500 shadow-card"
        @click="addItemToList"
      >
        <PlusIcon class="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

import PlusIcon from "~icons/Plus.vue"
import DeleteIcon from "~icons/Delete.vue"
import CheckBoxBlankCircleOutlineIcon from "~icons/CheckBoxBlankCircleOutline.vue"
import CheckCircleIcon from "~icons/CheckCircle.vue"

import {
  shopping_list_view__item_input_label,
  shopping_list_view__item_input_placeholder
} from "~translations"

type ShoppingItem = {
  id: string
  title: string
  quantity: number
}

const items = ref<ShoppingItem[]>([
  {
    id: "id-1",
    title: "Milk",
    quantity: 1
  },
  {
    id: "id-2",
    title: "Eggs",
    quantity: 1
  }
])
const shoppingItem = ref("")
const selectedItems = ref<string[]>([])

const addItemToList = () => {
  items.value.push({ id: `id-${shoppingItem.value}`, title: shoppingItem.value, quantity: 1 })
}

const applyItem = (itemId: string) => {
  console.log("Applying item", itemId)
  items.value = items.value.filter((item) => item.id !== itemId)
}

const removeItem = (itemId: string) => {
  console.log("Removing item", itemId)
  items.value = items.value.filter((item) => item.id !== itemId)
}

const selectItem = (itemId: string) => {
  if (selectedItems.value.includes(itemId)) {
    selectedItems.value = selectedItems.value.filter((id) => id !== itemId)
    return
  }
  selectedItems.value.push(itemId)
}

const applySelectedItems = () => {
  console.log("Applying selected items", selectedItems.value)
  items.value = items.value.filter((item) => !selectedItems.value.includes(item.id))

  selectedItems.value = []
}

const removeSelectedItems = () => {
  console.log("Removing selected items", selectedItems.value)
  items.value = items.value.filter((item) => !selectedItems.value.includes(item.id))

  selectedItems.value = []
}
</script>

<style scoped>
.shopping-list-view-grid-rows {
  grid-template-rows: 1fr auto;
}
</style>
