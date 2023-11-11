let canvas;
let context;

window.onload = init();
function init() {
  console.log("init started");

  canvas = document.querySelector("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  ctx = canvas.getContext("2d");

  const keyDown = addEventListener('keydown', (evt) => {
    switch (evt.key) {
        case 'a':
            console.log('left');
            player.position.xPos -= player.velocity.xVel;
            break;
        case 'd':
            console.log('right');
            player.position.xPos += player.velocity.xVel;
            break;
        case ' ':
            console.log('fire');
            // fire
            break;
        default:
            break;
    }
  window.requestAnimationFrame(gameLoop);
}
class UserShip {
  constructor() {
    this.velocity = {
      xVel: 0,
      yVel: 0,
    };
    userShipIMG.onload = () => {
      // on image load set properties to...
      this.sprite = userShipIMG;
      this.width = userShipIMG.width * playerScale;
      this.height = userShipIMG.height * playerScale;
      this.position = {
        // can't call position directly so we need to save it as an object because it takes multiple values
        xPos: canvas.width / 2 - this.width / 2,
        yPos: canvas.height / 2 + this.height,
      };
    };
  }
  draw() {
    if (this.sprite) {
      // console.log(`load sprite`);
      ctx.fillStyle = "green";
      ctx.fillRect(this.position.xPos + 64, this.position.yPos + 44, 64, 109);
      ctx.drawImage(
        this.sprite,
        this.position.xPos,
        this.position.yPos,
        this.width,
        this.height
      );
    }
  }
}

let userShipIMG = new Image();
userShipIMG.src = "images/Sprites/Fighter_single_192x192.png";
const background = {
  draw() {
    (ctx.fillStyle = "black"), ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
};
const playerScale = 1;
let playerVelocity = 50;
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
const player = new UserShip(); // initialize the player

function gameLoop(timeStamp) {
  // console.log('game loop started')
  update(secondsPassed);
  draw();
  window.requestAnimationFrame(gameLoop);
}
function draw() {
  // console.log('draw started')
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  background.draw();
  player.draw();
}
function update(secondsPassed) {
  console.log(`update started`);
}
