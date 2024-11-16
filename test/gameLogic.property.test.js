const fc = require('fast-check');
const TicTacToeGame = require('../src/gameLogic');

describe('Tic Tac Toe Property-Based Tests', () => {
    test('AI moves are always valid', () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer(0, 8), { minLength: 0, maxLength: 9 }),
                fc.oneof(fc.constant('easy'), fc.constant('medium'), fc.constant('hard')),
                (moves, difficulty) => {
                    const game = new TicTacToeGame();
                    
                    // Make the moves
                    moves.forEach(move => {
                        if (game.isValidMove(move)) {
                            game.makeMove(move);
                        }
                    });

                    // Check AI move
                    if (!game.isBoardFull() && game.isGameActive) {
                        const aiMove = game.getBestMove(difficulty);
                        if (aiMove !== -1) {
                            expect(game.isValidMove(aiMove)).toBe(true);
                        }
                    }
                }
            )
        );
    });
});

describe('Tic Tac Toe Boundary Tests', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame();
    });

    test('Full board handling', () => {
        // X O X
        // X O O
        // O X X
        const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
        moves.forEach(move => {
            game.makeMove(move);
        });

        expect(game.isBoardFull()).toBe(true);
        expect(game.isValidMove(4)).toBe(false);
        expect(() => game.getBestMove('hard')).not.toThrow();
    });

    test('Win detection edge cases', () => {
        // Test horizontal win
        const winningGame = new TicTacToeGame();
        const winningMoves = [0, 3, 1, 4, 2];
        winningMoves.forEach(move => {
            winningGame.makeMove(move);
        });
        expect(winningGame.checkWinner()).toBe('X');

        // Test draw
        const drawGame = new TicTacToeGame();
        // X O X
        // X O O
        // O X X
        const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
        drawMoves.forEach(move => {
            drawGame.makeMove(move);
        });
        expect(drawGame.checkWinner()).toBe('draw');
    });
});
