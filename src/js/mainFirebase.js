import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs.js'
import * as auth from './authFirebase'
import * as dataToFirebase from './dataToFirebase.js'
import * as dataFromFirebase from './dataFromFirebase'


// modalClick();
refs.divModal.addEventListener('click', (event) => {
    const addBtnWatch = refs.addBtnWatch();
    const removeBtnWatch = refs.removeBtnWatch();
    const addBtnQueue = refs.addBtnQueue();
    const removeBtnQueue = refs.removeBtnQueue();
    // console.log(addBtnWatch)


    dataFromFirebase.setModalBtnWatchStyles(event,addBtnWatch,removeBtnWatch);
    dataFromFirebase.setModalBtnQueueStyles(event,addBtnQueue, removeBtnQueue);
})

//ФУНКЦІЯ ДЛЯ ОБРОБКИ КЛІКІВ ПО КНОПКАХ В МОДАЛЦІ
// function modalClick(event) {

// }

refs.gallery.addEventListener('click', () => {

  let movieId = localStorage.getItem('firebase-id');
    console.log(movieId);
  setTimeout(checkMovieInStorage(movieId), 100);
});


//ФУНКЦІЯ ДЛЯ ПЕРЕВІРКИ ЧИ Є АЙДІШНИК В БД І ВІДПОВІДНО
//ЯКІ КНОПКИ ПОКАЗУВАТИ В МОДАЛЦІ
function checkMovieInStorage(movieId) {
  let currentUser = firebase.auth().currentUser
  if (!currentUser) {
    return;
    }


  auth.readUserData(currentUser.uid)
    .then((data) => (data.val())).then((data) => {
      if (data.watched || data.queue) {
          console.log("we are in!");
        const dataFromWatched = data.watched ||[];
        const dataFromQueue = data.queue ||[];
          console.log("ok");
          
        const addBtnWatch = refs.addBtnWatch();
        const removeBtnWatch = refs.removeBtnWatch();
        const addBtnQueue = refs.addBtnQueue();
        const removeBtnQueue = refs.removeBtnQueue();

        if (dataFromWatched.includes(movieId)) {
          if (!addBtnWatch.classList.contains("hide")) {
            
              addBtnWatch.classList.add('hide');
              removeBtnWatch.classList.remove('hide');
            // addToWatched.textContent = "ALREADY IN WATCHED";
            // addToWatched.setAttribute("disabled", 'true');
          }
          } else {
            addBtnWatch.classList.remove('hide');
              removeBtnWatch.classList.add('hide');
        }
        if (dataFromQueue.includes(movieId)) {
          if (!addBtnQueue.classList.contains("hide")) {
            
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
    })

}
export {checkMovieInStorage}