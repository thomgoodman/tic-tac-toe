const TicTacToeGame = require('../src/gameLogic');

describe('TicTacToeGame', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame();
    });

    describe('Game Initialization', () => {
        test('should initialize with empty board', () => {
            const state = game.getGameState();
            expect(state.board.length).toBe(9);
            expect(state.board.every(cell => cell === '')).toBe(true);
            expect(state.currentPlayer).toBe('X');
            expect(state.isGameActive).toBe(true);
        });
    });

    describe('Move Validation', () => {
        test('should validate moves correctly', () => {
            expect(game.isValidMove(0)).toBe(true);
            game.makeMove(0);
            expect(game.isValidMove(0)).toBe(false);
            expect(game.isValidMove(-1)).toBe(false);
            expect(game.isValidMove(9)).toBe(false);
        });

        test('should handle invalid move types', () => {
            expect(game.isValidMove('string')).toBe(false);
            expect(game.isValidMove(null)).toBe(false);
            expect(game.isValidMove(undefined)).toBe(false);
            expect(game.isValidMove({})).toBe(false);
            expect(game.isValidMove([])).toBe(false);
        });
    });

    describe('Game Play', () => {
        test('should make moves and switch players', () => {
            game.makeMove(0);
            let state = game.getGameState();
            expect(state.board[0]).toBe('X');
            expect(state.currentPlayer).toBe('O');

            game.makeMove(1);
            state = game.getGameState();
            expect(state.board[1]).toBe('O');
            expect(state.currentPlayer).toBe('X');
        });

        test('should detect horizontal win', () => {
            [0, 3, 1, 4, 2].forEach(move => game.makeMove(move));
            expect(game.checkWinner()).toBe('X');
            expect(game.isGameActive).toBe(false);
        });

        test('should detect vertical win', () => {
            [0, 1, 3, 4, 6].forEach(move => game.makeMove(move));
            expect(game.checkWinner()).toBe('X');
            expect(game.isGameActive).toBe(false);
        });

        test('should detect diagonal win', () => {
            [0, 1, 4, 2, 8].forEach(move => game.makeMove(move));
            expect(game.checkWinner()).toBe('X');
            expect(game.isGameActive).toBe(false);
        });

        test('should detect draw', () => {
            // X O X
            // X O O
            // O X X
            const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
            moves.forEach(move => game.makeMove(move));
            expect(game.checkWinner()).toBe('draw');
            expect(game.isGameActive).toBe(false);
        });
    });

    describe('AI Moves', () => {
        test('should generate valid moves for all difficulties', () => {
            ['easy', 'medium', 'hard'].forEach(difficulty => {
                const move = game.getBestMove(difficulty);
                expect(move).toBeGreaterThanOrEqual(0);
                expect(move).toBeLessThanOrEqual(8);
                expect(game.isValidMove(move)).toBe(true);
            });
        });

        test('should block opponent winning move in hard mode', () => {
            // Set up a scenario where O needs to block X from winning
            [0, 4, 1].forEach(move => game.makeMove(move));
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(2); // Block X's winning move
        });

        test('should take winning move when available in hard mode', () => {
            // Set up a scenario where O can win
            game.makeMove(0); // X
            game.makeMove(3); // O
            game.makeMove(1); // X
            game.makeMove(4); // O
            game.makeMove(8); // X
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(5); // O should take the winning move
        });

        test('should prefer center in hard mode when available', () => {
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(4); // Center position
        });
    });

    describe('Game State Management', () => {
        test('should track game state correctly', () => {
            // Make non-winning moves
            const moves = [0, 3, 1, 4];
            moves.forEach(move => {
                const currentPlayer = game.currentPlayer;
                game.makeMove(move);
                const state = game.getGameState();
                expect(state.board[move]).toBe(currentPlayer);
                expect(state.isGameActive).toBe(true);
            });
        });

        test('should handle board full condition', () => {
            // X O X
            // X O O
            // O X X
            const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
            moves.forEach(move => game.makeMove(move));
            expect(game.isBoardFull()).toBe(true);
            expect(game.isGameActive).toBe(false);
        });
    });
});
