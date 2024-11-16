class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.isGameActive = true;
        this.lastMove = null;
    }

    getGameState() {
        return {
            board: [...this.board],
            currentPlayer: this.currentPlayer,
            isGameActive: this.isGameActive
        };
    }

    isValidMove(position) {
        if (typeof position !== 'number' || isNaN(position)) return false;
        if (position < 0 || position > 8) return false;
        if (!this.isGameActive) return false;
        return this.board[position] === '';
    }

    makeMove(position) {
        if (!this.isValidMove(position)) return false;
        
        // Make the move
        this.board[position] = this.currentPlayer;
        this.lastMove = this.currentPlayer;
        
        // Check if game is over
        const winner = this.checkWinner();
        if (winner || this.isBoardFull()) {
            this.isGameActive = false;
        } else {
            this.switchPlayer();
        }
        
        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Check for win
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }

        // Check for draw
        if (this.isBoardFull()) {
            return 'draw';
        }

        return null;
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    getBestMove(difficulty) {
        if (!this.isGameActive || this.isBoardFull()) return -1;

        switch (difficulty) {
            case 'easy':
                return this.getRandomMove();
            case 'medium':
                return Math.random() < 0.5 ? this.getBestMoveHard() : this.getRandomMove();
            case 'hard':
                return this.getBestMoveHard();
            default:
                return this.getRandomMove();
        }
    }

    getRandomMove() {
        const availableMoves = this.board
            .map((cell, index) => cell === '' ? index : -1)
            .filter(index => index !== -1);
        
        if (availableMoves.length === 0) return -1;
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getBestMoveHard() {
        // First, check if we can win
        const winningMove = this.findWinningMove(this.currentPlayer);
        if (winningMove !== -1) return winningMove;

        // Then, check if we need to block opponent
        const opponent = this.currentPlayer === 'X' ? 'O' : 'X';
        const blockingMove = this.findWinningMove(opponent);
        if (blockingMove !== -1) return blockingMove;

        // Take center if available
        if (this.board[4] === '') return 4;

        // Take corners if available
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(pos => this.board[pos] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Take any available edge
        const edges = [1, 3, 5, 7];
        const availableEdges = edges.filter(pos => this.board[pos] === '');
        if (availableEdges.length > 0) {
            return availableEdges[Math.floor(Math.random() * availableEdges.length)];
        }

        return this.getRandomMove();
    }

    findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const line = [this.board[a], this.board[b], this.board[c]];
            const playerCount = line.filter(cell => cell === player).length;
            const emptyCount = line.filter(cell => cell === '').length;

            if (playerCount === 2 && emptyCount === 1) {
                const moveIndex = pattern[line.findIndex(cell => cell === '')];
                if (this.isValidMove(moveIndex)) {
                    return moveIndex;
                }
            }
        }

        return -1;
    }
}

module.exports = TicTacToeGame;
