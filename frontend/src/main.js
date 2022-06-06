import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'

import '@/assets/css/main.scss'
import 'bootstrap'

createApp(App).use(store).use(router).mount('#app')
