$(document).ready(() => {
    boardSize = 500;
    blockSize = $("#board").width() / 20;
    canvasContext = $("#board")[0].getContext("2d");

    $("#board").attr("width", "500px");
    $("#board").attr("height", "500px");
    paintHoleBoard();

    setInterval(() => {
        paintHoleBoard();

        appleX = randomIntFromInterval(0, 19);
        appleY = randomIntFromInterval(0, 19);

        createApple(appleX, appleY);
    }, 1000);
})

function paintHoleBoard(){
    canvasContext.fillStyle = "gray";
    canvasContext.fillRect(0, 0, $("#board").width(), $("#board").height());
}

function createApple(posX, posY){
    realX = posX * blockSize;
    realY = posY * blockSize;

    canvasContext.fillStyle = "#ff0000";
    canvasContext.fillRect(realX, realY, blockSize, blockSize);
}

function randomIntFromInterval(min, max){ // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}