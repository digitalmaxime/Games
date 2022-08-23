/* eslint-disable import/extensions */
import gridMain from './grid/grid-main.js';
import Player from './player/player.js';

const player = new Player('player1');

const keydownHandler = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      player.moveLeft();
      // Left pressed
      break;

    case 'ArrowRight':
      // Right pressed
      player.moveRight();
      break;

    case 'ArrowUp':
      // Up pressed
      player.moveUp();
      break;

    case 'ArrowDown':
      // Down pressed
      player.moveDown();
      break;

    default:
      break;
  }
};

document.body.addEventListener('keydown', keydownHandler);

gridMain();
