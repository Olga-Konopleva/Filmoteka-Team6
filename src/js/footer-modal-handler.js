// Рендер модали футера

import MicroModal from 'micromodal';

function footerModalHandler(selector) {
  const studentsButton = document.querySelector(selector);

  function onOpen() {
    MicroModal.show('modal-footer', {
      // onShow: modal => console.info(`${modal.id} is shown`), // [1]
      // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
      disableScroll: true, // [6]
      disableFocus: true, // [7]
    });
  }

  studentsButton.addEventListener('click', () => onOpen(selector));
}

footerModalHandler('.githubs');

export default footerModalHandler;
