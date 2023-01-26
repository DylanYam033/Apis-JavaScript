console.log('Hello, world')

const container = document.querySelector('.container');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_7wVDh1Weys2nNGbMvKhtuQ7GA44iNgbyUTgLMWwwVnP1Hz7TRL2c9SK1JFvkDtdm';

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
    img.setAttribute('src', cat.url);
    img.setAttribute('width', '200');

    container.appendChild(img);
  }
}

reload();