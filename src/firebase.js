import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
.initializeApp({ databaseURL: 'https://vueandfirebase-f8f4a.firebaseio.com'})
.database()

export const dessertsRef = db.ref('desserts');
export const drinkRef = db.ref('drink');