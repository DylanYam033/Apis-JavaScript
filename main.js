const container = document.querySelector('.container');

//  URL que trae las imagenes mediante metodo GET
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_7wVDh1Weys2nNGbMvKhtuQ7GA44iNgbyUTgLMWwwVnP1Hz7TRL2c9SK1JFvkDtdm';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=1';

async function reload() {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data)
//   const img1 = document.getElementById('img1');
//   const img2 = document.getElementById('img2');
//   const img3 = document.getElementById('img3');
  
//   img1.src = data[0].url;
//   img2.src = data[1].url;
//   img3.src = data[2].url;

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