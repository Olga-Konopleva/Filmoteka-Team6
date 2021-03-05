import apiService from '../apiServises/api';
import { updateGalleryMarkup } from './update-gallery-markup';

//для проверки данных
apiService.getUpdatedPopularFilms().then(updateGalleryMarkup);
