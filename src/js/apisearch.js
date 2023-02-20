import axios from "axios";

const KEY = "33668245-88b2d78a431fcfde02e20361a";
const URL_SEARCH = "https://pixabay.com/api/";
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
});

async function searchPictures (name) {
    console.log("Запит у ф-ції арі: ", name);

    const pictures = await axios.get(`${URL_SEARCH}?key=${KEY}&q=${name}&${searchParams}&page=1`);
    return pictures.data.hits;

    // return axios.get(`${URL_SEARCH}?key=${KEY}&q=${name}&${searchParams}&page=1`)
    // .then(({data}) => data.hits).catch(console.log);
}

export {searchPictures};