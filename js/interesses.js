/*
 * interesses.js
 * Protege a página e lista os interesses recebidos para um anúncio
 * específico (identificado pelo ?id= na URL), permitindo excluí-los.
 */

let ID_ANUNCIO_ATUAL = null;

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    protegerPagina();

    document.getElementById('link-logoff').addEventListener('click', (evento) => {
        evento.preventDefault();
        fazerLogoff();
    });

    const parametros = new URLSearchParams(window.location.search);
    ID_ANUNCIO_ATUAL = parseInt(parametros.get('id'), 10);

    const veiculo = getVeiculos().find(v => v.id === ID_ANUNCIO_ATUAL);
    if (veiculo) {
        document.getElementById('titulo-interesses').textContent =
            `Interesses recebidos - ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`;
    }

    renderizarInteresses();
});

function renderizarInteresses() {
    const corpoTabela = document.getElementById('corpo-tabela-interesses');
    const mensagemVazio = document.getElementById('mensagem-vazio');

    const interessesDoAnuncio = getInteresses().filter(i => i.idAnuncio === ID_ANUNCIO_ATUAL);

    corpoTabela.innerHTML = '';

    if (interessesDoAnuncio.length === 0) {
        mensagemVazio.style.display = 'block';
        return;
    }
    mensagemVazio.style.display = 'none';

    interessesDoAnuncio.forEach(interesse => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${interesse.nome}</td>
            <td>${interesse.telefone}</td>
            <td>${interesse.mensagem}</td>
            <td class="acoes-tabela">
                <button type="button" class="btn-excluir" data-id="${interesse.id}">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });

    corpoTabela.querySelectorAll('.btn-excluir').forEach(botao => {
        botao.addEventListener('click', () => excluirInteresse(parseInt(botao.dataset.id, 10)));
    });
}

function excluirInteresse(id) {
    const confirmar = confirm('Tem certeza que deseja excluir esta mensagem de interesse?');
    if (!confirmar) return;

    const interesses = getInteresses().filter(i => i.id !== id);
    salvarInteresses(interesses);

    renderizarInteresses();
}
