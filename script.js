const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const SEGMENT_SIZE = 20;

let snake = [{ x: 200, y: 200 }];
let food = {};
let direction = { x: SEGMENT_SIZE, y: 0 };
let score = 0;
let highScore = 0;
let gameInterval;
const SPEED = 300; // O'yin tezligini belgilash

function startGame() {
    score = 0;
    direction = { x: SEGMENT_SIZE, y: 0 };
    snake = [{ x: 200, y: 200 }];
    placeFood();
    scoreDisplay.textContent = `Bal: ${score}`;
    clearInterval(gameInterval);
    gameInterval = setInterval(update, SPEED); // Tezlikni o'rnatish
    startBtn.disabled = true;
}

function placeFood() {
    food.x = Math.floor(Math.random() * (GAME_WIDTH / SEGMENT_SIZE)) * SEGMENT_SIZE;
    food.y = Math.floor(Math.random() * (GAME_HEIGHT / SEGMENT_SIZE)) * SEGMENT_SIZE;
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // To'siqlarni tekshirish
    if (head.x < 0 || head.x >= GAME_WIDTH || head.y < 0 || head.y >= GAME_HEIGHT || snake.some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(gameInterval);
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = `Eng yaxshi bal: ${highScore}`;
        }
        alert("O'yin tugadi!");
        startBtn.disabled = false;
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Bal: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    gameArea.innerHTML = "";
    snake.forEach((segment, index) => {
        const div = document.createElement("div");
        div.style.width = `${SEGMENT_SIZE}px`;
        div.style.height = `${SEGMENT_SIZE}px`;
        div.style.position = "absolute";
        div.style.left = `${segment.x}px`;
        div.style.top = `${segment.y}px`;
        div.style.backgroundColor = index === 0 ? "lime" : "green"; // Bosh rang
        gameArea.appendChild(div);
    });

    const foodDiv = document.createElement("div");
    foodDiv.style.width = `${SEGMENT_SIZE}px`;
    foodDiv.style.height = `${SEGMENT_SIZE}px`;
    foodDiv.style.position = "absolute";
    foodDiv.style.left = `${food.x}px`;
    foodDiv.style.top = `${food.y}px`;
    foodDiv.style.backgroundColor = "red"; // Oziq-ovqat rangi
    gameArea.appendChild(foodDiv);
}

// Yo'nalish o'zgarishlari uchun tugmalar
document.getElementById("up").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -SEGMENT_SIZE };
});
document.getElementById("down").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: SEGMENT_SIZE };
});
document.getElementById("left").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -SEGMENT_SIZE, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: SEGMENT_SIZE, y: 0 };
});

// O'yinni boshlash
startBtn.addEventListener("click", startGame);
