const prompt = require("prompt-sync")();

async function iniciar() {

    let bandera = true;

    while (bandera) {

        let nombrePokemon = prompt("Digite el nombre del pokemon a consultar: ");

        const pokemonDatos = await buscarPokemon(nombrePokemon);
        mostrarFicha(pokemonDatos);
        console.log("\x1b[1m%s\x1b[0m","... Vamos a comparar 2 pokemones /...")
        let nombre1 = prompt("Digite el nombre del primer pokemon a comparar: ");
        let nombre2 = prompt("Digite el nombre del segundo pokemon a comparar: ");
        let estadistica = prompt("Digite la estadística a comparar: ");
        estadistica = estadistica.toLowerCase().replaceAll(" ","-")
        await compararPokemon(nombre1, nombre2, estadistica);
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
        return null;
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
    console.log("\x1b[1m%s\x1b[0m","... Separando elementos del array con /...")
    console.log("Pokemon de tipo:",tiposPokemon.join(" / "));
    let alturaPokemon = (pokemonDatos.height * 10);
    let pesoPokemon = (pokemonDatos.weight / 10);
    console.log("Altura Pokemon: "+alturaPokemon+" cms");
    console.log("Peso Pokemon: "+pesoPokemon+" kgs");
    let numero = 0;
    console.log("\x1b[1m%s\x1b[0m","... Imprimiendo estadísticas /...")
    for(const i of pokemonDatos.stats){
        numero++;
        console.log("Estadística #"+numero+" Nombre estadística: "+i.stat.name+ 
            " - Valor estadística: "+i.base_stat);
    }    
    console.log("\x1b[1m%s\x1b[0m","... Imprimiendo habilidades /...")
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

function obtenerStat(pokemonDatos, nombreStat){
    for(const i of pokemonDatos.stats){
        if(i.stat.name == nombreStat){
            return i.base_stat;
        }
    }
    return null;
}

async function compararPokemon(nombre1, nombre2, stat){
    const pokemon1_Datos = await buscarPokemon(nombre1);
    const pokemon2_Datos = await buscarPokemon(nombre2);
    if(pokemon1_Datos === null || pokemon2_Datos === null){
        console.log("Algún dato NULL → No se puede comparar");
        return;
    }else{
        console.log(stat); //comprobando si está recibiendo el stat que es
        let stat1 = obtenerStat(pokemon1_Datos, stat);
        let stat2 = obtenerStat(pokemon2_Datos, stat);
        if(stat1 === null || stat2 === null){
            console.log("Las stats disponibles son hp - attack - defense - special attack - special defense - speed");
            return;
        }else{
            if(stat1===stat2){
                console.log("El pokemon "+nombre1+" empata en "+stat+" con "+nombre2);
            }else if(stat1>stat2){
                console.log("El pokemon "+nombre1+" gana en "+stat+ " a "+nombre2);
            }else{
            console.log("El pokemon "+nombre2+" gana en "+stat+ " a "+nombre1);
            }
        }
    }
}







//todo se ejecuta acaaaa siuuuuu
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












