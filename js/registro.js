document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PARTE 1: LÓGICA DE REGISTRO (CRIAR CONTA)
    // ==========================================
    const formRegistro = document.querySelector('.register-section form');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede a página de piscar/recarregar
        
        // Pega o que você digitou usando os IDs novos
        const nome = document.getElementById('reg-nome').value;
        const email = document.getElementById('reg-email').value;
        const senha = document.getElementById('reg-senha').value;

        // Aquela sua verificação de segurança
        if (senha.length < 8) {
            alert("Segurança: Sua senha deve ter pelo menos 8 caracteres.");
            return; // Para o código aqui
        }

        try {
            // Envia para o Node.js
            const resposta = await fetch('http://127.0.0.1:3000/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await resposta.json();
            
            if (resposta.ok) {
                alert("✨ Conta criada com sucesso! Agora faça o login ao lado.");
                formRegistro.reset(); // Limpa os campos digitados
            } else {
                alert("❌ Erro: " + dados.erro); // Ex: "E-mail já cadastrado"
            }
        } catch (error) {
            alert("❌ O servidor está desligado! Ligue com 'node server.js' no terminal.");
        }
    });


    // ==========================================
    // PARTE 2: LÓGICA DE LOGIN (ENTRAR NA CONTA)
    // ==========================================
    const formLogin = document.querySelector('.login-section form');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Pega o que você digitou na parte de Login
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        try {
            // Envia para o Node.js verificar
            const resposta = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();
            
            if (resposta.ok) {
                alert("Bem-vinda, " + dados.nome + "! 🚀");
                window.location.href = "index.html"; // Manda você para a página inicial
            } else {
                alert("❌ Erro: " + dados.erro); // Ex: "Senha incorreta"
            }
        } catch (error) {
            alert("❌ O servidor está desligado! Ligue com 'node server.js' no terminal.");
        }
    });

});