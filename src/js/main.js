import footerModalHandler from './FooterModalHandler/FooterModalHandler';
import apiService from '../apiServises/api';
import { updateGalleryMarkup } from './update-gallery-markup';

footerModalHandler('#students');

//для проверки данных
apiService
  .getUpdatedFilms(apiService.getUrl().popylarFilmsUrl)
  .then(updateGalleryMarkup);
