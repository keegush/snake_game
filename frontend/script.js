const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const grid = 20;
let count = 0;
let score = 0;

const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++count < 4) {
        return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    ctx.fillStyle = '#0f0';
    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
            apple.x = getRandomInt(0, 30) * grid;
            apple.y = getRandomInt(0, 30) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 30) * grid;
                apple.y = getRandomInt(0, 30) * grid;
                score = 0;
                document.getElementById('score').innerText = `Score: ${score}`;
            }
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.code === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.code === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.code === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(gameLoop);
