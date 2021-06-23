import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX0aTu_GJzfI220yui2dcLR1G2HwS18Tk",
  authDomain: "imessage-clone-a1bfa.firebaseapp.com",
  projectId: "imessage-clone-a1bfa",
  storageBucket: "imessage-clone-a1bfa.appspot.com",
  messagingSenderId: "332895692841",
  appId: "1:332895692841:web:0bb6a26bf7aad851115438",
  measurementId: "G-9ERVQ16YB7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
