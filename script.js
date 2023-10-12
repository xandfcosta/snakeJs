class Board {
  constructor(size, numberOfBlocks) {
    $("#board").attr("width", size);
    $("#board").attr("height", size);
    this.numberOfBlocks = numberOfBlocks;
    this.blockSize = size / numberOfBlocks;
    this.canvasContext = $("#board")[0].getContext("2d");
    this.paintHoleBoard();
  }

  paintHoleBoard() {
    for (var i = 0; i < this.numberOfBlocks; i++) {
      for (var j = 0; j < this.numberOfBlocks; j++) {
        this.canvasContext.fillStyle = (i + j) % 2 ? "#222222" : "#444444";
        this.realX = i * this.blockSize;
        this.realY = j * this.blockSize;

        this.canvasContext.fillRect(
          this.realX,
          this.realY,
          this.blockSize,
          this.blockSize
        );
      }
    }
  }

  paintApple(apple) {
    this.realX = apple.x * this.blockSize;
    this.realY = apple.y * this.blockSize;

    this.canvasContext.fillStyle = "#ff0000";
    this.canvasContext.fillRect(
      this.realX,
      this.realY,
      this.blockSize,
      this.blockSize
    );
  }
}

class Apple {
  constructor() {
    this.x = this.randomIntFrom0To(20);
    this.y = this.randomIntFrom0To(20);
  }

  randomIntFrom0To(max) {
    return Math.floor(Math.random() * max);
  }
}

class Game {
  constructor() {
    this.isRunning = true;
    this.score = 0;
    this.apple = new Apple();
    this.board = new Board(500, 20);
    this.board.paintHoleBoard();
    this.board.paintApple(this.apple);
    this.interval = setInterval(() => {
      this.gameLoop();
    }, 250);
  }

  gameLoop() {
    if (!this.isRunning) {
      return;
    }

    this.board.paintHoleBoard();
    this.board.paintApple(this.apple);
  }
}

$(document).ready(() => {
  game = new Game();
});
