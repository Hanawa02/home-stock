<template>
  <div class="w-full p-4 border-t shadow bg-white">
    <nav>
      <ul class="flex justify-evenly">
        <li v-for="menu in menuItems" :key="menu.label" class="w-full">
          <router-link
            :to="{ name: menu.routeName, params: menu.routeParams }"
            class="flex flex-col items-center group mx-auto"
            exactActiveClass="cursor-disabled text-indigo-800 font-semibold"
            inactiveClass="text-zinc-600"
          >
            <span class="md:group-hover:text-indigo-500 material-symbols-outlined">
              {{ menu.icon }}
            </span>
            <label
              class="md:group-hover:text-indigo-800 md:group-hover:underline cursor-pointer text-sm"
              >{{ menu.label }}</label
            >
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
export type MenuItem = {
  label: string
  icon: string
  routeName: string
  routeParams: Record<string, unknown>
}

type IProps = {
  menuItems: MenuItem[]
}

defineProps<IProps>()
</script>
