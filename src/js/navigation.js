import refs from './refs';

refs.libraryBtn.addEventListener('click', toLibrary);
refs.homeBtn.addEventListener('click', toHome);
refs.logo.addEventListener('click', toHome);
// header__wrapper header__wrapper--library

function toLibrary(event) {
  refs.header.classList.remove('header__wrapper');
  refs.header.classList.add('header__wrapper--library');
  refs.homeBtn.classList.remove('nav__link--current');
  refs.libraryBtn.classList.add('nav__link--current');
  refs.formWrap.classList.add('hide');
  refs.containerBtnLibrary.classList.remove('hide');
}

function toHome(event) {
  refs.header.classList.add('header__wrapper');
  refs.header.classList.remove('header__wrapper--library');
  refs.homeBtn.classList.add('nav__link--current');
  refs.libraryBtn.classList.remove('nav__link--current');
  refs.formWrap.classList.remove('hide');
  refs.containerBtnLibrary.classList.add('hide');
}
