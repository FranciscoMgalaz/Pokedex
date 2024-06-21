document.addEventListener("DOMContentLoaded", function() {
    

    const apiUrl = "http://127.0.0.1:8000/api/pokemons/";

    // Función para obtener todos los Pokémones
    function getPokemons() {
        fetch(apiUrl)
            .then(response => {
                
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                
                const container = document.getElementById("pokemon-container");
                container.innerHTML = "";
                data.forEach(pokemon => {
                    const pokemonBlock = document.createElement("div");
                    pokemonBlock.className = "pokemon-block";

                    pokemonBlock.innerHTML = `
                        <h3 id="titleBlock">${pokemon.nombre}</h3>
                        <p>Tipo: ${pokemon.tipo1} ${pokemon.tipo2 ? ", " + pokemon.tipo2: ""}</p>
                        <p>Región: ${pokemon.region}</p>
                        <button class="btn btn-primary edit-btn" data-id="${pokemon.id}">Editar</button>
                        <button class="btn btn-danger delete-btn" data-id="${pokemon.id}">Eliminar</button>
                    `;
                    container.appendChild(pokemonBlock);
                    
                });
            })
            .catch(error => console.error(error));
    }

    //agregar un nuevo Pokémon
    function addPokemon(pokemon) {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemon),
        })
        .then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {

            getPokemons();  // actualiza la lista
        })
        .catch(error => console.error(error));
    }

    // manejar el envío del formulario
    const form = document.getElementById("pokemon-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const tipo1 = document.getElementById("tipo1").value;
        const tipo2 = document.getElementById("tipo2").value;
        const region = document.getElementById("region").value;

        const newPokemon = {
            nombre: nombre,
            tipo1: tipo1,
            tipo2: tipo2 ? tipo2 : null,
            region: region
        };

        addPokemon(newPokemon);

       
        form.reset();
    });


    //eliminar pokemon
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const pokemonId = event.target.getAttribute('data-id');
            deletePokemon(pokemonId);
        }
    });
    
    function deletePokemon(id) {
        fetch(apiUrl + id + '/', {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            getPokemons();
        })
        .catch(error => console.error('Error:', error));
    }


  
    
   
    
    getPokemons();
});
