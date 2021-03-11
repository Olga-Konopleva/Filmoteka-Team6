import refs from './refs';
import debounce from 'lodash.debounce';
import api from '../apiServises/api';
import searchListTpl from '../templates/search-list.hbs';
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

      // ! Notification
      if (!filmList.length) {
        emptyFilmListHandler();
      }
      return false;
    }
    const updatedFilmList = filmList.slice(0, 5);
    const markup = searchListTpl(updatedFilmList);
    refs.searchList.insertAdjacentHTML('beforeend', markup);
  });
}
