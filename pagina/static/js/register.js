import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { auth, database } from "./firebase-config.js"; // ✅ usa tu archivo centralizado

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos en Firebase Realtime Database
    await set(ref(database, 'usuarios/' + user.uid), {
      uid: user.uid,
      correo: email,
      usuario: username
    });

    alert("✅ Registro exitoso");
    window.location.href = "/login/";

  } catch (error) {
    console.error("🛑 Error:", error);
    alert("Error: " + error.message);
  }
});