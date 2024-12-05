const paddleP1 = document.querySelector('#paddleP1');
const paddleP2 = document.querySelector('#paddleP2');
const ball = document.querySelector('#ball');
const scoreP1 = document.querySelector('#scoreP1');
const scoreP2 = document.querySelector('#scoreP2');
const gameArea = document.querySelector('#gameArea');

let paddleP1Y = 50;
let paddleP2Y = 50;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 0.7;
let ballSpeedY = 0.7;

const paddleHeight = 20;
const paddleSpeed = 1.5;

let player1Score = 0;
let player2Score = 0;

let keyState = {
    ArrowUp: false,
    ArrowDown: false,
    w: false,
    s: false
};

let gameStarted = false;

function movePaddles() {
    if (keyState.w && paddleP1Y > 0) paddleP1Y -= paddleSpeed;
    if (keyState.s && paddleP1Y < 100 - paddleHeight) paddleP1Y += paddleSpeed;
    
    if (keyState.ArrowUp && paddleP2Y > 0) paddleP2Y -= paddleSpeed;
    if (keyState.ArrowDown && paddleP2Y < 100 - paddleHeight) paddleP2Y += paddleSpeed;

    paddleP1.style.top = `${paddleP1Y}%`;
    paddleP2.style.top = `${paddleP2Y}%`;
}

function moveBall() {
    if (!gameStarted) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    const paddleP1Rect = paddleP1.getBoundingClientRect();
    const paddleP2Rect = paddleP2.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const arenaRect = gameArea.getBoundingClientRect();

      if (ballY <= 0 || ballY >= 100) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballRect.right >= paddleP1Rect.left && 
        ballRect.bottom >= paddleP1Rect.top && 
        ballRect.top <= paddleP1Rect.bottom) {

        ballSpeedX = Math.abs(ballSpeedX);
    }

    if (ballRect.left <= paddleP2Rect.right && 
        ballRect.bottom >= paddleP2Rect.top && 
        ballRect.top <= paddleP2Rect.bottom) {
        
        ballSpeedX = Math.abs(ballSpeedX);
        ballX = paddleP2Rect.right + ballRect.width;
        console.log(ballX);
    }

    if (ballRect.left <= arenaRect.left) {
        player2Score++;
        scoreP2.textContent = player2Score;
        resetBall();
    }

    if (ballRect.right >= arenaRect.right) {
        player1Score++;
        scoreP1.textContent = player1Score;
        resetBall();
    }

    ball.style.left = `${ballX}%`;
    ball.style.top = `${ballY}%`;
}

function resetBall() {
    ballX = 50;
    ballY = 50;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 0.4 * (Math.random() > 0.5 ? 1 : -1);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') keyState.ArrowUp = true;
    if (e.key === 'ArrowDown') keyState.ArrowDown = true;
    if (e.key === 'w') keyState.w = true;
    if (e.key === 's') keyState.s = true;

    if (e.key === 'Enter' && !gameStarted) {
        gameStarted = true;
        resetBall();
        requestAnimationFrame(gameLoop);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') keyState.ArrowUp = false;
    if (e.key === 'ArrowDown') keyState.ArrowDown = false;
    if (e.key === 'w') keyState.w = false;
    if (e.key === 's') keyState.s = false;
});

function gameLoop() {
    movePaddles();
    moveBall();

    requestAnimationFrame(gameLoop);
}

scoreP1.textContent = player1Score;
scoreP2.textContent = player2Score;