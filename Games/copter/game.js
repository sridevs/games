function GameSpace(width,height) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = width;
  this.canvas.height = height;
  this.frameNo = 0;
  this.context = this.canvas.getContext("2d");
}

GameSpace.prototype.start = function () {
  document.body.insertBefore(this.canvas,document.body.childNodes[0]);
  this.interval = setInterval(updateGameSpace,20);
};

GameSpace.prototype.clear = function () {
  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
};

GameSpace.prototype.stop = function () {
  clearInterval(this.interval);
};

let myGameSpace = new GameSpace(1280,720);
let copter = new Component(350, 172, "images/copter.gif", 10, 120,"image");

function Component(width,height,color,posX,posY,type) {
  this.type = type;
  if (this.type === "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.posX = posX;
  this.posY = posY;
  this.speedX = 0;
  this.gravity = 0;
};

Component.prototype.update = function () {
  context = myGameSpace.context;
  if (type === "image") {
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
  }else {
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
};

Component.prototype.newPos = function () {
  this.posX += this.speedX;
  this.posY += this.gravity;
};

// let myObstacles = [];
// let myScore = new Component("30px", "Consolas", "black", 280, 40, "text");

function startGame() {
  myGameSpace.start();
};

function updateGameSpace() {
  myGameSpace.clear();
  copter.newPos();
  copter.update();
};

function accelerate(n) {
  copter.gravity = n;
}
