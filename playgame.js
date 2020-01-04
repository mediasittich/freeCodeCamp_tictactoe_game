const settingsView = document.getElementById('settings');
const gameView = document.getElementById('game');
const player1Label = document.getElementById('player1');
const player2Label = document.getElementById('player2');
const player1Score = player1Label.childNodes[3];
const player2Score = player2Label.childNodes[3];
const modalBox = document.getElementById('modalBox');
const gameOverText = document.getElementById('gameOverText');
const boxes = document.querySelectorAll('.box');

let active, waiting;
let playerOne, playerTwo;
let scoreOne = 0;
let scoreTwo = 0;
let initBoard;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    boxes.forEach(function(box) {
        box.innerHTML = '';
        box.classList.remove('highlight');
    });
    player1Label.classList.remove('active-player');
    player2Label.classList.remove('active-player');

    settingsView.style.display = 'none';
    gameView.style.display = 'flex';

    playerOne = playerMarkers[0];
    playerTwo = playerMarkers[1];
    player1Label.childNodes[1].textContent = playerOne.charAt(0).toUpperCase() + playerOne.slice(1);
    player2Label.childNodes[1].textContent = playerTwo.charAt(0).toUpperCase() + playerTwo.slice(1);
    player1Score.textContent = scoreOne;
    player2Score.textContent = scoreTwo;

    let players = selectFirst();
    [active, waiting] = players;

    initBoard = Array.from(Array(9).keys());
    boxes.forEach(function(box) {
        box.addEventListener('click', choosePosition, false);
    });
}

function selectFirst() {
    let rdm = Math.random();

    if (rdm < 0.5) {
        active = playerOne;
        waiting = playerTwo;
        player1Label.classList.add('active-player');
    } else {
        active = playerTwo;
        waiting = playerOne;
        player2Label.classList.add('active-player');
    }
    return [active, waiting];
}

function choosePosition() {
    if (fieldEmpty(initBoard, this.dataset.box)) {
        placeMarker(this.dataset.box, active)
    } else {
        console.log('Field already taken');
    }
}

function fieldEmpty(board, position) {
    return typeof(board[position]) == 'number';
}

function placeMarker(position, player) {
    initBoard[position] = player;

    showImage(player, boxes[position]);

    let gameWon = checkForWinner(initBoard);
    if (gameWon) {
        gameOver(gameWon);
    } else if (boardFull(initBoard)) {
        showWinner("It's a tie.");
    }

    switchTurn(player);
}

function showImage(filename, boxElement) {
    let img = new Image();
    img.src = 'assets/' + filename + '.png';
    boxElement.appendChild(img);
}

function checkForWinner(board) {
    let gameWon = null;
    let winner = winningCombos.filter(function(combo) {
        return (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]])
    });

    if (winner.length > 0) {
        let winnerCombo = winner[0];
        let winnerPlayer = board[winner[0][0]];
        gameWon = [winnerCombo, winnerPlayer]
        if (gameWon[1] == player1Label.childNodes[1].innerText.toLowerCase()) {
            scoreOne++;
            player1Score.textContent = scoreOne;
        } else if (gameWon[1] == player2Label.childNodes[1].innerText.toLowerCase()) {
            scoreTwo++;
            player2Score.textContent = scoreTwo;
        }
    }
    
    return gameWon;
}

function gameOver(gameWon) {
    let winnerNumbers = gameWon[0];
    let winnerPlayer = gameWon[1];

    winnerNumbers.forEach(number => boxes[number].classList.add('highlight'));
    boxes.forEach(function(box) {
        box.removeEventListener('click', choosePosition, false);
    });

    showWinner(winnerPlayer + ' wins!');
}

function showWinner(winner) {
    modalBox.style.display = 'block';
    gameOverText.innerText = winner.charAt(0).toUpperCase() + winner.slice(1);

}

function boardFull(board) {
    return board.filter(box => typeof box == 'number').length == 0;
}

function switchTurn(player) {
    if (player === playerOne) {
        active = playerTwo;
        waiting = playerOne;
        player1Label.classList.remove('active-player');
        player2Label.classList.add('active-player');
    } else {
        active = playerOne;
        waiting = playerTwo;
        player2Label.classList.remove('active-player');
        player1Label.classList.add('active-player');
    }
    return [active, waiting];
}