const playAgainBtn = document.getElementById('playAgainBtn');
const newGameBtn = document.getElementById('newGameBtn');
const closeBtn = document.getElementById('closeBtn');

// Play again
playAgainBtn.addEventListener('click', resetBoard);

function resetBoard() {
    modalBox.style.display = 'none';
    gameOverText.innerText = '';
    
    startGame();
}

// Close Modal
closeBtn.addEventListener('click', closeModal);

function closeModal() {
    modalBox.style.display = 'none';
    gameOverText.innerText = '';
}

// New Game
newGameBtn.addEventListener('click', resetGame);

function resetGame() {
    playerMarkers = [];
    scoreOne = 0;
    scoreTwo = 0;

    initGame();

    document.getElementById('contestants').childNodes[1] = '';
    document.getElementById('contestants').childNodes[5] = '';
    document.getElementById('contestants').style.visibility = 'hidden';
    gameView.style.display = 'none';
    markers.forEach(function(marker) {
        marker.childNodes[1].checked = false;
        marker.childNodes[1].disabled = false;
        marker.classList.remove('disabled');
        marker.addEventListener('click', handler, false);
        marker.style.cursor = 'pointer';
    });
    settingsView.style.display = 'block';
}