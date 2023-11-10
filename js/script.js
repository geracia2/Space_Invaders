const canvas = document.querySelector('canvas')
console.dir(canvas);

canvas.width = 1280; // Set width and height of canvas
canvas.height = 720; // This could also be do with canvas.width = window.innerWidth;

window.onload = function (){
    /* this function forces all resources to load in before canvas is rendered
    img or sprite should be loaded into the html canvas tag and referenced:
    let img = document.getElementById("myImage");
    context.drawImage(img, 10, 30);
    */
    // list below all required images
}
// our context initialized to a more readable variable
const ctx = canvas.getContext('2d')

