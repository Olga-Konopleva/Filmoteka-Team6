import MicroModal from 'micromodal';
import axios from 'axios';
import filmTpl from '../templates/modal.hbs';

const buttonModal = document.querySelector('.btn-trigger');
const divModal = document.querySelector('.modal__container');


buttonModal.addEventListener('click', () => {
    MicroModal.show('modal-1');
});

    axios.defaults.baseURL = 'https://api.themoviedb.org/3';
    const apiKey = 'e3cac6b09ca16e2df27fc1a61005a6af';
    
    const showFilmDetails = async id => {
    const { data } = await axios.get(
        `/movie/${id}?api_key=${apiKey}&language=en-US`,
    );
    // console.log(data);
        updateData(data);
    };
    showFilmDetails(587807);

function updateData(data) { 
     const markup = filmTpl(data);
        divModal.insertAdjacentHTML('beforeend', markup);
}


