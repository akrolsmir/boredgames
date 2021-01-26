<template>
  <div class="card mb-5">
    <div class="card-image">
      <figure class="image">
        <!-- <img :src="thumbnailUrl" alt="Giant hero image" /> -->
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image container is-48x48">
            <img :src="thumbnailUrl" alt="Thumbnail image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ title }}</p>
          <p class="subtitle is-6">
            <a :href="url">{{ url }}</a>
          </p>
        </div>
      </div>

      <div class="content">
        Each player comes up with a one word clue for the guesser. But watch out
        for duplicates! <br />
        <p class="mb-2 mt-2"><b>3+ players.</b> <b>30 min.</b></p>
        <!-- <a>@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a> -->
        <!-- <br /> -->
        <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        <div class="tag mr-2" v-for="tag in tags" :key="tag">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    tags: {
      type: Array,
      default: ['Coop', 'Word', 'Party'],
    },
    title: {
      type: String,
      default: 'One Word',
    },
    url: {
      type: String,
      default: 'https://oneword.games',
    },
    thumbnailUrl: {
      type: String,
      default: 'https://oneword.games/images/oneword-logo.png',
    },
  },
}
</script>

<style scoped>
.tag {
  background-color: #ffddee;
}

/* TODO: this doesn't quite work, hm...  */
img {
  object-fit: cover;
}
.image {
  background-color: #eff;
}
</style>
