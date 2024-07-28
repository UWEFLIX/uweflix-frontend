import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Router } from 'vue-router';
import './css/vue-multiselect.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
