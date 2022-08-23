import {
  Close, Moon, NoiseAware, Polymer, WhatShot,
} from '../classes/classes.js';

export default class Grid {
  constructor(line, col) {
    this.line = line;
    this.col = col;
    // this.grid = Array(this.line).fill(Array(this.col).fill(0))
    this.grid = [
      [new Moon(), new Polymer(), new NoiseAware()],
      [new Close(), new WhatShot(), new Moon()],
      [new WhatShot(), new Close(), new Moon()]];
  }

  colShiftDown(colIdx) {
    // should check for out of bounds
    let temp;
    let previousVal = this.grid[this.grid.length - 1][colIdx];
    for (let i = 0; i < this.grid.length; i++) {
      temp = this.grid[i][colIdx];
      this.grid[i][colIdx] = previousVal;
      previousVal = temp;
    }
  }

  colShiftUp(colIdx) {
    // should check for out of bounds
    let temp;
    let previousVal = this.grid[0][colIdx];
    for (let i = this.grid.length - 1; i >= 0; i--) {
      temp = this.grid[i][colIdx];
      this.grid[i][colIdx] = previousVal;
      previousVal = temp;
    }
  }

  lineShiftRight(lineIdx) {
    // should check for out of bounds
    let temp;
    let previousVal = this.grid[lineIdx][this.grid[0].length - 1];
    for (let i = 0; i < this.grid[0].length; i++) {
      temp = this.grid[lineIdx][i];
      this.grid[lineIdx][i] = previousVal;
      previousVal = temp;
    }
  }

  lineShiftLeft(lineIdx) {
    // should check for out of bounds
    let temp;
    let previousVal = this.grid[lineIdx][0];
    for (let i = this.grid[0].length - 1; i >= 0; i--) {
      temp = this.grid[lineIdx][i];
      this.grid[lineIdx][i] = previousVal;
      previousVal = temp;
    }
  }

  printGrid() {
    console.log(this.grid);
  }
}
