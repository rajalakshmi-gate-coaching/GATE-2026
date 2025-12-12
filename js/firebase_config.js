// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmKDzGKE9FV9A7wHG21yAbgzIYMep4iHo",
  authDomain: "rec-gate-2026.firebaseapp.com",
  projectId: "rec-gate-2026",
  storageBucket: "rec-gate-2026.firebasestorage.app",
  messagingSenderId: "966656816540",
  appId: "1:966656816540:web:f07b7b6e2cb27114cc8459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export functions including update/delete
export { db, collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc };
