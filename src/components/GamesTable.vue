<template>
  <h1 class="title">The Big List of Online Board Games</h1>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Search for a game</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            type="text"
            v-model="filter.tags"
            placeholder="Tags"
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input
            class="input"
            type="number"
            v-model="filter.players"
            placeholder="# players"
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input
            class="input"
            type="number"
            v-model="filter.maxPlaytime"
            placeholder="Max playtime"
          />
        </p>
      </div>
    </div>
  </div>
  <br /><br />

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

  <h2 class="title">Rank your favorites!</h2>
  <GamesList :games="games" />
</template>

<script>
import GameCard, { makeDefaultGame } from './GameCard.vue'
import EditGame from './EditGame.vue'
import GamesList from './GamesList.vue'
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
    GamesList,
  },
  data() {
    return {
      toEdit: makeDefaultGame(),
      INCRYPT_GAME,
      newTitle: '',
      newUrl: '',
      games: [], // TODO: reduce layout shift by prefilling with data/placeholders
      filter: {
        tags: undefined,
        players: undefined,
        maxPlaytime: undefined,
      },
    }
  },
  async created() {
    await this.reload()
  },
  methods: {
    loadTable,
    async reload() {
      this.games = await this.loadTable(this.mcache)
    },
    filterFunction(game) {
      if (this.filter.players) {
        if (
          game.attr.minPlayers > this.filter.players ||
          this.filter.players > game.attr.maxPlayers
        ) {
          return false
        }
      }
      if (this.filter.maxPlaytime) {
        if (this.filter.maxPlaytime < game.attr.playtime) {
          return false
        }
      }
      if (this.filter.tags) {
        function match(tag, query) {
          return tag.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        }
        const anyMatch = game.tags.some((tag) => match(tag, this.filter.tags))
        if (!anyMatch) {
          return false
        }
      }
      return true
    },
  },
  computed: {
    table() {
      const numColumns = 3
      // Array().fill([]) doesn't work since the array ref is the same
      const result = Array.from(new Array(numColumns), () => [])
      for (const [i, game] of this.filteredGames.entries()) {
        result[i % 3].push(game)
      }
      return result
    },
    filteredGames() {
      return this.games.filter(this.filterFunction)
    },
  },
}
</script>
