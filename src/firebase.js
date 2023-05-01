import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyACL1fYMQqnf7rjldT3kJbVEVoeBSCkOP0",
    authDomain: "discord-r.firebaseapp.com",
    projectId: "discord-r",
    storageBucket: "discord-r.appspot.com",
    messagingSenderId: "480251638488",
    appId: "1:480251638488:web:7845ceb0de9647eb585dad"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };