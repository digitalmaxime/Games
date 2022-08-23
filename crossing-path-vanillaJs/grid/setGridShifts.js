export default function setGridShifts(myGrid, setGridContent) {
  // right shifts
  const arrowRight1 = document.getElementById('arrowRight1');
  arrowRight1.addEventListener('click', () => {
    const arr = [];
    for (let i = 1; i < 4; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateRightMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftRight(0);
      setGridContent();
    }, 1000);
  });

  const arrowRight2 = document.getElementById('arrowRight2');
  arrowRight2.addEventListener('click', () => {
    const arr = [];
    for (let i = 4; i < 8; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateRightMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftRight(1);
      setGridContent();
    }, 1000);
  });

  const arrowRight3 = document.getElementById('arrowRight3');
  arrowRight3.addEventListener('click', () => {
    const arr = [];
    for (let i = 7; i < 10; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateRightMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftRight(2);
      setGridContent();
    }, 1000);
  });

  // left shifts
  const arrowLeft1 = document.getElementById('arrowLeft1');
  arrowLeft1.addEventListener('click', () => {
    const arr = [];
    for (let i = 1; i < 4; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateLeftMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftLeft(0);
      setGridContent();
    }, 1000);
  });

  const arrowLeft2 = document.getElementById('arrowLeft2');
  arrowLeft2.addEventListener('click', () => {
    const arr = [];
    for (let i = 4; i < 8; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateLeftMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftLeft(1);
      setGridContent();
    }, 1000);
  });

  const arrowLeft3 = document.getElementById('arrowLeft3');
  arrowLeft3.addEventListener('click', () => {
    const arr = [];
    for (let i = 7; i < 10; i++) {
      arr.push(document.getElementById(`grid-item${i}`));
    }

    animateLeftMotion(arr);

    setTimeout(() => {
      myGrid.lineShiftLeft(2);
      setGridContent();
    }, 1000);
  });

  // up shifts
  const arrowUp1 = document.getElementById('arrowUp1');
  arrowUp1.addEventListener('click', () => {
    myGrid.colShiftUp(0);
    setGridContent();
  });

  const arrowUp2 = document.getElementById('arrowUp2');
  arrowUp2.addEventListener('click', () => {
    myGrid.colShiftUp(1);
    setGridContent();
  });

  const arrowUp3 = document.getElementById('arrowUp3');
  arrowUp3.addEventListener('click', () => {
    myGrid.colShiftUp(2);
    setGridContent();
  });

  // down shifts
  const arrowDown1 = document.getElementById('arrowDown1');
  arrowDown1.addEventListener('click', () => {
    myGrid.colShiftDown(0);
    setGridContent();
  });

  const arrowDown2 = document.getElementById('arrowDown2');
  arrowDown2.addEventListener('click', () => {
    myGrid.colShiftDown(1);
    setGridContent();
  });

  const arrowDown3 = document.getElementById('arrowDown3');
  arrowDown3.addEventListener('click', () => {
    myGrid.colShiftDown(2);
    setGridContent();
  });
}

function animateRightMotion(arr) {
  arr[0].classList.add('move-right');
  arr[1].classList.add('move-right');
  arr[2].classList.add('move-back-to-left');

  setTimeout(() => {
    arr[0].classList.remove('move-right');
    arr[1].classList.remove('move-right');
    arr[2].classList.remove('move-back-to-left');
  }, 1000);
}

function animateLeftMotion(arr) {
  arr[0].classList.add('move-back-to-right');
  arr[1].classList.add('move-left');
  arr[2].classList.add('move-left');

  setTimeout(() => {
    arr[0].classList.remove('move-back-to-right');
    arr[1].classList.remove('move-left');
    arr[2].classList.remove('move-left');
  }, 1000);
}
