import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import SvgLineInput from "./components/SvgLineInput";
import Logo from "./components/Logo";

const app = createApp(App)
app.use(store)
app.use(router)
app.component("input-line", SvgLineInput);
app.component("logo-icon", Logo);


app.mount("#app");

