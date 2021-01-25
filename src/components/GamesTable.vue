<template>
  <div v-for="game in table" :key="game.url">
    <a :href="game.url">{{ game.title }}</a>
  </div>
  Title:
  <input class="input" v-model="newTitle" />
  Url:
  <input class="input" v-model="newUrl" />
  <button class="button" @click="newGame">Create new game!</button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBOe0NYQsCsDTe1rXutCksl41yWQLfNiT8',
  authDomain: 'boredgames-e54c6.firebaseapp.com',
  projectId: 'boredgames-e54c6',
  storageBucket: 'boredgames-e54c6.appspot.com',
  messagingSenderId: '822062307615',
  appId: '1:822062307615:web:4e4fdee4d33520862cf82a',
  measurementId: 'G-S3RLG829D7',
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  try {
    firebase.analytics()
  } catch (e) {
    console.warn('Firebase analytics not enabled (probably got blocked.)')
    // Shim for firebase.analytics().logEvent(...)
    firebase.analytics = () => ({
      logEvent() {
        // Do nothing
      },
    })
  }
}
const db = firebase.firestore()
const COLLECTION = 'games'

function sanitize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-') // whitespace
    .replace(/[^-\d\p{L}]/gu, '') // not (dash or number or letter in any language)
}

export default {
  data() {
    return {
      newTitle: '',
      newUrl: '',
      table: [
        {
          id: 'one-word', // TODO: ID should be derived from title
          title: 'One Wordz',
          url: 'https://oneword.games',
        },
      ],
    }
  },
  async created() {
    this.table = await this.loadTable()
  },
  methods: {
    async newGame() {
      await this.addGame(this.newTitle, this.newUrl)
    },
    async loadTable() {
      const docs = await db.collection(COLLECTION).get()

      const games = []
      docs.forEach((doc) => games.push(doc.data()))
      return games
    },
    async addGame(title, url) {
      const id = sanitize(title)
      await db.collection(COLLECTION).doc(id).set({
        title,
        url,
      })
    },
  },
}
</script>
