import apiService from '../apiServises/api';
import updateGalleryMarkup from './update-markup';
import refs from './refs';
import { addItems, startPopularPagination } from './pagination';

refs.logoBtn.addEventListener('click', handlePopularFilmsByClick);
refs.homeBtn.addEventListener('click', handlePopularFilmsByClick);

function handlePopularFilmsByClick() {
  refs.gallery.innerHTML = '';
  const theme = localStorage.getItem('Theme');
  if (theme === 'light-theme') {
    refs.spinner.classList.remove('hide');
  } else {
    refs.spinnerInversion.classList.remove('hide');
  }
  // apiService.resetPage();
  loadPopularFilms();
}

async function loadPopularFilms() {
  const data = await apiService.getUpdatedFilms(
    apiService.getUrl(1).popylarFilmsUrl,
  );
  const results = addItems(data);
  updateGalleryMarkup(results);
  refs.spinner.classList.add('hide');
  refs.spinnerInversion.classList.add('hide');
}

loadPopularFilms();
startPopularPagination();
