function mostrarSkeletons(){
    let skeleton = document.getElementById("skeleton");

    var tarefa = document.createElement('div');
    tarefa.classList.add('skeleton_begin');
    
    tarefa.innerHTML = `
    <li class="tarefa ">
        <div class="descricao descricao_skeleton">
          <p class="nome p_skeleton">Nova tarefa</p>
          <p class="timestamp p_skeleton">Criada em: 15/07/21</p>
        </div>
    </li>
    <li class="tarefa ">
        <div class="descricao descricao_skeleton">
          <p class="nome p_skeleton">Nova tarefa</p>
          <p class="timestamp p_skeleton">Criada em: 15/07/21</p>
        </div>
    </li>
    <li class="tarefa ">
        <div class="descricao descricao_skeleton">
          <p class="nome p_skeleton">Nova tarefa</p>
          <p class="timestamp p_skeleton">Criada em: 15/07/21</p>
        </div>
    </li>
    <li class="tarefa ">
        <div class="descricao descricao_skeleton">
          <p class="nome p_skeleton">Nova tarefa</p>
          <p class="timestamp p_skeleton">Criada em: 15/07/21</p>
        </div>
    </li>
    `

    skeleton.appendChild(tarefa);
}

function removerSkeletons() {
    let skeleton = document.getElementById("skeleton");

    let tarefa = document.querySelector(".skeleton_begin");
    console.log(tarefa);
    skeleton.removeChild(tarefa);

}