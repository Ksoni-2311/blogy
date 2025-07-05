// Import the functions you need from the SDKs you need
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApCrTrkqAJzHmngjWL_x8ClppOjyzj-yc",
  authDomain: "blogy-d445f.firebaseapp.com",
  projectId: "blogy-d445f",
  storageBucket: "blogy-d445f.firebasestorage.app",
  messagingSenderId: "916677061602",
  appId: "1:916677061602:web:99a59887d5b9fa146ba7bb",
  measurementId: "G-30BGSJXMM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const analytics = getAnalytics(app);
const googleProvider=new GoogleAuthProvider()

export {auth,googleProvider}