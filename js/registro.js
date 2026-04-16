document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PARTE 0: ANIMAÇÃO DE TROCAR DE TELA
    // ==========================================
    const telaLogin = document.getElementById('tela-login');
    const telaRegistro = document.getElementById('tela-registro');
    const btnIrRegistro = document.getElementById('link-ir-registro');
    const btnIrLogin = document.getElementById('link-ir-login');

    btnIrRegistro.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que a página pule
        telaLogin.style.display = 'none'; // Esconde Login
        telaRegistro.style.display = 'block'; // Mostra Registro
    });

    btnIrLogin.addEventListener('click', (e) => {
        e.preventDefault();
        telaRegistro.style.display = 'none'; // Esconde Registro
        telaLogin.style.display = 'block'; // Mostra Login
    });

    // ==========================================
    // PARTE 1: LÓGICA DE REGISTRO (CRIAR CONTA)
    // ==========================================
    const formRegistro = document.getElementById('form-registro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        const nome = document.getElementById('reg-nome').value;
        const email = document.getElementById('reg-email').value;
        const senha = document.getElementById('reg-senha').value;

        if (senha.length < 8) {
            alert("Segurança: Sua senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            // ---> A MUDANÇA ESTÁ AQUI: Novo link da nuvem <---
            const resposta = await fetch('https://nexus-api-v4px.onrender.com/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await resposta.json();
            
            if (resposta.ok) {
                alert("✨ Conta criada com sucesso! Agora faça o login.");
                formRegistro.reset(); // Limpa os campos
                
                // Animação extra: volta para a tela de login sozinho!
                telaRegistro.style.display = 'none';
                telaLogin.style.display = 'block';
            } else {
                alert("❌ Erro: " + dados.erro);
            }
        } catch (error) {
            alert("❌ Erro de conexão. Verifique se o servidor no Render está ativo.");
        }
    });

    // ==========================================
    // PARTE 2: LÓGICA DE LOGIN (ENTRAR NA CONTA)
    // ==========================================
    const formLogin = document.getElementById('form-login');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        try {
            // ---> A MUDANÇA ESTÁ AQUI: Novo link da nuvem <---
            const resposta = await fetch('https://nexus-api-v4px.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();
            
            if (resposta.ok) {
                alert("Bem-vinda, " + dados.nome + "! 🚀");
                localStorage.setItem('usuarioNexus', dados.nome); // Guarda a pulseira VIP
                window.location.href = "index.html"; // Manda para a Home
            } else {
                alert("❌ Erro: " + dados.erro);
            }
        } catch (error) {
            alert("❌ Erro de conexão. Verifique se o servidor no Render está ativo.");
        }
    });

});