let L = 20;
let snake = [];
let n = 2;
let pause = true;
let t = 0;
let dir;
let gameover = false;
let ate = false;
let speed = 4;
let code = "";
let sound;

class Segment {
  constructor(i, x, y) {
    this.i = i;
    this.x = x ;
    this.y = y ;
  }
  update(x, y) {
    this.x = x;
    this.y = y;
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  show() {
    stroke(153, 221, 242);
    strokeWeight(2);
    if (this.i == 0) {
      fill('white');
    } else {
      fill('green');
    }
    square(this.x, this.y, L);
    // noStroke();
    // fill('white');
    // textAlign(CENTER, CENTER);
    // text(this.i, this.x + L / 2, this.y + L / 2);
  }
}

// Creates the food (red circle).
class Fruit {
  constructor() {
    this.x = round(random(0, (width - L) / L)) * L; // (width - L) / L => esto es la cantidad de grillas
    this.y = round(random(0, (height - L) / L)) * L;
    // if (x != )
  }
  show() {
    strokeWeight(1);
    stroke(51, 255, 255); 
    fill('red');
    circle(this.x + L / 2, this.y + L / 2, L * 0.8); // Centers the circle and sets the diameter of the circle to L
  }
}

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.style('display', 'block');
  background(153, 221, 242);
  for (let i = 0; i < n; i++) {
    snake.push(new Segment(i, 300 - L * i, 300));
    snake[i].show();
  }
  dir = createVector(1, 0);
  apple = new Fruit();
  apple.show();
  sound = loadSound("eatsound.mp3");
}

//Loop draw everytime
function draw() {
    if (!pause) {
    if (gameover) {
      textSize(30);
      background(153, 221, 242);
      text('GAME OVER', width / 3, height / 2);
    } else {
      background(153, 221, 242);
      if (ate) {
        apple = new Fruit();
        sound.play();
        ate = false;
      }
      apple.show();
      keyPressed();
      t = t + 1;
      if (t % speed == 0) {
        for (let i = n - 1; i > 0; i--) { // Follow head trail
          snake[i].update(snake[i - 1].x, snake[i - 1].y);
        }
        snake[0].move(L * dir.x, L * dir.y); // Change directions
      }
      for (let i = 0; i < n; i++) {
        snake[i].show();
      }
      transport();
      checkSeg();
      checkAte();
      // checkWall();
    }
  }
}

//It calls with draw everytime
function keyPressed() {

    switch (keyCode) {
      case LEFT_ARROW:
        if(code != RIGHT_ARROW) {
        dir = createVector(-1, 0);
        code = keyCode;
        }
        break;
      case RIGHT_ARROW:
        if(code != LEFT_ARROW){
        dir = createVector(1, 0);
        code = keyCode;
        }
        break;
      case UP_ARROW:
        if (code != DOWN_ARROW){
        dir = createVector(0, -1);
        code = keyCode;
        }
        break;
      case DOWN_ARROW:
        if (code != UP_ARROW){
        dir = createVector(0, 1);
        code = keyCode;
        }
        break;
      case ENTER:
    }

}

function checkSeg() {
  for (let i = 1; i < n; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      // Eat yourself - Game Over
      gameover = true;
    }
  }
}

function checkAte() {
  if (!ate && snake[0].x == apple.x && snake[0].y == apple.y) {
    snake.push(new Segment(n, snake[n-1].x, snake[n-1].y));
    // snake[n].show();
    n += 1;
    ate = true;
  }
}

function mousePressed() {
  if (pause) {
    pause = false;

  } else {
    pause = true;
  }
}

function transport(){
  if (snake[0].x < 0){
    snake[0].x = width - L;
  } else if (snake[0].y < 0){
    snake[0].y = height - L;
  } else if (snake[0].x >= width){
    snake[0].x = 0;
  } else if (snake[0].y >= height){
    snake[0].y = 0;
  }
}