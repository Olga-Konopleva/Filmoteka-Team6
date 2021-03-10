import MicroModal from 'micromodal';
import filmTpl from '../templates/modal.hbs';
import refs from './refs';
import apiService from '../apiServises/api';
import { showTrailer } from './show-trailer';
refs.gallery.addEventListener('click', openModal);
MicroModal.init({
  disableScroll: true, // [6]
  disableFocus: true, // [7]
});
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
  MicroModal.show('modal-1');
}
function showModal(event) {
  const element = event.target;
  const id = element.dataset.id;
  localStorage.setItem('firebase-id', id);
  // console.log(id);
  apiService
    .showFilmDetails(id)
    .then(data => apiService.updateOneFilmInfo(data))
    //  .then(console.log)
    .then(data => updateData(data))
    .then(showTrailer);

  // refs.body.classList.add('hidden');
  refs.divModal.innerHTML = '';
}
function updateData(data) {
  const markup = filmTpl(data);
  refs.divModal.insertAdjacentHTML('beforeend', markup);
  return markup;
}
