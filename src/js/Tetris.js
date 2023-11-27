import { TETROMINOES, SCORE_ITEMS, BUTTON_STATES } from "./constants.js";
import { startBtn, final, game, startGame, drawRect } from './main.js';

export const rightBtn = document.getElementById('control-move-right');
export const leftBtn = document.getElementById('control-move-left');
export const rotateBtn = document.getElementById('control-rotate');
export const downBtn = document.getElementById('control-down');

const controlButtons = [rightBtn, leftBtn, rotateBtn, downBtn]; // Кнопки управления игрой
const score = document.getElementById('score'); // Элемент отображения текущего счета очков
const GAME_MAX_WIDTH = 9; // Максимальный индекс ширины поля
const GAME_MAX_HEIGHT = 19; // Максимальный индекс высоты поля

export class Tetris { 
    constructor() {
        const row = new Array(10).fill(0);
        this.game = [];
        for (let i = 0; i < 20; i++) { // Заполнение игрового поля нулями
            this.game[i] = [...row];
        }
        this.tetrominoes = {};
        this.activeTetrominoID = ''; // ID активной фигуры
        this.activeCoordinates = []; // Координаты активной фигуры
        this.isFinal = false; // Флаг, который будет установлен в true, когда игра завершится
        this.count = 0; // Количество фигур в игре
        this.score = 0; // Счет очков
        this.buttonState = 'start'; // Начальное состояние стартовой кнопки
    }

    getRandomTetromino() { // Получение случайной фигуры    
        const random = Math.random() * 7;
        const tetromino = JSON.parse(JSON.stringify(TETROMINOES[Math.floor(random)])); // Делаем глубокую копию объекта фигуры, чтобы в игре изменять ее свойства, не изменяя константные свойства
        return tetromino;
    }

    addTetromino() {
        this.manageScore(); // Посчитать счет очков в игре
        if (this.timer) {
            clearInterval(this.timer); // Удаляем таймер падения предыдущей фигуры
        }
        const tetromino = this.getRandomTetromino(); // Получаем объект новой фигуры
        this.count += 1; // Увеличение количества фигур в игре
        const newID = `${tetromino.id}-${this.count}`; // id нового элемента складывается из id фигуры и количества фигур в игре
        this.activeTetrominoID = newID; // Активный элемент - последний добавленный
        tetromino.id = newID; // В свойство id устанавливается id элемента вместо изначального id фигуры (одной из 7)
        this.tetrominoes[newID] = tetromino; // Добавление нового элемента в игру

        const activeCoordinates = [];
        let blockX = 0;
        let blockY = 0;
        for (let i = 0; i < tetromino.block.length; i++) { // Добавляем tetromino на поле
            const row = tetromino.block[i];
            for (let j = 0; j < row.length; j++) {
                const coordinate = tetromino.coordinates[i][j];
                const [y, x] = coordinate;
                if (!this.game[y][x]) { // Если координата еще не занята
                    this.game[y][x] = tetromino.block[blockY][blockX];
                    if (tetromino.block[blockY][blockX]) {
                        activeCoordinates.push([y, x]);
                    }
                    blockX++;
                    if (blockX === tetromino.block[0].length) {
                        blockX = 0;
                        blockY++;
                    };
                } else { // Если координата уже занята и новую фигуру некуда поставить, игра заканчивается 
                    this.final();
                    this.manageScore();
                    return;
                }
            }
        }
        this.activeCoordinates = activeCoordinates;
        this.manageScore(); // Посчитать счет очков в игре
        if (!this.isFinal) { // Если игра еще не окончена
            this.startFall(); // Начать падение новой фигуры
        }
    }

    removeTetromino() { // Очистить предыдущее положение фигуры на поле
        for (let i = 0; i < this.activeCoordinates.length; i++) {
            const [y, x] = this.activeCoordinates[i];
            this.game[y][x] = 0;
        }
    }

    updateTetromino() { // Обновить положение фигуры на поле
        const id = this.activeTetrominoID;
        const tetromino = this.tetrominoes[id];
        const activeCoordinates = [];
        let blockX = 0;
        let blockY = 0;
        for (let i = 0; i < tetromino.block.length; i++) {
            const row = tetromino.block[i];
            for (let j = 0; j < row.length; j++) {
                const coordinate = tetromino.coordinates[i][j];
                const [y, x] = coordinate;
                this.game[y][x] = tetromino.block[blockY][blockX];
                if (tetromino.block[blockY][blockX]) {
                    activeCoordinates.push([y, x]);
                }
                blockX++;
                if (blockX === tetromino.block[0].length) {
                    blockX = 0;
                    blockY++;
                };
            }
        }
        this.activeCoordinates = activeCoordinates;
        this.render();
    }

    moveRight() { // Перемещение фигуры на 1 координату вправо
        const id = this.activeTetrominoID;
        if (this.isBottom()) return; // Если фигуре больше некуда падать, функция прерывается

        for (let row of this.tetrominoes[id].coordinates) {
            let rightCoordinate = row.at(-1);
            const [y, x] = rightCoordinate;
            const notFreeSpace = this.game[y][x + 1];
            if ((this.game[y][x] && notFreeSpace) || x === GAME_MAX_WIDTH) { // Если справа есть блок или достигнут край игрового поля, фигура не двигается вправо
                return;
            }
        }
        this.removeTetromino();
        this.tetrominoes[id].coordinates = this.tetrominoes[id].coordinates.map((row) => row.map((coordinate) => {
            const rightCoordinate = this.tetrominoes[id].coordinates[0].at(-1)[1];
            return rightCoordinate < GAME_MAX_WIDTH ? [coordinate[0], coordinate[1] + 1] : [coordinate[0], coordinate[1]];
        }));
        this.updateTetromino();
    }

    moveLeft() { // Перемещение фигуры на 1 координату влево
        const id = this.activeTetrominoID;
        if (this.isBottom()) return; // Если фигуре больше некуда падать, функция прерывается
        for (let row of this.tetrominoes[id].coordinates) {
            let leftCoordinate = row[0];
            const [y, x] = leftCoordinate;
            const notFreeSpace = this.game[y][x - 1];
            if ((this.game[y][x] && notFreeSpace) || x === 0) { // Если слева есть блок или достигнут край игрового поля, фигура не двигается вправо
                return;
            }
        }
        this.removeTetromino();
        this.tetrominoes[id].coordinates = this.tetrominoes[id].coordinates.map((row) => row.map((coordinate) => {
            const leftCoordinate = this.tetrominoes[id].coordinates[0][0][1];
            return leftCoordinate > 0 ? [coordinate[0], coordinate[1] - 1] : [coordinate[0], coordinate[1]];
        }));
        this.updateTetromino();
    }

    moveDown() { // Перемещение фигуры на 1 координату вниз
        const id = this.activeTetrominoID;
        if (this.isBottom()) return; // Если фигуре больше некуда падать, функция прерывается
        let oldColors = [];
        for (let i = 0; i < this.tetrominoes[id].coordinates.at(-1).length; i++) { // Проверяем, соприкоснется ли нижний ряд фигуры с другой фигурой
            let [y, x] = this.tetrominoes[id].coordinates.at(-1)[i];
            let nextY = y + 1;
            let downY, downX;
            if (this.tetrominoes[id].moveDown) {
                downY = this.tetrominoes[id].moveDown[0];
                downX = this.tetrominoes[id].moveDown[1];

                oldColors.push({ y: downY + 1, x: downX, color: this.game[downY + 1][downX] });

                if (downY + 2 <= GAME_MAX_HEIGHT) {
                    oldColors.push({ y: downY + 2, x: downX, color: this.game[downY + 2][downX] });
                }
            }
            if (this.game[nextY][x] && this.game[y][x] && y !== downY && x !== downX) { // Если под фигурой есть другая фигура, падения не происходит
                this.addTetromino(); // Добавляется новая фигура
                return;
            }
            if (y - 1 >= 0) {
                if (!this.game[y][x] && this.game[y - 1][x] && this.game[y + 1][x]) { // Если в ряду на 1 выше нижнего есть заполненная активной фигурой координата
                    oldColors.push({ y: y + 1, x, color: this.game[y + 1][x] });
                }
            }
            if (y - 2 >= 0) {
                if (!this.game[y][x] && !this.game[y - 1][x] && this.game[y - 2][x] && this.game[y + 1][x]) { // Если в ряду на 2 выше нижнего есть заполненная активной фигурой координата
                    oldColors.push({ y: y + 1, x, color: this.game[y + 1][x] });
                    this.tetrominoes[id].moveDown = [y, x];
                }
            }
        }
        this.removeTetromino();
        this.tetrominoes[id].coordinates = this.tetrominoes[id].coordinates.map((row) => row.map((coordinate) => {
            const bottomCoordinate = this.tetrominoes[id].coordinates.at(-1)[0][0];
            let newY = coordinate[0];
            if (bottomCoordinate < GAME_MAX_HEIGHT) {
                newY++;
            }
            return [newY, coordinate[1]];
        }));
        this.updateTetromino();

        for (let item of oldColors) {
            this.game[item.y][item.x] = item.color;
        }
        this.render();

        if (this.isBottom()) { // Если текущая активная фигура опустилась на дно, добавляем новую
            this.addTetromino();
        }
    }

    rotate() { // Поворот активной фигуры на 90 градусов вправо
        const id = this.activeTetrominoID;
        if (this.isBottom()) return; // Если фигуре больше некуда падать, функция прерывается
        const tetromino = this.tetrominoes[id];
        const rotate = tetromino.rotate === 270 ? 0 : tetromino.rotate + 90;
        if (rotate === 90 || rotate === 270) {
            const topCoordinate = tetromino.coordinates[0][0];
            const [y, x] = topCoordinate;
            if ((x + tetromino.coordinates.length - 1) > GAME_MAX_WIDTH) {
                return;
            }
        }
        this.removeTetromino();
        tetromino.rotate = rotate;
        let newСoordinates = [];
        const start = tetromino.coordinates[0][0];
        if (tetromino.rotate === 90 || tetromino.rotate === 270) {
            const width = tetromino.coordinates.length;
            const height = tetromino.coordinates[0].length;
            for (let i = 0; i < height; i++) {
                newСoordinates[i] = [];
                for (let j = 0; j < width; j++) {
                    let y = start[0] + i;
                    let x = start[1] + j;
                    newСoordinates[i][j] = [y, x];
                }
            }
        } else {
            const width = tetromino.coordinates.length;
            const height = tetromino.coordinates[0].length;
            for (let i = 0; i < height; i++) {
                newСoordinates[i] = [];
                for (let j = 0; j < width; j++) {
                    let y = start[0] + i;
                    let x = start[1] + j;
                    newСoordinates[i][j] = [y, x];
                }
            }
        }
        tetromino.coordinates = newСoordinates;
        tetromino.block = tetromino.blocks[tetromino.rotate]; // Устанавливаем новое положение в свойства активного блока
        this.tetrominoes[id] = tetromino;
        this.updateTetromino();
    }

    startFall() { // Падение активной фигуры вниз
        const timer = setInterval(() => {
            this.moveDown();
        }, 600);
        this.timer = timer;
    }

    isBottom() { // Проверка, достигла ли фигура дна 
        const id = this.activeTetrominoID;
        const bottomCoordinate = this.tetrominoes[id].coordinates.at(-1)[0][0];
        return bottomCoordinate >= GAME_MAX_HEIGHT;
    }

    manageScore() {
        let rowsCount = 0; // Количество одновременно заполненных рядов
        for (let i = 0; i < this.game.length; i++) {
            if (this.game[i].every(j => j !== 0)) { // Если один из рядов заполнен
                rowsCount++;
                const newRow = new Array(10).fill(0);
                this.game.splice(i, 1); // Удаляем заполненный ряд
                this.game.unshift(newRow); // Добавляем сверху пустой ряд 
                this.render(); // Отображение на станице нового положения фигур в игре
            }
        }

        this.score += SCORE_ITEMS[rowsCount]; // Начисляем очки в зависимости от количества одновременно заполненных рядов
        score.textContent = this.score; // Отображаем на странице количество очков
        this.render(); // Отображение на станице нового положения фигур в игре
    }

    changeButtonState() { // Переключение состояния кнопки начала / остановки / продолжения игры
        const state = this.buttonState;
        const item = BUTTON_STATES[state];
        if (state === 'newGame') {
            startBtn.onclick = startGame;
        } else if (state === 'pause') {
            startBtn.onclick = () => {
                this.pause();
            };
        } else if (state === 'continue') {
            startBtn.onclick = () => {
                this.continue();
            };
        }
        startBtn.innerHTML = `
            <img src="./src/assets/img/${item.icon}">
            ${item.text}
        `;
    }

    pause() { // Поставить игру на паузу
        clearInterval(this.timer);
        this.buttonState = 'continue';
        this.changeButtonState();
        for (let button of controlButtons) {
            button.setAttribute('disabled', '');
        }
    }

    continue() { // Продолжить игру после паузы
        this.startFall();
        this.buttonState = 'pause';
        this.changeButtonState();
        for (let button of controlButtons) {
            button.removeAttribute('disabled');
        }
    }

    final() { // Закончить игру
        this.isFinal = true;
        final.style.display = 'block';
        this.buttonState = 'newGame';
        this.changeButtonState();
    }

    render() { // Отображение игрового поля на странице
        if (game.getContext) {
            for (let y = 0; y < this.game.length; y++) {
                const row = this.game[y];
                for (let x = 0; x < row.length; x++) {
                    const blockId = this.game[y][x];
                    const color = !blockId ? '#303030' : TETROMINOES[blockId - 1].color;
                    drawRect(x, y, color);
                }
            }
        }
    }
}
