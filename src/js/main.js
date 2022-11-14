'use strict';

// QUERYSELECTOR

const charactersList = document.querySelector('.js_characters');
const searchBtn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');

// VARIABLES GLOBALES -> CON DATOS DE LA APP: personajes
let data = []; //listado del fetch
let favourite = []; //listado de personajes favoritos
const baseUrl = 'https://breakingbadapi.com/api/characters';

// FUNCIONES

function renderCharacters() {
  let html = "";
    for (const character of data) {
        html += `<article class="article_card">`;
        html += `<img class="img" src="${character.img}"></>`; 
        html += `<p class="name"> ${character.name}</p>`; 
        html += `<p class="status"> ${character.status}</p>`; 
        html += `</article>`;
    }
  charactersList.innerHTML = html;
}

function getCharacters(url) {
  fetch(url)
  .then((response) => response.json())
  .then(characters => {
    data = characters;

    renderCharacters();
  });
}
getCharacters(baseUrl);




// EVENTOS

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let name = input.value;
    let url = `https://breakingbadapi.com/api/characters?name=${name}`;
    getCharacters(url);
    /* fetch(`https://breakingbadapi.com/api/characters?name=${name}`)
    .then((response) => response.json())
    .then(characters => {
      data = characters;
  
      renderCharacters();
    }); */
    renderCharacters();
});