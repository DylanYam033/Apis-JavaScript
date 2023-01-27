const container = document.querySelector('.container');

//  URL que trae las imagenes mediante metodo GET
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=1';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_3sRpuUcvQvAgSmMV1QuwuJrBdMoqzTeWvPgIW30VnVpM8X7u32blhuX9RuIo9fGG';

async function reload() {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data)

  for(cat of data){
    const img = document.createElement('img');
    const button = document.createElement('button');
    img.setAttribute('src', cat.url);
    img.setAttribute('width', '200');
    button.innerText = 'Agregar a favoritos';

    container.appendChild(img);
    container.appendChild(button);
  }
}

async function loadFavoritesMichis() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

reload();
loadFavoritesMichis();