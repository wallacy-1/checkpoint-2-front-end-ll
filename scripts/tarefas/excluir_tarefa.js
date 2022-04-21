
function excluirTarefa(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger m-left'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza ?',
        text: "Deseja mesmo excluir?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'TAREFA DELETADA',
            'Tarefa deletada com sucesso ',
            'success'
          ).then(function(){
            fetchExcluir(id);
          })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado :D',
            'Nada foi feito',
            'error'
          )
        }
      })

}

function fetchExcluir(id){
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
                Swal.fire({
                    icon: 'success',
                    title: 'REMOVER TAREFA',
                    text: "Tarefa removida com SUCESSO !!!"
                }).then(function(){
                    location.reload();
                })
            }
        )

        .catch(erro => { 
            Swal.fire({
                icon: 'success',
                title: 'REMOVER TAREFA',
                text: erro
            })
        })
}