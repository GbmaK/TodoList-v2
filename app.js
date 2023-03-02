// Selectores
const titulo = document.querySelector('#titulo');
const descripcion = document.querySelector('#descripcion');
const agregar = document.querySelector('#agregar');
const formulario = document.querySelector('.formulario');
const listaHtml = document.querySelector('.lista');
let listTodo = [];
let mostrar = false;

// Eventos
titulo.addEventListener('input', validar);
descripcion.addEventListener('input', validar);
agregar.addEventListener('click', agregarTodo);

// Funciones 
function validar(e) {
    
    if (e.target.value.trim() == "") {
        const mensaje = 'No todos los campos estan completos';
        const tipo = 'error';
        agregar.disabled = true;
        agregar.classList.remove('activado');
        agregar.classList.add('desactivado');
        mostrarMensaje(mensaje, tipo);
        return
    };

    if (titulo.value != "" && descripcion.value != "") {
        agregar.classList.remove('desactivado');
        agregar.classList.add('activado');
        agregar.disabled = false;
    };

};

function mostrarMensaje(mensaje, tipo) {
    if(!mostrar) {
        mostrar = true;
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.innerHTML = `
            <p1 class="m" > ${tipo}: ${mensaje} </p1>
        `;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
            mostrar = false;
        }, 3000);
    };
};     

function agregarTodo(e) {
    // aqui lo agrego a la lista que luego voya iterar

    const todo = {
        tarea : titulo.value,
        descripcion: descripcion.value,
        id: Date.now()
    };
    
    listTodo = [...listTodo, todo];

    mostrarTodo(listTodo);
};

function mostrarTodo(listaTodo) {

    limpiarHTML();

    listaTodo.forEach(todo => {

        const {tarea, descripcion, id} = todo;

        const div = document.createElement('div');
        const p = document.createElement('p1');
        const boton = document.createElement('button');
        const hr = document.createElement('hr');
        const p1 = document.createElement('p1');

        div.classList.add('tarea');

        p.classList.add('titulo');
        p.innerHTML = `${tarea}`;
        div.appendChild(p);

        boton.classList.add('borrar');
        boton.innerHTML = 'X';
        boton.onclick = () => borrarTarea(id);
        div.appendChild(boton);

        hr.classList.add('linea');
        div.appendChild(hr);

        p1.classList.add('description');
        p1.innerHTML = `Task&#164 Description: ${descripcion}`;
        div.appendChild(p1);


        

        listaHtml.appendChild(div);
    });
};

function borrarTarea(id) {
    listTodo = listTodo.filter( todo => todo.id != id );
    mostrarTodo(listTodo);
}

function limpiarHTML() {
    while (listaHtml.firstChild) {
        listaHtml.removeChild(listaHtml.firstChild)
    };
};