'use strict';

// QUERYSELECTOR
const charactersList = document.querySelector('.js_characters');
const searchBtn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');
const favoritesList = document.querySelector('.js_favorites');
const deleteBtn = document.querySelector('.js_deleteBtn');

// VARIABLES GLOBALES
let charactersDataList = []; //listado de personajes
let favoriteDataList = []; //listado de personajes favoritos
const baseUrl = 'https://breakingbadapi.com/api/characters';

// FUNCIONES

//Función que pinta las tarjetas de "characters"// 
function renderCharacters() {
  let html = "";
    for (const character of charactersDataList) {
      //En caso de encontrarlo en favoritos, encuentra su índice en el array de favoritos.
      let indexFav = favoriteDataList.findIndex((favorite) => favorite.name === character.name);
      let favoriteClass = "";
      if (indexFav !== -1) {
        favoriteClass = 'markCharacter';
      }
      html += `<article class="article_card js_article ${favoriteClass}" id="${character.char_id}">`;
      html += `<img class="img" src="${character.img}"></>`; 
      html += `<p class="name"> ${character.name}</p>`; 
      html += `<p class="status"> ${character.status}</p>`; 
      html += `</article>`;
    }
  charactersList.innerHTML = html;
  addFavorites();
}

//Función que mete personajes desde la Api con fetch
function getCharacters(url) {
  fetch(url)
  .then((response) => response.json())
  .then(data => {
    charactersDataList = data;

    renderCharacters();
  });
}
//se ejecuta al cargar la página para meter personajes
getCharacters(baseUrl);

//añade a cada tarjeta el evento click
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
//pinta los favoritos
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

//cuando hago click en el botón de buscar, trae de la Api la info
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let name = input.value.toLowerCase();
    let url = `https://breakingbadapi.com/api/characters?name=${name}`;
    getCharacters(url);
    renderCharacters();
});

deleteBtn.addEventListener('click', (event) => {
  favoritesList.innerHTML = "";
  localStorage.removeItem('favoriteCharacter');
});

//LOCALSTORAGE
//Utilizamos el JSON.parse para cambiar de texto a objeto 
const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));

//Importante siempre que hagamos un getItem hagamos un if, para comprobar si hay algo en el localStorage o no
if(savedFavorites !== null) {
    favoriteDataList = savedFavorites;
    renderFavorites();
}

