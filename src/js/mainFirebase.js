import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs.js'
import * as auth from './authFirebase'
import * as dataToFirebase from './dataToFirebase.js'
import * as dataFromFirebase from './dataFromFirebase'

const container = refs.divModal;

//ФУНКЦІЯ ДЛЯ ОБРОБКИ КЛІКІВ ПО КНОПКАХ В МОДАЛЦІ
function modalMagic() {

    
        const addBtnWatch = container.querySelector('button[data-id=addwatched]');
        const removeBtnWatch = container.querySelector('button[data-id=removewatched]');
        const addBtnQueue = container.querySelector('button[data-id=addqueue]');
        const removeBtnQueue = container.querySelector('button[data-id=removequeue]');
  
  container.addEventListener('click', (event) => {
        
        dataFromFirebase.setModalBtnWatchStyles(event,addBtnWatch,removeBtnWatch);
        dataFromFirebase.setModalBtnQueueStyles(event,addBtnQueue, removeBtnQueue);
      });
  


}
// }



//ФУНКЦІЯ ДЛЯ ПЕРЕВІРКИ ЧИ Є АЙДІШНИК В БД І ВІДПОВІДНО
//ЯКІ КНОПКИ ПОКАЗУВАТИ В МОДАЛЦІ
function checkMovieInStorage() {
  let currentUser = firebase.auth().currentUser
  if (!currentUser) {
    return;
  }
  
    let id = localStorage.getItem('firebase-id');

  auth.readUserData(currentUser.uid)
    .then((data) => (data.val())).then((data) => {
      if (data.watched || data.queue) {
          console.log("we are in!");
        const dataFromWatched = data.watched ||[];
        const dataFromQueue = data.queue ||[];
          console.log("ok");
          
        const addBtnWatch = container.querySelector('button[data-id=addwatched]');
        const removeBtnWatch = container.querySelector('button[data-id=removewatched]');
        const addBtnQueue = container.querySelector('button[data-id=addqueue]');
        const removeBtnQueue = container.querySelector('button[data-id=removequeue]');

        if (dataFromWatched.includes(id)) {
          if (!addBtnWatch.classList.contains("hide")) {
            
              addBtnWatch.classList.add('hide');
              removeBtnWatch.classList.remove('hide');
          }
          } else {
            addBtnWatch.classList.remove('hide');
              removeBtnWatch.classList.add('hide');
        }
        if (dataFromQueue.includes(id)) {
          if (!addBtnQueue.classList.contains("hide")) {
            
              addBtnQueue.classList.add('hide');
              removeBtnQueue.classList.remove('hide');

          }
        } else {
            addBtnQueue.classList.remove('hide');
            removeBtnQueue.classList.add('hide');
        }
      }
    })

  
}
export {checkMovieInStorage,modalMagic}