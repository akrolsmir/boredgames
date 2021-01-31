<template>
  <div class="card mb-5">
    <div class="card-image">
      <figure class="image">
        <!-- <img :src="game.image" alt="Giant hero image" /> -->
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <!-- Too lazy to actually find images for now -->
        <!-- <div class="media-left">
          <figure class="image container is-48x48">
            <img :src="game.image" alt="Thumbnail image" />
          </figure>
        </div> -->
        <div class="media-content">
          <p class="title is-4">
            <a :href="game.url">
              <span v-if="rank">{{ rank }}. </span>{{ game.title }}
            </a>
          </p>
          <p class="subtitle is-6">
            <span class="icony">{{ game.hearts }} hearts</span>
            <span>{{ game.reviews.length }} reviews</span>
          </p>
          <div class="field has-addons">
            <p class="control" v-for="(icon, s) in icons" :key="s">
              <button
                class="button"
                :class="{ 'is-link': score == s }"
                @click="startRating(s)"
              >
                {{ icon }}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div v-if="mode == 'CARD'" class="content">
        <!-- TODO: Compact mode without description? -->
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
        <div
          class="tag mr-2"
          v-for="tag in game.tags.filter(Boolean)"
          :style="tagStyle(tag)"
          :key="tag"
        >
          {{ tag }}
        </div>
        <a @click="$emit('edit')">[Edit]</a>
      </div>

      <div v-else-if="mode == 'RATING'" class="content">
        <textarea
          class="textarea"
          :placeholder="`What'd you think about ${game.title}?`"
          v-model="review.text"
        >
        </textarea
        ><br />
        <button class="button" @click="submitRating">Submit your review</button>
      </div>
    </div>
  </div>
</template>

<script>
import { customAlphabet } from 'nanoid'
import ColorHash from '../vendor/color-hash-esm.js'
import { setReview } from '../firebase-network.js'
import { inject } from 'vue'

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
    tags: ['party', 'coop', 'word'],
  }
}

function generateId() {
  const base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZbcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(base62, 8)
  return nanoid()
}

export default {
  emits: ['edit'],
  setup() {
    return { user: inject('currentUser') }
  },
  data() {
    return {
      mode: 'CARD', // also 'RATING'; maybe 'COMPACT' and 'EDITING'?
      score: 0,
      review: {},
      icons: {
        5: '❤️',
        4: '👍',
        3: '😐',
        2: '👎',
        1: '😡',
      },
    }
  },
  props: {
    game: {
      type: Object,
      default: makeDefaultGame(),
    },
    rank: {
      type: Number,
    },
  },
  methods: {
    async startRating(score) {
      // TODO: Only submit if user is logged in
      this.score = score
      this.mode = 'RATING'
      // Submit the rating as-is, without review text
      this.review.id = generateId() // TODO: Reuse review.ID if already reviewed by this user
      this.review.title = this.icons[score]
      this.review.creator = this.user.id
      setReview(this.game.title, this.review)
    },
    async submitRating() {
      setReview(this.game.title, this.review)
      this.mode = 'CARD'
    },
    tagStyle(tag) {
      return {
        'background-color': new ColorHash({
          lightness: 0.9,
          saturation: 1,
        }).hex(tag),
      }
    },
  },
}
</script>

<style scoped>
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
