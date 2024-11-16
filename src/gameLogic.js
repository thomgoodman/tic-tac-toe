class TicTacToeGame {
    constructor() {
        this.reset();
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    }

    reset() {
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.isGameActive = true;
    }

    makeMove(index) {
        if (!this.isValidMove(index)) {
            return false;
        }

        this.gameState[index] = this.currentPlayer;
        return true;
    }

    isValidMove(index) {
        return this.isGameActive && 
               index >= 0 && 
               index < 9 && 
               this.gameState[index] === '';
    }

    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.gameState[a] && 
                this.gameState[a] === this.gameState[b] && 
                this.gameState[a] === this.gameState[c]) {
                this.isGameActive = false;
                return this.gameState[a];
            }
        }

        if (this.isBoardFull()) {
            this.isGameActive = false;
            return 'draw';
        }

        return null;
    }

    isBoardFull() {
        return !this.gameState.includes('');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    getBestMove(difficulty = 'hard') {
        if (difficulty === 'easy') {
            return Math.random() < 0.3 ? this.calculateBestMove() : this.getRandomMove();
        } else if (difficulty === 'medium') {
            return Math.random() < 0.7 ? this.calculateBestMove() : this.getRandomMove();
        }
        return this.calculateBestMove();
    }

    calculateBestMove() {
        // First, check if AI can win in the next move
        for (let i = 0; i < this.gameState.length; i++) {
            if (this.gameState[i] === '') {
                this.gameState[i] = 'O';
                if (this.checkWinner() === 'O') {
                    this.gameState[i] = '';
                    return i;
                }
                this.gameState[i] = '';
            }
        }
        
        // Check if player can win in their next move and block them
        for (let i = 0; i < this.gameState.length; i++) {
            if (this.gameState[i] === '') {
                this.gameState[i] = 'X';
                if (this.checkWinner() === 'X') {
                    this.gameState[i] = '';
                    return i;
                }
                this.gameState[i] = '';
            }
        }
        
        // Try to take center
        if (this.gameState[4] === '') return 4;
        
        // Try to take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.gameState[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        return this.getRandomMove();
    }

    getRandomMove() {
        const availableMoves = this.gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getGameState() {
        return {
            board: [...this.gameState],
            currentPlayer: this.currentPlayer,
            isGameActive: this.isGameActive
        };
    }
}

module.exports = TicTacToeGame;
