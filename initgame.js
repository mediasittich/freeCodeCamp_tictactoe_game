let markers = document.querySelectorAll('.markers');
let playerMarkers = [];
const playBtn = document.getElementById('startGameBtn');

function initGame() {
    markers.forEach(marker => marker.addEventListener('click', handler, false));
}

function handler(event) {
    event.preventDefault();
    let marker = this;
    selectMarker(marker, event);
}

function selectMarker(marker, event) {
    houseLabel = marker;
    houseInput = marker.childNodes[1];
    houseName = marker.childNodes[1].value;

    houseInput.checked = true;
    houseLabel.classList.add('disabled');
    houseLabel.removeEventListener('click', handler, false);

    collectMarkers(houseName);
}

function collectMarkers(marker) {
    let playerNum = document.getElementById('playerNum');
    let contestants = document.getElementById('contestants');

    if (playerMarkers.length < 1) {
        playerNum.textContent = '1';
        playerMarkers.push(marker);
        playerNum.textContent = '2';
    } else if (playerMarkers.length == 1) {
        playerMarkers.push(marker);
        contestants.childNodes[1].textContent = playerMarkers[0].charAt(0).toUpperCase() + playerMarkers[0].slice(1);
        contestants.childNodes[5].textContent = playerMarkers[1].charAt(0).toUpperCase() + playerMarkers[1].slice(1);
        contestants.style.visibility = 'visible';

        markers.forEach(function(marker) {
            marker.removeEventListener('click', handler, false);
            marker.childNodes[1].disabled = true;
            marker.style.cursor = 'default';
        });

        playBtn.classList.add('btn-active');
        playBtn.disabled = false;
        playBtn.addEventListener('click', startGame);
    }
}

initGame();