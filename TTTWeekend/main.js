let x = 1;
const creationOfDivs = document.querySelector('body');
while (x <= 9) {
    const createdDivs = document.createElement('div');
    createdDivs.classList.add('tile' + x);
    createdDivs.innerText = "";
    creationOfDivs.appendChild(createdDivs);
    x++;
}



//To create turns for each player
const headingElement = document.querySelector('.heading');
let playerTurn = "Player 1's Turn";

//Changing of the grid box's element & changing of turn
document.addEventListener('click',handleTileClick);
function handleTileClick(event) {
    const eventTarget = event.target;
    if (eventTarget.classList[0].startsWith('tile') && playerTurn == "Player 1's Turn") {
        let className = eventTarget.classList[0];
        eventTarget.innerHTML = '<div class = "${className}">X</div>';
        headingElement.innerText = "Player 2's Turn";
        playerTurn = "Player 2's Turn";
    } else if (eventTarget.classList[0].startsWith('tile') && playerTurn == "Player 2's Turn") {
        let className = eventTarget.classList[0];
        eventTarget.innerHTML = '<div class = "${className}">O</div>';
        headingElement.innerText = "Player 1's Turn";
        playerTurn = "Player 1's Turn";
    }

    if (checkCondition('X')) {
        headingElement.innerText = "Player 1 Wins!";
        headingElement.style.fontSize = '30px'
        removeListener();
        resetButton.addEventListener('click',allowReset);
    } else if (checkCondition('O')) {
        headingElement.innerText = 'Player 2 Wins!';
        headingElement.style.fontSize = '30px'
        removeListener();
        resetButton.addEventListener('click',allowReset);
    }
};

//Removal of eventlistener after there is a winner
function removeListener() {
    document.removeEventListener('click',handleTileClick);
}


//Checking win condition
const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
//select the tiles
const grids = document.querySelectorAll('[class^="tile"]');

function checkCondition (playerLegend) {
    for (const combinations of winningCombinations) {
        const [a,b,c] = combinations;
        const tile1 = grids[a].textContent;
        const tile2 = grids[b].textContent;
        const tile3 = grids[c].textContent;

        if(tile1 == playerLegend && tile2 == playerLegend && tile3 == playerLegend) {
            return true;
        }
    }
    return false;
}

// Add reset function
// [class^="tile"'] selects all classes that starts with "tile"
const resetButton = document.querySelector('.button');
function allowReset() {
    grids.forEach(tile => {
        tile.innerHTML = '';
    });
    playerTurn = "Player 1's Turn"
    headingElement.innerText = "Player 1's Turn"
    headingElement.style.fontSize = '20px'
    resetButton.innerText = "Play Again!";
    document.addEventListener('click',handleTileClick);
    removeReset();
};

// remove reset function
function removeReset() {
    resetButton.removeEventListener('click',allowReset);
}
