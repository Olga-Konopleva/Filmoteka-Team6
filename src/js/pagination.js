import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import api from '../apiServises/api';
import updateGalleryMarkup from './update-markup';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../apiServises/api-variables';
import refs from './refs';

const startPage = 1;
let screenSize = document.documentElement.clientWidth;
const options = {
  totalItems: 1,
  itemsPerPage: 1,
  visiblePages: 3,
  page: 1,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const addItems = array => {
  if (screenSize >= 320 && screenSize < 768) {
    return array.map(film => film).slice(0, 4);
  }
  if (screenSize >= 768 && screenSize < 1024) {
    return array.map(film => film).slice(0, 8);
  }
  if (screenSize >= 1024) {
    return array.map(film => film).slice(0, 9);
  }
};

const addPaginationForPopularFilms = () => {
  const paginationPopular = new Pagination('pagination', options);
  paginationPopular.on('beforeMove', async evt => {
    const { page } = evt;
    const data = await api.getUpdatedFilms(api.getUrl(page).popylarFilmsUrl);
    const results = addItems(data);
    console.log(results);
    if (results) {
      refs.gallery.innerHTML = '';

      refs.spinner.classList.remove('hide');
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
      updateGalleryMarkup(results);
      refs.spinner.classList.add('hide');
    } else {
      return false;
    }
  });
};

const addPaginationForSearch = () => {
  const paginationSearch = new Pagination('pagination', options);
  paginationSearch.on('beforeMove', async evt => {
    const { page } = evt;
    const data = await api.getUpdatedFilms(api.getUrl(page).searchUrl);
    const results = addItems(data);
    console.log(results);
    if (results) {
      refs.gallery.innerHTML = '';

      refs.spinner.classList.remove('hide');
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
      updateGalleryMarkup(results);
      refs.spinner.classList.add('hide');
    } else {
      return false;
    }
  });
};

const startPopularPagination = async () => {
  const { data } = await axios.get(api.getUrl(startPage).popylarFilmsUrl);
  const { total_pages } = await data;
  options.totalItems = total_pages;

  addPaginationForPopularFilms();
};

const startSearchPagination = async () => {
  const { data } = await axios.get(api.getUrl(startPage).searchUrl);
  const { total_pages } = await data;
  options.totalItems = total_pages;

  addPaginationForSearch();
};

export { startPage, addItems, startPopularPagination, startSearchPagination };
