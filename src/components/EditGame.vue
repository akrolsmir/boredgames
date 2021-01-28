<template>
  <div class="box">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="value.title"
          placeholder="Title"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="value.url"
          placeholder="https://..."
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Image URL</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="value.image"
          placeholder="https://..."
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="textarea"
          v-model="value.description"
          placeholder="Summarize the game in 1-2 sentences."
        ></textarea>
      </div>
    </div>

    <template v-for="(attrValue, attr) in value.attr" :key="attr">
      <div class="field">
        <label class="label">{{ attr }}</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="value.attr[attr]"
            placeholder="https://..."
          />
        </div>
      </div>
    </template>

    <div class="field">
      <label class="label">Tags</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="tagsString"
          placeholder="https://..."
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button @click="submitClick" class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button @click="deleteClick" class="button is-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { setGame, deleteGame } from '../firebase-network.js'

// Boilerplate to get v-model working in components
// See https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'submit'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
    tagsString: {
      get() {
        return this.value.tags.join(', ')
      },
      set(value) {
        this.value.tags = value.split(', ')
      },
    },
  },
  methods: {
    async submitClick() {
      await setGame(this.value)
      // TODOs: Add feedback after submit?
      this.$emit('submit')
    },
    async deleteClick() {
      await deleteGame(this.value)
      this.$emit('submit')
    },
  },
}
</script>
