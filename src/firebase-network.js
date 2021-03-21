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
export const db = firebase.firestore()
const COLLECTION = 'games'

export async function loadTable(mcache = undefined) {
  const docs = await db.collection(COLLECTION).get()

  const games = []
  docs.forEach((doc) => {
    games.push(doc.data())
    if (mcache) {
      mcache.set(doc.id, doc.data())
    }
  })
  return games
}

/*
  block: {
    id: owgg
    title: One Word
    category: Board Games 
    text: Actually two words
    links: ['cdnms', 'tbo']
    // Note: bcache is not actually used yet
    bcache: {
      cdnms: {...}
      tbo: {...}
    }
  }
*/

/*
  Next; figure out how to (async?) load subcollections (game reviews, in this case)
  1. When you create a subblock, it gets saved on the block (eg top 8 cache, sort: lastupdated, or ranking)
   - Cache has everything you need to inflate the view 
   - (Category has the Vue template for the view?? Like a v4 thing when we have more templates)
     - Can have different views of the same top8 block ala Notion DB
  2. After you're viewing a block, app preloads and mcaches _all_ "children" blocks (async)
    - Also updates the block cache and writes it, async
    a. Children blocks could be a subcollection, OR
    b. Blocks are one big table.
      - Let's try b? But that's more annoying for finding specific categories of things...
      - Eh, who cares, let's try it
  3. Any time you would load another block, you check the memCache first
    - Should apply to anything linked from page, eg everything/along/this/path/to/block
    - blocks have a back pointer/reference? ala Notion?
    - How do external links work?
  4. Feb 13 -- global search over all blocks???
  TODO: How to guard against vandalism? Maybe v5 worry
  TODO: Also cache the page on hover (see instantclick)
  */
export async function preloadLinks(block, mcache) {
  const linkedBlocks = await loadBlocks(block.links || [])
  const renormBlock = renorm(block, linkedBlocks)

  // Store in mcache for instant local access
  mcache.set(block.id, renormBlock)
  linkedBlocks.forEach((block) => mcache.set(block.id, block))

  // Fire and forget (don't await) on updating Firestore
  // Disabled for now because of excessive writes, I guess
  // TODO may need to rethink how/when normalization is done.
  // Maybe only on user-initiated block updates?
  // setBlock(block)
  // linkedBlocks.forEach(setBlock)
}

export async function cachedGetBlock(id, mcache) {
  const block = mcache.get(id) || (await getBlock(id))

  // Also load any child links into mcache
  if (block && block.id) {
    preloadLinks(block, mcache)
  }

  return block
}

export async function setBlock(block) {
  await db.collection('BLOCK').doc(block.id).set(block)
}

export async function getBlock(id) {
  const doc = await db.collection('BLOCK').doc(id).get()
  return doc.data()
}

function renorm(block, linkedBlocks) {
  // console.log('renorming', block, linkedBlocks)
  // v0: Don't worry about bcache eviction yet
  return {
    ...block,
    // TODO: block will be null if the link is not created yet
    links: linkedBlocks.map((block) => block.id),
    cache: Object.fromEntries(linkedBlocks.map((block) => [block.id, block])),
  }
}

async function loadBlocks(blockIds) {
  const promises = blockIds.map((id) => db.collection('BLOCK').doc(id).get())
  const resolved = await Promise.all(promises)
  return resolved.map((doc) => doc.data() || { id: doc.id })
}

export async function getGame(id, mcache = undefined) {
  if (mcache && mcache.get(id)) {
    return mcache.get(id)
    // TODO: Should update cache in the background
    // Cache updates should then also update the visible Vue component
  }
  const doc = await db.collection(COLLECTION).doc(id).get()
  if (mcache) {
    mcache.set(id, doc.data())
  }
  return doc.data()
}

export async function setGame(game) {
  const id = sanitize(game.title)
  await db.collection(COLLECTION).doc(id).set(game)
}

export async function deleteGame(game) {
  const id = sanitize(game.title)
  await db.collection(COLLECTION).doc(id).delete()
}

export async function setReview(gameTitle, review) {
  // TODO: generate gameId with nanoid;
  // nanoid maybe should be called from firebase, not components (for gameId, too)
  const gameId = sanitize(gameTitle)

  // TODO: Should review contain gameId? Maybe that's what `link` contains...
  await db
    .collection(COLLECTION)
    .doc(gameId)
    // Store reviews in a subcollection of games
    .collection('reviews')
    .doc(review.id)
    .set(review)
}

// TODO: Extract to utils
export function sanitize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-') // whitespace
    .replace(/[^-\d\p{L}]/gu, '') // not (dash or number or letter in any language)
}
