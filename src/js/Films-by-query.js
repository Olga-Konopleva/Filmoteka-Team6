import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
import refs from './refs';
import { emptyFilmListHandler } from './util/infos';

function showFilmsByQuery() {
  api
    .getUpdatedFilms(api.url.searchUrl)
    .then(films => {
      updateGalleryMarkup(films);

      // ! Notification
      if (!films.length) {
        emptyFilmListHandler();
      }
    })
    .finally(() => {
      refs.spinner.classList.add('hide');
      refs.spinnerInversion.classList.add('hide');
    });
}
export default showFilmsByQuery;
