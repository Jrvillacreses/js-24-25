let urlObtenerListaPokemon = 'https://pokeapi.co/api/v2/pokemon/';

function cargarPokemons(){
    alert("Llego a la funcion JAVASCRIPT")
     // Llamamos a la API de pokemon con Fetch
     //fetch("https://pokeapi.co/api/v2/pokemon/")
     fetch(urlObtenerListaPokemon)
         .then(res=>res.json())
         .then(res=>{
             console.log(res)
             let listaPokemon = res.results
             console.log(listaPokemon)
 
             //poner el codigo aqui
         });
}
function cargarPeliculas(){
     fetch("http://127.0.0.1:3000/peliculas")
         .then(res=>res.json())
         .then(res=>{
             console.log(res)
            
         });
}