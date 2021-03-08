import filmCardTpl from '../templates/gallery-item-template.hbs';
import refs from './refs';

function updateGalleryMarkup(films) {
  const markup = filmCardTpl(films);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  return markup;
}

export default updateGalleryMarkup;
