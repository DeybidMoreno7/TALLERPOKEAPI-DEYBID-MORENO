const prompt = require("prompt-sync")();
async function consultaPokemon(){
    let queryPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    console.log("Status de la consulta: "+queryPokemon.status);
    if(!queryPokemon.ok){
        console.log("No se pudo consultar la tasa. Código:", respuesta.status);
        return;
    }
    
    const datos = await queryPokemon.json();
    console.log("\x1b[1m%s\x1b[0m","Imprimiendo datos del .json")
    console.log(datos);
    //console.log("Hola");
    let numero = 1;
    console.log("\x1b[1m%s\x1b[0m","Imprimiendo resultados del laboratorio");


    for(const i of datos.types){
        console.log("Tipo #"+numero+" de pokemon:",i.type.name);
        numero++;
    }
    // Para consultar ... 
    // COMO RECORRER UN ARRAY DE OBJETOS CON UN FOR CLÁSICO ???
    // for(const i = 0 ; i<= datos.types.length; i++){
    //     console.log("Tipo #"+numero+" de pokemon:",i.type.name);
    // }
    numero = 1;
    for(const i of datos.stats){
        console.log("Estadística #"+numero+" Nombre estadística: "+i.stat.name+ 
            " - Valor estadística: "+i.base_stat);
        numero++;
    }
    numero = 1;
    for(const i of datos.abilities){
        console.log("Habilidad #"+numero+":"+i.ability.name);
        numero++;
    }





}

consultaPokemon();








