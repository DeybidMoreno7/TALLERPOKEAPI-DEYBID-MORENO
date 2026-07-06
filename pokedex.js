const prompt = require("prompt-sync")();

async function iniciar() {

    let bandera = true;

    while (bandera) {

        const nombrePokemon = prompt("Digite el nombre del pokemon a consultar: ");

        await buscarPokemon(nombrePokemon);
        await mostrarFicha(datos);
        const confirmacion = prompt("Desea hacer una nueva consulta? S/N: ");

        if (confirmacion.toUpperCase() === "N") {
            bandera = false;
        }
    }
}

async function buscarPokemon(nombrePokemon) {
    const queryPokemon = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon
    );

    console.log("Status:", queryPokemon.status);

    if (!queryPokemon.ok) {
        console.log("No encontrado");
        return;
    }

    const datos = await queryPokemon.json();
    return datos;
}

async function mostrarFicha(datos){
    if(datos === null){
        console.log("No hay datos por mostrar");
        return;
    }
    console.log(datos.name.toUpperCase);
    console.log(datos.id);
}




iniciar();

// let confirmacion = true;

// while(confirmacion==true){
//     
//     buscarPokemon(nombrePokemon);
//     let bandera = prompt("¿Nueva consulta? s/n");
//     if(bandera == "N" ){
//         confirmacion = false;
//     }
// }












