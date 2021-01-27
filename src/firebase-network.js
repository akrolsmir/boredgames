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
    // TODO: Move logEvent into a generally logger here, which catches errors
    firebase.analytics = () => ({
      logEvent() {
        // Do nothing
      },
    })
  }
}
const db = firebase.firestore()
const COLLECTION = 'games'

export async function loadTable() {
  const docs = await db.collection(COLLECTION).get()

  const games = []
  docs.forEach((doc) => games.push(doc.data()))
  return games
}

export async function setGame(game) {
  const id = sanitize(game.title)
  await db.collection(COLLECTION).doc(id).set(game)
}

export async function deleteGame(game) {
  const id = sanitize(game.title)
  await db.collection(COLLECTION).doc(id).delete()
}

// TODO: Extract to utils
function sanitize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-') // whitespace
    .replace(/[^-\d\p{L}]/gu, '') // not (dash or number or letter in any language)
}
