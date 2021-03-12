import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs.js';
import * as auth from './authFirebase';
import * as dataToFirebase from './dataToFirebase.js';
import * as dataFromFirebase from './dataFromFirebase';

import {
  addFilmHandlerQueue,
  deleteFilmHandlerQueue,
  getListFilmsQueue,
} from './localStorageQueue';
import {
  addFilmHandlerWatched,
  deleteFilmHandlerWatched,
  getListFilmsWatched,
} from './localStorageWatched';

const container = refs.divModal;

// container.addEventListener('click', modalClick)

//ФУНКЦІЯ ДЛЯ ОБРОБКИ КЛІКІВ ПО КНОПКАХ В МОДАЛЦІ
function modalMagic() {
  const addBtnWatch = container.querySelector('button[data-id=addwatched]');
  const removeBtnWatch = container.querySelector(
    'button[data-id=removewatched]',
  );
  const addBtnQueue = container.querySelector('button[data-id=addqueue]');
  const removeBtnQueue = container.querySelector('button[data-id=removequeue]');
  // console.log(addBtnWatch)

  container.addEventListener('click', event => {
    dataFromFirebase.setModalBtnWatchStyles(event, addBtnWatch, removeBtnWatch);
    dataFromFirebase.setModalBtnQueueStyles(event, addBtnQueue, removeBtnQueue);
  });
}
// }

//ФУНКЦІЯ ДЛЯ ПЕРЕВІРКИ ЧИ Є АЙДІШНИК В БД І ВІДПОВІДНО
//ЯКІ КНОПКИ ПОКАЗУВАТИ В МОДАЛЦІ
function checkMovieInStorage(
  addBtnWatch,
  removeBtnWatch,
  addBtnQueue,
  removeBtnQueue,
) {
  let currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    checkMovieInLocalStorage(
      addBtnWatch,
      removeBtnWatch,
      addBtnQueue,
      removeBtnQueue,
    );
    return;
  }

  let id = localStorage.getItem('firebase-id');

  auth
    .readUserData(currentUser.uid)
    .then(data => data.val())
    .then(data => {
      if (data.watched || data.queue) {
        console.log('we are in!');
        const dataFromWatched = data.watched || [];
        const dataFromQueue = data.queue || [];
        console.log('ok');

        const addBtnWatch = container.querySelector(
          'button[data-id=addwatched]',
        );
        const removeBtnWatch = container.querySelector(
          'button[data-id=removewatched]',
        );
        const addBtnQueue = container.querySelector('button[data-id=addqueue]');
        const removeBtnQueue = container.querySelector(
          'button[data-id=removequeue]',
        );

        if (dataFromWatched.includes(id)) {
          if (!addBtnWatch.classList.contains('hide')) {
            addBtnWatch.classList.add('hide');
            removeBtnWatch.classList.remove('hide');
            // addToWatched.textContent = "ALREADY IN WATCHED";
            // addToWatched.setAttribute("disabled", 'true');
          }
        } else {
          addBtnWatch.classList.remove('hide');
          removeBtnWatch.classList.add('hide');
        }
        if (dataFromQueue.includes(id)) {
          if (!addBtnQueue.classList.contains('hide')) {
            addBtnQueue.classList.add('hide');
            removeBtnQueue.classList.remove('hide');
            // addToQueue.textContent = "ALREADY IN QUEUE";
            // addToQueue.setAttribute("disabled", 'true');
          }
        } else {
          addBtnQueue.classList.remove('hide');
          removeBtnQueue.classList.add('hide');
        }
      }
    });
}
function checkMovieInLocalStorage(
  addBtnWatch,
  removeBtnWatch,
  addBtnQueue,
  removeBtnQueue,
) {
  let id = localStorage.getItem('firebase-id');
  const dataFromWatched = getListFilmsWatched() || [];
  const dataFromQueue = getListFilmsQueue() || [];

  if (dataFromWatched.includes(id)) {
    if (!addBtnWatch.classList.contains('hide')) {
      addBtnWatch.classList.add('hide');
      removeBtnWatch.classList.remove('hide');
    }
  } else {
    addBtnWatch.classList.remove('hide');
    removeBtnWatch.classList.add('hide');
  }
  if (dataFromQueue.includes(id)) {
    if (!addBtnQueue.classList.contains('hide')) {
      addBtnQueue.classList.add('hide');
      removeBtnQueue.classList.remove('hide');
    }
  } else {
    addBtnQueue.classList.remove('hide');
    removeBtnQueue.classList.add('hide');
  }
}
export { checkMovieInStorage, modalMagic, checkMovieInLocalStorage };
