import apiService from '../apiServises/api';
import { updateGalleryMarkup } from './update-gallery-markup';

apiService.findFilm().then(results => {
  updateGalleryMarkup(results);
});
