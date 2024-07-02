document.getElementById('search-button').addEventListener('click', function() {
    const pokemonNameOrId = document.getElementById('pokemon-input').value.toLowerCase();
    if (pokemonNameOrId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonInfo(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
});

function displayPokemonInfo(data) {
    const pokemonInfoSection = document.getElementById('pokemon-info');
    pokemonInfoSection.style.display = 'block';
    pokemonInfoSection.innerHTML = `
        <h2>${capitalizeFirstLetter(data.name)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Número:</strong> ${data.id}</p>
        <p><strong>Tipo:</strong> ${data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}</p>
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
    `;
}

function showError(message) {
    const pokemonInfoSection = document.getElementById('pokemon-info');
    pokemonInfoSection.style.display = 'block';
    pokemonInfoSection.innerHTML = `<p>${message}</p>`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
