const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2
let dy = -2

//Defining paddles to hit the ball
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2

//Keypad variables
let rightPressed = false
let leftPressed = false

//Setting up the bricks variables
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var bricks = [];
for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = []
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, ststus: 1};
    }
}

var ballRadius = 15;

// function randomCol() {
//     return 'rgb('+ Math.floor(Math.random() * 225) +', '+ Math.floor(Math.random() * 225)+', '+ Math.floor(Math.random() * 225) +')'
// }

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true
    } else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false
    } else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false
    }
}
function colisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r]
            if (b.ststus == 1 ) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickWidth ) {
                    dy = -dy
                    b.ststus = 0
                }
            }
            bricks[c][r] = {x: 0, y: 0, ststus: 1};
        }
    }
}

function drawBall() {

    ctx.beginPath()
    ctx.arc(x,y,ballRadius,0,2*Math.PI)
    ctx.fillStyle = '#0066ff';
    ctx.fill()
    ctx.closePath()
    
}

function drawBricks () {
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            if (bricks[c][r].ststus == 1) {
            
            var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft
            var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop
            bricks[c][r].x =  brickX;
            bricks[c][r].y =  brickY;
            ctx.beginPath()
            ctx.rect(0,0, brickWidth, brickHeight)
            ctx.fillStyle = '#0095dd'
            ctx.fill()
            ctx.closePath()
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

function draw() {
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
    colisionDetection()
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
    }
    if (y + dy < ballRadius){
        dy = -dy
    }else if( y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else{
        alert('Game Over')
        document.location.reload()
        clearInterval(interval)
    }
}
    if ( rightPressed && paddleX < canvas.width - paddleWidth ) {
        paddleX += 7
    } else if(leftPressed && paddleX > 0){
        paddleX -= 7
    }
    x += dx
    y += dy
}

var interval = setInterval(draw, 10)
