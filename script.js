let speed = 5;
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let hiscoreval = 0;


//Game functions
function mainnn(ck) {
    window.requestAnimationFrame(mainnn);
    switch (snakeArr.length) {
        case 5:
            speed = 8;
            break;

        case 10:
            speed = 12;
            break;
        case 15:
            speed = 16;
            break;
    }

    if ((ck - lastPaintTime) / 1000 < 1 / speed) {

        return;

    }
    //console.log(ck);
    lastPaintTime = ck;
    gameEngine();

}

function isCollide(snake) { 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snakeArr[0].y) {
            return true;
        }
    }
    //wall se takkar
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}


function gameEngine() {
    //Updatig the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over , Press Any Key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scorbox.innerHTML = 'Score:' + score;
        speed = 5;

    }

    //Food has Eaten and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score :" + hiscoreval;
        }
        scorbox.innerHTML = 'Score:' + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }


    // moving the snake;
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //display the snake the food
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    switch (inputDir.x) {
        case -1:
            document.querySelector(".head").style.transform = 'rotate(90deg)';
            break;
        case 1:
            document.querySelector(".head").style.transform = 'rotate(270deg)';
            break;
    }
    switch (inputDir.y) {
        case -1:
            document.querySelector(".head").style.transform = 'rotate(180deg)';
            break;
        case 1:
            document.querySelector(".head").style.transform = 'rotate(0deg)';
            break;
    }

}


//main logic starts here
//musicSound.play();
window.requestAnimationFrame(mainnn);
let hiscore = localStorage.getItem("hiscore");
if (hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore.toString());
    hiscoreBox.innerHTML = "High Score :" + hiscoreval;
}
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case 'ArrowDown':
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }




})