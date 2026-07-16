/*
 * busca.js
 * Lógica da página principal (index.html): carrega os veículos,
 * popula os selects de marca/modelo/cidade dinamicamente e filtra
 * os cards exibidos conforme a seleção do usuário.
 */

let TODOS_VEICULOS = [];

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    TODOS_VEICULOS = getVeiculos();

    popularSelectMarcas();
    renderizarCards(TODOS_VEICULOS);

    document.getElementById('marca').addEventListener('change', () => {
        popularSelectModelos();
        popularSelectCidades();
        aplicarFiltro();
    });
    document.getElementById('modelo').addEventListener('change', () => {
        popularSelectCidades();
        aplicarFiltro();
    });
    document.getElementById('cidade').addEventListener('change', aplicarFiltro);
    document.getElementById('btn-buscar').addEventListener('click', aplicarFiltro);
});

// Preenche o select de marcas com valores únicos, sem duplicar
function popularSelectMarcas() {
    const select = document.getElementById('marca');
    const marcas = [...new Set(TODOS_VEICULOS.map(v => v.marca))].sort();

    select.innerHTML = '<option value="">Todas</option>';
    marcas.forEach(marca => {
        const opcao = document.createElement('option');
        opcao.value = marca;
        opcao.textContent = marca;
        select.appendChild(opcao);
    });
}

// Preenche o select de modelos considerando apenas a marca selecionada
function popularSelectModelos() {
    const marcaSelecionada = document.getElementById('marca').value;
    const selectModelo = document.getElementById('modelo');

    const veiculosDaMarca = marcaSelecionada
        ? TODOS_VEICULOS.filter(v => v.marca === marcaSelecionada)
        : TODOS_VEICULOS;

    const modelos = [...new Set(veiculosDaMarca.map(v => v.modelo))].sort();

    selectModelo.innerHTML = '<option value="">Todos</option>';
    modelos.forEach(modelo => {
        const opcao = document.createElement('option');
        opcao.value = modelo;
        opcao.textContent = modelo;
        selectModelo.appendChild(opcao);
    });
}

// Preenche o select de cidades considerando marca e modelo já selecionados
function popularSelectCidades() {
    const marcaSelecionada = document.getElementById('marca').value;
    const modeloSelecionado = document.getElementById('modelo').value;
    const selectCidade = document.getElementById('cidade');

    let veiculosFiltrados = TODOS_VEICULOS;
    if (marcaSelecionada) {
        veiculosFiltrados = veiculosFiltrados.filter(v => v.marca === marcaSelecionada);
    }
    if (modeloSelecionado) {
        veiculosFiltrados = veiculosFiltrados.filter(v => v.modelo === modeloSelecionado);
    }

    const cidades = [...new Set(veiculosFiltrados.map(v => v.cidade))].sort();

    selectCidade.innerHTML = '<option value="">Todas</option>';
    cidades.forEach(cidade => {
        const opcao = document.createElement('option');
        opcao.value = cidade;
        opcao.textContent = cidade;
        selectCidade.appendChild(opcao);
    });
}

// Aplica o filtro escolhido e renderiza os últimos 20 anúncios correspondentes
function aplicarFiltro() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const cidade = document.getElementById('cidade').value;

    let resultado = TODOS_VEICULOS;
    if (marca) resultado = resultado.filter(v => v.marca === marca);
    if (modelo) resultado = resultado.filter(v => v.modelo === modelo);
    if (cidade) resultado = resultado.filter(v => v.cidade === cidade);

    // Ordena do mais recente para o mais antigo e limita a 20 resultados
    resultado = resultado
        .slice()
        .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
        .slice(0, 20);

    renderizarCards(resultado);
}

// Constrói e insere os cards de anúncio na tela
function renderizarCards(lista) {
    const container = document.getElementById('container-cards');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    container.innerHTML = '';

    if (lista.length === 0) {
        mensagemVazio.style.display = 'block';
        return;
    }
    mensagemVazio.style.display = 'none';

    lista.forEach(veiculo => {
        const card = document.createElement('article');
        card.className = 'card-anuncio';
        card.innerHTML = `
            <img src="${veiculo.foto}" alt="${veiculo.marca} ${veiculo.modelo}">
            <div class="info">
                <h3>${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}</h3>
                <span class="local">${veiculo.cidade} - ${veiculo.estado}</span>
                <span class="preco">R$ ${veiculo.valor.toLocaleString('pt-BR')}</span>
            </div>
            <a href="veiculo-detalhe.html?id=${veiculo.id}" class="btn-detalhe">Ver detalhes</a>
        `;
        container.appendChild(card);
    });
}
