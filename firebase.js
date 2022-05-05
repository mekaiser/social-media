// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDownloadURL,
  getFirestore,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADEKSt866TmkKDJg3FmEdF5w7BPo5frnA",
  authDomain: "social-media-316e8.firebaseapp.com",
  projectId: "social-media-316e8",
  storageBucket: "social-media-316e8.appspot.com",
  messagingSenderId: "27685279630",
  appId: "1:27685279630:web:3705bdee3059ef19e8b6df",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const db = getFirestore(app);

const storage = getStorage(app);

export {
  addDoc,
  setDoc,
  serverTimestamp,
  storage,
  collection,
  db,
  getDownloadURL,
  doc,
};

