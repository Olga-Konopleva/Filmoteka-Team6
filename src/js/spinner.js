import { Spinner } from 'spin.js';
import refs from './refs';

const opts = {
  lines: 13, // The number of lines to draw
  length: 28, // The length of each line
  width: 17, // The line thickness
  radius: 34, // The radius of the inner circle
  scale: 0.9, // Scales overall size of the spinner
  corners: 0.7, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  // top: '80%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

new Spinner(opts).spin(refs.spinner);

const opts_2 = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 34, // The radius of the inner circle
  scale: 0.5, // Scales overall size of the spinner
  corners: 0.7, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: 'orange', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '30%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

new Spinner(opts_2).spin(refs.spinner);

const opts_3 = {
  lines: 11, // The number of lines to draw
  length: 28, // The length of each line
  width: 12, // The line thickness
  radius: 44, // The radius of the inner circle
  scale: 0.3, // Scales overall size of the spinner
  corners: 0.2, // Corner roundness (0..1)
  speed: 0.9, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: 'yellow', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '70%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

new Spinner(opts_3).spin(refs.spinner);

// ? Comment questions
// ! Comment warning
// *Comment info
