'use strict'

var MINE = '💣';
var NORMAL = '😀';
var LOSE = '🤯';
var WIN = '😎';
var FLAG = '🚩';

var gBoard;
var cellClickedCount = 0;

var gLevel = {
    size: 4,
    mines: 2
}


function initGame() {
    gBoard = buildBoard();
    console.table(gBoard)
    renderBoard(gBoard)
    closeGameOverModal()
    var elEmoji = document.querySelector('.emoji')
    elEmoji.innerText = NORMAL;
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
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    for (var k = 0; k < gLevel.mines; k++) {
        board[getRandomInt(1, gLevel.size)][getRandomInt(1, gLevel.size)].isMine = true
    }
    updateNegs(board)
    return board;
}


function renderBoard(board) {
    var strHTML = ``;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = `cell-${i}-${j}`;
            strHTML += `<td class="cell ${className}" onclick="cellClicked(this,${i}, ${j})" oncontextmenu="cellMarked(this,${i}, ${j})"></td>`
        }
        strHTML += `</tr>`
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

function updateNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(i, j, board)
        }
    }
}

function setMinesNegsCount(cellI, cellJ, board) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine === true) count++;
        }
    }
    return count;
}


function cellClicked(elCell, i, j) {
    cellClickedCount++;
    // if (cellClickedCount === 1) {
    //     var sec = 0;
    //     function pad(val) { return val > 9 ? val : "0" + val; }
    //     setInterval(function () {
    //         document.getElementById("seconds").innerHTML = pad(++sec % 60);
    //         document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    //     }, 1000);
    // }
    // if (cellClickedCount === (gLevel.size ** 2) - (gLevel.size - 2)) {
    //     openWinModal();
    //     var elEmoji = document.querySelector('.emoji')
    //     elEmoji.innerText = WIN;
    // }
    var currCell = gBoard[i][j];
    currCell.isShown = true;
    if (currCell.isMine) {
        openGameOverModal();
        var elEmoji = document.querySelector('.emoji')
        elEmoji.innerText = LOSE;
    }
    if (currCell.minesAroundCount == 0) elCell.style.backgroundColor = 'rgb(253, 187, 110';
    if (!currCell.isMine) {
        if (currCell.minesAroundCount == 1) elCell.innerText = '1';
        if (currCell.minesAroundCount == 2) elCell.innerText = '2';
        if (currCell.minesAroundCount == 3) elCell.innerText = '3';
        if (currCell.minesAroundCount == 4) elCell.innerText = '4';
        if (currCell.minesAroundCount == 5) elCell.innerText = '5';
        if (currCell.minesAroundCount == 6) elCell.innerText = '6';
        if (currCell.minesAroundCount == 7) elCell.innerText = '7';
        if (currCell.minesAroundCount == 8) elCell.innerText = '8';
    }
}

function cellMarked(elCell, i, j) {
    var currCell = gBoard[i][j];
    currCell.isMarked = true;
    elCell.innerText = FLAG;
}


function openGameOverModal() {
    var elGameOverModal = document.querySelector('.gameOverModal');
    elGameOverModal.style.display = 'block';
}

function closeGameOverModal() {
    var elGameOverModal = document.querySelector('.gameOverModal');
    elGameOverModal.style.display = 'none';
}

function openWinModal() {
    var elWinModal = document.querySelector('.winModal');
    elWinModal.style.display = 'block';
}

function closeWinModal() {
    var elWinModal = document.querySelector('.winModal');
    elWinModal.style.display = 'none';
}