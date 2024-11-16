# Tic Tac Toe

A modern implementation of the classic Tic Tac Toe game, featuring an AI opponent with multiple difficulty levels and persistent score tracking.

## Features

- 🎮 Single-player gameplay against AI
- 🤖 Three AI difficulty levels (Easy, Medium, Hard)
- 📊 Persistent score tracking
- 🎯 Smart AI moves with strategic decision making
- 🎨 Modern, responsive design
- ✨ Victory animations and effects

## Demo

To play the game:
1. Open `src/index.html` in your web browser
2. Choose your preferred difficulty level
3. Select whether to play as X (first) or O (second)
4. Click on any cell to make your move
5. Try to beat the AI!

## Project Structure

```
tic-tac-toe/
├── src/
│   ├── index.html      # Main game interface
│   ├── styles.css      # Game styling
│   ├── script.js       # UI and game controls
│   └── gameLogic.js    # Core game logic
├── test/               # Unit tests
│   └── gameLogic.test.js  # Game logic unit tests
├── e2e-tests/          # End-to-end tests
│   ├── tests/          # Test specs
│   │   └── game.spec.js   # Game flow tests
│   ├── playwright.config.js  # Playwright configuration
│   └── package.json    # E2E test dependencies
└── package.json        # Main project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   # Install main project dependencies
   npm install

   # Install e2e test dependencies
   cd e2e-tests
   npm install
   ```

### Running the Game

Simply open `src/index.html` in your web browser. No build step is required as this is a vanilla JavaScript application.

### Running Tests

The project includes both unit tests and end-to-end tests. All tests can be run from the project root directory:

#### Unit Tests
```bash
# Run unit tests once
npm test

# Run unit tests in watch mode
npm run test:watch
```

#### End-to-End Tests
```bash
# Run all e2e tests headlessly
npm run test:e2e

# Run e2e tests with visible browser
npm run test:e2e:headed

# Run e2e tests with Playwright UI mode
npm run test:e2e:ui

# Debug e2e tests
npm run test:e2e:debug

# View e2e test reports
npm run test:e2e:report
```

## Game Features

### AI Difficulty Levels

- **Easy**: Makes random moves 70% of the time
- **Medium**: Makes optimal moves 70% of the time
- **Hard**: Always makes the best possible move

### Score Tracking

- Wins, losses, and draws are tracked
- Scores persist across browser sessions
- Reset history option available

### AI Strategy

The AI uses the following strategy (in hard mode):
1. Win if possible
2. Block opponent's winning move
3. Take center if available
4. Take corners if available
5. Take any available edge

## Development

### Testing Strategy

#### Unit Tests
- Game initialization
- Move validation
- Win detection
- AI move generation
- Edge cases

#### End-to-End Tests
- Game board rendering
- Player interactions
- AI responses
- Score tracking
- Difficulty selection
- Game reset functionality
- Cross-browser compatibility (Chrome, Firefox, Safari)

### Code Organization

- `gameLogic.js`: Contains the core game logic in a modular, testable format
- `script.js`: Handles UI interactions and game flow
- `styles.css`: Contains all styling and animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Built with vanilla JavaScript, HTML, and CSS
- Uses Jest for unit testing
- Uses Playwright for end-to-end testing
- Implements the minimax algorithm for AI moves
