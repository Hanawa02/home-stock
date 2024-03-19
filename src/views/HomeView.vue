<script setup lang="ts">
import { useCollection } from 'vuefire'
import { homes } from '@/firebase/database'

const allHomes = useCollection(homes())
</script>

<template>
  <main>
    <h1>Homes</h1>
    <ul>
      <li v-for="home of allHomes" :key="home.id">
        <router-link :to="`/home/${home.id}`">{{ home.name }}</router-link>
      </li>
    </ul>
  </main>
</template>
