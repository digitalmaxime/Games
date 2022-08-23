/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import Grid from './grid.js';
import setGridShifts from './setGridShifts.js';

export default function gridMain() {
  const myGrid = new Grid(3, 3);
  const myMap = new Map();

  const gridItem1 = document.getElementById('grid-item1');
  const gridItem2 = document.getElementById('grid-item2');
  const gridItem3 = document.getElementById('grid-item3');
  const gridItem4 = document.getElementById('grid-item4');
  const gridItem5 = document.getElementById('grid-item5');
  const gridItem6 = document.getElementById('grid-item6');
  const gridItem7 = document.getElementById('grid-item7');
  const gridItem8 = document.getElementById('grid-item8');
  const gridItem9 = document.getElementById('grid-item9');

  const arr = [
    gridItem1, gridItem2, gridItem3,
    gridItem4, gridItem5, gridItem6,
    gridItem7, gridItem8, gridItem9,
  ];

  function setGridContent() {
    myMap.set(gridItem1, myGrid.grid[0][0]);
    myMap.set(gridItem2, myGrid.grid[0][1]);
    myMap.set(gridItem3, myGrid.grid[0][2]);
    myMap.set(gridItem4, myGrid.grid[1][0]);
    myMap.set(gridItem5, myGrid.grid[1][1]);
    myMap.set(gridItem6, myGrid.grid[1][2]);
    myMap.set(gridItem7, myGrid.grid[2][0]);
    myMap.set(gridItem8, myGrid.grid[2][1]);
    myMap.set(gridItem9, myGrid.grid[2][2]);

    // assign each grid position -> content
    for (const [key, val] of myMap) {
      key.innerHTML = val.content;
    }
  }

  setGridContent();
  setGridShifts(myGrid, setGridContent);
}
