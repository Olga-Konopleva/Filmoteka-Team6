import PNotify from 'pnotify/dist/es/PNotify';
// import PNotifyButton from 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/PNotifyBrightTheme.css';

const delay = 1000;
const sybscribeDelay = 3000;

export default {
  notFoundMessage() {
    PNotify.alert({
      title: 'Очень жаль!',
      text: 'Но такого фильма нет у нас в базе =(',
      delay: delay,
    });
  },
  errorMessage() {
    PNotify.error({
      title: 'Упс!',
      text: 'Перезагрузите страницу и попробуйте снова...',
      delay: delay,
    });
  },
  infoLiberyMessage() {
    PNotify.info({
      title: 'Фильм добавлен',
      text: 'Мы обновили твою библиотеку =)',
      delay: delay,
    });
  },
  removeLiberyMessage() {
    PNotify.info({
      title: 'Фильм удален',
      text: 'Мы обновили твою библиотеку =)',
      delay: delay,
    });
  },
  succesMessage() {
    PNotify.success({
      title: 'Готово',
      text: 'Мы нашли то что Вы искали!)',
      delay: delay,
    });
  },
  duplicateMessage() {
    PNotify.error({
      title: 'Упс!',
      text: 'такой фильм уже есть в списках',
      delay: delay,
    });
  },
  timeoutSubsticbe() {
    setTimeout(() => {
      PNotify.notice({
        title: 'Привет, авторизируйся у нас!)',
        text: 'И твои любимые фильмы будут с тобой везде!',
        delay: sybscribeDelay,
      });
    }, 3000);
  },
};

/*import { clarifyMessage, errorMessage } from './js/notification';*/
