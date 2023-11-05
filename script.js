const ball = document.getElementById("ball");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const gameContainer = document.querySelector(".game-container");

let ballX = 395;
let ballY = 195;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftPaddleY = 160;
let rightPaddleY = 160;

function movePaddle() {
    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with top and bottom walls
    if (ballY < 0 || ballY > 390) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for collisions with paddles
    if (
        (ballX < 20 && ballX > 10 && ballY >= leftPaddleY && ballY <= leftPaddleY + 80) ||
        (ballX > 770 && ballX < 780 && ballY >= rightPaddleY && ballY <= rightPaddleY + 80)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for scoring
    if (ballX < 0) {
        // Right player scores
        resetBall();
    } else if (ballX > 800) {
        // Left player scores
        resetBall();
    }

    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";
}

function resetBall() {
    ballX = 395;
    ballY = 195;
    ballSpeedX = 5;
    ballSpeedY = 5;
}

function updateGameArea() {
    moveBall();
    movePaddle();
    requestAnimationFrame(updateGameArea);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && rightPaddleY > 0) {
        rightPaddleY -= 10;
    } else if (event.key === "ArrowDown" && rightPaddleY < 320) {
        rightPaddleY += 10;
    }
});

updateGameArea();
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && rightPaddleY > 0) {
        rightPaddleY -= 10;
    } else if (event.key === "ArrowDown" && rightPaddleY < 320) {
        rightPaddleY += 10;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "w" && leftPaddleY > 0) {
        leftPaddleY -= 10;
    } else if (event.key === "s" && leftPaddleY < 320) {
        leftPaddleY += 10;
    }
});
document.addEventListener("touchstart", (event) => {
    // Check if the touch is on the right side of the screen
    if (event.touches[0].pageX > window.innerWidth / 2) {
        // Move the right paddle based on touch position
        rightPaddleY = event.touches[0].pageY - gameContainer.getBoundingClientRect().top - 40;
    }
});