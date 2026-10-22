const player = document.getElementById("player");
const star = document.getElementById("star");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");
const controls = document.getElementById("controls");

let x = 20;
let y = 20;
let score = 0;

function movePlayer(direction) {
    const step = 10;

    if (direction === "right") x += step;
    if (direction === "left") x -= step;
    if (direction === "up") y -= step;
    if (direction === "down") y += step;

    const maxX = game.clientWidth - player.offsetWidth;
    const maxY = game.clientHeight - player.offsetHeight;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCollision();
}

function checkCollision() {
    const playerCenterX = x + player.offsetWidth / 2;
    const playerCenterY = y + player.offsetHeight / 2;

    const carX = star.offsetLeft + star.offsetWidth / 2;
    const carY = star.offsetTop + star.offsetHeight / 2;

    if (
        Math.abs(playerCenterX - carX) < 35 &&
        Math.abs(playerCenterY - carY) < 35
    ) {
        score++;
        scoreText.textContent = "Puan: " + score;

        const maxX = game.clientWidth - star.offsetWidth;
        const maxY = game.clientHeight - star.offsetHeight;

        star.style.left = Math.random() * maxX + "px";
        star.style.top = Math.random() * maxY + "px";
    }
}

document.addEventListener("keydown", function(event) {
    const directions = {
        ArrowRight: "right",
        ArrowLeft: "left",
        ArrowUp: "up",
        ArrowDown: "down"
    };

    if (directions[event.key]) {
        event.preventDefault();
        movePlayer(directions[event.key]);
    }
});

controls.addEventListener("pointerdown", function(event) {
    const button = event.target.closest("button[data-direction]");

    if (!button) return;

    event.preventDefault();
    movePlayer(button.dataset.direction);
});