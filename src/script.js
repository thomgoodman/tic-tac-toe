/**
 * Tic Tac Toe Game Implementation
 * 
 * A modern implementation of the classic Tic Tac Toe game featuring:
 * - Single player gameplay against AI
 * - Multiple difficulty levels
 * - Theme customization
 * - Score tracking
 * - Responsive design
 */

// Game state constants
const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Game state variables
let currentBoard = Array(9).fill(EMPTY);
let isGameActive = true;
let scores = { X: 0, O: 0, Tie: 0 };

// DOM Elements
const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset-button');
const resetScoreButton = document.getElementById('reset-score');
const messageElement = document.getElementById('message');
const playerSymbolSelect = document.getElementById('player-symbol');
const difficultySelect = document.getElementById('difficulty');
const scoreElements = {
    X: document.getElementById('score-x'),
    O: document.getElementById('score-o'),
    Tie: document.getElementById('score-tie')
};

/**
 * Initializes the game board and sets up event listeners.
 * This is called when the page loads and after each game reset.
 */
function initializeBoard() {
    currentBoard = Array(9).fill(EMPTY);
    isGameActive = true;
    cells.forEach(cell => {
        cell.textContent = EMPTY;
        cell.classList.remove('winner', 'x', 'o');
    });
    updateMessage('Your turn!');
}

/**
 * Handles a player's move.
 * @param {number} index - The index of the cell where the move was made
 * @returns {boolean} - Whether the move was valid and successful
 */
function handlePlayerMove(index) {
    if (!isGameActive || currentBoard[index] !== EMPTY) {
        return false;
    }

    const playerSymbol = playerSymbolSelect.value;
    makeMove(index, playerSymbol);
    
    if (!checkGameEnd(playerSymbol)) {
        handleAIMove();
    }
    return true;
}

/**
 * Makes a move on the board.
 * @param {number} index - The cell index
 * @param {string} symbol - The player symbol (X or O)
 */
function makeMove(index, symbol) {
    currentBoard[index] = symbol;
    cells[index].textContent = symbol;
    cells[index].classList.add(symbol.toLowerCase());
}

/**
 * Handles the AI's move based on the selected difficulty level.
 */
function handleAIMove() {
    const aiSymbol = playerSymbolSelect.value === PLAYER_X ? PLAYER_O : PLAYER_X;
    const difficulty = difficultySelect.value;
    
    // Delay AI move for better UX
    setTimeout(() => {
        const move = calculateAIMove(difficulty, aiSymbol);
        if (move !== -1) {
            makeMove(move, aiSymbol);
            checkGameEnd(aiSymbol);
        }
    }, 200);
}

/**
 * Calculates the best move for the AI based on difficulty.
 * @param {string} difficulty - The selected difficulty level
 * @param {string} aiSymbol - The AI's symbol (X or O)
 * @returns {number} - The chosen cell index
 */
function calculateAIMove(difficulty, aiSymbol) {
    const emptyCells = currentBoard.reduce((acc, cell, index) => 
        cell === EMPTY ? [...acc, index] : acc, []);
    
    if (emptyCells.length === 0) return -1;

    switch(difficulty) {
        case 'hard':
            return calculateBestMove(aiSymbol);
        case 'medium':
            return Math.random() < 0.7 ? 
                calculateBestMove(aiSymbol) : 
                emptyCells[Math.floor(Math.random() * emptyCells.length)];
        default: // easy
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
}

/**
 * Implements the minimax algorithm for unbeatable AI moves.
 * @param {string} aiSymbol - The AI's symbol
 * @returns {number} - The optimal cell index
 */
function calculateBestMove(aiSymbol) {
    let bestScore = -Infinity;
    let bestMove = 0;
    const playerSymbol = aiSymbol === PLAYER_X ? PLAYER_O : PLAYER_X;

    for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === EMPTY) {
            currentBoard[i] = aiSymbol;
            const score = minimax(currentBoard, 0, false, playerSymbol, aiSymbol);
            currentBoard[i] = EMPTY;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

/**
 * Minimax algorithm implementation for AI decision making.
 * @param {Array} board - Current game board state
 * @param {number} depth - Current depth in the game tree
 * @param {boolean} isMaximizing - Whether to maximize or minimize score
 * @param {string} playerSymbol - Human player's symbol
 * @param {string} aiSymbol - AI's symbol
 * @returns {number} - The evaluated score for this board state
 */
function minimax(board, depth, isMaximizing, playerSymbol, aiSymbol) {
    const winner = checkWinner(board);
    if (winner === aiSymbol) return 10 - depth;
    if (winner === playerSymbol) return depth - 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let maxScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === EMPTY) {
                board[i] = aiSymbol;
                maxScore = Math.max(maxScore, minimax(board, depth + 1, false, playerSymbol, aiSymbol));
                board[i] = EMPTY;
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === EMPTY) {
                board[i] = playerSymbol;
                minScore = Math.min(minScore, minimax(board, depth + 1, true, playerSymbol, aiSymbol));
                board[i] = EMPTY;
            }
        }
        return minScore;
    }
}

/**
 * Checks if the game has ended after a move.
 * @param {string} symbol - The symbol of the last move
 * @returns {boolean} - Whether the game has ended
 */
function checkGameEnd(symbol) {
    const winner = checkWinner(currentBoard);
    if (winner) {
        handleWin(winner);
        return true;
    }
    if (isBoardFull(currentBoard)) {
        handleTie();
        return true;
    }
    return false;
}

/**
 * Checks if there's a winner on the board.
 * @param {Array} board - The current board state
 * @returns {string|null} - The winning symbol or null
 */
function checkWinner(board) {
    for (const combo of WINNING_COMBINATIONS) {
        if (board[combo[0]] !== EMPTY &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[1]] === board[combo[2]]) {
            return board[combo[0]];
        }
    }
    return null;
}

/**
 * Checks if the board is full (tie game).
 * @param {Array} board - The current board state
 * @returns {boolean} - Whether the board is full
 */
function isBoardFull(board) {
    return !board.includes(EMPTY);
}

/**
 * Handles a win condition.
 * @param {string} winner - The winning symbol
 */
function handleWin(winner) {
    isGameActive = false;
    scores[winner]++;
    updateScores();
    highlightWinningCombination(winner);
    updateMessage(`${winner} wins!`);
}

/**
 * Handles a tie game condition.
 */
function handleTie() {
    isGameActive = false;
    scores.Tie++;
    updateScores();
    updateMessage("It's a tie!");
}

/**
 * Updates the score display.
 */
function updateScores() {
    Object.entries(scores).forEach(([key, value]) => {
        scoreElements[key].textContent = value;
        scoreElements[key].classList.add('updated');
        setTimeout(() => scoreElements[key].classList.remove('updated'), 300);
    });
}

/**
 * Updates the game status message.
 * @param {string} message - The message to display
 */
function updateMessage(message) {
    messageElement.textContent = message;
}

/**
 * Highlights the winning combination on the board.
 * @param {string} winner - The winning symbol
 */
function highlightWinningCombination(winner) {
    for (const combo of WINNING_COMBINATIONS) {
        if (currentBoard[combo[0]] === winner &&
            currentBoard[combo[1]] === winner &&
            currentBoard[combo[2]] === winner) {
            combo.forEach(index => cells[index].classList.add('winner'));
            break;
        }
    }
}

/**
 * Theme Management System
 * Handles theme selection, persistence, and application.
 * Themes are stored in localStorage to maintain user preferences across sessions.
 */

// Theme-related constants
const THEME_STORAGE_KEY = 'selectedTheme';
const DEFAULT_THEME = 'autumn';

/**
 * Initializes the theme system by:
 * 1. Loading the previously selected theme from localStorage
 * 2. Applying the theme to the document
 * 3. Setting up theme change event listeners
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('color-scheme').value = savedTheme;
}

/**
 * Handles theme changes when user selects a new theme.
 * Applies the theme and saves it to localStorage for persistence.
 * @param {Event} event - The change event from the theme selector
 */
function handleThemeChange(event) {
    const selectedTheme = event.target.value;
    document.body.setAttribute('data-theme', selectedTheme);
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
}

// Event Listeners
resetButton.addEventListener('click', resetGame);
playerSymbolSelect.addEventListener('change', resetGame);
difficultySelect.addEventListener('change', () => {
    if (!isGameActive) resetGame();
});
resetScoreButton.addEventListener('click', () => {
    scores = { X: 0, O: 0, Tie: 0 };
    updateScores();
});
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handlePlayerMove(index));
});
document.getElementById('color-scheme').addEventListener('change', handleThemeChange);

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeBoard();
});

/**
 * Resets the game state and UI.
 */
function resetGame() {
    isGameActive = true;
    currentBoard = Array(9).fill(EMPTY);
    cells.forEach(cell => {
        cell.textContent = EMPTY;
        cell.classList.remove('winner', 'x', 'o');
    });
    updateMessage('Your turn!');
}
