/*
 * meus-anuncios.js
 * Protege a página, lista os anúncios do usuário logado e permite excluí-los.
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    protegerPagina();

    document.getElementById('link-logoff').addEventListener('click', (evento) => {
        evento.preventDefault();
        fazerLogoff();
    });

    renderizarMeusAnuncios();
});

function renderizarMeusAnuncios() {
    const usuario = usuarioLogado();
    const corpoTabela = document.getElementById('corpo-tabela-anuncios');
    const mensagemVazio = document.getElementById('mensagem-vazio');

    const meusAnuncios = getVeiculos().filter(v => v.idAnunciante === usuario.id);

    corpoTabela.innerHTML = '';

    if (meusAnuncios.length === 0) {
        mensagemVazio.style.display = 'block';
        return;
    }
    mensagemVazio.style.display = 'none';

    meusAnuncios.forEach(veiculo => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td><img alt="${veiculo.marca} ${veiculo.modelo}"></td>
            <td>${veiculo.marca}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.ano}</td>
            <td class="acoes-tabela">
                <a href="anuncio-detalhe.html?id=${veiculo.id}" class="btn-ver">Ver</a>
                <a href="interesses.html?id=${veiculo.id}" class="btn-interesses">Interesses</a>
                <button type="button" class="btn-excluir" data-id="${veiculo.id}">Excluir</button>
            </td>
        `;
        // Ajusta o caminho da foto: fotos enviadas via upload (base64) são
        // usadas direto; fotos de exemplo do JSON inicial precisam do
        // caminho relativo correto a partir da pasta restrita/
        const imgTag = linha.querySelector('img');
        imgTag.src = veiculo.foto.startsWith('data:') ? veiculo.foto : '../' + veiculo.foto;

        corpoTabela.appendChild(linha);
    });

    corpoTabela.querySelectorAll('.btn-excluir').forEach(botao => {
        botao.addEventListener('click', () => excluirAnuncio(parseInt(botao.dataset.id, 10)));
    });
}

function excluirAnuncio(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este anúncio? Os interesses relacionados também serão removidos.');
    if (!confirmar) return;

    const veiculos = getVeiculos().filter(v => v.id !== id);
    salvarVeiculos(veiculos);

    // Remove também os interesses relacionados a esse anúncio
    const interesses = getInteresses().filter(i => i.idAnuncio !== id);
    salvarInteresses(interesses);

    renderizarMeusAnuncios();
}
