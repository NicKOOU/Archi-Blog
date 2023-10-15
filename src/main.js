/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:4000'; 

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
//inject api url to all components
app.provide('apiUrl', apiUrl);

registerPlugins(app)

app.mount('#app')
