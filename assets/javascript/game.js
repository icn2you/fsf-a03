/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  02/29/2020
File:  game.js
Ver.:  0.1.0 20200229
This JS script implements a game object for a hangman-style game with a .
******************************************************************************/
const maxGuesses = 24;

function resettableStateFactory() {
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
  name: "Guess That Dog Breed!",
  description: "This game randomly presents one of the top 25 dog breeds for the user to guess.",
  instructions: "Press any letter to begin.",
  gameData: [],
  losses: 0,
  wins: 0,
  resettableState: resettableStateFactory(),

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
    return this.resettableState.randomObj;
  },

  getRandomWord: function() {
    return this.resettableState.randomWord;
  },

  getLettersGuessed: function() {
    return this.resettableState.lettersGuessed;
  },

  getGuessesRemaining: function() {
    return this.resettableState.guessesRemaining;
  },

  getLosses: function() {
    return this.losses;
  },

  getWins: function() {
    return this.wins;
  },

  getGameOver: function() {
    return this.resettableState.gameOver;
  },

  /* *************************************************************
     setTheme()
     - Read game data from theme object
     ************************************************************* */
  setTheme: function(theme) {
    this.gameData = theme;
    
    // DEBUG
    // $.each(this.gameData, function(i, word) {
    //   console.log(word.name);
    // });
  },

  /* *************************************************************
     pickRandomWord()
     - Pick word randomly from game data
     ************************************************************* */  
  pickRandomWord: function() {
    var index = Math.floor(Math.random() * this.gameData.length);

    this.resettableState.randomObj = this.gameData[index];
    this.resettableState.randomWord = this.resettableState.randomObj.name.toUpperCase();
    this.setNumGuesses(this.resettableState.randomWord.length);
  },

  /* *************************************************************
     isLtrInWord()
     - Determine if letter user guessed is in word
     TODO: Implement case-insensitive search. (02/29/2020)
     ************************************************************* */  
  isLtrInWord: function(userGuess) {
    if (this.resettableState.randomWord.includes(userGuess.toUpperCase())) {
      return true;
    }

    return false;
  },

  isLtrInGuesses: function(userGuess) {
    if (this.resettableState.lettersGuessed.includes(userGuess.toUpperCase())) {
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
      this.resettableState.lettersGuessed.push(userGuess.toUpperCase());
    }
  },

  /* *************************************************************
     getPartialWord()
     - Retrieve space holders with any letters guessed correctly
     ************************************************************* */  
  getPartialWord: function() {
    var word = "";

    for (var i = 0; i < this.resettableState.randomWord.length; i++) {
      if (this.resettableState.lettersGuessed.indexOf(this.resettableState.randomWord[i].toUpperCase()) > -1) {
        word = word.concat(this.resettableState.randomWord[i]);
      }  
      else if (this.resettableState.randomWord[i] === " ") {
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
    this.resettableState.guessesRemaining--;
  },

  /* *************************************************************
     incrementWins()
     - Increment number of games won by player
     ************************************************************* */  
  incrementLosses: function() {
    this.losses++;
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
    this.resettableState.guessesRemaining = Math.min(maxGuesses, (2 * wordLength));
  },  

  /* *************************************************************
     setGameOver()
     - Conclude game
     ************************************************************* */  
  setGameOver: function() {
    this.resettableState.gameOver = true;
  },
  
  /* *************************************************************
     resetGameState()
     - Conclude game
     ************************************************************* */  
  resetGameState: function() {
    this.resettableState = resettableStateFactory();
  }    
};

wordGame.setTheme(canines.breeds);

// Execute script once page is fully loaded
$(document).ready(function() {
  // Launch the game
  wordGame.pickRandomWord();

  $("#game-name").text(wordGame.getName());
  $("#mystery-word").text(wordGame.getPartialWord());
  $("#guesses-remaining").text(wordGame.getGuessesRemaining());
  $("#player-wins").text(wordGame.getWins());
  $("#game-feedback").text(wordGame.getInstructions());

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

        var randomObj = wordGame.getRandomObj();

        $("#winning-prize").append("<figure>");
        $("#winning-prize > figure").append("<img>");
        $("#winning-prize img").attr("src", randomObj.img);
        $("#winning-prize img").attr("alt", randomObj.name);
        $("#winning-prize > figure").append("<figcaption>");
        $("#winning-prize figcaption").text(randomObj.name);
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
        wordGame.incrementLosses();
        $("#game-feedback").text("You lost this round. Better luck next time.");
      }

      var gamesPlayed = wordGame.getWins() + wordGame.getLosses();

      $("#player-wins").text(wordGame.getWins() + " out of " + gamesPlayed + " game(s)" );

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