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
    /* this function forces canvas data and gameLoop() to load in before canvas is rendered
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

        this.xVel = 0;
        this.yVel = 0;
        this.sprite = userShipIMG;
        userShipIMG.onload = ()=> { // on image load set properties to...
            this.width = usVar.shipTileWidth * usVar.playerScale;
            this.height = usVar.shipTileHeight * usVar.playerScale;
            // can't call position directly so we need to save it as an object because it takes multiple values
            this.xPos = (canvas.width/2) - (this.width/2); 
            this.yPos = (canvas.height / 2) + (this.height);

        }
    }
    draw(){ // draw is all the attributes you will see including loaded images
        // console.log(`load sprite`);
        if (this.sprite){ // truthy as it is not null. waiting on a load of image to update and avoid errors
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
            // this.colLeft = this.xPos;
            // this.colTop = this.xPos
            // this.colRight = this.xPos + this.width;
            // this.colBottom = this.xPos + this.height
        }
    }
    borderCheck() {
        // if (keys.a.pressed && player.xPos >= 0  - (player.width * .25))
        // if (keys.d.pressed && player.xPos <= canvas.width - (player.width * .75))
        if ((keys.a.pressed && this.xPos >= 0  - (this.width * .25)) || (keys.d.pressed && this.xPos <= canvas.width - (this.width * .75))) {
            usVar.safeArea = true;
        } else {
            usVar.safeArea = false;
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
            this.width = usVar.projectileWidth;
            this.height = usVar.projectileHeight;
            this.sprite = laserIMG;
        // }
    }
    draw(){
        // if (this.sprite){
            ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height);
        // }
    }
    update(){
        // if (this.sprite){
            draw();
            this.xPos += this.xVel;
            this.yPos += this.yVel;
            // this.colLeft = this.xPos;
            // this.colRight = this.xPos + this.width
            // this.colTop = this.xPos

        // }
    }
}
class EnemyShip {
    constructor(xPos, yPos, xVel, yVel) {
        this.id = '';
        this.xVel = 0;
        this.yVel = 0;
        this.sprite = enemyShipIMG;
        this.xPos = xPos;
        this.yPos = yPos;
        // enemyShipIMG.onload = ()=> { 
            this.width = usVarClac.enemyAdjustedDim;
            this.height = usVarClac.enemyAdjustedDim;
        // }
    }
    draw() {
        if (this.sprite){
            ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height);
        }
    }
    update(xVel, yVel){
        draw();
        this.xPos += xVel;
        this.yPos += yVel;
        this.xMiddle = (this.xPos + (this.width / 2)); // middle needs to be updated per current pos, so it goes in update()
        this.yMiddle = (this.yPos + (this.height / 2)); // it can go in draw, but that goes against gameloop logic
        // this.colLeft = this.xPos;
        // this.colTopRight = this.xPos + this.width;
        // this.colBottomRight = this.xPos + this.height
        // this.colTop = this.xPos
    }
}
class EnemyGenerator { // this could have been just an array but with a class we can access more properties dynamically
    // position, velocity, fleet array, 
    constructor(enemyRows, enemyColumns, name) { // xVel, yVel enemyRows, enemyColumns
        this.name = name;
        this.xVel = usVar.enemySpeed;
        this.yVel = 0;
        this.yJump = (usVarClac.enemyAdjustedDim + usVar.gap) * 2;
        this.xPos = 0;
        this.yPos = 0; 
        this.width = (usVarClac.enemyAdjustedDim + usVar.gap) * usVar.enemyRows,
        this.enemyFleet = [];// init new enemy here on each class init
        this.rows = enemyRows; // make dynamic later | enemyRows
        this.columns = enemyColumns; // make dynamic later | enemyColumns
        // window.onload = ()=> { 
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++) {
                    this.enemyFleet.push(new EnemyShip(i * (usVarClac.enemyAdjustedDim + usVar.gap), j * (usVarClac.enemyAdjustedDim + usVar.gap)));
                    // this.enemyFleet[i].id += i;
                }
            }
            console.log(`  !!!!!! new enemy fleet:`);
            console.dir(this.enemyFleet);
        // }
    }
    draw(){
    }
    update(){
        this.xPos += this.xVel;
        this.yVel = 0;

        if ((this.xPos > 0) & ((this.xPos - usVar.gap) <= canvas.width - this.width)) { 

        } else {
            this.xVel = -this.xVel;
            this.yVel = this.yJump;
            usVar.enemySafeArea = false;
        }
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
            laserArray.push(new Laser(player.xMiddle - (usVar.projectileWidth * .5), player.yMiddle - (usVar.projectileHeight), -6))
            console.log(laserArray);
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
// userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png'; // no sprite sheet
userShipIMG.src = 'images/Sprites/Fighter_Spritelist_update_1728x1536.png';
const player = new UserShip() // initialize the player after loading its image

let laserIMG = new Image();
laserIMG.src = 'images/Sprites/Laser_Spritelist_8x30.png';


let enemyShipIMG = new Image();
enemyShipIMG.src = 'images/Sprites/EnemyShip_90x90.png';
// const enemy = new EnemyShip() // test if enemyship loads.
// we don't add an array here because it would only generate once, if we want a new round, it should be a class
// enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{}
// const array = makeArray(enemyColumns, enemyRows)

const background = {
    draw(){
        ctx.fillStyle = 'black',
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;

// add all variables that will effect drawn objects first

let usVar = {
    playerScale : 1, 
    enemyScale : .5, 
    enemyRows : 5, // | STRETCH | add a random range to or above this
    enemyColumns: 2, // | STRETCH | add a random range to or above this
    gap: 20,
    enemySpeed: 1, 
    enemyFireRate: .2,
    playerGameVelocity : 4, // check class if comm out. Global movement speed, redeclare per object as needed. 4 is a good number
    // enemyTotal: this.enemyRows * this.enemyColumns,
    // --- below elements do not change ---
    safeArea : true,
    enemySafeArea: true,
    shipTileWidth : 192,
    shipTileHeight : 192,
    enemyTileWidth : 90,
    enemyTileHeight : 90,
    enemyDim: 90,
    projectileWidth : 8,
    projectileHeight : 30,
    // Sprite Sheet | Define the number of columns and rows in the sprite
    numColumns : 9,
    numRows : 8,
    // Define the size of a frame
    frameWidth : this.shipTileWidth / this.numColumns,
    frameHeight : this.shipTileHeight / this.numRows,
    // The sprite image frame starts from 0
    gameFrame : 0,
    userSpriteFrame: 0,
}
let usVarClac = { // JS doesn't like using .this with an init object so we need another object for calculating dynamic things
    enemyAdjustedDim: usVar.enemyDim * usVar.enemyScale,
    canvasCenter : canvas.width / 2,
//     laserColLeft : laser,
//     laserColRight : ,
//     enemyColLeft : ,
//     enemyColRight : ,
//     playerColLeft : ,
//     playerColRight : ,
}
console.log(`enemy size: ${usVarClac.enemyAdjustedDim}`)
console.log(`canvas center: ${usVarClac.canvasCenter}`);
console.log(`play speed: ${usVar.playerGameVelocity}`);
////////////////////////////////////////////////////////////////////////
// CATCH ARRAYS
////////////////////////

let laserArray = []

// create the first array of classes of arrays of enemies. containing each new instance of an enemy fleet
let enemyGrid = [new EnemyGenerator(usVar.enemyRows, usVar.enemyColumns, 'one')]; 


// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word


////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////
// function makeArray(columns, rows) {
//     let newArray = []
//     for (let i = 0; i < rows; i++) {
//         newArray[i] = [];
//         for (let j = 0; j < columns; j++) {
//             newArray[i][j] = [];
//           }
//     }
//     return newArray;
// }


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

function draw(){ // Always need to draw the object first | make it available for updates | layer order
    // console.log('draw started')
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    // organize layers by bottom on top of list
    background.draw(); // init first draw
    laserArray.forEach((value) => {value.draw()}) // init first draw per array value 
    player.draw(); // init first draw

    // move down the chain of updates till we reach individual EnemyShip
    // enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{} 
    enemyGrid.forEach(generator => {
        generator.draw(); // class generator{[]}
        generator.enemyFleet.forEach(ship => {
            ship.draw();
        });
    });
    
}   

function update(secondsPassed) { // Animation - final decision on how a change is made here
    // console.log(`update started`);
    
    player.borderCheck();
    player.update();
    // enemy.update();
    
    // Player movement | if all are true
    if (keys.a.pressed && usVar.safeArea && !keys.d.pressed){ // a is pressed and inside safeArea
        player.xVel = -usVar.playerGameVelocity; // b/c of update(), position = velocity and xVel is 0 until now, -4 (left)
        // **STRETCH** update sprite clipping for fame animation
    } else if (keys.d.pressed && usVar.safeArea && !keys.a.pressed){
        player.xVel = usVar.playerGameVelocity;  // b/c of update(), position = velocity and xVel is 0 until now, 4 (left)
        // **STRETCH** update sprite clipping for fame animation
    } else if (keys.space.pressed){
        // do something to fire
        // when laser update is placed here we get a continuous shot of lasers on each frame.
        // laserArray.push(new Laser(player.xMiddle - (usVar.projectileWidth * .5), player.yMiddle - (usVar.projectileHeight), -6))
        // console.log(laserArray);
    } else {
        player.xVel = 0;
        // set sprite clip back to 0
    }
    

    // Track each laser
    laserArray.forEach((value) => { // update each laser's properties
        value.update();
        if (laserArray.length > 30){ // remove lasers when there are too many
            laserArray.shift();
        }
    })

    // console.log(enemyGrid[0]);
    // move down the chain of updates till we reach individual EnemyShip
    // enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{} 
    enemyGrid.forEach(generator => {
        generator.update(); // class generator{[]}
        generator.enemyFleet.forEach((ship, i) => {
            ship.update(generator.xVel, generator.yVel); // you can target generators's elements with placeholder!
            // check for collision with laser
            laserArray.forEach((laser, j) => { 
                // console.log(laser[j])
                if (
                       laser.yPos <= (ship.yPos + ship.height) // las top < to Enm bottom === hit
                    && (laser.yPos - laser.height) >= ship.yPos // las bottom > above Enm top == hit
                    && laser.xPos >= ship.xPos
                    && (laser.xPos + laser.width) <= (ship.xPos + ship.width)
                    ){ 
                    // console.log(`hit`);
                    setTimeout(() => {
                        generator.enemyFleet.splice(i, 1)
                        laserArray.splice(j, 1)
                    }, 0);
                }
            })
        });
    });

    if (enemyGrid.length > 10){ // remove the first class generator when we get too high to cut down on memory
        console.log(`>>>>>> killing a generator`);
        enemyGrid.shift();
    }

    // measure game time to make new enemies
    usVar.gameFrame++
    // console.log(usVar.gameFrame);
    // we want to spawn a new fleet every 3500 frames
    if (usVar.gameFrame % 500 === 0){ // |STRETCH| setup a random range and interval
        console.log(`reach 3500`);
        enemyGrid.push(new EnemyGenerator(usVar.enemyRows, usVar.enemyColumns));
        // console.log(enemyGrid);
    }
// console.log(enemyGrid);
    
}
