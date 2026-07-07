const prompt = require("prompt-sync")();

async function iniciar() {

    let bandera = true;

    while (bandera) {

        let nombrePokemon = prompt("Digite el nombre del pokemon a consultar: ");

        const pokemonDatos = await buscarPokemon(nombrePokemon);
        await mostrarFicha(pokemonDatos);
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

    console.log("Query Status:", queryPokemon.status);

    if (!queryPokemon.ok) {
        console.log("No encontrado");
        return;
    }

    const datos = await queryPokemon.json();
    return datos;
    // console.log("Nombre:", datos.name);
    // console.log("ID:", datos.id);
}


async function mostrarFicha(pokemonDatos){
    if(pokemonDatos === null){
        console.log("Nada que mostrar");
        return;
    }
    console.log("Nombre Pokemon: "+pokemonDatos.name.toUpperCase());
    console.log("ID Pokemon:", pokemonDatos.id);
    let tiposPokemon = [];
    /*
    for(const i of pokemonDatos.types){
        tiposPokemon = [tiposPokemon , [i.type.name]]; // I tried like this, but is not the better way :u
    }
    
    */ 
    for(const i of pokemonDatos.types){
        tiposPokemon.push(i.type.name);//agregamos al final del array cada elemento nuevo :D
    }
    console.log("\x1b[1m%s\x1b[0m","... Separando elementos del array con / ...")
    console.log("Imprimiendo tipos de pokemon desde una cadena"+tiposPokemon.join(" / "));
    let alturaPokemon = (pokemonDatos.height * 10);
    let pesoPokemon = (pokemonDatos.weight / 10);
    console.log("Altura Pokemon: "+alturaPokemon+" cms");
    console.log("Peso Pokemon: "+pesoPokemon+" kgs");
    let numero = 0;
    for(const i of pokemonDatos.stats){
        numero++;
        console.log("Estadística #"+numero+" Nombre estadística: "+i.stat.name+ 
            " - Valor estadística: "+i.base_stat);
    }
    numero = 0;
    for(const i of pokemonDatos.abilities){
        numero++;
        if(i.is_hidden===true){
            console.log("Habilidad #"+numero+": "+i.ability.name+" (oculta)");
        }else{
            console.log("Habilidad #"+numero+": "+i.ability.name);
        }
        
    }
}

// async function mostrarFicha(datos){
//     if(datos === null){
//         console.log("No hay datos por mostrar");
//         return;
//     }
//     console.log(datos.name.toUpperCase);
//     console.log(datos.id);
// }





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












