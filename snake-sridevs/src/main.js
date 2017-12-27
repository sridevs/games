let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;
let loosingXcoords = [0,120];
let loosingYcoords = [0,60];

const hasCrashed = function (head) {
  let posX = head.getCoord()[0];
  let posY = head.getCoord()[1];
  return loosingXcoords.includes(posX) || loosingYcoords.includes(posY);
}

const eatsItself = function (head) {
  let snakeBody = snake.getBody();
  return snakeBody.some(function (bodyPart) {
    return head.isSameCoordAs(bodyPart);
  });
}

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
  if (hasCrashed(head)) {
    stopGame();
    playAgain();
  }
  if (eatsItself(head)) {
    stopGame();
    playAgain();
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

function stopGame() {
  clearInterval(animator);
}

function startAgain() {
 location.reload();
}

function playAgain() {
  let button = document.createElement("button");
  let buttonName = document.createTextNode("Play Again");
  button.appendChild(buttonName);
  document.body.appendChild(button);
  button.addEventListener ("click", startAgain);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
