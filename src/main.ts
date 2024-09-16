import { createApp } from "vue";
import { router } from "./ts/Router";
import { createI18n } from "vue-i18n";
import "./assets/css/main.css";
import { i18nConfig } from "./config/i!18n";
import App from "./App.vue";

const i18n = createI18n(i18nConfig);

createApp(App).use(i18n).use(router).mount("#app");
