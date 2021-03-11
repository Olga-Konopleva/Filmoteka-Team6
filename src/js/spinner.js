import { Spinner } from 'spin.js';
import refs from './refs';

const opts = {
  lines: 13, // The number of lines to draw
  length: 28, // The length of each line
  width: 17, // The line thickness
  radius: 34, // The radius of the inner circle
  scale: 0.45, // Scales overall size of the spinner
  corners: 0.7, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 1, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000000', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '0', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const opts2 = { ...opts, color: '#ffffff' };

new Spinner(opts).spin(refs.spinner);
new Spinner(opts2).spin(refs.spinnerInversion);

