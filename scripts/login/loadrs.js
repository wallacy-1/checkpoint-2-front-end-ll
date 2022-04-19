function mostrarSpinner() {
    // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
    // dentro de nosso HTML.
    const body = document.querySelector("body");
  
    // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
    const right = document.querySelector(".right");
    const left = document.querySelector(".left");
  
    // Criamos nosso spinner
    const spinnerContainer = document.createElement("div");
    const spinner = document.createElement("div");
  
    // Atribuímos os IDs a cada novo elemento, para poder manipular
    // seus estilos
    spinnerContainer.setAttribute("id", "container-load");
    spinner.classList.add('loader')
  
    // Ocultamos o formulário de registro
    left.classList.add("hidden");
  
    right.classList.add("hidden");
  
    // Adicionamos o Spinner ao nosso HTML.
    spinnerContainer.appendChild(spinner);
    body.appendChild(spinnerContainer);
  
  
  };
   
  function ocultarSpinner() {
    // Selecionamos o corpo para poder remover o spinner do HTML.
    const body = document.querySelector("body");
    
    // Selecionamos o formulário de registro para poder mostrar-lo novamente
    const right = document.querySelector(".right");
    const left = document.querySelector(".left");
    
    // Selecionamos o spinner
    const spinnerContainer = document.querySelector("#container-load");
    console.log(spinnerContainer)
    
    // Removemos o spinner do HTML
    body.removeChild(spinnerContainer);
    
    // Removemos a classe que oculta o formulário
    right.classList.remove("hidden");
    left.classList.remove("hidden");
    
  };
   
   