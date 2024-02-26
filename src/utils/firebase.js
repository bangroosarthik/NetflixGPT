// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCaj8ZOdso17kRdsgJmE7mUOU8TTvuIiM",
  authDomain: "netflixgpt-dd582.firebaseapp.com",
  projectId: "netflixgpt-dd582",
  storageBucket: "netflixgpt-dd582.appspot.com",
  messagingSenderId: "51102096907",
  appId: "1:51102096907:web:46c319ea5e3d216997b10e",
  measurementId: "G-N4XQ6M4SPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();