import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
function fetchFilms() {
  api.getUpdatedFilms().then(films => updateGalleryMarkup(films));
}
export default fetchFilms;
