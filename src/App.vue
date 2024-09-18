<script setup lang="ts">
  import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  main {
    margin: 1rem 1rem 2rem 1rem;
  }

  @media (min-width: 768px) {
    main {
      margin: 2rem 2rem 2rem 2rem;
    }
  }
</style>
