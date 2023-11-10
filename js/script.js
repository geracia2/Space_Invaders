////////////////////////
// GAME LOOP LOGIC
////////////////////////

let canvas;
let context;

window.onload = init(); // as soon as canvas is generated run init function.

function init(){
    canvas = document.querySelector('canvas'); // establish canvas
    canvas.width = 1280; // Dynamically would involve a function and window.height
    canvas.height = 720; // This could also be do with canvas.width = window.innerWidth;
    ctx = canvas.getContext('2d'); // establish Context language '2d'
    
    // Don't currently need a resize feature if its always  but here it is.
    const canvasMaxWidth = 1280;
    const canvasMaxHeight = 720;
    canvas.addEventListener("resize", function() {
    if (canvas.width > canvasMaxWidth) {
        canvas.width = canvasMaxWidth;
    } else if (canvas.height < canvasMaxHeight) {
        canvas.height = canvasMaxHeight;
    }
    });

    // window.onresize = function() {
    //     window.innerWidth > 1280 || window.innerHeight > 720 ? window.resizeTo(1280, 720)
    // } // add an event listener for resize now
    
    /* this function forces all resources to load in before canvas is rendered
    img or sprite should be loaded into the html canvas tag and referenced:
    let img = document.getElementById("myImage");
    context.drawImage(img, 10, 30);*/
    // list below all required images
    
    window.requestAnimationFrame(gameLoop); // Start the first frame request
}

// variables needed to set FPS
// we do not need to define timeStamp as is is a protected word
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let velocity = 50; // global movement speed, redeclare per object as needed

function gameLoop(timeStamp){ 
	// starting loop with access to timeStamp parameter
	// Calculate the number of seconds passed since the last frame
	secondsPassed = Math.min(((timeStamp - oldTimeStamp) / 1000), 0.1); // Move forward in time with a maximum amount, change this number at the end
	oldTimeStamp = timeStamp;
	
	/* the following is only for getting fps to display
	// Calculate fps
	fps = Math.round(1 / secondsPassed);
	// Draw number to the screen
	context.fillStyle = 'white';
	context.fillRect(0, 0, 200, 100);
	context.font = '25px Arial';
	context.fillStyle = 'black';
	context.fillText("FPS: " + fps, 10, 30);
	*/
	update(secondsPassed); // Make changes to the proporties
	draw(); // Perform the drawing operation
	
	// The loop function has reached it's end. Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

function draw(){ // generate your first objects
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
	let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
	// objects that have calculations in them are recalculated every frame now
	context.fillStyle = randomColor;
	context.fillRect(rectX, rectY, 200, 175);
}

function update(secondsPassed) { // update or animate 
    // Use time to calculate new position
    rectX += (velocity * secondsPassed);
    rectY += (velocity * secondsPassed);
}