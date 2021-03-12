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

const addPaginationButtons = () => {
  if (screenSize >= 320 && screenSize < 768) {
    return (options.visiblePages = 3);
  }
  if (screenSize >= 768 && screenSize < 1024) {
    return (options.visiblePages = 6);
  }
  if (screenSize >= 1024) {
    return (options.visiblePages = 9);
  }
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

const addPagination = url => {
  const pagination = new Pagination('pagination', options);
  pagination.on('beforeMove', async evt => {
    const { page } = evt;
    const data = await api.getUpdatedFilms(api.getUrl(page)[url]);
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

const startPagination = async url => {
  const { data } = await axios.get(api.getUrl(startPage)[url]);
  const { total_pages } = await data;
  options.totalItems = total_pages;

  addPagination(url);
};
addPaginationButtons();
export { startPage, addItems, startPagination };
