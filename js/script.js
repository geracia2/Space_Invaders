////////////////////////
// GAME LOOP LOGIC
////////////////////////

let canvas;
let context;

window.onload = init(); // as soon as canvas is generated run init function.

function init(){
    /* this function forces all resources to load in before canvas is rendered
    */
    console.log('init started')

    canvas = document.querySelector('canvas'); // establish canvas
    canvas.width = 1280; // Dynamically would involve a function and window.height
    canvas.height = 720; // This could also be do with canvas.width = window.innerWidth;
    ctx = canvas.getContext('2d'); // establish Context language '2d'
    
    // Don't currently need a resize feature if its always this dim. but here it is.
    // const canvasMaxWidth = 1280;
    // const canvasMaxHeight = 720;
    // canvas.addEventListener("resize", function() {
    // if (canvas.width > canvasMaxWidth) {
    //     canvas.width = canvasMaxWidth;
    // } else if (canvas.height < canvasMaxHeight) {
    //     canvas.height = canvasMaxHeight;
    // }
    // });
    window.requestAnimationFrame(gameLoop); // START the first frame request
}   

////////////////////////
// CLASSES | OBJECTS
////////////////////////

class UserShip {
    /* Position, movement, dimensions, image, shooting, damage
    all will be dynamically created so we need to update them with parameters
    treat this like the brain, no form information, just placeholder*/
    constructor(){
        // can't call position directly so we need to save it as an object because it takes multiple values
        this.position = {
            xPos: 500,
            yPos: 500
        }
        this.velocity = {
            xVel: 0,
            yVel: 0
        }
        
        // new Image is an object that comes within JS's API, loads an image-like object via JS
        let image = new Image();
        image.src = 'images/Sprites/Fighter_single_192x192.png';

        this.width = 192;
        this.height = 192;
        this.sprite = image;

    }
    // draw a box to start giving form
    // draw is all the attributes you will see including loaded images
    draw(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.xPos + 64, this.position.yPos + 44, 64, 109)
        ctx.drawImage(this.sprite, this.position.xPos, this.position.yPos)
    }
}


let background = {

}
////////////////////////
// IMAGES
////////////////////////

// let userShipIMG = new Image();
// userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png';


////////////////////////
// GLOBAL VARIABLES
////////////////////////
const player = new UserShip()
console.log(player)

// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let velocity = 50; // global movement speed, redeclare per object as needed


////////////////////////
// FUNCTIONS
////////////////////////

function gameLoop(timeStamp){
    // console.log('game loop started')
    /*
    // starting loop with access to timeStamp parameter
    // Calculate the number of seconds passed since the last frame
    secondsPassed = Math.min(((timeStamp - oldTimeStamp) / 1000), 0.1); // Move forward in time with a maximum amount, change this number at the end
    oldTimeStamp = timeStamp;

    // the following is only for getting fps to display
    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    // Draw number to the screen
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, 200, 100);
    // ctx.font = '25px Arial';
    // ctx.fillStyle = 'black';
    // ctx.fillText("FPS: " + fps, 10, 30);
    
    update(secondsPassed); // Make changes to the properties
    */
    draw(); // Perform the drawing operation

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw(){ // generate your first objects
    console.log('draw started')

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    // let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    // // objects that have calculations in them are recalculated every frame now
    // context.fillStyle = randomColor;
    // context.fillRect(rectX, rectY, 200, 175);
    player.draw()
    // console.log('player drawn')

}

function update(secondsPassed) { // update or animate 
    // console.log(`update started`);

    // Use time to calculate new position
    // rectX += (velocity * secondsPassed);
    // rectY += (velocity * secondsPassed);
}