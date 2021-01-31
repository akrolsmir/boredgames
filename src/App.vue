<template>
  <Navbar />
  <GamesTable />
</template>

<script>
import GamesTable from './components/GamesTable.vue'
import Navbar from './components/Navbar.vue'

import { provide, reactive, readonly } from 'vue'
import { listenForLogin } from './firebase-auth'

export const currentUser = reactive({
  id: '',
  name: '',
  email: '',
  createTime: 0,
  lastUpdateTime: 0,
  lists: [],
})

export default {
  components: {
    GamesTable,
    Navbar,
  },
  setup() {
    function updateCurrentUser(user) {
      Object.assign(currentUser, user)
    }

    listenForLogin(updateCurrentUser)

    provide('currentUser', readonly(currentUser))
    provide('updateCurrentUser', updateCurrentUser)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
