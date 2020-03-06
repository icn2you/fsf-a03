/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  02/29/2020
File:  game.js
Ver.:  0.1.0 20200229
       0.2.0 20200302
       0.3.0 20200305
This JS script implements a hangman-style game with a changeable dataset.
******************************************************************************/
const dataset = canines.breeds;
const maxGuesses = 20;
const willy = "assets/images/willy.png";

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
  name: "Guess That Canine Kid!",
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
    this.resettableState.randomWord = this.resettableState.randomObj.word.toUpperCase();
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

function giveUserFeedback(feedback, classVal) {
  // DEBUG
  // console.log("class value:" + classVal);
  
  if (classVal != null) {
    $("#game-feedback").attr("class", classVal);
  }

  $("#game-feedback").text(feedback);
};

wordGame.setTheme(dataset);

// Execute script once page is fully loaded
$(document).ready(function() {
  // Launch the initial game
  wordGame.pickRandomWord();

  $("#game-name").text(wordGame.getName());
  $("#mystery-word").text(wordGame.getPartialWord());
  $("#guesses-remaining").text(wordGame.getGuessesRemaining());
  $("#player-wins").text(wordGame.getWins());
  giveUserFeedback(wordGame.getInstructions());

  $(document).keyup(function(event) {
    // DEBUG
    // alert("You pressed the " + event.key + " key!");
   
    // Don't allow further input if game is over.
    if (wordGame.getGameOver()) { 
      return;
    }
    // Only accept valid user input (*i.e.*, alphabetic letters)
    else if (event.key.length === 1 && 
            (event.key.charCodeAt(0) >= 97 && event.key.charCodeAt(0) <= 122)) {
      // DEBUG
      // console.log(event.key.charCodeAt(0));

      (event.key.charCodeAt(0));
      if(wordGame.isLtrInGuesses(event.key)) {
        giveUserFeedback("Letter already guessed.");
        return;
      }

      if (wordGame.isLtrInWord(event.key)) {
        giveUserFeedback("Great job! Keep going.");
      } 
      else {
        giveUserFeedback("Oops! Bad guess. Try again.");
      }

      wordGame.decrementGuesses();   
      wordGame.addGuessToList(event.key);

      $("#mystery-word").text(wordGame.getPartialWord());
      $("#letters-guessed").text(wordGame.getLettersGuessed());
      $("#guesses-remaining").text(wordGame.getGuessesRemaining());

      // Check for a win!
      if (!(wordGame.getPartialWord().includes("_"))) {
        wordGame.setGameOver();
        wordGame.incrementWins();

        var randomObj = wordGame.getRandomObj();

        $("#winning-prize-container img").attr({
          src: randomObj.img,
          alt: randomObj.word
        });
        $("#winning-prize-container figcaption").text(randomObj.temperament.toUpperCase());

        giveUserFeedback("WE HAVE A WINNER!", "win");
      }
      // Check for loss.
      else if (wordGame.getGuessesRemaining() < 1) {
        wordGame.setGameOver();
        wordGame.incrementLosses();
    
        giveUserFeedback("You lost this round. Better luck next time.", "loss");
      }

      var gamesPlayed = wordGame.getWins() + wordGame.getLosses();

      $("#player-wins").text(wordGame.getWins() + " out of " + gamesPlayed + " game(s)" );

      // Check if game is over.
      if (wordGame.getGameOver()) {
        $("#play-again").append("<button>");
        $("#play-again > button").attr({
          type: "button",
          class: "btn btn-outline-light"
        });
        $("#play-again > button").text("Play Again!");
      }

    }
    // Notify user input was invalid. 
    else {
      giveUserFeedback("Oops! Invalid character pressed. Try again.");
    }
  });

  // If user requests another game, reset playing field.
  $(document).on("click", function(event) {
    if (event.target.type === "button") {
      wordGame.resetGameState();
      wordGame.pickRandomWord();

      $("#winning-prize-container img").attr({
        src: willy,
        alt: "WILLY"
      });
      $("#winning-prize-container figcaption").empty();
      $("#winning-prize-container figcaption").append('<div><em>In memory of </em><strong class="text-uppercase">Willy</strong><em>, my furry kid</em></em></div><div>2002 - 2014</div>');      
      $("#mystery-word").text(wordGame.getPartialWord());
      $("#letters-guessed").text(wordGame.getLettersGuessed());
      $("#guesses-remaining").text(wordGame.getGuessesRemaining());
      
      giveUserFeedback("Here's another round!", "normal");
      
      $("#play-again").empty();
    }
  });  
});