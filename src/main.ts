import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/main.scss'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const options = {
    // You can set your default options here
};

app.use(Toast, options);

app.mount('#app')
