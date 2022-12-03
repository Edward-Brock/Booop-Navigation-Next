import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// 引入暗黑模式css文件
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style/dark/css-vars.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
