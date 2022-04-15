onload = function(){
    let skeleton = document.getElementById('skeleton');

    let tarefa = document.createElement('li');
    tarefa.classList.add('tarefa');

    tarefa.innerHTML = `
        <div class="not-done"> </div>
        <div class="descricao">
            <p class="nome">Teste </p>
            <p class="timestamp">Criada em: 18/01/18</p>
        </div>
    `

    skeleton.appendChild(tarefa);
};
