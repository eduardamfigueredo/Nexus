import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmgHBxbZvCdeypFUgzGePTCoqmK4oPNKU",
  authDomain: "banco-de-dados---nexus.firebaseapp.com",
  projectId: "banco-de-dados---nexus",
  storageBucket: "banco-de-dados---nexus.firebasestorage.app",
  messagingSenderId: "604679602594",
  appId: "1:604679602594:web:94c24eccb9e4a1b32bb2fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);