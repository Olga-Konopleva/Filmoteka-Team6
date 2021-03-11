import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info } from '@pnotify/core';

function emptyFilmListHandler() {
  info({
    text: 'No matches found. Please, try another search query!',
    delay: 4000,
    mouseReset: true,
    closer: true,
  });
}

export { emptyFilmListHandler };
