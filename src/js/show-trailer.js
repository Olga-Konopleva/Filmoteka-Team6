import refs from './refs';

const container = refs.divModal;

export function showTrailer() {
  const buttonOpenRef = container.querySelector('button[data-action=open]');
  const buttonCloseRef = container.querySelector('button[data-action=close]');
  const backdropRef = container.querySelector('.trailer-backdrop');
  const trailerModalContainer = container.querySelector('.trailer');
  const video = container.querySelector('.video');
  const videoSrc = video.src;
  const modalOverlay = document.querySelector('.modal__overlay');

  buttonOpenRef.addEventListener('click', onOpenModal);
  buttonCloseRef.addEventListener('click', onCloseModal);
  backdropRef.addEventListener('click', onBackDropClick);
  modalOverlay.addEventListener('click', onBackDropClick);

  function onOpenModal() {
    video.src = videoSrc;
    trailerModalContainer.classList.add('show-modal');
  }

  function onCloseModal() {
    video.src = '';
    trailerModalContainer.classList.remove('show-modal');
  }

  function onBackDropClick(event) {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  }
}
