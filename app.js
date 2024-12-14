let listaNumerosSorteados = [];
let limiteSorteios = 100;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;
};


function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 100');
}

exibirMensagemInicial();

function numeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limiteSorteios + 1);
    let quantidadeNumerosSorteados = listaNumerosSorteados.length;

    if (quantidadeNumerosSorteados == limiteSorteios){
        listaNumerosSorteados = [];
    };

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Parabéns, você acertou o número secreto com ${tentativas} ${palavraTentativa}.`;
        // Talvez o HTML não reconheça a tamplate string, então usamos a variável acima.
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor. Tente novamente:');
        } else {
                exibirTextoNaTela('p', 'O número secreto é maior. Tente novamente:');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = numeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    // Para desabilitar novamente o botão de reiniciar jogo, para ficar disponivel apenas quando acertar o n.s.
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
