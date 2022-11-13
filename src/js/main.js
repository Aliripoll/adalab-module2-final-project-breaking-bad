'use strict';

// QUERYSELECTOR

const charactersList = document.querySelector('.js_characters');
let data = []; //listado del fetch

// VARIABLES GLOBALES -> CON DATOS DE LA APP: personajes


// FUNCIONES

function renderCharacters() {
  let html = "";
  console.log(data);
  for (const character of data) {
    console.log(character);
    html += `<img src="${character.img}"></>`; 
    html += `<p> ${character.name}</p>`; 
    html += `<p> ${character.status}</p>`; 

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