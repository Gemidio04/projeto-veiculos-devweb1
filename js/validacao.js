/*
 * validacao.js
 * Funções genéricas de validação e exibição de erro, reutilizadas
 * em todos os formulários do site.
 */

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validarCPF(cpf) {
    const apenasNumeros = cpf.replace(/\D/g, '');
    return apenasNumeros.length === 11;
}

function validarTelefone(telefone) {
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

function campoPreenchido(valor) {
    return valor.trim().length > 0;
}

// Exibe uma mensagem de erro logo abaixo do campo indicado
// e marca visualmente o campo como inválido.
function mostrarErro(idCampo, mensagem) {
    const campo = document.getElementById(idCampo);
    if (!campo) return;

    let elementoErro = document.getElementById(idCampo + '-erro');
    if (!elementoErro) {
        elementoErro = document.createElement('span');
        elementoErro.id = idCampo + '-erro';
        elementoErro.className = 'erro-campo';
        campo.insertAdjacentElement('afterend', elementoErro);
    }
    elementoErro.textContent = mensagem;
    campo.classList.add('campo-invalido');
}

// Remove a mensagem de erro e a marcação visual do campo.
function limparErro(idCampo) {
    const campo = document.getElementById(idCampo);
    if (!campo) return;

    const elementoErro = document.getElementById(idCampo + '-erro');
    if (elementoErro) {
        elementoErro.textContent = '';
    }
    campo.classList.remove('campo-invalido');
}
