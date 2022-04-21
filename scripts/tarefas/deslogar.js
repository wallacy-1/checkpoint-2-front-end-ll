let btnLogout = document.getElementById("closeApp");

btnLogout.addEventListener("click", (evento) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger     m-left'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza ?',
        text: "Deseja sair da sessão ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deslogar',
        cancelButtonText: 'Não, continuar logado',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deslogado com sucesso',
            'Foi bom enquanto durou :(',
            'success'
          ).then(function(){
            localStorage.clear();
            location.href = "index.html";
          })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado :D',
            'Você continua logado',
            'error'
          )
        }
      })
});
