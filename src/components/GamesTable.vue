<template>
  <div v-for="game in table" :key="game.url">
    <a :href="game.url">{{ game.title }}</a>
  </div>
  Title:
  <input class="input" v-model="newTitle" />
  Url:
  <input class="input" v-model="newUrl" />
  <button class="button" @click="newGame">Create new game!</button>
  <div class="columns">
    <div class="column">
      <GameCard />
      <GameCard />
    </div>
    <div class="column">
      <GameCard />
      <GameCard />
    </div>
    <div class="column">
      <GameCard />
      <GameCard />
    </div>
  </div>
</template>

<script>
import GameCard from './GameCard.vue'
import { loadTable, addGame } from '../firebase-network.js'

export default {
  components: {
    GameCard,
  },
  data() {
    return {
      newTitle: '',
      newUrl: '',
      table: [
        {
          id: 'one-word', // TODO: ID should be derived from title
          title: 'One Wordz',
          url: 'https://oneword.games',
        },
      ],
    }
  },
  async created() {
    this.table = await this.loadTable()
  },
  methods: {
    async newGame() {
      await this.addGame(this.newTitle, this.newUrl)
    },
    loadTable,
    addGame,
  },
}
</script>
