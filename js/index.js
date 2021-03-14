const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemons = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=151`);

    const { results: pokemonURLs } = await response.json();

    const pokemonCards = document.querySelector('.pokemon-cards');

    // Remove all cards if exist
    Array.from(pokemonCards.childNodes).map(pokemonCard => {
      pokemonCard.remove();
    });

    await Promise.all(pokemonURLs.map(async (pokemonURL) => {
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
    }));
  } catch(error) {
    console.log(error);
  };
};

const fieldValidations = () => {
  const searchPokemonButton = document.querySelector('.search-pokemon-button');

  searchPokemonButton.addEventListener('click', () => {
    const searchPokemonInput = document.querySelector('.search-pokemon-input');

    const inputValue = searchPokemonInput.value;

    // Validation rules
    // Verify if is empty
    if (!inputValue.trim()) {
      alert('Empty.');

      return;
    } 
    // Verify if user input length is bigger than 3
    else if (inputValue.length < 3) {
      alert('String less than three characters');

      return;
    };

    const pokemonCards = document.querySelectorAll('.pokemon-card');

    Array.from(pokemonCards).map(pokemonCard => {
      const pokemonInfo = pokemonCard.querySelector('.pokemon-card-info');
      const pokemonName = pokemonInfo.querySelector('h2');

      if (pokemonName.textContent.toUpperCase().includes(inputValue.toUpperCase())) {
        pokemonCard.style.display = '';
      } else {
        pokemonCard.style.display = 'none';
      };
    });
  });
};

const clearButtonListener = () => {
  const  clearPokemonButton = document.querySelector('.clear-pokemon-button');

  clearPokemonButton.addEventListener('click', async () => {
    const searchPokemonInput = document.querySelector('.search-pokemon-input');

    searchPokemonInput.value = '';

    await fetchPokemons();
  });
};

clearButtonListener();
fieldValidations();
fetchPokemons();