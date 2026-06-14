const listPokemon = document.getElementById("listPokemon");
const searchInput = document.getElementById("searchInput");
const button = document.getElementById("button-search");

button.addEventListener("click", async (e) => {
  e.preventDefault()
  let search = searchInput.value;
  const pokelist = [];

  if (isVaziaOuNula(search)) {
    pokelist = await buscarPokemonLista(5, 0);
  }
  else {
    pokelist = [{ url: `https://pokeapi.co/api/v2/pokemon/${search}` }];
  }
  listagemPokemon(pokelist);
});

let allPokemons = [];

async function buscarPokemon(nome) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function buscarPokemonLista(limit, offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

    const data = await response.json();

    console.log(data.results);
    return data.results
  } catch (error) {
    console.log(error.message);
  }
}

async function buscarPokemonURL(url) {
  try {
    const response = await fetch(url);

    const data = await response.json();

    console.log(data);
    return data
  } catch (error) {
    console.log(error.message);
  }
}

async function listagemPokemon(pokemons) {
  listPokemon.innerHTML = ""
  for (const i in pokemons) {
    const pokemonAtual = await buscarPokemonURL(pokemons[i].url)
    listPokemon.innerHTML += `<p>${pokemonAtual.name}</p>`
    listPokemon.innerHTML += `<img src=${pokemonAtual.sprites.front_default}>`
  };
}

function isVaziaOuNula(str) {
  return !str || str.trim() === '';
}

