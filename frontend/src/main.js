import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/main.scss'
import 'bootstrap'

createApp(App).use(router).mount('#app')
