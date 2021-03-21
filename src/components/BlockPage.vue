<template>
  <div class="box" v-if="block.id && !editing">
    <h2 class="title">{{ block.id }}</h2>
    <p>{{ block.text }}</p>
    <div v-for="link in block.links">
      <router-link :to="'/blocks/' + link">@{{ link }}</router-link>
    </div>
    <button class="button" @click="editing = true">Edit block</button>
  </div>
  <div class="box" v-else>
    <h2 class="subtitle">Edit this block!</h2>
    <label class="label">Text</label>
    <textarea class="textarea" v-model="block.text"></textarea>
    <p>{{ parseLinks(this.block.text) }}</p>
    <button class="button" @click="submit">Submit block</button>
  </div>
  <!-- TODO: Show recursive loading on the bottom -->
</template>

<script>
import { cachedGetBlock, setBlock } from '../firebase-network'

function parseLinks(text) {
  if (!text) {
    // NOTE: annoying how block.X being undefined leads to a lot of guards.
    // See also loadBlocks(block.links)
    return []
  }
  // Matches "@hi and @bye" but not "austin@lol.com"
  const matches = text.match(/(\W|^)@[a-zA-Z0-9-]+/g) || []
  return matches.map((m) => m.split('@')[1])
}

export default {
  props: ['id'],
  data() {
    return { block: {}, editing: false }
  },
  async mounted() {
    // TODO: do we still need this with beforeRouteUpdate?
    this.block = (await cachedGetBlock(this.id, this.mcache)) || {}
  },
  methods: {
    parseLinks,
    async submit() {
      // If creating a new block, insert the id too
      this.block.id = this.id

      // Parse the block for links
      this.block.links = parseLinks(this.block.text)

      await setBlock(this.block)

      this.editing = false

      // TODO: Shouldn't we also need to update mcache?
    },
  },
  // Refetch the block, as components are reused on a router-link click
  // See https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  async beforeRouteUpdate(to, from) {
    this.block = (await cachedGetBlock(to.params.id, this.mcache)) || {}
  },
}
</script>
