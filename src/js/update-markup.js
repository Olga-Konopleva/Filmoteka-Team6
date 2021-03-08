import filmCardTpl from '../templates/gallery-item-template.hbs';
import refs from './refs';

function updateGalleryMarkup(films) {
  const markup = filmCardTpl(films);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.spinner.classList.add('hide');
  return markup;
}

export default updateGalleryMarkup;
