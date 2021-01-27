<template>
  <draggable v-model="games" item-key="title">
    <template #item="{ element, index }">
      <GameCard :game="element" :rank="index + 1" />
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import GameCard from './GameCard.vue'

export default {
  components: {
    draggable,
    GameCard,
  },
  props: ['games'],
}
</script>
