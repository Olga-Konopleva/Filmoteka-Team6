import MicroModal from 'micromodal';
import filmTpl from '../templates/modal.hbs';
import refs from './refs';
import apiService from '../apiServises/api';

refs.gallery.addEventListener('click', openModal);

export function openModal(event) {
  if (
    event.target.nodeName !== 'IMG' &&
    event.target.nodeName !== 'LI' &&
    event.target.nodeName !== 'H3' &&
    event.target.nodeName !== 'P'
  ) {
    return;
  }
  showModal(event);
  MicroModal.init({
    disableScroll: true,
    disableFocus: true,
  });
}

function showModal(event) {
  const element = event.target;
  const id = element.dataset.id;
  // console.log(id);
  apiService
    .showFilmDetails(id)
    .then(data => apiService.updateOneFilmInfo(data))
    //  .then(console.log)
    .then(data => updateData(data))
    .then(openModal);
  refs.divModal.innerHTML = '';
}

function updateData(data) {
  const markup = filmTpl(data);
  refs.divModal.insertAdjacentHTML('beforeend', markup);
  return markup;
}
