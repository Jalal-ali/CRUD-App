import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore ,doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeD0WogSkWlPu1wD7VK3o_q7iKvMfIcqo",
  authDomain: "login-app-786.firebaseapp.com",
  projectId: "login-app-786",
  storageBucket: "login-app-786.appspot.com",
  messagingSenderId: "285629337150",
  appId: "1:285629337150:web:0d9e1b1ea3a37b2c828b6f",
  measurementId: "G-9ZMLCSWY5X"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 
 export {app , auth , db};


 