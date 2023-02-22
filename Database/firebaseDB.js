import * as firebase from "firebase/compat";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWcnZllwpnTbx958FtNiw4QjCKTkkN15w",
    authDomain: "workout-5afba.firebaseapp.com",
    projectId: "workout-5afba",
    storageBucket: "workout-5afba.appspot.com",
    messagingSenderId: "383432808367",
    appId: "1:383432808367:web:2ce87262132dfe94e3c15a",
    measurementId: "G-4QG4N5VMQF"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;