document.addEventListener('DOMContentLoaded', () => {

    // 1. CARREGAR NOME DO USUÁRIO
    const nomeSalvo = localStorage.getItem('usuarioNexus');
    
    // Se não tiver ninguém logado, chuta a pessoa para o login!
    if (!nomeSalvo) {
        window.location.href = "login.html";
        return;
    }

    // Coloca o nome na tela e na foto padrão
    document.getElementById('nome-usuario-tela').innerText = nomeSalvo;
    const primeiraLetra = nomeSalvo.charAt(0).toUpperCase();
    const foto = document.getElementById('foto-perfil');
    
    // Se ele ainda não tiver foto salva, põe uma imagem gerada com a inicial dele
    if (!localStorage.getItem('fotoNexus')) {
        foto.src = `https://ui-avatars.com/api/?name=${nomeSalvo}&background=2d2d2d&color=ff6b6b&size=200`;
    } else {
        // Se já tiver foto salva no PC, usa ela
        foto.src = localStorage.getItem('fotoNexus');
    }

    // 2. LÓGICA DE TROCAR A FOTO DE PERFIL
    const inputFoto = document.getElementById('input-foto');
    
    inputFoto.addEventListener('change', (evento) => {
        const arquivo = evento.target.files[0];
        
        if (arquivo) {
            const leitor = new FileReader(); // Ferramenta do navegador para ler imagens
            
            leitor.onload = function(e) {
                const imagemBase64 = e.target.result;
                foto.src = imagemBase64; // Troca a imagem na tela na hora
                
                // Salva a imagem na memória do navegador para não sumir quando atualizar
                localStorage.setItem('fotoNexus', imagemBase64);
            }
            
            leitor.readAsDataURL(arquivo);
        }
    });

    // 3. BOTÃO DE EDITAR BIOGRAFIA
    const btnEditar = document.getElementById('btn-editar-bio');
    btnEditar.addEventListener('click', () => {
        alert("Em breve! Aqui vamos abrir um pop-up para você digitar seus novos dados e enviar para o MongoDB.");
    });
});