import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const username = document.getElementById("username").value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Opcional: guardar el nombre de usuario en el perfil
      return updateProfile(userCredential.user, {
        displayName: username
      });
    })
    .then(() => {
      alert("Cuenta creada correctamente");
      window.location.href = "/login/";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});