let canvas = document.querySelector("canvas"); // establish canvas
canvas.width = 1280; // Dynamically would involve a function and window.height
canvas.height = 720; // This could also be do with canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d"); // establish Context language '2d'

class UserShip {
    /* Position, movement, dimensions, image, shooting, damage
    all will be dynamically created so we need to update them with parameters
    treat this like the brain, no form information, just placeholder*/
    constructor(){
        // can't call position directly so we need to save it as an object because it takes multiple values
        this.position = {
            xPos: 0,
            yPos: 0
        }
        this.velocity = {
            xVel: 0,
            yVel: 0
        }
        this.width = 192;
        this.height = 192;
        // this.image = userShipIMG;

        // new Image is an object that comes within JS's API, loads an image-like object via JS
        // const userShipIMG = new Image()
        // userShipIMG.src = 'images/Sprites/Fighter_single_192x192.png'

    }
    // draw a box to start giving form
    // draw is all the attributes you will see including loaded images
    draw(){
        
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, 500, 500)
        // ctx.drawImage(this.userShipIMG, this.position.xPos, this.position.yPos)
    }
}



const player = new UserShip()
player.draw()
console.log(player)