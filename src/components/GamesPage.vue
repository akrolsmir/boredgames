<template>
  <GameCard :game="game" />
  <div v-for="review in game.reviews">
    {{ review }}
  </div>
</template>

<script>
import GameCard, { makeDefaultGame } from './GameCard.vue'
import { getGame } from '../firebase-network.js'

export default {
  components: {
    GameCard,
  },
  props: ['id'],
  data() {
    return {
      game: makeDefaultGame(),
    }
  },
  async mounted() {
    this.game = await getGame(this.id, this.mcache)
  },
}
</script>
