
import firebase from "firebase";
// import "firebase/auth";

// export const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// });

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

export default firebase;