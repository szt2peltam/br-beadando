import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import App from './App.vue'
import router from './router'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
