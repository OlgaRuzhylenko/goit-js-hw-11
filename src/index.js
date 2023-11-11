import axios from 'axios';
import { fetchAllPictures } from './api';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector("button");

// /запит на pixabay.com. Вивівся масив об'єктів
fetchAllPictures()
.then(data => {
    console.log(data);
    return data;
}).catch(error => {
    console.log("error");
})


//додаємо слухача на форму
form.addEventListener("submit", onFormSubmit) ;
function onFormSubmit(evt) {
    evt.preventDefault();

    const searchWord = input.value;

}