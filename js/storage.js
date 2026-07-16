/*
 * storage.js
 * Simula um banco de dados usando localStorage do navegador.
 * Na primeira visita, os dados são carregados do arquivo data/dados.json.
 * Depois disso, tudo é lido/gravado direto no localStorage, o que permite
 * criar, listar e excluir anúncios/interesses de forma persistente
 * (sobrevive a recarregamentos de página).
 *
 * Esperado: a variável global CAMINHO_BASE deve estar definida ANTES
 * deste script ser carregado ('' para páginas na raiz, '../' para as
 * páginas dentro de restrita/).
 */

const CHAVES = {
    veiculos: 'autoponto_veiculos',
    usuarios: 'autoponto_usuarios',
    interesses: 'autoponto_interesses',
    inicializado: 'autoponto_inicializado'
};

// Garante que o localStorage tenha dados. Se for a primeira vez que o
// site é acessado neste navegador, carrega a "carga inicial" do JSON.
async function inicializarDados() {
    if (localStorage.getItem(CHAVES.inicializado)) {
        return;
    }

    const resposta = await fetch(CAMINHO_BASE + 'data/dados.json');
    const dados = await resposta.json();

    localStorage.setItem(CHAVES.veiculos, JSON.stringify(dados.veiculos));
    localStorage.setItem(CHAVES.usuarios, JSON.stringify(dados.usuarios));
    localStorage.setItem(CHAVES.interesses, JSON.stringify(dados.interesses));
    localStorage.setItem(CHAVES.inicializado, 'true');
}

function getVeiculos() {
    return JSON.parse(localStorage.getItem(CHAVES.veiculos) || '[]');
}

function salvarVeiculos(lista) {
    localStorage.setItem(CHAVES.veiculos, JSON.stringify(lista));
}

function getUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVES.usuarios) || '[]');
}

function salvarUsuarios(lista) {
    localStorage.setItem(CHAVES.usuarios, JSON.stringify(lista));
}

function getInteresses() {
    return JSON.parse(localStorage.getItem(CHAVES.interesses) || '[]');
}

function salvarInteresses(lista) {
    localStorage.setItem(CHAVES.interesses, JSON.stringify(lista));
}

// Gera o próximo ID disponível de uma lista (id = maior id atual + 1)
function proximoId(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(item => item.id)) + 1;
}
