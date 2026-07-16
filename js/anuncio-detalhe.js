/*
 * anuncio-detalhe.js
 * Protege a página e exibe o detalhe do anúncio (área restrita),
 * lendo o id do veículo a partir do parâmetro ?id= da URL.
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    protegerPagina();

    document.getElementById('link-logoff').addEventListener('click', (evento) => {
        evento.preventDefault();
        fazerLogoff();
    });

    const parametros = new URLSearchParams(window.location.search);
    const id = parseInt(parametros.get('id'), 10);
    const veiculo = getVeiculos().find(v => v.id === id);

    renderizarDetalhe(veiculo);
});

function renderizarDetalhe(veiculo) {
    const container = document.getElementById('detalhe-veiculo');

    if (!veiculo) {
        container.innerHTML = '<p style="padding: 1rem;">Anúncio não encontrado.</p>';
        return;
    }

    const caminhoFoto = veiculo.foto.startsWith('data:') ? veiculo.foto : '../' + veiculo.foto;

    container.innerHTML = `
        <img src="${caminhoFoto}" alt="${veiculo.marca} ${veiculo.modelo}">
        <div class="info">
            <h2>${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}</h2>
            <p><strong>Cor:</strong> ${veiculo.cor}</p>
            <p><strong>Quilometragem:</strong> ${veiculo.km.toLocaleString('pt-BR')} km</p>
            <p><strong>Estado/Cidade:</strong> ${veiculo.estado} - ${veiculo.cidade}</p>
            <p><strong>Descrição:</strong> ${veiculo.descricao}</p>
            <span class="preco">R$ ${veiculo.valor.toLocaleString('pt-BR')}</span>
        </div>
    `;
}
