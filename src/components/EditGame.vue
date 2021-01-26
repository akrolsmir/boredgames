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

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
// Boilerplate to get v-model working in components
// See https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>
