import {
  initializeApp
} from "firebase/app";

import {
  getFirestore
} from 'firebase/firestore'

import {
  getAuth
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC48Eu-PLEhlwskw_p5RaLRWPQdqr4tOH0",
  authDomain: "go-of-beat.firebaseapp.com",
  databaseURL: "https://go-of-beat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "go-of-beat",
  storageBucket: "go-of-beat.appspot.com",
  messagingSenderId: "621682893416",
  appId: "1:621682893416:web:9978e55a8db5e2ff88d1dd",
  measurementId: "G-6R7CPES21D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth
}
