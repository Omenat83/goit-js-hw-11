import { searchPictures } from "./apisearch.js";

function onSearch(evt) {
    evt.preventDefault();

    const searchQuery = evt.currentTarget.searchQuery.value.trim();
    searchPictures(searchQuery)
        .then((data) => {
            console.log(data);
        });
}

function onLoadMore() {

}

function makeGallery() {

}
export {onSearch, onLoadMore};