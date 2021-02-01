<template>
  <GameCard :game="game" />
  TODO: Reviews should go here!
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
    this.game = await getGame(this.id)
  },
}
</script>
