import template from '../templates/card-film.hbs';
import refs from './refs';

export function updateGalleryMarkup(films) {
  const markup = template(films);

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}
