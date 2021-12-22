import firebase from "firebase/app";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyA7dCgCcGCgW-gGNVS59G8m3kNShLRckjw",
  authDomain: "chat-app-44a11.firebaseapp.com",
  projectId: "chat-app-44a11",
  storageBucket: "chat-app-44a11.appspot.com",
  messagingSenderId: "1037574830254",
  appId: "1:1037574830254:web:f4539a069cf469716e953f",
  measurementId: "G-1NQW1KLKYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost'){
  db.useEmulator('localhost', '8080');
}

export {auth, db};
export default firebase;