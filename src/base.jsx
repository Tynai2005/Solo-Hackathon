
import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDepqa6V4PAIstxClX9xek2G2yM-IZwF4g",
  authDomain: "solo-hackathon.firebaseapp.com",
  databaseURL: "https://solo-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "solo-hackathon",
  storageBucket: "solo-hackathon.appspot.com",
  messagingSenderId: "887906957622",
  appId: "1:887906957622:web:8974e6b312499584d7db97",
  measurementId: "G-W6BXWE0L74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

export default firebase;