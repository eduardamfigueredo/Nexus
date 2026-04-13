import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// ================== CADASTRO ==================
const formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailRegistro").value;
    const senha = document.getElementById("senhaRegistro").value;

    if (senha.length < 8) {
        alert("Senha deve ter no mínimo 8 caracteres.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        alert("Erro: " + error.message);
    }
});

// ================== LOGIN ==================
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado!");
        window.location.href = "index.html";
    } catch (error) {
        alert("Erro: " + error.message);
    }
});