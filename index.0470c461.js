const e=document.querySelector(".search-form"),t=document.querySelector("input");document.querySelector("button");fetch("https://pixabay.com/api/?key=40611868-10084cd142e7b08f59941726f&q=yellow+flower&image_type=photo&orientation=horizontal&safesearch=true").then((e=>e.json())).then((e=>(console.log(e),e))).catch((e=>{console.log("error")})),e.addEventListener("submit",(function(e){e.preventDefault();t.value}));
//# sourceMappingURL=index.0470c461.js.map
