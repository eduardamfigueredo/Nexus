// ================== LOGIN SIMPLES ==================

const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value;
        const senha = document.getElementById("senhaLogin").value;

        // 🔥 LOGIN FAKE (define usuário fixo)
        if (email === "admin@email.com" && senha === "12345678") {
            localStorage.setItem("usuario", email);
            window.location.href = "index.html";
        } else {
            alert("Email ou senha inválidos");
        }
    });
}


// ================== CADASTRO SIMPLES ==================

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("emailRegistro").value;
        const senha = document.getElementById("senhaRegistro").value;

        if (senha.length < 8) {
            alert("Senha deve ter no mínimo 8 caracteres.");
            return;
        }

        // 🔥 salva no navegador
        localStorage.setItem("usuario", email);
        localStorage.setItem("senha", senha);

        alert("Cadastro realizado!");
    });
}


// ================== VERIFICA LOGIN ==================

const usuario = localStorage.getItem("usuario");
const pagina = window.location.pathname;
const btnEntrar = document.getElementById("btnEntrar");

if (usuario) {
    // 🔥 se estiver logado e estiver no login → vai pro index
    if (pagina.includes("login.html")) {
        window.location.href = "index.html";
    }

    // 🔥 mostra perfil
    if (btnEntrar) {
        btnEntrar.innerHTML = `
            <span>${usuario}</span>
            <button onclick="logout()">Sair</button>
        `;
    }

} else {
    // 🔒 bloqueia acesso ao index
    if (!pagina.includes("login.html")) {
        window.location.href = "login.html";
    }
}


// ================== LOGOUT ==================

window.logout = function () {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
};