const TicTacToeGame = require('../src/gameLogic');

describe('TicTacToeGame', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame();
    });

    describe('Game Initialization', () => {
        test('should start with empty board', () => {
            const { board } = game.getGameState();
            expect(board.every(cell => cell === '')).toBe(true);
        });

        test('should start with player X', () => {
            expect(game.getGameState().currentPlayer).toBe('X');
        });

        test('should start with active game state', () => {
            expect(game.getGameState().isGameActive).toBe(true);
        });
    });

    describe('Making Moves', () => {
        test('should allow valid moves', () => {
            expect(game.makeMove(0)).toBe(true);
            expect(game.getGameState().board[0]).toBe('X');
        });

        test('should not allow moves on occupied cells', () => {
            game.makeMove(0);
            expect(game.makeMove(0)).toBe(false);
        });

        test('should not allow moves outside the board', () => {
            expect(game.makeMove(9)).toBe(false);
            expect(game.makeMove(-1)).toBe(false);
        });
    });

    describe('Win Detection', () => {
        test('should detect horizontal win', () => {
            game.makeMove(0); // X
            game.switchPlayer();
            game.makeMove(3); // O
            game.switchPlayer();
            game.makeMove(1); // X
            game.switchPlayer();
            game.makeMove(4); // O
            game.switchPlayer();
            game.makeMove(2); // X
            expect(game.checkWinner()).toBe('X');
        });

        test('should detect vertical win', () => {
            game.makeMove(0); // X
            game.switchPlayer();
            game.makeMove(1); // O
            game.switchPlayer();
            game.makeMove(3); // X
            game.switchPlayer();
            game.makeMove(4); // O
            game.switchPlayer();
            game.makeMove(6); // X
            expect(game.checkWinner()).toBe('X');
        });

        test('should detect diagonal win', () => {
            game.makeMove(0); // X
            game.switchPlayer();
            game.makeMove(1); // O
            game.switchPlayer();
            game.makeMove(4); // X
            game.switchPlayer();
            game.makeMove(2); // O
            game.switchPlayer();
            game.makeMove(8); // X
            expect(game.checkWinner()).toBe('X');
        });

        test('should detect draw', () => {
            // Fill board without winning
            const moves = [0, 1, 2, 4, 3, 6, 5, 8, 7];
            moves.forEach(move => {
                game.makeMove(move);
                game.switchPlayer();
            });
            expect(game.checkWinner()).toBe('draw');
        });
    });

    describe('AI Moves', () => {
        test('should block winning moves', () => {
            // Create a scenario where X can win
            game.makeMove(0); // X
            game.switchPlayer();
            game.makeMove(4); // O
            game.switchPlayer();
            game.makeMove(1); // X
            
            // AI should block position 2
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(2);
        });

        test('should take winning moves when available', () => {
            // Set up a winning opportunity for O
            game.gameState = ['O', 'O', '', '', '', '', '', '', ''];
            game.currentPlayer = 'O';
            
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(2);
        });

        test('should prefer center when available', () => {
            const aiMove = game.getBestMove('hard');
            expect(aiMove).toBe(4);
        });
    });
});
