import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


// ================== VERIFICA LOGIN ==================
const pagina = window.location.pathname;

onAuthStateChanged(auth, (user) => {
    const btnEntrar = document.getElementById("btnEntrar");

    if (user) {
        console.log("Logado:", user.email);

        // 🔥 Se estiver na tela de login → vai pro início
        if (pagina.includes("login.html")) {
            window.location.href = "index.html";
        }

        // 🔥 Troca botão "Entrar" por perfil
        if (btnEntrar) {
            btnEntrar.innerHTML = `
                <span>${user.email}</span>
                <button onclick="logout()">Sair</button>
            `;
        }

    } else {
        // 🔒 Se não estiver logado e não estiver na tela de login
        if (!pagina.includes("login.html")) {
            window.location.href = "login.html";
        }
    }
});


// ================== CADASTRO ==================
const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
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
}


// ================== LOGIN ==================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value;
        const senha = document.getElementById("senhaLogin").value;

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            window.location.href = "index.html";
        } catch (error) {
            alert("Erro: " + error.message);
        }
    });
}


// ================== LOGOUT ==================
window.logout = function () {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
};