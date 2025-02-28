
let nuevoElemento = document.createElement("p");
nuevoElemento.innerText = "Lista de Tareas";
document.body.appendChild(nuevoElemento);

let newlist = document.createElement("ul");
document.body.appendChild(newlist);

document.getElementById("boton").addEventListener("click", function () {
    let tarea = document.getElementById("pt").value;

    
    let itemlist = document.createElement("li");
    itemlist.textContent = tarea;

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.style.marginLeft = "10px";

    botonEliminar.addEventListener("click", function () {
        itemlist.remove();
    });

    itemlist.appendChild(botonEliminar);

    newlist.appendChild(itemlist);
    
    document.getElementById("pt").value = "";
});

