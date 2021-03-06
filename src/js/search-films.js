import api from '../apiServises/api';
import fetchFilms from './fetch-films';
import refs from './refs';
refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  api.query = form.elements.query.value;
  refs.gallery.textContent = '';
  api.resetPage();
  fetchFilms();
}
