import apiService from '../apiServises/api';
import updateGalleryMarkup from './update-markup';
import refs from './refs';


refs.logoBtn.addEventListener('click', handlePopularFilmsByClick);
refs.homeBtn.addEventListener('click', handlePopularFilmsByClick);

function handlePopularFilmsByClick() {
  refs.gallery.innerHTML = '';
  refs.spinner.classList.remove('hide');
  apiService.resetPage();
  loadPopularFilms();
}

function loadPopularFilms() {
  apiService
    .getUpdatedFilms(apiService.getUrl().popylarFilmsUrl)
    .then(updateGalleryMarkup)
    .finally(() => {
      refs.spinner.classList.add('hide');
    });
}

loadPopularFilms();

