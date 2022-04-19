// pegar os campo no html
let camponome = document.getElementById('inputnomeuser');
let campoapelido = document.getElementById('inputapelidouser');
let campoEmail = document.getElementById('inputemailuser');
let camposenha = document.getElementById('inputsenhauser');
let camporepetirsenha = document.getElementById('inputsenhauserrep');
let botaocriar = document.getElementById('botaocriar');

// criar o objeto para o body vazio, dados do body e o body na documentação da api 
let CadastroUsuario = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}
// ao clicar no botao criar execute a function
botaocriar.addEventListener('click', function (evento) {
    
    evento.preventDefault(); // não atualizar a pagina

    CadastroUsuario.firstName = camponome.value; //o campo fristname do cadastroUsuario vai ser preenchido com o valor do campo camponome.value
    CadastroUsuario.lastName = campoapelido.value;
    CadastroUsuario.email = campoEmail.value;
    CadastroUsuario.password = camporepetirsenha.value;

    //o cadastrousuario era um objeto agora deixamos ele como json 
    let CadastroBodyJson = JSON.stringify(CadastroUsuario);
    // setamos uma url para o fetch, com a rota de cadastro usuario
    let urlCadastro = "https://ctd-todo-api.herokuapp.com/v1/users";
    //criamos nosso header com o method (ver na api) header content(api pede) body com o valor da variavel CadastroBodyJson
    let header = {
        method: "POST",
        headers : {
            'content-type':'application/json'
        },
        body : CadastroBodyJson
    };

    fetch(urlCadastro, header) // damos um fetch com a url e o valores da variavel header
    .then(
        resultado => { // verifica se deu erro se não retornar 201 então deu algum erro (ver na api os erros que pode dar)
            if(resultado.status == 201){ // se tiver tudo certo retorna 201
                return resultado.json(); // deu tudo certo ? então envia a resposta pro outro then em formato json
            }else{
                throw `preencha os campos corretamente \ncodigo: ${resultado.status}`; // joga um throw para o catch pegar
            }
        }
    )
    .then(
        resultado => {
            location.href = "login.html"; //se deu tudo certo so manda o usuario para a tela login.html 
        }
    )
    .catch(
        erro =>{ // se deu erro cai aqui no catch e volta com um alert msg do erro
            alert(erro);
        }
    );


})
