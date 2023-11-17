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
    const scoreElm = document.querySelector('#scoreElm')
    

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
            this.xPos = (canvas.width / 2) - (this.width / 2); 
            this.yPos = (canvas.height / 2) + this.height;

        }
    }
    draw(){ // draw is all the attributes you will see including loaded images
        // console.log(`load sprite`);
        if (this.sprite){ // truthy as it is not null. waiting on a load of image to update and avoid errors
            // console.log(`player class draw`);
            // --------- crop square
            // ctx.fillStyle = "blue";
            // ctx.fillRect(this.xPos, this.yPos, 192, 192)
            // --------- collision square
            // ctx.fillStyle = "green";
            // ctx.fillRect(this.xPos + 64, this.yPos + 44, 64, 109)
            // ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height )
            ctx.drawImage(this.sprite, 0, 0, 192, 192, this.xPos, this.yPos, this.width, this.height) // frame 3,1
            // context.drawImage(img, startCropX, startCropY, endXCropAfter, endYCropAfter, x, y, width,height)
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
            this.xColLeft = this.xPos + usVar.playColSidesDif; // x, go right
            this.xColRight = this.xPos + (this.width - usVar.playColSidesDif); // x go right + width then back
            this.yColTop = this.yPos + usVar.playColTopBotDif // y, go down
            this.yColBottom = this.yPos + (this.height - usVar.playColTopBotDif)
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

class EnemyShip {
    constructor(xPos, yPos, xVel, yVel) {
        this.id = '';
        this.xVel = xVel;
        this.yVel = yVel;
        this.sprite = enemyShipIMG;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = usVarClac.enemyAdjustedDim;
        this.height = usVarClac.enemyAdjustedDim;
        
    }
    draw() {
        if (this.sprite){
            ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height);
        }
    }
    update(xVel, yVel){
        this.draw();
        this.xPos += xVel;
        this.yPos += yVel;
        this.xMiddle = this.xPos + (this.width / 2); // middle needs to be updated per current pos, so it goes in update()
        this.yMiddle = this.yPos + (this.height / 2); // it can go in draw, but that goes against gameloop logic
        this.yBottom =  this.yPos + this.height;
        this.xColLeft = this.xPos; // x, go right
        this.xColRight = this.xPos + this.width; // x go right + width then back
        this.yColTop = this.yPos; // y, go down
        this.yColBottom = this.yPos + this.height;
    }
    shoot(enemyLaserArray){
        enemyLaserArray.push(new EnemyLaser(this.xMiddle, this.yBottom, usVar.enemyProjectileSpeed));
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
            // console.log(`  !!!!!! new enemy fleet:`);
            // console.dir(this.enemyFleet);
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
            this.draw();
            this.xPos += this.xVel;
            this.yPos += this.yVel;
            this.xColLeft = this.xPos; // x, go right
            this.xColRight = this.xPos + this.width; // x go right + width then back
            this.yColTop = this.yPos; // y, go down
            this.yColBottom = this.yPos + this.height;

        // }
    }
}

class EnemyLaser {
    constructor(xPos, yPos, yVel) {
        // laserIMG.onload = ()=> {
            this.xVel = 0;
            this.yVel = yVel;
            this.xPos = xPos;
            this.yPos = yPos;
            this.width = usVar.enemyProjectileWidth;
            this.height = usVar.enemyProjectileHeight;
            this.sprite = enemyLaserIMG;
        // }
    }
    draw(){
        // if (this.sprite){
            ctx.drawImage(this.sprite, this.xPos, this.yPos, this.width, this.height);
        // }
    }
    update(){
        // if (this.sprite){
            this.draw();
            this.xPos += this.xVel;
            this.yPos += this.yVel;
            this.xColLeft = this.xPos; // x, go right
            this.xColRight = this.xPos + this.width; // x go right + width then back
            this.yColTop = this.yPos; // y, go down
            this.yColBottom = this.yPos + this.height;
        // }
    }
}
class Explosion {
    constructor(xPos, yPos) {
            this.xPos = xPos;
            this.yPos = yPos;
            this.frame = 1
            this.width = usVar.explosionTile;
            this.height = usVar.explosionTile; // 300
            this.yCropStart = 0;// usVar.explosionTile * (usVar.explosionFrame - 1)
            // this.yCropStart = 150;// usVar.explosionTile * (usVar.explosionFrame - 1)
            this.yCropEnd = usVar.explosionTile; // usVar.explosionTile * usVar.explosionFrame
            this.xCropEndAfter = usVar.explosionTile;
            this.sprite = explosionIMG;
            this.opacity = 1; 
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            this.sprite,     // img
            0,               // startCropX | this. 1*# = 0
            this.yCropStart, // startCropY | this.yPos 1*# = 50
            this.xCropEndAfter, // endXCropAfter | explosionTile
            this.yCropEnd,   // endYCropAfter#pxs | this.yPos + usVar.explosionTile
            this.xPos,       // x position
            this.yPos,       // y position
            this.width,      // final width
            this.height);    // final height
        ctx.restore();
        // ctx.drawImage(this.sprite, 0, 0, 192, 192, this.xPos, this.yPos, this.width, this.height) // frame 3,1
        // ctx.drawImage(img, startCropX, startCropY, endXCropAfter, endYCropAfter, x, y, width, height)
        // context.drawImage(img, startCropX, startCropY, endXCropAfter, endYCropAfter, x, y, width, height)
            
    }
    update(){
            this.draw();
            setTimeout(() => {
                this.yCropStart = this.frame * usVar.explosionTile
                this.width += .1;
                this.height += .1;
                this.opacity -= .01 
            }, 10);
            


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
            laserArray.push(new Laser(player.xMiddle - (usVar.projectileWidth / 2), (player.yMiddle - usVar.projectileHeight), -usVar.projectileSpeed))
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
// userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png'; // no sprite sheet
userShipIMG.src = 'images/Sprites/Fighter_Spritelist_update_1728x1536.png';

const player = new UserShip() // initialize the player after loading its image

let laserIMG = new Image();
laserIMG.src = 'images/Sprites/Laser_Spritelist_8x30.png';

let enemyLaserIMG = new Image();
enemyLaserIMG.src = 'images/Sprites/Enemy_Laser_8x20.png';

let explosionIMG = new Image();
explosionIMG.src = 'images/Sprites/Explosions_SpriteSheet_50x300.png';

let enemyShipIMG = new Image();
enemyShipIMG.src = 'images/Sprites/EnemyShip_90x90.png';
// const enemy = new EnemyShip() // test if enemyship loads.
// we don't add an array here because it would only generate once, if we want a new round, it should be a class
// enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{}
// const array = makeArray(enemyColumns, enemyRows)

let backgroundIMG = new Image();
backgroundIMG.src = 'images/Sprites/starBG_1280x1440.jpg';

const background = {
    yPos: 720,
    draw(){
        ctx.drawImage(backgroundIMG, 0, this.yPos, 1280, 720, 0, 0, 1280, 720)
        // ctx.fillStyle = 'black',
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, 
    update(){
        this.yPos--;
        // console.log(this.yPos)
        if (this.yPos <= 0 ){
            this.yPos = 720
        }
    }
}


////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////

let secondsPassed = 0;
// let oldTimeStamp = 0;
// let fps;

// add all variables that will effect drawn objects first

let usVar = {
    // --- below elements will be changeable ---
    playerScale : 1, 
    enemyScale : .5,
    enemyRows : 7, // | STRETCH | add a random range to or above this
    enemyColumns: 2, // | STRETCH | add a random range to or above this
    gap: 20,
    enemySpeed: 1, 
    enemyFireRate: 100, // Lower is faster highly dependant to frame rate
    enemySpawnRate: 500, // 3500 default, 500 test | STRETCH | difficulty settings
    playerGameVelocity : 6, // check class if comm out. Global movement speed, redeclare per object as needed. 4 is a good number
    projectileSpeed: 10,
    enemyProjectileSpeed: 4,
    winScore: 1000,
    enemyPointWorth: 10,
    currentScore: 0,
    // enemyTotal: this.enemyRows * this.enemyColumns,
    // --- below elements do not change ---
    safeArea : true, 
    enemySafeArea: true,
    playColSidesDif: 64,
    playColTopBotDif: 44,
    shipTileWidth : 192,
    shipTileHeight : 192,
    enemyTileWidth : 90,
    enemyTileHeight : 300,
    enemyDim: 90,
    projectileWidth : 8,
    projectileHeight : 30,
    enemyProjectileWidth: 8,
    enemyProjectileHeight: 20,
    explosionTile: 50,
    explosionFullHeight: 300,
    opacityDecay: 25,
    explosionFrame: 0,
    // Sprite Sheet | Define the number of columns and rows in the sprite
    numColumns : 9,
    numRows : 8,
    // Define the size of a frame
    // The sprite image frame starts from 0
    gameFrame : 0,
    userSpriteFrame: 0,
}
let usVarClac = { // JS doesn't like using .this with an init object so we need another object for calculating dynamic things
    enemyAdjustedDim: usVar.enemyDim * usVar.enemyScale,
    canvasCenter : canvas.width / 2,
    enemyFireRateRandom: usVar.enemyFireRate,
    // frameWidth : this.shipTileWidth / this.numColumns,
    // frameHeight : this.shipTileHeight / this.numRows,
    // laserColLeft : laser,
    // laserColRight : ,
    // enemyColLeft : ,
    // enemyColRight : ,
    // playerColLeft : ,
    // playerColRight : ,
}
console.log(`enemy size: ${usVarClac.enemyAdjustedDim}`)
console.log(`canvas center: ${usVarClac.canvasCenter}`);
console.log(`play speed: ${usVar.playerGameVelocity}`);

////////////////////////////////////////////////////////////////////////
// CATCH ARRAYS
////////////////////////

let laserArray = [];
let enemyLaserArray = []
let explosionArray = []

// create the first array of classes of arrays of enemies. containing each new instance of an enemy fleet
let enemyGrid = [new EnemyGenerator(usVar.enemyRows, usVar.enemyColumns, 'one')]; 


// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word


////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Game over Alert
function loseMessage() {
    let text = "You were hit!\n--------------\nGame over!\n--------------\n                                       Click OK to keep going\n                                                      OR\n                                       Click Cancel to restart!";
    if (confirm(text) == true) {
    } else {
        location.reload();
    }
    // document.getElementById("demo").innerHTML = text;
}
function winMessage() {
    let text = "                                                You did it!\n                                           ------------------\n                                           Congratulations\n                                           ------------------\n                                       Click OK to keep going\n                                                      OR\n                                       Click Cancel to restart!";
    if (confirm(text) == true) {
    } else {
        location.reload();
    }
// document.getElementById("demo").innerHTML = text;
}
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

function gameLoop(){ // Set up flow of functions 
    setTimeout(() => {
        // console.log('game loop started')
    
        ////////////////////////////////////////////////////////////////////////
        // CALLING GAME LOOP
        ///////////////////////////
        // init > gameloop [ calcs, update > draw > gameloop ]
        ///////////////////////////
        scoreElm.innerHTML = usVar.currentScore;
        update(secondsPassed); // Make changes to the properties
        draw(); // Perform the drawing operations
        window.requestAnimationFrame(gameLoop); // The loop function has reached it's end. Keep requesting new frames
    }, 12);
    }

function draw(){ // Always need to draw the object first | make it available for updates | layer order
    setTimeout(() => {
    // console.log('draw started')
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    
    // organize layers by bottom on top of list | background > lasers > Player > explosions > enemy ships
    background.draw(); // init first draw
    
    laserArray.forEach((value) => {value.draw()}) // init first draw per array value 
    
    enemyLaserArray.forEach((value) => {value.draw()}) // init first draw per array value 
    
    player.draw(); // init first draw
    
    explosionArray.forEach((explosion) => {explosion.draw()});

    // move down the chain of updates till we reach individual EnemyShip
    // enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{} 
    enemyGrid.forEach(generator => {
        generator.draw(); // class generator{[]}
        generator.enemyFleet.forEach(ship => {
            ship.draw();
        });
    });
    
}, 12);    
}   

function update(secondsPassed) { // Animation - final decision on how a change is made here
    setTimeout(() => {
    // console.log(`update started`);
    background.update()

    player.borderCheck();

    player.update();
    
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
    
    explosionArray.forEach((explosion, i) => {
        explosion.update()
        setTimeout(() => {
            explosion.frame++
        }, 100);
        if (explosion.frame >= 7){
            // setTimeout(() => {
                explosionArray.splice(i, 1)
            // }, 0);
        }
        if (explosion.opacity <= 0){
            // setTimeout(() => {
                explosionArray.splice(i, 1)
            // }, 0);
        }
        // console.log('updating explosoin')
    });
    
    // Track each laser
    laserArray.forEach((laser) => { // update each laser's properties
        laser.update();
        if (laser.yPos <= -30){ // remove lasers when there are too many
            laserArray.shift();
        }
    })
    // laserArray.forEach((value) => { // old clean up took too long
    //     value.update();
    //     if (laserArray.length > 30){ // remove lasers when there are too many
    //         laserArray.shift();
    //     }
    // })
    
    // CHECK ENEMY LASER HITTING USER SHIP
    enemyLaserArray.forEach((enemyLaser, i) => {
        if (enemyLaser.yPos >= (canvas.height + 10)){ // remove lasers when there are too many
            enemyLaserArray.shift();
        } else {
            enemyLaser.update();
        }
        // check for collision with ship
        // HIT DETECTION 
        // Basically draw a box top to bottom, left to right, if in = hit
        if (enemyLaser.yColBottom >= player.yColTop
         && enemyLaser.yColTop    <= player.yColBottom
         && enemyLaser.xColRight  >= player.xColLeft
         && enemyLaser.xColLeft   <= player.xColRight
        ){
            // setTimeout(() => {
                enemyLaserArray.splice(i, 1)
            // }, 0);
            // console.log(`*** Yo've Been Hit ***`);
            explosionArray.push(new Explosion(enemyLaser.xColLeft - 25, enemyLaser.yColBottom))
            setTimeout(() => {
                loseMessage();
            }, 200);
        }
    })

    // GENERATE ENEMY | CHECK USER LASER HITTING ENEMY
    // move down the chain of updates till we reach individual EnemyShip
    // enemyGrid[] > EnemyGenerator() > enemyFleet[] > EnemyShip{} 
    enemyGrid.forEach(generator => {
        // Make enemies shoot back  checking frame rate & if there are enemies in fleet
        // if (usVar.gameFrame % getRandomRange(usVar.enemyFireRate, 1000) === 0 && generator.enemyFleet.length > 0) {
        if (usVar.gameFrame % usVar.enemyFireRate === 0 && generator.enemyFleet.length > 0) {
            // pick a random ship by generator > Fleet index random > shoot()
            generator.enemyFleet[Math.floor(Math.random() * generator.enemyFleet.length)].shoot(enemyLaserArray);
            // random fire rate?
            // usVarClac.enemyFireRateRandom = getRandomInt(usVar.enemyFireRate, usVar.enemyFireRate* 1.5);
        } else {
            generator.update(); // class generator{[]}
        }
        // console.log(enemyLaserArray); // test if they are being removed
        generator.enemyFleet.forEach((ship, i) => {
            ship.update(generator.xVel, generator.yVel); // you can target generators's elements with placeholder!
            // check for collision with laser
            laserArray.forEach((laser, j) => { 
                
                // HIT DETECTION 
                // Basically draw a box top to bottom, left to right, if in = hit
                if (laser.yColTop    <= ship.yColBottom // las top < to ship bottom === hit
                 && laser.yColBottom >= ship.yColTop // las bottom > above ship top == hit
                 && laser.xColRight  <= ship.xColRight // las right before ship right === hit
                 && laser.xColLeft   >= ship.xColLeft // las left beyond ship left === hit
                ){ 
                    // EXPLOSION ON ENEMY 
                    // console.log(`ship x: ${ship.xMiddle}, ship y: ${ship.yMiddle}`)
                    usVar.currentScore += usVar.enemyPointWorth;
                    explosionArray.push(new Explosion(ship.xPos, ship.yPos))
                    setTimeout(() => {
                        if (usVar.currentScore >= usVar.winScore){
                            winMessage();
                        }
                    }, 200);
                    // console.dir(explosionArray)
                    setTimeout(() => {
                        generator.enemyFleet.splice(i, 1)
                        laserArray.splice(j, 1)
                    }, 0);
                }
            })
        });
    });
    // console.log(enemyGrid[0]);

    if (enemyGrid.length > 11){ // remove the first class generator when we get too high to cut down on memory
        console.log(`>>>>>> killing a generator`);
        enemyGrid.shift();
    }

    // measure game time to make new enemies
    usVar.gameFrame++
    // console.log(usVar.gameFrame);

    // Spawn a new fleet every 3500 frames
    if (usVar.gameFrame % usVar.enemySpawnRate === 0){ // |STRETCH| setup a random range and interval
        // console.log(`reach 3500`);
        enemyGrid.push(new EnemyGenerator(usVar.enemyRows, usVar.enemyColumns));
        // console.log(enemyGrid);
    }
}, 12);   
}
