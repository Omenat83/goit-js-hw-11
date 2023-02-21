import axios from 'axios';

const KEY = '33668245-88b2d78a431fcfde02e20361a';
const URL_SEARCH = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export default class PicturesApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async searchPictures() {
    const pictures = await axios.get(
      `${URL_SEARCH}?key=${KEY}&q=${this.searchQuery}&${searchParams}&page=${this.page}`
    );
    this.nextPage();
    return pictures.data.hits;
  }

  nextPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }
}

