
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

// const firebaseConfig = {
//   apiKey: "AIzaSyA810M70sZZrvbcjw4cpQ0GpUDkc26h5Sw",
//   authDomain: "de-moto.firebaseapp.com",
//   databaseURL: "https://de-moto-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "de-moto",
//   storageBucket: "de-moto.appspot.com",
//   messagingSenderId: "699977961544",
//   appId: "1:699977961544:web:e245796b8bfa03fff4087d",
//   measurementId: "G-FJ28JKPPHH"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDepqa6V4PAIstxClX9xek2G2yM-IZwF4g",
//   authDomain: "solo-hackathon.firebaseapp.com",
//   databaseURL: "https://solo-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "solo-hackathon",
//   storageBucket: "solo-hackathon.appspot.com",
//   messagingSenderId: "887906957622",
//   appId: "1:887906957622:web:8e33864461e0a618d7db97",
//   measurementId: "G-C435ZHY21P"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

export default firebase;