import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs';
import * as dataFromFirebase from './dataFromFirebase';
import updateGalleryMarkup from './update-markup';

const btnWatched = document.querySelector('.btnWatched');
const btnQueue = document.querySelector('.btnQueue');

btnQueue.addEventListener('click', renderQueue);
btnWatched.addEventListener('click', renderWatched);

refs.libraryBtn.addEventListener('click', showMyLibrary);

//ПОКАЗУЄ БІБЛІОТЕКУ ФІЛЬМІВ
function showMyLibrary() {
  renderWatched();
}

// РЕНДЕР ПЕРЕГЛЯНУТИХ ПО АЙДІШНИКАХ З БД
function renderWatched() {
  onActive();
  refs.gallery.innerHTML = '';
  if (firebase.auth().currentUser) {
    dataFromFirebase
      .getMoviesWatched(firebase.auth().currentUser.uid)
      .then(films => updateGalleryMarkup(films));
  } else {
    dataFromFirebase
      .getMoviesWatched()
      .then(films => updateGalleryMarkup(films));
  }

  // const movieCard = document.querySelector('.movie-card')
  // console.log(movieCard);
}

// РЕНДЕР ТИХ ШО В ЧЕРЗІ ПО АЙДІШНИКАХ З БД
function renderQueue() {
  addActive();
  refs.gallery.innerHTML = '';
  if (firebase.auth().currentUser) {
    dataFromFirebase
      .getMoviesQueue(firebase.auth().currentUser.uid)
      .then(films => updateGalleryMarkup(films));
  } else {
    dataFromFirebase.getMoviesQueue().then(films => updateGalleryMarkup(films));
  }
}

function addActive() {
  btnQueue.classList.remove('lib-btn-off');
  btnQueue.classList.add('lib-btn-active');

  btnWatched.classList.remove('lib-btn-active');
  btnWatched.classList.add('lib-btn-off');
}

function onActive() {
  btnWatched.classList.add('lib-btn-active');
  btnWatched.classList.remove('lib-btn-off');

  btnQueue.classList.add('lib-btn-off');
  btnQueue.classList.remove('lib-btn-active');
}
