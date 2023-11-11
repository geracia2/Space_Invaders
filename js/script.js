////////////////////////////////////////////////////////////////////////
// ON LOAD SETUP
////////////////////////

let canvas;
let context;

window.onload = init();
// as soon as canvas is generated run init function. 
// onload and a function also allows canvas to cache the right variables to 
// things like dynamic image resizes and sprite slices

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

////////////////////////////////////////////////////////////////////////
// CLASSES | OBJECTS
////////////////////////

class UserShip {
    /* Position, movement, dimensions, image, shooting, damage
    all will be dynamically created so we need to update them with parameters
    treat this like the brain, no form information, just placeholder*/
    constructor(){
        this.velocity = {
            xVel: 0,
            yVel: 0
        }
        // // you have to declare image source before using it as a class key
        // // new Image is an object that comes within JS's API, loads an image-like object via JS
        // // this can also be placed globally
        // const userShipIMG = new Image();
        // userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png';
        userShipIMG.onload = () => { // on image load set properties to...
            this.sprite = userShipIMG;
            this.width = userShipIMG.width * playerScale;
            this.height = userShipIMG.height * playerScale;
            this.position = { // can't call position directly so we need to save it as an object because it takes multiple values
                // xPos: 500,
                // yPos: 500
                xPos: canvas.width / 2 - this.width / 2,
                yPos: canvas.height / 2 + this.height
            }
        }
    }
    // draw a box to start giving form
    // draw is all the attributes you will see including loaded images
    draw(){
        // console.log(`load sprite`);
        if (this.sprite){ // truthy as it is not null. waiting on a load
            // console.log(`player class draw`);
            ctx.fillStyle = "green";
            ctx.fillRect(this.position.xPos + 64, this.position.yPos + 44, 64, 109)
            ctx.drawImage(this.sprite, this.position.xPos, this.position.yPos, this.width, this.height )
        }
    }
    update(){
        // console.log(`player class update`);
        if (this.sprite){ // truthy as it is not null
            // console.log(`player class update`)
            this.draw(); // generate object
            this.position.xPos += this.velocity.xVel;
        }
    }
}

////////////////////////////////////////////////////////////////////////
// LISTENERS
////////////////////////
// MOVEMENT
//need an event listener for keydown A and D, evt.key does this
const keyDown = addEventListener('keydown', (evt) => {
    // console.log(evt.key);
    // update player xPos: a = xPos -1 && d = xPos + 1
    switch (evt.key) {
        case 'a':
            // console.log('left');
            player.velocity.xVel = -playerGameVelocity;
            // movementLeft();
            break;
        case 'd':
            // console.log('right');
            player.velocity.xVel = playerGameVelocity;
            // movementRight()
            break;
        case ' ':
            // console.log('fire');
            // fire
            break;
        default:
            break;
    }
        /*
        if (evt.key === 'a') {
            player.position.xPos -= player.velocity.xVel;
        } else if (evt.key === 'd'){
            player.position.xPos += player.velocity.xVel;
        }
        */
})

////////////////////////////////////////////////////////////////////////
// IMAGES
////////////////////////

// you have to declare image source before using it as a class key
// new Image is an object that comes within JS's API, loads an image-like object via JS
// this can be placed statically in the class
let userShipIMG = new Image();
userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png';

const background = {

    draw(){
        ctx.fillStyle = 'black',
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////
// add all variables that will effect drawn objects first
const playerScale = 1; // check class if comm out. Update depending on needs
const playerGameVelocity = 5; // check class if comm out. Global movement speed, redeclare per object as needed



// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;

// add all drawn objects last, effected by above global variables
const player = new UserShip() // initialize the player
console.log(player)

////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////

function gameLoop(timeStamp){ // Set up flow of functions 
    // console.log('game loop started')

    /*
    // !! AVOID having a game that moves as fast are screen refresh 
    // !! we can cap movement to time rather than refresh rate

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
    */

    ////////////////////////////////////////////////////////////////////////
    // CALLING GAME LOOP
    ///////////////////////////
    // init > gameloop [ calcs, update > draw > gameloop ]
    ///////////////////////////
    update(secondsPassed); // Make changes to the properties
    draw(); // Perform the drawing operations
    window.requestAnimationFrame(gameLoop); // The loop function has reached it's end. Keep requesting new frames
}

function draw(){ // Generate objects
    // console.log('draw started')

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    /* example of how to adjust movement by time not refresh
    // let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    // // objects that have calculations in them are recalculated every frame now
    // context.fillStyle = randomColor;
    // context.fillRect(rectX, rectY, 200, 175);
    */

    // organize layers by bottom on top of list
    background.draw();
    player.draw();

}

function update(secondsPassed) { // Animate 
    // console.log(`update started`);
    /* example of how to adjust movement by time not refresh
    // Use time to calculate new position
    // rectX += (velocity * secondsPassed);
    // rectY += (velocity * secondsPassed);
    */
    player.update();
}