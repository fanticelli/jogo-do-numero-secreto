//armazenando os números escolhidos.
let listaNumerosSorteados = [];

let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

//função para exibir texto em elementos HTML.
function exibirTexto(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    //leitura dos textos.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
        {rate:1.2}
    );
}

function exibirMensagem(){
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

exibirMensagem();

//execução do botão de verificar.
function verificarChute(){
    let escolha = document.querySelector('input').value;
    
    if(escolha == numeroSecreto){
        exibirTexto('h1', 'Acertou!');

        //modificando a concordancia de acordo com a quantidade.
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';

        let mensagemTentativas = `Você descobriu o Número secreto com ${tentativas} ${palavraTentativas}`;

        exibirTexto('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(escolha > numeroSecreto){
            exibirTexto('p', 'O Número Secreto é menor.');
        }else{
            exibirTexto('p', 'O Número Secreto é maior.');
        }

        //contador.
        tentativas++;

        //limpando o campo.
        limparCampo();
    }
}

//geração de número aleatorio.
function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    //verificando a quantidade de elementos e limpando se chegar no limite.
    let quantidadeElementosLista = listaNumerosSorteados.length;
    if(quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    //inclui e verifica os números escolhidos.
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//limpando o campo de entrada do usúario.
function limparCampo(){
    escolha = document.querySelector('input');
    escolha.value = '';
}

//reiniciando o jogo.
function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;

    exibirMensagem();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}