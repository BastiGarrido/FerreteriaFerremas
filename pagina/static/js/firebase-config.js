import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCE2-J6Wd7rGIlVBMP4sDyRJ1To6FlUvV8",
  authDomain: "ferremas-1d1cb.firebaseapp.com",
  projectId: "ferremas-1d1cb",
  storageBucket: "ferremas-1d1cb.firebasestorage.app",
  messagingSenderId: "879545782088",
  appId: "1:879545782088:web:c7af01550920e9f25b6d7d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación para usarla en otros scripts
export const auth = getAuth(app);