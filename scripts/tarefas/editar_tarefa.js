function showEditarTarefa(id) {
    if(localStorage.getItem("tf") === null){
        localStorage.setItem('tf', id);
    }else{
        hiddenEditarTarefa(localStorage.getItem("tf"))
        localStorage.setItem("tf", id);
    }

    campo = document.querySelectorAll(`.tf${id}`);
    localStorage.setItem('descAnterior', campo[1].value);

    campo[0].classList.add('hidden'); // P descricao
    campo[1].classList.remove('hidden');// input descricao
    campo[2].classList.add('hidden'); // button editar e excluir
    campo[3].classList.remove('hidden'); // button enviar e cancelar
}

function hiddenEditarTarefa(id) {
    campo = document.querySelectorAll(`.tf${id}`);

    campo[0].classList.remove('hidden');// P descricao
    campo[1].classList.add('hidden');// input descricao
    campo[1].value = localStorage.getItem("descAnterior");// colocar valor antigo no input
    campo[2].classList.remove('hidden');// button editar e excluir
    campo[3].classList.add('hidden');// button enviar e cancelar
}

function validarEditarTarefa(id){
    campo = document.querySelectorAll(`.tf${id}`);

    if(campo[1].value.trim() === localStorage.getItem("descAnterior")){
        return false;
    }else if(campo[1].value.trim() === ""){
        return false;
    }

    return campo[1].value.trim();
}

function fetchEditarTarefa(id) {
    let descricao = validarEditarTarefa(id);

    if(descricao === false){
        Swal.fire({
            icon: 'warning',
            title: 'CAMPO TITULO TAREFA',
            text: "Preencha o campo titulo corretamente !!!"
        })
        return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger     m-left'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        html: `Deseja alterar <br>Descrição Antiga: ${localStorage.getItem("descAnterior")} <br>Descrição Nova: ${descricao}`,
        title: 'Tem certeza ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Alterada com sucesso !',
            'A descrição antiga foi alterada :D',
            'success'
          ).then(function(){
            fazerFetch(descricao, id)
          })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Alteração desfeita',
            'A descrição antiga ira permanecer :D',
            'error'
          )
          return;
        }
      })

}

function fazerFetch(descricao, id){
    let linkEditarTarefa = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

    let body = {
        description: descricao,
        completed: false
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

    fetch(linkEditarTarefa, header)
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
                    title: 'CAMPO TITULO TAREFA',
                    text: "Preencha o campo titulo corretamente !!!"
                }).then(function(){
                    localStorage.removeItem("descAnterior");
                    localStorage.removeItem("tf");
                    location.reload();
                  })

            }
        )

        .catch(erro => { // se deu erro cai aqui no catch e volta com um alert msg do erro
            Swal.fire({
                icon: 'error',
                title: 'ERRO AO EDITAR TAREFA',
                text: erro
            })
        })
}