<template>
  <h1 class="title">The Big List of Online Board Games</h1>
  <div class="columns">
    <div class="column">
      <GameCard />
      <GameCard :game="INCRYPT_GAME" />
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
  <div class="columns">
    <div class="column">
      <h2 class="title is-4">Submit a game!</h2>
      <EditGame v-model="editGame" />
    </div>
    <div class="column">
      <h2 class="title is-4">Preview</h2>
      <GameCard :game="editGame" />
    </div>
  </div>
</template>

<script>
import GameCard, { makeDefaultGame } from './GameCard.vue'
import EditGame from './EditGame.vue'
import { loadTable, addGame } from '../firebase-network.js'

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
      editGame: makeDefaultGame(),
      INCRYPT_GAME,
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
