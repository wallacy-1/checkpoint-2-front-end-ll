onload = function () {
    if (localStorage.getItem("token") === null){
        alert("Você ainda não fez login!");
        location.href = "index.html"
    }
}
