/*
 * cadastro.js
 * Valida e processa o formulário de cadastro de novo usuário/anunciante.
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    document.getElementById('form-cadastro').addEventListener('submit', processarCadastro);
});

function processarCadastro(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;

    let valido = true;

    if (!campoPreenchido(nome)) {
        mostrarErro('nome', 'Informe seu nome completo.');
        valido = false;
    } else {
        limparErro('nome');
    }

    if (!validarCPF(cpf)) {
        mostrarErro('cpf', 'CPF inválido. Digite os 11 números.');
        valido = false;
    } else {
        limparErro('cpf');
    }

    if (!validarEmail(email)) {
        mostrarErro('email', 'Informe um e-mail válido.');
        valido = false;
    } else {
        const usuarios = getUsuarios();
        if (usuarios.some(u => u.email === email.trim())) {
            mostrarErro('email', 'Já existe uma conta com esse e-mail.');
            valido = false;
        } else {
            limparErro('email');
        }
    }

    if (senha.length < 6) {
        mostrarErro('senha', 'A senha deve ter pelo menos 6 caracteres.');
        valido = false;
    } else {
        limparErro('senha');
    }

    if (!validarTelefone(telefone)) {
        mostrarErro('telefone', 'Informe um telefone válido (DDD + número).');
        valido = false;
    } else {
        limparErro('telefone');
    }

    if (!valido) return;

    const usuarios = getUsuarios();
    usuarios.push({
        id: proximoId(usuarios),
        nome: nome.trim(),
        cpf: cpf.replace(/\D/g, ''),
        email: email.trim(),
        senha: senha,
        telefone: telefone.trim()
    });
    salvarUsuarios(usuarios);

    document.getElementById('mensagem-envio').innerHTML =
        '<p class="mensagem-sucesso">Cadastro realizado com sucesso! Redirecionando para o login...</p>';

    setTimeout(() => {
        window.location.href = CAMINHO_BASE + 'login.html';
    }, 1500);
}
