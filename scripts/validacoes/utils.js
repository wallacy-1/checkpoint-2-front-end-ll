function retiraEspacosDeUmValorInformado (recebeValor) {
    return recebeValor.trim();
}

function converteValorRecebidoEmMinusculo(recebeValor) {
    return recebeValor.toLowerCase();
}

function verificarSeEstaVazio(campoValor, nomeCampo) {
    if(campoValor.trim() == ''){
        throw 'O campo ' + nomeCampo + ' esta VAZIO !!';
    }
}