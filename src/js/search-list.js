import refs from './refs';
import debounce from 'lodash.debounce';
import api from '../apiServises/api';
import searchListTpl from '../templates/search-list.hbs';
import { showModal } from '../js/modal-single-film';
import MicroModal from 'micromodal';
import { emptyFilmListHandler } from './util/infos';

refs.input.addEventListener('input', debounce(predicationSearch, 500));

function predicationSearch() {
  console.log('work');
  api.searchQuery = refs.input.value;

  refs.searchList.innerHTML = '';
  if (!refs.input.value) {
    refs.searchList.classList.add('is-hidden');
    return;
  }
  api.getUpdatedFilms(api.getUrl().searchUrl).then(filmList => {
    refs.searchList.classList.remove('is-hidden');
    if (!filmList.length) {
      refs.searchList.classList.add('is-hidden');
      return;
    }
    const updatedFilmList = filmList.slice(0, 5);
    const markup = searchListTpl(updatedFilmList);
    refs.searchList.insertAdjacentHTML('beforeend', markup);
  });
}

refs.searchGallery.addEventListener('click', openModal);

export function openModal(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  showModal(event);

  MicroModal.show('modal-1', {
    // onShow: modal => console.info(`${modal.id} is shown`), // [1]
    // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    disableScroll: true, // [6]
    disableFocus: true, // [7]
  });
}
