document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const btnAceitar = document.getElementById('btn-aceitar-cookie');

    // Verifica se o usuário já aceitou antes (está guardado no navegador)
    if (!localStorage.getItem('cookiesAceitos')) {
        banner.style.display = 'block'; // Se não aceitou, mostra o banner
    }

    btnAceitar.addEventListener('click', () => {
        // Guarda a informação de que ele aceitou
        localStorage.setItem('cookiesAceitos', 'true');
        // Esconde o banner
        banner.style.display = 'none';
    });
});