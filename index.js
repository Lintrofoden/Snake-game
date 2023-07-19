const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLenght = 2;

let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//gameloop
function drawGame(){
    changeSnakePosition()
    if(isGameOver()){
        return;
    }


    clearCanvas()
    
    checkAppleCollision()
    drawApple()
    drawSnake()
    drawScore()
    setTimeout(() => {
        drawGame()
    }, 1000 / speed);
}

function isGameOver(){

    let gameOver = false

    if (xVelocity === 0 && yVelocity === 0){
        return gameOver
    }

    if (headX < 0 || headY < 0 || headX === tileCount || headY === tileCount){
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++){
        if (headX === snakeParts[i].x && headY === snakeParts[i].y){
            gameOver = true
            break
        }
    }

    if (gameOver){
        ctx.fillStyle = 'white'
        ctx.font = '50px Verdana'
        ctx.fillText('Game over', canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver;
}

function clearCanvas(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLenght++
        score++
    }
}

function drawSnake(){
    

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY))
    // while сдлеать 32:50.
    if(snakeParts.length > tailLenght) snakeParts.shift()

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function drawScore(){
    ctx.fillStyle = 'white'
    ctx.font = '10px Verdana'
    ctx.fillText('Score:' + score, canvas.width - 50, 10)
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    switch(event.keyCode){
        //left
        case 37:{
            if (xVelocity === 1) return;
            yVelocity = 0;
            xVelocity = -1;
            break;
        }
        //up
        case 38:{
            if (yVelocity === 1) return;
            yVelocity = -1;
            xVelocity = 0;
            break;
        }
        //right
        case 39:{
            if (xVelocity === -1) return;
            yVelocity = 0;
            xVelocity = 1;
            break;
        }
        //down
        case 40:{
            if (yVelocity === -1) return;
            yVelocity = 1;
            xVelocity = 0;
            break;
        }
    }
}

drawGame()