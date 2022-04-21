function checkTarefa(id) {
    campo = document.querySelectorAll(`.tf${id}`);
    let descricao = campo[0].innerText;

    let urlCheck = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

    let body = {
        description: descricao,
        completed: true
    };

    body = JSON.stringify(body);

    let tokenjwt = localStorage.getItem("token");

    let header = {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            'authorization': tokenjwt
        },
        body: body
    };

    fetch(urlCheck, header)
        .then(resultado => {
            if (resultado.status == 200 || resultado.status == 201) {
                return resultado.json();
            } else {
                throw `Editar tarefa não foi possivel \ncodigo: ${resultado.status}`;
            };
        }

        ).then(
            resultado => {
                Swal.fire({
                    icon: 'success',
                    title: 'TAREFA COMPLETADA',
                    text: "A tarefa foi completada com sucesso, PARABENS :D"
                }).then(function(){
                    location.reload();
                })
            }
        )

        .catch(erro => { // se deu erro cai aqui no catch e volta com um alert msg do erro
            Swal.fire({
                icon: 'error',
                title: 'ops...',
                text: erro
            })
        })
}