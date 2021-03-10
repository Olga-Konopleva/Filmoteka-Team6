const catchElement = id => {
  let el;
  return () => {
    if (!el) {
      el = document.getElementById(id);
    }
    return el;
  };
};


const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
  galleryContainer: document.querySelector('.gallery__list'),
  searchList: document.querySelector('.js-search-list'),
  input: document.querySelector('.js-input'),
  libraryBtn: document.querySelector('#libraryBtn'),
  homeBtn: document.querySelector('#homeBtn'),
  header: document.querySelector('#header'),
  formWrap: document.querySelector('#formWrap'),
  containerBtnLibrary: document.querySelector('#containerBtnLibrary'),
  logo: document.getElementById('logo'),
  buttonModal: document.querySelector('.btn-trigger'),
  divModal: document.querySelector('.modal__container'),
  spinner: document.querySelector('.spinner-js'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'),
  toolbar: document.querySelector('.toolbar'),
  stateCheckbox: document.getElementById('theme-switch-toggle'),
  paginator: document.getElementById('pagination'),
  signInBtn: document.querySelector('#sign_in'),
  signOutBtn: document.querySelector('#sign_out'),
  userInfo: document.querySelector('.user-info'),
  addBtnWatch: catchElement('add-watched'),
  removeBtnWatch: catchElement('remove-watched'),
  addBtnQueue: catchElement('add-queue'),
  removeBtnQueue: catchElement('remove-queue'),
  modal : document.querySelector('.modal'),
};

export default refs;