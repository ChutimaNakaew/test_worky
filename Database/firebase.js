// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWcnZllwpnTbx958FtNiw4QjCKTkkN15w",
  authDomain: "workout-5afba.firebaseapp.com",
  projectId: "workout-5afba",
  storageBucket: "workout-5afba.appspot.com",
  messagingSenderId: "383432808367",
  appId: "1:383432808367:web:2ce87262132dfe94e3c15a",
  measurementId: "G-4QG4N5VMQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);