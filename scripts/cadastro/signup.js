// pegar os campo no html
let campoNome = document.getElementById('inputnomeuser');
let campoSobrenome = document.getElementById('inputsobrenomeuser');
let campoEmail = document.getElementById('inputemailuser');
let camposenha = document.getElementById('inputsenhauser');
let campoRepetirSenha = document.getElementById('inputsenhauserrep');
let botaocriar = document.getElementById('botaocriar');

// criar o objeto para o body vazio, dados do body e o body na documentação da api 
let CadastroUsuario = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    Swal.fire({
        icon: 'warning',
        title: 'CAMPO EMAIL',
        text: "Email invalido :("
    })
    return (false)
}

function validarSenha(){
    if(camposenha.value !== campoRepetirSenha.value){
        Swal.fire({
            icon: 'warning',
            title: 'CAMPO SENHA',
            text: "O campo repetir senha não esta igual ao campo senha!"
          })
    }
}

// ao clicar no botao criar execute a function
botaocriar.addEventListener('click', function (evento) {
    
    evento.preventDefault(); // não atualizar a pagina

    mostrarSpinner();
    // verificação segundaria dos inputs ( vai que de alguma forma ele burla a 1 )
    ValidateEmail(campoEmail.value);
    validarSenha();

    try {
        // verifica se esta vazio os valores
        verificarSeEstaVazio(campoNome.value, "nome");
        verificarSeEstaVazio(campoSobrenome.value, "Sobrenome");
        verificarSeEstaVazio(camposenha.value, "senha");
        verificarSeEstaVazio(campoRepetirSenha.value, "repetir senha");
    } catch (error) {
        ocultarSpinner();
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: error
          })
        return;
    }

    CadastroUsuario.firstName = campoNome.value; //o campo fristname do cadastroUsuario vai ser preenchido com o valor do campo campoNome.value
    CadastroUsuario.lastName = campoSobrenome.value;
    CadastroUsuario.email = campoEmail.value;
    CadastroUsuario.password = campoRepetirSenha.value;

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
                ocultarSpinner();
                throw `preencha os campos corretamente \ncodigo: ${resultado.status}`; // joga um throw para o catch pegar
            }
        }
    )
    .then(
        resultado => {
            location.href = "index.html"; //se deu tudo certo so manda o usuario para a tela login.html 
        }
    )
    .catch(
        erro =>{ // se deu erro cai aqui no catch e volta com um alert msg do erro
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: erro
              })
        }
    );


})
