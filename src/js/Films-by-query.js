import updateGalleryMarkup from './update-markup';
import api from '../apiServises/api';
import refs from './refs';
import { addItems } from './pagination';
import { emptyFilmListHandler } from './util/infos';

async function showFilmsByQuery() {
  const data = await api.getUpdatedFilms(api.getUrl(1).searchUrl);
  // Notification

  if (data.length === 0) {
    emptyFilmListHandler();
  }
  const results = addItems(data);
  updateGalleryMarkup(results);
  refs.spinner.classList.add('hide');
  refs.spinnerInversion.classList.add('hide');
}
export default showFilmsByQuery;
