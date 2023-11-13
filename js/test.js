////////////////////////////////////////////////////////////////////////
// ON LOAD SETUP
////////////////////////

let canvas;
let context;

// onload is the same as setting an event listener to 'load' fallowed by what would be in a code block
// window.addEventListener('load', (evt) => { init() })
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
    
    /*
    // Don't currently need a resize feature if its always this dim. but here it is.
    const canvasMaxWidth = 1280;
    const canvasMaxHeight = 720;
    canvas.addEventListener("resize", function() {
    if (canvas.width > canvasMaxWidth) {
        canvas.width = canvasMaxWidth;
    } else if (canvas.height < canvasMaxHeight) {
        canvas.height = canvasMaxHeight;
    }
    });
    */

    
    
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
        // // you have to declare image source before using it as a class key
        // // new Image is an object that comes within JS's API, loads an image-like object via JS
        // // this can also be placed globally
        // const userShipIMG = new Image();
        // userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png';

        userShipIMG.onload = ()=> { // on image load set properties to...
            this.xVel = 0;
            this.yVel = 0;
            this.sprite = userShipIMG;
            this.width = userVariables.shipTileWidth * playerScale;
            this.height = userVariables.shipTileHeight * playerScale;
            this.xPos = (canvas.width/2) - (this.width/2); // can't call position directly so we need to save it as an object because it takes multiple values
            this.yPos = (canvas.height / 2) + (this.height);

        }
    }
    draw(){ // draw is all the attributes you will see including loaded images
        // console.log(`load sprite`);
        if (this.sprite){ // truthy as it is not null. waiting on a load
            // console.log(`player class draw`);
            // ctx.fillStyle = "blue";
            // ctx.fillRect(this.xPos, this.yPos, 192, 192)
            // ctx.fillStyle = "green";
            // ctx.fillRect(this.xPos + 64, this.yPos + 44, 64, 109)
            // ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height )
            ctx.drawImage(this.sprite, 0, 0, 192, 192, this.xPos, this.yPos, this.width, this.height) // frame 3,1
            // // context.drawImage(img, startCropX, startCropY, endXCropAfter, endYCropAfter, x, y, width,height)
        }
    }
    update(){
        // console.log(`player class update`);
        if (this.sprite){ // truthy as it is not null
            // console.log(`player class update`)
            this.draw(); // generate object
            this.xPos += this.xVel;
            this.xMiddle = (this.xPos + (this.width / 2));
            this.yMiddle = (this.yPos + (this.height / 2));
            // console.log (this.middle)
        }
    }
    borderCheck() {
        // if (keys.a.pressed && player.xPos >= 0  - (player.width * .25))
        // if (keys.d.pressed && player.xPos <= canvas.width - (player.width * .75))
        if ((keys.a.pressed && this.xPos >= 0  - (this.width * .25)) || (keys.d.pressed && this.xPos <= canvas.width - (this.width * .75))) {
            userVariables.safeArea = true;
        } else {
            userVariables.safeArea = false;
        }
    }  
}
class Laser {
    constructor(xPos, yPos, yVel) {
        // laserIMG.onload = ()=> {
            this.xVel = 0;
            this.yVel = yVel;
            this.xPos = xPos;
            this.yPos = yPos;
            this.width = 8;
            this.height = 30;
            this.sprite = laserIMG;
        // }
    }
    draw(){
        // if (this.sprite){
            ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height)
        // }
    }
    update(){
        // if (this.sprite){
            draw();
            this.xPos += this.xVel;
            this.yPos += this.yVel;
        // }
    }
}


////////////////////////////////////////////////////////////////////////
// LISTENERS
////////////////////////

// MOVEMENT
//need an event listener for keydown A and D, evt.key does this
const keys = {
    a: {pressed: false},
    d: {pressed: false},
    space: {pressed: false}
}
const keyDown = addEventListener('keydown', (evt) => {
    // console.log(evt.key);

    // update player xPos: a = xPos -1 && d = xPos + 1
    switch (evt.key) {
        case 'a':
            // console.log('left');
            keys.a.pressed = true;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = true;
            break;
        case ' ':
            // console.log('fire');
            keys.space.pressed = true;
            // laserArray.push(new Laser(player.xMiddle - (userVariables.projectileWidth * .5), player.yMiddle - (userVariables.projectileHeight), -6))
            // console.log(laserArray);
            break;
        default:
            // keys.a.pressed = false; // doesnt do anything?
            // keys.d.pressed = false;
            // keys.space.pressed = false;
            break;
    }
});
const keyUp = addEventListener('keyup', (evt) => { // copy keyDown listener to check for letting off.
    switch (evt.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
        default:
            break;
    }
});

////////////////////////////////////////////////////////////////////////
// IMAGES
////////////////////////
// you have to declare image source before using it as a class key

// new Image is an object that comes within JS's API, loads an image-like object via JS
// this can be placed statically in the class
let userShipIMG = new Image();
// userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png';
userShipIMG.src = 'images/Sprites/Fighter_Spritelist_update_1728x1536.png';

let laserIMG = new Image();
laserIMG.src = 'images/Sprites/Laser_Spritelist_8x30.png';

const player = new UserShip() // initialize the player after loading its image

let laserArray = []

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
const playerGameVelocity = 4; // check class if comm out. Global movement speed, redeclare per object as needed. 4 is a good number

const userVariables = {
    shipTileWidth : 192,
    shipTileHeight : 192,
    projectileWidth : 8,
    projectileHeight : 30,
    safeArea : true,
    // Define the number of columns and rows in the sprite
    numColumns : 9,
    numRows : 8,
    // Define the size of a frame
    frameWidth : this.shipTileWidth / this.numColumns,
    frameHeight : this.shipTileHeight / this.numRows,
    // The sprite image frame starts from 0
    currentFrame : 0
}
// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;

////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////

function gameLoop(timeStamp){ // Set up flow of functions 
    // console.log('game loop started')

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
    
    // organize layers by bottom on top of list
    background.draw();
    player.draw();
    
    laserArray.forEach((value) => {
        value.draw()
    })
}

function update(secondsPassed) { // Animate - final decision on how to change is made here
    // console.log(`update started`);
    
    player.update();
    player.borderCheck();

    // enable player movement if all is true
    if (keys.a.pressed && userVariables.safeArea){
        player.xVel = -playerGameVelocity;
        // update sprite clip
    } else if (keys.d.pressed && userVariables.safeArea){
        player.xVel = playerGameVelocity;
        // update sprite clip
    } else if (keys.space.pressed){
        // do something to fire
        laserArray.push(new Laser(player.xMiddle - (userVariables.projectileWidth * .5), player.yMiddle - (userVariables.projectileHeight), -6))
        console.log(laserArray);
    } else {
        player.xVel = 0;
        // set sprite clip back to 0
    }
    // update each laser's properties
    laserArray.forEach((value) => { 
        value.update()
    })
    if (laserArray.length > 50){
        laserArray.shift();
    }
}