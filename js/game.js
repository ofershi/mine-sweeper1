'use strict'

var MINE = '💣';
var NORMAL = '😀';
var LOSE = '🤯';
var WIN = '😎';
var FLAG = '🚩';


var gLevel = {
    size: 4,
    mines: 2
}



function initGame() {
    var gBoard = buildBoard();
    console.table(gBoard)
    renderBoard(gBoard)
}


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function changeLevel(level) {
    switch (level) {
        case "BEGINNER":
            gLevel.size = 4;
            gLevel.mines = 2;
            break;
        case "MEDIUM":
            gLevel.size = 8;
            gLevel.mines = 12;
            break;
        case "EXPERT":
            gLevel.size = 12;
            gLevel.mines = 30;
            break;
    }
    initGame();
}



function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: setMinesNegsCount(i, j, board),
                isShown: false,
                isMine: false,
                isMarked: false
            }
            // if (i === 1 && j === 1) board[i][j].isMine = true
            // if (i === 2 && j === 2) board[i][j].isMine = true
        }
    }
    for (var i = 0; i < gLevel.mines; i++) {
        var row = getRandomInt(0, gLevel.size);
        var col = getRandomInt(0, gLevel.size);
        board[row][col].isMine = true
    }
    return board;
}


function renderBoard(board) {
    var strHTML = ``;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = `cell-${i}-${j}`;
            if (cell.isMine) cell.minesAroundCount = MINE;
            strHTML += `<td class="cell ${className}" onclick="cellClicked(this,${i}, ${j})"></td>`
        }
        strHTML += `</tr>`
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}


function setMinesNegsCount(cellI, cellJ, board) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

function cellClicked(board, i, j) {
    board[i][j].isShown = true;
}

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
// }

