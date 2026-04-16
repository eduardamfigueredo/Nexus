// Função auxiliar para CRIAR o cookie
function setCookie(nome, valor, dias) {
    let data = new Date();
    // Multiplica os dias por horas, minutos, segundos e milissegundos
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expiracao = "expires=" + data.toUTCString();
    // Salva o cookie no navegador
    document.cookie = nome + "=" + valor + ";" + expiracao + ";path=/";
}

// Função auxiliar para LER o cookie
function getCookie(nome) {
    let nomeProcurado = nome + "=";
    let cookiesDecodificados = decodeURIComponent(document.cookie);
    let arrayDeCookies = cookiesDecodificados.split(';');
    
    for(let i = 0; i < arrayDeCookies.length; i++) {
        let cookieAtual = arrayDeCookies[i].trim();
        if (cookieAtual.indexOf(nomeProcurado) === 0) {
            return cookieAtual.substring(nomeProcurado.length, cookieAtual.length);
        }
    }
    return "";
}

// Espera a página HTML carregar totalmente antes de rodar o código principal
document.addEventListener("DOMContentLoaded", () => {
    
    // Pegando os elementos do HTML pelos IDs que criamos
    const inputEmail = document.getElementById("emailLogin");
    const checkboxLembrar = document.getElementById("lembrarEmail");
    const formLogin = document.getElementById("formLogin");

    // 1. O QUE ACONTECE QUANDO A PÁGINA ABRE:
    // Verifica se já existe um e-mail salvo no cookie chamado "nexus_email"
    let emailSalvo = getCookie("nexus_email");
    
    // Se encontrou um e-mail salvo, preenche o campo e marca a caixinha
    if (emailSalvo !== "") {
        inputEmail.value = emailSalvo;
        checkboxLembrar.checked = true;
    }

    // 2. O QUE ACONTECE QUANDO O USUÁRIO CLICA EM ENTRAR:
    formLogin.addEventListener("submit", (evento) => {
        // evento.preventDefault(); // (Descomente esta linha se quiser apenas testar sem a página recarregar)

        if (checkboxLembrar.checked) {
            // Se a caixa estiver marcada, salva o e-mail digitado por 30 dias
            setCookie("nexus_email", inputEmail.value, 30);
            console.log("E-mail salvo nos cookies!");
        } else {
            // Se a caixa NÃO estiver marcada, deleta o cookie colocando tempo negativo (-1 dia)
            setCookie("nexus_email", "", -1);
            console.log("Cookie deletado!");
        }
    });
});