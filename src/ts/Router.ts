import { createMemoryHistory, createRouter } from "vue-router";
import ViewTitle from "../views/ViewTitle.vue";

export enum RouterRoutes {
  TITLE = "/",
  CASE_SELECT = "/cases",
  PLAY = "/play",
  SETTINGS = "/settings",
  ABOUT = "/about",
}

const routes = [
  { path: RouterRoutes.TITLE, component: ViewTitle },
  { path: RouterRoutes.CASE_SELECT, component: ViewTitle },
  { path: RouterRoutes.PLAY, component: ViewTitle },
  { path: RouterRoutes.SETTINGS, component: ViewTitle },
  { path: RouterRoutes.ABOUT, component: ViewTitle },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
