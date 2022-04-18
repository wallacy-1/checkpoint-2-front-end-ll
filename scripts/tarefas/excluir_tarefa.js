
function excluirTarefa(id) {

    let linkExcluir = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

    let tokenjwt = localStorage.getItem('token');

    let header = {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': tokenjwt
        }
    };

    fetch(linkExcluir, header)
        .then(resultado => {
            if (resultado.status == 200 || resultado.status == 201) {
                return resultado.json();
            } else {
                throw `Não foi possível excluir a tarefa \ncódigo: ${resultado.status}`;
            };
        }

        ).then(
            resultado => {
                alert(`Tarefa removida com SUCESSO !!!`);
                location.reload();
            }
        )

        .catch(erro => { 
            alert(erro);
        })
    }
