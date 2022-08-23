export default class Player {
  constructor(id) {
    this.content = '<span class="material-icons player"> whatshot </span>';
    this.playerHtmlRef = document.getElementById(id);
    this.playerHtmlRef.innerHTML = this.content;
  }

  moveRight() {
    this.playerHtmlRef.classList.add('move-right');
    setTimeout(() => {
      this.playerHtmlRef.classList.remove('move-right');
    }, 1000);
  }

  moveLeft() {
    this.playerHtmlRef.classList.add('move-left');
    setTimeout(() => {
      this.playerHtmlRef.classList.remove('move-left');
    }, 1000);
  }

  moveUp() {
    this.playerHtmlRef.classList.add('move-up');
    setTimeout(() => {
      this.playerHtmlRef.classList.remove('move-up');
    }, 1000);
  }

  moveDown() {
    this.playerHtmlRef.classList.add('move-down');
    setTimeout(() => {
      this.playerHtmlRef.classList.remove('move-down');
    }, 1000);
  }
}
