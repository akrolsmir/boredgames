<template>
  <div>{{ user }}</div>
</template>

<script>
import { provide, reactive } from 'vue'

export const cUser = reactive({
  id: '',
  name: '',
  email: '',
  createTime: 0,
  lastUpdateTime: 0,
  lists: [],
})

export default {
  setup() {
    function updateCurrentUser(user) {
      Object.assign(cUser, user)
    }

    provide('currentUser', cUser)
    provide('updateCurrentUser', updateCurrentUser)
  },
}
</script>
