/*
 * detalhe.js
 * Lógica da página pública de detalhe do veículo (veiculo-detalhe.html).
 * Lê o parâmetro ?id= da URL, busca o veículo correspondente e exibe
 * seus dados. Também valida e salva o formulário de registro de interesse.
 */

let VEICULO_ATUAL = null;

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();

    const parametros = new URLSearchParams(window.location.search);
    const id = parseInt(parametros.get('id'), 10);

    const veiculos = getVeiculos();
    VEICULO_ATUAL = veiculos.find(v => v.id === id);

    renderizarDetalhe(VEICULO_ATUAL);

    document.getElementById('form-interesse').addEventListener('submit', enviarInteresse);
});

function renderizarDetalhe(veiculo) {
    const container = document.getElementById('detalhe-veiculo');

    if (!veiculo) {
        container.innerHTML = '<p style="padding: 1rem;">Anúncio não encontrado.</p>';
        return;
    }

    container.innerHTML = `
        <img src="${veiculo.foto}" alt="${veiculo.marca} ${veiculo.modelo}">
        <div class="info">
            <h2>${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}</h2>
            <p><strong>Cor:</strong> ${veiculo.cor}</p>
            <p><strong>Quilometragem:</strong> ${veiculo.km.toLocaleString('pt-BR')} km</p>
            <p><strong>Cidade:</strong> ${veiculo.cidade} - ${veiculo.estado}</p>
            <p><strong>Descrição:</strong> ${veiculo.descricao}</p>
            <span class="preco">R$ ${veiculo.valor.toLocaleString('pt-BR')}</span>
        </div>
    `;
}

function enviarInteresse(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    let valido = true;

    if (!campoPreenchido(nome)) {
        mostrarErro('nome', 'Informe seu nome.');
        valido = false;
    } else {
        limparErro('nome');
    }

    if (!validarTelefone(telefone)) {
        mostrarErro('telefone', 'Informe um telefone válido (DDD + número).');
        valido = false;
    } else {
        limparErro('telefone');
    }

    if (!campoPreenchido(mensagem)) {
        mostrarErro('mensagem', 'Escreva uma mensagem.');
        valido = false;
    } else {
        limparErro('mensagem');
    }

    if (!valido || !VEICULO_ATUAL) return;

    const interesses = getInteresses();
    interesses.push({
        id: proximoId(interesses),
        idAnuncio: VEICULO_ATUAL.id,
        nome: nome.trim(),
        telefone: telefone.trim(),
        mensagem: mensagem.trim(),
        dataHora: new Date().toISOString()
    });
    salvarInteresses(interesses);

    document.getElementById('mensagem-envio').innerHTML =
        '<p class="mensagem-sucesso">Interesse enviado com sucesso! O anunciante poderá ver sua mensagem.</p>';
    document.getElementById('form-interesse').reset();
}
