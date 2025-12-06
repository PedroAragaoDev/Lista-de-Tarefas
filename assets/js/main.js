const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


function criaLi(){
    const li = document.createElement('li');
    return li
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;
         criaTarefa(inputTarefa.value)
         
    }
})

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerText += " "
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.innerText = 'Apagar'
    li.appendChild(botaoApagar)
    
}


function criaTarefa(textoInput){
    const li = criaLi()
    li.innerText = textoInput;
    tarefas.appendChild(li); 
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas (){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []; 

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim() // trim() só tira o espaço de um item de dentro do array
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // Trasforma um array em uma string
    localStorage.setItem('tarefas', tarefasJSON) // no localStorage só pode guardar strings, por isso converte o array
}

function adicionaTarefaSalvas(){
    const tarefasJSON = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefasJSON);  // converte para array denovo

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }

}

adicionaTarefaSalvas();




