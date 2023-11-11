# Space Invaders 

**This is my first project in Software Engineering!**

Space Invaders is a fixed shooter arcade game where the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead. The objective is to pan across a screen and shoot descending swarms of aliens, preventing them from reaching the bottom of the screen.

# Features
User can change the following:
- Change the number of aliens in a row.
- Change the number of rows.
- Change the speed of the game.
- Combine the previous three controls and produce a preset of _three difficulties._ 
- **Stretch Features**
- Power up items that change the ship's attack pattern.
- Add Sprites.
- Add Audio.

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

# Tech
This project is meant to test my skills after 5 weeks of introductory programming. 

- HTML5
- Canvas
- CSS3
- JavaScript
- PhotoShop

# Installation / How to use?
No installation is necessary.

Runs directly in your browser. 

This was tested in Chrome and LiveServer during development.

# License
Free to use, not to modify or sell.
MIT © Aaron Geraci

# Credits
Some assets were created by me and others were sourced from the following:
https://craftpix.net/#%20Space_Invaders

# Approach
I wanted to combine my **_current knowledge_** as well as learn the following new things:
- canvas
- how to work with sprite sheets
- gravity
- sprite changes
- keyboard inputs
- sound

Majority of canvas learning came from MDN documentation and SpicyYogurt
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
https://spicyyoghurt.com/tutorials/html5-javascript-game-development/images-and-sprite-animations

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
- JS + CSS : Create userShip Object
- JS : addEventListeners on canvas for key inputs
- JS : userShip's Method for moving
- JS : Move the ship
- JS : userShip's Method for shooting
- JS + CSS : Create projectiles
- JS + CSS : Create an Aliens Class
- JS : Generate AlienFleet array
- JS : Move rows of Aliens
- JS : Spawn rows on an interval
- JS : Aliens collision method
- JS : Aliens shooting Method
- JS : Win/Lose conditions
- JS : Score
- **_JS + CSS : Difficulty_**
- **_JS + CSS : userShip sprite animation_**
- **_JS + CSS : Alien sprite explosion_**
- **_JS + CSS : Power-ups_**
- **_JS + CSS : Strong game UI_**
