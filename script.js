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
    for (let i = 0; i < this.numberOfBlocks; i++) {
      for (let j = 0; j < this.numberOfBlocks; j++) {
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

  paintWorm(worm) {
    this.canvasContext.fillStyle = "#ffffff";
    worm.body.forEach(({ x, y }) => {
      this.realX = x * this.blockSize;
      this.realY = y * this.blockSize;

      this.canvasContext.fillRect(
        this.realX,
        this.realY,
        this.blockSize,
        this.blockSize
      );
    });
  }
}

class Apple {
  constructor() {
    this.x = this.randomIntFrom0To(20);
    this.y = this.randomIntFrom0To(20);
  }

  createNew(worm) {
    let isInsideWorm = true;

    while (isInsideWorm) {
      let newX = this.randomIntFrom0To(20);
      let newY = this.randomIntFrom0To(20);
      let partsOfTheBody = worm.body.filter((part) => {
        return (part.x === newX) & (part.y === newY);
      });

      if (partsOfTheBody.length === 0) {
        isInsideWorm = false;
        this.x = newX;
        this.y = newY;
      }
    }
  }

  randomIntFrom0To(max) {
    return Math.floor(Math.random() * max);
  }
}

class Worm {
  constructor() {
    this.velocityX = 1;
    this.velocityY = 0;
    this.body = [
      {
        x: 0,
        y: 0,
      },
    ];
    this.direction = {
      velocityX: 1,
      velocityY: 0,
    };
  }

  move() {
    this.velocityX = this.direction.velocityX;
    this.velocityY = this.direction.velocityY;

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = { ...this.body[i - 1] };
    }

    this.body[0].x += this.velocityX;
    this.body[0].y += this.velocityY;
  }

  changeDirection(e) {
    const left = {
      velocityX: -1,
      velocityY: 0,
    };
    const up = {
      velocityX: 0,
      velocityY: -1,
    };
    const right = {
      velocityX: 1,
      velocityY: 0,
    };
    const down = {
      velocityX: 0,
      velocityY: 1,
    };
    switch (e.keyCOde || e.which) {
      case 37: // Left
        const isRight =
          this.velocityX === right.velocityX &&
          this.velocityY === right.velocityY;

        if (!isRight) {
          this.direction.velocityX = left.velocityX;
          this.direction.velocityY = left.velocityY;
        }
        break;

      case 38: // Up
        const isDown =
          this.velocityX === down.velocityX &&
          this.velocityY === down.velocityY;

        if (!isDown) {
          this.direction.velocityX = up.velocityX;
          this.direction.velocityY = up.velocityY;
        }
        break;

      case 39: // Right
        const isLeft =
          this.velocityX === left.velocityX &&
          this.velocityY === left.velocityY;

        if (!isLeft) {
          this.direction.velocityX = right.velocityX;
          this.direction.velocityY = right.velocityY;
        }
        break;

      case 40: // Down
        const isUp =
          this.velocityX === up.velocityX && this.velocityY === up.velocityY;

        if (!isUp) {
          this.direction.velocityX = down.velocityX;
          this.direction.velocityY = down.velocityY;
        }
        break;

      default:
        break;
    }
  }
}

class Game {
  constructor() {
    this.isRunning = true;
    this.score = 0;
    this.speed = 250;
    this.speedModifier = 0;
    this.apple = new Apple();
    this.board = new Board(500, 20);
    this.worm = new Worm();
    this.board.paintHoleBoard();
    this.board.paintApple(this.apple);
    $(document).on("keydown", (e) => {
      this.worm.changeDirection(e);
    });
    this.loop();
  }

  wormAteApple() {
    return (
      this.worm.body[0].x === this.apple.x &&
      this.worm.body[0].y === this.apple.y
    );
  }

  wormWillBeOutOfBounds() {
    return (
      this.worm.body[0].x > this.board.numberOfBlocks - 1 ||
      this.worm.body[0].y > this.board.numberOfBlocks - 1 ||
      this.worm.body[0].x < 0 ||
      this.worm.body[0].y < 0
    );
  }

  wormWhillHitItself() {
    for (let i = 1; i < this.worm.body.length; i++) {
      if ( this.worm.body[i].x === this.worm.body[0].x && this.worm.body[i].y === this.worm.body[0].y ) {
        return true;
      }
    }

    return false;
  }

  getGameSpeed() {
    if (!this.score) {
      return this.speed;
    }
    if (this.speed < 60) {
      return this.speed;
    }
    const isScoreDivisiblePer5 = this.score % 5 === 0;
    const needSpeedIncrease = this.score / 5 > this.speedModifier;
    if (isScoreDivisiblePer5 && needSpeedIncrease) {
      this.speed -= this.speed * 0.05;
      this.speedModifier++;
    }

    return this.speed;
  }

  loop() {
    if (!this.isRunning) {
      return;
    }

    this.worm.move();
    
    if (this.wormWillBeOutOfBounds() || this.wormWhillHitItself()) {
      this.end();
      return;
    }

    if (this.wormAteApple()) {
      this.worm.body.push({ x: this.apple.x, y: this.apple.y });
      this.apple.createNew(this.worm);
      this.score++;
      $("#score").text(this.score);
    }

    this.board.paintHoleBoard();
    this.board.paintApple(this.apple);
    this.board.paintWorm(this.worm);

    let newSpeed = this.getGameSpeed();

    setTimeout(() => {
      this.loop();
    }, newSpeed);
  }

  end() {
    this.isRunning = false;
    // clearInterval(this.interval);
    $("#game-over-message").css({
      zIndex: 0,
    });
    $("#game-over-message").animate(
      {
        top: "50%",
        opacity: 1,
      },
      500
    );
  }

  reset() {
    $("#game-over-message").css({
      zIndex: 0,
      top: "70%",
      opacity: 0,
    });
    $("#score").text(0);
    this.isRunning = true;
    this.score = 0;
    this.worm = new Worm();
    this.apple = new Apple();
    this.loop();
  }
}

$(document).ready(() => {
  $("#reset-btn").on("click", () => {
    game.reset();
  });
  game = new Game();
});
