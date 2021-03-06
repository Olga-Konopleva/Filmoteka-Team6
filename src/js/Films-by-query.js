import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
function showFilmsByQuery() {
  api
    .getUpdatedFilms(api.getUrl().searchUrl)
    .then(films => updateGalleryMarkup(films));
}
export default showFilmsByQuery;
