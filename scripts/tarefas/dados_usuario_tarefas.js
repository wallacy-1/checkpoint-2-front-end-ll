onload = function(){


    let urlexibirtarefa = 'https://ctd-todo-api.herokuapp.com/v1/tasks';

    let tokenjwt = localStorage.getItem('token');

    let header = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': tokenjwt
        }

    };

    fetch(urlexibirtarefa, header).then(
        resultado => {

            return resultado.json()

        }
    )
        .then(
            resultado => {

                exibirtarefa(resultado)
            }
        )

        .catch(
            erro => {
                alert(erro)
            }
        )


    function exibirtarefa(listatarefa) {
        let skeleton = document.getElementById('skeleton');



        listatarefa.forEach(tarefacriada => {
            let tarefa = document.createElement('li');
            let dataformatada = (moment(tarefacriada.createdAt).format('LLL'));
            tarefa.classList.add('tarefa');
            tarefa.innerHTML = `
                <div class="not-done"> </div>
                <div class="descricao">
                    <p class="nome">${tarefacriada.description}</p>
                    <p class="timestamp">Criada em: ${dataformatada}</p>
                </div >
            `

            skeleton.appendChild(tarefa);
        });

    }

};

