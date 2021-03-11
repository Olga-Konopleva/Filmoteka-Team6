import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
import refs from './refs';

function showFilmsByQuery() {
  api
    .getUpdatedFilms(api.url.searchUrl)
    .then(films => updateGalleryMarkup(films))
    .finally(() => {
      refs.spinner.classList.add('hide');
    });
}
export default showFilmsByQuery;
