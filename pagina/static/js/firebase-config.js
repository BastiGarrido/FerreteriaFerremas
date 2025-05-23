import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCE2-J6Wd7rGIlVBMP4sDyRJ1To6FlUvV8",
  authDomain: "ferremas-1d1cb.firebaseapp.com",
  databaseURL: "https://ferremas-1d1cb-default-rtdb.firebaseio.com",
  projectId: "ferremas-1d1cb",
  storageBucket: "ferremas-1d1cb.appspot.com", // 🔧 corregido
  messagingSenderId: "879545782088",
  appId: "1:879545782088:web:c7af01550920e9f25b6d7d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);