<template>
  <div class="wrapper">
    <div class="menu-items">
      <ul>
        <li v-for="route in mainMenuRoutes" :key="route.route">
          <RouterLink
            class="text-md"
            @mouseenter="
              handleLinkHover(
                $t('router.routes.' + route.route + '.description')
              )
            "
            @focus="
              handleLinkHover(
                $t('router.routes.' + route.route + '.description')
              )
            "
            :to="route.route"
            >{{ route.text }}</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="menu-description text-md">
      <p>{{ routeDescription }}</p>
    </div>
    <div class="controls text-md">
      <p>{{ $t("viewTitle.instruction." + inputMethod) }}</p>
    </div>
  </div>
  <span class="text-sm">{{ appVersion }}</span>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { RouterRoutes } from "../ts/Router";
  import { useI18n } from "vue-i18n";
  import { useInputMethod } from "../composables/useInputMethod";
  import { ref } from "vue";

  const { inputMethod } = useInputMethod();
  const routeDescription = ref("");
  const { t } = useI18n();
  const mainMenuRoutes = [
    {
      route: RouterRoutes.CASE_SELECT,
      text: t("router.routes." + RouterRoutes.CASE_SELECT + ".title"),
    },
    {
      route: RouterRoutes.SETTINGS,
      text: t("router.routes." + RouterRoutes.SETTINGS + ".title"),
    },
    {
      route: RouterRoutes.ABOUT,
      text: t("router.routes." + RouterRoutes.ABOUT + ".title"),
    },
  ];
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const handleLinkHover = (text: string) => {
    routeDescription.value = text;
  };
</script>

<style scoped>
  .wrapper {
    display: grid;
    margin: 0 1rem 2rem 1rem;
    grid-template-columns: 1fr;

    p {
      margin: 0;
      padding: 0;
    }

    > div {
      border: 0.0625rem solid var(--hw-secondary);
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

    .menu-items {
      grid-area: a;
    }

    .menu-description {
      grid-area: b;
    }

    .controls {
      grid-area: c;
      text-align: center;
    }
  }

  @media (min-width: 48rem) {
    .wrapper {
      margin: 0 auto 4rem auto;
      max-width: 62.5rem;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "a b" "c c";

      > div {
        padding: 1.5rem 1.5rem 2rem 1.5rem;
      }
    }
  }
</style>
