/*
 * login.js
 * Valida o formulário de login e confere as credenciais contra os
 * usuários cadastrados (simulados via localStorage / auth.js).
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    document.getElementById('form-login').addEventListener('submit', processarLogin);
});

function processarLogin(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    let valido = true;

    if (!validarEmail(email)) {
        mostrarErro('email', 'Informe um e-mail válido.');
        valido = false;
    } else {
        limparErro('email');
    }

    if (!campoPreenchido(senha)) {
        mostrarErro('senha', 'Informe sua senha.');
        valido = false;
    } else {
        limparErro('senha');
    }

    if (!valido) return;

    const sucesso = fazerLogin(email.trim(), senha);

    if (sucesso) {
        window.location.href = CAMINHO_BASE + 'restrita/dashboard.html';
    } else {
        document.getElementById('mensagem-envio').innerHTML =
            '<p class="mensagem-erro-login">E-mail ou senha incorretos.</p>';
    }
}
