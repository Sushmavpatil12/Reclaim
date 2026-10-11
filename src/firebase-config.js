// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZA4rRLhBnxHzMB0xs4knEoIskcwLNV3Q",
  authDomain: "umatter-86c61.firebaseapp.com",
  projectId: "umatter-86c61",
  storageBucket: "umatter-86c61.appspot.com",
  messagingSenderId: "779810752549",
  appId: "1:779810752549:web:499bb2f5662542a4c197cc",
  measurementId: "G-HQ0SEJGHEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
