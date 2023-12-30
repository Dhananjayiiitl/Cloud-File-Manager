// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud--storage-manager.firebaseapp.com",
  projectId: "cloud--storage-manager",
  storageBucket: "cloud--storage-manager.appspot.com",
  messagingSenderId: "903303106237",
  appId: "1:903303106237:web:ae9eff6da8c3626950b1d4",
  measurementId: "G-5ELBX9L4RH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
