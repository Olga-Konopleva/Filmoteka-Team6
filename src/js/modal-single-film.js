import MicroModal from 'micromodal';
import filmTpl from '../templates/modal.hbs';
import refs from './refs';
import apiService from '../apiServises/api';

refs.gallery.addEventListener('click', openModal);

MicroModal.init({
  onShow: modal => console.info(`${modal.id} is shown`), // [1]
  onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open', // [5]
  disableScroll: true, // [6]
  disableFocus: true, // [7]
  awaitOpenAnimation: false, // [8]
  awaitCloseAnimation: false, // [9]
  debugMode: true, // [10]
});

export function openModal(event) {
  // console.log(event.target.nodeName);
  if (
    event.target.nodeName === 'UL'
    // event.target.nodeName !== 'IMG' &&
    // event.target.nodeName !== 'LI' &&
    // event.target.nodeName !== 'H3' &&
    // event.target.nodeName !== 'P'
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
    .then(data => updateData(data));
  refs.divModal.innerHTML = '';
}

function updateData(data) {
  const markup = filmTpl(data);
  refs.divModal.insertAdjacentHTML('beforeend', markup);
  return markup;
}
