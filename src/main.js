import { createApp } from 'vue'
import App from './App.vue'
// When compiled, import order isn't respected...?
import 'bulma/css/bulma.css'
import './styles.css'

createApp(App).mount('#app')
