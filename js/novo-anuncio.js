/*
 * novo-anuncio.js
 * Protege a página, valida o formulário de criação de anúncio e
 * salva o novo veículo no localStorage vinculado ao usuário logado.
 */

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarDados();
    protegerPagina();

    document.getElementById('link-logoff').addEventListener('click', (evento) => {
        evento.preventDefault();
        fazerLogoff();
    });

    document.getElementById('form-novo-anuncio').addEventListener('submit', processarNovoAnuncio);
});

function processarNovoAnuncio(evento) {
    evento.preventDefault();

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;
    const km = document.getElementById('km').value;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;
    const inputFotos = document.getElementById('fotos');

    let valido = true;

    if (!campoPreenchido(marca)) { mostrarErro('marca', 'Informe a marca.'); valido = false; } else limparErro('marca');
    if (!campoPreenchido(modelo)) { mostrarErro('modelo', 'Informe o modelo.'); valido = false; } else limparErro('modelo');
    if (!ano || ano < 1950 || ano > 2026) { mostrarErro('ano', 'Informe um ano válido.'); valido = false; } else limparErro('ano');
    if (!campoPreenchido(cor)) { mostrarErro('cor', 'Informe a cor.'); valido = false; } else limparErro('cor');
    if (km === '' || km < 0) { mostrarErro('km', 'Informe a quilometragem.'); valido = false; } else limparErro('km');
    if (!campoPreenchido(descricao)) { mostrarErro('descricao', 'Escreva uma descrição.'); valido = false; } else limparErro('descricao');
    if (valor === '' || valor <= 0) { mostrarErro('valor', 'Informe um valor válido.'); valido = false; } else limparErro('valor');
    if (!estado) { mostrarErro('estado', 'Selecione o estado.'); valido = false; } else limparErro('estado');
    if (!campoPreenchido(cidade)) { mostrarErro('cidade', 'Informe a cidade.'); valido = false; } else limparErro('cidade');

    if (inputFotos.files.length < 3) {
        mostrarErro('fotos', 'Selecione no mínimo 3 fotos.');
        valido = false;
    } else {
        limparErro('fotos');
    }

    if (!valido) return;

    // Converte a primeira foto selecionada em base64 para simular o
    // armazenamento da imagem (o envio/armazenamento real de arquivos
    // no servidor só será implementado na etapa com PHP/MySQL).
    const leitor = new FileReader();
    leitor.onload = () => {
        salvarNovoAnuncio({
            marca: marca.trim(),
            modelo: modelo.trim(),
            ano: parseInt(ano, 10),
            cor: cor.trim(),
            km: parseInt(km, 10),
            descricao: descricao.trim(),
            valor: parseFloat(valor),
            estado: estado,
            cidade: cidade.trim(),
            foto: leitor.result
        });
    };
    leitor.readAsDataURL(inputFotos.files[0]);
}

function salvarNovoAnuncio(dados) {
    const usuario = usuarioLogado();
    const veiculos = getVeiculos();

    veiculos.push({
        id: proximoId(veiculos),
        ...dados,
        idAnunciante: usuario.id,
        dataHora: new Date().toISOString()
    });
    salvarVeiculos(veiculos);

    window.location.href = 'meus-anuncios.html';
}
