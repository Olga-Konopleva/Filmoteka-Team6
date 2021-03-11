import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success } from '@pnotify/core';

function successLoginHandler() {
  success({
    text: 'Logged-in successfully',
    delay: 1000,
    mouseReset: true,
    closer: true,
    remove: true,
    destroy: true,
  });
}

function successLogoutHandler() {
  success({
    text: 'Logged-out successfully',
    delay: 1000,
    mouseReset: true,
    closer: true,
    remove: true,
    destroy: true,
  });
}

function successAddQueueHandler() {
  success({
    text: 'You added this film to Queue!',
    delay: 2000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function successAddWatchedHandler() {
  success({
    text: 'You added this film to Watch!',
    delay: 2000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function successRemoveQueueHandler() {
  success({
    text: 'Film was successfully from Queue',
    delay: 2000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function successRemoveWatchedHandler() {
  success({
    text: 'Film was successfully removed from Watched',
    delay: 2000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

export {
  successLoginHandler,
  successLogoutHandler,
  successAddQueueHandler,
  successAddWatchedHandler,
  successRemoveQueueHandler,
  successRemoveWatchedHandler,
};
