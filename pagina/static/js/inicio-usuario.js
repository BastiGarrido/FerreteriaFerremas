import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

const authInstance = getAuth();

onAuthStateChanged(authInstance, (user) => {
  if (user) {
    const nombre = localStorage.getItem("usuario");
    if (nombre) {
      document.getElementById("bienvenidaUsuario").textContent = "Hola, " + nombre;
    }
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  localStorage.clear();
  alert("Sesión cerrada");
  window.location.href = "/login/";
});