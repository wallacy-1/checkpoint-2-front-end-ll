let btnLogout = document.getElementById("closeApp");

btnLogout.addEventListener("click", (evento) => {
    let logOut = confirm("Deseja mesmo sair?");
    
    if (logOut){
        localStorage.clear();
        location.href = "index.html";
    }
});
