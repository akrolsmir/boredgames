<template>
  <div class="card mb-5">
    <div class="card-image">
      <figure class="image">
        <!-- <img :src="image" alt="Giant hero image" /> -->
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image container is-48x48">
            <img :src="game.image" alt="Thumbnail image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            <a :href="game.url">{{ game.title }}</a>
          </p>
          <p class="subtitle is-6">
            <span class="icony">{{ game.hearts }} ❤️</span>
            <span>{{ game.reviews.length }} 🧾.</span>
          </p>
        </div>
      </div>

      <div class="content">
        {{ game.description }} <br />
        <p class="mb-2 mt-2">
          <b
            >{{ game.attr.minPlayers }}-{{ game.attr.maxPlayers }} players.
            {{ game.attr.playtime }} min.</b
          >
        </p>
        <!-- <a>@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a> -->
        <!-- <br /> -->
        <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        <div class="tag mr-2" v-for="tag in game.tags" :key="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function makeDefaultGame() {
  return {
    title: 'One Word',
    url: 'https://oneword.games',
    image: 'https://oneword.games/images/oneword-logo.png',
    description:
      'Each player comes up with a one word clue for the guesser. But watch out for duplicates!',
    attr: {
      minPlayers: 1,
      maxPlayers: 4,
      playtime: 30,
    },
    hearts: 3,
    reviews: [
      'Worth every penny. -Austin',
      'This literally changed my life! Would recommend to friends, family, enemies, basically anyone... -Sinclair',
    ],
  }
}

export default {
  data() {
    return {}
  },
  props: {
    game: {
      type: Object,
      default: makeDefaultGame(),
    },
  },
}
</script>

<style scoped>
.tag {
  background-color: #ffddee;
}

.icony {
  margin-right: 1rem;
}

/* TODO: this doesn't quite work, hm...  */
img {
  object-fit: cover;
}
.image {
  background-color: #eff;
}
</style>
