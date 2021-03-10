import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
import refs from './refs';

function showFilmsByQuery() {
  api
    .getUpdatedFilms(api.getUrl().searchUrl)
    .then(films => updateGalleryMarkup(films))
    .finally(() => {
      refs.spinner.classList.add('hide');
      refs.spinnerInversion.classList.add('hide');
    });
}
export default showFilmsByQuery;
