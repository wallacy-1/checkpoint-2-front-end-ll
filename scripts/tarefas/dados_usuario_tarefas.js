onload = function(){
    segurancaToken();

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
        let pendente = document.getElementById('skeleton');
        let completed = document.querySelector('.completed')



        listatarefa.forEach(tarefacriada => {
            let tarefa = document.createElement('li');
            let dataformatada = (moment(tarefacriada.createdAt).format('LLL'));
            tarefa.classList.add('tarefa');

            if(tarefacriada.completed == false){
                tarefa.innerHTML = `
                <div class="not-done"> </div>
                <div class="descricao">
                    <p class="nome">${tarefacriada.description}</p>
                    <input type="text" value="${tarefacriada.description}">
                    <p class="timestamp">Criada em: ${dataformatada}</p>

                    <div class="mr">
                        <button type="submit" id="editar" onclick="editarTarefa(${tarefacriada.id})"><ion-icon name="create-outline"></ion-icon></button>
                        <button type="submit" id="excluir"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    
                </div>`

                pendente.appendChild(tarefa);

            }else{
                tarefa.innerHTML = `
                <div class="not-done"></div>
                <div class="descricao">
                    <p class="nome">${tarefacriada.description}</p>
                    <p class="timestamp">Criada em: ${dataformatada}</p>

                    <div class="mr">
                        <button type=""submit id="retornar" ><ion-icon name="arrow-undo-outline"></ion-icon></button>
                        <button type="submit" id="excluir"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    
                </div>`

                completed.appendChild(tarefa);
            }
        });

    }

};

