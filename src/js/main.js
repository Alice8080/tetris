import { Tetris } from "./Tetris.js";

export const startBtn = document.getElementById('start-game'); // Кнопка начала игры
export const rightBtn = document.getElementById('control-move-right');
export const leftBtn = document.getElementById('control-move-left');
export const rotateBtn = document.getElementById('control-rotate');
export const downBtn = document.getElementById('control-down');
export const final = document.getElementById('final'); // Элемент оповещения об окончании игры
export const game = document.getElementById("game"); // canvas, игровое поле

if (game.getContext) { // Отрисовка игрового поля
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            const color = '#303030';
            drawRect(x, y, color);
        }
    }
}

startBtn.onclick = startGame; // Слушатель события, который запускает начало игры

export function drawRect(x, y, color) { // Отображение одной координаты на игровом поле
    const ctx = game.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x * 30, y * 30, 30, 30);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#3b3b3b";
    ctx.strokeRect(x * 30, y * 30, 30, 30);
}

export function startGame() { // Начало игры 
    final.style.display = 'none'; // Скрыть оповещение о финале предыдущей игры
    const tetris = new Tetris(); // Создание объекта игры 
    tetris.buttonState = 'pause'; // Кнопка начала игры теперь ставит игру на паузу
    tetris.changeButtonState();

    tetris.addTetromino(); // Добавление первой фигуры на поле

    // Управление активной фигурой с помощью кнопок
    rightBtn.onclick = () => {
        tetris.moveRight();
    };
    leftBtn.onclick = () => {
        tetris.moveLeft();
    };
    downBtn.onclick = () => {
        tetris.moveDown();
    };
    rotateBtn.onclick = () => {
        tetris.rotate();
    };

    // Управление активной фигурой с клавиатуры
    window.addEventListener("keydown", (e) => { 
        const code = e.code;
        if (code === 'ArrowLeft') {
            tetris.moveLeft();
        } else if (code === 'ArrowRight') {
            tetris.moveRight();
        } else if (code === 'ArrowDown') {
            tetris.moveDown();
        } else if (code === 'ArrowUp') {
            tetris.rotate();
        } 
    });
}