function dadosUsuario (){

nome = document.querySelector('.nome-usuario')

var tokenjwt = localStorage.getItem("token");

let header = {
    method: "GET",
    headers : {
        'content-type':'application/json',
        'authorization' : tokenjwt 
    }
};


let link = `https://ctd-todo-api.herokuapp.com/v1/users/getMe`

fetch(link, header)
.then(

    resultado =>{
        if(resultado.status == 200){
        
            return resultado.json()
            
        }else{
            throw `token inválido \ncodigo: ${resultado.status}`;
        }

    }

)
.then(

    resultado =>{
        nome.innerText = resultado.firstName[0].toUpperCase()+resultado.firstName.substr(1)+' '+ resultado.lastName[0].toUpperCase()+resultado.lastName.substr(1)
    }

    
)
//catch pega erro
.catch(

   error =>{
       alert(error)
       location.href = 'index.html'
   }
)

}