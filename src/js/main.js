'use strict';

// QUERYSELECTOR

const charactersList = document.querySelector('.js_characters');
const searchBtn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');
const favoritesList = document.querySelector('.js_favorites');

// VARIABLES GLOBALES -> CON DATOS DE LA APP: personajes
let charactersDataList = []; //listado de personajes
let favoriteDataList = []; //listado de personajes favoritos
const baseUrl = 'https://breakingbadapi.com/api/characters';

// FUNCIONES

//Función que pinta las tarjetas de "characters"// 
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

  const selectedFavoriteIndex = favoriteDataList.findIndex((eachCharacterObj) => eachCharacterObj.char_id == event.currentTarget.id)

  /* const selectedFavorite = favoriteDataList.find((eachCharacterObj) => eachCharacterObj.char_id == event.currentTarget.id) */;
  

//(selectedFavorite)
  if (selectedFavoriteIndex === -1) {
  favoriteDataList.push(selectedCharacter);

//Utilizamos el JSON stringify para transformar la variable a texto
  localStorage.setItem('favoriteCharacter', JSON.stringify(favoriteDataList));
  } else { //si ya está en favoritos
    favoriteDataList.splice(selectedFavoriteIndex, 1);

    localStorage.setItem('favoriteCharacter', JSON.stringify(favoriteDataList));
  }
  
  renderFavorites();
  
}

function renderFavorites() {
  let html = "";
  for (const favorite of favoriteDataList) {
    html += `<article class="article_card js_article" id="${favorite.char_id}">`;
    html += `<img class="img" src="${favorite.img}"></>`; 
    html += `<p class="name"> ${favorite.name}</p>`; 
    html += `<p class="status"> ${favorite.status}</p>`; 
    html += `</article>`;
  }
  favoritesList.innerHTML = html;
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

// CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA

//Utilizamos el JSON.parse para cambiar de texto a objeto 
const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));
console.log(savedFavorites);

//Importante siempre que hagamos un getItem hagamos un if, para comprobar si hay algo en el localStorage o no
if(savedFavorites !== null) {
favoriteDataList = savedFavorites;
renderFavorites();
}