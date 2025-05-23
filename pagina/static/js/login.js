import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { auth, database } from "./firebase-config.js";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Leer datos desde Firebase Database
      const userRef = ref(database, 'usuarios/' + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const datos = snapshot.val();
        console.log("✅ Datos del usuario:", datos);

        // Guardar nombre del usuario en localStorage (opcional)
        localStorage.setItem("usuario", datos.usuario);
        localStorage.setItem("correo", datos.correo);

        alert(`Bienvenido, ${datos.usuario}`);
        window.location.href = "/";
      } else {
        alert("⚠️ Usuario autenticado pero no registrado en la base de datos.");
      }
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      alert("Error: " + error.message);
    });
});