// This import initializes with the firebase keys
import './firebase-network.js'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const db = firebase.firestore()

// May return null.
export async function getUser(userId) {
  const doc = await db.collection('users').doc(userId).get()
  return doc.data()
}

export async function updateUser(userId, user) {
  const db = firebase.firestore()
  await db.collection('users').doc(userId).update(user)
}

const CACHED_USER_KEY = 'CACHED_USER_KEY'

/**
 * Example user:
 * user: {
 *   id: asjke63rlaj2
 *   name: Austin Chen
 *   email: akrolsmir@gmail.com
 *   createTime: 12321478197
 *   lastUpdateTime: 12321478197
 *   lists: subcollection
 * }
 *
 * list: {
 *   id: listid1
 *   title: Top 10 anime betrayals
 *   items: {
 *     gameid1: 2
 *     gameid2: 3
 *     articleid3: 1
 *   }
 * }
 */
export function listenForLogin(setUser /** callback that takes in user */) {
  // Immediately load any persisted user object from browser cache.
  const cachedUser = localStorage.getItem(CACHED_USER_KEY)
  if (cachedUser) {
    setUser(JSON.parse(cachedUser))
  }

  // Then listen for any login changes (includes first login)
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      let fetchedUser = await getUser(user.uid)
      if (!fetchedUser) {
        // User just created an account; save them to our database.
        fetchedUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          createTime: Date.now(),
          lastUpdateTime: Date.now(),
        }
        await db.collection('users').doc(fetchedUser.id).set(fetchedUser)
        // TODO: Send welome email here
      }
      setUser(fetchedUser)

      // Persist to local storage, to reduce login blink next time.
      // Note: Cap on localStorage size is ~5mb
      localStorage.setItem(CACHED_USER_KEY, JSON.stringify(fetchedUser))
    }
  })
}

export async function firebaseLogout() {
  firebase.analytics().logEvent('logout')
  await firebase.auth().signOut()
  localStorage.removeItem(CACHED_USER_KEY)
}
