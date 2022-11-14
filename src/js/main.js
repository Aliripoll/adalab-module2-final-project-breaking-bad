'use strict';

// QUERYSELECTOR

const charactersList = document.querySelector('.js_characters');
const searchBtn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');

// VARIABLES GLOBALES -> CON DATOS DE LA APP: personajes
let charactersDataList = []; //listado de personajes
let favoriteDataList = []; //listado de personajes favoritos
const baseUrl = 'https://breakingbadapi.com/api/characters';

// FUNCIONES

function renderCharacters() {
  let html = "";
    for (const character of charactersDataList) {
        html += `<article class="article_card js_article" id="${character.char_id}">`;
        html += `<img class="img" src="${character.img}"></>`; 
        html += `<p class="name"> ${character.name}</p>`; 
        html += `<p class="status"> ${character.status}</p>`; 
        html += `</article>`;
    }
  charactersList.innerHTML = html;
  addFavorites();
}

function getCharacters(url) {
  fetch(url)
  .then((response) => response.json())
  .then(data => {
    charactersDataList = data;

    renderCharacters();
  });
}
getCharacters(baseUrl);



function addFavorites() {
  const favorites = document.querySelectorAll('.js_article');
  for (const eachFavorite of favorites) {
    eachFavorite.addEventListener('click', handleClickFavorites);
  }
}

function handleClickFavorites(event) {
  event.currentTarget.classList.toggle('selected');
  const selectedCharacter = charactersDataList.find((eachCharacterObj) => eachCharacterObj.char_id == event.currentTarget.id);
}


// EVENTOS

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let name = input.value;
    let url = `https://breakingbadapi.com/api/characters?name=${name}`;
    getCharacters(url);
    /* fetch(`https://breakingbadapi.com/api/characters?name=${name}`)
    .then((response) => response.json())
    .then(characters => {
      characterDataList = characters;
  
      renderCharacters();
    }); */
    renderCharacters();
});

