# Assignment 03: Word Guess Game (Challenge)
## [The Coding Boot Camp @ UCLA Extension](https://bootcamp.uclaextension.edu/coding/)

![Word Guess Game Demo Video](./assets/images/fsf-word-guess-game.gif "Word Guess Game Demo Video")

### Summary

The culmination of Assignment 03 is a hangman-style game for which I chose the theme of dog breeds. (I dedicate the project to the memory of my furry kid, Willy—the sweetest Boxer who ever lived. How I miss him.)

### Backend

The game engine is coded using object-oriented JavaScript (mostly ES6) and relies on an event listener to capture valid key inputs from the user. The game engine is encapsulated in a single object, `wordGame`, with the following properties:

- `name`: name of the game
- `description`: brief description of the game
- `instructions`: instructions for the user
- `gameData`: an array containing the game data, which is read from an external file—`dog-breeds.js` in this instance. (Theoretically, the game could access any word game data file.)
- `losses`: a tally of the rounds the user has lost
- `wins`: a tally of the rounds the user has won
- `resettableState`: a constructor function,based on the State Pattern, that returns the properties of the current game

The `wordGame` object contains appropriate setters and getters in addition to the following methods:

- `pickRandomWord()`: selects a word randomly from the game data (`dog-breeds.js`)
- `isLtrInWord()`: determines if the letter user guesses is in current word.
- `addGuessToList()`: adds letter user guesses to the list of letters guessed
- `getPartialWord()`: retrieves this round's random word in its current state such that all letters guessed appear in their respective places and an underscore character serves as a placeholder for all unguessed letters.
- `resetGameState()`: resets game state to prepare for a new round. This is accomplished via invoking the `resettableStateFactory()` constructor, which returns an object containing the following game state properties:

- `randomObj`: a game object, chosen randomly from the word game data file (`dog-breeds.js`), for the current round
- `randomWord`: the word property of the game object randomly chosen
- `lettersGuessed`: an array that will contain the user's guesses
- `guessesRemaining`: the number of guesses the user has remaining, which is the constant `maxGuesses` minus the number of guesses the user has made
- `gameOver`: a boolean indicating if the game is over. It defaults to `false` at the beginning of a game.

### Frontend

The frontend is built with Bootstrap and jQuery. The Inconsolata, Open Sans & Underdog fonts are served by Google Fonts, and Paletton is responsible for the color palette.

### Technologies

- Programming Languages: HTML, CSS & JavaScript (ES6)
- APIs/Frameworks/Libraries: [Bootstrap](https://getbootstrap.com/), [jQuery](https://jquery.com/) & [Babel](https://babeljs.io/) 
- Build Tools: [Visual Studio Code](https://code.visualstudio.com/), [Chrome Dev Tools](https://developer.chrome.com/devtools), [W3C Markup Validation Service](https://validator.w3.org/) & [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
