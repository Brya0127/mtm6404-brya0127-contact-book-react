// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_fmJdNVaQZg16mPBeIDNjVHrAX8zIiF0",
  authDomain: "contact-3555b.firebaseapp.com",
  projectId: "contact-3555b",
  storageBucket: "contact-3555b.firebasestorage.app",
  messagingSenderId: "417079918167",
  appId: "1:417079918167:web:66ba4061b2f9239e216d12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;