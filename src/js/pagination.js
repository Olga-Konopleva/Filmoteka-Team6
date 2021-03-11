import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import api from '../apiServises/api';
import refs from './refs';
import updateGalleryMarkup from './update-markup';

const options = {
  totalItems: 200,
  itemsPerPage: 9,
  visiblePages: 6,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn paginator-page">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected paginator-page">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} paginator-page">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip paginator-page">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(refs.paginator, options);
pagination.on('beforeMove', function (evt) {
  api.page = 2;
  const a = api.getUpdatedFilms(api.getUrl().popylarFilmsUrl);
  refs.gallery.textContent = '';
  if (evt.page % 2 === 0) {
    a.then(data =>
      data.filter((film, index) => {
        if (index < 10) {
          console.log(film);
          return film;
        }
      }),
    ).then(films => updateGalleryMarkup(films));
    console.log(a);
  } else {
    a.then(data =>
      data.filter((film, index) => {
        if (index > 9) {
          console.log(film);
          return film;
        }
      }),
    ).then(films => updateGalleryMarkup(films));
    api.page += 1;
  }
});

pagination.on('afterMove', function (evt) {
  console.log(evt.page);
});
