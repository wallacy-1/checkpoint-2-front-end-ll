let btnLogout = document.getElementById("closeApp");

btnLogout.addEventListener("click", (evento) => {
    let logOut = confirm("Deseja mesmo sair?");
    
    if (logOut){
        localStorage.clear();
        location.href = "http://127.0.0.1:5500/index.html";
    }
});