/*
 * dashboard.js
 * Protege a página (exige login), exibe o nome do usuário logado
 * e trata o clique em "logoff".
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    protegerPagina();

    const usuario = usuarioLogado();
    if (usuario) {
        document.getElementById('boas-vindas').textContent = `Bem-vindo(a), ${usuario.nome}`;
    }

    document.getElementById('link-logoff').addEventListener('click', (evento) => {
        evento.preventDefault();
        fazerLogoff();
    });
});
