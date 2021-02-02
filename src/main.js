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
  history: createWebHashHistory(), // TODO: remove hash for pretty URLs
  routes,
})

export const app = createApp(App)
app.use(router).mount('#app')

class Mcache {
  constructor() {
    this.map = {}
  }

  get(key) {
    return this.map[key]
  }

  set(key, value) {
    this.map[key] = value
  }
}

app.config.globalProperties.mcache = new Mcache()
