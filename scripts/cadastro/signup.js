let camponome = document.getElementById('inputnomeuser');
let campoapelido = document.getElementById('inputapelidouser');
let campoEmail = document.getElementById('inputemailuser');
let camposenha = document.getElementById('inputsenhauser');
let camporepetirsenha = document.getElementById('inputsenhauserrep');
let botaocriar = document.getElementById('botaocriar');

let CadastroUsuario = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

botaocriar.addEventListener('click', function (evento) {
    
    evento.preventDefault();

    CadastroUsuario.firstName = camponome.value;
    CadastroUsuario.lastName = campoapelido.value;
    CadastroUsuario.email = campoEmail.value;
    CadastroUsuario.password = camporepetirsenha.value;

    let CadastroBodyJson = JSON.stringify(CadastroUsuario);
    let urlCadastro = "https://ctd-todo-api.herokuapp.com/v1/users";

    let header = {
        method: "POST",
        headers : {
            'content-type':'application/json'
        },
        body : CadastroBodyJson
    };

    fetch(urlCadastro, header)
    .then(
        resultado => {
            if(resultado.status == 201){ // se tiver tudo certo retorna 200
                return resultado.json();
            }else{
                throw `preencha os campos corretamente \ncodigo: ${resultado.status}`;
            }
        }
    )
    .then(
        resultado => {
            location.href = "login.html";
        }
    )
    .catch(
        erro =>{
            alert(erro);
        }
    );


})
