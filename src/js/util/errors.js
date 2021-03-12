import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, info } from '@pnotify/core';

function error404Handler() {
  error({
    text:
      'Some issues with the request answer! (Status 404) Please, try again later!',
    delay: 8000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function error500Handler() {
  error({
    text:
      'Some issues with the server! (Status 500) Please, try to reload the page!',
    delay: 8000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function emptyLibrary() {
  info({
    text: 'No movies have been added yet.',
    delay: 1500,
    mouseReset: true,
    closer: true,
    remove: true,
    destroy: true,
  });
}

export { error404Handler, error500Handler, emptyLibrary };
