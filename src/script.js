import Apple from "./Apple";

$(document).ready(() => {
  boardSize = 500;
  blockSize = $("#board").width() / 20;
  canvasContext = $("#board")[0].getContext("2d");

  $("#board").attr("width", "500px");
  $("#board").attr("height", "500px");
  paintHoleBoard();

  setInterval(() => {
    apple = new Apple();

    paintHoleBoard();
    paintApple(apple);
  }, 1000);
});

function paintHoleBoard() {
  canvasContext.fillStyle = "gray";
  canvasContext.fillRect(0, 0, $("#board").width(), $("#board").height());
}

function paintApple(apple) {
  realX = apple.x * blockSize;
  realY = apple.y * blockSize;

  canvasContext.fillStyle = "#ff0000";
  canvasContext.fillRect(realX, realY, blockSize, blockSize);
}
