
// Generar conexion a la API con axios
// const api = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1'
// });
// api.defaults.headers.common['X-API-KEY'] = 'c08d415f-dea7-4a38-bb28-7b2188202e46';


const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=10';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_3sRpuUcvQvAgSmMV1QuwuJrBdMoqzTeWvPgIW30VnVpM8X7u32blhuX9RuIo9fGG';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_3sRpuUcvQvAgSmMV1QuwuJrBdMoqzTeWvPgIW30VnVpM8X7u32blhuX9RuIo9fGG`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error')

async function loadRandomImages() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(res)
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveImages(data[0].id); //around function, cuando no queremos ejecutar una funcion automaticamente
    btn2.onclick = () => saveImages(data[1].id);
  }
}

async function favoriteImages() {
  const res = await fetch(API_URL_FAVOTITES,{
    method: 'GET',
    headers: {
      'x-api-key': 'live_3sRpuUcvQvAgSmMV1QuwuJrBdMoqzTeWvPgIW30VnVpM8X7u32blhuX9RuIo9fGG',
    },
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favoriteMichis')
    section.innerHTML = ""; //limpiar contenido cada vez que se ejecute la funcion favoriteImages()

    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      article.classList.add('containerMichis');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('👎');

      img.src = michi.image.url;
      img.width = 150;
      img.height = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteImageSaved(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveImages(id) {

  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi guardado en favoritos')
    favoriteImages(); //ejecutamos de nuevo la funcion para evitar recargar la pagina
  }
}

async function deleteImageSaved(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos')
    favoriteImages();
  }
}

async function uploadImage(){
  const form = document.getElementById('upload')
  const formData = new FormData(form);
  console.log(formData.get('file'))

  const res = await fetch(API_URL_UPLOAD,{
    method: 'POST',
    headers: { 
      'x-api-key': 'live_3sRpuUcvQvAgSmMV1QuwuJrBdMoqzTeWvPgIW30VnVpM8X7u32blhuX9RuIo9fGG',
    },
    body: formData,
  })

  console.log(res);
}

loadRandomImages();
favoriteImages();