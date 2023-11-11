import axios from 'axios';
// import { fetchAllPictures } from './api';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector("button");

//ось це вже є у файлі api.jsю його можна імопртувати
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

// /запит на pixabay.com. Вивівся масив об'єктів
fetchAllPictures()
.then(data => {
    console.log(data);
    return data;
}).catch(error => {
    console.log("error");
})
}