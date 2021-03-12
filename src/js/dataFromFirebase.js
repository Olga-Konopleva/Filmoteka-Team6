import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';
const apiKey = '44fd846a8fbd886b31f763260ef2b77b';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
import refs from './refs.js';
import * as auth from './authFirebase';
import * as dataToFirebase from './dataToFirebase.js';
import {
  warningRemoveQueueHandler,
  warningRemoveWatchedHandler,
} from './util/warnings';

import { emptyLibrary } from './util/errors';

import api from '../apiServises/api';
import noFilmTemplate from '../templates/no-film.hbs';

import {
  addFilmHandlerWatched,
  deleteFilmHandlerWatched,
  getListFilmsWatched,
} from './localStorageWatched';
import {
  addFilmHandlerQueue,
  deleteFilmHandlerQueue,
  getListFilmsQueue,
} from './localStorageQueue';

//ФУКНЦІЯ ЯКА ПЕРЕВІРЯЄ ЧИ Є В БД АЙДІШНИК ПО ЯКОМУ КЛІКНУЛИ
//І РОБИТЬ ВІДПОВІДНІ СТИЛІ ДЛЯ КНОПОК
function setModalBtnWatchStyles(event, button, hiddenBtn) {
  if (event.target === button) {
    button.classList.add('hide');
    hiddenBtn.classList.remove('hide');
    dataToFirebase.addToWatch();
    console.log(123);
    return;
  }

  if (event.target === hiddenBtn) {
    button.classList.remove('hide');
    hiddenBtn.classList.add('hide');
    removeFromWatch();
    return;
  }
}

function setModalBtnQueueStyles(event, button, hiddenBtn) {
  if (event.target === button) {
    button.classList.add('hide');
    hiddenBtn.classList.remove('hide');
    dataToFirebase.addToQueue();
  }

  if (event.target === hiddenBtn) {
    button.classList.remove('hide');
    hiddenBtn.classList.add('hide');
    removeFromQueue();
  }
}

// ФУНКЦІЯ ДЛЯ ЩОБ ОТРИМАТИ АЙДІШНИКИ З БД І ПО НИМ ЗРОБИТИ ЗАПИТ НА СЕРВЕР
// ТА ВІД РЕНДЕРИТИ РОЗМІТКУ ПО ОТРИМАНИХ ДАННИХ
async function getMoviesWatched(uid = false) {
  const currentUser = firebase.auth().currentUser;
  // console.log(currentUser);
  let watched = getListFilmsWatched();

  if (currentUser) {
    const authoried = await auth.readUserData(uid);
    const data = await authoried.val();
    watched = (await data.watched) || [];
  }
  if (!watched || watched.length === 0) {
    const markup = noFilmTemplate();
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    setTimeout(emptyLibrary, 300);
    return;
  }
  const promises = watched.map(id =>
    api.showFilmDetails(id).then(data => api.updateOneFilmInfo(data)),
  );
  // отримуємо масив промісів з об'єктами, в яких є повна інформація про фільм
  const updatedWatched = await Promise.all(promises);
  console.log(updatedWatched);
  return updatedWatched;
}

async function getMoviesQueue(uid = false) {
  const currentUser = firebase.auth().currentUser;
  let queued = getListFilmsQueue();

  if (currentUser) {
    const authoried = await auth.readUserData(uid);
    const data = await authoried.val();
    queued = (await data.queue) || [];
  }
  if (!queued || queued.length === 0) {
    const markup = noFilmTemplate();
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    setTimeout(emptyLibrary, 300);
    return;
  }

  const promises = queued.map(id =>
    api.showFilmDetails(id).then(data => api.updateOneFilmInfo(data)),
  );
  // отримуємо масив промісів з об'єктами, в яких є повна інформація про фільм
  const updatedQueued = await Promise.all(promises);
  return updatedQueued;
}

// ФУНКЦІЯ ЯКА ЧИСТИТЬ РОЗМІТКУ
// ВИДАЛЯЄ АЙДІШНИК ФІЛЬМА НА ЯКОМУ КЛІКНУЛИ КНОПКУ З БД
// І РЕНДЕРИТЬ НОВУ РОЗМІТКУ ПО АЙДІШНИКАХ ЯКІ ЛИШИЛИСЬ В БД
function removeFromWatch() {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    // refs.gallery.innerHTML = '';
    let uid = currentUser.uid;
    let movieId = localStorage.getItem('firebase-id');
    auth
      .readUserData(uid)
      .then(data => data.val())
      .then(data => {
        if (data.watched) {
          let watched = data.watched || [];
          if (watched.includes(movieId)) {
            let movieIndex = watched.indexOf(movieId);
            watched.splice(movieIndex, 1);
            console.log('NEW WATCHED', watched);
          }
          dataToFirebase.updateWatchedList(uid, [...watched]);
          // myLibrary.renderWatched();
        }
      });
    // console.log(watched);
  } else {
    let movieId = localStorage.getItem('firebase-id');
    deleteFilmHandlerWatched(movieId);
  }
  setTimeout(warningRemoveWatchedHandler, 300);
}

function removeFromQueue() {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    // refs.gallery.innerHTML = '';
    let uid = currentUser.uid;
    let movieId = localStorage.getItem('firebase-id');
    auth
      .readUserData(uid)
      .then(data => data.val())
      .then(data => {
        if (data.queue) {
          let queue = data.queue || [];
          if (queue.includes(movieId)) {
            let movieIndex = queue.indexOf(movieId);
            queue.splice(movieIndex, 1);
            console.log('NEW QUEUE', queue);
          }
          dataToFirebase.updateQueueList(uid, [...queue]);
          // myLibrary.renderQueue();
        }
      });
    // console.log(queue);
  } else {
    let movieId = localStorage.getItem('firebase-id');
    deleteFilmHandlerQueue(movieId);
  }
  setTimeout(warningRemoveQueueHandler, 300);
}

export {
  getMoviesWatched,
  removeFromWatch,
  getMoviesQueue,
  removeFromQueue,
  setModalBtnWatchStyles,
  setModalBtnQueueStyles,
};
