// /запит на pixabay.com. Вивівся масив об'єктів
const key = "40611868-10084cd142e7b08f59941726f";
export let q = "cat";
const imageType = 'photo';
const imageOrientation = 'horizontal';
const safesearch = true;

export function fetchAllPictures(){
return fetch(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=${safesearch}`)
.then(response => response.json())
}