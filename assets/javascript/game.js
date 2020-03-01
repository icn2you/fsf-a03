/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  02/29/2020
File:  game.js
Ver.:  0.1.0 20200229
This JS script implements a game object for a hangman-style game.
******************************************************************************/
function resetableStateFactory() {
  return {
    // GAME STATE PROPERTIES
    randomObj: {},
    randomWord: "",
    lettersGuessed: [],
    guessesRemaining: 0,
    gameOver: false
  };
};

var wordGame = {
  // PROPERTIES
  name: "Sorta Hangman",
  description: "...",
  instructions: "Press any key to get started!",
  gameData: [],
  wins: 0,
  resetableState: resetableStateFactory(),

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

  getRandomObj: function() {
    return this.resetableState.randomObj;
  },

  getRandomWord: function() {
    return this.resetableState.randomWord;
  },

  getLettersGuessed: function() {
    return this.resetableState.lettersGuessed;
  },

  getGuessesRemaining: function() {
    return this.resetableState.guessesRemaining;
  },

  getWins: function() {
    return this.wins;
  },

  getGameOver: function() {
    return this.resetableState.gameOver;
  },

  /* *************************************************************
     setTheme()
     - Read game data from theme object
     ************************************************************* */
  setTheme: function(theme) {
    this.gameData = theme;
    
    // DEBUG
    // $.each(this.gameData, function(i, word) {
    //   console.log(word.word);
    // });
  },

  /* *************************************************************
     pickRandomWord()
     - Pick word randomly from game data
     ************************************************************* */  
  pickRandomWord: function() {
    var index = Math.floor(Math.random() * this.gameData.length);

    this.resetableState.randomObj = this.gameData[index];
    this.resetableState.randomWord = this.resetableState.randomObj.word.toUpperCase();
    this.setNumGuesses(this.resetableState.randomWord.length);
  },

  /* *************************************************************
     isLtrInWord()
     - Determine if letter user guessed is in word
     TODO: Implement case-insensitive search. (02/29/2020)
     ************************************************************* */  
  isLtrInWord: function(userGuess) {
    if (this.resetableState.randomWord.includes(userGuess.toUpperCase())) {
      return true;
    }

    return false;
  },

  isLtrInGuesses: function(userGuess) {
    if (this.resetableState.lettersGuessed.includes(userGuess.toUpperCase())) {
      return true;
    }

    return false;
  },

  /* *************************************************************
     addGuessToList()
     - Add letter to list of letters guessed
     ************************************************************* */  
  addGuessToList: function(userGuess) {
    // Double check that user guess is not in letters guessed already.
    if (!(this.isLtrInGuesses(userGuess.toUpperCase()))) {
      this.resetableState.lettersGuessed.push(userGuess.toUpperCase());
    }
  },

  /* *************************************************************
     getPartialWord()
     - Retrieve space holders with any letters guessed correctly
     ************************************************************* */  
  getPartialWord: function() {
    var word = "";

    for (var i = 0; i < this.resetableState.randomWord.length; i++) {
      if (this.resetableState.lettersGuessed.indexOf(this.resetableState.randomWord[i].toUpperCase()) > -1) {
        word = word.concat(this.resetableState.randomWord[i]);
      }  
      else if (this.resetableState.randomWord[i] === " ") {
        word = word.concat(" ");
      } 
      else {
        word = word.concat("_");
      }
    }

    return word;
  },

  /* *************************************************************
     decrementGuesses()
     - Decrement number of guesses remaining
     ************************************************************* */
  decrementGuesses: function() {
    this.resetableState.guessesRemaining--;
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
    this.resetableState.guessesRemaining = 2 * wordLength;
  },  

  /* *************************************************************
     setGameOver()
     - Conclude game
     ************************************************************* */  
  setGameOver: function() {
    this.resetableState.gameOver = true;
  },
  
  /* *************************************************************
     resetGameState()
     - Conclude game
     ************************************************************* */  
  resetGameState: function() {
    this.resetableState = resetableStateFactory();
  }    
};

wordGame.setTheme(animals.words);

// Execute script once page is fully loaded
$(document).ready(function() {
  // Launch the game
  wordGame.pickRandomWord();

  $("#game-name").text(wordGame.getName());
  $("#mystery-word").text(wordGame.getPartialWord());
  $("#guesses-remaining").text(wordGame.getGuessesRemaining());
  $("#player-wins").text(wordGame.getWins());

  $(document).keyup(function(event) {
    // DEBUG
    // alert("You pressed the " + event.key + " key!");
   
    // Don't allow further input if game is over.
    if (wordGame.getGameOver() ||
        // Ignore scrupulous users trying to input capital letters!  
        event.key === "Shift" ||
        // ... and other non-printing characters ...
        // TODO: Find a more elegant way to do this! (02/29/2020)
        event.key === "Alt" ||
        event.key === "Backspace" ||
        event.key === "CapsLock" ||
        event.key === "Control" ||
        event.key === "Delete" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === "Enter" ||
        event.key === "Escape" ||
        event.key === "Home" ||
        event.key === "Meta" ||
        event.key.substr(0, 5) === "Arrow" ||
        event.key.substr(0, 2) === "F1" ||
        event.key.substr(0, 2) === "F2" ||
        event.key.substr(0, 2) === "F3" ||
        event.key.substr(0, 2) === "F4" ||
        event.key.substr(0, 2) === "F5" ||
        event.key.substr(0, 2) === "F6" ||
        event.key.substr(0, 2) === "F7" ||
        event.key.substr(0, 2) === "F8" ||
        event.key.substr(0, 2) === "F9" ||
        event.key.substr(0, 4) === "Page") { 
      return;
    }
    // Only accept valid user input. 
    else if (event.key.match("[a-zA-Z\-]")) {
      if(wordGame.isLtrInGuesses(event.key)) {
        $("#game-feedback").text("Letter already guessed.");
        return;
      }

      if (wordGame.isLtrInWord(event.key)) {
        $("#game-feedback").text("Great job! Keep going.");
      } 
      else {
        $("#game-feedback").text("Oops! Bad guess. Try again.");
      }

      wordGame.decrementGuesses();   
      wordGame.addGuessToList(event.key);

      $("#mystery-word").text(wordGame.getPartialWord());
      $("#letters-guessed").text(wordGame.getLettersGuessed());
      $("#guesses-remaining").text(wordGame.getGuessesRemaining());

      // Check for a win!
      if (!wordGame.getPartialWord().includes("_")) {
        wordGame.setGameOver();
        wordGame.incrementWins();
        $("#player-wins").text(wordGame.getWins());

        var randomObj = wordGame.getRandomObj();

        $("#winning-prize").append("<figure>");
        $("#winning-prize > figure").append("<img>");
        $("#winning-prize img").attr("src", randomObj.img);
        $("#winning-prize img").attr("alt", randomObj.word);
        $("#winning-prize > figure").append("<figcaption>");
        $("#winning-prize figcaption").text(randomObj.word);
        $("#winning-prize").append("<details>");
        $("#winning-prize details").append("<h3>");
        $("#winning-prize details > h3").text(randomObj.temperament);
        $("#winning-prize details").append("<p>");
        $("#winning-prize details > p").text(randomObj.description);
        $("#game-feedback").text("WE HAVE A WINNER!");
      }
      // Check for loss.
      else if (wordGame.getGuessesRemaining() < 1) {
        wordGame.setGameOver();
        $("#game-feedback").text("You lost this round. Better luck next time.");
      }

      // Check if game is over.
      if (wordGame.getGameOver()) {
        $("footer").append("<button>");
        $("footer > button").attr("type", "button");
        $("footer > button").text("Play Again!");
      }

    }
    // Notify user input was invalid. 
    else {
      $("#game-feedback").text("Oops! Invalid character pressed. Try again.");
    }
  });

  // If user requests another game, reset playing field.
  $(document).on("click", function(event) {
    if (event.target.type === "button") {
      wordGame.resetGameState();
      wordGame.pickRandomWord();

      $("#winning-prize").empty();
      $("#mystery-word").text(wordGame.getPartialWord());
      $("#letters-guessed").text(wordGame.getLettersGuessed());
      $("#guesses-remaining").text(wordGame.getGuessesRemaining());
      $("#game-feedback").empty();
      $("footer").empty();
    }
  });  
});