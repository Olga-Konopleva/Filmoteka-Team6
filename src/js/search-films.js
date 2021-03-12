import api from '../apiServises/api';
import showFilmsByQuery from './Films-by-query';
import refs from './refs';
import { startPagination } from './pagination';
refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  refs.searchList.classList.add('is-hidden');
  const form = event.currentTarget;
  api.query = form.elements.query.value;
  refs.gallery.textContent = '';

  const theme = localStorage.getItem('Theme');
  if (theme === 'light-theme') {
    refs.spinner.classList.remove('hide');
  } else {
    refs.spinnerInversion.classList.remove('hide');
  }
  api.resetPage();
  showFilmsByQuery();
  startPagination('searchUrl');
}
