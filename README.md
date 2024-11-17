# Tic Tac Toe Game

A modern implementation of the classic Tic Tac Toe game, featuring an AI opponent with multiple difficulty levels and persistent score tracking.

## Features

- 🎮 Single-player gameplay against AI
- 🤖 Three AI difficulty levels (Easy, Medium, Hard)
- 📊 Persistent score tracking
- 🎯 Smart AI moves with strategic decision making
- 🎨 Seven beautiful theme options with dynamic gradients
- ✨ Victory animations and effects
- 🧪 Comprehensive test coverage with unit, property-based, and E2E tests

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
│   ├── styles.css      # Game styling and themes
│   ├── script.js       # UI and game controls
│   └── gameLogic.js    # Core game logic
├── test/               # Unit and property-based tests
│   ├── gameLogic.test.js       # Game logic unit tests
│   └── gameLogic.property.test.js  # Property-based tests
├── e2e-tests/          # End-to-end tests
│   ├── tests/          # Test specs
│   │   ├── game.spec.js    # Game flow tests
│   │   └── theme.spec.js   # Theme system tests
│   ├── playwright.config.js  # Playwright configuration
│   └── package.json    # E2E test dependencies
├── jest.config.js      # Jest configuration for unit tests
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

The project includes unit tests, property-based tests, and end-to-end tests. All tests can be run from the project root directory:

#### Unit and Property-Based Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Our testing strategy includes:
- **Unit Tests**: Traditional unit tests for core game logic
- **Property-Based Tests**: Automated test generation for edge cases
- **End-to-End Tests**: Cross-browser testing of user interactions and game flows
  - Game functionality (moves, wins, resets)
  - Theme system (selection, persistence, appearance)
  - Browser compatibility (Chromium, Firefox, WebKit)
- **Test Coverage**: Comprehensive testing of game mechanics

#### End-to-End Tests
```bash
# Run all e2e tests headlessly
npm run test:e2e

# Run e2e tests with visible browser
npm run test:e2e:headed

# Run e2e tests with Playwright UI mode
npm run test:e2e:ui

# View e2e test reports
npm run test:e2e:report
```

The E2E test suite uses Playwright to verify the application works correctly across different browsers and user scenarios:

- **Game Flow Tests** (`game.spec.js`):
  - Board interaction and move validation
  - AI opponent behavior at different difficulty levels
  - Score tracking and persistence
  - Game reset functionality
  - Player symbol selection
  - Win/draw detection

- **Theme System Tests** (`theme.spec.js`):
  - Theme selection and switching
  - Theme persistence across sessions
  - Visual appearance verification
  - Color scheme application
  - UI element styling

Tests run automatically on Chromium, Firefox, and WebKit to ensure consistent behavior across all major browser engines.

## Themes

The game features seven carefully crafted themes that provide different visual experiences, each with dynamic complementary color gradients:

1. 🍂 **Autumn Warmth** - A cozy theme transitioning from warm orange to muted purple
2. 🌅 **Desert Sunset** - Vibrant coral fading into cool blue tones
3. ☕ **Coffee House** - Rich brown blending into refreshing teal
4. 🌸 **Cherry Blossom** - Soft pink flowing into light spring green
5. 🌊 **Ocean Depths** - Deep teal merging with warm golden tones
6. 🌲 **Forest Mist** - Forest green transitioning to deep rose
7. 💜 **Lavender Dreams** - Cool purple harmonizing with warm beige
8. 🌙 **Moonlight** - Cool blue-gray blending into warm brown

Each theme features:
- Complementary color gradients for dynamic backgrounds
- Harmonious mid-tones for smooth transitions
- Carefully selected UI element colors for consistency
- High contrast ratios for optimal readability
- Persistent theme selection across sessions

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
- Edge cases and boundary conditions
- Player switching logic
- Game state management

#### Property-Based Tests
- Board state validation
- Move sequence generation
- Win condition verification
- Draw detection
- AI move validation
- Game state transitions

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
- Uses Jest for unit and property-based testing
- Uses Playwright for end-to-end testing
- Implements the minimax algorithm for AI moves
