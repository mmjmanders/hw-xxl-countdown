import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '@fontsource-variable/open-sans'
import '@fontsource-variable/google-sans-code'
import './main.css'
import App from './App.vue'

createApp(App).use(VueQueryPlugin).mount('#app')
