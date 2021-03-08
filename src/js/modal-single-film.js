// пока еще сырой вариант по конкретному id

import MicroModal from 'micromodal';
import axios from 'axios';
import filmTpl from '../templates/modal.hbs';
import refs from '../js/refs';


// const buttonModal = document.querySelector('.btn-trigger');
// const divModal = document.querySelector('.modal__container');

// MicroModal.init({
//   onShow: modal => console.info(`${modal.id} is shown`), // [1]
//   onClose: modal => console.info(`${modal.id} is hidden`), // [2]
//   openTrigger: 'data-custom-open', // [3]
//   closeTrigger: 'data-custom-close', // [4]
//   openClass: 'is-open', // [5]
//   disableScroll: true, // [6]
//   disableFocus: false, // [7]
//   awaitOpenAnimation: false, // [8]
//   awaitCloseAnimation: false, // [9]
//   debugMode: true // [10]
// });

refs.buttonModal.addEventListener('click', () => {
  MicroModal.init({
    onClose: modal => console.info(`${'modal-1'} is hidden`),
    onShow: modal => console.info(`${'modal-1'} is shown`),
    disableScroll: true,
    disableFocus: true,
  });
});


axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'e3cac6b09ca16e2df27fc1a61005a6af';

const showFilmDetails = async id => {
  const { data } = await axios.get(
    `/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
  console.log(data);
  updateData(data);
};
showFilmDetails(587806);

function updateData(data) {
  const markup = filmTpl(data);
  refs.divModal.insertAdjacentHTML('beforeend', markup);
}
