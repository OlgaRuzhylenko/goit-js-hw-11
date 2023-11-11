import axios from 'axios';
// import { fetchAllPictures } from './api';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector("button");
const container = document.querySelector('.gallery')

//змінні для запиту на сервер
const key = "40611868-10084cd142e7b08f59941726f";
let q = "cat";
const imageType = 'photo';
const imageOrientation = 'horizontal';
const safesearch = true;

export function fetchAllPictures(){
return fetch(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=${safesearch}`)
.then(response => response.json())
}

//додаємо слухача на форму
form.addEventListener("submit", onFormSubmit) ;
function onFormSubmit(evt) {
    evt.preventDefault();

    q = input.value;

//запит на pixabay.com. Вивівся масив об'єктів
fetchAllPictures()
.then(data => {
    if (data.hits && data.hits.length > 0){
        console.log(data);
        // return data;
        renderCards(data.hits);
    } else {
        console.log('Sorry, there are no images matching your search query. Please try again.');
    }
   }).catch(error => {
    console.log("error");
})
}

function renderCards(hits) {
    container.innerHTML = '';

    const cardMarkup = hits.map(card =>`
    <div class="photo-card">
  <img src="${card.previewURL}" alt="${card.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${card.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${card.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${card.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${card.downloads}</b>
    </p>
  </div>
</div>
    `).join('');

    container.insertAdjacentHTML("beforeend", cardMarkup);
}
