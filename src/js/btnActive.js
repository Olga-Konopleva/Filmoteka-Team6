const btnWatched = document.querySelector('.btnWatched');
const btnQueue = document.querySelector('.btnQueue');

btnQueue.addEventListener('click', addActive);
btnWatched.addEventListener('click', onActive);

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
