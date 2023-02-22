import PicturesApiService from './apisearch.js';
import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const placeForPictures = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

let gallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
});

const picturesApiService = new PicturesApiService();

searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const value = evt.currentTarget.searchQuery.value.trim();
  picturesApiService.resetPage();

  if (value === '') return Notify.failure('Please, enter a valid query');
  
  picturesApiService.searchQuery = value;

  clearPicturesList();
  createGallery().finally(() => searchForm.reset());
}

async function createGallery() {
  try {
    const pictures = await picturesApiService.searchPictures();
    if (pictures.length < 40 && pictures.length > 0) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    if (pictures.length === 0) {
      throw new Error('');
    }
    const markup = pictures.reduce(
      (markup, picture) => markup + createPictureCard(picture),
      ''
    );
    addPicturesToGallery(markup);
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function createPictureCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
    <a href="${largeImageURL}">
    <div class="thumb">

    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    
    </div>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes:</b>${likes}
      </p>
      <p class="info-item">
        <b>Views:</b>${views}
      </p>
      <p class="info-item">
        <b>Comments:</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b>${downloads}
      </p>
    </div>
  </div>
    `;
}

function clearPicturesList() {
  placeForPictures.innerHTML = '';
}

function addPicturesToGallery(markup) {
  placeForPictures.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && picturesApiService.searchQuery !== '') {
      createGallery();
    }
  });
};

const options = {
  rootMargin: "150px",
};
const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector('#sentinel'));
