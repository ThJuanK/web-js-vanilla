const tareaInput = document.getElementById("tareaInput");
const listElement = document.getElementById("tareaList");
const buttonElement = document.getElementById("clearButton");
const addButton = document.getElementById("addTarea");
const contenedor = document.getElementById("contenedor")

let tareas = []

buttonElement.addEventListener( 'click', () => {
    buttonElement.classList = ['']
    const aux = tareas;
    tareas = tareas.filter( u => !u.complete );
    if (aux.length == tareas.length){
        buttonElement.classList = ['invalido']
        setTimeout( () => {
            buttonElement.classList = ['']
        }, 2000 )
        generarAdvertencia("No hay elementos para eliminar.")
    }
    actualizarLista();
} )

addTarea.addEventListener( 'click', () => {
    agregarTarea();
} )

tareaInput.addEventListener( 'keydown', (event) => {
    tareaInput.classList = ['']
    addButton.classList = ['']
    if (event.code == 'Enter'){
        agregarTarea();
    }  
})


function agregarTarea(){
    if (tareaInput.value == '') {
        tareaInput.classList = ['invalido']
        addButton.classList = ['invalido']
        setTimeout( () => {
            tareaInput.classList = ['']
            addButton.classList = ['']
        }, 2000 )
        generarAdvertencia("No podemos agregar un elemento vacío.")
        return
    }
    tareas.push({value: tareaInput.value, complete: false});
    tareaInput.value = '';
    actualizarLista();
}

function actualizarLista(){
    while (listElement.firstChild) listElement.removeChild(listElement.firstChild);
    tareas.forEach(elemento => {
        let div = document.createElement('div');
        div.classList = "tarea";
        let check = document.createElement('input');
        check.type = "checkbox";
        let span = document.createElement('span');
        span.textContent = elemento.value;
        div.appendChild(span);
        div.appendChild(check);
        check.addEventListener( "click", () => {   
            elemento.complete = check.checked;
            const estilo = `tarea${elemento.complete ? " complete": ""}`;
            div.classList = [estilo];
        } )
        listElement.appendChild(div); 
    })
}

function generarAdvertencia(texto){
    let label = document.createElement("label")
    label.textContent = texto

    if(contenedor.lastChild.textContent === label.lastChild.textContent 
        || contenedor.children[contenedor.children.length-2].textContent === label.textContent){
        return
    }
    contenedor.appendChild(label)
    setTimeout( () => {
        contenedor.removeChild(label)
    }, 2000 )

}

