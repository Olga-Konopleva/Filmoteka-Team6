import refs from './refs';

const container = refs.divModal;

export function showTrailer() {
  const buttonOpenRef = container.querySelector('button[data-action=open]');
  const buttonCloseRef = container.querySelector('button[data-action=close]');
  const backdropRef = container.querySelector('.trailer-backdrop');
  const trailerModalContainer = container.querySelector('.trailer');

  console.log(trailerModalContainer);
  buttonOpenRef.addEventListener('click', onOpenModal);
  buttonCloseRef.addEventListener('click', onCloseModal);
  backdropRef.addEventListener('click', onBackDropClick);

  function onOpenModal() {
    console.log(trailerModalContainer);
    trailerModalContainer.classList.add('show-modal');
  }

  function onCloseModal() {
    trailerModalContainer.classList.remove('show-modal');
  }

  function onBackDropClick(event) {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  }
}
