function segurancaToken(){
    if (localStorage.getItem("token") === null){
        Swal.fire({
            icon: 'question',
            title: 'OPA QUE ISSO ????????',
            text: "Esqueceu de logar amigão !?!?"
        }).then(function(){
            location.href = "index.html";
          })
          return true;
    }
    return false;
}
