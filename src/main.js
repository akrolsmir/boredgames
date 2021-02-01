import { createApp } from 'vue'
import App from './App.vue'
import GamesPage from './components/GamesPage.vue'
import GamesTable from './components/GamesTable.vue'

// When compiled, import order isn't respected...?
import 'bulma/css/bulma.css'
import './styles.css'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: GamesTable },
  { path: '/games/:id', component: GamesPage, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
