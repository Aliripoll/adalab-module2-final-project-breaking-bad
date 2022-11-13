'use strict';

// QUERYSELECTOR

const charactersList = document.querySelector('.js_characters');


// VARIABLES GLOBALES -> CON DATOS DE LA APP: personajes
let data = []; //listado del fetch
let favourite = []; //listado de personajes favoritos

// FUNCIONES

function renderCharacters() {
  let html = "";
    for (const character of data) {
        html += `<article class="card">`;
        html += `<img class="img" src="${character.img}"></>`; 
        html += `<p class="name"> ${character.name}</p>`; 
        html += `<p> ${character.status}</p>`; 
        html += `</article>`;
    }
  charactersList.innerHTML = html;
}

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then(characters => {
    data = characters;

    renderCharacters();
  });


// EVENTOS