const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemons = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=151`);

    const { results: pokemonURLs } = await response.json();

    const pokemonCards = document.querySelector('.pokemon-cards')

    await Promise.all(pokemonURLs.map(async (pokemonURL, index) => {
      const response = await fetch(`${BASE_URL}/pokemon/${pokemonURL.name}`);

      const pokemonData = await response.json();

      const card = document.createElement('div');
      const cardImage = document.createElement('img');
      const cardInfo = document.createElement('div');
      const cardInfoTitle = document.createElement('h2');
      const cardInfoTypes = document.createElement('div');
   
      card.className = 'pokemon-card';
      cardImage.src = pokemonData.sprites.front_default;
      cardInfo.className = 'pokemon-card-info';
      cardInfoTitle.textContent = pokemonData.name;
      cardInfoTypes.className = 'pokemon-card-info-tags';

      pokemonData.types.map(pokemonType => {
        const cardInfoType = document.createElement('div');
        const cardInfoTypeName = document.createElement('p');

        cardInfoType.className = `pokemon-card-info-tag ${pokemonType.type.name}`;
        cardInfoTypeName.textContent = pokemonType.type.name;

        cardInfoType.appendChild(cardInfoTypeName);
        cardInfoTypes.appendChild(cardInfoType);
      })

      cardInfo.appendChild(cardInfoTitle);
      cardInfo.appendChild(cardInfoTypes);
      card.appendChild(cardImage);
      card.appendChild(cardInfo);
      pokemonCards.appendChild(card);
    }))
  } catch(error) {
    console.log(error);
  }
}

fetchPokemons();