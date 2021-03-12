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

function warningRemoveQueueHandler() {
  alert({
    text: 'You removed this film from Queue!',
    delay: 3000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function warningRemoveWatchedHandler() {
  alert({
    text: 'You removed this film from Watch!!',
    delay: 3000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

export { warningSignInHandler, warningRemoveQueueHandler, warningRemoveWatchedHandler };
