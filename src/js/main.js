import apiService from '../apiServises/api';
import { updateGalleryMarkup } from './update-gallery-markup';

console.log(apiService);

apiService.findFilm().then(results => {
  updateGalleryMarkup(results);
});
