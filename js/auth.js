/*
 * auth.js
 * Simula autenticação usando sessionStorage (dura enquanto a aba
 * do navegador estiver aberta - ao fechar, a "sessão" se encerra).
 * Depende de storage.js já ter sido carregado antes.
 */

const CHAVE_SESSAO = 'autoponto_usuarioLogado';

// Confere e-mail/senha contra os usuários cadastrados.
// Se bater, guarda o usuário logado na sessão e retorna true.
function fazerLogin(email, senha) {
    const usuarios = getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        return false;
    }

    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }));
    return true;
}

// Retorna os dados do usuário logado, ou null se ninguém estiver logado.
function usuarioLogado() {
    const dado = sessionStorage.getItem(CHAVE_SESSAO);
    return dado ? JSON.parse(dado) : null;
}

// Chamar no início de páginas restritas: redireciona para o login
// caso não haja ninguém autenticado.
function protegerPagina() {
    if (!usuarioLogado()) {
        window.location.href = CAMINHO_BASE + 'login.html';
    }
}

// Encerra a sessão e volta para a página pública inicial.
function fazerLogoff() {
    sessionStorage.removeItem(CHAVE_SESSAO);
    window.location.href = CAMINHO_BASE + 'index.html';
}
