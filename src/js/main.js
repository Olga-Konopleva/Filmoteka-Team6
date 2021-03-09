import apiService from '../apiServises/api';
import updateGalleryMarkup from './update-markup';

// удалить(уточнить у Оли)
apiService
  .getUpdatedFilms(apiService.getUrl().popylarFilmsUrl)
  .then(updateGalleryMarkup);
