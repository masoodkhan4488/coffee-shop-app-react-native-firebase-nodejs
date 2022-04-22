// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC36IgxKHnaeMKBwmCPvKqF-oZ-aH6jXMc",
  authDomain: "coffee-shop-e7325.firebaseapp.com",
  projectId: "coffee-shop-e7325",
  storageBucket: "coffee-shop-e7325.appspot.com",
  messagingSenderId: "857559439782",
  appId: "1:857559439782:web:1f4535cf8d3762e438d767",
  measurementId: "G-SG7VLFYVGG",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
