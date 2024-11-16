const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const resetHistoryButton = document.getElementById('reset-history');
const difficultySelect = document.getElementById('difficulty');
const playerSymbolSelect = document.getElementById('player-symbol');
const winsElement = document.getElementById('wins');
const lossesElement = document.getElementById('losses');
const drawsElement = document.getElementById('draws');

let gameState = ['', '', '', '', '', '', '', '', ''];
let playerSymbol = 'X';
let aiSymbol = 'O';
let isGameActive = true;
let scores = {
    wins: 0,
    losses: 0,
    draws: 0
};

// Load scores from localStorage if available
if (localStorage.getItem('tictactoeScores')) {
    scores = JSON.parse(localStorage.getItem('tictactoeScores'));
    updateScoreDisplay();
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (gameState[index] !== '' || !isGameActive) return;
    
    makeMove(index, playerSymbol);
    
    if (checkWinner()) {
        const winningCombo = getWinningCombination();
        highlightWinningCombination(winningCombo);
        message.textContent = 'You win!';
        isGameActive = false;
        board.classList.add('celebrate');
        createConfetti();
        updateScores('wins');
        return;
    }
    
    if (isBoardFull()) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        updateScores('draws');
        return;
    }
    
    setTimeout(makeAIMove, 500);
}

function makeMove(index, symbol) {
    gameState[index] = symbol;
    const cell = board.children[index];
    cell.textContent = symbol;
    cell.setAttribute('data-player', symbol);
    cell.classList.add('pop');
}

function makeAIMove() {
    if (!isGameActive) return;
    
    const difficulty = difficultySelect.value;
    let move;
    
    switch(difficulty) {
        case 'hard':
            move = getBestMove();
            break;
        case 'medium':
            move = Math.random() < 0.7 ? getBestMove() : getRandomMove();
            break;
        case 'easy':
            move = Math.random() < 0.3 ? getBestMove() : getRandomMove();
            break;
    }
    
    makeMove(move, aiSymbol);
    
    if (checkWinner()) {
        const winningCombo = getWinningCombination();
        highlightWinningCombination(winningCombo);
        message.textContent = 'AI wins!';
        isGameActive = false;
        board.classList.add('shake');
        updateScores('losses');
        return;
    }
    
    if (isBoardFull()) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        updateScores('draws');
        return;
    }
    
    message.textContent = 'Your turn';
}

function getBestMove() {
    // First, check if AI can win in the next move
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            gameState[i] = aiSymbol;
            if (checkWinner()) {
                gameState[i] = '';
                return i;
            }
            gameState[i] = '';
        }
    }
    
    // Check if player can win in their next move and block them
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            gameState[i] = playerSymbol;
            if (checkWinner()) {
                gameState[i] = '';
                return i;
            }
            gameState[i] = '';
        }
    }
    
    // Try to take center
    if (gameState[4] === '') return 4;
    
    // Try to take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => gameState[corner] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available edge
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(edge => gameState[edge] === '');
    if (availableEdges.length > 0) {
        return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }
    
    return getRandomMove();
}

function getRandomMove() {
    const availableMoves = gameState
        .map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && 
               gameState[a] === gameState[b] && 
               gameState[a] === gameState[c];
    });
}

function getWinningCombination() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && 
            gameState[a] === gameState[b] && 
            gameState[a] === gameState[c]) {
            return combination;
        }
    }
    return null;
}

function isBoardFull() {
    return !gameState.includes('');
}

function createConfetti() {
    const colors = ['#ff0', '#f0f', '#0ff', '#0f0'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        board.children[index].classList.add('winner');
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-player');
        cell.classList.remove('pop', 'winner');
    });
    
    board.classList.remove('shake', 'celebrate');
    
    playerSymbol = playerSymbolSelect.value;
    aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
    
    message.textContent = playerSymbol === 'X' ? 'Your turn' : 'AI thinking...';
    
    if (playerSymbol === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function updateScores(result) {
    const scoreElement = document.getElementById(result);
    scores[result]++;
    scoreElement.textContent = scores[result];
    scoreElement.classList.add('updated');
    setTimeout(() => scoreElement.classList.remove('updated'), 300);
    
    // Save scores to localStorage
    localStorage.setItem('tictactoeScores', JSON.stringify(scores));
}

function updateScoreDisplay() {
    winsElement.textContent = scores.wins;
    lossesElement.textContent = scores.losses;
    drawsElement.textContent = scores.draws;
}

function resetScores() {
    scores = { wins: 0, losses: 0, draws: 0 };
    localStorage.setItem('tictactoeScores', JSON.stringify(scores));
    updateScoreDisplay();
    
    // Add temporary highlight to the scoreboard
    const scoreElements = document.querySelectorAll('.score-value');
    scoreElements.forEach(el => {
        el.classList.add('updated');
        setTimeout(() => el.classList.remove('updated'), 300);
    });
}

// Event Listeners
resetButton.addEventListener('click', resetGame);
playerSymbolSelect.addEventListener('change', resetGame);
difficultySelect.addEventListener('change', () => {
    if (isGameActive) {
        message.textContent = `Difficulty changed to ${difficultySelect.value}`;
    }
});

resetHistoryButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all game history? This cannot be undone.')) {
        resetScores();
        message.textContent = 'Game history has been reset';
    }
});

// Initialize the game
createBoard();
resetGame();
