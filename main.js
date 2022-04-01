const nombreUnicornio = document.querySelector('#a_name');
const poderUnicornio = document.querySelector('#a_power');
const imagenUnicornio = document.querySelector('#a_image');
const edadUnicornio = document.querySelector('#a_age');
const btnCrear = document.querySelector('#btn_crear');
const contenedorUnicornio = document.querySelector('#lista');
const unicornioaModificar = document.querySelector('#nameUnicornio');
const modificarNombre = document.querySelector('#mod_name');
const modificarPoder = document.querySelector('#mod_power');
const modificarImagen = document.querySelector('#mod_image');
const modificarEdad = document.querySelector('#mod_age');
const btnModificar = document.querySelector('#btn_modificar');

function limpiarInputs(){
    nombreUnicornio.value = '';
    poderUnicornio.value = '';
    imagenUnicornio.value = '';
    edadUnicornio.value = '';
}


// AGREGAR UNICORNIO
function crearUnicornio(){
    const nombreUnicornioValor = nombreUnicornio.value;
    const poderUnicornioValor = poderUnicornio.value;
    const imagenUnicornioValor = imagenUnicornio.value;
    const edadUnicornioValor = edadUnicornio.value;
    
    if(nombreUnicornioValor === ""){
        return alert("Es necesario que ingrese el nombre")
    }
    if(poderUnicornioValor === ""){
        return alert("Es necesario que ingrese el poder")
    }
    if(imagenUnicornioValor === ""){
        return alert("Es necesario que ingrese una imagen")
    }

    
    console.log(nombreUnicornioValor, poderUnicornioValor, imagenUnicornioValor, edadUnicornioValor);

    const data = {
        name: nombreUnicornioValor,
        power: poderUnicornioValor,
        image: imagenUnicornioValor,
        age: edadUnicornioValor,
    };
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns', options,)
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        limpiarInputs();
        obtenerUnicornios();
    })
    .catch((err) => {
        alert(err);
    });
}

// OBTENER UNICORNIO
function obtenerUnicornios(){
    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns',)
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        mostrarUnicornios(result);
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
        //alert("No se pudo obtener el unicornio");
    });
}

//obtenerUnicornios();


//const contenedorUnicornio = document.querySelector('#lista');
// MOSTRAR UNICORNIOS
function mostrarUnicornios(arrayUnicornios){
    contenedorUnicornio.innerHTML = '';
    //arrayUnicornios = arrayUnicornios.reverse();
    arrayUnicornios.forEach((unicorn) => {
        const li = document.createElement('li');
        const btnModificar = document.createElement('button');
        const btnEliminar = document.createElement('button');
        let liContent = `
            <div id="unicornio">
                <h3>${unicorn.name}</h3>
                <h3>${unicorn.power}</h3>
                <img id="${unicorn._id}" src='${unicorn.image}' width="200"></img>
                <h3>${unicorn.age}</h3>
            </div>
        `;

        btnModificar.addEventListener("click", function(){
            modificarUnicornio(unicorn._id);
        });
        btnEliminar.addEventListener("click", function(){
            eliminarUnicornio(unicorn._id);
        });

        li.innerHTML = liContent;
        btnModificar.innerHTML = 'Modificar';
        btnEliminar.innerHTML = 'Eliminar';

        contenedorUnicornio.appendChild(li);
        li.id = unicorn._id
        li.appendChild(btnModificar);
        li.appendChild(btnEliminar);
        
    });
}

btnCrear.addEventListener('click', crearUnicornio);

// MODIFICAR UNICORNIO
function modificarUnicornio(id_unicorn){
    const modNombreUnicornioValor = modificarNombre.value;
    const modPoderUnicornioValor = modificarPoder.value;
    const modImagenUnicornioValor = modificarImagen.value;
    const modEdadUnicornioValor = modificarEdad.value;

    const data = {
        name: modNombreUnicornioValor,
        power: modPoderUnicornioValor,
        image: modImagenUnicornioValor,
        age: modEdadUnicornioValor,
    };
    
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
      };
    
    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns/' +id_unicorn, options,)
    .then((result) => {
        console.log(result)
        return result.json();
    })
    .then((result) => {
        obtenerUnicornios();
    })
    .catch((err) => {
        console.log(err);
    });
}

// ELIMINAR UNICORNIO
function eliminarUnicornio(id_unicorn){
    const options = {
        method: 'DELETE',
    };
    
    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns/' +id_unicorn, options,)
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        obtenerUnicornios();
    })
    .catch((err) => {
        console.log(err);
    });
}


//mostrarunicornios();
obtenerUnicornios();