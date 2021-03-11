import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success } from '@pnotify/core';

function successLoginHandler() {
  success({
    text: 'Logged-in successfully',
    delay: 4000,
    mouseReset: true,
    closer: true,
    remove: true,
    destroy: true,
  });
}

function successLogoutHandler() {
  success({
    text: 'Logged-out successfully',
    delay: 4000,
    mouseReset: true,
    closer: true,
    remove: true,
    destroy: true,
  });
}

function successAddQueueHandler() {
  success({
    text: 'Film was added to queue successfully',
    delay: 2000,
    mouseReset: true,
    closer: false,
    remove: true,
    destroy: true,
  });
}

function successAddWatchedHandler() {
  success({
    text: 'Film was added to watched successfully',
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
