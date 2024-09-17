<template>
  <div class="wrapper">
    <div>
      <ul>
        <li v-for="route in mainMenuRoutes" :key="route.route">
          <RouterLink class="text-md" :to="route.route">{{
            route.text
          }}</RouterLink>
        </li>
      </ul>
    </div>
    <div class="text-md">{{ $t("viewTitle.instruction." + inputMethod) }}</div>
  </div>
  <span class="text-sm">{{ appVersion }}</span>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { RouterRoutes } from "../ts/Router";
  import { useI18n } from "vue-i18n";
  import { useInputMethod } from "../composables/useInputMethod";

  const { inputMethod } = useInputMethod();
  const { t } = useI18n();
  const mainMenuRoutes = [
    {
      route: RouterRoutes.CASE_SELECT,
      text: t("router.routes." + RouterRoutes.CASE_SELECT),
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
  const appVersion = import.meta.env.VITE_APP_VERSION;
</script>

<style scoped>
  .wrapper {
    display: grid;
    margin: 0 1rem 2rem 1rem;
    grid-template-columns: 1fr;

    > div {
      border: 1px solid var(--hw-secondary);
      border-collapse: collapse;
      padding: 1rem;
    }

    li:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    + span {
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  @media (min-width: 768px) {
    .wrapper {
      margin: 0 auto 4rem auto;
      max-width: 640px;
      grid-template-columns: 1fr 1fr;

      > div {
        padding: 1.5rem 1.5rem 2rem 1.5rem;
      }
    }
  }
</style>
