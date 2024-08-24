<template>
  <div class="w-full p-4 border-t shadow bg-white">
    <nav>
      <ul class="flex justify-evenly">
        <li v-for="menu in menuItems" :key="menu.label" class="w-full">
          <button
            @click="menu.clickFunction"
            class="flex flex-col items-center group mx-auto"
            :aria-label="menu.label"
          >
            <span class="text-blue-800 md:group-hover:text-blue-700 material-symbols-outlined">
              {{ menu.icon }}
            </span>
            <label
              class="text-zinc-600 md:group-hover:text-blue-800 md:group-hover:underline font-normal cursor-pointer text-sm"
              >{{ menu.label }}</label
            >
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
export interface MenuItem {
  label: string
  icon: string
  clickFunction: () => void
}

interface IProps {
  menuItems: MenuItem[]
}

defineProps<IProps>()
</script>
