let camponovatarefa = document.getElementById('novaTarea');
let botaoinserir = document.getElementById('adicionarTarea');


let urlcriartarefa = "https://ctd-todo-api.herokuapp.com/v1/tasks";
let task = {
    description: "",
    completed: ""
};

botaoinserir.addEventListener('click', function (evento) {

    if (camponovatarefa.value.trim() == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: "Preencha a descrição corretamente!"
          })
        return;
    }

    let statustarefa = document.querySelector('input[name="completed"]:checked');

    evento.preventDefault();

    task.description = camponovatarefa.value;
    task.completed = statustarefa.value;

    let taskJson = JSON.stringify(task);

    var tokenjwt = localStorage.getItem("token");

    let header = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': tokenjwt
        },
        body: taskJson
    };

    fetch(urlcriartarefa, header)
        .then(resultado => {
            if (resultado.status == 201) {
                return resultado.json();
            } else {
                throw `Criação de tarefa inválida \ncodigo: ${resultado.status}`;
            };
        }

        ).then(
            resultado => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tarefa foi criada com sucesso !!!',
                    text: `Tarefa: ${task.description} \n Foi criada`
                  }).then(function(){
                    location.href = "tarefas.html"; //se deu tudo certo so manda o usuario para a tela login.html 
                  })
            }
        )

        .catch(erro => { // se deu erro cai aqui no catch e volta com um alert msg do erro
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: erro
              })
        })
})
