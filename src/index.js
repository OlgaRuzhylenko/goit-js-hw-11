import axios from 'axios';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector("button");

//запит на pixabay.com
const key = "40611868-10084cd142e7b08f59941726f";
const q = "yellow+flower";
const imageType = 'photo'

function fetchAllPictures(){
return fetch(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=${imageType}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    return data;
}).catch(error => {
    console.log("error");
})
};
fetchAllPictures()