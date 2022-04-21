onload = function(){
    if(segurancaToken() == true){
        return;
    }

    dadosUsuario();
    mostrarSkeletons();

    if(localStorage.getItem("login") == 1){
        localStorage.removeItem("login");
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Logado com sucesso !!!'
          })
    }

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
                Swal.fire({
                    icon: 'error',
                    title: 'ops',
                    text: erro
                })
            }
        )


    function exibirtarefa(listatarefa) {
        let pendente = document.getElementById('skeleton');
        let completed = document.querySelector('.completed')


        removerSkeletons();
        
        listatarefa.forEach(tarefacriada => {
            let tarefa = document.createElement('li');
            let dataformatada = (moment(tarefacriada.createdAt).format('LLL'));
            tarefa.classList.add('tarefa');

            if(tarefacriada.completed == false){
                tarefa.innerHTML = `
                <div class="descricao">
                    <p class="nome tf${tarefacriada.id}">${tarefacriada.description}</p>
                    <input type="text" class="tf${tarefacriada.id} hidden" value="${tarefacriada.description}" maxlength="40">
                    <p class="timestamp">Criada em: ${dataformatada}</p>

                    <div class="tf${tarefacriada.id}">
                        <button type="submit" class="btn-icon" id="check" onclick="checkTarefa(${tarefacriada.id})"title="Terminar tarefa"><ion-icon name="checkmark-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="editar" onclick="showEditarTarefa(${tarefacriada.id})" title="Editar Tarefa"><ion-icon name="create-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="excluir" onclick="excluirTarefa(${tarefacriada.id})" title="Excluir Tarefa"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    <div class="tf${tarefacriada.id} hidden d-flex">
                        <button type="submit" id="enviar" class="btn-icon" onclick="fetchEditarTarefa(${tarefacriada.id})" title="Alterar Tarefa"><ion-icon name="airplane-outline"></ion-icon></button>
                        <button type="submit" id="cancelar" class="btn-icon" onclick="hiddenEditarTarefa(${tarefacriada.id})" title="Cancelar"><ion-icon name="close-circle-outline"></ion-icon></button>
                    </div>
                    
                </div>`
                pendente.appendChild(tarefa);

            }else{
                tarefa.innerHTML = `
                <div class="descricao">
                    <p class="nome tf${tarefacriada.id}">${tarefacriada.description}</p>
                    <p class="timestamp">Criada em: ${dataformatada}</p>

                    <div class="mr">
                        <button type="submit" class="btn-icon" id="retornar" onclick ="retornarTarefa(${tarefacriada.id})" title="Incompletar Tarefa"><ion-icon name="arrow-undo-outline"></ion-icon></button>
                        <button type="submit" class="btn-icon" id="excluir" onclick="excluirTarefa(${tarefacriada.id})" title="Excluir Tarefa"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    
                </div>`
                completed.appendChild(tarefa);
            }
        });

    }

};

