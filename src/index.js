import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const container = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
loadBtn.setAttribute('disabled', 'true');
loadBtn.classList.add('hide');
input.classList.add('input-style');
searchBtn.classList.add('searchBt-style');

//змінні для запиту на сервер
const key = '40611868-10084cd142e7b08f59941726f';
let q = 'cat';
const imageType = 'photo';
const imageOrientation = 'horizontal';
const safesearch = true;
let page = 1;
const amountPerPage = 40;
let totalPage = 1;

async function fetchAllPictures()  {
  try {
    const response = await axios.get(
    `https://pixabay.com/api/?key=${key}&q=${q}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=${safesearch}&page=${page}&per_page=${amountPerPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    throw error;
  }
}

//додаємо слухача на форму
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();

  q = input.value;
  page = 1;
  //запит на pixabay.com. Вивівся масив об'єктів
  fetchAllPictures()
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        console.log(data);
        renderCards(data.hits);
        loadBtn.classList.remove('hide');
        Notiflix.Notify.success(
          `Hooray! We found ${data.total} images.`,
          {
            timeout: 6000,
          },
          function cb() {}
        );
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            timeout: 6000,
          },
          function cb() {}
        );
      }
      totalPage = Math.ceil(data.total / amountPerPage);
      checkLoadBtnStatus();
    })
    .catch(error => {
      console.log('error');
    });
}

const lightbox = new SimpleLightbox('.gallery a', { 
  captionsData: 'alt',
  captionDelay: 250,
})

function renderCards(hits) {
  container.innerHTML = '';

  const cardMarkup = hits
    .map(
      card => `
    <div class="photo-card">
    <a href="${card.largeImageURL}" class="gallery__link">
    <img src="${card.previewURL}" alt="${card.tags}" loading="lazy" />
    </a>
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
    `
    )
    .join('');

  container.insertAdjacentHTML('beforeend', cardMarkup);

  
  lightbox.refresh()

  loadBtn.removeAttribute('disabled', 'true');
}
//завантаження по load more
loadBtn.addEventListener('click', onLoadMoreClick);
function onLoadMoreClick(evt) {
  page += 1;

  fetchAllPictures()
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        console.log(data);
        renderCards(data.hits);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            timeout: 6000,
          },
          function cb() {}
        );
      }
    })
    .catch(error => {
      console.log('error');
    });
  checkLoadBtnStatus();
}
function checkLoadBtnStatus() {
  if (page >= totalPage) {
    loadBtn.setAttribute('disabled', 'true');
  }
}
