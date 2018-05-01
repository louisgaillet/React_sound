import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBxqc0EheG_jbd2ulZ0OJA3MW7xGIHfgD0",
    authDomain: "reactsound-200118.firebaseapp.com",
    databaseURL: "https://reactsound-200118.firebaseio.com",
    projectId: "reactsound-200118",
    storageBucket: "reactsound-200118.appspot.com",
    messagingSenderId: "170087262141"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
const base = firebase.database();
const auth = firebase.auth();

export { auth, base}