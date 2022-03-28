import { createApp } from 'vue'
import App from './App.vue'
import './style/main.scss'
import { TroisJSVuePlugin } from 'troisjs';

let app = createApp(App);
app.use(TroisJSVuePlugin);
app.mount('#app');
