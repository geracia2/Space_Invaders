# Space Invaders 
https://geracia2.github.io/Space_Invaders/

**This is my first project in Software Engineering!**

Space Invaders is a fixed shooter arcade game where the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead. The objective is to pan across a screen and shoot descending swarms of aliens, preventing them from reaching the bottom of the screen.

![Screenshot](https://github.com/geracia2/Space_Invaders/blob/main/images/Screenshot.png "Screenshot")

# Features
- Interactive mechanics of movement and shooting
- Win and lose states
- Audio feedback
- Score
- Sprite animation to the explosion

**Stretch Features**
- User can change the following:
    - Change the number of aliens in a row.
    - Change the number of rows.
    - Change the speed of the game.
    - Combine the previous three controls and produce a preset of _three difficulties._ 
    - Power up items that change the ship's attack pattern.
    - Add Sprites animations to the player

Sprits will change when interacting with certain items.

# Project Requirements
As this is a project from Per Scholas, the following are requirements I needed to adhere to.

### Mandatory
- Built with HTML, CSS and JavaScript (must be visual and use the DOM not the Console)
- Hosted on Github pages
- Commits to Github every day
- A README.md file

### Must Have Features
- **A win state** - a way for the player to win the game
    - High score can be considered a win state
- **A lose state** - a way for the player to lose the game
- A way to keep playing if the game is not over
- **Multiple rounds to play** - a round must begin, end and check if the game should continue or the overall game is won or lost.

### Stretch Goals
- A way to reset the board and play again
- CSS to give your game a personal and fun style
- Responsive mobile design
- Work with your instructor to determine additional stretch goals

# Installation / How to use?
https://geracia2.github.io/Space_Invaders/

No installation is necessary.
Runs directly in your browser. 
This was tested in Chrome and LiveServer during development.

# License
Free to use, not to modify or sell.
MIT © Aaron Geraci

# Tech
This project is meant to test my skills after 5 weeks of introductory programming. 

- HTML5
- Canvas
- CSS3
- JavaScript
- PhotoShop

# Code Explanation

**Game Loop**
The game operates around a recusive loop of functions starting with init:

`init() > gameLoop() { draw() > update() > gameLoop() }`

The basic structure looks like this:
```javascript
let canvas;
let context;

window.onload = init();

function init(){
    // console.log('init started')
    canvas = document.querySelector('canvas'); // establish canvas
    canvas.width = 1280; // Dynamically would involve a function and window.height
    canvas.height = 720; // This could also be do with canvas.width = window.innerWidth;
    ctx = canvas.getContext('2d'); // establish Context language '2d'
    window.requestAnimationFrame(gameLoop); // START the first frame request
}  

function gameLoop(){ // Set up flow of functions 
    update(); // Make changes to the properties
    draw(); // Perform the drawing operations
    window.requestAnimationFrame(gameLoop); // The loop function has reached it's end. Keep requesting new frames
}

function update() { // Animation - final decision on how a change is made here
    background.update()
    player.borderCheck();
    player.update();
    
    // From here we have the majority of our logic checks and calculations being done.

}

function draw(){ // Always need to draw the object first | make it available for updates | layer order
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    // organize layers by bottom on top of list | background > lasers > Player > explosions > enemy ships
    background.draw(); // init first draw
    laserArray.forEach((value) => {value.draw()}) // init first draw per array value 
    enemyLaserArray.forEach((value) => {value.draw()}) // init first draw per array value 
    player.draw(); // init first draw
    explosionArray.forEach((explosion) => {explosion.draw()}); 
}  
```

**Rendering**

```javascript
//basic class structure with an image and source
class NewImageSpriteClass {
	constructor(x, y, width, height){
	this.xPos = x;
	this.yPos = y;
	this.xVel = 0;
	this.yVel = 0;
	this.width = width;
	this.height = height;
	this.sprite = spriteImg;
	}
	draw(){
	ctx.drawImage(img, startCropX, startCropY, endXCropAfter, endYCropAfter, x, y, width,height)
	}
	update(){
	this.draw();
	this.xPos += this.xVel;
	this.yPos += this.yVel;
	}
}

let spriteImg= new Image();
spriteImg.src = 'images/Sprite_dim.png';

const newImage = new NewImageSpriteClass() // initialize the player after loading its image

// instaciate the class 
// include the draw() in draw game loop 
// incclude the update() in the update game loop
```

**Hit detection**
This is done by drawing a box of cordinates around an object. Done dynamically it looks something like this.
```javascript
// Inside the player class and draw method
update(){
    this.draw(); // generate object
    this.xPos += this.xVel;
    this.xMiddle = (this.xPos + (this.width / 2));
    this.yMiddle = (this.yPos + (this.height / 2));
    this.xColLeft = this.xPos + usVar.playColSidesDif; // x, go right
    this.xColRight = this.xPos + (this.width - usVar.playColSidesDif); // x go right + width then back
    this.yColTop = this.yPos + usVar.playColTopBotDif // y, go down
    this.yColBottom = this.yPos + (this.height - usVar.playColTopBotDif)
}

// Stroing each projectile in an array lets us run though the individual objects
laserArray.forEach((laser, j) => { 
    // HIT DETECTION 
    // Draw a box top to bottom, left to right, if the compared objects overlap = hit
    if (laser.yColTop    <= ship.yColBottom // las top < to ship bottom === hit
     && laser.yColBottom >= ship.yColTop // las bottom > above ship top == hit
     && laser.xColRight  <= ship.xColRight // las right before ship right === hit
     && laser.xColLeft   >= ship.xColLeft // las left beyond ship left === hit
    ){ 
        // do something...
    }
}
```

**Frame Rate**
All calculations are based on the browser's frame rate. So, a high frame rate will mean the game moves fast while a low frame rate means the game moves slow. To avoid That we can set the frame with a variable and `setTimeOut`. 

```javascript
var fps = 30;
 
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
        // code block of all calculations
    }, 1000 / fps);
}
 
draw();
```


# Credits
Some assets were created by me and others were sourced from the following:
<https://craftpix.net/Space_Invaders>

# Known Bugs
- If pressing Space and or W, A; player breaks safe margin
- Theme song does not play at the start of the game. This is because Chrome as a strong anti-autoPlay policy.

# Approach
I wanted to combine my **_current knowledge_** as well as learn the following new things:
- canvas
- how to work with sprite sheets
- gravity
- sprite changes
- keyboard inputs
- sound

Majority of canvas learning came from MDN documentation and SpicyYogurt. The initial feature list was sourced from Chris Course to start a road map but was not followed unless a solution could not be found for some logic. 
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
https://spicyyoghurt.com/tutorials/html5-javascript-game-development/images-and-sprite-animations
https://chriscourses.com/courses/space-invaders/videos/create-a-space-invaders-game


I've also set up a Notion board capturing all my learning.
https://www.notion.so/Canvas-5d6735fe420947ca823f2db9bacddb64?pvs=4

**To start:**

_italics are stretch goals_
- Research/Create sprites (max 1 hour)
- Research Canvas (max 2 days)
- HTML + CSS + JS: Project setup
    - directions
    - inputs
    - _difficulty control_
- JS + CSS : game board/canvas size
- JS : Game loop via recursive function
    - Initialize > Game Loop [ Update > Draw > Game Loop]
- JS : Create userShip Class
    - draw on: load
    - update on: every frame + key press updates position
- JS : addEventListeners on canvas for key inputs
- JS : Create Laser class
    - draw on: key press
    - .forEach loop on an array to constantly update and calculate
    - update on: every frame + userShip position
- JS : Create LasersArray and generate new Lasers on input
- JS : Create an Aliens Class 
- JS : Create an AlienFleet class 
    - enemyGrid[] > EnemyGenerator() > enemyFleet[] > enemyShip{} 
        - draw on: load
        - update on: every frame
    - need an array to hold and push into
    - loop to generate # of enemies
        - if statements for rows and columns
    - loop to update individual enemies
- JS : Move rows of Aliens
- JS : Spawn rows on an interval
- JS : Aliens collision method
- JS : Aliens shooting Method
- JS : Explosion and removal of objects   
- JS : Win/Lose conditions
- JS : Score
- **_JS + CSS : Difficulty_**  **| Currently working on |**
- **_JS + CSS : userShip sprite animation_**
- **_JS + CSS : Alien sprite explosion_**
- **_JS + CSS : Power-ups_**
- **_JS + CSS : Strong game UI_**
