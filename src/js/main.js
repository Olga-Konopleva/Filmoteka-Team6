import apiService from '../apiServises/api';
import { updateGalleryMarkup } from './update-gallery-markup';

console.log(apiService);

apiService.showPopularFilms().then(results => {
  updateGalleryMarkup(results);
});
apiService.showPopularFilms().then(results => {
  updateGalleryMarkup(results);
});
