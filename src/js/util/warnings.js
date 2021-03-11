import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

function warningSignInHandler() {
  alert({
    text: 'You are already logged-in!',
    delay: 3000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function warningQueueHandler() {
  alert({
    text: 'Film already in queue ...',
    delay: 3000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function warningWatchedHandler() {
  alert({
    text: 'Film already in watched ...',
    delay: 3000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

export { warningSignInHandler, warningQueueHandler, warningWatchedHandler };
