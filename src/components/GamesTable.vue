<template>
  <h1 class="title">The Big List of Online Board Games</h1>
  <div class="columns">
    <div class="column" v-for="col in table">
      <GameCard v-for="game in col" :game="game" @edit="toEdit = game" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <h2 class="title is-4">Submit a game!</h2>
      <EditGame v-model="toEdit" @submit="reload" />
    </div>
    <div class="column">
      <h2 class="title is-4">Preview</h2>
      <GameCard :game="toEdit" />
    </div>
  </div>
</template>

<script>
import GameCard, { makeDefaultGame } from './GameCard.vue'
import EditGame from './EditGame.vue'
import { loadTable } from '../firebase-network.js'

const INCRYPT_GAME = {
  title: 'Incrypt',
  url: 'https://oneword.games/incrypt',
  image: 'https://oneword.games/images/oneword-logo.png',
  description: 'Zany description here!',
  attr: {
    minPlayers: 4,
    maxPlayers: 10,
    playtime: 45,
  },
  hearts: 2,
  reviews: ['R1', 'R2', 'R3'],
}

export default {
  components: {
    GameCard,
    EditGame,
  },
  data() {
    return {
      toEdit: makeDefaultGame(),
      INCRYPT_GAME,
      newTitle: '',
      newUrl: '',
      games: [],
    }
  },
  async created() {
    await this.reload()
  },
  methods: {
    loadTable,
    async reload() {
      this.games = await this.loadTable()
    },
  },
  computed: {
    table() {
      const numColumns = 3
      // Array().fill([]) doesn't work since the array ref is the same
      const result = Array.from(new Array(numColumns), () => [])
      for (const [i, game] of this.games.entries()) {
        result[i % 3].push(game)
      }
      return result
    },
  },
}
</script>
