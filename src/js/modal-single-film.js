
import MicroModal from 'micromodal';
// import axios from 'axios';
import filmTpl from '../templates/modal.hbs';
import refs from '../js/refs';
import  apiService  from '../apiServises/api';


refs.gallery.addEventListener('click', openModal);

export function openModal() { 
const cards = refs.gallery.querySelectorAll('li');
cards.forEach(card => card.addEventListener('click', showModal));
  MicroModal.init({
  //  onClose: modal => console.info(`${'modal-1'} is hidden`),
  //  onShow: modal => console.info(`${'modal-1'} is shown`),
   disableScroll: true,
    disableFocus: true,
  });
}

function showModal(event) {
  const element = event.currentTarget;
  const id = element.dataset.id;
  console.log(id);
  
  apiService.showFilmDetails(id).then(updateData).then(openModal);
  refs.divModal.innerHTML = '';
}

function updateData(data) {
  const markup = filmTpl(data);
  refs.divModal.insertAdjacentHTML('beforeend', markup);
}

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const apiKey = 'e3cac6b09ca16e2df27fc1a61005a6af';

// const showFilmDetails = async id => {
//   const { data } = await axios.get(
//     `/movie/${id}?api_key=${apiKey}&language=en-US`,
//   );
//   console.log(data);
//   updateData(data);
// };

// showFilmDetails(587806);