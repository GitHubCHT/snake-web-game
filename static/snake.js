const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 每一格的大小
const gridSize = 20;

// 蛇的身體 (存座標)
let snake = [
  { x: 5, y: 5 },
];

// 蛇的移動方向 (dx, dy)
let dx = 1;
let dy = 0;

// 食物的座標
let food = { x: 10, y: 10 };

// 遊戲速度 (毫秒)
const gameSpeed = 150;

// 初始化
document.addEventListener('keydown', changeDirection);
main();

// 遊戲主流程
function main() {
  // 如果蛇撞到自己或牆壁，結束遊戲
  if (didGameEnd()) {
    alert('Game Over!');
    return;
  }

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    // 遞迴呼叫
    main();
  }, gameSpeed);
}

// 清空畫面
function clearCanvas() {
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 讓蛇往新的方向前進
function advanceSnake() {
  // 取得蛇頭位置
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // 吃到食物
  if (head.x === food.x && head.y === food.y) {
    // 增加一節長度 (不移除尾巴)
    snake.unshift(head);
    // 重新放置食物
    createFood();
  } else {
    // 沒有吃到食物，移除尾巴再增加頭
    snake.pop();
    snake.unshift(head);
  }
}

// 隨機產生新的食物座標
function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize));
  food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

// 繪製食物
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// 繪製蛇
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });
}

// 監聽按鍵改變方向
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  switch (event.keyCode) {
    case LEFT_KEY:
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case RIGHT_KEY:
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
    case UP_KEY:
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case DOWN_KEY:
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
    default:
      break;
  }
}

// 判斷是否撞到自己或牆壁
function didGameEnd() {
  // 撞牆
  const head = snake[0];
  if (
    head.x < 0 || head.x >= canvas.width / gridSize ||
    head.y < 0 || head.y >= canvas.height / gridSize
  ) {
    return true;
  }

  // 撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}
