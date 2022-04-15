window.onload = function () {
    if (localStorage.getItem("") === null){
        alert("Você ainda não fez login!");
        window.location.href = "http://127.0.0.1:5500/index.html"
    }
}