/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  02/29/2020
File:  game.js
Ver.:  0.1.0 20200229
This JS script implements a game object for a hangman-style game.
******************************************************************************/
var wordGame = {
  // PROPERTIES
  name: "Sorta Hangman",
  description: "...",
  instructions: "Press any key to get started!",
  gameData: [],
  randomWord: "deoxyribonucleic acid",
  guessesRemaining: 0,
  lettersGuessed: [],
  wins: 0,

  // METHODS
  /* *************************************************************
     Accessor Methods
     - Get object properties
     ************************************************************* */
  getName: function() {
    return this.name;
  },

  getDescription: function() {
    return this.description;
  },
  
  getInstructions: function() {
    return this.instructions;
  },

  getGameData: function() {
    return this.gameData;
  },

  getRandomWord: function() {
    return this.randomWord;
  },

  getGuessesRemaining: function() {
    return this.guessesRemaining;
  },

  getLettersGuessed: function() {
    return this.lettersGuessed;
  },

  getWins: function() {
    return this.wins;
  },

  /* *************************************************************
     setTheme()
     - Read game data from theme object
     ************************************************************* */
  setTheme: function(theme) {
    this.gameData = theme;
    
    // DEBUG
    // console.log("# words: " + this.gameData.length);

    // $.each(this.gameData, function(i, word) {
    //   console.log(word.word);
    // });
  },

  /* *************************************************************
     pickRandomWord()
     - Pick word randomly from game data
     ************************************************************* */  
  pickRandomWord: function() {
    
  },

  /* *************************************************************
     isLtrInWord()
     - Determine if letter user guessed is in word
     ************************************************************* */  
  isLtrInWord: function() {
  
  },

  /* *************************************************************
     getLtrsGuessed()
     - Display letters already guessed by user
     ************************************************************* */  
  getLtrsGuessed: function() {
    
  },

  /* *************************************************************
     getPartialWord()
     - Retrieve space holders with any letters guessed correctly
     ************************************************************* */  
  getPartialWord: function() {
  
  },

  /* *************************************************************
     incrementWins()
     - Increment number of games won by player
     ************************************************************* */  
  incrementWins: function() {
    this.wins++;
  },

  /* *************************************************************
     setNumGuesses()
     - Set number of guesses based on word length
     ************************************************************* */
  setNumGuesses: function(wordLength) {
    this.guessesRemaining = 2 * wordLength;
    
    // DEBUG
    // console.log("--> guesses remaining: " + this.guessesRemaining);
  },

  /* *************************************************************
     decrementGuesses()
     - Decrement number of guesses remaining
     ************************************************************* */
  decrementGuesses: function() {
    this.guessesRemaining--;
  }
};

// Execute script once page is fully loaded
$(document).ready(function() {
  // Launch the game
  wordGame.setTheme(animals.words);

  $(document).keyup(function(event) {
    // DEBUG
    alert("You pressed the " + event.key + " key!");

    wordGame.getRandomWord();
  });
});