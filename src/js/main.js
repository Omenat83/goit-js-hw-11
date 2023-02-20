import { onSearch } from "./functions.js";

const searchForm = document.querySelector('.search-form');
const placeForPictures = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoadMore);