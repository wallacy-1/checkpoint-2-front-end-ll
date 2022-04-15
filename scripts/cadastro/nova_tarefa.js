let camponovatarefa = document.getElementById('novaTarea');
let botaoinserir = document.getElementById('adicionarTarea');


let urlcriartarefa = "https://ctd-todo-api.herokuapp.com/v1/tasks";
let task = {
    description: "",
    completed: ""
};

botaoinserir.addEventListener('click', function (evento) {

    if (camponovatarefa.value == "") {

        alert('Preencha a descrição corretamente!');
        return;
    }

    let statustarefa = document.querySelector('input[name="completed"]:checked');

    evento.preventDefault();

    task.description = camponovatarefa.value;
    task.completed = statustarefa.value;

    let taskJson = JSON.stringify(task);

    console.log(task.description);
    console.log(task.completed);
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
        .then
        (resultado => {
            if (resultado.status == 201) {
                return resultado.json();
            } else {
                throw `Criação de tarefa inválida \ncodigo: ${resultado.status}`;
            };
        }

        ).then(
            resultado => {
                alert('Tarefa criado com sucesso');
                console.log(resultado);
            }
        )

        .catch(erro => { // se deu erro cai aqui no catch e volta com um alert msg do erro
            alert(erro);
        })
})
