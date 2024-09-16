<template>
  <div class="wrapper">
    <ul>
      <li v-for="route in mainMenuRoutes" :key="route.route">
        <RouterLink class="text-md" :to="route.route">{{
          route.text
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { RouterRoutes } from "../ts/Router";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const mainMenuRoutes = [
    {
      route: RouterRoutes.CARTRIDGE_SELECT,
      text: t("router.routes." + RouterRoutes.CARTRIDGE_SELECT),
    },
    {
      route: RouterRoutes.SETTINGS,
      text: t("router.routes." + RouterRoutes.SETTINGS),
    },
    {
      route: RouterRoutes.ABOUT,
      text: t("router.routes." + RouterRoutes.ABOUT),
    },
  ];
</script>

<style scoped>
  .wrapper {
    border: 1px solid var(--hw-secondary);
    margin: 0 1rem;
    padding: 1rem;

    li {
      margin-bottom: 0.75rem;
    }
  }
</style>
