<template>
  <div>
    <h1 class="text-lg" v-html="$t('viewTitle.title')"></h1>

    <MainMenu />
  </div>
</template>

<script setup lang="ts">
  import MainMenu from "../components/MainMenu.vue";
</script>

<style scoped>
  h1 {
    margin: 0.5rem 0 2rem 0;
    text-align: center;
  }
</style>
