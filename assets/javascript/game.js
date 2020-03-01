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
  randomObj: {},
  randomWord: "",
  lettersGuessed: [],
  guessesRemaining: 0,
  wins: 0,
  gameOver: false,

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
    return this.randomObj;
  },

  getRandomWord: function() {
    return this.randomWord;
  },

  getLettersGuessed: function() {
    return this.lettersGuessed;
  },

  getGuessesRemaining: function() {
    return this.guessesRemaining;
  },

  getWins: function() {
    return this.wins;
  },

  getGameOver: function() {
    return this.gameOver;
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
    var index = Math.floor(Math.random() * this.gameData.length);

    this.randomObj = this.gameData[index];
    this.randomWord = this.randomObj.word.toUpperCase();
    this.setNumGuesses(this.randomWord.length);

    // DEBUG
    console.log("word: " + this.randomWord);
  },

  /* *************************************************************
     isLtrInWord()
     - Determine if letter user guessed is in word
     TODO: Implement case-insensitive search. (02/29/2020)
     ************************************************************* */  
  isLtrInWord: function(userGuess) {
    if (this.randomWord.includes(userGuess.toUpperCase())) {
      return true;
    }

    return false;
  },

  isLtrInGuesses: function(userGuess) {
    // DEBUG
    console.log(this.lettersGuessed);

    if (this.lettersGuessed.includes(userGuess.toUpperCase())) {
      return true;
    }

    return false;
  },

  /* *************************************************************
     addGuessToList()
     - Add letter to list of letters guessed
     ************************************************************* */  
  addGuessToList: function(userGuess) {
    if (!(this.isLtrInGuesses(userGuess.toUpperCase()))) {
      this.lettersGuessed.push(userGuess.toUpperCase());
    }
  },

  /* *************************************************************
     getPartialWord()
     - Retrieve space holders with any letters guessed correctly
     ************************************************************* */  
  getPartialWord: function() {
    var word = "";

    for (var i = 0; i < this.randomWord.length; i++) {
      // DEBUG
      // console.log("-----");
      // console.log("letter: " + this.randomWord[i]);
      // console.log("letters guessed:" + this.lettersGuessed);
      // console.log("letter in word: " + this.lettersGuessed.indexOf(this.randomWord[i]));
      // console.log("capital letter in word: " + this.lettersGuessed.indexOf(this.randomWord[i].toUpperCase()));

      if (this.lettersGuessed.indexOf(this.randomWord[i].toUpperCase()) > -1) {
        // DEBUG
        // console.log("Match!");
        word = word.concat(this.randomWord[i]);
      }  
      else if (this.randomWord[i] === " ") {
        word = word.concat(" ");
      } else {
        word = word.concat("_");
      }
    }

    // DEBUG
    // console.log("--> partial word: " + word);
    // console.log("--> partial word length: " + word.length);

    return word;
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
  },

  /* *************************************************************
     incrementWins()
     - Increment number of games won by player
     ************************************************************* */  
  incrementWins: function() {
    this.wins++;
  },

  /* *************************************************************
     setGameOver()
     - Conclude game
     ************************************************************* */  
  setGameOver: function() {
    this.gameOver = true;
  }  
};

// Execute script once page is fully loaded
$(document).ready(function() {
  // Launch the game
  wordGame.setTheme(animals.words);
  wordGame.pickRandomWord();

  $("#game-name").text(wordGame.getName());
  $("#mystery-word").text(wordGame.getPartialWord());
  $("#guesses-remaining").text(wordGame.getGuessesRemaining());

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
    } else if (event.key.match("[a-zA-Z\-]")) {
      // Only accept valid user input.

      if(wordGame.isLtrInGuesses(event.key)) {
        $("#game-feedback").text("Letter already guessed.");
        return;
      }

      if (wordGame.isLtrInWord(event.key)) {
        // DEBUG
        // console.log("Letter found in word!");
        $("#game-feedback").text("Great job! Keep going.");
      } else {
        // DEBUG
        // console.log("Letter not found in word!");
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

        var animal = wordGame.getRandomObj();
        // DEBUG
        // console.log(animal);

        $("#winning-prize > figure").append("<img>");
        $("#winning-prize img").attr("src", animal.img);
        $("#winning-prize img").attr("alt", animal.word);
        $("#winning-prize > figure").append("<figcaption>");
        $("#winning-prize figcaption").text(animal.word);
        $("#winning-prize").append("<details>");
        $("#winning-prize details").append("<h3>");
        $("#winning-prize details > h3").text(animal.temperament);
        $("#winning-prize details").append("<p>");
        $("#winning-prize details > p").text(animal.description);
        $("#game-feedback").text("WE HAVE A WINNER!");
      }
      // Check for loss.
      else if (wordGame.getGuessesRemaining() < 1) {
        wordGame.setGameOver();
        $("#game-feedback").text("You lost this round. Better luck next time.");
      }

      if (wordGame.getGameOver()) {
        $("footer").append("<button>");
        $("footer > button").attr("type", "button");
        $("footer > button").text("Play Again!");
      }

    } else {
      // Notify user input was invalid.
      $("#game-feedback").text("Oops! Invalid character pressed. Try again.");
    }
  });

  $(document).on("click", function(event) {
    if (event.target.type === "button")
      alert(event.target + " button clicked.");
  });  
});