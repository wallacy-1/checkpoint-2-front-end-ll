onload = function(){
    segurancaToken();
    dadosUsuario();
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
                    <p class="nome tf${tarefacriada.id}">${tarefacriada.description}</p>
                    <input type="text" class="tf${tarefacriada.id} hidden" value="${tarefacriada.description}" maxlength="40">
                    <p class="timestamp">Criada em: ${dataformatada}</p>

                    <div class="tf${tarefacriada.id}">
                        <button type="submit" class="btn-icon" id="check" onclick="checkTarefa(${tarefacriada.id})"><ion-icon name="checkmark-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="editar" onclick="showEditarTarefa(${tarefacriada.id})"><ion-icon name="create-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="excluir"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    <div class="tf${tarefacriada.id} hidden d-flex">
                        <button type="submit" id="enviar" class="btn-icon" onclick="fetchEditarTarefa(${tarefacriada.id})"><ion-icon name="airplane-outline"></ion-icon></button>
                        <button type="submit" id="cancelar" class="btn-icon" onclick="hiddenEditarTarefa(${tarefacriada.id})"><ion-icon name="close-circle-outline"></ion-icon></button>
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
                        <button type=""submit class="btn-icon" id="retornar" ><ion-icon name="arrow-undo-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="excluir"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    
                </div>`

                completed.appendChild(tarefa);
            }
        });

    }

};

