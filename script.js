const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeBlock = 10;
const snakeSpeed = 100;
const canvasWidth = 300;  // Canvas width (inside the border)
const canvasHeight = 300; // Canvas height (inside the border)
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snake = [{ x: 50, y: 50 }];
let food = { x: 100, y: 100 };
let direction = "RIGHT";
let score = 0;
let gameInterval;
let gameOver = false;

// Draw snake
function drawSnake() {
  ctx.fillStyle = "#00FF00";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, snakeBlock, snakeBlock);
  }
}

// Draw food
function drawFood() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, snakeBlock, snakeBlock);
}

// Update the game state
function updateGame() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y -= snakeBlock;
  if (direction === "DOWN") head.y += snakeBlock;
  if (direction === "LEFT") head.x -= snakeBlock;
  if (direction === "RIGHT") head.x += snakeBlock;

  // Snake wraps around the border (the canvas edge)
  if (head.x < 0) head.x = canvasWidth - snakeBlock;
  if (head.x >= canvasWidth) head.x = 0;
  if (head.y < 0) head.y = canvasHeight - snakeBlock;
  if (head.y >= canvasHeight) head.y = 0;

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = `Score: ${score}`;
    spawnFood();
  } else {
    snake.pop();
  }

  // Check if snake collides with itself
  if (checkCollision(head)) {
    gameOver = true;
    clearInterval(gameInterval);
    document.getElementById("restartBtn").style.display = "block"; // Show restart button
    alert("Game Over! Click Restart to play again.");
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawSnake();
  drawFood();
}

// Spawn food at random location
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvasWidth / snakeBlock)) * snakeBlock;
  food.y = Math.floor(Math.random() * (canvasHeight / snakeBlock)) * snakeBlock;
}

// Check collision with snake body
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

// Handle keyboard input for direction
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Start or restart the game
function startGame() {
  snake = [{ x: 50, y: 50 }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  spawnFood();
  gameOver = false;
  document.getElementById("restartBtn").style.display = "none"; // Hide restart button
  gameInterval = setInterval(updateGame, snakeSpeed);
}

// Restart the game when clicked
function restartGame() {
  startGame();
}

startGame();
